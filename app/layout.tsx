import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getLocale } from "@/lib/locale";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return locale === 'en'
    ? {
        title: "Park Personal Training | Professional Fitness Studio",
        description: "Reach your goals with expert trainers at Park Personal Training studio.",
      }
    : {
        title: "Park Personal Training | Profesyonel Fitness Studyosu",
        description: "Park Personal Training studyosunda uzman egitmenlerimizle hedeflerinize ulasin.",
      };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${geist.variable} scroll-smooth`}>
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
