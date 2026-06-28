import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getTrainers } from '@/lib/data';
import { routing } from '@/i18n.config';
import Trainers from '@/app/[locale]/(public)/trainers/_components/Trainers';
import ContactPreview from '@/app/[locale]/(home)/_components/ContactPreview';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `Our Team | ${siteConfig.siteName}`,
    description:
      'Meet our expert trainers who are dedicated to helping you achieve your fitness goals.',
  };
}

async function TrainersContent() {
  const trainers = await getTrainers();

  return (
    <>
      <Trainers trainers={trainers} />
      <ContactPreview />
    </>
  );
}

export default async function TrainersPage() {
  return <TrainersContent />;
}
