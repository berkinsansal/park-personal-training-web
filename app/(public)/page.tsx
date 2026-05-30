import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale';
import { getDict, type Locale, type Dict } from '@/lib/i18n';
import { cacheLife, cacheTag } from 'next/cache';
import { createAdminClient } from '@/lib/supabase-server';
import type { SiteInfo, Service, Teacher, Playlist, GalleryPhoto } from '@/lib/types';
import Navbar from "@/app/(public)/_components/Navbar";
import Hero from "@/app/(public)/_components/Hero";
import About from "@/app/(public)/_components/About";
import Services from "@/app/(public)/_components/Services";
import Teachers from "@/app/(public)/_components/Teachers";
import Playlists from "@/app/(public)/_components/Playlists";
import Contact from "@/app/(public)/_components/Contact";
import Footer from "@/app/(public)/_components/Footer";

async function HomeContent({ locale }: { locale: Locale }) {
  'use cache';
  cacheTag(`homepage-${locale}`);
  cacheLife('max');

  const t = getDict(locale);
  const db = createAdminClient();

  const [{ data: siteInfo }, { data: services }, { data: teachers }, { data: gallery }, { data: playlists }] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('teachers').select('*').order('order_index'),
    db.from('gallery').select('*').order('order_index'),
    db.from('playlists').select('*').order('order_index'),
  ]);

  return (
    <>
      <Navbar dict={t} locale={locale} />
      <main>
        <Hero dict={t} />
        <About
          dict={t}
          happyCustomers={(siteInfo as SiteInfo | null)?.happy_customers ?? 0}
          yearsExperience={(siteInfo as SiteInfo | null)?.years_experience ?? 0}
          teacherCount={teachers?.length ?? 0}
          serviceCount={services?.length ?? 0}
          gallery={(gallery as GalleryPhoto[] | null) ?? []}
        />
        <Services services={(services as Service[] | null) ?? []} locale={locale} dict={t} />
        <Teachers teachers={(teachers as Teacher[] | null) ?? []} dict={t} />
        <Playlists playlists={(playlists as Playlist[] | null) ?? []} dict={t} />
        <Contact siteInfo={siteInfo as SiteInfo | null} locale={locale} dict={t} />
      </main>
      <Footer igHandle={(siteInfo as SiteInfo | null)?.ig_handle ?? ''} dict={t} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return locale === 'en'
    ? {
        title: "Park Personal Training | Professional Fitness Studio",
        description: "Reach your goals with expert trainers at Park Personal Training studio.",
      }
    : {
        title: "Park Personal Training | Profesyonel Fitness Studyosu",
        description: "Park Personal Training studyosunda uzman egitmenlerimizle hedeflerinize ulasin.",
      };
}

async function HomeShell() {
  const locale = await getLocale();
  return <HomeContent locale={locale} />;
}

export default function Home() {
  return (
    <Suspense>
      <HomeShell />
    </Suspense>
  );
}
