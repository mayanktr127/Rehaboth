import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from './ThemeContext';

export const ResponsiveContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const isWideScreen = width > 540;

  return (
    <View style={[styles.outerWrapper, { backgroundColor: isWideScreen ? '#EAE5DD' : colors.background }]}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: colors.background,
            width: isWideScreen ? 480 : '100%',
            maxWidth: 480,
            borderRadius: isWideScreen ? 32 : 0,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: isWideScreen ? 0.15 : 0,
            shadowRadius: 24,
            elevation: isWideScreen ? 12 : 0,
            marginVertical: isWideScreen ? 20 : 0,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    height: '100%',
  },
});
