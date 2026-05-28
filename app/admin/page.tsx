import { createAdminClient } from '@/lib/supabase-server';
import SiteInfoForm from './components/SiteInfoForm';
import ServicesPanel from './components/ServicesPanel';
import TeachersPanel from './components/TeachersPanel';
import { logoutAction } from './actions';

export default async function AdminPage() {
  const db = createAdminClient();

  const [{ data: siteInfo }, { data: services }, { data: teachers }] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('teachers').select('*').order('order_index'),
  ]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-black text-xl">Park PT — Admin</h1>
          <p className="text-zinc-500 text-xs mt-0.5">İçerik Yönetimi</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 rounded-lg px-4 py-2"
          >
            Çıkış
          </button>
        </form>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-10">
        <SiteInfoForm data={siteInfo} />
        <ServicesPanel services={services ?? []} />
        <TeachersPanel teachers={teachers ?? []} />
      </main>
    </div>
  );
}
