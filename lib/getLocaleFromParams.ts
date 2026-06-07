import { Locale } from './i18n';

export function getLocaleFromParams(params: { locale?: string[] }): Locale {
  if (!params.locale || params.locale.length === 0) return 'tr';
  if (params.locale[0] === 'en') return 'en';
  return 'tr';
}
