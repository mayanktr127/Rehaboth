import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { DemoData, Fonts } from '../constants/theme';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { ChatBubbleIcon } from '../components/ServiceIcons';
import { FluidPage } from '../components/FluidMotion';
import { useTranslation } from '../i18n';

export default function ProfileScreen() {
  const router = useRouter();
  const { mode, toggleTheme, colors } = useTheme();
  const { locale, setLocale, availableLocales, t } = useTranslation();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    } else {
      Alert.alert('Logging Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.push('/') },
      ]);
    }
  };

  const handleEditProfile = () => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        window.alert('Edit Profile: Profile editing mode enabled.');
      }
    } else {
      Alert.alert('Edit Profile', 'Profile editing mode enabled.');
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
          <TopHeaderNav showBack={true} onBackPress={() => router.push('/dashboard')} />

          {/* User Hero Card */}
          <View style={[styles.heroCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarCircle, { borderColor: colors.border }]}>
                <Image
                  source={{ uri: DemoData.user.avatarUrl }}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            <Text style={[styles.userName, { color: colors.foreground, fontFamily: Fonts.display }]}>
              {DemoData.user.fullName}
            </Text>

            <View style={[styles.memberBadge, { backgroundColor: colors.foreground }]}>
              <Text style={[styles.memberBadgeText, { color: colors.primaryForeground }]}>
                ★ PLATINUM MEMBER
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            {/* Metrics Row */}
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={[styles.metricValue, { color: colors.foreground, fontFamily: Fonts.display }]}>
                  ₹4,850
                </Text>
                <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
                  Saved this month
                </Text>
              </View>
              <View style={[styles.verticalDivider, { backgroundColor: colors.border }]} />
              <View style={styles.metricItem}>
                <Text style={[styles.metricValue, { color: colors.foreground, fontFamily: Fonts.display }]}>
                  18
                </Text>
                <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
                  Orders Completed
                </Text>
              </View>
            </View>
          </View>

          {/* Appearance Toggle Card */}
          <View style={[styles.appearanceCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View>
              <Text style={[styles.appearanceTitle, { color: colors.foreground }]}>
                Appearance
              </Text>
              <Text style={[styles.appearanceSub, { color: colors.mutedForeground }]}>
                {mode === 'light' ? 'Cream paper mode' : 'Dark studio mode'}
              </Text>
            </View>
            <Switch
              value={mode === 'light'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#473d33', true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Language Section */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              LANGUAGE
            </Text>
            <View style={styles.langChipsRow}>
              {availableLocales.map((lang) => {
                const isSelected = locale === lang.code;
                return (
                  <Pressable
                    key={lang.code}
                    onPress={() => setLocale(lang.code)}
                    style={({ pressed }) => [
                      styles.langChip,
                      {
                        backgroundColor: isSelected ? colors.foreground : colors.cardBg,
                        borderColor: isSelected ? colors.foreground : colors.border,
                      },
                      pressed && { opacity: 0.85, transform: [{ scale: 0.96 }] },
                    ]}
                  >
                    <Text
                      style={[
                        styles.langText,
                        {
                          color: isSelected ? colors.primaryForeground : colors.foreground,
                          fontWeight: isSelected ? '600' : '400',
                        },
                      ]}
                    >
                      {lang.nativeLabel}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Preferences & Info Section */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              PREFERENCES & INFO
            </Text>

            <View style={[styles.infoBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
                  Signature Scent
                </Text>
                <Text style={[styles.infoValGold, { color: colors.primary }]}>
                  Royal Lavender
                </Text>
              </View>

              <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
                  Smart Bag
                </Text>
                <Text style={[styles.infoVal, { color: colors.foreground }]}>
                  Active (ID: #SB-902)
                </Text>
              </View>

              <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
                  Registered Phone
                </Text>
                <Text style={[styles.infoVal, { color: colors.foreground }]}>
                  +91 98765 43210
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => router.push('/smart-bag-details')}
              style={({ pressed }) => [styles.reorderLink, pressed && { opacity: 0.7 }]}
            >
              <Text style={[styles.reorderLinkText, { color: colors.primary }]}>
                Reorder Smart Bag
              </Text>
            </Pressable>
          </View>

          {/* Saved Address Section */}
          <View style={styles.sectionMargin}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                SAVED ADDRESS
              </Text>
              <Pressable
                onPress={() => router.push('/select-location')}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              >
                <Text style={[styles.manageText, { color: colors.primary }]}>Manage</Text>
              </Pressable>
            </View>

            <View style={[styles.savedAddressCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View style={styles.addressTitleRow}>
                <Text style={[styles.addressBadge, { color: colors.primary }]}>Home</Text>
                <Text style={[styles.addressMainTitle, { color: colors.foreground }]}>
                  Home (Indiranagar, Bengaluru)
                </Text>
              </View>
              <Text style={[styles.addressFullText, { color: colors.mutedForeground }]}>
                Flat 402, Oakwood Residency, 12th Main Road...
              </Text>
            </View>
          </View>

          {/* Support & Concierge Links matching Image 1 */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              HELP & CONCIERGE
            </Text>
            <View style={styles.supportLinksRow}>
              <Pressable
                onPress={() => router.push('/help-center')}
                style={({ pressed }) => [
                  styles.supportLinkCard,
                  { backgroundColor: colors.cardBg, borderColor: colors.border },
                  pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
                ]}
              >
                <View style={[styles.supportIconChip, { backgroundColor: '#f2e8dc' }]}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: colors.foreground }}>?</Text>
                </View>
                <Text style={[styles.supportLinkText, { color: colors.foreground }]}>Help Center</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push('/concierge-bot')}
                style={({ pressed }) => [
                  styles.supportLinkCard,
                  { backgroundColor: colors.cardBg, borderColor: colors.border },
                  pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
                ]}
              >
                <View style={[styles.supportIconChip, { backgroundColor: '#f2e8dc' }]}>
                  <ChatBubbleIcon size={20} />
                </View>
                <Text style={[styles.supportLinkText, { color: colors.foreground }]}>Concierge Chat</Text>
              </Pressable>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <GoldButton
              title="EDIT PROFILE"
              onPress={handleEditProfile}
              showArrow={true}
            />
            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => [
                styles.logoutBtn,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.cardBg,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={[styles.logoutText, { color: colors.foreground }]}>LOG OUT</Text>
            </Pressable>
          </View>
        </ScrollView>
      </FluidPage>

      {/* Floating Bottom Dock Navigation */}
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
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 24,
    textAlign: 'center',
  },
  memberBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },
  memberBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 18,
  },
  metricsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 24,
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  verticalDivider: {
    width: 1,
    height: 28,
  },
  appearanceCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  appearanceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  appearanceSub: {
    fontSize: 12,
    marginTop: 2,
  },
  sectionMargin: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2.2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  langChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  langChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  langText: {
    fontSize: 13,
  },
  infoBox: {
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 6,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 13,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '600',
  },
  infoValGold: {
    fontSize: 13,
    fontWeight: '700',
  },
  rowDivider: {
    height: 1,
  },
  reorderLink: {
    marginTop: 8,
    paddingVertical: 2,
  },
  reorderLinkText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  manageText: {
    fontSize: 13,
    fontWeight: '600',
  },
  savedAddressCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  addressBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  addressMainTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressFullText: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  supportLinksRow: {
    flexDirection: 'row',
    gap: 12,
  },
  supportLinkCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  supportIconChip: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportLinkText: {
    fontSize: 13,
    fontWeight: '600',
  },

  actionSection: {
    marginTop: 28,
    gap: 12,
  },
  logoutBtn: {
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
