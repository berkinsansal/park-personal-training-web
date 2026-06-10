'use client';

import { useRouter } from 'next/navigation';
import { setLocaleAction } from '@/app/admin/actions';
import type { Locale } from '@/lib/i18n';

export default function LocaleSwitcher({ locale, urlBased }: { locale: Locale; urlBased?: boolean }) {
  const router = useRouter();

  const handleSwitch = async () => {
    const newLocale: Locale = locale === 'tr' ? 'en' : 'tr';

    if (urlBased) {
      // Public pages use URL-based routing
      const newPath = newLocale === 'tr' ? '/' : '/en';
      router.push(newPath);
    } else {
      // Admin pages use cookie-based locale
      await setLocaleAction(newLocale);
    }
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
    >
      <span className={locale === 'tr' ? 'text-amber-400' : 'text-zinc-500'}>TR</span>
      <span className="text-zinc-600">|</span>
      <span className={locale === 'en' ? 'text-amber-400' : 'text-zinc-500'}>EN</span>
    </button>
  );
}
