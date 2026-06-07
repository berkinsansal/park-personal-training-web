'use client';

import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  const handleSwitch = () => {
    const newPath = locale === 'tr' ? '/en' : '/';
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors"
    >
      <span className={locale === 'tr' ? 'text-amber-400' : 'text-zinc-500'}>TR</span>
      <span className="text-zinc-600">|</span>
      <span className={locale === 'en' ? 'text-amber-400' : 'text-zinc-500'}>EN</span>
    </button>
  );
}
