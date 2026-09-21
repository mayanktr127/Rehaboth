import { useState, useEffect, useCallback } from 'react';
import { Order } from '../../domain';
import { apiService } from '../api';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.listOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled') || orders[0];
  const pastOrders = orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');

  return {
    orders,
    activeOrder,
    pastOrders,
    loading,
    error,
    refresh: fetchOrders,
  };
}
