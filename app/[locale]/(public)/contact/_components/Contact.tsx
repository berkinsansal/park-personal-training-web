'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { SiteInfo } from '@/lib/types';
import ContactForm from './ContactForm';
import { AnimateIn } from '@/app/[locale]/_components/AnimateIn';
import { SectionShell } from '@/app/[locale]/_components/SectionShell';

export default function Contact({ siteInfo }: { siteInfo: SiteInfo | null }) {
  const locale = useLocale();
  const t = useTranslations('contact');
  const ig = siteInfo?.ig_handle ?? '';
  const phone = siteInfo?.phone ?? '';
  const email = siteInfo?.email ?? '';
  const address1 =
    locale === 'en'
      ? ((siteInfo?.address_line1_en || siteInfo?.address_line1) ?? '')
      : (siteInfo?.address_line1 ?? '');
  const address2 =
    locale === 'en'
      ? ((siteInfo?.address_line2_en || siteInfo?.address_line2) ?? '')
      : (siteInfo?.address_line2 ?? '');
  const weekday =
    locale === 'en'
      ? ((siteInfo?.weekday_hours_en || siteInfo?.weekday_hours) ?? '')
      : (siteInfo?.weekday_hours ?? '');
  const weekend =
    locale === 'en'
      ? ((siteInfo?.weekend_hours_en || siteInfo?.weekend_hours) ?? '')
      : (siteInfo?.weekend_hours ?? '');

  const mapsUrl = siteInfo
    ? `https://www.google.com/maps/search/?api=1&query=${siteInfo.latitude},${siteInfo.longitude}`
    : '';
  const embedUrl = siteInfo
    ? `https://maps.google.com/maps?q=${siteInfo.latitude},${siteInfo.longitude}&hl=${locale}&z=18&output=embed`
    : '';

  return (
    <SectionShell
      label={t('label')}
      heading={t('heading')}
      description={t('description')}
      containerClassName="max-w-4xl"
    >
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <AnimateIn delay={0}>
          <div className="flex flex-col gap-6">
            <a
              href={`https://instagram.com/${ig}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                  Instagram
                </div>
                <div className="text-zinc-400 text-sm">@{ig}</div>
              </div>
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
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
            </a>

            <a
              href={`https://wa.me/${phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.558.685 5.045 1.986 7.231L.957 23.08l7.52-2.475a9.874 9.874 0 004.768 1.226h.005c5.436 0 9.87-4.434 9.87-9.87 0-2.633-.997-5.111-2.813-6.984a9.858 9.858 0 00-7.038-2.908zM12.14 0C5.581 0 .294 5.287.294 11.85c0 2.096.547 4.142 1.588 5.945L0 24l6.305-2.08c1.856 1.113 4.01 1.7 6.216 1.7 6.56 0 11.897-5.287 11.897-11.85 0-3.172-1.264-6.165-3.56-8.44C18.275 1.266 15.374 0 12.14 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                  WhatsApp
                </div>
                <div className="text-zinc-400 text-sm">{phone}</div>
              </div>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                  {t('email')}
                </div>
                <div className="text-zinc-400 text-sm">{email}</div>
              </div>
            </a>

            <a
              href={mapsUrl}
              className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all group"
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold">{t('address')}</div>
                <div className="text-zinc-400 text-sm">{address1}</div>
                <div className="text-zinc-400 text-sm">{address2}</div>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold">{t('hours')}</div>
                <div className="text-zinc-400 text-sm">{weekday}</div>
                <div className="text-zinc-400 text-sm">{weekend}</div>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <ContactForm />
        </AnimateIn>
      </div>

      {embedUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group rounded-2xl overflow-hidden border border-zinc-700 hover:border-amber-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-amber-400/10"
        >
          <div
            style={{
              filter: 'invert(0.93) hue-rotate(180deg)',
              position: 'relative',
            }}
          >
            <iframe
              allowFullScreen
              width="100%"
              height="450"
              style={{ border: 0, pointerEvents: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={embedUrl}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </a>
      )}
    </SectionShell>
  );
}
