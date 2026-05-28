import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getLocale } from '@/lib/locale';
import { getDict, type Locale, type Dict } from '@/lib/i18n';
import { cacheLife, cacheTag } from 'next/cache';
import { createAdminClient } from '@/lib/supabase-server';
import type { SiteInfo, Service, Teacher } from '@/lib/types';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Teachers from "@/components/Teachers";
import Contact from "@/components/Contact";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";

async function HomeContent({ locale }: { locale: Locale }) {
  'use cache';
  cacheTag(`homepage-${locale}`);
  cacheLife('max');

  const t = getDict(locale);
  const db = createAdminClient();

  const [{ data: siteInfo }, { data: services }, { data: teachers }] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('teachers').select('*').order('order_index'),
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
        />
        <Services services={(services as Service[] | null) ?? []} locale={locale} dict={t} />
        <Teachers teachers={(teachers as Teacher[] | null) ?? []} dict={t} />
        <Contact siteInfo={siteInfo as SiteInfo | null} locale={locale} dict={t} />
        {siteInfo && <LocationMap latitude={siteInfo.latitude} longitude={siteInfo.longitude} locale={locale} />}
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
