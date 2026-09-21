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
  calculateOrderPricing,
  calculateRefundAmount,
  validateIndianMobile,
  validateOtp,
} from '../../domain';
import { IApiService, ApiError } from './types';
import { tokenStorage } from './storage';
import { DemoData } from '../../constants/theme';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockApiAdapter implements IApiService {
  private profile: CustomerProfile = {
    id: 'cust_01',
    fullName: DemoData.user.fullName,
    phoneNumber: '9876543210',
    countryCode: '+91',
    email: DemoData.user.email,
    membershipTier: 'gold',
    avatarUrl: DemoData.user.avatarUrl,
    defaultFragranceId: 'lavender',
    defaultAddressId: 'home',
    activeSmartBagId: 'RS-48721',
    ordersCompleted: 14,
    totalGarmentsCared: 86,
  };

  private orders: Order[] = [
    {
      id: 'ord_active',
      orderNumber: '#ST-9482',
      bagId: 'bag_01',
      bagSealCode: 'RS-48721',
      addressId: 'home',
      pickupDate: 'Today, 24 Sep',
      timeSlot: '10:00 AM - 01:00 PM',
      garmentCount: 25,
      scentId: 'lavender',
      status: 'active_steaming',
      subtotalInr: 2475,
      discountInr: 495,
      totalAmountInr: 1980,
      promoCode: 'STEAMGOLD20',
      paymentMethod: 'Credit Card (Visa ending in 4821)',
      paymentStatus: 'paid',
      custodianName: 'Suresh',
      custodianId: '#ST-VAL-904',
      custodianPhone: '+91 98765 00904',
      handoverCode: '4921',
      damagedItemIntake: {
        hasDamage: true,
        notes: 'Slight fraying on inner left cuff seam of the navy blazer.',
        photoUris: [],
      },
      createdAt: '2026-09-24T08:30:00.000Z',
      estimatedDelivery: 'Tomorrow, 5:00 PM',
      timeline: [
        {
          stage: 'pickup_scheduled',
          title: 'Pickup Scheduled',
          description: 'Valet assigned, doorstep pickup completed.',
          completed: true,
          active: false,
          timestamp: '10:15 AM',
        },
        {
          stage: 'custody_secured',
          title: 'Secured & Picked Up',
          description: 'Smart Bag sealed with tamper-proof token #RS-48721.',
          completed: true,
          active: false,
          timestamp: '11:00 AM',
        },
        {
          stage: 'studio_intake',
          title: 'Arrived at Carlyle Studio',
          description: 'Detailed inspection and fiber identification complete.',
          completed: true,
          active: false,
          timestamp: '12:45 PM',
        },
        {
          stage: 'active_steaming',
          title: 'Active Pressing & Steam',
          description: 'French lavender vapor finishing in progress.',
          completed: true,
          active: true,
          timestamp: '02:30 PM',
        },
        {
          stage: 'artisan_qa',
          title: 'Artisan Quality Assurance',
          description: 'Zero-deflect seam & drape inspection.',
          completed: false,
          active: false,
        },
        {
          stage: 'en_route_delivery',
          title: 'En Route to Wardrobe',
          description: 'Sealed storage delivery run in climate-controlled valet.',
          completed: false,
          active: false,
        },
      ],
    },
    {
      id: 'ord_past_1',
      orderNumber: '#ST-9104',
      bagId: 'bag_01',
      bagSealCode: 'RS-48721',
      addressId: 'home',
      pickupDate: '12 Sep 2026',
      timeSlot: '02:00 PM - 05:00 PM',
      garmentCount: 14,
      scentId: 'sandalwood',
      status: 'delivered',
      subtotalInr: 1386,
      discountInr: 0,
      totalAmountInr: 1536, // Includes 150 sandalwood
      paymentMethod: 'UPI',
      paymentStatus: 'paid',
      custodianName: 'Rajesh',
      custodianId: '#ST-VAL-882',
      handoverCode: '8821',
      createdAt: '2026-09-12T14:00:00.000Z',
      estimatedDelivery: 'Delivered 13 Sep 2026',
      timeline: [],
    },
    {
      id: 'ord_past_2',
      orderNumber: '#ST-8742',
      bagId: 'bag_01',
      addressId: 'office',
      pickupDate: '28 Aug 2026',
      timeSlot: '10:00 AM - 01:00 PM',
      garmentCount: 8,
      scentId: 'fresh-cotton',
      status: 'delivered',
      subtotalInr: 792,
      discountInr: 100,
      totalAmountInr: 692,
      promoCode: 'REHABOTH100',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      custodianName: 'Arun',
      custodianId: '#ST-VAL-701',
      handoverCode: '7014',
      createdAt: '2026-08-28T09:30:00.000Z',
      estimatedDelivery: 'Delivered 29 Aug 2026',
      timeline: [],
    },
  ];

  private notifications: AppNotification[] = [
    {
      id: 'notif_1',
      type: 'order_status',
      title: 'Active Steam Finishing',
      body: 'Your garments are currently undergoing French Lavender steam infusion at Carlyle Studio.',
      timestamp: '10 mins ago',
      read: false,
      orderId: 'ord_active',
      route: '/order-status',
    },
    {
      id: 'notif_2',
      type: 'bag_update',
      title: 'Smart Bag Custody Verified',
      body: 'Bag Seal RS-48721 was scanned and verified by Custodian Suresh.',
      timestamp: '2 hours ago',
      read: false,
      route: '/smart-bag-details',
    },
    {
      id: 'notif_3',
      type: 'promo',
      title: '20% Gold Tier Benefit',
      body: 'Use code STEAMGOLD20 on your next bespoke wardrobe valet.',
      timestamp: 'Yesterday',
      read: true,
      route: '/payment',
    },
  ];

  private activeBagClaim: BagClaimRecord = {
    id: 'claim_sb_01',
    customerId: 'cust_01',
    addressId: 'home',
    status: 'dispatched',
    trackingNumber: 'RB-BAG-TRK-9821',
    courierPartner: 'Rehaboth Concierge Logistics',
    estimatedDeliveryDate: 'Tomorrow by 2:00 PM',
    createdAt: '2026-09-23T11:00:00.000Z',
    timeline: [
      {
        id: 'evt_1',
        stage: 'claim_placed',
        title: 'Complimentary Claim Confirmed',
        description: 'New member Signature Smart Bag allocated to your wardrobe token.',
        timestamp: 'Yesterday 11:00 AM',
        completed: true,
      },
      {
        id: 'evt_2',
        stage: 'atelier_dispatched',
        title: 'Dispatched from Indiranagar Hub',
        description: 'Packaged in antimicrobial protective sleeve with unique QR seal.',
        timestamp: 'Today 09:30 AM',
        completed: true,
      },
      {
        id: 'evt_3',
        stage: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Valet Suresh en route to Indiranagar address.',
        timestamp: 'Estimated 02:00 PM',
        completed: false,
      },
      {
        id: 'evt_4',
        stage: 'delivered',
        title: 'Delivered & Handed Over',
        description: 'Ready for your first scheduled steam session.',
        timestamp: 'Pending Handover',
        completed: false,
      },
    ],
  };

  async requestOtp(input: OtpRequestInput): Promise<OtpRequestResult> {
    await delay(320);
    const validation = validateIndianMobile(input.phone);
    if (!validation.valid) {
      throw new ApiError(validation.error || 'Invalid mobile number', 400);
    }
    return {
      phone: validation.cleanedValue!,
      expiresInSeconds: 90,
      devOtp: '2194',
      message: `Verification code dispatched to +91 ${validation.cleanedValue}.`,
    };
  }

  async verifyOtp(input: OtpVerifyInput): Promise<AuthSession> {
    await delay(380);
    const otpValidation = validateOtp(input.otp, 4);
    if (!otpValidation.valid) {
      throw new ApiError(otpValidation.error || 'Invalid OTP code', 400);
    }

    const token = 'mock_jwt_token_' + Date.now();
    await tokenStorage.setToken(token);

    return {
      token,
      isNewUser: false,
      user: {
        id: this.profile.id,
        phone: input.phone,
        fullName: this.profile.fullName,
        email: this.profile.email,
        membershipTier: this.profile.membershipTier,
        createdAt: '2026-01-15T00:00:00.000Z',
      },
    };
  }

  async logout(): Promise<void> {
    await delay(150);
    await tokenStorage.removeToken();
  }

  async getProfile(): Promise<CustomerProfile> {
    await delay(250);
    return { ...this.profile };
  }

  async updateProfile(input: ProfileUpdateInput): Promise<CustomerProfile> {
    await delay(300);
    this.profile = {
      ...this.profile,
      ...(input.fullName ? { fullName: input.fullName } : {}),
      ...(input.email ? { email: input.email } : {}),
      ...(input.defaultFragranceId ? { defaultFragranceId: input.defaultFragranceId } : {}),
      ...(input.defaultAddressId ? { defaultAddressId: input.defaultAddressId } : {}),
      ...(input.avatarUrl ? { avatarUrl: input.avatarUrl } : {}),
    };
    return { ...this.profile };
  }

  async listOrders(): Promise<Order[]> {
    await delay(280);
    return [...this.orders];
  }

  async getOrderStatus(orderId: string): Promise<Order> {
    await delay(220);
    const found = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!found) {
      // Default to active order for mock resilience
      return this.orders[0];
    }
    return found;
  }

  async createOrder(input: OrderCreateInput): Promise<Order> {
    await delay(450);
    const pricing = calculateOrderPricing(input.garmentCount, input.promoCode, input.scentId);
    const orderNum = `#ST-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: orderNum,
      bagId: input.bagId || this.profile.activeSmartBagId || 'RS-48721',
      bagSealCode: input.bagId || this.profile.activeSmartBagId || 'RS-48721',
      addressId: input.addressId,
      pickupDate: input.pickupDate,
      timeSlot: input.timeSlot,
      garmentCount: input.garmentCount,
      scentId: input.scentId,
      status: 'pickup_scheduled',
      subtotalInr: pricing.garmentsSubtotalInr,
      discountInr: pricing.discountInr,
      totalAmountInr: pricing.finalTotalInr,
      promoCode: input.promoCode,
      paymentMethod: input.paymentMethod,
      paymentStatus: 'paid',
      custodianName: 'Suresh',
      custodianId: '#ST-VAL-904',
      handoverCode: '4921',
      damagedItemIntake: input.damagedItemIntake,
      createdAt: new Date().toISOString(),
      estimatedDelivery: 'Tomorrow, 5:00 PM',
      timeline: [
        {
          stage: 'pickup_scheduled',
          title: 'Pickup Scheduled',
          description: `Valet assigned for ${input.pickupDate} (${input.timeSlot}).`,
          completed: true,
          active: true,
          timestamp: 'Just now',
        },
        {
          stage: 'custody_secured',
          title: 'Secured & Picked Up',
          description: 'Garments sealed with Smart Bag token.',
          completed: false,
          active: false,
        },
        {
          stage: 'studio_intake',
          title: 'Studio Inspection',
          description: 'Detailed inspection and fabric analysis at studio.',
          completed: false,
          active: false,
        },
        {
          stage: 'active_steaming',
          title: 'Steam & Fragrance Finish',
          description: 'Artisan steam pressing with selected fragrance.',
          completed: false,
          active: false,
        },
        {
          stage: 'artisan_qa',
          title: 'Quality Check',
          description: 'Master craftsman quality verification.',
          completed: false,
          active: false,
        },
        {
          stage: 'en_route_delivery',
          title: 'En Route',
          description: 'Valet en route for sealed delivery.',
          completed: false,
          active: false,
        },
      ],
    };

    this.orders.unshift(newOrder);

    // Create notification
    this.notifications.unshift({
      id: `notif_${Date.now()}`,
      type: 'order_status',
      title: 'Order Confirmed',
      body: `Your pickup for ${input.garmentCount} garments is booked (${orderNum}).`,
      timestamp: 'Just now',
      read: false,
      orderId: newOrder.id,
      route: '/order-status',
    });

    return newOrder;
  }

  async cancelOrder(orderId: string, reason: CancellationReason): Promise<RefundCalculationResult> {
    await delay(350);
    const orderIndex = this.orders.findIndex((o) => o.id === orderId || o.orderNumber === orderId);
    if (orderIndex === -1) {
      throw new ApiError('Order not found', 404);
    }

    const order = this.orders[orderIndex];
    const refundResult = calculateRefundAmount(order, reason);

    // Mutate order state to cancelled
    this.orders[orderIndex] = {
      ...order,
      status: 'cancelled',
      paymentStatus: refundResult.eligibleForRefund ? 'refunded' : order.paymentStatus,
    };

    // Add cancellation notification
    this.notifications.unshift({
      id: `notif_${Date.now()}`,
      type: 'order_status',
      title: 'Order Cancelled',
      body: `Order ${order.orderNumber} has been cancelled. Refund: ₹${refundResult.refundAmountInr}.`,
      timestamp: 'Just now',
      read: false,
      orderId: order.id,
      route: '/order-history',
    });

    return refundResult;
  }

  async rateOrder(rating: DeliveryRating): Promise<{ success: boolean; message: string }> {
    await delay(250);
    return {
      success: true,
      message: 'Thank you for your rating. Your feedback refines our standard of care.',
    };
  }

  async getPricing(
    garmentCount: number,
    promoCode?: string,
    scentId?: ScentId
  ): Promise<OrderPricingBreakdown> {
    await delay(120);
    return calculateOrderPricing(garmentCount, promoCode, scentId);
  }

  async applyPromo(code: string, garmentCount: number): Promise<OrderPricingBreakdown> {
    await delay(150);
    return calculateOrderPricing(garmentCount, code);
  }

  async registerBagSeal(sealCode: string): Promise<SmartBag> {
    await delay(320);
    this.profile.activeSmartBagId = sealCode;
    return {
      id: `bag_${Date.now()}`,
      sealCode,
      status: 'active',
      totalTrips: 1,
      registeredAt: new Date().toISOString(),
    };
  }

  async getBagClaim(_claimId?: string): Promise<BagClaimRecord> {
    await delay(240);
    return { ...this.activeBagClaim };
  }

  async listNotifications(): Promise<AppNotification[]> {
    await delay(180);
    return [...this.notifications];
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await delay(100);
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
    }
  }

  async getUnreadNotificationCount(): Promise<number> {
    await delay(100);
    return this.notifications.filter((n) => !n.read).length;
  }
}
