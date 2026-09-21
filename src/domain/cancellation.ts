import { Order, OrderStatusStage } from './order';

export type CancellationReason =
  | 'schedule_conflict'
  | 'traveling'
  | 'damaged_item_concern'
  | 'ordered_by_mistake'
  | 'other';

export interface CancellationReasonOption {
  id: CancellationReason;
  label: string;
  description: string;
}

export const CANCELLATION_REASONS: CancellationReasonOption[] = [
  {
    id: 'schedule_conflict',
    label: 'Schedule Conflict',
    description: 'I will not be available during the selected valet window.',
  },
  {
    id: 'traveling',
    label: 'Traveling Soon',
    description: 'Leaving the city before garments can be returned.',
  },
  {
    id: 'damaged_item_concern',
    label: 'Fabric Care Concern',
    description: 'Need to consult with concierge before processing delicate fibers.',
  },
  {
    id: 'ordered_by_mistake',
    label: 'Ordered by Mistake',
    description: 'Placed order with incorrect garment count or address.',
  },
  {
    id: 'other',
    label: 'Other Reason',
    description: 'Personal circumstances or custom preference.',
  },
];

export interface RefundCalculationResult {
  orderId: string;
  currentStage: OrderStatusStage;
  eligibleForRefund: boolean;
  refundPercentage: number;
  totalPaidInr: number;
  refundAmountInr: number;
  deductionAmountInr: number;
  explanation: string;
}

/**
 * Pure function: calculateRefundAmount
 *
 * Rules:
 * 1. Prior to Pickup (Stage 'pickup_scheduled'):
 *    - 100% Full Refund. The valet has not yet arrived, so no logistics or labor costs were incurred.
 * 2. In Transit to Studio (Stage 'custody_secured'):
 *    - 90% Refund. 10% is deducted for courier dispatch and tamper-proof sealing (maximum deduction ₹250).
 * 3. Studio Intake & Inspection (Stage 'studio_intake'):
 *    - 50% Refund. Garments have been cataloged, fabric-scanned, and queued for pressing.
 * 4. Active Steaming & Subsequent Stages ('active_steaming', 'artisan_qa', 'en_route_delivery', 'delivered'):
 *    - 0% Non-refundable. Artisan vapor treatment has been executed. Garments will be safely returned to client.
 * 5. Already Cancelled:
 *    - 0% No double refunds.
 */
export function calculateRefundAmount(
  order: Order,
  _reason: CancellationReason
): RefundCalculationResult {
  const totalPaid = Math.max(0, order.totalAmountInr);

  switch (order.status) {
    case 'pickup_scheduled': {
      return {
        orderId: order.id,
        currentStage: order.status,
        eligibleForRefund: true,
        refundPercentage: 100,
        totalPaidInr: totalPaid,
        refundAmountInr: totalPaid,
        deductionAmountInr: 0,
        explanation: 'Full 100% refund credited. Pickup has not commenced.',
      };
    }

    case 'custody_secured': {
      const deduction = Math.min(Math.round(totalPaid * 0.1), 250);
      const refund = Math.max(0, totalPaid - deduction);
      return {
        orderId: order.id,
        currentStage: order.status,
        eligibleForRefund: true,
        refundPercentage: 90,
        totalPaidInr: totalPaid,
        refundAmountInr: refund,
        deductionAmountInr: deduction,
        explanation: '90% refund. 10% valet dispatch & secure seal fee deducted.',
      };
    }

    case 'studio_intake': {
      const refund = Math.round(totalPaid * 0.5);
      const deduction = totalPaid - refund;
      return {
        orderId: order.id,
        currentStage: order.status,
        eligibleForRefund: true,
        refundPercentage: 50,
        totalPaidInr: totalPaid,
        refundAmountInr: refund,
        deductionAmountInr: deduction,
        explanation: '50% refund. Fabric cataloging and queue allocation completed.',
      };
    }

    case 'active_steaming':
    case 'artisan_qa':
    case 'en_route_delivery':
    case 'delivered': {
      return {
        orderId: order.id,
        currentStage: order.status,
        eligibleForRefund: false,
        refundPercentage: 0,
        totalPaidInr: totalPaid,
        refundAmountInr: 0,
        deductionAmountInr: totalPaid,
        explanation: 'Treatment is active or complete. Garments will be returned to your wardrobe.',
      };
    }

    case 'cancelled':
    default: {
      return {
        orderId: order.id,
        currentStage: order.status,
        eligibleForRefund: false,
        refundPercentage: 0,
        totalPaidInr: totalPaid,
        refundAmountInr: 0,
        deductionAmountInr: 0,
        explanation: 'This order has already been cancelled.',
      };
    }
  }
}
