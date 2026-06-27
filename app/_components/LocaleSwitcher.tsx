'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

export default function LocaleSwitcher({ locale, isAdminPath }: { locale: Locale; isAdminPath?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = () => {
    const newLocale: Locale = locale === 'tr' ? 'en' : 'tr';
    let newPath: string;

    if (isAdminPath) {
      // Admin pages: preserve path, switch between /admin and /en/admin
      if (newLocale === 'en') {
        newPath = `/en${pathname.replace(/^\/en/, '')}`;
      } else {
        newPath = pathname.replace(/^\/en/, '');
      }
    } else {
      // Public pages: preserve path, switch between / and /en/
      if (newLocale === 'en') {
        newPath = `/en${pathname}`;
      } else {
        newPath = pathname.replace(/^\/en/, '') || '/';
      }
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
