export interface DeliveryRating {
  orderId: string;
  ratingStars: number; // 1 - 5
  complimentTags: string[];
  feedbackComment?: string;
  submittedAt: string;
}

export const RATING_COMPLIMENTS: string[] = [
  'Impeccable Press',
  'Punctual Valet',
  'Exquisite Fragrance',
  'Crisp Seam Lines',
  'Tamper-Proof Seal',
  'Gentle Fiber Care',
];
