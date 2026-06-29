'use client';

import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/app/[locale]/_components/SectionShell';

export default function MusicPreview() {
  const locale = useLocale();
  const t = useTranslations('playlists');

  return (
    <SectionShell
      label={t('label')}
      heading={t('heading')}
      description={t('p1')}
      sectionClassName="bg-green-950"
    >
      <div className="text-center">
        <a
          href={`/${locale}/music`}
          className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
        >
          {t('listen')}
        </a>
      </div>
    </SectionShell>
  );
}
