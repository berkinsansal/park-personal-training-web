'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { updateSiteInfoAction } from '../actions';
import type { SiteInfo } from '@/lib/types';

export default function SiteInfoForm({ data }: { data: SiteInfo | null }) {
  const t = useTranslations('admin.siteInfo');
  const [state, action, pending] = useActionState(updateSiteInfoAction, null);

  if (!data) return null;

  return (
    <section>
      <h2 className="text-white font-bold text-lg mb-4 pb-2 border-b border-zinc-800">{t('heading')}</h2>
      <form action={action} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={t('igHandle')} name="ig_handle" defaultValue={data.ig_handle} />
        <Field label={t('phone')} name="phone" defaultValue={data.phone} />
        <Field label={t('email')} name="email" defaultValue={data.email} />
        <Field label={t('addressLine1')} name="address_line1" defaultValue={data.address_line1} />
        <Field label={t('addressLine1En')} name="address_line1_en" defaultValue={data.address_line1_en} />
        <Field label={t('addressLine2')} name="address_line2" defaultValue={data.address_line2} />
        <Field label={t('addressLine2En')} name="address_line2_en" defaultValue={data.address_line2_en} />
        <Field label={t('weekdayHours')} name="weekday_hours" defaultValue={data.weekday_hours} />
        <Field label={t('weekdayHoursEn')} name="weekday_hours_en" defaultValue={data.weekday_hours_en} />
        <Field label={t('weekendHours')} name="weekend_hours" defaultValue={data.weekend_hours} />
        <Field label={t('weekendHoursEn')} name="weekend_hours_en" defaultValue={data.weekend_hours_en} />
        <Field label={t('happyCustomers')} name="happy_customers" type="number" defaultValue={String(data.happy_customers)} />
        <Field label={t('yearsExperience')} name="years_experience" type="number" defaultValue={String(data.years_experience)} />
        <Field label={t('latitude')} name="latitude" type="number" step="0.00000001" defaultValue={String(data.latitude)} />
        <Field label={t('longitude')} name="longitude" type="number" step="0.00000001" defaultValue={String(data.longitude)} />

        <div className="sm:col-span-2 flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={pending}
            className="px-6 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-300 transition-colors text-sm disabled:opacity-50"
          >
            {pending ? t('saving') : t('save')}
          </button>
          {state?.success && <span className="text-green-400 text-sm">{t('saved')}</span>}
          {state?.error && <span className="text-red-400 text-sm">{state.error}</span>}
        </div>
      </form>
    </section>
  );
}

function Field({ label, name, defaultValue, type = 'text', step }: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-zinc-400 text-xs mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        step={step}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
      />
    </div>
  );
}
