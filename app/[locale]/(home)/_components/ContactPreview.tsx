'use client';

import { SectionShell } from '@/app/[locale]/_components/SectionShell';
import { useLocale, useTranslations } from 'next-intl';

export default function ContactPreview() {
  const locale = useLocale();
  const t = useTranslations('contact');

  return (
    <SectionShell
      label={t('label')}
      heading={t('previewHeading')}
      description={t('previewDescription')}
      sectionClassName="bg-zinc-900"
    >
      <div className="text-center">
        <a
          href={`/${locale}/contact`}
          className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
        >
          {t('contactUs')}
        </a>
      </div>
    </SectionShell>
  );
}
