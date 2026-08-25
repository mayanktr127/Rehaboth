import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { TargetIcon } from '../components/ServiceIcons';
import { FluidPage } from '../components/FluidMotion';

export default function SchedulePickupScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [selectedDate, setSelectedDate] = useState('Today 24');
  const [selectedTime, setSelectedTime] = useState('slot-1');
  const [garmentsCount, setGarmentsCount] = useState(25);

  const dates = [
    { day: 'Today', date: '24' },
    { day: 'Wed', date: '25' },
    { day: 'Thu', date: '26' },
    { day: 'Fri', date: '27' },
  ];

  const timeSlots = [
    { id: 'slot-1', label: '10:00 AM - 01:00 PM (Morning Valet)' },
    { id: 'slot-2', label: '02:00 PM - 05:00 PM (Afternoon Valet)' },
    { id: 'slot-3', label: '06:00 PM - 09:00 PM (Evening Valet)' },
  ];

  const handleConfirm = () => {
    if (Platform.OS === 'web') {
      router.push('/order-status');
    } else {
      Alert.alert(
        'Pickup Scheduled! 📦✨',
        `Your Valet will arrive on ${selectedDate} during your selected window to collect ${garmentsCount} garments.`,
        [{ text: 'View Order Status', onPress: () => router.push('/order-status') }]
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

          {/* Pickup Date Section */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              PICKUP DATE
            </Text>
            <View style={styles.datesRow}>
              {dates.map((d) => {
                const fullKey = `${d.day} ${d.date}`;
                const isSelected = selectedDate === fullKey;
                return (
                  <Pressable
                    key={fullKey}
                    onPress={() => setSelectedDate(fullKey)}
                    style={({ pressed }) => [
                      styles.dateChip,
                      {
                        backgroundColor: isSelected ? colors.foreground : colors.cardBg,
                        borderColor: isSelected ? colors.foreground : colors.border,
                      },
                      pressed && { opacity: 0.85, transform: [{ scale: 0.96 }] },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateDay,
                        { color: isSelected ? colors.primaryForeground : colors.mutedForeground },
                      ]}
                    >
                      {d.day}
                    </Text>
                    <Text
                      style={[
                        styles.dateNum,
                        { color: isSelected ? colors.primaryForeground : colors.foreground, fontFamily: Fonts.display },
                      ]}
                    >
                      {d.date}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Preferred Time Gutter */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              PREFERRED TIME GUTTER
            </Text>
            <View style={styles.timeSlotsContainer}>
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot.id;
                return (
                  <Pressable
                    key={slot.id}
                    onPress={() => setSelectedTime(slot.id)}
                    style={({ pressed }) => [
                      styles.timeSlotCard,
                      {
                        borderColor: isSelected ? colors.primary : colors.border,
                        backgroundColor: colors.cardBg,
                      },
                      pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
                    ]}
                  >
                    <Text style={[styles.timeSlotText, { color: colors.foreground }]}>
                      {slot.label}
                    </Text>
                    <View
                      style={[
                        styles.radioCircle,
                        {
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                          borderColor: isSelected ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      {isSelected && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Pickup Address */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              PICKUP ADDRESS
            </Text>
            <Pressable
              onPress={() => router.push('/select-location')}
              style={({ pressed }) => [
                styles.addressBox,
                { backgroundColor: colors.cardBg, borderColor: colors.border },
                pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
              ]}
            >
              <View style={styles.addressLeftRow}>
                <View style={[styles.iconBadge, { backgroundColor: '#f2e8dc' }]}>
                  <TargetIcon size={22} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.addressMain, { color: colors.foreground }]}>
                    Flat 402, Prestige Lakeside, Whitefield
                  </Text>
                  <Text style={[styles.addressSub, { color: colors.mutedForeground }]}>
                    844 Park Avenue, Bengaluru, KA
                  </Text>
                </View>
                <Text style={[styles.chevron, { color: colors.mutedForeground }]}>›</Text>
              </View>
            </Pressable>
          </View>

          {/* Garment Volume Counter */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              GARMENT ESTIMATION
            </Text>
            <View style={[styles.counterRow, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View>
                <Text style={[styles.counterRowTitle, { color: colors.foreground }]}>Number of Pieces</Text>
                <Text style={[styles.counterRowSub, { color: colors.mutedForeground }]}>Include suits, dresses & silks</Text>
              </View>
              <View style={styles.counterControls}>
                <Pressable
                  onPress={() => setGarmentsCount(Math.max(1, garmentsCount - 1))}
                  style={({ pressed }) => [
                    styles.counterBtn,
                    { backgroundColor: colors.secondary },
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <Text style={[styles.counterBtnText, { color: colors.foreground }]}>-</Text>
                </Pressable>
                <Text style={[styles.counterValue, { color: colors.foreground, fontFamily: Fonts.display }]}>
                  {garmentsCount}
                </Text>
                <Pressable
                  onPress={() => setGarmentsCount(garmentsCount + 1)}
                  style={({ pressed }) => [
                    styles.counterBtn,
                    { backgroundColor: colors.secondary },
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <Text style={[styles.counterBtnText, { color: colors.foreground }]}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <View style={styles.actionSection}>
            <GoldButton title="CONFIRM PICKUP" onPress={handleConfirm} showArrow={true} />
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
  sectionMargin: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  dateChip: {
    flex: 1,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  dateDay: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dateNum: {
    fontSize: 22,
    marginTop: 2,
  },
  timeSlotsContainer: {
    gap: 10,
  },
  timeSlotCard: {
    height: 54,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  timeSlotText: {
    fontSize: 13,
    fontWeight: '500',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
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
  addressLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressMain: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressSub: {
    fontSize: 12,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
  },
  counterCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  garmentNote: {
    fontSize: 13,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterBtnText: {
    fontSize: 20,
    fontWeight: '600',
  },
  counterValue: {
    fontSize: 22,
  },
  actionSection: {
    marginTop: 28,
  },
});
