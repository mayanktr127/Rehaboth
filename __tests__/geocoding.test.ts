import {
  MockGeocodingService,
  DEFAULT_COVERAGE_LOCATIONS,
} from '../src/services/geo';

describe('Geocoding Service & Serviceability Validation', () => {
  const geoService = new MockGeocodingService();

  it('provides default concierge coverage locations', async () => {
    const locations = await geoService.searchAddresses('');
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0].title).toBe('Indiranagar 12th Main');
  });

  it('searches locations matching query text', async () => {
    const results = await geoService.searchAddresses('Lavelle');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Lavelle Road Atelier');
    expect(results[0].pincode).toBe('560001');
    expect(results[0].isServiceable).toBe(true);
  });

  it('finds closest location via reverseGeocode coordinates', async () => {
    // Near Indiranagar coordinates (12.9719, 77.6412)
    const result = await geoService.reverseGeocode({
      latitude: 12.972,
      longitude: 77.641,
    });
    expect(result.id).toBe('loc_indiranagar');
  });

  it('validates Bengaluru pincode serviceability correctly', () => {
    expect(geoService.validateServiceability('560038')).toBe(true);
    expect(geoService.validateServiceability('560001')).toBe(true);
    // Non-Bengaluru pincodes (e.g. Mumbai 400001, Delhi 110001)
    expect(geoService.validateServiceability('400001')).toBe(false);
    expect(geoService.validateServiceability('110001')).toBe(false);
    // Invalid formats
    expect(geoService.validateServiceability('060001')).toBe(false);
    expect(geoService.validateServiceability('abc')).toBe(false);
  });
});
