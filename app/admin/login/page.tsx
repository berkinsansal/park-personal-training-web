import { connection } from 'next/server';
import { getDict } from '@/lib/i18n';
import LoginForm from './LoginForm';

async function LoginContent() {
  await connection();
  const dict = getDict('tr');
  return <LoginForm dict={dict} locale="tr" />;
}

export const generateStaticParams = () => [];

export default function LoginPage() {
  return <LoginContent />;
}
