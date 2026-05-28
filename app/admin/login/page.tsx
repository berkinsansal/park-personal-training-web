import { connection } from 'next/server';
import { getLocale } from '@/lib/locale';
import { getDict } from '@/lib/i18n';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  await connection();
  const locale = await getLocale();
  const dict = getDict(locale);
  return <LoginForm dict={dict} />;
}
