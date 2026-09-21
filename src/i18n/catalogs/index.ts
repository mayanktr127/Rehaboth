import { SupportedLocale } from '../types';
import { en } from './en';
import { hi } from './hi';
import { ta } from './ta';
import { te } from './te';

export const catalogs: Record<SupportedLocale, Record<string, string>> = {
  en,
  hi,
  ta,
  te,
};
