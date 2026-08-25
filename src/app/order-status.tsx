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
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { JacketIcon } from '../components/ServiceIcons';
import { FluidPage } from '../components/FluidMotion';

export default function OrderStatusScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const progressSteps = [
    {
      title: 'Pickup Scheduled',
      desc: 'Delivery partner assigned, pickup inbound',
      completed: true,
      active: false,
    },
    {
      title: 'Secured & Picked Up',
      desc: 'Garments cataloged and tag registered',
      completed: true,
      active: false,
    },
    {
      title: 'Arrived at Processing Studio',
      desc: 'Detailed inspect at Carlyle Studio',
      completed: true,
      active: false,
    },
    {
      title: 'Active Pressing & Steam',
      desc: 'French lavender vapor finish in progress',
      completed: true,
      active: true,
    },
    {
      title: 'Artisan Quality Assurance',
      desc: 'Zero-deflect seam check.',
      completed: false,
      active: false,
    },
    {
      title: 'En Route to Wardrobe',
      desc: 'Sealed storage delivery run.',
      completed: false,
      active: false,
    },
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
          {/* Top Header */}
          <TopHeaderNav showBack={true} onBackPress={() => router.push('/dashboard')} />

          {/* Estimated Delivery Banner */}
          <View style={styles.deliverySection}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              ESTIMATED DELIVERY
            </Text>
            <Text style={[styles.deliveryDate, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Tomorrow, 5:00 PM
            </Text>
          </View>

          {/* Delivery Partner Custodian Card */}
          <View style={[styles.partnerCard, { backgroundColor: colors.foreground }]}>
            <View style={styles.partnerInfoRow}>
              <View style={[styles.avatarCircle, { backgroundColor: '#f2e8dc' }]}>
                <JacketIcon size={22} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.partnerName, { color: colors.primaryForeground }]}>Delivery Partner: Rajesh</Text>
                <Text style={styles.partnerId}>Custodian ID: #ST-VAL-904</Text>
              </View>
              <Pressable
                onPress={() => Alert.alert('Calling Custodian', 'Dialing +91 98765 43210...')}
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

          {/* Order Progress Timeline */}
          <View style={styles.timelineSection}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              ORDER PROGRESS
            </Text>



          <View style={styles.timelineList}>
            {progressSteps.map((step, idx) => {
              const isLast = idx === progressSteps.length - 1;
              return (
                <View key={idx} style={styles.timelineItemRow}>
                  {/* Left Column */}
                  <View style={styles.leftCol}>
                    {step.completed && !step.active ? (
                      <View style={[styles.stepCircleActive, { backgroundColor: colors.primary }]}>
                        <Text style={styles.stepCheck}>✓</Text>
                      </View>
                    ) : step.active ? (
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
                            backgroundColor: step.completed
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
                          color: step.active
                            ? colors.primary
                            : step.completed
                            ? colors.foreground
                            : colors.mutedForeground,
                          fontWeight: step.active ? '700' : '600',
                        },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text
                      style={[
                        styles.stepDesc,
                        {
                          color: step.completed ? colors.textSecondary : colors.mutedForeground,
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
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 6,
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
});
