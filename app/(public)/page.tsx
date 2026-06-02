import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale';
import { getDict, type Locale, type Dict } from '@/lib/i18n';
import { cacheLife, cacheTag } from 'next/cache';
import { createAdminClient } from '@/lib/supabase-server';
import { siteConfig } from '@/lib/site.config';
import type { SiteInfo, Service, Trainer, Playlist, GalleryPhoto } from '@/lib/types';
import Navbar from "@/app/(public)/_components/Navbar";
import Hero from "@/app/(public)/_components/Hero";
import About from "@/app/(public)/_components/About";
import Services from "@/app/(public)/_components/Services";
import Trainers from "@/app/(public)/_components/Trainers";
import Playlists from "@/app/(public)/_components/Playlists";
import Contact from "@/app/(public)/_components/Contact";
import Footer from "@/app/(public)/_components/Footer";

async function getHomepageData(locale: Locale) {
  'use cache: remote';
  cacheTag(`homepage-${locale}`);
  cacheLife('max');

  const db = createAdminClient();

  const fetchWithRetry = async (attempt = 0): Promise<any> => {
    try {
      const [siteInfoRes, servicesRes, trainersRes, galleryRes, playlistsRes] = await Promise.all([
        db.from('site_info').select('*').single(),
        db.from('services').select('*').order('order_index'),
        db.from('trainers').select('*').order('order_index'),
        db.from('gallery').select('*').order('order_index'),
        db.from('playlists').select('*').order('order_index'),
      ]);

      const errors = [
        siteInfoRes.error && `site_info: ${siteInfoRes.error.message}`,
        servicesRes.error && `services: ${servicesRes.error.message}`,
        trainersRes.error && `trainers: ${trainersRes.error.message}`,
        galleryRes.error && `gallery: ${galleryRes.error.message}`,
        playlistsRes.error && `playlists: ${playlistsRes.error.message}`,
      ].filter(Boolean);

      if (errors.length > 0) {
        const errorMsg = errors.join(', ');
        console.error(`Homepage data fetch failed: ${errorMsg}`);
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 100));
          return fetchWithRetry(attempt + 1);
        }
        throw new Error(`Homepage data fetch failed: ${errorMsg}`);
      }

      return {
        siteInfo: siteInfoRes.data as SiteInfo,
        services: servicesRes.data as Service[],
        trainers: trainersRes.data as Trainer[],
        gallery: galleryRes.data as GalleryPhoto[],
        playlists: playlistsRes.data as Playlist[],
      };
    } catch (error) {
      if (attempt < 2) {
        console.warn(`Homepage fetch attempt ${attempt + 1} failed, retrying...`);
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 100));
        return fetchWithRetry(attempt + 1);
      }
      console.error('Fatal error fetching homepage data after 3 attempts:', error);
      throw error;
    }
  };

  return fetchWithRetry();
}

async function HomeContent({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const { siteInfo, services, trainers, gallery, playlists } = await getHomepageData(locale);

  return (
    <>
      <Navbar dict={t} locale={locale} />
      <main>
        <Hero dict={t} />
        <About
          dict={t}
          happyCustomers={siteInfo.happy_customers}
          yearsExperience={siteInfo.years_experience}
          trainerCount={trainers.length}
          serviceCount={services.length}
          gallery={gallery}
        />
        <Services services={services} locale={locale} dict={t} />
        <Trainers trainers={trainers} dict={t} />
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
