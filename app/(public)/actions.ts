'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';

export async function setLocaleAction(_prev: unknown, formData: FormData) {
  const locale = formData.get('locale') as string;
  (await cookies()).set('locale', locale === 'en' ? 'en' : 'tr', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  redirect('/');
}

export async function sendContactAction(_prev: unknown, formData: FormData) {
  const locale = await getLocale();
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
    from: 'onboarding@resend.dev',
    to: siteInfo.email,
    subject: `Yeni iletişim formu mesajı (${name})`,
    text: `Ad Soyad: ${name}\nTelefon: ${phone}\nE-posta: ${email}\n\nMesaj:\n${message}`,
  });

  if (error) return { error: error.message };
  return { success: true };
}
