import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { AuraOrb } from '../components/AuraOrb';
import { Fonts, DemoData } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { useOrders, useProfile } from '../services/hooks';
import { CardSkeleton } from '../components/SkeletonLoader';

import {
  BasketIcon,
  ShoppingBagsIcon,
  StopwatchIcon,
  PadlockIcon,
  CalendarIcon,
  JacketIcon,
  ShirtTieIcon,
  ChatBubbleIcon,
} from '../components/ServiceIcons';

export default function DashboardScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { orders, activeOrder, loading: ordersLoading } = useOrders();
  const { profile, loading: profileLoading } = useProfile();

  const services = [
    {
      id: '1',
      title: 'Studio Pickup',
      category: 'Doorstep Valet',
      price: 'Free',
      turnaround: '2-4 hrs',
      badge: 'POPULAR',
      renderIcon: () => <BasketIcon size={24} />,
      route: '/schedule-pickup',
    },
    {
      id: '2',
      title: 'Smart Bag Vault',
      category: 'NFC Token',
      price: '₹999',
      turnaround: 'Lifetime',
      badge: 'SIGNATURE',
      renderIcon: () => <ShoppingBagsIcon size={24} />,
      route: '/smart-bag-details',
    },
    {
      id: '3',
      title: 'Order Status',
      category: 'Live Tracking',
      price: 'Active',
      turnaround: 'Today 6PM',
      badge: 'LIVE',
      renderIcon: () => <StopwatchIcon size={24} />,
      route: '/order-status',
    },
    {
      id: '4',
      title: 'Secure Handover',
      category: 'PIN Security',
      price: 'Verified',
      turnaround: 'PIN #4921',
      badge: 'SECURITY',
      renderIcon: () => <PadlockIcon size={24} />,
      route: '/secure-handover',
    },
  ];

  const recentGarments = [
    {
      name: 'Armani Wool Blazer',
      treatment: 'Ultrasonic Steam & Lapel Roll',
      time: 'In Studio • Ready 5:30 PM',
      status: 'Steaming',
      renderIcon: () => <JacketIcon size={24} />,
    },
    {
      name: 'Raw Silk Festive Kurta',
      treatment: 'French Lavender Gentle Press',
      time: 'Delivered Yesterday',
      status: 'Delivered',
      renderIcon: () => <ShirtTieIcon size={24} />,
    },
  ];

  return (
    <FluidPage style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="normal"
        overScrollMode="never"
        bounces={true}
      >
        {/* Top Header with Safe Area Insets Padding */}
        <TopHeaderNav />

        {/* Editorial Greeting */}
        <View style={styles.greetingSection}>
          <Text style={[styles.greetingSub, { color: colors.mutedForeground }]}>
            ATELIER STEAM & PRESS
          </Text>
          <Text style={[styles.greetingLine, { color: colors.foreground, fontFamily: Fonts.display }]}>
            Hello, {profile?.fullName?.split(' ')[0] || DemoData.user.fullName.split(' ')[0]}
          </Text>
          <Text style={[styles.greetingTagline, { color: colors.mutedForeground }]}>
            Your wardrobe valet is active for Indiranagar.
          </Text>
        </View>

        {/* Activity Summary Counter Row */}
        <View style={styles.summaryRow}>
          <View style={styles.counterGroup}>
            <Text style={[styles.counterLive, { color: colors.foreground, fontFamily: Fonts.display }]}>
              {String(orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length).padStart(2, '0')}
            </Text>
            <View style={[styles.counterDivider, { backgroundColor: colors.border }]} />
            <Text style={[styles.counterFaded, { color: colors.mutedForeground, fontFamily: Fonts.display }]}>
              {String(activeOrder?.garmentCount || orders.length || 4).padStart(2, '0')}
            </Text>
            <View style={styles.counterLabelBox}>
              <Text style={[styles.counterLabelLine, { color: colors.foreground }]}>Active Session</Text>
              <Text style={[styles.counterLabelSub, { color: colors.mutedForeground }]}>
                {activeOrder ? `${activeOrder.garmentCount} Pieces in Studio` : 'Ready for Pickup'}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push('/schedule-pickup')}
            style={({ pressed }) => [
              styles.calendarBtn,
              { backgroundColor: colors.cardBg, borderColor: colors.border },
              pressed && { opacity: 0.85, transform: [{ scale: 0.96 }] },
            ]}
          >
            <CalendarIcon size={22} />
          </Pressable>
        </View>

        {/* Live Order Tracker Banner Card */}
        {ordersLoading ? (
          <View style={{ marginVertical: 12 }}>
            <CardSkeleton />
          </View>
        ) : activeOrder ? (
          <View style={[styles.liveTrackerCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.trackerHeader}>
              <View style={styles.liveIndicatorRow}>
                <View style={[styles.pulseDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.liveText, { color: colors.primary }]}>
                  {activeOrder.status.replace(/_/g, ' ').toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.orderIdBadge, { color: colors.mutedForeground }]}>#{activeOrder.orderNumber}</Text>
            </View>

            <Text style={[styles.trackerTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Atelier Steam & Garment Care
            </Text>
            <Text style={[styles.trackerSub, { color: colors.mutedForeground }]}>
              Valet Custodian {activeOrder.custodianName || 'Assigned'} • Expected: {activeOrder.estimatedDelivery || 'Today 6:30 PM'}
            </Text>

            {/* Stepper Progress Pipeline */}
            <View style={styles.stepperContainer}>
              <View style={styles.stepItem}>
                <View style={[styles.stepCircleActive, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepCheck}>✓</Text>
                </View>
                <Text style={[styles.stepLabel, { color: colors.foreground }]}>Pickup</Text>
              </View>
              <View style={[styles.stepLineActive, { backgroundColor: colors.primary }]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircleActive, { backgroundColor: colors.primary }]}>
                  <Text style={styles.stepCheck}>✓</Text>
                </View>
                <Text style={[styles.stepLabel, { color: colors.foreground }]}>Steam</Text>
              </View>
              <View style={[styles.stepLineInactive, { backgroundColor: colors.border }]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircleCurrent, { borderColor: colors.primary, backgroundColor: colors.cardBg }]}>
                  <View style={[styles.stepInnerDot, { backgroundColor: colors.primary }]} />
                </View>
                <Text style={[styles.stepLabel, { color: colors.foreground }]}>Inspection</Text>
              </View>
              <View style={[styles.stepLineInactive, { backgroundColor: colors.border }]} />

              <View style={styles.stepItem}>
                <View style={[styles.stepCircleInactive, { borderColor: colors.border, backgroundColor: colors.cardBg }]} />
                <Text style={[styles.stepLabel, { color: colors.mutedForeground }]}>Delivery</Text>
              </View>
            </View>

            {/* Welded Action Button */}
            <Pressable
              onPress={() => router.push(`/order-status?orderId=${activeOrder.id}` as any)}
              style={({ pressed }) => [
                styles.weldedCtaBar,
                { backgroundColor: colors.secondary },
                pressed && { opacity: 0.88 },
              ]}
            >
              <Text style={[styles.weldedCtaText, { color: colors.foreground }]}>
                View Live Tracking & Custodian Details
              </Text>
              <Text style={[styles.weldedCtaArrow, { color: colors.foreground }]}>→</Text>
            </Pressable>
          </View>
        ) : null}

        {/* 2-Column Services Grid */}
        <View style={styles.gridSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Garment Care Services
            </Text>
            <Pressable onPress={() => router.push('/schedule-pickup')}>
              <Text style={[styles.viewAllText, { color: colors.mutedForeground }]}>VIEW ALL</Text>
            </Pressable>
          </View>

          <View style={styles.twoColumnGrid}>
            {services.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => router.push(item.route as any)}
                style={({ pressed }) => [
                  styles.tileCard,
                  { backgroundColor: colors.cardBg, borderColor: colors.border },
                  pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
                ]}
              >
                {/* Top Row: Icon Chip Left + Badge Right */}
                <View style={styles.tileTopRow}>
                  <View style={[styles.iconChip, { backgroundColor: '#f2e8dc' }]}>
                    {item.renderIcon()}
                  </View>
                  <View style={[styles.badgeTag, { backgroundColor: '#f4ece1' }]}>
                    <Text style={[styles.badgeTagText, { color: '#a86538' }]}>{item.badge}</Text>
                  </View>
                </View>

                {/* Title & Subtitle */}
                <Text style={[styles.tileTitle, { color: colors.foreground }]}>
                  {item.title}
                </Text>
                <Text style={[styles.tileCategory, { color: colors.mutedForeground }]}>
                  {item.category}
                </Text>

                {/* Foot Row: Price & Turnaround */}
                <View style={styles.tileFootRow}>
                  <Text style={[styles.tilePrice, { color: colors.primary, fontFamily: Fonts.display }]}>
                    {item.price}
                  </Text>
                  <Text style={[styles.turnaroundText, { color: colors.mutedForeground }]}>
                    {item.turnaround}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent Wardrobe Activity Section */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Recent Wardrobe Pieces
            </Text>
            <Pressable onPress={() => router.push('/order-status')}>
              <Text style={[styles.viewAllText, { color: colors.mutedForeground }]}>HISTORY</Text>
            </Pressable>
          </View>

          <View style={styles.recentList}>
            {recentGarments.map((garment, idx) => (
              <Pressable
                key={idx}
                onPress={() => router.push('/order-status')}
                style={({ pressed }) => [
                  styles.garmentCard,
                  { backgroundColor: colors.cardBg, borderColor: colors.border },
                  pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
                ]}
              >
                <View style={[styles.garmentIconBox, { backgroundColor: '#f2e8dc' }]}>
                  {garment.renderIcon()}
                </View>
                <View style={styles.garmentInfo}>
                  <Text style={[styles.garmentName, { color: colors.foreground }]}>{garment.name}</Text>
                  <Text style={[styles.garmentTreatment, { color: colors.mutedForeground }]}>
                    {garment.treatment}
                  </Text>
                  <Text style={[styles.garmentTime, { color: colors.primary }]}>{garment.time}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Concierge Support Banner */}
        <Pressable
          onPress={() => router.push('/concierge-bot')}
          style={({ pressed }) => [
            styles.conciergeBanner,
            { backgroundColor: colors.cardBg, borderColor: colors.border },
            pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
          ]}
        >
          <View style={styles.conciergeLeft}>
            <View style={[styles.conciergeIconBox, { backgroundColor: '#f2e8dc' }]}>
              <ChatBubbleIcon size={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.conciergeTitle, { color: colors.foreground }]}>
                Need Bespoke Steam Care?
              </Text>
              <Text style={[styles.conciergeSub, { color: colors.mutedForeground }]}>
                Chat with Studio Concierge for custom fabric requests
              </Text>
            </View>
          </View>
          <Text style={[styles.conciergeArrow, { color: colors.primary }]}>→</Text>
        </Pressable>

      </ScrollView>

      {/* Floating Pill Tab Bar */}
      <FloatingDockNav />
    </FluidPage>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 140,
  },
  greetingSection: {
    marginTop: 8,
  },
  greetingSub: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 2.2,
    marginBottom: 4,
  },
  greetingLine: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  greetingTagline: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '400',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  counterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterLive: {
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -1,
  },
  counterDivider: {
    width: 1,
    height: 28,
    marginHorizontal: 12,
  },
  counterFaded: {
    fontSize: 44,
    lineHeight: 44,
    opacity: 0.45,
    letterSpacing: -1,
  },
  counterLabelBox: {
    marginLeft: 14,
  },
  counterLabelLine: {
    fontSize: 13,
    fontWeight: '600',
  },
  counterLabelSub: {
    fontSize: 11,
    marginTop: 2,
  },
  calendarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  liveTrackerCard: {
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 20,
    overflow: 'hidden',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 3,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  liveIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  orderIdBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  trackerTitle: {
    fontSize: 22,
    letterSpacing: -0.3,
    paddingHorizontal: 20,
    marginTop: 6,
  },
  trackerSub: {
    fontSize: 12,
    paddingHorizontal: 20,
    marginTop: 3,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 18,
  },
  stepItem: {
    alignItems: 'center',
    gap: 4,
  },
  stepCircleActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  stepLineActive: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  stepLineInactive: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  weldedCtaBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  weldedCtaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  weldedCtaArrow: {
    fontSize: 16,
    fontWeight: '600',
  },
  gridSection: {
    marginTop: 28,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    letterSpacing: -0.3,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tileCard: {
    width: '48.2%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  tileTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconChip: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeTagText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  tileCategory: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '400',
  },
  tileFootRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 14,
  },
  tilePrice: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  turnaroundText: {
    fontSize: 11.5,
    fontWeight: '500',
    lineHeight: 16,
  },

  recentSection: {
    marginTop: 28,
  },
  recentList: {
    gap: 10,
  },
  garmentCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  garmentIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  garmentInfo: {
    flex: 1,
  },
  garmentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  garmentTreatment: {
    fontSize: 12,
    marginTop: 2,
  },
  garmentTime: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
  },
  conciergeBanner: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  conciergeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  conciergeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conciergeTitle: {
    fontSize: 13.5,
    fontWeight: '600',
  },

  conciergeSub: {
    fontSize: 11.5,
    marginTop: 2,
    maxWidth: '90%',
  },
  conciergeArrow: {
    fontSize: 18,
    fontWeight: '600',
  },
});
