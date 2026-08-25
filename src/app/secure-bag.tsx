import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { PadlockIcon } from '../components/ServiceIcons';

export default function SecureBagScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [sealCode, setSealCode] = useState('RS-48721');

  const handleRegister = () => {
    Alert.alert(
      'Smart Bag Registered! 🔒✨',
      `Bag Seal Code ${sealCode} has been verified and linked to your active order #ST-9482.`,
      [{ text: 'Proceed to Handover', onPress: () => router.push('/secure-handover') }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <TopHeaderNav showBack={true} />

        {/* Lock Emblem & Heading */}
        <View style={styles.contentSection}>
          <View style={[styles.lockBadge, { backgroundColor: '#f2e8dc' }]}>
            <PadlockIcon size={32} />
          </View>


          <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.display }]}>
            Register Seal Bag
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Scan the QR code on your Smart Bag or enter the alphanumeric code printed below it to link this order.
          </Text>
        </View>

        {/* Code Input Section */}
        <View style={styles.sectionMargin}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
            QR CODE / SEAL CODE
          </Text>

          <View style={[styles.inputBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={{ fontSize: 16 }}>║▌║</Text>
            <TextInput
              style={[styles.textInput, { color: colors.foreground }]}
              value={sealCode}
              onChangeText={setSealCode}
              placeholder="RS-XXXXX"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          <Text style={[styles.scanPrompt, { color: colors.mutedForeground }]}>
            SCAN QR OR ENTER CODE MANUALLY
          </Text>
        </View>

        {/* Tag Photo Zoomed Preview Container */}
        <View style={[styles.tagPhotoCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.tagGraphicInner}>
            <Text style={{ fontSize: 44 }}>🏷️</Text>
            <View style={[styles.tagLabelPill, { backgroundColor: colors.foreground }]}>
              <Text style={[styles.tagCodeText, { color: colors.primaryForeground }]}>{sealCode}</Text>
            </View>
          </View>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <GoldButton title="REGISTER & SEAL BAG" onPress={handleRegister} showArrow={true} />

          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
            By sealing, you verify Rehaboth Steam's standard of garment custody.
          </Text>

          <Pressable onPress={() => router.push('/smart-bag-details')} style={styles.orderLink}>
            <Text style={[styles.orderLinkText, { color: colors.mutedForeground }]}>
              Order <Text style={{ color: colors.primary, fontWeight: '700' }}>SIGNATURE SMART BAG</Text>
            </Text>
          </Pressable>

          <Pressable style={styles.lostLink}>
            <Text style={[styles.lostLinkText, { color: colors.mutedForeground }]}>
              Lost or need another bag?
            </Text>
          </Pressable>
        </View>
      </ScrollView>

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
  contentSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  lockBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
    paddingHorizontal: 16,
  },
  sectionMargin: {
    marginTop: 20,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  inputBox: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  scanPrompt: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: 10,
  },
  tagPhotoCard: {
    height: 150,
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  tagGraphicInner: {
    alignItems: 'center',
    gap: 6,
  },
  tagLabelPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagCodeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  actionSection: {
    marginTop: 24,
    alignItems: 'center',
    gap: 12,
  },
  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  orderLink: {
    marginTop: 2,
  },
  orderLinkText: {
    fontSize: 13,
  },
  lostLink: {},
  lostLinkText: {
    fontSize: 12,
  },
});
