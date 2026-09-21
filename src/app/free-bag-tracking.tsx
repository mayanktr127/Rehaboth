import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { ShoppingBagsIcon } from '../components/ServiceIcons';

export default function FreeBagTrackingScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const bagMilestones = [
    {
      title: 'Smart Bag Allocated',
      desc: 'Registered NFC Token #SB-IND-8821 to your patron profile',
      time: 'Yesterday, 11:30 AM',
      completed: true,
      active: false,
    },
    {
      title: 'Cryptographic Pair & Seal Test',
      desc: 'Calibrated near-field security sensor and zero-snag zip lining',
      time: 'Yesterday, 3:45 PM',
      completed: true,
      active: false,
    },
    {
      title: 'Dispatched via Atelier Courier',
      desc: 'Transit package #BLUEDART-8829104 in transit to Bangalore Hub',
      time: 'Today, 8:15 AM',
      completed: true,
      active: false,
    },
    {
      title: 'Doorstep Courier Arrival',
      desc: 'Out for contactless drop-off with tamper-evident seal kit',
      time: 'Expected: Today, by 5:00 PM',
      completed: false,
      active: true,
    },
    {
      title: 'Patron Unboxing & Tap Sync',
      desc: 'Hold smartphone to brass medallion to activate instant valet summoning',
      time: 'Pending Delivery',
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
          <TopHeaderNav showBack={true} />

          {/* Header */}
          <View style={styles.titleSection}>
            <Text style={[styles.categorySubtitle, { color: colors.primary }]}>
              COMPLIMENTARY WELCOME GIFT
            </Text>
            <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Smart Bag Dispatch
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Your custom water-repellent canvas wardrobe bag equipped with embedded NFC tap-to-summon technology is on its way.
            </Text>
          </View>

          {/* Bag Preview Badge Card */}
          <View style={[styles.bagCard, { backgroundColor: colors.foreground }]}>
            <View style={styles.bagCardContent}>
              <View style={[styles.bagIconCircle, { backgroundColor: '#473d33' }]}>
                <ShoppingBagsIcon size={26} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.bagCardTitle, { color: colors.primaryForeground, fontFamily: Fonts.display }]}>
                  Atelier Smart Garment Bag
                </Text>
                <Text style={styles.bagCardSub}>
                  Token: #SB-IND-8821 • 10-Garment Capacity
                </Text>
              </View>
            </View>

            <View style={styles.specPillRow}>
              <View style={styles.specPill}>
                <Text style={styles.specPillText}>Waterproof Canvas</Text>
              </View>
              <View style={styles.specPill}>
                <Text style={styles.specPillText}>NFC Tap Sync</Text>
              </View>
              <View style={styles.specPill}>
                <Text style={styles.specPillText}>Numbered Seal Latch</Text>
              </View>
            </View>
          </View>

          {/* Dispatch Timeline */}
          <View style={styles.timelineSection}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              DISPATCH MILESTONES
            </Text>

            <View style={styles.timelineList}>
              {bagMilestones.map((step, idx) => {
                const isLast = idx === bagMilestones.length - 1;
                return (
                  <View key={idx} style={styles.timelineItemRow}>
                    {/* Left Column: indicator & line */}
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
                              backgroundColor: step.completed ? colors.primary : colors.border,
                            },
                          ]}
                        />
                      )}
                    </View>

                    {/* Right Column: details */}
                    <View style={styles.rightCol}>
                      <View style={styles.stepTitleRow}>
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
                      </View>
                      <Text style={[styles.stepTime, { color: colors.mutedForeground }]}>
                        {step.time}
                      </Text>
                      <Text
                        style={[
                          styles.stepDesc,
                          {
                            color: step.completed || step.active ? colors.textSecondary : colors.mutedForeground,
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

          {/* NFC Instructions Card */}
          <View style={[styles.instructionsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.instructionsTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              How NFC Tap-to-Summon Works
            </Text>
            <Text style={[styles.instructionStep, { color: colors.textSecondary }]}>
              1. Fill your bag with up to 10 garments whenever dry-cleaning or steam is needed.
            </Text>
            <Text style={[styles.instructionStep, { color: colors.textSecondary }]}>
              2. Fasten the numbered security zip with the tamper-evident green seal tag.
            </Text>
            <Text style={[styles.instructionStep, { color: colors.textSecondary }]}>
              3. Tap your phone to the brass emblem to summon a doorstep valet in under 3 hours without opening the app.
            </Text>
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
  bagCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  bagCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  bagIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bagCardTitle: {
    fontSize: 17,
  },
  bagCardSub: {
    color: '#b5aca1',
    fontSize: 12,
    marginTop: 2,
  },
  specPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  specPillText: {
    color: '#fffaf4',
    fontSize: 11,
    fontWeight: '600',
  },
  timelineSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  timelineList: {
    gap: 4,
  },
  timelineItemRow: {
    flexDirection: 'row',
    minHeight: 74,
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
    paddingBottom: 22,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 14,
  },
  stepTime: {
    fontSize: 11,
    marginTop: 2,
  },
  stepDesc: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  instructionsCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    marginTop: 14,
  },
  instructionsTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  instructionStep: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
});
