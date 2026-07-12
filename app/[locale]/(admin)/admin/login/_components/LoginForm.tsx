'use client';

import LocaleSwitcher from '@/app/_components/LocaleSwitcher';
import { siteConfig } from '@/lib/site.config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useActionState } from 'react';
import { loginAction } from '../../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginForm({
  defaultEmail,
  defaultPassword,
}: {
  defaultEmail?: string;
  defaultPassword?: string;
}) {
  const t = useTranslations('admin.login');
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <LocaleSwitcher />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-amber-400">
            {siteConfig.siteName}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
        </div>

        <form
          action={action}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4"
        >
          <div>
            <label className="block text-zinc-400 text-sm mb-2">
              {t('email')}
            </label>
            <Input
              required
              type="email"
              name="email"
              defaultValue={defaultEmail}
              size="lg"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm mb-2">
              {t('password')}
            </label>
            <Input
              required
              type="password"
              name="password"
              defaultValue={defaultPassword}
              size="lg"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <Button
            type="submit"
            disabled={pending}
            variant="primary"
            size="full"
            className="mt-2"
          >
            {pending ? t('submitting') : t('submit')}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-zinc-400 text-sm hover:text-white transition-colors"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
