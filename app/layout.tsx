import type { Metadata } from "next";
import { Geist } from "next/font/google";
import LocaleUpdater from "@/components/LocaleUpdater";
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
      <head />
      <body className="bg-zinc-950 text-white antialiased">
        <LocaleUpdater />
        {children}
      </body>
    </html>
  );
}
