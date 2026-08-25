import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

interface SplitCardProps {
  title: string;
  category: string;
  price: string;
  rating: string;
  icon: string;
  onPress: () => void;
}

export const SplitCardImage5: React.FC<SplitCardProps> = ({
  title,
  category,
  price,
  rating,
  icon,
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.cardContainer, { backgroundColor: colors.cardBg }]}
    >
      {/* Top Favorite Heart Icon */}
      <Pressable style={styles.heartBtn}>
        <Text style={styles.heartText}>♡</Text>
      </Pressable>

      {/* Top 70% Graphic & Title */}
      <View style={styles.topSection}>
        <View style={styles.iconGraphicBox}>
          <Text style={{ fontSize: 44 }}>{icon}</Text>
        </View>

        <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.categorySub, { color: colors.textSecondary }]}>
          {category}
        </Text>
      </View>

      {/* Bottom 30% Split Soft Pastel Yellow Fill (Image 5 style) */}
      <View style={[styles.bottomSplitFill, { backgroundColor: colors.pastelYellowFill }]}>
        <Text style={[styles.priceText, { color: colors.textPrimary }]}>{price}</Text>
        <View style={styles.ratingRow}>
          <Text style={{ fontSize: 12 }}>⭐</Text>
          <Text style={[styles.ratingValText, { color: colors.textPrimary }]}>{rating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '47.8%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#1A1816',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  heartBtn: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 2,
  },
  heartText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  topSection: {
    padding: 16,
    paddingBottom: 14,
  },
  iconGraphicBox: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  categorySub: {
    fontSize: 12,
    marginTop: 2,
  },
  bottomSplitFill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingValText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
