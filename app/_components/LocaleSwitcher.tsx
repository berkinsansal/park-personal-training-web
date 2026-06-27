'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n.config';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleSwitch = () => {
    const newLocale: Locale = currentLocale === 'tr' ? 'en' : 'tr';
    const pathWithoutLocale = pathname.replace(/^\/(en|tr)/, '') || '/';
    const newPath = newLocale === 'en' ? `/en${pathWithoutLocale}` : pathWithoutLocale;
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
    >
      <span className={currentLocale === 'tr' ? 'text-amber-400' : 'text-zinc-500'}>TR</span>
      <span className="text-zinc-600">|</span>
      <span className={currentLocale === 'en' ? 'text-amber-400' : 'text-zinc-500'}>EN</span>
    </button>
  );
}
