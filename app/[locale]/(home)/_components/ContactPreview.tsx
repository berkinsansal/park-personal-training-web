'use client';

import { SectionShell } from '@/app/[locale]/_components/SectionShell';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Button } from '@/components/ui/button';

export default function ContactPreview({ phone }: { phone?: string }) {
  const locale = useLocale();
  const t = useTranslations('contact');
  const tCta = useTranslations('cta');

  return (
    <SectionShell
      label={t('label')}
      heading={t('previewHeading')}
      description={t('previewDescription')}
      sectionClassName="bg-zinc-900"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button asChild variant="primary">
          <Link href={`/${locale}/contact`}>
            {tCta('startNow')}
          </Link>
        </Button>
        {phone && (
          <Button asChild variant="whatsapp">
            <a
              href={`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(tCta('whatsappMessage'))}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </Button>
        )}
      </div>
    </SectionShell>
  );
}
