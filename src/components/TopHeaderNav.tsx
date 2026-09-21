import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { useNotifications } from '../services/hooks';

interface TopHeaderNavProps {
  showBack?: boolean;
  onBackPress?: () => void;
  showNotifications?: boolean;
  showRightIcons?: boolean;
}

export const TopHeaderNav: React.FC<TopHeaderNavProps> = ({
  showBack = false,
  onBackPress,
  showNotifications = true,
  showRightIcons = true,
}) => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { unreadCount } = useNotifications();

  // Dynamic safe area calculation for punch-hole cameras, notches, and status bars
  const safeTopPadding = Math.max(insets.top, Platform.OS === 'android' ? 36 : 10);

  const shouldShowNotifications = showRightIcons && showNotifications;

  const handleLeftAction = () => {
    if (onBackPress) {
      onBackPress();
    } else if (showBack) {
      router.back();
    }
  };

  return (
    <View style={[styles.topNav, { paddingTop: safeTopPadding }]}>
      {/* Left Back Chevron or Spacer */}
      {showBack ? (
        <Pressable
          onPress={handleLeftAction}
          style={({ pressed }) => [
            styles.roundBtn,
            { backgroundColor: colors.cardBg, borderColor: colors.border },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Text style={[styles.navBtnIcon, { color: colors.foreground }]}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.emptySpacer} />
      )}

      {/* Right Action Icons */}
      <View style={styles.rightGroup}>
        {shouldShowNotifications && (
          <Pressable
            onPress={() => router.push('/notifications' as any)}
            style={({ pressed }) => [
              styles.roundBtn,
              styles.bellBtn,
              { backgroundColor: colors.cardBg, borderColor: colors.border },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            {unreadCount > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.unreadCountText}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingBottom: 8,
  },
  emptySpacer: {
    width: 44,
    height: 44,
  },
  roundBtn: {
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
  navBtnIcon: {
    fontSize: 26,
    fontWeight: '400',
    marginTop: -2,
    textAlign: 'center',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bellBtn: {
    position: 'relative',
  },
  bellIcon: {
    fontSize: 18,
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  unreadCountText: {
    color: '#fffaf4',
    fontSize: 10,
    fontWeight: '700',
  },
});
