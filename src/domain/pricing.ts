import { ScentId } from './scent';

export interface PromoCodeRecord {
  code: string;
  type: 'percentage' | 'flat';
  value: number; // e.g. 20 for 20%, 100 for ₹100
  title: string;
  description: string;
  minGarments: number;
  maxDiscountInr?: number;
  validUntil: string;
}

export const VALID_PROMO_CODES: Record<string, PromoCodeRecord> = {
  STEAMGOLD20: {
    code: 'STEAMGOLD20',
    type: 'percentage',
    value: 20,
    title: '20% Off Gold Care',
    description: 'Enjoy 20% off all luxury garment steaming suites.',
    minGarments: 1,
    validUntil: '2026-12-31',
  },
  REHABOTH100: {
    code: 'REHABOTH100',
    type: 'flat',
    value: 100,
    title: '₹100 Flat Courtesy',
    description: 'Flat ₹100 savings on orders of 5 garments or more.',
    minGarments: 5,
    validUntil: '2026-12-31',
  },
  ATELIER50: {
    code: 'ATELIER50',
    type: 'percentage',
    value: 50,
    title: '50% Atelier Introduction',
    description: 'Half-price introductory press for luxury suites (capped at ₹1,000).',
    minGarments: 10,
    maxDiscountInr: 1000,
    validUntil: '2026-12-31',
  },
};

export interface OrderPricingBreakdown {
  garmentCount: number;
  ratePerGarmentInr: number;
  garmentsSubtotalInr: number;
  fragranceFeeInr: number;
  valetFeeInr: number;
  discountInr: number;
  appliedPromo?: PromoCodeRecord;
  promoError?: string;
  finalTotalInr: number;
}

/**
 * Pure function: calculateOrderPricing
 *
 * Rules:
 * 1. Base Garment Pricing: Each garment is billed at standard rate (default ₹99/garment).
 * 2. Valet & Handling: Doorstep concierge pickup and delivery is complimentary (₹0).
 * 3. Fragrance Add-on: Royal Sandalwood adds ₹150; others (Lavender, Cotton, Unscented) are ₹0.
 * 4. Promo Discount Application:
 *    - Validates code existence (case-insensitive).
 *    - Enforces minimum garment volume.
 *    - Percentage discount applies to garments subtotal.
 *    - Flat discount deducts direct INR amount.
 *    - Respects maximum discount cap if specified.
 *    - Final total cannot drop below ₹0.
 */
export function calculateOrderPricing(
  garmentCount: number,
  promoCode?: string,
  scentId: ScentId = 'lavender',
  ratePerGarmentInr: number = 99
): OrderPricingBreakdown {
  const safeCount = Math.max(0, Math.floor(garmentCount));
  const garmentsSubtotalInr = safeCount * ratePerGarmentInr;
  const valetFeeInr = 0; // Doorstep valet is always complimentary

  // Scent fee calculation
  const fragranceFeeInr = scentId === 'sandalwood' ? 150 : 0;

  let discountInr = 0;
  let appliedPromo: PromoCodeRecord | undefined;
  let promoError: string | undefined;

  if (promoCode && promoCode.trim().length > 0) {
    const normalized = promoCode.trim().toUpperCase();
    const promo = VALID_PROMO_CODES[normalized];

    if (!promo) {
      promoError = 'Invalid offer code. Please check and re-enter.';
    } else if (safeCount < promo.minGarments) {
      promoError = `Code requires a minimum of ${promo.minGarments} garments.`;
    } else {
      appliedPromo = promo;
      if (promo.type === 'percentage') {
        const rawDiscount = (garmentsSubtotalInr * promo.value) / 100;
        discountInr = promo.maxDiscountInr
          ? Math.min(rawDiscount, promo.maxDiscountInr)
          : rawDiscount;
      } else if (promo.type === 'flat') {
        discountInr = Math.min(promo.value, garmentsSubtotalInr);
      }
      discountInr = Math.round(discountInr);
    }
  }

  const rawTotal = garmentsSubtotalInr + fragranceFeeInr + valetFeeInr - discountInr;
  const finalTotalInr = Math.max(0, rawTotal);

  return {
    garmentCount: safeCount,
    ratePerGarmentInr,
    garmentsSubtotalInr,
    fragranceFeeInr,
    valetFeeInr,
    discountInr,
    appliedPromo,
    promoError,
    finalTotalInr,
  };
}
