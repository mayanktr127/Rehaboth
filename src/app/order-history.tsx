import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { useOrders } from '../services/hooks';
import { CardSkeleton } from '../components/SkeletonLoader';
import { Order, DEFAULT_SCENT_PROFILES } from '../domain';

export default function OrderHistoryScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { orders, loading, error, refresh } = useOrders();

  const getScentName = (scentId: string) => {
    const scent = DEFAULT_SCENT_PROFILES.find((s) => s.id === scentId);
    return scent ? scent.name : 'Atelier Blend';
  };

  const getStatusBadgeStyle = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return { bg: '#e4eed8', text: '#3c6e27' };
      case 'cancelled':
        return { bg: '#fadce0', text: '#b33a3a' };
      default:
        return { bg: colors.secondary, text: colors.primary };
    }
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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
          }
        >
          <TopHeaderNav showBack={true} />

          {/* Header */}
          <View style={styles.titleSection}>
            <Text style={[styles.categorySubtitle, { color: colors.mutedForeground }]}>
              ARCHIVE & LOGS
            </Text>
            <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Wardrobe Ledger
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Every garment collection, steam cycle, and custodian transfer recorded with timestamped verification.
            </Text>
          </View>

          {/* Content */}
          {loading && orders.length === 0 ? (
            <View style={styles.loadingContainer}>
              <CardSkeleton />
              <View style={{ marginTop: 14 }}>
                <CardSkeleton />
              </View>
              <View style={{ marginTop: 14 }}>
                <CardSkeleton />
              </View>
            </View>
          ) : error ? (
            <View style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                Unable to load orders
              </Text>
              <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
                {error}
              </Text>
              <Pressable
                onPress={refresh}
                style={[styles.retryBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.retryBtnText}>Retry</Text>
              </Pressable>
            </View>
          ) : orders.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={styles.emptyIcon}>🧺</Text>
              <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                No Wardrobe Sessions Yet
              </Text>
              <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
                Your pressed suits, evening wear, and everyday silks will be archived here once scheduled.
              </Text>
              <Pressable
                onPress={() => router.push('/schedule-pickup')}
                style={[styles.bookNowBtn, { backgroundColor: colors.foreground }]}
              >
                <Text style={[styles.bookNowBtnText, { color: colors.primaryForeground }]}>
                  Schedule First Pickup
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.ordersList}>
              {orders.map((order) => {
                const badge = getStatusBadgeStyle(order.status);
                const isDelivered = order.status === 'delivered';
                const isCancelled = order.status === 'cancelled';

                return (
                  <Pressable
                    key={order.id}
                    onPress={() => router.push(`/order-status?orderId=${order.id}` as any)}
                    style={({ pressed }) => [
                      styles.orderCard,
                      { backgroundColor: colors.cardBg, borderColor: colors.border },
                      pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                    ]}
                  >
                    {/* Top Row: ID & Status Badge */}
                    <View style={styles.orderTopRow}>
                      <View>
                        <Text style={[styles.orderNumber, { color: colors.foreground, fontFamily: Fonts.display }]}>
                          #{order.orderNumber}
                        </Text>
                        <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>
                          {order.pickupDate} • {order.timeSlot.split('(')[0].trim()}
                        </Text>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                        <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                          {order.status.replace(/_/g, ' ').toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    {/* Divider */}
                    <View style={[styles.cardDivider, { backgroundColor: colors.border }]} />

                    {/* Middle Info Row */}
                    <View style={styles.detailsRow}>
                      <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>GARMENTS</Text>
                        <Text style={[styles.detailValue, { color: colors.foreground }]}>
                          {order.garmentCount} Pieces
                        </Text>
                      </View>

                      <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>INFUSED SCENT</Text>
                        <Text style={[styles.detailValue, { color: colors.foreground }]}>
                          {getScentName(order.scentId)}
                        </Text>
                      </View>

                      <View style={styles.detailItemRight}>
                        <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>TOTAL</Text>
                        <Text style={[styles.detailPrice, { color: colors.foreground, fontFamily: Fonts.display }]}>
                          ₹{order.totalAmountInr}
                        </Text>
                      </View>
                    </View>

                    {/* Bottom Action Footer */}
                    <View style={styles.cardFooterRow}>
                      <Text style={[styles.custodianInfo, { color: colors.mutedForeground }]}>
                        Custodian: {order.custodianName}
                      </Text>
                      <Text style={[styles.viewDetailsLink, { color: colors.primary }]}>
                        Track Session →
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
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
  loadingContainer: {
    marginTop: 12,
  },
  ordersList: {
    gap: 16,
  },
  orderCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderNumber: {
    fontSize: 18,
    letterSpacing: -0.3,
  },
  orderDate: {
    fontSize: 12,
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailItemRight: {
    alignItems: 'flex-end',
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  detailPrice: {
    fontSize: 16,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ece3d6',
  },
  custodianInfo: {
    fontSize: 12,
  },
  viewDetailsLink: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  bookNowBtn: {
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bookNowBtnText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  retryBtn: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 12,
  },
  retryBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
