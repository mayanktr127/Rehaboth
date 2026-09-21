import { calculateRefundAmount } from '../src/domain/cancellation';
import { Order } from '../src/domain/order';

const createTestOrder = (status: Order['status'], totalAmountInr: number = 1000): Order => ({
  id: 'test_ord_1',
  orderNumber: 'ST-TEST',
  addressId: 'addr_1',
  pickupDate: 'Today',
  timeSlot: 'Morning',
  garmentCount: 4,
  scentId: 'lavender',
  status,
  subtotalInr: totalAmountInr,
  discountInr: 0,
  totalAmountInr,
  paymentMethod: 'upi',
  paymentStatus: 'paid',
  custodianName: 'Rajesh',
  custodianId: 'CUST-1',
  handoverCode: '4921',
  createdAt: new Date().toISOString(),
  estimatedDelivery: 'Tomorrow',
  timeline: [],
});

describe('Cancellation & Refund Domain Pure Functions', () => {
  it('returns 100% refund prior to valet pickup', () => {
    const order = createTestOrder('pickup_scheduled', 800);
    const result = calculateRefundAmount(order, 'schedule_conflict');

    expect(result.eligibleForRefund).toBe(true);
    expect(result.refundPercentage).toBe(100);
    expect(result.refundAmountInr).toBe(800);
    expect(result.deductionAmountInr).toBe(0);
  });

  it('returns 90% refund with 10% deduction when in valet custody', () => {
    const order = createTestOrder('custody_secured', 1000);
    const result = calculateRefundAmount(order, 'traveling');

    expect(result.eligibleForRefund).toBe(true);
    expect(result.refundPercentage).toBe(90);
    expect(result.refundAmountInr).toBe(900);
    expect(result.deductionAmountInr).toBe(100);
  });

  it('caps custody deduction at ₹250 for large orders', () => {
    const order = createTestOrder('custody_secured', 5000);
    const result = calculateRefundAmount(order, 'traveling');

    expect(result.deductionAmountInr).toBe(250);
    expect(result.refundAmountInr).toBe(4750);
  });

  it('returns 50% refund when order has entered studio intake', () => {
    const order = createTestOrder('studio_intake', 600);
    const result = calculateRefundAmount(order, 'ordered_by_mistake');

    expect(result.refundPercentage).toBe(50);
    expect(result.refundAmountInr).toBe(300);
    expect(result.deductionAmountInr).toBe(300);
  });

  it('returns 0% non-refundable once active steaming or later stages begin', () => {
    const steamingOrder = createTestOrder('active_steaming', 1200);
    expect(calculateRefundAmount(steamingOrder, 'other').eligibleForRefund).toBe(false);
    expect(calculateRefundAmount(steamingOrder, 'other').refundAmountInr).toBe(0);

    const deliveredOrder = createTestOrder('delivered', 1200);
    expect(calculateRefundAmount(deliveredOrder, 'other').eligibleForRefund).toBe(false);

    const cancelledOrder = createTestOrder('cancelled', 1200);
    expect(calculateRefundAmount(cancelledOrder, 'other').eligibleForRefund).toBe(false);
  });
});
