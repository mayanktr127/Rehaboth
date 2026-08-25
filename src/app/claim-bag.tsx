import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { DemoData, Fonts } from '../constants/theme';
import { TopHeaderNav } from '../components/TopHeaderNav';

export default function ClaimBagScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <TopHeaderNav showBack={true} />

        {/* Hero Promo Banner Card */}
        <View style={[styles.bannerCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={[styles.bannerBadge, { backgroundColor: colors.secondary }]}>
            <Text style={[styles.bannerBadgeText, { color: colors.foreground }]}>NEW MEMBER GIFT</Text>
          </View>
          <Text style={[styles.bannerTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
            Claim Your Signature Smart Bag
          </Text>
          <Text style={[styles.bannerSub, { color: colors.mutedForeground }]}>
            Complimentary tamper-proof garment bag for all new members.
          </Text>
        </View>

        {/* Item Summary Card */}
        <View style={[styles.itemCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.itemHeader}>
            <Text style={[styles.itemTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Signature Smart Bag
            </Text>
            <View style={[styles.freeBadge, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.freeBadgeText, { color: colors.primary }]}>FREE</Text>
            </View>
          </View>

          <Text style={[styles.itemDesc, { color: colors.mutedForeground }]}>
            Includes QR seal tag • Heavy-duty linen • Antimicrobial lining
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <View style={styles.priceRow}>
            <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>Original Price:</Text>
            <Text style={[styles.originalPrice, { color: colors.mutedForeground, fontFamily: Fonts.display }]}>₹999</Text>
            <Text style={[styles.finalPrice, { color: colors.primary, fontFamily: Fonts.display }]}>₹0.00</Text>
          </View>
        </View>

        {/* Delivery Address Card */}
        <View style={styles.sectionMargin}>
          <View style={styles.addressHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              DELIVERY ADDRESS
            </Text>
            <Pressable onPress={() => router.push('/select-location')}>
              <Text style={[styles.changeText, { color: colors.primary }]}>Change</Text>
            </Pressable>
          </View>

          <View style={[styles.addressBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.addressLabel, { color: colors.foreground }]}>
              {DemoData.addresses[0].label}
            </Text>
            <Text style={[styles.addressText, { color: colors.mutedForeground }]}>
              {DemoData.addresses[0].address}
            </Text>
          </View>
        </View>

        {/* Sequential Action -> Select Location Screen */}
        <View style={styles.actionSection}>
          <GoldButton
            title="CLAIM FREE SMART BAG"
            onPress={() => router.push('/select-location')}
            showArrow={true}
          />
          <Pressable onPress={() => router.push('/select-location')} style={styles.skipBtn}>
            <Text style={[styles.skipText, { color: colors.mutedForeground }]}>Skip for now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  bannerCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginTop: 20,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 12,
  },
  bannerBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  bannerTitle: {
    fontSize: 24,
    letterSpacing: -0.3,
  },
  bannerSub: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  itemCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginTop: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
  },
  freeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  freeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  itemDesc: {
    fontSize: 12,
    marginTop: 6,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceLabel: {
    fontSize: 12,
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    fontSize: 22,
    fontWeight: '600',
  },
  sectionMargin: {
    marginTop: 24,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addressBox: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  actionSection: {
    marginTop: 28,
    gap: 12,
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
