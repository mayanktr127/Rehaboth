import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

interface HeroCardImage5Props {
  title: string;
  subtitle: string;
  metric1Label: string;
  metric1Val: string;
  metric2Label: string;
  metric2Val: string;
  ctaText: string;
  onCtaPress: () => void;
}

export const HeroCardImage5: React.FC<HeroCardImage5Props> = ({
  title,
  subtitle,
  metric1Label,
  metric1Val,
  metric2Label,
  metric2Val,
  ctaText,
  onCtaPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.heroCard, { backgroundColor: colors.cardBg }]}>
      <View style={styles.heroHeaderRow}>
        <View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        </View>

        {/* 3D Colorful Blur Orb Graphic matching Image 5 */}
        <View style={styles.orbWrapper}>
          <View style={styles.orbBackGlow} />
          <View style={styles.orbInnerCore} />
        </View>
      </View>

      {/* Metric Split Row matching Image 5 */}
      <View style={styles.sessionSplitRow}>
        <View>
          <Text style={[styles.splitLabel, { color: colors.textMuted }]}>{metric1Label}</Text>
          <Text style={[styles.splitVal, { color: colors.textPrimary }]}>{metric1Val}</Text>
        </View>

        <View style={[styles.splitDivider, { backgroundColor: colors.border }]} />

        <View>
          <Text style={[styles.splitLabel, { color: colors.textMuted }]}>{metric2Label}</Text>
          <Text style={[styles.splitVal, { color: colors.accentOrange }]}>{metric2Val}</Text>
        </View>
      </View>

      {/* Bottom CTA Row with Arrow → matching Image 5 */}
      <Pressable onPress={onCtaPress} style={styles.heroCtaRow}>
        <Text style={[styles.heroCtaText, { color: colors.textPrimary }]}>
          {ctaText}
        </Text>
        <Text style={[styles.heroCtaArrow, { color: colors.textPrimary }]}>→</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    shadowColor: '#1A1816',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '400',
  },
  orbWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  orbBackGlow: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE5C4',
    opacity: 0.8,
  },
  orbInnerCore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C5B3F2',
    opacity: 0.75,
  },
  sessionSplitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  splitLabel: {
    fontSize: 11,
    fontWeight: '400',
  },
  splitVal: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  splitDivider: {
    width: 1,
    height: 24,
  },
  heroCtaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F6F5F2',
  },
  heroCtaText: {
    fontSize: 14,
    fontWeight: '600',
  },
  heroCtaArrow: {
    fontSize: 18,
    fontWeight: '600',
  },
});
