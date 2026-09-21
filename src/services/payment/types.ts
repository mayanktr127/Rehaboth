export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';

export interface PaymentRequest {
  orderId?: string;
  amountInr: number;
  method: PaymentMethod;
  customerPhone?: string;
  customerName?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  status: 'captured' | 'failed' | 'pending';
  method: PaymentMethod;
  timestamp: string;
  errorMessage?: string;
}

export interface IPaymentProvider {
  readonly providerName: string;
  processPayment(request: PaymentRequest): Promise<PaymentResult>;
  verifyPayment(transactionId: string): Promise<boolean>;
}
