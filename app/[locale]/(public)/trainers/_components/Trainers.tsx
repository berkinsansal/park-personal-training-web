'use client';

import { useTranslations } from 'next-intl';
import type { Trainer } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';
import { SectionShell } from '@/app/[locale]/_components/SectionShell';
import { TrainerCard } from '@/app/[locale]/_components/trainers/trainer-card';

export default function Trainers({ trainers }: { trainers: Trainer[] }) {
  const t = useTranslations('trainers');
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
    </SectionShell>
  );
}
