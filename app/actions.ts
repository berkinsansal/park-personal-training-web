'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Resend } from 'resend';

export async function setLocaleAction(_prev: unknown, formData: FormData) {
  const locale = formData.get('locale') as string;
  (await cookies()).set('locale', locale === 'en' ? 'en' : 'tr', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  redirect('/');
}

export async function sendContactAction(_prev: unknown, formData: FormData) {
  const name = formData.get('name')?.toString().trim() ?? '';
  const phone = formData.get('phone')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !message || (!phone && !email)) {
    return { error: 'Please fill in all required fields.' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_FORM_EMAIL ?? '';

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) return { error: error.message };
  return { success: true };
}
