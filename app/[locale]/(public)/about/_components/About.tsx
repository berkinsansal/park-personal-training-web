'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { GalleryPhoto } from '@/lib/types';
import { StatCounter } from '@/components/ui/stat-counter';
import { Button } from '@/components/ui/button';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dragEnd = { x: e.clientX, y: e.clientY };
    const diffX = dragStart.x - dragEnd.x;
    const diffY = dragStart.y - dragEnd.y;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

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
            <Button asChild variant="primary" className="mt-8">
              <Link href={`/${locale}/contact`}>
                {tCta('startNow')}
              </Link>
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

            {gallery.length > 0 && (
              <div className="mt-16">
                <div
                  className="overflow-hidden rounded-2xl bg-zinc-800 border border-zinc-700 aspect-video hover:border-amber-400/50 transition-all duration-300 touch-none relative"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                >
                  <Image
                    fill
                    sizes="100vw"
                    src={gallery[currentSlide].image_url}
                    alt={gallery[currentSlide].alt_text}
                    className="object-cover select-none"
                    draggable={false}
                  />
                </div>

                {gallery.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      className="px-3 py-2 text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                      type="button"
                      onClick={prevSlide}
                    >
                      &lt;
                    </button>
                    <div className="flex justify-center gap-2">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentSlide
                              ? 'bg-amber-400 w-6'
                              : 'bg-zinc-600 hover:bg-zinc-500'
                          }`}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                        />
                      ))}
                    </div>
                    <button
                      className="px-3 py-2 text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                      type="button"
                      onClick={nextSlide}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
