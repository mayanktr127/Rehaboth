import { useState, useEffect, useCallback } from 'react';
import { OrderPricingBreakdown, ScentId } from '../../domain';
import { apiService } from '../api';

export function usePricing(
  initialGarments: number = 25,
  initialPromo?: string,
  initialScent: ScentId = 'lavender'
) {
  const [garments, setGarments] = useState(initialGarments);
  const [promoCode, setPromoCode] = useState(initialPromo || '');
  const [scentId, setScentId] = useState<ScentId>(initialScent);
  const [pricing, setPricing] = useState<OrderPricingBreakdown | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = useCallback(async (gCount: number, pCode?: string, sId?: ScentId) => {
    setLoading(true);
    try {
      const data = await apiService.getPricing(gCount, pCode, sId);
      setPricing(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    calculate(garments, promoCode, scentId);
  }, [garments, promoCode, scentId, calculate]);

  return {
    pricing,
    garments,
    setGarments,
    promoCode,
    setPromoCode,
    scentId,
    setScentId,
    loading,
    refresh: () => calculate(garments, promoCode, scentId),
  };
}
