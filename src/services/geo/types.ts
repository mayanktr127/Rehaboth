export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodedLocation {
  id: string;
  title: string;
  subtitle: string;
  fullAddress: string;
  pincode: string;
  coordinates: GeoCoordinates;
  isServiceable: boolean;
}

export interface IGeocodingService {
  searchAddresses(query: string): Promise<GeocodedLocation[]>;
  reverseGeocode(coords: GeoCoordinates): Promise<GeocodedLocation>;
  validateServiceability(pincode: string): boolean;
}
