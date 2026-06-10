'use client';

import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

export default function LocaleSwitcher({ locale, isAdminPath }: { locale: Locale; isAdminPath?: boolean }) {
  const router = useRouter();

  const handleSwitch = () => {
    const newLocale: Locale = locale === 'tr' ? 'en' : 'tr';
    let newPath: string;

    if (isAdminPath) {
      // Admin pages: /admin ↔ /en/admin
      newPath = newLocale === 'tr' ? '/admin' : '/en/admin';
    } else {
      // Public pages: / ↔ /en
      newPath = newLocale === 'tr' ? '/' : '/en';
    }

    router.push(newPath);
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
