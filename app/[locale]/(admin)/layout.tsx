import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site.config';
import { routing } from '@/i18n.config';

export const metadata: Metadata = {
  title: `Admin | ${siteConfig.siteName}`,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-zinc-950 overflow-auto">{children}</div>;
}
