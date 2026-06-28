import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import {
  getPlaylists,
  getServices,
  getSiteInfo,
  getTrainers,
} from '@/lib/data';
import { routing } from '@/i18n.config';
import Hero from '@/app/[locale]/(home)/_components/Hero';
import AboutPreview from '@/app/[locale]/(home)/_components/AboutPreview';
import ServicesPreview from '@/app/[locale]/(home)/_components/ServicesPreview';
import TrainersPreview from '@/app/[locale]/(home)/_components/TrainersPreview';
import MusicPreview from '@/app/[locale]/(home)/_components/MusicPreview';
import ContactPreview from '@/app/[locale]/(home)/_components/ContactPreview';

async function HomeContent() {
  const t = await getTranslations();
  const [siteInfo, services, trainers, playlists] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTrainers(),
    getPlaylists(),
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
      <MusicPreview playlists={playlists} />
      <ContactPreview />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${siteConfig.siteName} | ${t('meta.title')}`,
    description: t('meta.description'),
  };
}

export default async function Home() {
  return <HomeContent />;
}
