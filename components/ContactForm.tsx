'use client';

import { useActionState } from 'react';
import { submitContactFormAction } from '@/app/actions';
import type { Dict } from '@/lib/i18n';

export default function ContactForm({ dict }: { dict: Dict }) {
  const t = dict.contact;
  const [state, action, pending] = useActionState(submitContactFormAction, null);

  return (
    <div>
      <h3 className="text-amber-400 font-bold text-lg mb-6">{t.formHeading}</h3>
      <form action={action} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4">
        <div>
          <label className="block text-zinc-400 text-sm mb-2">{t.nameLabel}</label>
          <input
            type="text"
            name="name"
            placeholder={t.namePlaceholder}
            required
            maxLength={100}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
            disabled={pending}
          />
          {state?.errors?.name && <p className="text-red-400 text-xs mt-1">{state.errors.name}</p>}
        </div>

        <div>
          <label className="block text-zinc-400 text-sm mb-2">{t.phoneLabel}</label>
          <input
            type="text"
            name="contact"
            placeholder={t.contactPlaceholder}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
            disabled={pending}
          />
          {state?.errors?.contact && <p className="text-red-400 text-xs mt-1">{state.errors.contact}</p>}
        </div>

        <div>
          <label className="block text-zinc-400 text-sm mb-2">{t.messageLabel}</label>
          <textarea
            rows={4}
            name="message"
            placeholder={t.messagePlaceholder}
            required
            maxLength={5000}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm resize-none"
            disabled={pending}
          />
          {state?.errors?.message && <p className="text-red-400 text-xs mt-1">{state.errors.message}</p>}
        </div>

        <input type="hidden" name="website" value="" />

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? `${t.submit}...` : t.submit}
        </button>

        {state?.success && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 text-green-400 text-sm">
            Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {state?.error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400 text-sm">
            {state.error}
          </div>
        )}
      </form>
    </div>
  );
}
