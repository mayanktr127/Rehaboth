import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { AuraOrb } from '../components/AuraOrb';
import { Fonts } from '../constants/theme';
import { ShoppingBagsIcon, PadlockIcon } from '../components/ServiceIcons';
import { FluidPage } from '../components/FluidMotion';

export default function SmartBagDetailsScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const standards = [
    {
      title: 'Sealed & Tamper-proof',
      desc: 'Every bag secures via alphanumeric zip tags.',
      renderIcon: () => <PadlockIcon size={20} />,
    },
    {
      title: 'Trackable Garment Vault',
      desc: 'Integrated NFC-enabled digital tracker.',
      renderIcon: () => <ShoppingBagsIcon size={20} />,
    },
    {
      title: 'Eco-Conscious Linen',
      desc: 'Premium woven composite built for 1000+ presses.',
      renderIcon: () => <PadlockIcon size={20} />,
    },
  ];

  const handleAddToCart = () => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        window.alert('Bag Added to Cart! 🛍️ Signature Smart Bag (₹999) has been added.');
      }
      router.push('/schedule-pickup');
    } else {
      Alert.alert(
        'Bag Added to Cart! 🛍️',
        'Signature Smart Bag (₹999) has been added to your bag.',
        [{ text: 'Proceed to Schedule Pickup', onPress: () => router.push('/schedule-pickup') }]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FluidPage style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
          overScrollMode="never"
          bounces={true}
        >
          {/* Top Header */}
          <TopHeaderNav showBack={true} />

          {/* Product Hero: Refined 180px Aura Orb with Centered 96px Card Puck and smaller refined bag icon */}
          <View style={styles.heroPuckSection}>
            <View style={styles.auraHeroWrapper}>
              <AuraOrb size={176} opacity={0.78} />
              {/* Centered Circular Card Puck */}
              <View style={[styles.cardPuck, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <ShoppingBagsIcon size={26} />
              </View>
            </View>

            {/* Eyebrow, Title & Rating */}
            <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>
              RS-48721
            </Text>
            <Text style={[styles.productTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Rehaboth Steam
            </Text>
            <View style={styles.ratingRow}>
              <Text style={{ fontSize: 13, color: colors.primary }}>★</Text>
              <Text style={[styles.ratingText, { color: colors.mutedForeground }]}>
                4.8 Rating
              </Text>
            </View>
          </View>

          {/* Product Image Placeholder matching Image 3 */}
          <View style={[styles.productImageCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Image
              source={require('../../assets/smart_bag_product.jpg')}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlayBadge}>
              <Text style={styles.imageOverlayBadgeText}>NFC VAULT TOKEN EMBEDDED</Text>
            </View>
          </View>

          {/* Price Card matching Screenshot 2 & 3 */}
          <View style={[styles.priceCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.priceEyebrow, { color: colors.mutedForeground }]}>
              SIGNATURE SMART BAG
            </Text>
            <Text style={[styles.priceSubtitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Lifetime garment care token
            </Text>
            <Text style={[styles.priceFigure, { color: colors.primary, fontFamily: Fonts.display }]}>
              ₹999
            </Text>
          </View>

          {/* Service Standards List matching Screenshot 3 */}
          <View style={styles.standardsSection}>
            <Text style={[styles.sectionEyebrow, { color: colors.mutedForeground }]}>
              SERVICE STANDARDS
            </Text>

            <View style={styles.standardsList}>
              {standards.map((item, i) => (
                <View
                  key={i}
                  style={[styles.standardCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                >
                  <View style={[styles.standardIconChip, { backgroundColor: '#f2e8dc' }]}>
                    {item.renderIcon()}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.standardTitle, { color: colors.foreground }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.standardDesc, { color: colors.mutedForeground }]}>
                      {item.desc}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Small Info Note with Inline Icon */}
            <View style={styles.infoNoteRow}>
              <Text style={[styles.infoIcon, { color: colors.mutedForeground }]}>ⓘ</Text>
              <Text style={[styles.infoNoteText, { color: colors.mutedForeground }]}>
                Shipped in signature Rehaboth Steam presentation box.
              </Text>
            </View>
          </View>

          {/* Action Button & Secure Link */}
          <View style={styles.actionSection}>
            <GoldButton title="ADD TO CART" onPress={handleAddToCart} showArrow={true} />
            <Pressable
              onPress={() => router.push('/schedule-pickup')}
              style={({ pressed }) => [styles.secureLink, pressed && { opacity: 0.7 }]}
            >
              <Text style={[styles.secureLinkText, { color: colors.foreground }]}>
                SECURE BAG
              </Text>
            </Pressable>
          </View>
        </ScrollView>

      </FluidPage>

      {/* Floating Pill Tab Bar */}
      <FloatingDockNav />
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 160,
  },
  heroPuckSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  auraHeroWrapper: {
    width: 176,
    height: 176,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardPuck: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  productImageCard: {
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 20,
    overflow: 'hidden',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 3,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 220,
  },
  imageOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(30, 24, 18, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  imageOverlayBadgeText: {
    color: '#fff5ea',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 1,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.8,
    marginTop: 16,
  },
  productTitle: {
    fontSize: 30,
    marginTop: 4,
    letterSpacing: -0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '400',
  },

  priceCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  priceEyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.5,
  },
  priceSubtitle: {
    fontSize: 20,
    marginTop: 8,
    letterSpacing: -0.2,
  },
  priceFigure: {
    fontSize: 36,
    marginTop: 10,
    lineHeight: 40,
  },
  standardsSection: {
    marginTop: 32,
  },
  sectionEyebrow: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.5,
    marginBottom: 14,
  },
  standardsList: {
    gap: 12,
  },
  standardCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  standardIconChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  standardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  standardDesc: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  infoNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  infoIcon: {
    fontSize: 14,
  },
  infoNoteText: {
    fontSize: 12,
    flex: 1,
  },
  actionSection: {
    marginTop: 28,
    gap: 12,
  },
  secureLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  secureLinkText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
});
