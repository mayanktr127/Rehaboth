import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { GoldButton } from '../components/GoldButton';
import { Fonts } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { calculateOrderPricing, ScentId } from '../domain';
import { defaultPaymentProvider, PaymentMethod } from '../services/payment';
import { apiService } from '../services/api';

export default function PaymentScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{
    pickupDate?: string;
    timeSlot?: string;
    garmentCount?: string;
    scentId?: string;
    hasDamage?: string;
    damageNotes?: string;
    damagePhotos?: string;
  }>();

  const count = parseInt(params.garmentCount || '4', 10);
  const scentId = (params.scentId as ScentId) || 'lavender';

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | undefined>(undefined);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic pricing calculated via domain pure function
  const pricing = useMemo(() => {
    return calculateOrderPricing(count, appliedPromo, scentId);
  }, [count, appliedPromo, scentId]);

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    const testPricing = calculateOrderPricing(count, code, scentId);
    if (testPricing.discountInr > 0) {
      setAppliedPromo(code);
      setPromoError(null);
    } else {
      setPromoError(testPricing.promoError || 'Invalid promo code. Try STEAMGOLD20 or REHABOTH100.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(undefined);
    setPromoCodeInput('');
    setPromoError(null);
  };

  const handlePayAndConfirm = async () => {
    setIsProcessing(true);
    try {
      // 1. Process payment via provider interface
      const paymentResult = await defaultPaymentProvider.processPayment({
        amountInr: pricing.finalTotalInr,
        method: selectedMethod,
      });

      if (!paymentResult.success) {
        Alert.alert('Payment Failed', paymentResult.errorMessage || 'Transaction could not be completed.');
        setIsProcessing(false);
        return;
      }

      // 2. Parse damage intake if present
      const damagePhotosList = params.damagePhotos ? JSON.parse(params.damagePhotos) : [];

      // 3. Create order via API service
      const createdOrder = await apiService.createOrder({
        addressId: 'addr_1',
        pickupDate: params.pickupDate || 'Today 24',
        timeSlot: params.timeSlot || '10:00 AM - 01:00 PM',
        garmentCount: count,
        scentId,
        promoCode: appliedPromo,
        paymentMethod: selectedMethod,
        damagedItemIntake: params.hasDamage === 'true' ? {
          hasDamage: true,
          notes: params.damageNotes || '',
          photoUris: damagePhotosList,
        } : undefined,
      });

      // 4. Route to order status screen
      router.replace({
        pathname: '/order-status' as any,
        params: { orderId: createdOrder.id },
      });
    } catch (err: any) {
      Alert.alert('Booking Error', err.message || 'Unable to finalize your booking.');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods: { id: PaymentMethod; label: string; sub: string; icon: string }[] = [
    { id: 'upi', label: 'UPI / Instant QR', sub: 'Google Pay, PhonePe, Paytm, BHIM', icon: '⚡' },
    { id: 'card', label: 'Credit or Debit Card', sub: 'Visa, Mastercard, Amex, RuPay', icon: '💳' },
    { id: 'netbanking', label: 'Net Banking', sub: 'All major Indian banking institutions', icon: '🏦' },
    { id: 'cod', label: 'Pay on Doorstep Valet', sub: 'Cash or QR scan at pickup handover', icon: '🤝' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FluidPage style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
          overScrollMode="never"
          bounces={true}
        >
          <TopHeaderNav showBack={true} />

          {/* Screen Title */}
          <View style={styles.titleSection}>
            <Text style={[styles.categorySubtitle, { color: colors.mutedForeground }]}>
              STEP 3 OF 3 • SETTLEMENT & SECURITY
            </Text>
            <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Review & Pay
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Clear atelier pricing with complimentary garment inspection and tamper-evident sealed transit.
            </Text>
          </View>

          {/* Price Breakdown Card */}
          <View style={[styles.breakdownCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.cardHeader, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Service Valuation
            </Text>

            <View style={styles.lineRow}>
              <Text style={[styles.lineLabel, { color: colors.textSecondary }]}>
                Atelier Pressing ({count} × ₹{pricing.ratePerGarmentInr})
              </Text>
              <Text style={[styles.lineValue, { color: colors.foreground }]}>
                ₹{pricing.garmentsSubtotalInr}
              </Text>
            </View>

            <View style={styles.lineRow}>
              <Text style={[styles.lineLabel, { color: colors.textSecondary }]}>
                Botanical Scent Vapor Infusion
              </Text>
              <Text style={[styles.lineValueFree, { color: colors.primary }]}>
                {pricing.fragranceFeeInr > 0 ? `₹${pricing.fragranceFeeInr} (Royal Sandalwood)` : 'COMPLIMENTARY'}
              </Text>
            </View>

            <View style={styles.lineRow}>
              <Text style={[styles.lineLabel, { color: colors.textSecondary }]}>
                Valet Pickup & Doorstep Delivery
              </Text>
              <Text style={[styles.lineValueFree, { color: colors.primary }]}>
                COMPLIMENTARY
              </Text>
            </View>

            {pricing.discountInr > 0 && (
              <View style={styles.lineRow}>
                <Text style={[styles.lineLabelDiscount, { color: colors.primary }]}>
                  Privilege Discount ({appliedPromo})
                </Text>
                <Text style={[styles.lineValueDiscount, { color: colors.primary }]}>
                  -₹{pricing.discountInr}
                </Text>
              </View>
            )}

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.foreground, fontFamily: Fonts.display }]}>
                Total Payable
              </Text>
              <Text style={[styles.totalValue, { color: colors.foreground, fontFamily: Fonts.display }]}>
                ₹{pricing.finalTotalInr}
              </Text>
            </View>
          </View>

          {/* Promo Code Section */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              PRIVILEGE CODE
            </Text>

            {appliedPromo ? (
              <View style={[styles.appliedPromoBadge, { backgroundColor: colors.secondary, borderColor: colors.primary }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.appliedCodeText, { color: colors.foreground }]}>
                    ✓ {appliedPromo} applied
                  </Text>
                  <Text style={[styles.appliedCodeSub, { color: colors.mutedForeground }]}>
                    Saved ₹{pricing.discountInr} on this wardrobe session
                  </Text>
                </View>
                <Pressable onPress={handleRemovePromo} style={styles.removePromoBtn}>
                  <Text style={[styles.removePromoText, { color: colors.destructive }]}>Remove</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.promoInputRow}>
                <TextInput
                  style={[
                    styles.promoInput,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: promoError ? colors.destructive : colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  placeholder="e.g. STEAMGOLD20"
                  placeholderTextColor={colors.mutedForeground}
                  autoCapitalize="characters"
                  value={promoCodeInput}
                  onChangeText={(text) => {
                    setPromoCodeInput(text);
                    if (promoError) setPromoError(null);
                  }}
                />
                <Pressable
                  onPress={handleApplyPromo}
                  style={[styles.applyBtn, { backgroundColor: colors.foreground }]}
                >
                  <Text style={[styles.applyBtnText, { color: colors.primaryForeground }]}>APPLY</Text>
                </Pressable>
              </View>
            )}

            {promoError && (
              <Text style={[styles.promoErrorText, { color: colors.destructive }]}>
                {promoError}
              </Text>
            )}
          </View>

          {/* Payment Method Selector */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              PAYMENT METHOD
            </Text>
            <View style={styles.methodsList}>
              {paymentMethods.map((m) => {
                const isSelected = selectedMethod === m.id;
                return (
                  <Pressable
                    key={m.id}
                    onPress={() => setSelectedMethod(m.id)}
                    style={({ pressed }) => [
                      styles.methodCard,
                      {
                        backgroundColor: colors.cardBg,
                        borderColor: isSelected ? colors.primary : colors.border,
                        borderWidth: isSelected ? 2 : 1,
                      },
                      pressed && { opacity: 0.9 },
                    ]}
                  >
                    <Text style={styles.methodIcon}>{m.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.methodLabel, { color: colors.foreground }]}>
                        {m.label}
                      </Text>
                      <Text style={[styles.methodSub, { color: colors.mutedForeground }]}>
                        {m.sub}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioIndicator,
                        {
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                        },
                      ]}
                    >
                      {isSelected && <Text style={styles.checkTick}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Pay Button */}
          <View style={styles.actionSection}>
            {isProcessing ? (
              <View style={[styles.processingBox, { backgroundColor: colors.foreground }]}>
                <ActivityIndicator color={colors.primaryForeground} />
                <Text style={[styles.processingText, { color: colors.primaryForeground }]}>
                  Securing atelier session...
                </Text>
              </View>
            ) : (
              <GoldButton
                title={`PAY ₹${pricing.finalTotalInr} & CONFIRM`}
                onPress={handlePayAndConfirm}
                showArrow={true}
              />
            )}
          </View>
        </ScrollView>
      </FluidPage>

      <FloatingDockNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 160,
  },
  titleSection: {
    marginTop: 18,
    marginBottom: 20,
  },
  categorySubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  screenTitle: {
    fontSize: 32,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  breakdownCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 18,
    marginBottom: 16,
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lineLabel: {
    fontSize: 13,
  },
  lineValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  lineValueFree: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  lineLabelDiscount: {
    fontSize: 13,
    fontWeight: '600',
  },
  lineValueDiscount: {
    fontSize: 14,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
  },
  totalValue: {
    fontSize: 24,
    letterSpacing: -0.5,
  },
  sectionMargin: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  promoInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  promoInput: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  applyBtn: {
    borderRadius: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  promoErrorText: {
    fontSize: 12,
    marginTop: 6,
  },
  appliedPromoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  appliedCodeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  appliedCodeSub: {
    fontSize: 12,
    marginTop: 2,
  },
  removePromoBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removePromoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  methodsList: {
    gap: 10,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 18,
    padding: 16,
  },
  methodIcon: {
    fontSize: 22,
  },
  methodLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  methodSub: {
    fontSize: 11,
    marginTop: 2,
  },
  radioIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkTick: {
    color: '#fffaf4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionSection: {
    marginTop: 30,
  },
  processingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 18,
    paddingVertical: 18,
  },
  processingText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
