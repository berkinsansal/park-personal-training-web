import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/site.config";
import { getLocaleFromParams } from "@/lib/getLocaleFromParams";
import { getDict, type Locale } from "@/lib/i18n";
import { getSiteInfo } from "@/lib/data";
import Navbar from "@/app/[[...locale]]/_components/Navbar";
import Footer from "@/app/[[...locale]]/_components/Footer";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.siteName,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string[] }>;
}>) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams) as Locale;
  const dict = getDict(locale);
  const siteInfo = await getSiteInfo();
  const htmlLang = locale === 'en' ? 'en' : 'tr';

  return (
    <html lang={htmlLang} className={`${geist.variable} scroll-smooth`}>
      <head />
      <body className="bg-zinc-950 text-white antialiased">
        <Navbar dict={dict} locale={locale} />
        <main>
          {children}
        </main>
        <Footer igHandle={siteInfo.ig_handle ?? ''} dict={dict} />
      </body>
    </html>
  );
}
