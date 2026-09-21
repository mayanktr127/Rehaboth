import { apiService } from '../src/services/api';
import { ApiClient } from '../src/services/api/client';
import { ApiError } from '../src/services/api/types';

describe('API Service & Mock Adapter', () => {
  it('operates in mock adapter mode when no backend URL is provided', async () => {
    const profile = await apiService.getProfile();
    expect(profile).toBeDefined();
    expect(profile.fullName).toBe('Devendra Sharma');
  });

  it('requests OTP and verifies valid 1234 or 123456 demo codes', async () => {
    const otpResult = await apiService.requestOtp({
      phone: '9876543210',
      fullName: 'Devendra Sharma',
    });
    expect(otpResult.phone).toBe('9876543210');
    expect(otpResult.expiresInSeconds).toBe(90);

    const authSession = await apiService.verifyOtp({
      phone: '9876543210',
      otp: '123456',
    });
    expect(authSession.token).toBeTruthy();
    expect(authSession.user.phone).toBe('9876543210');
  });

  it('rejects invalid OTP with ApiError', async () => {
    await expect(
      apiService.verifyOtp({
        phone: '9876543210',
        otp: '99',
      })
    ).rejects.toThrow(ApiError);
  });

  it('lists orders and retrieves individual order by ID', async () => {
    const orders = await apiService.listOrders();
    expect(orders.length).toBeGreaterThan(0);

    const singleOrder = await apiService.getOrderStatus(orders[0].id);
    expect(singleOrder.id).toBe(orders[0].id);
    expect(singleOrder.orderNumber).toBe(orders[0].orderNumber);
  });

  it('creates an order, cancels it, and computes refund', async () => {
    const newOrder = await apiService.createOrder({
      addressId: 'addr_1',
      pickupDate: 'Tomorrow 25',
      timeSlot: '10:00 AM - 01:00 PM',
      garmentCount: 5,
      scentId: 'fresh-cotton',
      paymentMethod: 'upi',
    });

    expect(newOrder.id).toBeTruthy();
    expect(newOrder.garmentCount).toBe(5);

    // Cancel order
    const refund = await apiService.cancelOrder(newOrder.id, 'schedule_conflict');
    expect(refund.eligibleForRefund).toBe(true);
    expect(refund.refundPercentage).toBe(100);

    // Verify order status is cancelled
    const cancelled = await apiService.getOrderStatus(newOrder.id);
    expect(cancelled.status).toBe('cancelled');
  });

  it('rates an order successfully', async () => {
    const result = await apiService.rateOrder({
      orderId: 'ORD-9482',
      ratingStars: 5,
      complimentTags: ['Punctual Valet'],
      submittedAt: new Date().toISOString(),
    });
    expect(result.success).toBe(true);
  });
});

describe('ApiClient fetch wrapper unit tests', () => {
  it('handles fetch network failures with normalised ApiError', async () => {
    const client = new ApiClient('http://127.0.0.1:99999'); // invalid port
    await expect(client.get('/orders')).rejects.toThrow(ApiError);
  });
});
