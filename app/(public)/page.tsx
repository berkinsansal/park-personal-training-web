import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale';
import { getDict, type Locale, type Dict } from '@/lib/i18n';
import { cacheLife, cacheTag } from 'next/cache';
import { createAdminClient } from '@/lib/supabase-server';
import { siteConfig } from '@/lib/site.config';
import type { SiteInfo, Service, Teacher, Playlist, GalleryPhoto } from '@/lib/types';
import Navbar from "@/app/(public)/_components/Navbar";
import Hero from "@/app/(public)/_components/Hero";
import About from "@/app/(public)/_components/About";
import Services from "@/app/(public)/_components/Services";
import Teachers from "@/app/(public)/_components/Teachers";
import Playlists from "@/app/(public)/_components/Playlists";
import Contact from "@/app/(public)/_components/Contact";
import Footer from "@/app/(public)/_components/Footer";

async function getHomepageData(locale: Locale) {
  'use cache: remote';
  cacheTag(`homepage-${locale}`);
  cacheLife('max');

  const db = createAdminClient();

  const [siteInfoRes, servicesRes, teachersRes, galleryRes, playlistsRes] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('teachers').select('*').order('order_index'),
    db.from('gallery').select('*').order('order_index'),
    db.from('playlists').select('*').order('order_index'),
  ]);

  const errors = [
    siteInfoRes.error && `site_info: ${siteInfoRes.error.message}`,
    servicesRes.error && `services: ${servicesRes.error.message}`,
    teachersRes.error && `teachers: ${teachersRes.error.message}`,
    galleryRes.error && `gallery: ${galleryRes.error.message}`,
    playlistsRes.error && `playlists: ${playlistsRes.error.message}`,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error(`Homepage data fetch failed: ${errors.join(', ')}`);
  }

  return {
    siteInfo: siteInfoRes.data as SiteInfo,
    services: servicesRes.data as Service[],
    teachers: teachersRes.data as Teacher[],
    gallery: galleryRes.data as GalleryPhoto[],
    playlists: playlistsRes.data as Playlist[],
  };
}

async function HomeContent({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const { siteInfo, services, teachers, gallery, playlists } = await getHomepageData(locale);

  return (
    <>
      <Navbar dict={t} locale={locale} />
      <main>
        <Hero dict={t} />
        <About
          dict={t}
          happyCustomers={siteInfo.happy_customers}
          yearsExperience={siteInfo.years_experience}
          teacherCount={teachers.length}
          serviceCount={services.length}
          gallery={gallery}
        />
        <Services services={services} locale={locale} dict={t} />
        <Teachers teachers={teachers} dict={t} />
        <Playlists playlists={playlists} dict={t} />
        <Contact siteInfo={siteInfo} locale={locale} dict={t} />
      </main>
      <Footer igHandle={siteInfo.ig_handle ?? ''} dict={t} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDict(locale);
  return {
    title: `${siteConfig.siteName} | ${dict.meta.title}`,
    description: dict.meta.description,
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
