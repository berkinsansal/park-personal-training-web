'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPhoneDialog({ phone }: { phone: string }) {
  const t = useTranslations('contact');
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <style>{`
        @keyframes flipIn {
          0% {
            transform: perspective(1200px) rotateY(-90deg);
            opacity: 0;
          }
          100% {
            transform: perspective(1200px) rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes flipOut {
          0% {
            transform: perspective(1200px) rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: perspective(1200px) rotateY(90deg);
            opacity: 0;
          }
        }

        @keyframes buttonScaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .flip-card-front {
          animation: flipIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .flip-card-back {
          animation: flipOut 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) reverse forwards;
        }

        .action-btn {
          animation: buttonScaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .action-btn:nth-child(1) {
          animation-delay: 0.1s;
        }

        .action-btn:nth-child(2) {
          animation-delay: 0.15s;
        }

        .action-btn:nth-child(3) {
          animation-delay: 0.2s;
        }
      `}</style>

      {/* Front Side */}
      {!isFlipped && (
        <button
          className="flip-card-front flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group cursor-pointer w-full"
          type="button"
          onClick={() => setIsFlipped(true)}
        >
          <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-amber-400 transition-transform duration-300"
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
          <div className="text-left">
            <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
              {t('phone')}
            </div>
            <div className="text-zinc-400 text-sm">{phone}</div>
          </div>
        </button>
      )}

      {/* Back Side */}
      {isFlipped && (
        <div className="flip-card-back flex items-center gap-4 bg-zinc-900 border border-amber-400/50 rounded-2xl p-6 w-full">
          <a
            href={`tel:${phone}`}
            className="action-btn flex flex-col items-center justify-center gap-2 flex-1 h-12 px-3 rounded-lg font-semibold text-white transition-all duration-300 bg-amber-900 hover:bg-amber-800 hover:scale-110"
            onClick={() => {
              setIsFlipped(false);
            }}
          >
            <svg
              className="w-6 h-6"
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
          </a>

          <a
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn flex flex-col items-center justify-center gap-2 flex-1 h-12 px-3 rounded-lg font-semibold text-white transition-all duration-300 bg-green-900 hover:bg-green-800 hover:scale-110"
            onClick={() => {
              setIsFlipped(false);
            }}
          >
            <svg
              className="w-6 h-6"
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
          </a>

          <button
            className="action-btn flex flex-col items-center justify-center gap-2 flex-1 h-12 px-3 rounded-lg font-semibold text-white transition-all duration-300 bg-slate-600 hover:bg-slate-500 hover:scale-110 cursor-pointer"
            type="button"
            onClick={() => setIsFlipped(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
