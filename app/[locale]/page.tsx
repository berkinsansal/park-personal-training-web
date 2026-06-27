import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from "@/lib/site.config";
import { getSiteInfo, getServices, getTrainers } from "@/lib/data";
import { routing } from "@/i18n.config";
import Hero from "@/app/[locale]/_components/Hero";
import AboutPreview from "@/app/[locale]/_components/AboutPreview";
import ServicesPreview from "@/app/[locale]/_components/ServicesPreview";
import TrainersPreview from "@/app/[locale]/_components/TrainersPreview";

async function HomeContent({ locale }: { locale: string }) {
  const t = await getTranslations();
  const [siteInfo, services, trainers] = await Promise.all([
    getSiteInfo(),
    getServices(),
    getTrainers(),
  ]);

  return (
    <>
      <Hero />
      <AboutPreview
        happyCustomers={siteInfo.happy_customers}
        yearsExperience={siteInfo.years_experience}
        trainerCount={trainers.length}
        serviceCount={services.length}
      />
      <ServicesPreview services={services} />
      <TrainersPreview trainers={trainers} />
      <section className="py-16 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Discover Our Music</h2>
          <p className="text-zinc-400 text-lg mb-8">Train to the sound of our gym with our curated Spotify playlists.</p>
          <a
            href={`/${locale}/music`}
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
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${siteConfig.siteName} | ${t('meta.title')}`,
    description: t('meta.description'),
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomeContent locale={locale} />;
}
