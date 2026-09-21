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
import { Fonts } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { useOrderStatus } from '../services/hooks';
import {
  CancellationReason,
  CANCELLATION_REASONS,
  calculateRefundAmount,
} from '../domain';
import { apiService } from '../services/api';
import { CardSkeleton } from '../components/SkeletonLoader';

export default function CancelOrderScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ orderId?: string }>();
  const { order, loading } = useOrderStatus(params.orderId);

  const [selectedReason, setSelectedReason] = useState<CancellationReason>('schedule_conflict');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute refund estimation dynamically based on current order status
  const refundEstimate = useMemo(() => {
    if (!order) {
      return {
        orderId: '',
        currentStage: 'pickup_scheduled' as const,
        eligibleForRefund: true,
        refundPercentage: 100,
        totalPaidInr: 0,
        refundAmountInr: 0,
        deductionAmountInr: 0,
        explanation: '100% refund prior to pickup.',
      };
    }
    return calculateRefundAmount(order, selectedReason);
  }, [order, selectedReason]);

  const handleConfirmCancellation = async () => {
    if (!order) return;

    Alert.alert(
      'Confirm Cancellation',
      `Are you sure you want to cancel session #${order.orderNumber}? A refund of ₹${refundEstimate.refundAmountInr} will be initiated to your payment source.`,
      [
        { text: 'Keep Session', style: 'cancel' },
        {
          text: 'Cancel Order',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              await apiService.cancelOrder(order.id, selectedReason);
              Alert.alert(
                'Order Cancelled',
                `Session #${order.orderNumber} has been withdrawn. Refund of ₹${refundEstimate.refundAmountInr} initiated.`,
                [{ text: 'Return to Dashboard', onPress: () => router.replace('/dashboard') }]
              );
            } catch (err: any) {
              Alert.alert('Cancellation Error', err.message || 'Unable to cancel order.');
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

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

          {/* Screen Header */}
          <View style={styles.titleSection}>
            <Text style={[styles.categorySubtitle, { color: colors.destructive }]}>
              BOOKING ADJUSTMENT
            </Text>
            <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Cancel Session
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Review fair refund schedule and share your feedback before releasing our valet reservation.
            </Text>
          </View>

          {loading ? (
            <View style={{ marginTop: 16 }}>
              <CardSkeleton />
            </View>
          ) : !order ? (
            <View style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                Order Not Found
              </Text>
              <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
                No active wardrobe session matches the specified token.
              </Text>
            </View>
          ) : (
            <>
              {/* Order Context Card */}
              <View style={[styles.orderSummaryCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <View style={styles.summaryTopRow}>
                  <Text style={[styles.orderNum, { color: colors.foreground, fontFamily: Fonts.display }]}>
                    #{order.orderNumber}
                  </Text>
                  <Text style={[styles.orderStatusChip, { color: colors.primary, backgroundColor: colors.secondary }]}>
                    {order.status.replace(/_/g, ' ').toUpperCase()}
                  </Text>
                </View>
                <Text style={[styles.summaryDetails, { color: colors.mutedForeground }]}>
                  {order.garmentCount} Garments • Total ₹{order.totalAmountInr} • Valet {order.custodianName}
                </Text>
              </View>

              {/* Refund Computation Card */}
              <View style={[styles.refundCard, { backgroundColor: colors.secondary, borderColor: colors.primary }]}>
                <Text style={[styles.refundSectionLabel, { color: colors.primary }]}>
                  COMPUTED REFUND ESTIMATE
                </Text>
                <View style={styles.refundAmountRow}>
                  <Text style={[styles.refundAmount, { color: colors.foreground, fontFamily: Fonts.display }]}>
                    ₹{refundEstimate.refundAmountInr}
                  </Text>
                  <Text style={[styles.refundPercentBadge, { color: colors.primaryForeground, backgroundColor: colors.primary }]}>
                    {refundEstimate.refundPercentage}% REFUND
                  </Text>
                </View>
                <Text style={[styles.refundPolicyExplanation, { color: colors.mutedForeground }]}>
                  {refundEstimate.explanation}
                </Text>
                {refundEstimate.deductionAmountInr > 0 && (
                  <Text style={[styles.deductionNotice, { color: colors.destructive }]}>
                    Includes ₹{refundEstimate.deductionAmountInr} logistics retention fee.
                  </Text>
                )}
              </View>

              {/* Policy Table */}
              <View style={[styles.policyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <Text style={[styles.policyHeader, { color: colors.foreground, fontFamily: Fonts.display }]}>
                  Atelier Cancellation Schedule
                </Text>
                <View style={styles.policyRow}>
                  <Text style={[styles.policyStage, { color: colors.foreground }]}>Prior to Valet Arrival</Text>
                  <Text style={[styles.policyRate, { color: colors.primary }]}>100% Refund</Text>
                </View>
                <View style={styles.policyRow}>
                  <Text style={[styles.policyStage, { color: colors.foreground }]}>En Route / In Valet Custody</Text>
                  <Text style={[styles.policyRate, { color: colors.foreground }]}>90% Refund</Text>
                </View>
                <View style={styles.policyRow}>
                  <Text style={[styles.policyStage, { color: colors.foreground }]}>Studio Intake & Inspection</Text>
                  <Text style={[styles.policyRate, { color: colors.foreground }]}>50% Refund</Text>
                </View>
                <View style={styles.policyRow}>
                  <Text style={[styles.policyStage, { color: colors.mutedForeground }]}>Active Steam Processing</Text>
                  <Text style={[styles.policyRate, { color: colors.destructive }]}>Non-refundable</Text>
                </View>
              </View>

              {/* Cancellation Reason Selector */}
              <View style={styles.sectionMargin}>
                <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                  SELECT REASON FOR WITHDRAWAL
                </Text>

                <View style={styles.reasonsList}>
                  {CANCELLATION_REASONS.map((r) => {
                    const isSelected = selectedReason === r.id;
                    return (
                      <Pressable
                        key={r.id}
                        onPress={() => setSelectedReason(r.id)}
                        style={({ pressed }) => [
                          styles.reasonRow,
                          {
                            backgroundColor: colors.cardBg,
                            borderColor: isSelected ? colors.primary : colors.border,
                            borderWidth: isSelected ? 2 : 1,
                          },
                          pressed && { opacity: 0.9 },
                        ]}
                      >
                        <Text style={[styles.reasonLabel, { color: colors.foreground }]}>
                          {r.label}
                        </Text>
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

                {/* Additional Notes */}
                <TextInput
                  style={[
                    styles.notesInput,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  placeholder="Optional details for our concierge team..."
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  numberOfLines={3}
                  value={additionalNotes}
                  onChangeText={setAdditionalNotes}
                />
              </View>

              {/* Cancellation CTA */}
              <View style={styles.actionSection}>
                {isSubmitting ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Pressable
                    onPress={handleConfirmCancellation}
                    style={({ pressed }) => [
                      styles.confirmCancelBtn,
                      { backgroundColor: colors.destructive },
                      pressed && { opacity: 0.88 },
                    ]}
                  >
                    <Text style={styles.confirmCancelBtnText}>
                      CONFIRM CANCELLATION (REFUND ₹{refundEstimate.refundAmountInr})
                    </Text>
                  </Pressable>
                )}
              </View>
            </>
          )}
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
  orderSummaryCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderNum: {
    fontSize: 18,
  },
  orderStatusChip: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  summaryDetails: {
    fontSize: 13,
  },
  refundCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 18,
  },
  refundSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  refundAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 8,
  },
  refundAmount: {
    fontSize: 32,
    letterSpacing: -0.5,
  },
  refundPercentBadge: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  refundPolicyExplanation: {
    fontSize: 13,
    lineHeight: 18,
  },
  deductionNotice: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  policyCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
  },
  policyHeader: {
    fontSize: 16,
    marginBottom: 14,
  },
  policyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ece3d6',
  },
  policyStage: {
    fontSize: 13,
  },
  policyRate: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionMargin: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  reasonsList: {
    gap: 10,
    marginBottom: 14,
  },
  reasonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: '500',
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
  notesInput: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    fontSize: 13,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  actionSection: {
    marginTop: 28,
  },
  confirmCancelBtn: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmCancelBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
  },
});
