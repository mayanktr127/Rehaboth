import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { DemoData } from '../constants/theme';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FluidPage } from '../components/FluidMotion';

export default function SelectLocationScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [searchQuery, setSearchQuery] = useState('Indiranagar, Bengaluru');
  const [selectedAddressId, setSelectedAddressId] = useState('home');

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


        {/* Search Bar Input Card */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={{ fontSize: 16, color: colors.mutedForeground }}>⌕</Text>
            <TextInput
              style={[styles.searchInput, { color: colors.foreground }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search area, apartment, street..."
              placeholderTextColor={colors.mutedForeground}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Text style={[styles.clearBtn, { color: colors.mutedForeground }]}>✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Dark Map Graphic Preview Card */}
        <View style={[styles.mapCard, { backgroundColor: colors.foreground }]}>
          <View style={styles.mapGraphicInner}>
            <View style={styles.mapGridLines} />
            {/* Terracotta Pin Badge */}
            <View style={[styles.mapPinBadge, { backgroundColor: colors.primary }]}>
              <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>●</Text>
            </View>
            <View style={styles.mapCallout}>
              <Text style={[styles.mapCalloutTitle, { color: colors.primary }]}>PICKUP LOCATION</Text>
              <Text style={[styles.mapCalloutSub, { color: colors.primaryForeground }]}>
                Indiranagar 12th Main Road
              </Text>
            </View>
          </View>
        </View>

        {/* Saved Addresses Section */}
        <View style={styles.sectionMargin}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            SAVED ADDRESSES
          </Text>

          <View style={styles.addressList}>
            {DemoData.addresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;
              return (
                <Pressable
                  key={addr.id}
                  onPress={() => setSelectedAddressId(addr.id)}
                  style={[
                    styles.savedAddrCard,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <View style={styles.addrCardLeft}>
                    <View
                      style={[
                        styles.addrIconBox,
                        { backgroundColor: isSelected ? '#f2e8dc' : colors.background },
                      ]}
                    >
                      <Text style={{ fontSize: 16, color: colors.foreground }}>{addr.id === 'home' ? '⌂' : '日'}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.addrLabelText, { color: colors.foreground }]}>
                        {addr.label}
                      </Text>
                      <Text style={[styles.addrFullText, { color: colors.mutedForeground }]}>

                        {addr.address}
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

        {/* Sequential Action -> Enters Main App Dashboard! */}
        <View style={styles.actionSection}>
          <GoldButton
            title="CONFIRM LOCATION"
            onPress={() => router.push('/dashboard')}
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
  searchSection: {
    marginTop: 20,
  },
  searchBox: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  clearBtn: {
    fontSize: 14,
    padding: 4,
  },
  mapCard: {
    height: 180,
    borderRadius: 24,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
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
    opacity: 0.12,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  mapPinBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c1774f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  mapCallout: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  mapCalloutTitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  mapCalloutSub: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
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
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
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
    marginTop: 28,
  },
});
