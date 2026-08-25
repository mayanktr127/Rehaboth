import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { DemoData } from '../constants/theme';

interface TopHeaderNavProps {
  showBack?: boolean;
  onBackPress?: () => void;
  showRightIcons?: boolean;
}

export const TopHeaderNav: React.FC<TopHeaderNavProps> = ({
  showBack = false,
  onBackPress,
}) => {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Dynamic safe area calculation for punch-hole cameras, notches, and status bars
  const safeTopPadding = Math.max(insets.top, Platform.OS === 'android' ? 36 : 10);

  const handleLeftAction = () => {
    if (onBackPress) {
      onBackPress();
    } else if (showBack) {
      router.back();
    }
  };

  if (!showBack) {
    return <View style={[styles.topNavSpacer, { paddingTop: safeTopPadding }]} />;
  }

  return (
    <View style={[styles.topNav, { paddingTop: safeTopPadding }]}>
      {/* Left Back Chevron */}
      <Pressable
        onPress={handleLeftAction}
        style={[styles.roundBtn, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
      >
        <Text style={[styles.navBtnIcon, { color: colors.foreground }]}>‹</Text>
      </Pressable>
      <View style={styles.emptySpacer} />
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
  topNavSpacer: {
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
  redDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  avatarChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
