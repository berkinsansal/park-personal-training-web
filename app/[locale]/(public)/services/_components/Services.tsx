'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { Service } from '@/lib/types';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';

export default function Services({ services }: { services: Service[] }) {
  const locale = useLocale();
  const t = useTranslations('services');
  return (
    <section id="services" className="py-16 bg-zinc-950">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <AnimateIn key={s.id} delay={i * 80}>
              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors">
                  {locale === 'en' ? s.title_en || s.title : s.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {locale === 'en'
                    ? s.description_en || s.description
                    : s.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
