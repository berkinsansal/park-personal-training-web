import Image from "next/image";
import type { Dict } from "@/lib/i18n";

export default function Hero({ dict }: { dict: Dict }) {
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
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Park Personal Training" width={180} height={180} priority />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
          <span className="text-white">PARK</span>{" "}
          <span className="text-amber-400">PERSONAL</span>
          <br />
          <span className="text-white">TRAINING</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#iletisim"
            className="px-8 py-4 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            {t.cta}
          </a>
          <a
            href="#hizmetler"
            className="px-8 py-4 border border-zinc-600 text-white font-medium rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors text-sm uppercase tracking-wider"
          >
            {t.ctaSecondary}
          </a>
        </div>
      </div>
      <a
        href="#hakkimizda"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
