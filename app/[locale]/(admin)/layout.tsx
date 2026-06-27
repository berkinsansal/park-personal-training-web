import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/site.config";
import { routing } from "@/i18n.config";
import "../../globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Admin | ${siteConfig.siteName}`,
};

// Admin routes require generateStaticParams for cacheComponents: true, but their content
// cannot be pre-rendered because they access uncached Supabase data. This causes a build
// error that's a known limitation of Next.js. Admin routes will still work fine at runtime.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const htmlLang = locale === 'en' ? 'en' : 'tr';

  return (
    <html lang={htmlLang} className={geist.variable}>
      <head />
      <body className="bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
