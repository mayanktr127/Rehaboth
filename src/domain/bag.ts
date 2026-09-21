export type SmartBagStatus = 'unclaimed' | 'claimed' | 'in_transit' | 'active' | 'archived';

export interface SmartBag {
  id: string;
  sealCode: string; // e.g. RS-48721
  status: SmartBagStatus;
  nfcUid?: string;
  totalTrips: number;
  registeredAt?: string;
}

export interface BagClaimRecord {
  id: string;
  customerId: string;
  addressId: string;
  status: 'processing' | 'dispatched' | 'delivered';
  trackingNumber: string;
  courierPartner: string;
  estimatedDeliveryDate: string;
  createdAt: string;
  timeline: ShipmentTimelineEvent[];
}

export interface ShipmentTimelineEvent {
  id: string;
  stage: 'claim_placed' | 'atelier_dispatched' | 'out_for_delivery' | 'delivered';
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}
