import { Suspense } from 'react';
import { connection } from 'next/server';
import { getDict, type Locale } from '@/lib/i18n';
import { getLocaleFromParams } from '@/lib/getLocaleFromParams';
import LoginForm from '../LoginForm';

async function LoginContent({ locale }: { locale: Locale }) {
  await connection();
  const dict = getDict(locale);
  return <LoginForm dict={dict} locale={locale} />;
}

export const generateStaticParams = () => [];

export default async function LoginPage({
  params,
}: Readonly<{
  params: Promise<{ locale?: string[] }>;
}>) {
  const resolvedParams = await params;
  const locale = getLocaleFromParams(resolvedParams);

  return (
    <Suspense>
      <LoginContent locale={locale} />
    </Suspense>
  );
}
