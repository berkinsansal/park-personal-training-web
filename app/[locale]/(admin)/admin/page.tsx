import { Suspense } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { getLocale, getTranslations } from 'next-intl/server';
import { createAdminClient } from '@/lib/supabase-server';
import { siteConfig } from '@/lib/site.config';
import SiteInfoForm from './_components/SiteInfoForm';
import ServicesPanel from './_components/ServicesPanel';
import TrainersPanel from './_components/TrainersPanel';
import PlaylistsPanel from './_components/PlaylistsPanel';
import GalleryPanel from './_components/GalleryPanel';
import LocaleSwitcher from '@/app/_components/LocaleSwitcher';
import { logoutAction } from './actions';
import { routing } from '@/i18n.config';

async function AdminContent() {
  try {
    const t = await getTranslations('admin');
    const db = createAdminClient();

    const [{ data: siteInfo }, { data: services }, { data: trainers }, { data: playlists }, { data: gallery }] = await Promise.all([
      db.from('site_info').select('*').single(),
      db.from('services').select('*').order('order_index'),
      db.from('trainers').select('*').order('order_index'),
      db.from('playlists').select('*').order('order_index'),
      db.from('gallery').select('*').order('order_index'),
    ]);

    return (
      <>
        <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${siteConfig.siteName} Logo`}
              width={40}
              height={40}
              className="rounded-full bg-amber-400/10 border border-amber-400/30"
            />
            <div>
              <h1 className="text-amber-400 font-bold text-lg tracking-wide">{siteConfig.siteName}</h1>
              <p className="text-zinc-500 text-sm mt-0.5">{t('subtitle')}</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 rounded-lg px-4 py-2"
              >
                {t('logout')}
              </button>
            </form>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-10">
          <SiteInfoForm data={siteInfo} />
          <ServicesPanel services={services ?? []} />
          <TrainersPanel trainers={trainers ?? []} />
          <GalleryPanel gallery={gallery ?? []} />
          <PlaylistsPanel playlists={playlists ?? []} />
        </main>
      </>
    );
  } catch (error) {
    // During build time, database may not be available
    // Page will be rendered on-demand at runtime
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
}


export default function AdminPage() {
  return <AdminContent />;
}
