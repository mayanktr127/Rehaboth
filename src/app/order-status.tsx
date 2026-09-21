import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { JacketIcon } from '../components/ServiceIcons';
import { FluidPage } from '../components/FluidMotion';
import { useOrderStatus } from '../services/hooks';
import { CardSkeleton } from '../components/SkeletonLoader';
import { OrderStatusStage } from '../domain';

export default function OrderStatusScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ orderId?: string }>();
  const { order, loading, error, refresh } = useOrderStatus(params.orderId);

  // Status mapping to pipeline step index
  const statusStepIndex: Record<OrderStatusStage, number> = {
    pickup_scheduled: 0,
    custody_secured: 1,
    studio_intake: 2,
    active_steaming: 3,
    artisan_qa: 4,
    en_route_delivery: 5,
    delivered: 6,
    cancelled: -1,
  };

  const currentStep = order ? (statusStepIndex[order.status] ?? 3) : 3;

  const defaultPipeline = [
    {
      title: 'Pickup Scheduled',
      desc: 'Delivery partner assigned, pickup inbound',
    },
    {
      title: 'Secured & Picked Up',
      desc: 'Garments cataloged with tamper-evident seal',
    },
    {
      title: 'Arrived at Processing Studio',
      desc: 'Detailed fiber inspection at Carlyle Studio',
    },
    {
      title: 'Active Pressing & Steam',
      desc: 'Atelier French lavender vapor finish in progress',
    },
    {
      title: 'Artisan Quality Assurance',
      desc: 'Zero-defect seam & hand-rolled lapel check',
    },
    {
      title: 'En Route to Wardrobe',
      desc: 'Climate-controlled sealed delivery run',
    },
  ];

  const canCancel = order && !['delivered', 'cancelled', 'artisan_qa', 'en_route_delivery'].includes(order.status);
  const isDelivered = order?.status === 'delivered';
  const isCancelled = order?.status === 'cancelled';

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
          {/* Top Header */}
          <TopHeaderNav showBack={true} onBackPress={() => router.push('/dashboard')} />

          {loading ? (
            <View style={{ marginTop: 24 }}>
              <CardSkeleton />
              <View style={{ marginTop: 20 }}>
                <CardSkeleton />
              </View>
            </View>
          ) : error ? (
            <View style={[styles.errorCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={[styles.errorTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                Order status unavailable
              </Text>
              <Text style={[styles.errorDesc, { color: colors.mutedForeground }]}>
                {error || 'Unable to retrieve your order timeline.'}
              </Text>
              <Pressable
                onPress={refresh}
                style={[styles.retryBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.retryBtnText}>Retry</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {/* Estimated Delivery Banner */}
              <View style={styles.deliverySection}>
                <View style={styles.headerRow}>
                  <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                    {isCancelled ? 'ORDER CANCELLED' : 'ESTIMATED DELIVERY'}
                  </Text>
                  <Text style={[styles.orderNumberBadge, { color: colors.primary }]}>
                    #{order?.orderNumber || 'ST-9482'}
                  </Text>
                </View>
                <Text style={[styles.deliveryDate, { color: isCancelled ? colors.destructive : colors.foreground, fontFamily: Fonts.display }]}>
                  {isCancelled ? 'Booking Withdrawn' : (order?.estimatedDelivery || 'Tomorrow, 5:00 PM')}
                </Text>
              </View>

              {/* Delivery Partner Custodian Card */}
              <View style={[styles.partnerCard, { backgroundColor: colors.foreground }]}>
                <View style={styles.partnerInfoRow}>
                  <View style={[styles.avatarCircle, { backgroundColor: '#f2e8dc' }]}>
                    <JacketIcon size={22} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.partnerName, { color: colors.primaryForeground }]}>
                      Custodian: {order?.custodianName || 'Rajesh K.'}
                    </Text>
                    <Text style={styles.partnerId}>
                      Valet Token: {order?.custodianId || '#ST-VAL-904'} • {order?.garmentCount || 4} Garments
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => Alert.alert('Calling Custodian', `Dialing ${order?.custodianPhone || '+91 98765 43210'}...`)}
                    style={({ pressed }) => [
                      styles.telBadge,
                      { borderColor: colors.primary },
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Text style={[styles.telText, { color: colors.primary }]}>TEL</Text>
                  </Pressable>
                </View>
              </View>

              {/* Handover PIN Quick Action */}
              {order?.handoverCode && (
                <Pressable
                  onPress={() => router.push('/secure-handover')}
                  style={[styles.pinCallout, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                >
                  <Text style={[styles.pinCalloutLabel, { color: colors.mutedForeground }]}>HANDOVER VERIFICATION PIN</Text>
                  <Text style={[styles.pinCalloutValue, { color: colors.primary, fontFamily: Fonts.display }]}>
                    {order.handoverCode}
                  </Text>
                  <Text style={[styles.pinCalloutSub, { color: colors.mutedForeground }]}>
                    Share with your courier upon doorstep exchange.
                  </Text>
                </Pressable>
              )}

              {/* Order Progress Timeline */}
              <View style={styles.timelineSection}>
                <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                  ORDER PROGRESS
                </Text>

                <View style={styles.timelineList}>
                  {defaultPipeline.map((step, idx) => {
                    const isLast = idx === defaultPipeline.length - 1;
                    const isCompleted = !isCancelled && idx < currentStep;
                    const isActive = !isCancelled && idx === currentStep;

                    return (
                      <View key={idx} style={styles.timelineItemRow}>
                        {/* Left Column */}
                        <View style={styles.leftCol}>
                          {isCompleted ? (
                            <View style={[styles.stepCircleActive, { backgroundColor: colors.primary }]}>
                              <Text style={styles.stepCheck}>✓</Text>
                            </View>
                          ) : isActive ? (
                            <View style={[styles.stepCircleCurrent, { borderColor: colors.primary, backgroundColor: colors.cardBg }]}>
                              <View style={[styles.stepInnerDot, { backgroundColor: colors.primary }]} />
                            </View>
                          ) : (
                            <View style={[styles.stepCircleInactive, { borderColor: colors.border, backgroundColor: colors.cardBg }]} />
                          )}
                          {!isLast && (
                            <View
                              style={[
                                styles.verticalLine,
                                {
                                  backgroundColor: isCompleted
                                    ? colors.primary
                                    : colors.border,
                                },
                              ]}
                            />
                          )}
                        </View>

                        {/* Right Column */}
                        <View style={styles.rightCol}>
                          <Text
                            style={[
                              styles.stepTitle,
                              {
                                color: isActive
                                  ? colors.primary
                                  : isCompleted
                                  ? colors.foreground
                                  : colors.mutedForeground,
                                fontWeight: isActive ? '700' : '600',
                              },
                            ]}
                          >
                            {step.title}
                          </Text>
                          <Text
                            style={[
                              styles.stepDesc,
                              {
                                color: isCompleted || isActive ? colors.textSecondary : colors.mutedForeground,
                              },
                            ]}
                          >
                            {step.desc}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsContainer}>
                {canCancel && (
                  <Pressable
                    onPress={() => router.push(`/cancel-order?orderId=${order.id}` as any)}
                    style={({ pressed }) => [
                      styles.cancelButton,
                      { borderColor: colors.border, backgroundColor: colors.cardBg },
                      pressed && { opacity: 0.8 },
                    ]}
                  >
                    <Text style={[styles.cancelButtonText, { color: colors.destructive }]}>
                      Cancel Order & View Refund Policy
                    </Text>
                  </Pressable>
                )}

                {isDelivered && (
                  <Pressable
                    onPress={() => router.push(`/rate-delivery?orderId=${order.id}` as any)}
                    style={({ pressed }) => [
                      styles.primaryActionButton,
                      { backgroundColor: colors.primary },
                      pressed && { opacity: 0.9 },
                    ]}
                  >
                    <Text style={styles.primaryActionText}>
                      Rate Service Experience ★★★★★
                    </Text>
                  </Pressable>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </FluidPage>

      {/* Floating Bottom Dock Navigation */}
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
  deliverySection: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  orderNumberBadge: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  deliveryDate: {
    fontSize: 28,
    letterSpacing: -0.5,
  },
  partnerCard: {
    borderRadius: 24,
    padding: 18,
    marginTop: 20,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  partnerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#473d33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  partnerId: {
    color: '#b5aca1',
    fontSize: 11,
    marginTop: 2,
  },
  telBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  telText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pinCallout: {
    marginTop: 18,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  pinCalloutLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  pinCalloutValue: {
    fontSize: 28,
    letterSpacing: 6,
    marginVertical: 4,
  },
  pinCalloutSub: {
    fontSize: 12,
  },
  timelineSection: {
    marginTop: 28,
  },
  timelineList: {
    marginTop: 14,
  },
  timelineItemRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  leftCol: {
    width: 28,
    alignItems: 'center',
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  stepCheck: {
    color: '#fffaf4',
    fontSize: 12,
    fontWeight: '700',
  },
  stepCircleCurrent: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  stepInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepCircleInactive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    marginTop: 1,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  rightCol: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 14,
  },
  stepDesc: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
  actionsContainer: {
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  primaryActionButton: {
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryActionText: {
    color: '#fffaf4',
    fontSize: 14,
    fontWeight: '700',
  },
  errorCard: {
    marginTop: 28,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  errorDesc: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  retryBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
