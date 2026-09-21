import { ScentId } from './scent';

export type OrderStatusStage =
  | 'pickup_scheduled'
  | 'custody_secured'
  | 'studio_intake'
  | 'active_steaming'
  | 'artisan_qa'
  | 'en_route_delivery'
  | 'delivered'
  | 'cancelled';

export interface DamagedItemIntake {
  hasDamage: boolean;
  notes?: string;
  photoUris: string[];
}

export interface OrderTimelineStep {
  stage: OrderStatusStage;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
  timestamp?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. #ST-9482
  bagId?: string;
  bagSealCode?: string;
  addressId: string;
  pickupDate: string;
  timeSlot: string;
  garmentCount: number;
  scentId: ScentId;
  status: OrderStatusStage;
  subtotalInr: number;
  discountInr: number;
  totalAmountInr: number;
  promoCode?: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  custodianName: string;
  custodianId: string;
  custodianPhone?: string;
  handoverCode: string; // 4 digits
  damagedItemIntake?: DamagedItemIntake;
  createdAt: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface OrderCreateInput {
  addressId: string;
  pickupDate: string;
  timeSlot: string;
  garmentCount: number;
  scentId: ScentId;
  bagId?: string;
  promoCode?: string;
  paymentMethod: string;
  damagedItemIntake?: DamagedItemIntake;
}
