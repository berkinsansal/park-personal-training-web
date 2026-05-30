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

export async function submitContactFormAction(_prev: unknown, formData: FormData) {
  const name = formData.get('name') as string;
  const contact = formData.get('contact') as string;
  const message = formData.get('message') as string;
  const honeypot = formData.get('website') as string;

  const errors: Record<string, string> = {};

  if (!name?.trim()) errors.name = 'Name is required';
  if (!contact?.trim()) errors.contact = 'Phone or email is required';
  if (!message?.trim()) errors.message = 'Message is required';

  if (name && name.length > 100) errors.name = 'Name is too long';
  if (message && message.length > 5000) errors.message = 'Message is too long';

  if (Object.keys(errors).length > 0) {
    return { error: 'Validation failed', errors };
  }

  if (honeypot) {
    return { success: true };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'contact@parkpersonaltraining.com',
      to: process.env.CONTACT_FORM_EMAIL || 'admin@parkpersonaltraining.com',
      replyTo: contact,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return { error: 'Failed to send message. Please try again later.' };
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
