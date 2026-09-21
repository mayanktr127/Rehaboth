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
  TextInput,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
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
  const [garmentsCount, setGarmentsCount] = useState(4);

  // Damaged items intake
  const [hasDamage, setHasDamage] = useState(false);
  const [damageNotes, setDamageNotes] = useState('');
  const [damagePhotos, setDamagePhotos] = useState<string[]>([]);

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

  const handlePickPhoto = async () => {
    if (damagePhotos.length >= 3) {
      Alert.alert('Limit Reached', 'You can upload up to 3 photos of garment imperfections.');
      return;
    }

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access your photo library is required to attach intake photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        setDamagePhotos(prev => [...prev, result.assets[0].uri]);
      }
    } catch (err) {
      Alert.alert('Photo Selection Error', 'Unable to pick photo.');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setDamagePhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    router.push({
      pathname: '/scent-selection' as any,
      params: {
        pickupDate: selectedDate,
        timeSlot: selectedTime,
        garmentCount: garmentsCount.toString(),
        hasDamage: hasDamage ? 'true' : 'false',
        damageNotes: damageNotes,
        damagePhotos: JSON.stringify(damagePhotos),
      },
    });
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

          {/* Garment Condition & Intake */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              GARMENT CONDITION & FABRIC INTAKE
            </Text>
            <View style={[styles.damageCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Pressable
                onPress={() => setHasDamage(!hasDamage)}
                style={styles.checkboxRow}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    {
                      borderColor: hasDamage ? colors.primary : colors.border,
                      backgroundColor: hasDamage ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {hasDamage && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.checkboxLabel, { color: colors.foreground }]}>
                    Report Pre-existing Snags or Delicate Blemishes
                  </Text>
                  <Text style={[styles.checkboxSub, { color: colors.mutedForeground }]}>
                    Catalog fragile vintage silks, pulls, or loose lapel stitching
                  </Text>
                </View>
              </Pressable>

              {hasDamage && (
                <View style={styles.damageDetailsContainer}>
                  <TextInput
                    style={[
                      styles.damageInput,
                      {
                        backgroundColor: colors.inputBg || colors.background,
                        borderColor: colors.border,
                        color: colors.foreground,
                      },
                    ]}
                    placeholder="Describe specific garment areas (e.g. slight fray on collar)..."
                    placeholderTextColor={colors.mutedForeground}
                    multiline
                    numberOfLines={3}
                    value={damageNotes}
                    onChangeText={setDamageNotes}
                  />

                  {/* Photo attachments */}
                  <View style={styles.photoSection}>
                    <View style={styles.photoHeaderRow}>
                      <Text style={[styles.photoLabel, { color: colors.mutedForeground }]}>
                        INTAKE PHOTOS ({damagePhotos.length}/3)
                      </Text>
                      {damagePhotos.length < 3 && (
                        <Pressable
                          onPress={handlePickPhoto}
                          style={[styles.addPhotoBtn, { borderColor: colors.primary }]}
                        >
                          <Text style={[styles.addPhotoText, { color: colors.primary }]}>+ Add Photo</Text>
                        </Pressable>
                      )}
                    </View>

                    {damagePhotos.length > 0 && (
                      <View style={styles.photosThumbRow}>
                        {damagePhotos.map((uri, idx) => (
                          <View key={idx} style={styles.thumbWrapper}>
                            <Image source={{ uri }} style={styles.thumbImage} />
                            <Pressable
                              onPress={() => handleRemovePhoto(idx)}
                              style={styles.thumbRemoveBtn}
                            >
                              <Text style={styles.thumbRemoveText}>×</Text>
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Confirm / Continue Button */}
          <View style={styles.actionSection}>
            <GoldButton title="PROCEED TO SCENT SELECTION" onPress={handleConfirm} showArrow={true} />
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
  counterRow: {
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
  counterRowTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  counterRowSub: {
    fontSize: 12,
    marginTop: 2,
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
  damageCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkboxSub: {
    fontSize: 12,
    marginTop: 2,
  },
  damageDetailsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ece3d6',
  },
  damageInput: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    fontSize: 13,
    textAlignVertical: 'top',
    minHeight: 70,
  },
  photoSection: {
    marginTop: 14,
  },
  photoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  photoLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  addPhotoBtn: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  addPhotoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  photosThumbRow: {
    flexDirection: 'row',
    gap: 12,
  },
  thumbWrapper: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbRemoveBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'rgba(58, 49, 40, 0.75)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbRemoveText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});
