import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getSiteInfo } from '@/lib/data';
import { routing } from '@/i18n.config';
import Contact from '@/app/[locale]/(public)/contact/_components/Contact';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `${t('contactTitle')} | ${siteConfig.siteName}`,
    description: t('contactDescription'),
  };
}

async function ContactContent() {
  const siteInfo = await getSiteInfo();

  return <Contact siteInfo={siteInfo} />;
}

export default async function ContactPage() {
  return <ContactContent />;
}
