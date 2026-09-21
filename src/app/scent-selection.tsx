import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { GoldButton } from '../components/GoldButton';
import { Fonts } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { ScentId, DEFAULT_SCENT_PROFILES } from '../domain';
import { apiService } from '../services/api';

export default function ScentSelectionScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{
    pickupDate?: string;
    timeSlot?: string;
    garmentCount?: string;
    hasDamage?: string;
    damageNotes?: string;
    damagePhotos?: string;
  }>();

  const [selectedScentId, setSelectedScentId] = useState<ScentId>('lavender');
  const [saveAsDefault, setSaveAsDefault] = useState(true);

  const handleContinue = async () => {
    if (saveAsDefault) {
      try {
        await apiService.updateProfile({ defaultFragranceId: selectedScentId });
      } catch (err) {
        // non-blocking
      }
    }

    router.push({
      pathname: '/payment' as any,
      params: {
        ...params,
        scentId: selectedScentId,
      },
    });
  };

  const getScentIcon = (id: ScentId) => {
    switch (id) {
      case 'lavender':
        return '🪻';
      case 'fresh-cotton':
        return '☁️';
      case 'sandalwood':
        return '🪵';
      case 'unscented':
        return '✨';
      default:
        return '🌿';
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
          <TopHeaderNav showBack={true} />

          {/* Editorial Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.categorySubtitle, { color: colors.mutedForeground }]}>
              STEP 2 OF 3 • AROMA ARCHITECTURE
            </Text>
            <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Signature Scent
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Our high-pressure vapor infused finishing bonds natural botanical essences deep within fabric fibers.
            </Text>
          </View>

          {/* Scent Cards Grid */}
          <View style={styles.scentList}>
            {DEFAULT_SCENT_PROFILES.map((scent) => {
              const isSelected = selectedScentId === scent.id;
              return (
                <Pressable
                  key={scent.id}
                  onPress={() => setSelectedScentId(scent.id)}
                  style={({ pressed }) => [
                    styles.scentCard,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    },
                    pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
                  ]}
                >
                  <View style={styles.cardTopRow}>
                    <View style={styles.iconAndTitle}>
                      <View style={[styles.scentIconBox, { backgroundColor: colors.secondary }]}>
                        <Text style={styles.scentEmoji}>{getScentIcon(scent.id)}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.scentName, { color: colors.foreground, fontFamily: Fonts.display }]}>
                          {scent.name}
                        </Text>
                        <Text style={[styles.scentNotes, { color: colors.mutedForeground }]}>
                          {scent.notes}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.radioIndicator,
                        {
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                        },
                      ]}
                    >
                      {isSelected && <Text style={styles.checkTick}>✓</Text>}
                    </View>
                  </View>

                  <Text style={[styles.scentDescription, { color: colors.textSecondary }]}>
                    {scent.description}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Save as Default Wardrobe Aroma Switch */}
          <View style={[styles.defaultToggleCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={[styles.toggleTitle, { color: colors.foreground }]}>
                Save as Default Wardrobe Aroma
              </Text>
              <Text style={[styles.toggleSub, { color: colors.mutedForeground }]}>
                Pre-select this botanical profile for all upcoming valet pickups.
              </Text>
            </View>
            <Switch
              value={saveAsDefault}
              onValueChange={setSaveAsDefault}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          {/* Proceed Button */}
          <View style={styles.actionSection}>
            <GoldButton title="CONTINUE TO PAYMENT" onPress={handleContinue} showArrow={true} />
          </View>
        </ScrollView>
      </FluidPage>

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
  titleSection: {
    marginTop: 18,
    marginBottom: 20,
  },
  categorySubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  screenTitle: {
    fontSize: 32,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  scentList: {
    gap: 14,
  },
  scentCard: {
    borderRadius: 22,
    padding: 18,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  scentIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scentEmoji: {
    fontSize: 22,
  },
  scentName: {
    fontSize: 17,
    letterSpacing: -0.2,
  },
  scentNotes: {
    fontSize: 12,
    marginTop: 2,
  },
  radioIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkTick: {
    color: '#fffaf4',
    fontSize: 13,
    fontWeight: 'bold',
  },
  scentDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  defaultToggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleSub: {
    fontSize: 12,
    marginTop: 3,
    lineHeight: 16,
  },
  actionSection: {
    marginTop: 28,
  },
});
