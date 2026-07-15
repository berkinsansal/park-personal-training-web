'use client';

import { Button } from '@/components/ui/button';
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
        <Button
          key={locale}
          variant={currentLocale === locale ? 'default' : 'ghost'}
          size="sm"
          className="uppercase rounded-full"
          onClick={() => handleLocaleChange(locale)}
        >
          {locale}
        </Button>
      ))}
    </div>
  );
}
