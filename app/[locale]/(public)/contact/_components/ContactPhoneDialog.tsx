'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPhoneDialog({
  phone,
}: {
  phone: string;
}) {
  const t = useTranslations('contact');
  const [isOpen, setIsOpen] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <div className="group relative w-full">
      <button
        className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group cursor-pointer w-full"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-6 h-6 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <div className="text-left flex-1">
          <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
            {t('phone')}
          </div>
          <div className="text-zinc-400 text-sm">{phone}</div>
        </div>
        <div className={`ml-auto transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            className="w-5 h-5 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col">
            <button
              className="flex items-center gap-4 px-6 py-4 hover:bg-green-900/30 border-b border-zinc-800 transition-all group/btn relative overflow-hidden"
              type="button"
              onClick={handleWhatsApp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 to-green-600/0 group-hover/btn:from-green-600/10 group-hover/btn:to-green-600/20 transition-all duration-300" />

              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 62.541 62.51"
                >
                  <path
                    data-name="layer1"
                    d="M30.19.031a31.753 31.753 0 0 0-26.735 46.12L.085 62.509A1.235 1.235 0 0 0 1.58 63.96l16.029-3.8A31.744 31.744 0 1 0 30.19.031zM49.316 49.31A24.871 24.871 0 0 1 20.68 54l-2.232-1.112-9.828 2.326 2.069-10.042-1.1-2.154a24.874 24.874 0 0 1 4.578-28.857A24.854 24.854 0 0 1 49.316 49.31zm0 0"
                    fill="currentColor"
                  />
                  <path
                    data-name="layer1"
                    d="M47.147 38.619L41 36.854a2.292 2.292 0 0 0-2.267.6l-1.5 1.531a2.239 2.239 0 0 1-2.435.514C31.883 38.32 25.765 32.88 24.2 30.16a2.239 2.239 0 0 1 .177-2.483l1.312-1.7a2.292 2.292 0 0 0 .283-2.328L23.388 17.8a2.293 2.293 0 0 0-3.58-.82c-1.716 1.451-3.752 3.657-4 6.1-.436 4.308 1.411 9.738 8.4 16.258 8.071 7.534 14.534 8.528 18.743 7.509 2.387-.578 4.294-2.9 5.5-4.793a2.293 2.293 0 0 0-1.3-3.436z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="relative text-left flex-1">
                <div className="text-white font-bold text-sm group-hover/btn:text-green-400 transition-colors">
                  WhatsApp
                </div>
                <div className="text-zinc-400 text-xs">
                  {t('phoneDialogWhatsApp')}
                </div>
              </div>

              <div className="relative text-amber-400/60 group-hover/btn:text-green-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button
              className="flex items-center gap-4 px-6 py-4 hover:bg-amber-900/30 transition-all group/btn relative overflow-hidden"
              type="button"
              onClick={handleCall}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 to-amber-600/0 group-hover/btn:from-amber-600/10 group-hover/btn:to-amber-600/20 transition-all duration-300" />

              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>

              <div className="relative text-left flex-1">
                <div className="text-white font-bold text-sm group-hover/btn:text-amber-400 transition-colors">
                  {t('phoneDialogCall')}
                </div>
                <div className="text-zinc-400 text-xs">
                  {phone}
                </div>
              </div>

              <div className="relative text-amber-400/60 group-hover/btn:text-amber-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
