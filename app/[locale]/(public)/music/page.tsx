import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getPlaylists } from '@/lib/data';
import { routing } from '@/i18n.config';
import Playlists from '@/app/[locale]/(public)/music/_components/Playlists';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `${t('musicTitle')} | ${siteConfig.siteName}`,
    description: t('musicDescription'),
  };
}

async function MusicContent() {
  const playlists = await getPlaylists();

  return <Playlists playlists={playlists} />;
}

export default async function MusicPage() {
  return <MusicContent />;
}
