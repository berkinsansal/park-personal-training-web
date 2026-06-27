import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site.config';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import { getSiteInfo } from '@/lib/data';
import Contact from "@/app/[[...locale]]/_components/Contact";

export async function generateMetadata({
  params,
}: {
  params: { locale?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  return {
    title: `Contact Us | ${siteConfig.siteName}`,
    description: 'Get in touch with Park Personal Training. Visit us or send us a message.',
  };
}

export const generateStaticParams = () => [
  { locale: undefined },
  { locale: ['en'] },
];

async function ContactContent({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const siteInfo = await getSiteInfo();

  return <Contact siteInfo={siteInfo} locale={locale} dict={dict} />;
}

export default async function ContactPage({ params }: { params: { locale?: string[] } }) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams) as Locale;
  return <ContactContent locale={locale} />;
}
