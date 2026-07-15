'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { SectionShell } from '@/app/[locale]/_components/SectionShell';
import { Button } from '@/components/ui/button';

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
        <Button asChild overrideSize="cta">
          <Link href={`/${locale}/music`}>
            {t('listen')}
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
