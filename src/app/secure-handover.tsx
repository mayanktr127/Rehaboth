import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { GoldButton } from '../components/GoldButton';
import { CodeInput } from '../components/CodeInput';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { Fonts } from '../constants/theme';
import { PadlockIcon } from '../components/ServiceIcons';
import { FluidPage } from '../components/FluidMotion';

export default function SecureHandoverScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [code, setCode] = useState('4921');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (code.length !== 4) {
      Alert.alert('Incomplete Code', 'Please enter or confirm the full 4-digit code.');
      return;
    }
    setIsConfirmed(true);
    Alert.alert(
      'Handover Confirmed! 🤝✨',
      'Garment custody successfully verified with Custodian Suresh (#ST-VAL-904).',
      [
        {
          text: 'Rate Experience',
          onPress: () => router.push('/rate-delivery' as any),
        },
        {
          text: 'View Status',
          onPress: () => router.push('/order-status'),
        },
      ]
    );
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

          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={[styles.alertBadge, { backgroundColor: '#f2e8dc' }]}>
              <PadlockIcon size={24} />
            </View>

            <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.display }]}>
              Identity Verification
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
              Share this secure code with your delivery partner upon arrival to confirm receipt of your sealed garments.
            </Text>
          </View>

          {/* Real Controlled CodeInput Component */}
          <CodeInput
            length={4}
            value={code}
            onChange={setCode}
            onComplete={(c) => {
              if (c === '4921') {
                // Auto-ready
              }
            }}
          />

        {/* Order Overview Section */}
        <View style={styles.sectionMargin}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            ORDER OVERVIEW
          </Text>

          <View style={[styles.overviewCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            {/* Delivery Partner Sub-card */}
            <View style={styles.partnerRow}>
              <View style={[styles.avatarCircle, { backgroundColor: colors.secondary }]}>
                <Text style={{ fontSize: 20 }}>👮‍♂️</Text>
              </View>
              <View>
                <Text style={[styles.partnerName, { color: colors.foreground }]}>
                  Delivery Partner: Suresh
                </Text>
                <Text style={[styles.partnerId, { color: colors.mutedForeground }]}>
                  Custodian ID: #ST-VAL-904
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>
                Rehaboth Steam Ironing
              </Text>
              <Text style={[styles.detailValue, { color: colors.foreground }]}>
                25 Garments
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>
                Fragrance
              </Text>
              <Text style={[styles.detailGoldValue, { color: colors.primary }]}>
                Kashmir Lavender
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>
                Order Code
              </Text>
              <Text style={[styles.orderCodeVal, { color: colors.foreground, fontFamily: Fonts.display }]}>
                #ST-9482
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <GoldButton title="CONFIRM HANDOVER" onPress={handleConfirm} showArrow={true} />
          <Pressable
            onPress={() => router.push('/help-center')}
            style={[styles.outlineBtn, { borderColor: colors.border, backgroundColor: colors.cardBg }]}
          >
            <Text style={[styles.outlineBtnText, { color: colors.foreground }]}>
              CONTACT SUPPORT
            </Text>
          </Pressable>
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
  headerSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  alertBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  exclamationIcon: {
    fontSize: 26,
    fontWeight: '800',
  },
  title: {
    fontSize: 26,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
    paddingHorizontal: 10,
  },
  codeBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 28,
  },
  codeSquare: {
    flex: 1,
    height: 76,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  codeDigit: {
    fontSize: 32,
  },
  sectionMargin: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  overviewCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  partnerId: {
    fontSize: 12,
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 13,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  detailGoldValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  orderCodeVal: {
    fontSize: 16,
  },
  actionSection: {
    marginTop: 28,
    gap: 12,
  },
  outlineBtn: {
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  outlineBtnText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
