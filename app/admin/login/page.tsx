import { connection } from 'next/server';
import { getDict } from '@/lib/i18n';
import LoginForm from './LoginForm';

async function LoginContent() {
  await connection();
  const dict = getDict('tr');
  return <LoginForm dict={dict} locale="tr" />;
}

export default function LoginPage() {
  return <LoginContent />;
}
