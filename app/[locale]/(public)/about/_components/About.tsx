'use client';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { StatCounter } from '@/components/ui/stat-counter';
import type { GalleryPhoto } from '@/lib/types';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Props {
  happyCustomers: number;
  yearsExperience: number;
  trainerCount: number;
  serviceCount: number;
  gallery: GalleryPhoto[];
}

export default function About({
  happyCustomers,
  yearsExperience,
  trainerCount,
  serviceCount,
  gallery,
}: Props) {
  const t = useTranslations('about');
  const tCta = useTranslations('cta');
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
    <section className="py-16 bg-zinc-950">
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
            <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
              {t('p2')}
            </p>
            <Button asChild overrideSize="cta" className="mt-8">
              <Link href={`/${locale}/contact`}>{tCta('startNow')}</Link>
            </Button>
          </div>
          <div>
            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((s) => {
                const numMatch = s.value.match(/\d+/);
                const num = numMatch ? parseInt(numMatch[0], 10) : 0;
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

        {gallery.length > 0 && (
          <div className="mt-12 px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {gallery.map((photo) => (
                  <CarouselItem key={photo.id}>
                    <div className="overflow-hidden rounded-2xl bg-zinc-800 border border-zinc-700 aspect-video hover:border-amber-400/50 transition-all duration-300 relative">
                      <Image
                        fill
                        sizes="100vw"
                        src={photo.image_url}
                        alt={photo.alt_text}
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {gallery.length > 1 && (
                <>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </>
              )}
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
