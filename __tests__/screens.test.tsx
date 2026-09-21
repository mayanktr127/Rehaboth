import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../src/components/ThemeContext';
import { I18nProvider } from '../src/i18n';
import VerificationScreen from '../src/app/verification';
import ScentSelectionScreen from '../src/app/scent-selection';
import PaymentScreen from '../src/app/payment';
import CancelOrderScreen from '../src/app/cancel-order';

const renderWithProviders = async (component: React.ReactElement) => {
  return await render(
    <ThemeProvider>
      <I18nProvider>{component}</I18nProvider>
    </ThemeProvider>
  );
};

describe('Customer Screens Render & Interactions', () => {
  describe('Verification Screen', () => {
    it('renders heading and countdown timer', async () => {
      const { getByText, getByLabelText } = await renderWithProviders(<VerificationScreen />);
      expect(getByText(/Verify Your Number/i)).toBeTruthy();
      expect(getByText(/Resend code in/i)).toBeTruthy();
      expect(getByLabelText(/Digit 1 of 4/i)).toBeTruthy();
    });

    it('renders VERIFY & CONTINUE button', async () => {
      const { getByText } = await renderWithProviders(<VerificationScreen />);
      expect(getByText(/VERIFY & CONTINUE/i)).toBeTruthy();
    });
  });

  describe('Scent Selection Screen', () => {
    it('renders all four signature scents', async () => {
      const { getByText } = await renderWithProviders(<ScentSelectionScreen />);
      expect(getByText(/Signature Scent/i)).toBeTruthy();
      expect(getByText(/Kashmir Lavender/i)).toBeTruthy();
      expect(getByText(/Fresh Crisp Cotton/i)).toBeTruthy();
      expect(getByText(/Mysore Royal Sandalwood/i)).toBeTruthy();
      expect(getByText(/Pure Neutral/i)).toBeTruthy();
    });

    it('renders save default aroma switch and continue button', async () => {
      const { getByText } = await renderWithProviders(<ScentSelectionScreen />);
      expect(getByText(/Save as Default Wardrobe Aroma/i)).toBeTruthy();
      expect(getByText(/CONTINUE TO PAYMENT/i)).toBeTruthy();
    });
  });

  describe('Payment Screen', () => {
    it('renders valuation breakdown, payment methods, and confirm button', async () => {
      const { getByText } = await renderWithProviders(<PaymentScreen />);
      expect(getByText(/Review & Pay/i)).toBeTruthy();
      expect(getByText(/Service Valuation/i)).toBeTruthy();
      expect(getByText(/UPI \/ Instant QR/i)).toBeTruthy();
      expect(getByText(/Credit or Debit Card/i)).toBeTruthy();
      expect(getByText(/PAY ₹\d+ & CONFIRM/i)).toBeTruthy();
    });

    it('applies promo code successfully and updates discount', async () => {
      const { getByPlaceholderText, getByText } = await renderWithProviders(<PaymentScreen />);
      const promoInput = getByPlaceholderText('e.g. STEAMGOLD20');
      fireEvent.changeText(promoInput, 'STEAMGOLD20');

      await waitFor(() => {
        expect(promoInput.props.value).toBe('STEAMGOLD20');
      });

      const applyBtn = getByText('APPLY');
      fireEvent.press(applyBtn);

      await waitFor(() => {
        expect(getByText(/applied/i)).toBeTruthy();
        expect(getByText('Remove')).toBeTruthy();
      });
    });
  });

  describe('Cancel Order Screen', () => {
    it('renders cancellation header and schedule explanation', async () => {
      const { getByText } = await renderWithProviders(<CancelOrderScreen />);

      await waitFor(() => {
        expect(getByText(/Cancel Session/i)).toBeTruthy();
        expect(getByText(/Atelier Cancellation Schedule/i)).toBeTruthy();
        expect(getByText(/Prior to Valet Arrival/i)).toBeTruthy();
        expect(getByText(/100% Refund/i)).toBeTruthy();
      });
    });
  });
});
