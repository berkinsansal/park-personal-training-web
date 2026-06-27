import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';
import { getServices } from '@/lib/data';
import Services from "@/app/[locale]/_components/Services";
import { AnimateIn } from "@/app/[locale]/_components/AnimateIn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: `Services | ${siteConfig.siteName}`,
    description: 'Explore all our training services and programs.',
  };
}

async function ServicesContent() {
  const services = await getServices();

  return (
    <>
      <Services services={services} />
      <section className="py-24 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Get Started?</h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                Contact our team to learn more about which program is right for you.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider"
              >
                Contact Us
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

export default async function ServicesPage() {
  return <ServicesContent />;
}
