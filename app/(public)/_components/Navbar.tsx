"use client";
import { useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dict, Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site.config";

const navIcons = {
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
      <path d="m3.92443 18.6073 1.46828 1.4683c0.69216 0.6921 1.03824 1.0382 1.46829 1.0382 0.43005 0 0.77613 -0.3461 1.46828 -1.0382l0.36708 -0.3671 0.36707 0.3671 0.73414 0.7341c0.68613 0.6862 1.02923 1.0292 1.43233 1.1372 0.264 0.0708 0.542 0.0708 0.8061 0 0.4031 -0.108 0.7461 -0.451 1.4323 -1.1372 0.6861 -0.6861 1.0292 -1.0292 1.1372 -1.4323 0.0708 -0.264 0.0708 -0.5421 0 -0.8061 -0.108 -0.4031 -0.4511 -0.7462 -1.1372 -1.4323l-1.1012 -1.1012 3.6707 -3.6707 1.1012 1.1012c0.6861 0.6861 1.0292 1.0292 1.4323 1.1372 0.264 0.0708 0.5421 0.0708 0.8061 0 0.4031 -0.108 0.7462 -0.4511 1.4323 -1.1372 0.6862 -0.6862 1.0292 -1.0292 1.1372 -1.4323 0.0708 -0.2641 0.0708 -0.5421 0 -0.8061 -0.108 -0.4031 -0.451 -0.7462 -1.1372 -1.43233l-0.7341 -0.73414 -0.371 -0.36316 0.371 -0.37099c0.6921 -0.69215 1.0382 -1.03823 1.0382 -1.46828 0 -0.43005 -0.3461 -0.77613 -1.0382 -1.46829l-1.4683 -1.46829c-0.6922 -0.69215 -1.0382 -1.03823 -1.4683 -1.03823 -0.43 0 -0.7761 0.34608 -1.4683 1.03823l-0.3671 0.36708 -1.1012 -1.10122c-0.6861 -0.68614 -1.0292 -1.02921 -1.4323 -1.13721 -0.264 -0.07076 -0.542 -0.07076 -0.8061 0 -0.4031 0.108 -0.7461 0.45107 -1.4323 1.13721 -0.68613 0.68614 -1.0292 1.02921 -1.1372 1.43229 -0.07076 0.26405 -0.07076 0.54208 0 0.80614 0.108 0.40307 0.45107 0.74615 1.1372 1.43229l1.1012 1.10121 -3.67069 3.67069L6.861 10.5317c-0.68614 -0.68613 -1.02921 -1.0292 -1.43229 -1.1372 -0.26406 -0.07076 -0.54209 -0.07076 -0.80614 0 -0.40308 0.108 -0.74615 0.45107 -1.43229 1.1372 -0.68614 0.6862 -1.02921 1.0292 -1.13722 1.4323 -0.07075 0.2641 -0.07075 0.5421 0 0.8061 0.10801 0.4031 0.45108 0.7462 1.13722 1.4323l1.10122 1.1012 -0.36707 0.3671c-0.69216 0.6922 -1.03824 1.0383 -1.03824 1.4683 0 0.4301 0.34608 0.7761 1.03824 1.4683Z" strokeWidth="1"></path>
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

export default function Navbar({ dict, locale }: { dict: Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: dict.nav.about, key: "about" },
    { href: "#services", label: dict.nav.services, key: "services" },
    { href: "#trainers", label: dict.nav.trainers, key: "trainers" },
    { href: "#music", label: dict.playlists.label, key: "playlists" },
    { href: "#contact", label: dict.nav.contact, key: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <Image src="/logo.png" alt={`${siteConfig.siteName} Logo`} width={40} height={40} className="rounded-full bg-amber-400/10 border border-amber-400/30" />
          <span className="hidden lg:inline text-amber-400 font-bold text-lg tracking-wide">{siteConfig.siteName}</span>
        </a>
        <ul className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                <span className="hidden xl:inline text-base">{navIcons[l.key as keyof typeof navIcons]}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitcher locale={locale} />
          </li>
        </ul>
        <button
          className="md:hidden text-zinc-300"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-zinc-300 hover:text-amber-400 text-sm font-medium uppercase tracking-wider"
            >
              <span className="text-base">{navIcons[l.key as keyof typeof navIcons]}</span>
              {l.label}
            </a>
          ))}
          <LanguageSwitcher locale={locale} />
        </div>
      )}
    </nav>
  );
}
