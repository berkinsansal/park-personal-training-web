import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site.config';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import { getSiteInfo, getServices, getTrainers } from '@/lib/data';
import Hero from "@/app/[[...locale]]/_components/Hero";
import AboutPreview from "@/app/[[...locale]]/_components/AboutPreview";
import ServicesPreview from "@/app/[[...locale]]/_components/ServicesPreview";
import TrainersPreview from "@/app/[[...locale]]/_components/TrainersPreview";

async function HomeContent({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const [siteInfo, services, trainers] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTrainers(),
  ]);

  return (
    <>
      <Hero dict={t} locale={locale} />
      <AboutPreview
        dict={t}
        locale={locale}
        happyCustomers={siteInfo.happy_customers}
        yearsExperience={siteInfo.years_experience}
        trainerCount={trainers.length}
        serviceCount={services.length}
      />
      <ServicesPreview services={services} locale={locale} dict={t} />
      <TrainersPreview trainers={trainers} locale={locale} dict={t} />
      <section className="py-16 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Discover Our Music</h2>
          <p className="text-zinc-400 text-lg mb-8">Train to the sound of our gym with our curated Spotify playlists.</p>
          <a
            href={locale === 'en' ? '/en/music' : '/music'}
            className="inline-block px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-sm uppercase tracking-wider"
          >
            Explore Playlists
          </a>
        </div>
      </section>
      <section className="py-16 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-zinc-400 text-lg mb-8">Get in touch with our team to discuss your fitness goals.</p>
          <a
            href={locale === 'en' ? '/en/contact' : '/contact'}
            className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  const dict = getDict(locale);
  return {
    title: `${siteConfig.siteName} | ${dict.meta.title}`,
    description: dict.meta.description,
  };
}

export const generateStaticParams = () => [
  { locale: undefined },  // /
  { locale: ['en'] },     // /en
];

export default async function Home({ params }: { params: { locale?: string[] } }) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  return <HomeContent locale={locale} />;
}
