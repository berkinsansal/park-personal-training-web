'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions';
import LocaleSwitcher from '../_components/LocaleSwitcher';
import type { Dict, Locale } from '@/lib/i18n';
import Link from 'next/link';

export default function LoginForm({ dict, locale }: { dict: Dict; locale: Locale }) {
  const t = dict.admin.login;
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <LocaleSwitcher locale={locale} />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-amber-400">{t.title}</h1>
          <p className="text-zinc-400 text-sm mt-1">{t.subtitle}</p>
        </div>

        <form
          action={action}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4"
        >
          <div>
            <label className="block text-zinc-400 text-sm mb-2">{t.email}</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm mb-2">{t.password}</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider mt-2 disabled:opacity-50"
          >
            {pending ? t.submitting : t.submit}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-zinc-400 text-sm hover:text-white transition-colors">
            {t.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
