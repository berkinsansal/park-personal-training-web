'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { StatCounter } from '@/components/ui/stat-counter';
import { Button, buttonVariants } from '@/components/ui/button';

interface Props {
  happyCustomers: number;
  yearsExperience: number;
  trainerCount: number;
  serviceCount: number;
}

export default function AboutPreview({
  happyCustomers,
  yearsExperience,
  trainerCount,
  serviceCount,
}: Props) {
  const t = useTranslations('about');
  const locale = useLocale();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) {
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const stats = [
    { value: `${happyCustomers}+`, label: t('statHappyCustomers') },
    { value: `${yearsExperience}+`, label: t('statYearsExperience') },
    { value: `${trainerCount}+`, label: t('statTrainers') },
    { value: String(serviceCount), label: t('statServices') },
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {t('label')}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
              {t('heading1')}
              <br />
              <span className="text-amber-400">{t('heading2')}</span>{' '}
              {t('heading3')}
            </h2>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              {t('p1')}
            </p>
            <Button asChild overrideSize="cta" className="mt-8">
              <Link href={`/${locale}/about`}>{t('learnMore')}</Link>
            </Button>
          </div>
          <div>
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((s) => {
                const numMatch = s.value.match(/\d+/);
                const num = numMatch ? parseInt(numMatch[0]) : 0;
                const suffix = s.value.replace(/\d+/g, '');
                return (
                  <StatCounter
                    key={s.label}
                    target={num}
                    suffix={suffix}
                    label={s.label}
                    active={statsVisible}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
