import { calculateOrderPricing, VALID_PROMO_CODES } from '../src/domain/pricing';

describe('Pricing & Discount Domain Pure Functions', () => {
  it('calculates standard base rate correctly with complimentary valet and lavender', () => {
    const result = calculateOrderPricing(4, undefined, 'lavender');
    expect(result.garmentCount).toBe(4);
    expect(result.ratePerGarmentInr).toBe(99);
    expect(result.garmentsSubtotalInr).toBe(396);
    expect(result.valetFeeInr).toBe(0);
    expect(result.fragranceFeeInr).toBe(0);
    expect(result.discountInr).toBe(0);
    expect(result.finalTotalInr).toBe(396);
  });

  it('adds royal sandalwood premium fee correctly', () => {
    const result = calculateOrderPricing(2, undefined, 'sandalwood');
    expect(result.garmentsSubtotalInr).toBe(198);
    expect(result.fragranceFeeInr).toBe(150);
    expect(result.finalTotalInr).toBe(348);
  });

  it('applies STEAMGOLD20 percentage promo correctly', () => {
    // 5 garments * 99 = 495. 20% of 495 = 99. Final = 396.
    const result = calculateOrderPricing(5, 'STEAMGOLD20', 'lavender');
    expect(result.discountInr).toBe(99);
    expect(result.finalTotalInr).toBe(396);
    expect(result.appliedPromo?.code).toBe('STEAMGOLD20');
  });

  it('enforces minimum garment threshold for REHABOTH100 promo', () => {
    // Below 5 garments -> promoError
    const lowCountResult = calculateOrderPricing(3, 'REHABOTH100');
    expect(lowCountResult.discountInr).toBe(0);
    expect(lowCountResult.promoError).toMatch(/minimum of 5 garments/i);

    // 5 garments -> ₹100 flat discount
    const validCountResult = calculateOrderPricing(5, 'REHABOTH100');
    expect(validCountResult.discountInr).toBe(100);
    expect(validCountResult.finalTotalInr).toBe(395);
  });

  it('caps ATELIER50 maximum discount at ₹1,000', () => {
    // 30 garments * 99 = 2,970. 50% = 1,485 -> capped at 1,000. Final = 1,970.
    const result = calculateOrderPricing(30, 'ATELIER50');
    expect(result.discountInr).toBe(1000);
    expect(result.finalTotalInr).toBe(1970);
  });

  it('gracefully handles invalid promo codes', () => {
    const result = calculateOrderPricing(4, 'FAKECODE123');
    expect(result.discountInr).toBe(0);
    expect(result.promoError).toMatch(/invalid offer code/i);
    expect(result.finalTotalInr).toBe(396);
  });
});
