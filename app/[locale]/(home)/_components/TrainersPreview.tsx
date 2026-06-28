'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { Trainer } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TrainersPreview({ trainers }: { trainers: Trainer[] }) {
  const t = useTranslations('trainers');
  const locale = useLocale();
  const previewTrainers = trainers.slice(0, 3);

  return (
    <section className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {t('label')}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white">
              {t('heading')}
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
        </AnimateIn>
        <div className="flex flex-wrap justify-center gap-6">
          {previewTrainers.map((trainer, i) => (
            <AnimateIn key={trainer.id} delay={i * 100}>
              <div className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 hover:border-amber-400/40 transition-all duration-300 text-center group w-72">
                {trainer.photo_url ? (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 group-hover:scale-105 transition-transform bg-amber-400/10 border border-amber-400/30">
                    <Image
                      fill
                      sizes="100vw"
                      src={trainer.photo_url}
                      alt={trainer.name}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-5 text-3xl font-black text-zinc-950 group-hover:scale-105 transition-transform">
                    {getInitials(trainer.name)}
                  </div>
                )}
                <h3 className="text-white font-bold text-xl">{trainer.name}</h3>
                <a
                  href={`https://instagram.com/${trainer.ig_handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-zinc-400 hover:text-amber-400 transition-colors text-sm"
                >
                  @{trainer.ig_handle}
                </a>
              </div>
            </AnimateIn>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={`/${locale}/trainers`}
            className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            {t('viewAll')}
          </a>
        </div>
      </div>
    </section>
  );
}
