'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Trainer } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';
import { SectionShell } from '@/app/[locale]/_components/SectionShell';
import { Button } from '@/components/ui/button';
import { TrainerCard } from '@/app/[locale]/_components/trainers/trainer-card';

export default function TrainersPreview({ trainers }: { trainers: Trainer[] }) {
  const t = useTranslations('trainers');
  const locale = useLocale();

  return (
    <SectionShell
      label={t('label')}
      heading={t('heading')}
      description={t('description')}
    >
      <div className="flex flex-wrap justify-center gap-6">
        {trainers.map((trainer, i) => (
          <AnimateIn key={trainer.id} delay={i * 100}>
            <TrainerCard trainer={trainer} />
          </AnimateIn>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild overrideSize="cta">
          <Link href={`/${locale}/trainers`}>
            {t('details')}
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}
