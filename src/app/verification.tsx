import React, { useState } from 'react';
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

export default function VerificationScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [otp] = useState(['2', '1', '9', '4']);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <TopHeaderNav showBack={true} showRightIcons={false} />

        {/* Header Content */}
        <View style={styles.contentSection}>
          <View style={[styles.lockBadge, { backgroundColor: colors.secondary }]}>
            <Text style={{ fontSize: 24 }}>🔒</Text>
          </View>

          <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.display }]}>
            Verify Your Number
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Enter the 4-digit code sent to {DemoData.user.countryCode} {DemoData.user.phoneNumber} to elevate your garment care.
          </Text>

          {/* OTP Code Boxes (Pre-filled 2 1 9 4) */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <View key={index} style={[styles.otpBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <Text style={[styles.digitText, { color: colors.foreground, fontFamily: Fonts.display }]}>{digit}</Text>
              </View>
            ))}
          </View>

          {/* Timer */}
          <Text style={[styles.timerText, { color: colors.mutedForeground }]}>
            Resend code in 01:30
          </Text>

          {/* Sequential Action -> Home Screen (matching Image 1) */}
          <GoldButton
            title="VERIFY & CONTINUE"
            onPress={() => router.push('/dashboard')}
            style={styles.verifyBtn}
            showArrow={true}
          />
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Pressable onPress={() => router.push('/help-center')}>
            <Text style={[styles.supportText, { color: colors.mutedForeground }]}>
              Having trouble?{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>Contact Support</Text>
            </Text>
          </Pressable>

          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
            By verifying, you confirm access to this phone number as part of Rehaboth's premium standard of service.
          </Text>
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
  contentSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  lockBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    width: '100%',
    justifyContent: 'center',
  },
  otpBox: {
    width: 60,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  digitText: {
    fontSize: 28,
  },
  timerText: {
    fontSize: 13,
    marginTop: 18,
  },
  verifyBtn: {
    width: '100%',
    marginTop: 32,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 36,
    gap: 12,
  },
  supportText: {
    fontSize: 13,
  },
  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
});
