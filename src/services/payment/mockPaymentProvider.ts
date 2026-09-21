import { IPaymentProvider, PaymentRequest, PaymentResult } from './types';

/**
 * MockPaymentProvider simulates Razorpay / Cashfree gateway interactions
 * with realistic network latency, sandbox validation, and deterministic success.
 * Designed to be swapped with a real RazorpayProvider when keys are configured.
 */
export class MockPaymentProvider implements IPaymentProvider {
  public readonly providerName = 'MockSandboxPaymentGateway';

  async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    // Artificial latency (400ms - 800ms) simulating gateway round-trip
    await new Promise(resolve => setTimeout(resolve, 550));

    if (request.amountInr <= 0) {
      return {
        success: false,
        transactionId: `tx_failed_${Date.now()}`,
        status: 'failed',
        method: request.method,
        timestamp: new Date().toISOString(),
        errorMessage: 'Invalid payment amount.',
      };
    }

    const txId = `rzp_mock_${request.method}_${Date.now().toString(36)}`;

    return {
      success: true,
      transactionId: txId,
      status: request.method === 'cod' ? 'pending' : 'captured',
      method: request.method,
      timestamp: new Date().toISOString(),
    };
  }

  async verifyPayment(transactionId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return transactionId.startsWith('rzp_mock_');
  }
}

export const defaultPaymentProvider: IPaymentProvider = new MockPaymentProvider();
