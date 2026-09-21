import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Exact design.md tokens
    background: '#f8f3ea', // Warm pressed cream paper
    foreground: '#3a3128', // Warm espresso text
    cardBg: '#fffdf9', // Card / sheet surface
    primary: '#c1774f', // Warm terracotta / rust
    primaryForeground: '#fffaf4', // Text on primary
    secondary: '#f2e7d8', // Icon chips, session CTA bar, active tab
    accent: '#eeddc6', // Hover & warm accents
    mutedForeground: '#8b8175', // Labels, captions, meta
    border: '#ece3d6', // Universal hairline
    input: '#ece3d6', // Input border
    inputBg: '#fffdf9',
    ring: '#c1774f',

    // Supporting semantics
    textPrimary: '#3a3128',
    textSecondary: '#6e655a',
    textMuted: '#8b8175',
    pillBg: '#3a3128',
    pillText: '#fffaf4',
    accentOrange: '#c1774f',
    accentOrangeDark: '#a35a34',
    accentPeach: '#f2e7d8',
    accentGreen: '#e3edd4',
    accentPink: '#fadce5',
    accentSand: '#eeddc6',
    pastelYellowFill: '#f2e7d8',
    glowRadial: '#f2e7d8',
    goldPrimary: '#c1774f',
    goldLight: '#d68b61',
    goldDark: '#a35a34',
    goldBorder: '#ece3d6',
    goldGradient: ['#c1774f', '#a35a34'],
    greenAccent: '#2ECC71',
    destructive: '#c0392b',
    white: '#fffdf9',
  },
  dark: {
    background: '#1f1a16',
    foreground: '#f8f3ea',
    cardBg: '#2c251f',
    primary: '#d68b61',
    primaryForeground: '#1f1a16',
    secondary: '#3a3128',
    accent: '#473d33',
    mutedForeground: '#b5aca1',
    border: '#3f362d',
    input: '#3f362d',
    inputBg: '#2c251f',
    ring: '#d68b61',

    textPrimary: '#f8f3ea',
    textSecondary: '#d4cbbe',
    textMuted: '#b5aca1',
    pillBg: '#f8f3ea',
    pillText: '#1f1a16',
    accentOrange: '#d68b61',
    accentOrangeDark: '#c1774f',
    accentPeach: '#3a3128',
    accentGreen: '#2b3824',
    accentPink: '#3d242e',
    accentSand: '#473d33',
    pastelYellowFill: '#3a3128',
    glowRadial: '#2c251f',
    goldPrimary: '#d68b61',
    goldLight: '#e69f78',
    goldDark: '#c1774f',
    goldBorder: '#3f362d',
    goldGradient: ['#d68b61', '#c1774f'],
    greenAccent: '#2ECC71',
    destructive: '#e05343',
    white: '#fffdf9',
  },
};

export const Fonts = {
  display: Platform.select({
    web: 'Fraunces_400Regular, Fraunces, Georgia, serif',
    ios: 'Fraunces_400Regular',
    android: 'Fraunces_400Regular',
    default: 'Fraunces_400Regular, Georgia, serif',
  }),
  displayMedium: Platform.select({
    web: 'Fraunces_500Medium, Fraunces, Georgia, serif',
    ios: 'Fraunces_500Medium',
    android: 'Fraunces_500Medium',
    default: 'Fraunces_500Medium, Georgia, serif',
  }),
  displayBold: Platform.select({
    web: 'Fraunces_700Bold, Fraunces, Georgia, serif',
    ios: 'Fraunces_700Bold',
    android: 'Fraunces_700Bold',
    default: 'Fraunces_700Bold, Georgia, serif',
  }),
  body: Platform.select({
    web: 'Manrope_400Regular, Manrope, -apple-system, sans-serif',
    ios: 'Manrope_400Regular',
    android: 'Manrope_400Regular',
    default: 'Manrope_400Regular, sans-serif',
  }),
  bodyMedium: Platform.select({
    web: 'Manrope_500Medium, Manrope, -apple-system, sans-serif',
    ios: 'Manrope_500Medium',
    android: 'Manrope_500Medium',
    default: 'Manrope_500Medium, sans-serif',
  }),
  bodySemiBold: Platform.select({
    web: 'Manrope_600SemiBold, Manrope, -apple-system, sans-serif',
    ios: 'Manrope_600SemiBold',
    android: 'Manrope_600SemiBold',
    default: 'Manrope_600SemiBold, sans-serif',
  }),
  bodyBold: Platform.select({
    web: 'Manrope_700Bold, Manrope, -apple-system, sans-serif',
    ios: 'Manrope_700Bold',
    android: 'Manrope_700Bold',
    default: 'Manrope_700Bold, sans-serif',
  }),
};

export const DemoData = {
  user: {
    fullName: 'Devendra Sharma',
    countryCode: '+91',
    phoneNumber: '98765 43210',
    email: 'devendra@gmail.com',
    otp: '2 1 9 4',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  addresses: [
    {
      id: 'home',
      label: 'Home (Bengaluru)',
      address: 'Flat 402, Oakwood, Indiranagar, Bengaluru - 560038',
      isDefault: true,
    },
    {
      id: 'office',
      label: 'Office (Mumbai)',
      address: 'Flat 12, Maker Chambers, Nariman Point, Mumbai - 400021',
      isDefault: false,
    },
  ],
};
