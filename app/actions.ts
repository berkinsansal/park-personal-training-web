'use server';

import { createAdminClient } from '@/lib/supabase-server';
import { getTranslations } from 'next-intl/server';

export async function sendContactAction(formData: FormData) {
  const t = await getTranslations('contact');
  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const phone = formData.get('phone')?.toString() ?? '';
  const message = formData.get('message')?.toString() ?? '';

  if (!name || !email || !message) {
    return { error: t('validationError') };
  }

  try {
    const db = createAdminClient();
    const { error } = await db.from('contact_submissions').insert({
      name,
      email,
      phone,
      message,
    });

    if (error) {
      return { error: t('sendError') };
    }

    return { success: true };
  } catch {
    return { error: t('sendError') };
  }
}
