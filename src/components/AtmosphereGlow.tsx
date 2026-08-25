import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';

interface AtmosphereGlowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AtmosphereGlow: React.FC<AtmosphereGlowProps> = ({ children, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* Warm Golden Atmosphere Radial Glow Blob */}
      <View style={[styles.glowBlob, { backgroundColor: colors.glowRadial }]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glowBlob: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: 140,
    opacity: 0.6,
    zIndex: 0,
  },
});
