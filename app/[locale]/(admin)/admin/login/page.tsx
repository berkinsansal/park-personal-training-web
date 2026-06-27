import { Suspense } from 'react';
import { connection } from 'next/server';
import { getLocale } from 'next-intl/server';
import LoginForm from '../_components/LoginForm';

async function LoginContent() {
  await connection();
  return <LoginForm />;
}

export const generateStaticParams = () => [];

export default async function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
