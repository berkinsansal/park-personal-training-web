import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { siteConfig } from "@/lib/site.config";
import { getSiteInfo } from "@/lib/data";
import Navbar from "@/app/[locale]/_components/Navbar";
import Footer from "@/app/[locale]/_components/Footer";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n.config';
import "../globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.siteName,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const siteInfo = await getSiteInfo();
  const htmlLang = locale === 'en' ? 'en' : 'tr';

  return (
    <html lang={htmlLang} className={`${geist.variable} scroll-smooth`}>
      <head />
      <body className="bg-zinc-950 text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>
            {children}
          </main>
          <Footer igHandle={siteInfo.ig_handle ?? ''} locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
