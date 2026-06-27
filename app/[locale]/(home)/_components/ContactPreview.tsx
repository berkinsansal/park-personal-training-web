'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AnimateIn } from '../../../_components/AnimateIn';

export default function ContactPreview() {
  const locale = useLocale();
  const t = useTranslations('contactPreview');

  return (
    <section className="py-16 bg-zinc-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimateIn>
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            {t('label')}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-white mb-6">
            {t('heading')}
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            {t('cta')}
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
