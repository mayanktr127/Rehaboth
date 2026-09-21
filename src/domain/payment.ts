export type PaymentMethodType = 'card' | 'upi' | 'netbanking' | 'valet_cash';

export interface PaymentOption {
  id: PaymentMethodType;
  title: string;
  subtitle: string;
  iconGlyph: string;
}

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa ending in 4821 • Exp 12/28',
    iconGlyph: '💳',
  },
  {
    id: 'upi',
    title: 'Instant UPI',
    subtitle: 'Google Pay, PhonePe, Paytm, BHIM',
    iconGlyph: '⚡',
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    subtitle: 'HDFC, ICICI, SBI, Axis, Kotak',
    iconGlyph: '🏛️',
  },
  {
    id: 'valet_cash',
    title: 'Valet at Doorstep',
    subtitle: 'Card or UPI payment upon pickup',
    iconGlyph: '🤝',
  },
];

export interface PaymentTransactionResult {
  transactionId: string;
  orderId: string;
  amountInr: number;
  paymentMethod: PaymentMethodType;
  status: 'authorized' | 'captured' | 'failed';
  providerReference?: string;
  timestamp: string;
}
