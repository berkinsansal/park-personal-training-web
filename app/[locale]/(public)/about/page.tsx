import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getSiteInfo, getServices, getTrainers, getGallery } from '@/lib/data';
import { routing } from '@/i18n.config';
import About from "@/app/[locale]/(public)/about/_components/About";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `About Us | ${siteConfig.siteName}`,
    description: 'Learn more about Park Personal Training and our expert team.',
  };
}

async function AboutContent() {
  const [siteInfo, services, trainers, gallery] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTrainers(),
    getGallery(),
  ]);

  return (
    <About
      happyCustomers={siteInfo.happy_customers}
      yearsExperience={siteInfo.years_experience}
      trainerCount={trainers.length}
      serviceCount={services.length}
      gallery={gallery}
    />
  );
}

export default async function AboutPage() {
  return <AboutContent />;
}
