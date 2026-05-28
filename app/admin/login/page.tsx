import { Suspense } from 'react';
import { connection } from 'next/server';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import LoginForm from './LoginForm';

async function LoginContent() {
  await connection();
  const locale = await getLocale();
  const dict = getDict(locale);
  return <LoginForm dict={dict} />;
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
