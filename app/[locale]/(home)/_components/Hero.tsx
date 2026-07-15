'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/site.config';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        const scale = 1 + progress * 0.7;
        if (logoRef.current) {
          logoRef.current.style.transform = `scale(${scale})`;
        }
        if (glowRef.current) {
          glowRef.current.style.opacity = String(0.1 * (1 - progress));
        }
        if (blobsRef.current) {
          blobsRef.current.style.transform = `translateY(${-progress * 40}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const alternatingText = () => {
    return (
      <>
        {siteConfig.siteName
          .toUpperCase()
          .split(' ')
          .map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={index % 2 === 0 ? 'text-white' : 'text-amber-400'}
              style={{
                animation: 'word-reveal 0.6s ease forwards',
                animationDelay: `${0.3 + index * 0.12}s`,
                animationFillMode: 'backwards',
              }}
            >
              {word}
            </div>
          ))}
      </>
    );
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Base dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* Animated blobs layer */}
      <div
        ref={blobsRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute w-96 h-96 sm:w-[600px] sm:h-[600px] bg-amber-400 rounded-full blur-3xl opacity-12 top-0 -left-20 sm:-left-32"
          style={{
            animation: 'blob-drift-a 12s ease-in-out infinite',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-80 h-80 sm:w-[500px] sm:h-[500px] bg-orange-500 rounded-full blur-3xl opacity-12 bottom-0 -right-20 sm:-right-32"
          style={{
            animation: 'blob-drift-b 16s ease-in-out infinite',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Animated glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 75% 50%, #d97706 0%, transparent 50%)',
          opacity: 0.1,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-amber-400 rounded-full opacity-40 top-1/4 left-1/4"
          style={{
            animation: 'float-up 8s ease-in infinite',
            animationDelay: '0s',
          }}
        />
        <span
          className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full opacity-30 top-1/3 left-3/4"
          style={{
            animation: 'float-up 10s ease-in infinite',
            animationDelay: '1s',
          }}
        />
        <span
          className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full opacity-35 top-2/3 left-1/3"
          style={{
            animation: 'float-up 12s ease-in infinite',
            animationDelay: '2s',
          }}
        />
        <span
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-amber-400 rounded-full opacity-25 top-1/2 right-1/4"
          style={{
            animation: 'float-up 11s ease-in infinite',
            animationDelay: '0.5s',
          }}
        />
        <span
          className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-40 bottom-1/3 left-1/2"
          style={{
            animation: 'float-up 9s ease-in infinite',
            animationDelay: '1.5s',
          }}
        />
        <span
          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full opacity-30 top-1/4 right-1/3"
          style={{
            animation: 'float-up 13s ease-in infinite',
            animationDelay: '2.5s',
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          ref={logoRef}
          className="flex justify-center mb-8"
          style={{ willChange: 'transform' }}
        >
          <Image
            priority
            src="/logo.png"
            alt={`${siteConfig.siteName} Logo`}
            width={200}
            height={200}
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight text-amber-400">
          {alternatingText()}
        </h1>
        <p
          className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            animation: 'word-reveal 0.6s ease forwards',
            animationDelay: '0.9s',
            animationFillMode: 'backwards',
          }}
        >
          {t('hero.subtitle')}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            animation: 'word-reveal 0.6s ease forwards',
            animationDelay: '1.2s',
            animationFillMode: 'backwards',
          }}
        >
          <Button asChild overrideSize="cta">
            <Link href={`/${locale}/contact`}>
              {t('cta.startNow')}
            </Link>
          </Button>
          <Button asChild variant="outline" overrideSize="cta">
            <Link href={`/${locale}/services`}>
              {t('cta.viewServices')}
            </Link>
          </Button>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <svg
          className="w-6 h-6 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </section>
  );
}
