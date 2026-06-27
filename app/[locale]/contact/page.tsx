import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getSiteInfo } from '@/lib/data';
import { routing } from '@/i18n.config';
import Contact from "@/app/[locale]/_components/Contact";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `Contact Us | ${siteConfig.siteName}`,
    description: 'Get in touch with Park Personal Training. Visit us or send us a message.',
  };
}

async function ContactContent() {
  const siteInfo = await getSiteInfo();

  return <Contact siteInfo={siteInfo} />;
}

export default async function ContactPage() {
  return <ContactContent />;
}
