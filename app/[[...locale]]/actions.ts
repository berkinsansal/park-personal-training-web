'use server';

import { getDict, type Locale } from '@/lib/i18n';

export async function sendContactAction(_prev: unknown, formData: FormData) {
  const localeStr = formData.get('locale')?.toString() ?? 'tr';
  const locale: Locale = localeStr === 'en' ? 'en' : 'tr';
  const dict = getDict(locale);
  const t = dict.contact;

  const name = formData.get('name')?.toString().trim() ?? '';
  const phone = formData.get('phone')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !message || (!phone && !email)) {
    return { error: t.validationError };
  }

  const db = (await import('@/lib/supabase-server')).createAdminClient();
  const { data: siteInfo } = await db.from('site_info').select('email').single();

  if (!siteInfo?.email) {
    return { error: t.sendError };
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: siteInfo.email,
    subject: `${t.emailSubject} (${name})`,
    text: [
      `${t.nameLabel}: ${name}`,
      `${t.phoneLabel}: ${phone}`,
      `${t.emailLabel}: ${email}`,
      '',
      `${t.messageLabel}:`,
      message,
    ].join('\n'),
  });

  if (error) return { error: error.message };
  return { success: true };
}
