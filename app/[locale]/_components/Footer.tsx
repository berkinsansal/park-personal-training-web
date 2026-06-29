import Image from 'next/image';
import { cacheLife } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/lib/site.config';

async function getCurrentYear() {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}

export default async function Footer({ igHandle }: { igHandle: string }) {
  const t = await getTranslations();
  const currentYear = await getCurrentYear();

  return (
    <footer className="bg-amber-950 border-t border-zinc-800 py-2">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={`${siteConfig.siteName} Logo`}
            width={48}
            height={48}
          />
          <span className="text-white font-black text-xl tracking-wide">
            {siteConfig.siteName}
          </span>
        </div>
        <p className="text-zinc-500 text-sm text-center">
          &copy; {currentYear} {siteConfig.siteName}. {t('footer.copyright')}
        </p>
        <a
          href={`https://instagram.com/${igHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-amber-400 transition-colors text-sm"
        >
          @{igHandle}
        </a>
      </div>
    </footer>
  );
}
