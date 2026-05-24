"use client";
import { useState } from "react";
import Image from "next/image";

const links = [
  { href: "#hakkimizda", label: "Hakkimizda" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#egitmenler", label: "Egitmenler" },
  { href: "#iletisim", label: "Iletisim" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Park PT Logo" width={40} height={40} />
          <span className="hidden sm:inline text-amber-400 font-bold text-lg tracking-wide">PARK PT</span>
        </a>
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-zinc-300 hover:text-amber-400 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {l.label}
              </a>
            </li>
          ))}
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
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-zinc-300 hover:text-amber-400 text-sm font-medium uppercase tracking-wider"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
