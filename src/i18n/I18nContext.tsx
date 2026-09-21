import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SupportedLocale,
  LocaleMeta,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  I18nContextType,
} from './types';
import { catalogs } from './catalogs';
import { tokenStorage } from '../services/api/storage';

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: async () => {},
  t: (key: string, fallback?: string) => fallback || key,
  availableLocales: Object.values(SUPPORTED_LOCALES),
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    let mounted = true;
    const loadSavedLocale = async () => {
      try {
        const saved = await tokenStorage.getLocale();
        if (mounted && saved && saved in SUPPORTED_LOCALES) {
          setLocaleState(saved as SupportedLocale);
        }
      } catch {
        // Fall back to default
      }
    };
    loadSavedLocale();
    return () => {
      mounted = false;
    };
  }, []);

  const setLocale = useCallback(async (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    await tokenStorage.setLocale(newLocale);
  }, []);

  const t = useCallback(
    (key: string, defaultText?: string): string => {
      const activeCatalog = catalogs[locale];
      const enCatalog = catalogs.en;

      if (activeCatalog && key in activeCatalog && activeCatalog[key]) {
        return activeCatalog[key];
      }

      if (enCatalog && key in enCatalog && enCatalog[key]) {
        return enCatalog[key];
      }

      return defaultText !== undefined ? defaultText : key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        availableLocales: Object.values(SUPPORTED_LOCALES),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
