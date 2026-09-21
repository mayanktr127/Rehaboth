export type AddressType = 'home' | 'office' | 'atelier' | 'other';

export interface Address {
  id: string;
  label: string;
  flatNo: string;
  floor?: string;
  apartment: string;
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  addressType: AddressType;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
  formattedAddress: string;
}

export interface AddressInput {
  label: string;
  flatNo: string;
  floor?: string;
  apartment: string;
  street: string;
  landmark?: string;
  city: string;
  pincode: string;
  addressType: AddressType;
  isDefault?: boolean;
}
