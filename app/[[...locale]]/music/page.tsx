import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site.config';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import { getPlaylists } from '@/lib/data';
import Playlists from "@/app/[[...locale]]/_components/Playlists";

export async function generateMetadata({
  params,
}: {
  params: { locale?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  return {
    title: `Music | ${siteConfig.siteName}`,
    description: 'Discover the Spotify playlists we play at our studio to keep you motivated during your workout.',
  };
}

export const generateStaticParams = () => [
  { locale: undefined },
  { locale: ['en'] },
];

async function MusicContent({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const playlists = await getPlaylists();

  return <Playlists playlists={playlists} dict={dict} />;
}

export default async function MusicPage({ params }: { params: { locale?: string[] } }) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams) as Locale;
  return <MusicContent locale={locale} />;
}
