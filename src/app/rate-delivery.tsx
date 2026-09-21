import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../components/ThemeContext';
import { TopHeaderNav } from '../components/TopHeaderNav';
import { FloatingDockNav } from '../components/FloatingDockNav';
import { GoldButton } from '../components/GoldButton';
import { Fonts } from '../constants/theme';
import { FluidPage } from '../components/FluidMotion';
import { apiService } from '../services/api';

const COMPLIMENT_OPTIONS = [
  'Punctual Valet ⏱️',
  'Flawless Steam Roll 👔',
  'Enchanting Aroma 🪻',
  'Impeccable Packaging 📦',
  'Courteous Custodian 🤝',
  'Gentle Fiber Care ✨',
];

export default function RateDeliveryScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ orderId?: string }>();
  const orderId = params.orderId || 'ORD-9482';

  const [rating, setRating] = useState<number>(5);
  const [selectedCompliments, setSelectedCompliments] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleCompliment = (compliment: string) => {
    setSelectedCompliments((prev) =>
      prev.includes(compliment)
        ? prev.filter((c) => c !== compliment)
        : [...prev, compliment]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await apiService.rateOrder({
        orderId,
        ratingStars: rating,
        feedbackComment: feedback,
        complimentTags: selectedCompliments,
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err: any) {
      Alert.alert('Feedback Error', err.message || 'Unable to submit review.');
    } finally {
      setIsSubmitting(false);
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

          {isSubmitted ? (
            <View style={[styles.thankYouCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={styles.thankYouEmoji}>✨</Text>
              <Text style={[styles.thankYouTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                Gratitude from the Atelier
              </Text>
              <Text style={[styles.thankYouSub, { color: colors.mutedForeground }]}>
                Your review has been cataloged and shared with your delivery custodian. We look forward to caring for your wardrobe again soon.
              </Text>
              <Pressable
                onPress={() => router.replace('/dashboard')}
                style={[styles.returnBtn, { backgroundColor: colors.foreground }]}
              >
                <Text style={[styles.returnBtnText, { color: colors.primaryForeground }]}>
                  Return to Wardrobe Dashboard
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              {/* Header */}
              <View style={styles.titleSection}>
                <Text style={[styles.categorySubtitle, { color: colors.mutedForeground }]}>
                  PATRON APPRECIATION
                </Text>
                <Text style={[styles.screenTitle, { color: colors.foreground, fontFamily: Fonts.display }]}>
                  Rate Valet Experience
                </Text>
                <Text style={[styles.description, { color: colors.mutedForeground }]}>
                  Help our artisans uphold rigorous standards of luxury garment handling and doorstep discretion.
                </Text>
              </View>

              {/* Star Rating Card */}
              <View style={[styles.starsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <Text style={[styles.starsPrompt, { color: colors.foreground, fontFamily: Fonts.display }]}>
                  How was your delivery?
                </Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Pressable
                      key={star}
                      onPress={() => setRating(star)}
                      style={({ pressed }) => [
                        styles.starBtn,
                        pressed && { transform: [{ scale: 1.2 }] },
                      ]}
                    >
                      <Text
                        style={[
                          styles.starIcon,
                          { color: star <= rating ? colors.primary : colors.border },
                        ]}
                      >
                        ★
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={[styles.ratingLabel, { color: colors.primary }]}>
                  {rating === 5 ? 'Exceptional Luxury Service' : rating === 4 ? 'Very Good Experience' : rating === 3 ? 'Standard Delivery' : 'Needs Improvement'}
                </Text>
              </View>

              {/* Compliments Chips */}
              <View style={styles.sectionMargin}>
                <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                  WHAT STOOD OUT?
                </Text>
                <View style={styles.chipsContainer}>
                  {COMPLIMENT_OPTIONS.map((c) => {
                    const isSelected = selectedCompliments.includes(c);
                    return (
                      <Pressable
                        key={c}
                        onPress={() => toggleCompliment(c)}
                        style={({ pressed }) => [
                          styles.chip,
                          {
                            backgroundColor: isSelected ? colors.primary : colors.cardBg,
                            borderColor: isSelected ? colors.primary : colors.border,
                          },
                          pressed && { opacity: 0.85 },
                        ]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            { color: isSelected ? colors.primaryForeground : colors.foreground },
                          ]}
                        >
                          {c}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Feedback Text Input */}
              <View style={styles.sectionMargin}>
                <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                  PERSONAL NOTES OR OBSERVATIONS
                </Text>
                <TextInput
                  style={[
                    styles.feedbackInput,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: colors.border,
                      color: colors.foreground,
                    },
                  ]}
                  placeholder="Share comments on finish, scent subtle nuance, or valet punctuality..."
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  numberOfLines={4}
                  value={feedback}
                  onChangeText={setFeedback}
                />
              </View>

              {/* Submit Button */}
              <View style={styles.actionSection}>
                {isSubmitting ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <GoldButton
                    title="SUBMIT VALET REVIEW"
                    onPress={handleSubmit}
                    showArrow={true}
                  />
                )}
              </View>
            </>
          )}
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
  starsCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#3a3128',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  starsPrompt: {
    fontSize: 18,
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  starBtn: {
    padding: 4,
  },
  starIcon: {
    fontSize: 38,
  },
  ratingLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sectionMargin: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  feedbackInput: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    fontSize: 13,
    textAlignVertical: 'top',
    minHeight: 90,
  },
  actionSection: {
    marginTop: 28,
  },
  thankYouCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    marginTop: 40,
  },
  thankYouEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  thankYouTitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  thankYouSub: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  returnBtn: {
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  returnBtnText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
