import { connection } from 'next/server';
import { Suspense } from 'react';
import { createAdminClient } from '@/lib/supabase-server';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import SiteInfoForm from './components/SiteInfoForm';
import ServicesPanel from './components/ServicesPanel';
import TeachersPanel from './components/TeachersPanel';
import PlaylistsPanel from './components/PlaylistsPanel';
import LocaleSwitcher from './components/LocaleSwitcher';
import { logoutAction } from './actions';

async function AdminContent() {
  await connection();
  const locale = await getLocale();
  const dict = getDict(locale);
  const t = dict.admin;
  const db = createAdminClient();

  const [{ data: siteInfo }, { data: services }, { data: teachers }, { data: playlists }] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('teachers').select('*').order('order_index'),
    db.from('playlists').select('*').order('order_index'),
  ]);

  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <a href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-white font-black text-xl">{t.title}</h1>
          <p className="text-zinc-500 text-xs mt-0.5">{t.subtitle}</p>
        </a>
        <div className="flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 rounded-lg px-4 py-2"
            >
              {t.logout}
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-10">
        <SiteInfoForm data={siteInfo} dict={dict} />
        <ServicesPanel services={services ?? []} dict={dict} />
        <TeachersPanel teachers={teachers ?? []} dict={dict} />
        <PlaylistsPanel playlists={playlists ?? []} dict={dict} />
      </main>
    </>
  );
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Suspense>
        <AdminContent />
      </Suspense>
    </div>
  );
}
