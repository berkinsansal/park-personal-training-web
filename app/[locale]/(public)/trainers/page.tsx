import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getSiteInfo, getTrainers } from '@/lib/data';
import { routing } from '@/i18n.config';
import Trainers from '@/app/[locale]/(public)/trainers/_components/Trainers';
import ContactPreview from '@/app/[locale]/(home)/_components/ContactPreview';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `${t('trainersTitle')} | ${siteConfig.siteName}`,
    description: t('trainersDescription'),
  };
}

async function TrainersContent() {
  const [siteInfo, trainers] = await Promise.all([
    getSiteInfo(),
    getTrainers(),
  ]);

  return (
    <>
      <Trainers trainers={trainers} />
      <ContactPreview phone={siteInfo.phone} />
    </>
  );
}

export default async function TrainersPage() {
  return <TrainersContent />;
}
