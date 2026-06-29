'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Service } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';

export default function ServicesPreview({ services }: { services: Service[] }) {
  const locale = useLocale();
  const t = useTranslations('services');

  const isReversed = (index: number) => index % 2 === 1;

  return (
    <section className="py-16 bg-zinc-900">
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
        <div className="space-y-4 max-w-sm mx-auto">
          {services.map((s, i) => (
            <AnimateIn key={s.id} delay={i * 80}>
              <div
                className={`flex items-center gap-4 p-2 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-amber-400/40 hover:p-4 transition-all duration-300 group ${
                  isReversed(i) ? 'flex-row-reverse ml-12' : 'mr-12'
                }`}
              >
                <div className="flex-shrink-0 text-4xl group-hover:scale-120 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                  {locale === 'en' ? s.title_en || s.title : s.title}
                </h3>
              </div>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={`/${locale}/services`}
            className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            {t('details')}
          </a>
        </div>
      </div>
    </section>
  );
}
