import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface AuraOrbProps {
  size?: number;
  style?: ViewStyle;
  opacity?: number;
}

export const AuraOrb: React.FC<AuraOrbProps> = ({
  size = 96,
  style,
  opacity = 0.8,
}) => {
  const radius = size / 2;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius,
          opacity,
        },
        style,
      ]}
    >
      {/* Conic / Layered Pastel Iridescent Gradient Emulation */}
      <View
        style={[
          styles.layerBase,
          {
            width: size,
            height: size,
            borderRadius: radius,
            backgroundColor: '#f5cba7', // Warm peach terracotta
          },
        ]}
      />
      <View
        style={[
          styles.layerTopRight,
          {
            width: size * 0.75,
            height: size * 0.75,
            borderRadius: radius,
            backgroundColor: '#aed6f1', // Sky blue
          },
        ]}
      />
      <View
        style={[
          styles.layerBottomLeft,
          {
            width: size * 0.75,
            height: size * 0.75,
            borderRadius: radius,
            backgroundColor: '#d7bde2', // Soft purple
          },
        ]}
      />
      <View
        style={[
          styles.layerCenter,
          {
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: radius,
            backgroundColor: '#f9e79f', // Warm gold
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerBase: {
    position: 'absolute',
  },
  layerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0.8,
  },
  layerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    opacity: 0.8,
  },
  layerCenter: {
    position: 'absolute',
    opacity: 0.85,
  },
});
