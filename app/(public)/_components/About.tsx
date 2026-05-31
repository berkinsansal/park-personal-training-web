'use client';

import { useState } from 'react';
import type { Dict } from "@/lib/i18n";
import type { GalleryPhoto } from "@/lib/types";

type Props = {
  dict: Dict;
  happyCustomers: number;
  yearsExperience: number;
  teacherCount: number;
  serviceCount: number;
  gallery: GalleryPhoto[];
};

export default function About({ dict, happyCustomers, yearsExperience, teacherCount, serviceCount, gallery }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
      if (diffX > 0) nextSlide();
      else prevSlide();
    } else if (Math.abs(diffY) > 50) {
      if (diffY > 0) nextSlide();
      else prevSlide();
    }
  };
  const t = dict.about;
  const stats = [
    { value: `${happyCustomers}+`, label: t.statHappyCustomers },
    { value: `${yearsExperience}+`, label: t.statYearsExperience },
    { value: `${teacherCount}+`, label: t.statTeachers },
    { value: String(serviceCount), label: t.statServices },
  ];

  return (
    <section id="hakkimizda" className="py-24 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
              {t.label}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
              {t.heading1}<br />
              <span className="text-amber-400">{t.heading2}</span> {t.heading3}
            </h2>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              {t.p1}
            </p>
            <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
              {t.p2}
            </p>
            <a
              href="#iletisim"
              className="mt-8 inline-block px-6 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
            >
              {t.cta}
            </a>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-zinc-800 rounded-2xl p-8 text-center border border-zinc-700 hover:border-amber-400/50 transition-colors"
                >
                  <div className="text-4xl font-black text-amber-400">{s.value}</div>
                  <div className="mt-2 text-zinc-400 text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {gallery.length > 0 && (
              <div className="mt-16">
                <div className="overflow-hidden rounded-2xl bg-zinc-800 border border-zinc-700 aspect-video hover:border-amber-400/50 transition-all duration-300 touch-none" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
                  <img
                    src={gallery[currentSlide].image_url}
                    alt={gallery[currentSlide].alt_text}
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>

                {gallery.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={prevSlide}
                      className="px-3 py-2 text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
                    >
                      &lt;
                    </button>
                    <div className="flex justify-center gap-2">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentSlide ? 'bg-amber-400 w-6' : 'bg-zinc-600 hover:bg-zinc-500'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextSlide}
                      className="px-3 py-2 text-white bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors"
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
