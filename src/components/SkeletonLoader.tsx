import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle | ViewStyle[];
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 12,
  style,
}) => {
  const { colors } = useTheme();
  const pulseAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.75,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.secondary,
          borderColor: colors.border,
          borderWidth: 1,
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
};

export const CardSkeleton: React.FC<{ height?: number; style?: ViewStyle }> = ({
  height = 140,
  style,
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.cardSkeleton,
        { backgroundColor: colors.cardBg, borderColor: colors.border },
        style,
      ]}
    >
      <Skeleton width="40%" height={16} borderRadius={8} />
      <Skeleton width="75%" height={24} borderRadius={10} style={{ marginVertical: 10 }} />
      <Skeleton width="90%" height={14} borderRadius={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  cardSkeleton: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
});
