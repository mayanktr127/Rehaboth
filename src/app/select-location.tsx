import React, { useState, useEffect, useCallback } from 'react';
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
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FluidPage } from '../components/FluidMotion';
import { Fonts } from '../constants/theme';
import {
  geocodingService,
  GeocodedLocation,
  DEFAULT_COVERAGE_LOCATIONS,
} from '../services/geo';
import { useTranslation } from '../i18n';

export default function SelectLocationScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('Indiranagar, Bengaluru');
  const [searchResults, setSearchResults] = useState<GeocodedLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<GeocodedLocation>(
    DEFAULT_COVERAGE_LOCATIONS[0]
  );
  const [selectedAddressId, setSelectedAddressId] = useState('home');

  // Debounced address search
  useEffect(() => {
    let isCurrent = true;
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const results = await geocodingService.searchAddresses(searchQuery);
          if (isCurrent) setSearchResults(results);
        } catch {
          // Fallback to static coverage
          if (isCurrent) setSearchResults(DEFAULT_COVERAGE_LOCATIONS.slice(0, 3));
        } finally {
          if (isCurrent) setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 280);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSelectSearchResult = (loc: GeocodedLocation) => {
    setSelectedLocation(loc);
    setSearchQuery(loc.title);
    setSearchResults([]);
  };

  const handleSelectSavedAddress = (id: string, loc: GeocodedLocation) => {
    setSelectedAddressId(id);
    setSelectedLocation(loc);
    setSearchQuery(loc.title);
  };

  const handleConfirmLocation = () => {
    router.back();
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

          {/* Title Section */}
          <View style={styles.headerSection}>
            <Text style={[styles.subtitle, { color: colors.primary }]}>
              CONCIERGE VALET LOGISTICS
            </Text>
            <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Pickup Address
            </Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Select your residence or office for complimentary door-to-door garment handover.
            </Text>
          </View>

          {/* Search Bar Input Card */}
          <View style={styles.searchSection}>
            <View
              style={[
                styles.searchBox,
                { backgroundColor: colors.cardBg, borderColor: colors.border },
              ]}
            >
              <Text style={{ fontSize: 16, color: colors.mutedForeground }}>⌕</Text>
              <TextInput
                style={[styles.searchInput, { color: colors.foreground }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search Bengaluru locality, apartment, street..."
                placeholderTextColor={colors.mutedForeground}
              />
              {isSearching ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : searchQuery.length > 0 ? (
                <Pressable onPress={() => setSearchQuery('')}>
                  <Text style={[styles.clearBtn, { color: colors.mutedForeground }]}>✕</Text>
                </Pressable>
              ) : null}
            </View>

            {/* Suggestions dropdown */}
            {searchResults.length > 0 && (
              <View
                style={[
                  styles.suggestionsBox,
                  { backgroundColor: colors.cardBg, borderColor: colors.border },
                ]}
              >
                {searchResults.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => handleSelectSearchResult(item)}
                    style={({ pressed }) => [
                      styles.suggestionRow,
                      { borderBottomColor: colors.border },
                      pressed && { backgroundColor: colors.secondary },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.suggestionTitle, { color: colors.foreground }]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[styles.suggestionSub, { color: colors.mutedForeground }]}
                        numberOfLines={1}
                      >
                        {item.fullAddress}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.serviceBadge,
                        {
                          color: item.isServiceable ? colors.primary : colors.destructive,
                          backgroundColor: item.isServiceable ? colors.secondary : '#fee2e2',
                        },
                      ]}
                    >
                      {item.isServiceable ? 'SERVICEABLE' : 'OUTSIDE ZONE'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Map Preview Canvas */}
          <View style={[styles.mapCard, { backgroundColor: colors.foreground }]}>
            <View style={styles.mapGraphicInner}>
              <View style={styles.mapGridLines} />
              {/* Concentric radar rings */}
              <View style={styles.radarRingOuter} />
              <View style={styles.radarRingInner} />

              {/* Pin badge */}
              <View style={[styles.mapPinBadge, { backgroundColor: colors.primary }]}>
                <Text style={{ fontSize: 13, color: '#fff', fontWeight: 'bold' }}>●</Text>
              </View>

              {/* Pin Callout */}
              <View style={styles.mapCallout}>
                <Text style={[styles.mapCalloutTitle, { color: colors.primary }]}>
                  {selectedLocation.isServiceable ? 'REHABOTH ATELIER SERVICED' : 'LIMITED SERVICE'}
                </Text>
                <Text style={[styles.mapCalloutSub, { color: colors.primaryForeground }]}>
                  {selectedLocation.title}
                </Text>
                <Text style={styles.mapCoords}>
                  {selectedLocation.coordinates.latitude.toFixed(4)}° N,{' '}
                  {selectedLocation.coordinates.longitude.toFixed(4)}° E • PIN {selectedLocation.pincode}
                </Text>
              </View>
            </View>
          </View>

          {/* Saved Addresses Section */}
          <View style={styles.sectionMargin}>
            <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
              ATELIER SAVED ADDRESSES
            </Text>

            <View style={styles.addressList}>
              {DEFAULT_COVERAGE_LOCATIONS.slice(0, 3).map((loc, idx) => {
                const addrKey = idx === 0 ? 'home' : idx === 1 ? 'office' : 'residence';
                const isSelected = selectedAddressId === addrKey;
                const icon = idx === 0 ? '⌂' : idx === 1 ? '日' : '◈';
                const label = idx === 0 ? 'Primary Residence' : idx === 1 ? 'Executive Office' : 'Studio Residence';

                return (
                  <Pressable
                    key={loc.id}
                    onPress={() => handleSelectSavedAddress(addrKey, loc)}
                    style={({ pressed }) => [
                      styles.savedAddrCard,
                      {
                        backgroundColor: colors.cardBg,
                        borderColor: isSelected ? colors.primary : colors.border,
                        borderWidth: isSelected ? 2 : 1,
                      },
                      pressed && { opacity: 0.9 },
                    ]}
                  >
                    <View style={styles.addrCardLeft}>
                      <View
                        style={[
                          styles.addrIconBox,
                          { backgroundColor: isSelected ? colors.secondary : colors.background },
                        ]}
                      >
                        <Text style={{ fontSize: 16, color: colors.foreground }}>{icon}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.addrLabelText, { color: colors.foreground }]}>
                          {label}
                        </Text>
                        <Text style={[styles.addrFullText, { color: colors.mutedForeground }]}>
                          {loc.fullAddress}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.radioOuter,
                        {
                          borderColor: isSelected ? colors.primary : colors.border,
                          backgroundColor: isSelected ? colors.primary : 'transparent',
                        },
                      ]}
                    >
                      {isSelected && <Text style={styles.radioInner}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Confirm Action CTA */}
          <View style={styles.actionSection}>
            <GoldButton
              title="CONFIRM PICKUP ADDRESS"
              onPress={handleConfirmLocation}
              showArrow={true}
            />
          </View>
        </ScrollView>
      </FluidPage>
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
    marginTop: 10,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '400',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  searchSection: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 10,
  },
  searchBox: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  clearBtn: {
    fontSize: 14,
    padding: 4,
  },
  suggestionsBox: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  suggestionRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    gap: 8,
  },
  suggestionTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  suggestionSub: {
    fontSize: 11,
    marginTop: 2,
  },
  serviceBadge: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  mapCard: {
    height: 190,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapGraphicInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mapGridLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.08,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  radarRingOuter: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  radarRingInner: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  mapPinBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c1774f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  mapCallout: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  mapCalloutTitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  mapCalloutSub: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  mapCoords: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
    letterSpacing: 0.5,
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
  addressList: {
    gap: 10,
  },
  savedAddrCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addrCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  addrIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addrLabelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addrFullText: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioInner: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  actionSection: {
    marginTop: 24,
  },
});
