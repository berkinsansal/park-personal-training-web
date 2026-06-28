import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getServices } from '@/lib/data';
import { routing } from '@/i18n.config';
import Services from '@/app/[locale]/(public)/services/_components/Services';
import ContactPreview from '@/app/[locale]/(home)/_components/ContactPreview';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `${t('servicesTitle')} | ${siteConfig.siteName}`,
    description: t('servicesDescription'),
  };
}

async function ServicesContent() {
  const services = await getServices();

  return (
    <>
      <Services services={services} />
      <ContactPreview />
    </>
  );
}

export default async function ServicesPage() {
  return <ServicesContent />;
}
