import { Button } from '@/components/ui/button';
import LocaleSwitcher from '@/app/_components/LocaleSwitcher';
import { siteConfig } from '@/lib/site.config';
import { createAdminClient } from '@/lib/supabase-server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import GalleryPanel from './_components/GalleryPanel';
import PlaylistsPanel from './_components/PlaylistsPanel';
import ServicesPanel from './_components/ServicesPanel';
import SiteInfoForm from './_components/SiteInfoForm';
import TrainersPanel from './_components/TrainersPanel';
import { logoutAction } from './actions';

async function AdminContent() {
  const t = await getTranslations('admin');
  const db = createAdminClient();

  const [
    { data: siteInfo },
    { data: services },
    { data: trainers },
    { data: playlists },
    { data: gallery },
  ] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('trainers').select('*').order('order_index'),
    db.from('playlists').select('*').order('order_index'),
    db.from('gallery').select('*').order('order_index'),
  ]);

  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.siteName} Logo`}
            width={40}
            height={40}
            className="rounded-full bg-amber-400/10 border border-amber-400/30"
          />
          <div>
            <h1 className="text-amber-400 font-bold text-lg tracking-wide">
              {siteConfig.siteName}
            </h1>
            <p className="text-zinc-500 text-sm mt-0.5">{t('subtitle')}</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              {t('logout')}
            </Button>
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
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <AdminContent />
    </Suspense>
  );
}
