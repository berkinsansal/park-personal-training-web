import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Park Personal Training | Profesyonel Fitness Studyosu",
  description: "Park Personal Training studyosunda uzman egitmenlerimizle hedeflerinize ulasin.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${geist.variable} scroll-smooth`}>
      <head>
        {/* Update lang attribute from locale cookie on every page load/navigation */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var m=document.cookie.match(/locale=([^;]+)/);if(m)document.documentElement.lang=m[1]})()` }} />
      </head>
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
