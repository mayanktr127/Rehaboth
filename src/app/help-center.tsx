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
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { FluidPage } from '../components/FluidMotion';

export default function HelpCenterScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What are your operating hours?',
      a: 'Our digital concierge is operational daily from 7:00 AM to 10:00 PM. Logistics runs are carried out scheduled per pickup.',
    },
    {
      q: 'What garment types do you handle?',
      a: 'We specialize in fine silks, woolens, tweeds, designer couture, suits, dresses, and daily luxury pressing.',
    },
    {
      q: 'How is pricing determined?',
      a: 'Pricing is based on garment care specifications, fabric sensitivity, and studio press requirements.',
    },
    {
      q: 'Do you operate on Sundays or holidays?',
      a: 'Yes, our pickup valets operate 7 days a week including public holidays.',
    },
    {
      q: 'How do I schedule a pickup?',
      a: 'You can tap Schedule Pickup on your dashboard or select your preferred date/time gutter.',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FluidPage style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Top Header */}
          <TopHeaderNav showBack={true} onBackPress={() => router.push('/dashboard')} />

          {/* Quick Action Cards (Live Chat & WhatsApp) */}
          <View style={styles.actionGrid}>
            <Pressable
              onPress={() => router.push('/concierge-bot')}
              style={[styles.gridCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            >
              <View style={[styles.badgePill, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.badgeText, { color: colors.foreground }]}>CHAT</Text>
              </View>
              <Text style={[styles.cardTitle, { color: colors.primary }]}>LIVE CHAT</Text>
              <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>Concierge agent support</Text>
            </Pressable>


          <Pressable
            onPress={() => Alert.alert('WhatsApp', 'Opening Rehaboth WhatsApp Concierge...')}
            style={[styles.gridCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
          >
            <View style={[styles.badgePill, { backgroundColor: colors.accentGreen }]}>
              <Text style={[styles.badgeText, { color: colors.foreground }]}>WA</Text>
            </View>
            <Text style={[styles.cardTitle, { color: '#2ECC71' }]}>WHATSAPP</Text>
            <Text style={[styles.cardSub, { color: colors.mutedForeground }]}>Instant text messaging</Text>
          </Pressable>
        </View>

        {/* Contact Info Box */}
        <View style={[styles.contactBox, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.contactRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.secondary }]}>
              <Text style={styles.iconText}>@</Text>
            </View>
            <View>
              <Text style={[styles.contactLabel, { color: colors.mutedForeground }]}>Email Custodian</Text>
              <Text style={[styles.contactVal, { color: colors.foreground }]}>support@rehaboth.in</Text>
            </View>
          </View>

          <View style={styles.contactRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.secondary }]}>
              <Text style={styles.iconText}>PH</Text>
            </View>
            <View>
              <Text style={[styles.contactLabel, { color: colors.mutedForeground }]}>Direct Concierge Line</Text>
              <Text style={[styles.contactValGold, { color: colors.primary }]}>
                +91 98765 43210
              </Text>
            </View>
          </View>
        </View>

        {/* Raise a Complaint Button */}
        <Pressable
          onPress={() => Alert.alert('Raise Complaint', 'Ticket creation wizard loaded.')}
          style={[styles.complaintBtn, { borderColor: colors.border, backgroundColor: colors.cardBg }]}
        >
          <Text style={[styles.complaintText, { color: colors.foreground }]}>
            RAISE A COMPLAINT
          </Text>
        </Pressable>

        {/* FAQs Section */}
        <View style={styles.sectionMargin}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            FREQUENTLY ASKED QUESTIONS
          </Text>

          <View style={styles.faqList}>
            {faqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <View
                  key={idx}
                  style={[styles.faqCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                >
                  <Pressable
                    onPress={() => setExpandedIndex(isExpanded ? null : idx)}
                    style={styles.faqHeaderRow}
                  >
                    <Text style={[styles.faqQuestion, { color: colors.foreground }]}>{faq.q}</Text>
                    <Text style={[styles.chevron, { color: colors.primary }]}>
                      {isExpanded ? '▲' : '▼'}
                    </Text>
                  </Pressable>
                  {isExpanded && (
                    <Text style={[styles.faqAnswer, { color: colors.mutedForeground }]}>{faq.a}</Text>
                  )}
                </View>
              );
            })}
          </View>
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
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  gridCard: {
    flex: 1,
    height: 110,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    justifyContent: 'space-between',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardSub: {
    fontSize: 11,
  },
  contactBox: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginTop: 16,
    gap: 14,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 11,
    fontWeight: '700',
  },
  contactLabel: {
    fontSize: 11,
  },
  contactVal: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },
  contactValGold: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 1,
  },
  complaintBtn: {
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  complaintText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  sectionMargin: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  faqList: {
    gap: 10,
  },
  faqCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  faqHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    paddingRight: 10,
  },
  chevron: {
    fontSize: 10,
  },
  faqAnswer: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
});
