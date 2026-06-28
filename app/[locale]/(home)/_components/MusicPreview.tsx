'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Playlist } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';

export default function MusicPreview({ playlists }: { playlists: Playlist[] }) {
  const locale = useLocale();
  const t = useTranslations('playlists');

  return (
    <section className="py-16 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimateIn>
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            {t('label')}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-white mb-6">
            {t('heading')}
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            {t('p1')}
          </p>
          <a
            href={`/${locale}/music`}
            className="inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-sm uppercase tracking-wider"
          >
            {t('explore')}
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
