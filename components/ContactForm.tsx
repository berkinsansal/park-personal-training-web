'use client';

import { useRef, useState, useTransition } from 'react';
import { sendContactAction } from '@/app/actions';
import type { Dict } from '@/lib/i18n';

function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm uppercase tracking-wider disabled:opacity-75 disabled:cursor-not-allowed"
    >
      {pending ? '...' : label}
    </button>
  );
}

export default function ContactForm({ t }: { t: Dict['contact'] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ error?: string; success?: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await sendContactAction(null, formData);
      setState(result);
      if (result?.success) {
        formRef.current?.reset();
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4">
      <h3 className="text-amber-400 font-bold text-lg mb-6">{t.formHeading}</h3>
      <div>
        <label className="block text-zinc-400 text-sm mb-2">{t.nameLabel}</label>
        <input
          type="text"
          name="name"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-zinc-400 text-sm mb-2">{t.phoneLabel}</label>
        <input
          type="text"
          name="phone"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-zinc-400 text-sm mb-2">{t.emailLabel}</label>
        <input
          type="text"
          name="email"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-zinc-400 text-sm mb-2">{t.messageLabel}</label>
        <textarea
          rows={4}
          name="message"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors text-sm resize-none"
        />
      </div>

      {state?.error && <p className="text-red-400 text-sm">{state.error}</p>}
      {state?.success && <p className="text-green-400 text-sm">{t.successMessage}</p>}

      <SubmitButton label={t.submit} pending={isPending} />
    </form>
  );
}
