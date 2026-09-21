import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { CodeInput } from '../components/CodeInput';
import { DemoData, Fonts } from '../constants/theme';
import { TopHeaderNav } from '../components/TopHeaderNav';

export default function VerificationScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimeLeft(90);
    setCanResend(false);
    setError(null);
    setCode('');
  };

  const handleVerify = (enteredCode?: string) => {
    const codeToVerify = enteredCode || code;
    if (codeToVerify.length !== 4) {
      setError('Please enter the full 4-digit code.');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate verification delay (accept demo OTP '2194' or any valid 4 digits in mock mode)
    setTimeout(() => {
      setLoading(false);
      // Valid mock codes: 2194 or any 4 digit numeric code
      if (/^\d{4}$/.test(codeToVerify)) {
        router.push('/dashboard');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 450);
  };

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

          {/* Real Controlled CodeInput Component */}
          <CodeInput
            length={4}
            value={code}
            onChange={(val) => {
              setCode(val);
              if (error) setError(null);
            }}
            onComplete={(val) => handleVerify(val)}
            error={!!error}
            disabled={loading}
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
              Demo code: 2 1 9 4
            </Text>
          )}

          {/* Countdown & Resend Button */}
          <View style={styles.resendRow}>
            {canResend ? (
              <Pressable onPress={handleResend} accessibilityRole="button">
                <Text style={[styles.resendAction, { color: colors.primary }]}>
                  Resend verification code
                </Text>
              </Pressable>
            ) : (
              <Text style={[styles.timerText, { color: colors.mutedForeground }]}>
                Resend code in {formatTimer(timeLeft)}
              </Text>
            )}
          </View>

          {/* Verification CTA */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>
                Securing verification...
              </Text>
            </View>
          ) : (
            <GoldButton
              title="VERIFY & CONTINUE"
              onPress={() => handleVerify()}
              style={styles.verifyBtn}
              showArrow={true}
              disabled={code.length !== 4}
            />
          )}
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
  errorText: {
    color: '#D9534F',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  hintText: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  resendRow: {
    marginTop: 14,
    minHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendAction: {
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 13,
  },
  verifyBtn: {
    width: '100%',
    marginTop: 28,
  },
  loadingContainer: {
    marginTop: 28,
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
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
