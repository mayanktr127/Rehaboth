import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { DemoData, Fonts } from '../constants/theme';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { apiService } from '../services/api';
import { validateIndianMobile } from '../domain';
import { useTranslation } from '../i18n';

export default function RegisterScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { locale, setLocale, availableLocales, t } = useTranslation();

  const [fullName, setFullName] = useState(DemoData.user.fullName);
  const [mobileNumber, setMobileNumber] = useState(DemoData.user.phoneNumber);
  const [email, setEmail] = useState(DemoData.user.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const val = validateIndianMobile(mobileNumber);
    if (!val.valid) {
      setError(val.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await apiService.requestOtp({
        phone: val.cleanedValue!,
        fullName,
        email,
      });
      router.push({
        pathname: '/verification',
        params: { phone: val.cleanedValue },
      });
    } catch (err: any) {
      setError(err.message || 'Unable to request OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Navigation */}
        <TopHeaderNav showBack={true} showRightIcons={false} />

        {/* Header matching editorial voice */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.display }]}>
            {t('welcome_title', 'Welcome to Rehaboth')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {t('welcome_subtitle', 'Garment Care, Elevated')}
          </Text>
        </View>

        {/* Language Selector Chips */}
        <View style={styles.langSection}>
          <Text style={[styles.langPrompt, { color: colors.mutedForeground }]}>
            Choose your language
          </Text>
          <View style={styles.langChipsRow}>
            {availableLocales.map((lang) => {
              const isSelected = locale === lang.code;
              return (
                <Pressable
                  key={lang.code}
                  onPress={() => setLocale(lang.code)}
                  style={[
                    styles.langChip,
                    {
                      backgroundColor: isSelected ? colors.foreground : colors.cardBg,
                      borderColor: isSelected ? colors.foreground : colors.border,
                    },
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

        {/* Form Inputs (Soft White Cards with Hairline Borders) */}
        <View style={styles.formSection}>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
            {t('full_name_label', 'FULL NAME')}
          </Text>
          <View style={[styles.inputBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.foreground }]}
              value={fullName}
              onChangeText={setFullName}
              placeholder={t('full_name_placeholder', 'e.g. Devendra Sharma')}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
            {t('mobile_number_label', 'MOBILE NUMBER')}
          </Text>
          <View style={[styles.inputBox, styles.phoneInputBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.countryPrefix, { color: colors.foreground }]}>IN +91</Text>
            <TextInput
              style={[styles.textInput, { color: colors.foreground, flex: 1 }]}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              placeholder={t('mobile_number_placeholder', '98765 43210')}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>
            {t('email_label', 'EMAIL ADDRESS (OPTIONAL)')}
          </Text>
          <View style={[styles.inputBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.foreground }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder={t('email_placeholder', 'e.g. devendra@gmail.com')}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          {error ? (
            <Text style={{ color: colors.destructive, fontSize: 13, marginTop: 8, textAlign: 'center' }}>
              {error}
            </Text>
          ) : null}

          {/* Sequential Action -> Verification Screen */}
          {loading ? (
            <View style={{ marginTop: 28, alignItems: 'center' }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <GoldButton
              title={t('send_otp_btn', 'SEND VERIFICATION OTP')}
              onPress={handleSubmit}
              style={styles.submitBtn}
              showArrow={true}
            />
          )}
        </View>

        {/* Footer Links */}
        <View style={styles.footerSection}>
          <Pressable onPress={() => router.push('/verification')}>
            <Text style={[styles.loginText, { color: colors.mutedForeground }]}>
              {t('already_have_account', 'Already have an account?')}{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>{t('log_in', 'Log In')}</Text>
            </Text>
          </Pressable>

          <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
            {t('terms_notice', "By continuing, you agree to Rehaboth Steam's Terms of Service and Privacy Policy")}
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
  headerSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 28,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '400',
  },
  langSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  langPrompt: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
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
  formSection: {
    marginTop: 24,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginTop: 14,
  },
  inputBox: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  phoneInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countryPrefix: {
    fontSize: 15,
    fontWeight: '600',
  },
  textInput: {
    fontSize: 15,
    fontWeight: '400',
  },
  submitBtn: {
    marginTop: 28,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 24,
    gap: 12,
  },
  loginText: {
    fontSize: 13,
  },
  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
});
