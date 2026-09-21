import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { I18nProvider, useTranslation } from '../src/i18n';
import { catalogs } from '../src/i18n/catalogs';

describe('i18n Translation & Fallback System', () => {
  it('returns English translation by default', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );
    const { result } = await renderHook(() => useTranslation(), { wrapper });

    expect(result.current.locale).toBe('en');
    expect(result.current.t('welcome_title')).toBe('Welcome to Rehaboth');
    expect(result.current.t('get_started')).toBe('GET STARTED');
  });

  it('switches to Hindi, Tamil, and Telugu locales and returns localized strings', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );
    const { result } = await renderHook(() => useTranslation(), { wrapper });

    // Switch to Hindi
    await act(async () => {
      await result.current.setLocale('hi');
    });
    expect(result.current.locale).toBe('hi');
    expect(result.current.t('welcome_title')).toBe('Rehaboth में आपका स्वागत है');
    expect(result.current.t('get_started')).toBe('शुरू करें');

    // Switch to Tamil
    await act(async () => {
      await result.current.setLocale('ta');
    });
    expect(result.current.locale).toBe('ta');
    expect(result.current.t('welcome_title')).toBe('Rehaboth-க்கு வரவேற்கிறோம்');

    // Switch to Telugu
    await act(async () => {
      await result.current.setLocale('te');
    });
    expect(result.current.locale).toBe('te');
    expect(result.current.t('welcome_title')).toBe('Rehaboth కు స్వాగతం');
  });

  it('falls back to English when key is missing in active locale catalog', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );
    const { result } = await renderHook(() => useTranslation(), { wrapper });

    await act(async () => {
      await result.current.setLocale('ta');
    });

    // Assume hypothetical key only exists in en
    catalogs.en.test_unique_key = 'English Atelier Value';
    expect(result.current.t('test_unique_key')).toBe('English Atelier Value');
    delete catalogs.en.test_unique_key;
  });

  it('returns fallback text or key itself if missing from all catalogs', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider>{children}</I18nProvider>
    );
    const { result } = await renderHook(() => useTranslation(), { wrapper });

    expect(result.current.t('completely_non_existent_key', 'Default Fallback')).toBe(
      'Default Fallback'
    );
    expect(result.current.t('raw_key_name')).toBe('raw_key_name');
  });
});
