import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site.config';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import { getTrainers } from '@/lib/data';
import Trainers from "@/app/[[...locale]]/_components/Trainers";

export async function generateMetadata({
  params,
}: {
  params: { locale?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  return {
    title: `Our Team | ${siteConfig.siteName}`,
    description: 'Meet our expert trainers who are dedicated to helping you achieve your fitness goals.',
  };
}

export const generateStaticParams = () => [
  { locale: undefined },
  { locale: ['en'] },
];

async function TrainersContent({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const trainers = await getTrainers();

  return <Trainers trainers={trainers} dict={dict} />;
}

export default async function TrainersPage({ params }: { params: { locale?: string[] } }) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams) as Locale;
  return <TrainersContent locale={locale} />;
}
