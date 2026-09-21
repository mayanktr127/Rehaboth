export type SupportedLocale = 'en' | 'hi' | 'ta' | 'te';

export interface LocaleMeta {
  code: SupportedLocale;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LOCALES: Record<SupportedLocale, LocaleMeta> = {
  en: { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  hi: { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳' },
  ta: { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳' },
  te: { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳' },
};

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => Promise<void>;
  t: (key: string, defaultText?: string) => string;
  availableLocales: LocaleMeta[];
}
