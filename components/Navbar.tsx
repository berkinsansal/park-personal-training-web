"use client";
import { useState } from "react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dict, Locale } from "@/lib/i18n";

const navIcons = {
  about: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
  services: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1h-5c-1.1 0-2 .9-2 2 0 .35.07.69.18 1H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-5c-.83 0-1.5.67-1.5 1.5S8.17 16 9 16s1.5-.67 1.5-1.5S9.83 13 9 13zm8 5c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
    </svg>
  ),
  teachers: (
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
    { href: "#hakkimizda", label: dict.nav.about, key: "about" },
    { href: "#hizmetler", label: dict.nav.services, key: "services" },
    { href: "#egitmenler", label: dict.nav.teachers, key: "teachers" },
    { href: "#muzik", label: dict.playlists.label, key: "playlists" },
    { href: "#iletisim", label: dict.nav.contact, key: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Park Personal Training Logo" width={40} height={40} className="rounded-full bg-amber-400/10 border border-amber-400/30" />
          <span className="hidden lg:inline text-amber-400 font-bold text-lg tracking-wide">Park Personal Training</span>
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
          aria-label="Menu"
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
