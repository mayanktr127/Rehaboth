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
import { IApiService, ApiError } from './types';
import { tokenStorage } from './storage';

export class ApiClient implements IApiService {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(baseUrl: string, timeoutMs: number = 10000) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.timeoutMs = timeoutMs;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    const token = await tokenStorage.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) || {}),
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorData: any;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: response.statusText };
        }
        throw new ApiError(
          errorData.message || `API Error: ${response.status}`,
          response.status,
          errorData.code,
          errorData.details
        );
      }

      if (response.status === 204) {
        return null as unknown as T;
      }

      return (await response.json()) as T;
    } catch (err: any) {
      if (err instanceof ApiError) throw err;
      if (err.name === 'AbortError') {
        throw new ApiError(`Request timeout after ${this.timeoutMs}ms`, 408);
      }
      throw new ApiError(err.message || 'Network request failed', 500);
    } finally {
      clearTimeout(timeout);
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async requestOtp(input: OtpRequestInput): Promise<OtpRequestResult> {
    return this.request<OtpRequestResult>('/api/auth/otp/request', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async verifyOtp(input: OtpVerifyInput): Promise<AuthSession> {
    const session = await this.request<AuthSession>('/api/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    if (session?.token) {
      await tokenStorage.setToken(session.token);
    }
    return session;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      await tokenStorage.removeToken();
    }
  }

  async getProfile(): Promise<CustomerProfile> {
    return this.request<CustomerProfile>('/api/customer/profile');
  }

  async updateProfile(input: ProfileUpdateInput): Promise<CustomerProfile> {
    return this.request<CustomerProfile>('/api/customer/profile', {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  }

  async listOrders(): Promise<Order[]> {
    return this.request<Order[]>('/api/customer/orders');
  }

  async getOrderStatus(orderId: string): Promise<Order> {
    return this.request<Order>(`/api/customer/orders/${encodeURIComponent(orderId)}`);
  }

  async createOrder(input: OrderCreateInput): Promise<Order> {
    return this.request<Order>('/api/customer/orders', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async cancelOrder(orderId: string, reason: CancellationReason): Promise<RefundCalculationResult> {
    return this.request<RefundCalculationResult>(
      `/api/customer/orders/${encodeURIComponent(orderId)}/cancel`,
      {
        method: 'POST',
        body: JSON.stringify({ reason }),
      }
    );
  }

  async rateOrder(rating: DeliveryRating): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(
      `/api/customer/orders/${encodeURIComponent(rating.orderId)}/rate`,
      {
        method: 'POST',
        body: JSON.stringify(rating),
      }
    );
  }

  async getPricing(
    garmentCount: number,
    promoCode?: string,
    scentId?: ScentId
  ): Promise<OrderPricingBreakdown> {
    const params = new URLSearchParams({
      garments: String(garmentCount),
      ...(promoCode ? { promo: promoCode } : {}),
      ...(scentId ? { scent: scentId } : {}),
    });
    return this.request<OrderPricingBreakdown>(`/api/pricing?${params.toString()}`);
  }

  async applyPromo(code: string, garmentCount: number): Promise<OrderPricingBreakdown> {
    return this.getPricing(garmentCount, code);
  }

  async registerBagSeal(sealCode: string): Promise<SmartBag> {
    return this.request<SmartBag>('/api/customer/bags/register', {
      method: 'POST',
      body: JSON.stringify({ sealCode }),
    });
  }

  async getBagClaim(claimId?: string): Promise<BagClaimRecord> {
    const endpoint = claimId
      ? `/api/customer/bag-claims/${encodeURIComponent(claimId)}`
      : '/api/customer/bag-claims/active';
    return this.request<BagClaimRecord>(endpoint);
  }

  async listNotifications(): Promise<AppNotification[]> {
    return this.request<AppNotification[]>('/api/customer/notifications');
  }

  async markNotificationAsRead(id: string): Promise<void> {
    return this.request<void>(`/api/customer/notifications/${encodeURIComponent(id)}/read`, {
      method: 'POST',
    });
  }

  async getUnreadNotificationCount(): Promise<number> {
    const res = await this.request<{ unreadCount: number }>('/api/customer/notifications/unread-count');
    return res.unreadCount;
  }
}
