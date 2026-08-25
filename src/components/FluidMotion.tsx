import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface FluidPageProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const FluidPage: React.FC<FluidPageProps> = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(90)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 480,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 520,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 520,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY }, { scale: scaleAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};




interface FluidCardProps {
  children: React.ReactNode;
  index?: number;
  delay?: number;
  style?: ViewStyle | ViewStyle[];
}

export const FluidCard: React.FC<FluidCardProps> = ({
  children,
  index = 0,
  delay,
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const startDelay = delay !== undefined ? delay : Math.min(index * 45, 200);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(startDelay),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 18,
          mass: 0.7,
          stiffness: 160,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [startDelay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

interface InteractivePressableProps extends PressableProps {
  children: React.ReactNode;
  style?: any;
  scaleTo?: number;
}

export const InteractivePressable: React.FC<InteractivePressableProps> = ({
  children,
  style,
  scaleTo = 0.97,
  onPress,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: scaleTo,
      damping: 15,
      mass: 0.5,
      stiffness: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      damping: 15,
      mass: 0.5,
      stiffness: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
