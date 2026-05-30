'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setLocaleAction(_prev: unknown, formData: FormData) {
  const locale = formData.get('locale') as string;
  (await cookies()).set('locale', locale === 'en' ? 'en' : 'tr', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  redirect('/');
}
