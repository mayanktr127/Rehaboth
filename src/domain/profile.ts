export type MembershipTier = 'standard' | 'gold' | 'atelier';

export interface CustomerProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  membershipTier: MembershipTier;
  avatarUrl?: string;
  defaultFragranceId?: string;
  defaultAddressId?: string;
  activeSmartBagId?: string;
  ordersCompleted: number;
  totalGarmentsCared: number;
}

export interface ProfileUpdateInput {
  fullName?: string;
  email?: string;
  defaultFragranceId?: string;
  defaultAddressId?: string;
  avatarUrl?: string;
}
