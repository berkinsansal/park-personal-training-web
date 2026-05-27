'use client';

import { useActionState } from 'react';
import { updateSiteInfoAction } from '../actions';
import type { SiteInfo } from '@/lib/types';

export default function SiteInfoForm({ data }: { data: SiteInfo | null }) {
  const [state, action, pending] = useActionState(updateSiteInfoAction, null);

  if (!data) return null;

  return (
    <section>
      <h2 className="text-white font-bold text-lg mb-4 pb-2 border-b border-zinc-800">Genel Bilgiler</h2>
      <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Instagram Hesabı" name="ig_handle" defaultValue={data.ig_handle} />
        <Field label="Telefon" name="phone" defaultValue={data.phone} />
        <Field label="Adres Satır 1" name="address_line1" defaultValue={data.address_line1} />
        <Field label="Adres Satır 2" name="address_line2" defaultValue={data.address_line2} />
        <Field label="Hafta içi Saatler" name="weekday_hours" defaultValue={data.weekday_hours} />
        <Field label="Hafta sonu Saatler" name="weekend_hours" defaultValue={data.weekend_hours} />
        <Field label="Mutlu Müşteri Sayısı" name="happy_customers" type="number" defaultValue={String(data.happy_customers)} />
        <Field label="Deneyim Yılı" name="years_experience" type="number" defaultValue={String(data.years_experience)} />

        <div className="sm:col-span-2 flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm disabled:opacity-50"
          >
            {pending ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
          {state?.success && <span className="text-green-400 text-sm">Kaydedildi!</span>}
          {state?.error && <span className="text-red-400 text-sm">{state.error}</span>}
        </div>
      </form>
    </section>
  );
}

function Field({ label, name, defaultValue, type = 'text' }: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-zinc-400 text-xs mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
      />
    </div>
  );
}
