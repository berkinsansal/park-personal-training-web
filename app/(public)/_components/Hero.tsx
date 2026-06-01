'use client';

import { useEffect, useRef } from 'react';
import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { siteConfig } from "@/lib/site.config";

export default function Hero({ dict }: { dict: Dict }) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        const scale = 1 + progress * 0.55;
        if (logoRef.current) {
          logoRef.current.style.transform = `scale(${scale})`;
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
      {siteConfig.siteName.toUpperCase().split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={index % 2 === 0 ? "text-white" : "text-amber-400"}
          style={{
            display: 'inline-block',
            animation: 'word-reveal 0.6s ease forwards',
            animationDelay: `${0.3 + index * 0.12}s`,
            animationFillMode: 'backwards',
          }}
        >
          {index > 0 && " "}
          {word}
        </span>
      ))}
    </>
  );
  };
  const t = dict.hero;
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-16 sm:pb-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 75% 50%, #d97706 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8" ref={logoRef} style={{ willChange: 'transform' }}>
          <Image src="/logo.png" alt={`${siteConfig.siteName} Logo`} width={180} height={180} priority />
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
          {t.subtitle}
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            animation: 'word-reveal 0.6s ease forwards',
            animationDelay: '1.2s',
            animationFillMode: 'backwards',
          }}
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            {t.cta}
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-zinc-600 text-white font-medium rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors text-sm uppercase tracking-wider"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
      <a
        href="#about"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
