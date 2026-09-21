import { useState, useEffect, useCallback } from 'react';
import { Order, CancellationReason, RefundCalculationResult } from '../../domain';
import { apiService } from '../api';

export function useOrderStatus(orderId?: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getOrderStatus(orderId || 'ord_active');
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load order status');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const cancelOrder = async (reason: CancellationReason): Promise<RefundCalculationResult> => {
    if (!order) throw new Error('No active order to cancel');
    const result = await apiService.cancelOrder(order.id, reason);
    await fetchStatus();
    return result;
  };

  return {
    order,
    loading,
    error,
    refresh: fetchStatus,
    cancelOrder,
  };
}
