import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';

interface GoldButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  showArrow?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  showArrow = true,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.primary,
          opacity: pressed ? 0.9 : disabled ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.primaryForeground }, textStyle]}>
        {title} {showArrow ? '→' : ''}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    shadowColor: '#c1774f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
