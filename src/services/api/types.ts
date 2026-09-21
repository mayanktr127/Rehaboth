import {
  AuthSession,
  OtpRequestInput,
  OtpRequestResult,
  OtpVerifyInput,
  CustomerProfile,
  ProfileUpdateInput,
  Order,
  OrderCreateInput,
  OrderPricingBreakdown,
  CancellationReason,
  RefundCalculationResult,
  DeliveryRating,
  AppNotification,
  SmartBag,
  BagClaimRecord,
  ScentId,
} from '../../domain';

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  code?: string;
  details?: Record<string, string>;
}

export class ApiError extends Error {
  statusCode: number;
  code?: string;
  details?: Record<string, string>;

  constructor(message: string, statusCode: number = 500, code?: string, details?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export interface IApiService {
  // Auth
  requestOtp(input: OtpRequestInput): Promise<OtpRequestResult>;
  verifyOtp(input: OtpVerifyInput): Promise<AuthSession>;
  logout(): Promise<void>;

  // Profile
  getProfile(): Promise<CustomerProfile>;
  updateProfile(input: ProfileUpdateInput): Promise<CustomerProfile>;

  // Orders
  listOrders(): Promise<Order[]>;
  getOrderStatus(orderId: string): Promise<Order>;
  createOrder(input: OrderCreateInput): Promise<Order>;
  cancelOrder(orderId: string, reason: CancellationReason): Promise<RefundCalculationResult>;
  rateOrder(rating: DeliveryRating): Promise<{ success: boolean; message: string }>;

  // Pricing & Promos
  getPricing(garmentCount: number, promoCode?: string, scentId?: ScentId): Promise<OrderPricingBreakdown>;
  applyPromo(code: string, garmentCount: number): Promise<OrderPricingBreakdown>;

  // Smart Bags
  registerBagSeal(sealCode: string): Promise<SmartBag>;
  getBagClaim(claimId?: string): Promise<BagClaimRecord>;

  // Notifications
  listNotifications(): Promise<AppNotification[]>;
  markNotificationAsRead(id: string): Promise<void>;
  getUnreadNotificationCount(): Promise<number>;
}
