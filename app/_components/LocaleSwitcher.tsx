'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n.config';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) {
      return;
    }
    const pathWithoutLocale = pathname.replace(/^\/(en|tr)/, '') || '/';
    const newPath =
      locale === 'en' ? `/en${pathWithoutLocale}` : pathWithoutLocale;
    router.push(newPath);
  };

  return (
    <div className="inline-flex items-center gap-0.5 bg-zinc-900/60 border border-zinc-700/50 rounded-full p-0.5 backdrop-blur-sm hover:border-zinc-600/80 transition-colors duration-200">
      {(['tr', 'en'] as const).map((locale) => (
        <button
          key={locale}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            currentLocale === locale
              ? 'bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/30 scale-100'
              : 'text-zinc-400 hover:text-zinc-200 hover:cursor-pointer active:scale-95'
          }`}
          onClick={() => handleLocaleChange(locale)}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
