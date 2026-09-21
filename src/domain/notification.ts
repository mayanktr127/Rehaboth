export type NotificationType = 'order_status' | 'valet_arrival' | 'bag_update' | 'promo' | 'security';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  orderId?: string;
  route?: string;
}
