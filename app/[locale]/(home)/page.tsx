import AboutPreview from '@/app/[locale]/(home)/_components/AboutPreview';
import ContactPreview from '@/app/[locale]/(home)/_components/ContactPreview';
import Hero from '@/app/[locale]/(home)/_components/Hero';
import MusicPreview from '@/app/[locale]/(home)/_components/MusicPreview';
import ServicesPreview from '@/app/[locale]/(home)/_components/ServicesPreview';
import TrainersPreview from '@/app/[locale]/(home)/_components/TrainersPreview';
import { routing } from '@/i18n.config';
import {
  getServices,
  getSiteInfo,
  getTrainers
} from '@/lib/data';
import { siteConfig } from '@/lib/site.config';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

async function HomeContent() {
  const [siteInfo, services, trainers] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTrainers(),
  ]);

  return (
    <>
      <Hero />
      <AboutPreview
        happyCustomers={siteInfo.happy_customers}
        yearsExperience={siteInfo.years_experience}
        trainerCount={trainers.length}
        serviceCount={services.length}
      />
      <ServicesPreview services={services} />
      <TrainersPreview trainers={trainers} />
      <MusicPreview />
      <ContactPreview phone={siteInfo.phone} />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `${siteConfig.siteName} | ${t('title')}`,
    description: t('description'),
  };
}

export default async function Home() {
  return <HomeContent />;
}
