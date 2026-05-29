'use client';

import { useActionState } from 'react';
import { setLocaleAction } from '@/app/actions';
import type { Locale } from '@/lib/i18n';

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const [, action] = useActionState(setLocaleAction, null);
  const next = locale === 'tr' ? 'en' : 'tr';

  return (
    <form action={action}>
      <input type="hidden" name="locale" value={next} />
      <button
        type="submit"
        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
      >
        <span className={locale === 'tr' ? 'text-amber-400' : 'text-zinc-500'}>TR</span>
        <span className="text-zinc-600">|</span>
        <span className={locale === 'en' ? 'text-amber-400' : 'text-zinc-500'}>EN</span>
      </button>
    </form>
  );
}
