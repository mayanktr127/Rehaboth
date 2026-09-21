import { IGeocodingService, GeocodedLocation, GeoCoordinates } from './types';
import { validatePincode } from '../../domain/validators';

/**
 * Pre-calibrated luxury concierge coverage zones in Bengaluru
 */
export const DEFAULT_COVERAGE_LOCATIONS: GeocodedLocation[] = [
  {
    id: 'loc_indiranagar',
    title: 'Indiranagar 12th Main',
    subtitle: 'Near 100 Feet Road, Bengaluru, Karnataka',
    fullAddress: 'No. 42, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    pincode: '560038',
    coordinates: { latitude: 12.9719, longitude: 77.6412 },
    isServiceable: true,
  },
  {
    id: 'loc_lavelle',
    title: 'Lavelle Road Atelier',
    subtitle: 'Shanthala Nagar, Ashok Nagar, Bengaluru',
    fullAddress: 'Lavelle Heights, 3rd Floor, Lavelle Road, Bengaluru 560001',
    pincode: '560001',
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    isServiceable: true,
  },
  {
    id: 'loc_koramangala',
    title: 'Koramangala 4th Block',
    subtitle: '80 Feet Road, Bengaluru, Karnataka',
    fullAddress: 'Villa 18, 10th Cross, 4th Block, Koramangala, Bengaluru 560034',
    pincode: '560034',
    coordinates: { latitude: 12.9352, longitude: 77.6245 },
    isServiceable: true,
  },
  {
    id: 'loc_sadashivanagar',
    title: 'Sadashivanagar Residences',
    subtitle: 'Near Sankey Tank, Bengaluru, Karnataka',
    fullAddress: '88 Bashyam Circle, Sadashivanagar, Bengaluru 560080',
    pincode: '560080',
    coordinates: { latitude: 13.0068, longitude: 77.5813 },
    isServiceable: true,
  },
  {
    id: 'loc_whitefield',
    title: 'Whitefield EPIP Zone',
    subtitle: 'Prestige Ozone Enclave, Bengaluru',
    fullAddress: 'Plot 14, EPIP Zone, Whitefield, Bengaluru 560066',
    pincode: '560066',
    coordinates: { latitude: 12.9698, longitude: 77.7499 },
    isServiceable: true,
  },
  {
    id: 'loc_hsr',
    title: 'HSR Layout Sector 2',
    subtitle: '27th Main Road, Bengaluru, Karnataka',
    fullAddress: 'Apartment 4B, 27th Main Road, Sector 2, HSR Layout, Bengaluru 560102',
    pincode: '560102',
    coordinates: { latitude: 12.9121, longitude: 77.6446 },
    isServiceable: true,
  },
];

/**
 * MockGeocodingService
 *
 * Fully functional in-memory provider delivering deterministic results
 * without third-party API keys or network latency.
 */
export class MockGeocodingService implements IGeocodingService {
  private locations: GeocodedLocation[] = DEFAULT_COVERAGE_LOCATIONS;

  async searchAddresses(query: string): Promise<GeocodedLocation[]> {
    const q = query.trim().toLowerCase();
    if (!q) return this.locations.slice(0, 4);

    return this.locations.filter((loc) =>
      loc.title.toLowerCase().includes(q) ||
      loc.subtitle.toLowerCase().includes(q) ||
      loc.fullAddress.toLowerCase().includes(q) ||
      loc.pincode.includes(q)
    );
  }

  async reverseGeocode(coords: GeoCoordinates): Promise<GeocodedLocation> {
    // Find closest location using simple Euclidean distance
    let closest = this.locations[0];
    let minDistance = Infinity;

    for (const loc of this.locations) {
      const dLat = loc.coordinates.latitude - coords.latitude;
      const dLon = loc.coordinates.longitude - coords.longitude;
      const dist = Math.sqrt(dLat * dLat + dLon * dLon);
      if (dist < minDistance) {
        minDistance = dist;
        closest = loc;
      }
    }

    return closest;
  }

  validateServiceability(pincode: string): boolean {
    const res = validatePincode(pincode);
    if (!res.valid || !res.cleanedValue) return false;
    // Bengaluru postal codes start with 560xxx
    return res.cleanedValue.startsWith('560');
  }
}

/**
 * OpenStreetMap Nominatim Geocoding Provider
 *
 * NOTE ON USAGE POLICY & PRODUCTION COMPLIANCE:
 * OpenStreetMap's public Nominatim instance is subject to a strict Acceptable Use Policy:
 * 1. Requires a valid custom User-Agent identifying the app.
 * 2. Capped at 1 request per second.
 * 3. Prohibited for commercial heavy tracking or production apps without self-hosting.
 * For production deployment, set EXPO_PUBLIC_GEOCODING_API_KEY and configure
 * Mapbox Geocoding API or Google Places Autocomplete.
 */
export class NominatimGeocodingService implements IGeocodingService {
  private mockFallback = new MockGeocodingService();

  async searchAddresses(query: string): Promise<GeocodedLocation[]> {
    if (!query.trim()) return this.mockFallback.searchAddresses(query);

    try {
      const endpoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query + ', Bengaluru'
      )}&format=json&addressdetails=1&limit=5`;

      const response = await fetch(endpoint, {
        headers: {
          'User-Agent': 'RehabothConciergeApp/1.0.0 (contact: concierge@rehaboth.internal)',
        },
      });

      if (!response.ok) {
        return this.mockFallback.searchAddresses(query);
      }

      const results = await response.json();
      if (!Array.isArray(results) || results.length === 0) {
        return this.mockFallback.searchAddresses(query);
      }

      return results.map((item: any, idx: number) => {
        const pincode = item.address?.postcode || '560001';
        return {
          id: `osm_${item.place_id || idx}`,
          title: item.name || item.display_name?.split(',')[0] || query,
          subtitle: item.display_name || '',
          fullAddress: item.display_name || '',
          pincode,
          coordinates: {
            latitude: parseFloat(item.lat),
            longitude: parseFloat(item.lon),
          },
          isServiceable: this.validateServiceability(pincode),
        };
      });
    } catch {
      return this.mockFallback.searchAddresses(query);
    }
  }

  async reverseGeocode(coords: GeoCoordinates): Promise<GeocodedLocation> {
    return this.mockFallback.reverseGeocode(coords);
  }

  validateServiceability(pincode: string): boolean {
    return this.mockFallback.validateServiceability(pincode);
  }
}

// Export default service instance
export const geocodingService: IGeocodingService =
  process.env.EXPO_PUBLIC_USE_REAL_GEOCODER === 'true'
    ? new NominatimGeocodingService()
    : new MockGeocodingService();
