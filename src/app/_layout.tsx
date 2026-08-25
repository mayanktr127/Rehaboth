import { Stack } from "expo-router";
import { ThemeProvider } from "../components/ThemeContext";
import { ResponsiveContainer } from "../components/ResponsiveContainer";
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
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
            </Stack>



          </ResponsiveContainer>

        </View>
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
