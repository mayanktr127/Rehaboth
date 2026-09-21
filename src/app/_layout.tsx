import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Fraunces_400Regular,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from "@expo-google-fonts/fraunces";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { ThemeProvider } from "../components/ThemeContext";
import { I18nProvider } from "../i18n";
import { ResponsiveContainer } from "../components/ResponsiveContainer";
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_400Regular,
    Fraunces_500Medium,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <I18nProvider>
          <View style={styles.container}>
            <StatusBar style="dark" />
            <ResponsiveContainer>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_bottom',
                  animationDuration: 420,
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="register" />
                <Stack.Screen name="dashboard" />
                <Stack.Screen name="schedule-pickup" />
                <Stack.Screen name="smart-bag-details" />
                <Stack.Screen name="order-status" />
                <Stack.Screen name="profile" />
                <Stack.Screen name="secure-handover" />
                <Stack.Screen name="select-location" />
                <Stack.Screen name="concierge-bot" />
                <Stack.Screen name="help-center" />
                <Stack.Screen name="scent-selection" />
                <Stack.Screen name="payment" />
                <Stack.Screen name="order-history" />
                <Stack.Screen name="cancel-order" />
                <Stack.Screen name="rate-delivery" />
                <Stack.Screen name="free-bag-tracking" />
                <Stack.Screen name="notifications" />
              </Stack>
            </ResponsiveContainer>
          </View>
        </I18nProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f3ea',
  },
});
