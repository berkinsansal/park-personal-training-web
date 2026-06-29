'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcher from '@/app/_components/LocaleSwitcher';
import { siteConfig } from '@/lib/site.config';
import type { SiteInfo } from '@/lib/types';

const navIcons = {
  home: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  about: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 8.25a1 1 0 0 1 1 1V17a1 1 0 1 1-2 0v-5.75a1 1 0 0 1 1-1Zm0-3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
      />
    </svg>
  ),
  services: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        d="m3.92443 18.6073 1.46828 1.4683c0.69216 0.6921 1.03824 1.0382 1.46829 1.0382 0.43005 0 0.77613 -0.3461 1.46828 -1.0382l0.36708 -0.3671 0.36707 0.3671 0.73414 0.7341c0.68613 0.6862 1.02923 1.0292 1.43233 1.1372 0.264 0.0708 0.542 0.0708 0.8061 0 0.4031 -0.108 0.7461 -0.451 1.4323 -1.1372 0.6861 -0.6861 1.0292 -1.0292 1.1372 -1.4323 0.0708 -0.264 0.0708 -0.5421 0 -0.8061 -0.108 -0.4031 -0.4511 -0.7462 -1.1372 -1.4323l-1.1012 -1.1012 3.6707 -3.6707 1.1012 1.1012c0.6861 0.6861 1.0292 1.0292 1.4323 1.1372 0.264 0.0708 0.5421 0.0708 0.8061 0 0.4031 -0.108 0.7462 -0.4511 1.4323 -1.1372 0.6862 -0.6862 1.0292 -1.0292 1.1372 -1.4323 0.0708 -0.2641 0.0708 -0.5421 0 -0.8061 -0.108 -0.4031 -0.451 -0.7462 -1.1372 -1.43233l-0.7341 -0.73414 -0.371 -0.36316 0.371 -0.37099c0.6921 -0.69215 1.0382 -1.03823 1.0382 -1.46828 0 -0.43005 -0.3461 -0.77613 -1.0382 -1.46829l-1.4683 -1.46829c-0.6922 -0.69215 -1.0382 -1.03823 -1.4683 -1.03823 -0.43 0 -0.7761 0.34608 -1.4683 1.03823l-0.3671 0.36708 -1.1012 -1.10122c-0.6861 -0.68614 -1.0292 -1.02921 -1.4323 -1.13721 -0.264 -0.07076 -0.542 -0.07076 -0.8061 0 -0.4031 0.108 -0.7461 0.45107 -1.4323 1.13721 -0.68613 0.68614 -1.0292 1.02921 -1.1372 1.43229 -0.07076 0.26405 -0.07076 0.54208 0 0.80614 0.108 0.40307 0.45107 0.74615 1.1372 1.43229l1.1012 1.10121 -3.67069 3.67069L6.861 10.5317c-0.68614 -0.68613 -1.02921 -1.0292 -1.43229 -1.1372 -0.26406 -0.07076 -0.54209 -0.07076 -0.80614 0 -0.40308 0.108 -0.74615 0.45107 -1.43229 1.1372 -0.68614 0.6862 -1.02921 1.0292 -1.13722 1.4323 -0.07075 0.2641 -0.07075 0.5421 0 0.8061 0.10801 0.4031 0.45108 0.7462 1.13722 1.4323l1.10122 1.1012 -0.36707 0.3671c-0.69216 0.6922 -1.03824 1.0383 -1.03824 1.4683 0 0.4301 0.34608 0.7761 1.03824 1.4683Z"
        strokeWidth="1"
      />
    </svg>
  ),
  trainers: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  playlists: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
    </svg>
  ),
};

export default function Navbar({ siteInfo }: { siteInfo: SiteInfo | null }) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const phone = siteInfo?.phone ?? '';

  const links = [
    { href: `/${locale}`, label: t('nav.home'), key: 'home' },
    { href: `/${locale}/about`, label: t('nav.about'), key: 'about' },
    { href: `/${locale}/services`, label: t('nav.services'), key: 'services' },
    { href: `/${locale}/trainers`, label: t('nav.trainers'), key: 'trainers' },
    { href: `/${locale}/music`, label: t('playlists.label'), key: 'playlists' },
    { href: `/${locale}/contact`, label: t('nav.contact'), key: 'contact' },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur bg-zinc-950 border-b border-amber-400/20 shadow-lg shadow-amber-400/5">
      <div className="mx-auto px-6 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={`${siteConfig.siteName} Logo`}
            width={40}
            height={40}
            className="rounded-full bg-amber-400/10 border border-amber-400/30"
          />
          <span className="hidden lg:inline text-amber-400 font-bold text-lg tracking-wide">
            {siteConfig.siteName}
          </span>
        </Link>
        <ul className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <li key={l.key}>
              <Link
                href={l.href}
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                <span className="hidden xl:inline text-base">
                  {navIcons[l.key as keyof typeof navIcons]}
                </span>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <LocaleSwitcher />
          </li>
          {phone && (
            <li>
              <a
                href={`https://wa.me/${phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                title="WhatsApp"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.558.685 5.045 1.986 7.231L.957 23.08l7.52-2.475a9.874 9.874 0 004.768 1.226h.005c5.436 0 9.87-4.434 9.87-9.87 0-2.633-.997-5.111-2.813-6.984a9.858 9.858 0 00-7.038-2.908zM12.14 0C5.581 0 .294 5.287.294 11.85c0 2.096.547 4.142 1.588 5.945L0 24l6.305-2.08c1.856 1.113 4.01 1.7 6.216 1.7 6.56 0 11.897-5.287 11.897-11.85 0-3.172-1.264-6.165-3.56-8.44C18.275 1.266 15.374 0 12.14 0z" />
                </svg>
              </a>
            </li>
          )}
        </ul>
        <div className="flex items-center gap-4">
          {phone && (
            <a
              href={`https://wa.me/${phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
              title="WhatsApp"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.558.685 5.045 1.986 7.231L.957 23.08l7.52-2.475a9.874 9.874 0 004.768 1.226h.005c5.436 0 9.87-4.434 9.87-9.87 0-2.633-.997-5.111-2.813-6.984a9.858 9.858 0 00-7.038-2.908zM12.14 0C5.581 0 .294 5.287.294 11.85c0 2.096.547 4.142 1.588 5.945L0 24l6.305-2.08c1.856 1.113 4.01 1.7 6.216 1.7 6.56 0 11.897-5.287 11.897-11.85 0-3.172-1.264-6.165-3.56-8.44C18.275 1.266 15.374 0 12.14 0z" />
              </svg>
            </a>
          )}
          <button
            className="md:hidden text-zinc-300"
            type="button"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 text-sm font-medium uppercase tracking-wider"
              onClick={() => setOpen(false)}
            >
              <span className="text-base">
                {navIcons[l.key as keyof typeof navIcons]}
              </span>
              {l.label}
            </Link>
          ))}
          <div className="flex justify-start">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
