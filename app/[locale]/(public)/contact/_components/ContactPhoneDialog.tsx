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
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpStagger1 {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUpStagger2 {
          0% {
            opacity: 0;
            transform: translateY(-12px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconRotate {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(180deg) scale(1);
          }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(251, 146, 60, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(251, 146, 60, 0);
          }
        }

        .phone-menu-open {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .phone-option-1 {
          animation: slideUpStagger1 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s forwards;
        }

        .phone-option-2 {
          animation: slideUpStagger2 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
        }

        .phone-icon {
          animation: iconRotate 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .phone-btn-hover:hover {
          animation: pulse-ring 1.5s ease-out;
        }

        .menu-item:hover .menu-arrow {
          animation: slideRight 0.3s ease-out forwards;
        }

        @keyframes slideRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(4px);
          }
        }
      `}</style>

      <button
        className={`flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group cursor-pointer w-full ${isOpen ? 'border-amber-400/50 -translate-y-0.5' : ''}`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-amber-500/20">
          <svg
            className="w-6 h-6 text-amber-400 transition-transform duration-300 group-hover:scale-110"
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
        <div className={`ml-auto transition-all duration-400 ${isOpen ? 'phone-icon' : ''}`}>
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
        <div className="absolute top-full left-0 right-0 mt-3 bg-zinc-900 border border-amber-400/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 z-40 phone-menu-open backdrop-blur-sm">
          <div className="flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-950 border-t border-amber-400/10">
            <button
              className="flex items-center gap-4 px-6 py-4 hover:bg-green-900/40 border-b border-zinc-800/50 transition-all group/btn relative overflow-hidden menu-item"
              type="button"
              onClick={handleWhatsApp}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-600/0 to-green-600/0 group-hover/btn:from-green-600/15 group-hover/btn:via-green-600/10 group-hover/btn:to-green-600/5 transition-all duration-300" />

              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-lg group-hover/btn:shadow-green-500/50 phone-option-1">
                <svg
                  className="w-5 h-5 text-white transition-transform duration-300"
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
                <div className="text-white font-bold text-sm group-hover/btn:text-green-300 transition-colors">
                  WhatsApp
                </div>
                <div className="text-zinc-400 text-xs group-hover/btn:text-zinc-300 transition-colors">
                  {t('phoneDialogWhatsApp')}
                </div>
              </div>

              <div className="relative text-amber-400/40 group-hover/btn:text-green-400 transition-all duration-300 menu-arrow">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-125"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            <button
              className="flex items-center gap-4 px-6 py-4 hover:bg-amber-900/40 transition-all group/btn relative overflow-hidden menu-item"
              type="button"
              onClick={handleCall}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/0 to-amber-600/0 group-hover/btn:from-amber-600/15 group-hover/btn:via-amber-600/10 group-hover/btn:to-amber-600/5 transition-all duration-300" />

              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-lg group-hover/btn:shadow-amber-500/50 phone-option-2">
                <svg
                  className="w-5 h-5 text-white transition-transform duration-300"
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
                <div className="text-white font-bold text-sm group-hover/btn:text-amber-300 transition-colors">
                  {t('phoneDialogCall')}
                </div>
                <div className="text-zinc-400 text-xs group-hover/btn:text-zinc-300 transition-colors">
                  {phone}
                </div>
              </div>

              <div className="relative text-amber-400/40 group-hover/btn:text-amber-300 transition-all duration-300 menu-arrow">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-125"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
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
