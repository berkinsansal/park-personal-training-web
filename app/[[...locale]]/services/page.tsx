import type { Metadata } from 'next';
import { getDict, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/site.config';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import { getServices } from '@/lib/data';
import Services from "@/app/[[...locale]]/_components/Services";
import { AnimateIn } from "@/app/[[...locale]]/_components/AnimateIn";

export async function generateMetadata({
  params,
}: {
  params: { locale?: string[] };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);
  return {
    title: `Services | ${siteConfig.siteName}`,
    description: 'Explore all our training services and programs.',
  };
}

export const generateStaticParams = () => [
  { locale: undefined },
  { locale: ['en'] },
];

async function ServicesContent({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const services = await getServices();

  return (
    <>
      <Services services={services} locale={locale} dict={dict} />
      <section className="py-24 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Get Started?</h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                Contact our team to learn more about which program is right for you.
              </p>
              <a
                href={locale === 'en' ? '/en/contact' : '/contact'}
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

export default async function ServicesPage({ params }: { params: { locale?: string[] } }) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams) as Locale;
  return <ServicesContent locale={locale} />;
}
