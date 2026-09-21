export type ScentId = 'lavender' | 'fresh-cotton' | 'sandalwood' | 'unscented';

export interface ScentProfile {
  id: ScentId;
  name: string;
  notes: string;
  description: string;
  intensity: 'delicate' | 'balanced' | 'rich' | 'pure';
  priceInr: number;
  isPopular?: boolean;
}

export const DEFAULT_SCENT_PROFILES: ScentProfile[] = [
  {
    id: 'lavender',
    name: 'Kashmir Lavender',
    notes: 'French High-Altitude Lavender & Crisp Bergamot',
    description: 'Calming botanical vapor finish tailored for woolens, silks, and evening garments.',
    intensity: 'balanced',
    priceInr: 0,
    isPopular: true,
  },
  {
    id: 'fresh-cotton',
    name: 'Fresh Crisp Cotton',
    notes: 'Sun-Drenched Linen & Neroli Blossom',
    description: 'Invigorating morning freshness crafted for business shirting and daytime linens.',
    intensity: 'delicate',
    priceInr: 0,
  },
  {
    id: 'sandalwood',
    name: 'Mysore Royal Sandalwood',
    notes: 'Aged Mysore Sandalwood & Amber Wood',
    description: 'Warm, aristocratic woody richness for festive couture, bandhgalas, and heavy silks.',
    intensity: 'rich',
    priceInr: 150,
  },
  {
    id: 'unscented',
    name: 'Pure Neutral (Hypoallergenic)',
    notes: '100% Deionized Steam Vapor',
    description: 'Completely scent-free ultrasonic purification for sensitive skin and vintage heirlooms.',
    intensity: 'pure',
    priceInr: 0,
  },
];
