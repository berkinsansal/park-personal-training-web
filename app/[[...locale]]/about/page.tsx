import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site.config';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import { getSiteInfo, getServices, getTrainers, getGallery } from '@/lib/data';
import About from "@/app/[[...locale]]/_components/About";

export async function generateMetadata({
  params,
}: {
  params: { locale?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  const dict = getDict(locale);
  return {
    title: `About Us | ${siteConfig.siteName}`,
    description: 'Learn more about Park Personal Training and our expert team.',
  };
}

export const generateStaticParams = () => [
  { locale: undefined },
  { locale: ['en'] },
];

async function AboutContent({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const [siteInfo, services, trainers, gallery] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTrainers(),
    getGallery(),
  ]);

  return (
    <About
      dict={dict}
      locale={locale}
      happyCustomers={siteInfo.happy_customers}
      yearsExperience={siteInfo.years_experience}
      trainerCount={trainers.length}
      serviceCount={services.length}
      gallery={gallery}
    />
  );
}

export default async function AboutPage({ params }: { params: { locale?: string[] } }) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams) as Locale;
  return <AboutContent locale={locale} />;
}
