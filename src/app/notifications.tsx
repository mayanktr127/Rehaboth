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
import { useNotifications } from '../services/hooks';
import { CardSkeleton } from '../components/SkeletonLoader';
import { AppNotification } from '../domain';

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, refresh } = useNotifications();

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'order_status':
        return '📦';
      case 'security':
        return '🔐';
      case 'bag_update':
        return '🛍️';
      case 'promo':
        return '✨';
      default:
        return '🔔';
    }
  };

  const handleNotificationPress = async (notification: AppNotification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }

    if (notification.route) {
      router.push(notification.route as any);
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

          {/* Header Row */}
          <View style={styles.headerSection}>
            <View>
              <Text style={[styles.categorySubtitle, { color: colors.mutedForeground }]}>
                DISPATCH & WARDROBE ALERTS
              </Text>
              <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                Notifications
              </Text>
            </View>

            {unreadCount > 0 && (
              <Pressable
                onPress={markAllAsRead}
                style={[styles.markAllBtn, { borderColor: colors.border, backgroundColor: colors.cardBg }]}
              >
                <Text style={[styles.markAllText, { color: colors.primary }]}>
                  Mark all read
                </Text>
              </Pressable>
            )}
          </View>

          {/* Notifications List */}
          {loading && notifications.length === 0 ? (
            <View style={styles.loadingContainer}>
              <CardSkeleton />
              <View style={{ marginTop: 12 }}>
                <CardSkeleton />
              </View>
            </View>
          ) : notifications.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                All Caught Up
              </Text>
              <Text style={[styles.emptySub, { color: colors.mutedForeground }]}>
                You have no pending valet alerts or dispatch notices at this moment.
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {notifications.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleNotificationPress(item)}
                  style={({ pressed }) => [
                    styles.notificationCard,
                    {
                      backgroundColor: item.read ? colors.cardBg : colors.cardBg,
                      borderColor: item.read ? colors.border : colors.primary,
                      borderWidth: item.read ? 1 : 1.5,
                    },
                    pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                  ]}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.titleWithIcon}>
                      <Text style={styles.notifEmoji}>{getNotificationIcon(item.type)}</Text>
                      <Text
                        style={[
                          styles.notifTitle,
                          {
                            color: colors.foreground,
                            fontWeight: item.read ? '600' : '700',
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                    {!item.read && (
                      <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />
                    )}
                  </View>

                  <Text style={[styles.notifMessage, { color: colors.textSecondary }]}>
                    {item.body}
                  </Text>

                  <View style={styles.cardFooter}>
                    <Text style={[styles.timestamp, { color: colors.mutedForeground }]}>
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    {item.route && (
                      <Text style={[styles.actionPrompt, { color: colors.primary }]}>
                        View Details →
                      </Text>
                    )}
                  </View>
                </Pressable>
              ))}
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
  headerSection: {
    marginTop: 18,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  categorySubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  screenTitle: {
    fontSize: 32,
    letterSpacing: -0.5,
  },
  markAllBtn: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
  },
  markAllText: {
    fontSize: 11,
    fontWeight: '600',
  },
  loadingContainer: {
    marginTop: 12,
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    borderRadius: 20,
    padding: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  notifEmoji: {
    fontSize: 18,
  },
  notifTitle: {
    fontSize: 14,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  notifMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 28,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 28,
  },
  timestamp: {
    fontSize: 11,
  },
  actionPrompt: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 36,
    alignItems: 'center',
    marginTop: 30,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
