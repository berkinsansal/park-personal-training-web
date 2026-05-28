import { cookies } from 'next/headers';
import type { Locale } from './i18n';

export async function getLocale(): Promise<Locale> {
  const val = (await cookies()).get('locale')?.value;
  return val === 'en' ? 'en' : 'tr';
}
