import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { DemoData } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const safeTop = Math.max(insets.top, Platform.OS === 'android' ? 36 : 16);

  const handleAuthNavigation = (provider?: string) => {
    // Navigates directly into the Signup / Auth flow with pre-filled demo credentials
    router.push('/register');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: safeTop }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Spacer */}
        <View style={styles.topSpacer} />

        {/* Brand Emblem Icon matching Image 1 */}
        <View style={styles.emblemWrapper}>
          <View style={[styles.appIconBox, { backgroundColor: colors.primary }]}>
            <Text style={styles.appIconGlyph}>♨</Text>
          </View>
        </View>

        {/* Main Headline matching Image 1 ("Welcome to Rehaboth") */}
        <View style={styles.headlineContainer}>
          <Text style={[styles.mainHeadline, { color: colors.foreground }]}>
            Welcome{'\n'}to Rehaboth
          </Text>
        </View>

        {/* Subtle Artistic Pattern Elements behind / between content */}
        <View style={styles.artisticPatternContainer} pointerEvents="none">
          <Text style={[styles.doodleShape1, { color: colors.mutedForeground }]}>◯</Text>
          <Text style={[styles.doodleShape2, { color: colors.mutedForeground }]}>✕</Text>
          <Text style={[styles.doodleShape3, { color: colors.mutedForeground }]}>△</Text>
          <Text style={[styles.doodleShape4, { color: colors.mutedForeground }]}>✱</Text>
          <Text style={[styles.doodleShape5, { color: colors.mutedForeground }]}>〜</Text>
        </View>

        {/* Subtitle Lines matching Image 1 */}
        <View style={styles.taglineContainer}>
          <Text style={[styles.taglineLine, { color: colors.foreground }]}>
            Made for wardrobes.
          </Text>
          <Text style={[styles.taglineLine, { color: colors.mutedForeground }]}>
            Designed for people.
          </Text>
        </View>

        {/* Auth Action Stack matching Image 1 */}
        <View style={styles.buttonStack}>
          {/* 1. Continue with Google */}
          <Pressable
            onPress={() => handleAuthNavigation('Google')}
            style={({ pressed }) => [
              styles.authPillBtn,
              {
                backgroundColor: colors.foreground,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={[styles.authPillText, { color: colors.primaryForeground }]}>
              Continue with Google
            </Text>
          </Pressable>

          {/* 2. Sign in with Apple */}
          <Pressable
            onPress={() => handleAuthNavigation('Apple')}
            style={({ pressed }) => [
              styles.authPillBtn,
              {
                backgroundColor: colors.foreground,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Text style={[styles.appleIcon, { color: colors.primaryForeground }]}></Text>
            <Text style={[styles.authPillText, { color: colors.primaryForeground }]}>
              Sign in with Apple
            </Text>
          </Pressable>

          {/* 3. Continue with Email */}
          <Pressable
            onPress={() => handleAuthNavigation('Email')}
            style={({ pressed }) => [
              styles.authPillBtn,
              {
                backgroundColor: colors.secondary,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Text style={[styles.emailIcon, { color: colors.foreground }]}>✉</Text>
            <Text style={[styles.authPillText, { color: colors.foreground }]}>
              Continue with email
            </Text>
          </Pressable>

          {/* 4. Primary Get Started (Pre-filled Demo Access) */}
          <Pressable
            onPress={() => router.push('/register')}
            style={({ pressed }) => [
              styles.demoPillBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Text style={[styles.demoPillText, { color: colors.primaryForeground }]}>
              GET STARTED (DEMO: {DemoData.user.fullName}) →
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  topSpacer: {
    height: 28,
  },
  emblemWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  appIconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c1774f',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  appIconGlyph: {
    fontSize: 28,
    color: '#fffaf4',
    fontWeight: '700',
  },
  headlineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  mainHeadline: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -1,
  },
  artisticPatternContainer: {
    height: 100,
    position: 'relative',
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doodleShape1: {
    position: 'absolute',
    left: 28,
    top: 10,
    fontSize: 32,
    opacity: 0.18,
  },
  doodleShape2: {
    position: 'absolute',
    left: 80,
    bottom: 24,
    fontSize: 24,
    opacity: 0.18,
  },
  doodleShape3: {
    position: 'absolute',
    top: 20,
    fontSize: 26,
    opacity: 0.18,
  },
  doodleShape4: {
    position: 'absolute',
    right: 70,
    bottom: 16,
    fontSize: 34,
    opacity: 0.18,
  },
  doodleShape5: {
    position: 'absolute',
    right: 28,
    top: 14,
    fontSize: 28,
    opacity: 0.18,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 4,
  },
  taglineLine: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  buttonStack: {
    gap: 12,
    width: '100%',
    marginTop: 'auto',
    paddingBottom: 8,
  },
  authPillBtn: {
    height: 52,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 10,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  appleIcon: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: -2,
  },
  emailIcon: {
    fontSize: 16,
  },
  authPillText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  demoPillBtn: {
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 4,
    shadowColor: '#c1774f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  demoPillText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
