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
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group cursor-pointer w-full"
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
        <div>
          <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
            {t('phone')}
          </div>
          <div className="text-zinc-400 text-sm">{phone}</div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 max-w-sm w-full p-8 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-2">
              {t('phoneDialogTitle')}
            </h3>
            <p className="text-zinc-400 mb-6">
              {t('phoneDialogSubtitle')}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.558.685 5.045 1.986 7.231L.957 23.08l7.52-2.475a9.874 9.874 0 004.768 1.226h.005c5.436 0 9.87-4.434 9.87-9.87 0-2.633-.997-5.111-2.813-6.984a9.858 9.858 0 00-7.038-2.908zM12.14 0C5.581 0 .294 5.287.294 11.85c0 2.096.547 4.142 1.588 5.945L0 24l6.305-2.08c1.856 1.113 4.01 1.7 6.216 1.7 6.56 0 11.897-5.287 11.897-11.85 0-3.172-1.264-6.165-3.56-8.44C18.275 1.266 15.374 0 12.14 0z" />
                </svg>
                {t('phoneDialogWhatsApp')}
              </button>

              <button
                onClick={handleCall}
                className="w-full flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
                {t('phoneDialogCall')}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-3 text-zinc-400 hover:text-white transition-colors py-2"
            >
              {t('phoneDialogCancel')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
