import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DemoData } from '../constants/theme';

// 1. Home Outline Icon (20x20)
const HomeTabIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={styles.iconBox}>
    <View
      style={{
        width: 12,
        height: 12,
        borderTopWidth: 1.8,
        borderLeftWidth: 1.8,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        position: 'absolute',
        top: 2,
      }}
    />
    <View
      style={{
        width: 13,
        height: 9,
        borderWidth: 1.8,
        borderTopWidth: 0,
        borderColor: color,
        position: 'absolute',
        bottom: 2.5,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      }}
    />
  </View>
);

// 2. Schedule Outline Icon (20x20)
const ScheduleTabIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={styles.iconBox}>
    <View
      style={{
        width: 15,
        height: 16,
        borderWidth: 1.8,
        borderColor: color,
        borderRadius: 3,
        overflow: 'hidden',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 2,
      }}
    >
      <View style={{ width: '100%', height: 1.8, backgroundColor: color }} />
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: 1.8,
          marginLeft: -0.9,
          backgroundColor: color,
        }}
      />
    </View>
  </View>
);

// 3. Bag Outline Icon (20x20)
const BagTabIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={styles.iconBox}>
    <View
      style={{
        width: 8,
        height: 5,
        borderTopWidth: 1.8,
        borderLeftWidth: 1.8,
        borderRightWidth: 1.8,
        borderColor: color,
        borderTopLeftRadius: 3.5,
        borderTopRightRadius: 3.5,
        position: 'absolute',
        top: 1.5,
      }}
    />
    <View
      style={{
        width: 15,
        height: 12,
        borderWidth: 1.8,
        borderColor: color,
        borderRadius: 2.5,
        position: 'absolute',
        bottom: 2,
      }}
    />
  </View>
);

// 4. Vault Outline Icon (20x20) - Exactly equal size & stroke weight
const VaultTabIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={styles.iconBox}>
    <View
      style={{
        width: 5,
        height: 2,
        backgroundColor: color,
        position: 'absolute',
        top: 1.5,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        width: 15,
        height: 15,
        borderRadius: 7.5,
        borderWidth: 1.8,
        borderColor: color,
        position: 'absolute',
        bottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 1.6,
          height: 4,
          backgroundColor: color,
          position: 'absolute',
          top: 2.5,
          borderRadius: 0.8,
        }}
      />
      <View
        style={{
          width: 3.5,
          height: 1.6,
          backgroundColor: color,
          position: 'absolute',
          right: 2.5,
          borderRadius: 0.8,
        }}
      />
    </View>
  </View>
);

export const BottomTabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const safeBottom = Math.max(insets.bottom, 12) + (Platform.OS === 'android' ? 12 : 8);

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      renderIcon: (color: string) => <HomeTabIcon color={color} />,
      route: '/dashboard',
    },
    {
      id: 'schedule',
      label: 'Schedule',
      renderIcon: (color: string) => <ScheduleTabIcon color={color} />,
      route: '/schedule-pickup',
    },
    {
      id: 'bag',
      label: 'Bag',
      renderIcon: (color: string) => <BagTabIcon color={color} />,
      route: '/smart-bag-details',
    },
    {
      id: 'vault',
      label: 'Orders',
      renderIcon: (color: string) => <VaultTabIcon color={color} />,
      route: '/order-history',
    },
    {
      id: 'profile',
      label: 'Profile',
      isAvatar: true,
      route: '/profile',
    },
  ];

  return (
    <View style={[styles.safeContainer, { bottom: safeBottom }]} pointerEvents="box-none">
      <View style={styles.tabBarContainer}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.route || (tab.id === 'vault' && (pathname.startsWith('/order') || pathname === '/cancel-order' || pathname === '/rate-delivery'));
          const activeColor = '#ffffff';
          const inactiveColor = 'rgba(255, 245, 235, 0.72)';
          const currentColor = isActive ? activeColor : inactiveColor;

          return (
            <Pressable
              key={tab.id}
              onPress={() => router.push(tab.route as any)}
              style={[
                styles.tabButton,
                isActive && styles.tabButtonActive,
              ]}
            >
              {tab.isAvatar ? (
                <View
                  style={[
                    styles.avatarWrapper,
                    {
                      borderColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                      borderWidth: isActive ? 2 : 1,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: DemoData.user.avatarUrl }}
                    style={styles.profileAvatar}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                tab.renderIcon && tab.renderIcon(currentColor)
              )}
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: currentColor,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  safeContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 996,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 440,
    height: 64,
    backgroundColor: '#b86538', // Exact warm terracotta from Image 1
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 8,
    shadowColor: '#3a1f10',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 20,
    gap: 2,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  iconBox: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabIcon: {
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },

  customIconWrapper: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
