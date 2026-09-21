import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'rehaboth_auth_token';
const REFRESH_TOKEN_KEY = 'rehaboth_refresh_token';
const USER_KEY = 'rehaboth_auth_user';

export const tokenStorage = {
  async setToken(token: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(TOKEN_KEY, token);
        }
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
    } catch (e) {
      console.warn('Failed to store auth token:', e);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          return window.localStorage.getItem(TOKEN_KEY);
        }
        return null;
      }
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to retrieve auth token:', e);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(TOKEN_KEY);
          window.localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.localStorage.removeItem(USER_KEY);
        }
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      }
    } catch (e) {
      console.warn('Failed to remove auth token:', e);
    }
  },

  async setLocale(locale: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('rehaboth_user_locale', locale);
        }
      } else {
        await SecureStore.setItemAsync('rehaboth_user_locale', locale);
      }
    } catch (e) {
      console.warn('Failed to store locale:', e);
    }
  },

  async getLocale(): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          return window.localStorage.getItem('rehaboth_user_locale');
        }
        return null;
      }
      return await SecureStore.getItemAsync('rehaboth_user_locale');
    } catch (e) {
      return null;
    }
  },
};
