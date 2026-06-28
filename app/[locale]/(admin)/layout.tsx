import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { routing } from "@/i18n.config";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `Admin | ${siteConfig.siteName}`,
};

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

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <div className="bg-zinc-950 overflow-auto">
      {children}
    </div>
  );
}
