'use client';

import { useState } from 'react';
import { addServiceAction, updateServiceAction, deleteServiceAction } from '../actions';
import type { Service } from '@/lib/types';
import type { Dict } from '@/lib/i18n';
import { inputCls } from './styles';

export default function ServicesPanel({ services, dict }: { services: Service[]; dict: Dict }) {
  const t = dict.admin.services;
  const [list, setList] = useState(services);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');

  const flash = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(''), 2500); };

  const handleDelete = async (id: number) => {
    const res = await deleteServiceAction(id);
    if (res?.error) return flash(res.error);
    setList((prev) => prev.filter((s) => s.id !== id));
    flash(t.deleted);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await updateServiceAction(fd);
    if (res?.error) return flash(res.error);
    const id = Number(fd.get('id'));
    setList((prev) => prev.map((s) => s.id === id ? {
      id,
      icon: fd.get('icon') as string,
      title: fd.get('title') as string,
      description: fd.get('description') as string,
      title_en: fd.get('title_en') as string,
      description_en: fd.get('description_en') as string,
      order_index: Number(fd.get('order_index')),
    } : s));
    setEditingId(null);
    flash(t.updated);
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await addServiceAction(fd);
    if (res?.error) return flash(res.error);
    setAdding(false);
    flash(t.added);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
        <h2 className="text-white font-bold text-lg">{t.heading}</h2>
        <button
          onClick={() => setAdding((v) => !v)}
          className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
        >
          {adding ? t.cancel : t.add}
        </button>
      </div>

      {feedback && <p className="text-amber-400 text-sm mb-3">{feedback}</p>}

      {adding && (
        <ServiceForm t={t} onSubmit={handleAdd} onCancel={() => setAdding(false)} label={t.add.replace('+ ', '')} />
      )}

      <div className="flex flex-col gap-3">
        {list.map((service) =>
          editingId === service.id ? (
            <ServiceForm
              key={service.id}
              t={t}
              defaults={service}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
              label={t.update}
            />
          ) : (
            <div key={service.id} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <span className="text-2xl">{service.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{service.title}</p>
                <p className="text-zinc-500 text-xs mt-0.5 line-clamp-2">{service.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditingId(service.id)} className="text-xs text-zinc-400 hover:text-amber-400 transition-colors">{t.edit}</button>
                <button onClick={() => handleDelete(service.id)} className="text-xs text-zinc-400 hover:text-red-400 transition-colors">{t.delete}</button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

type ServiceStrings = Dict['admin']['services'];

function ServiceForm({ t, defaults, onSubmit, onCancel, label }: {
  t: ServiceStrings;
  defaults?: Service;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  label: string;
}) {
  return (
    <form onSubmit={onSubmit} className="bg-zinc-900 border border-amber-400/30 rounded-xl p-4 flex flex-col gap-3 mb-3">
      {defaults && <input type="hidden" name="id" value={defaults.id} />}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.icon}</label>
          <input name="icon" defaultValue={defaults?.icon} required className={inputCls} />
        </div>
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.order}</label>
          <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.title}</label>
          <input name="title" defaultValue={defaults?.title} required className={inputCls} />
        </div>
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.titleEn}</label>
          <input name="title_en" defaultValue={defaults?.title_en} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t.description}</label>
        <textarea name="description" defaultValue={defaults?.description} rows={3} required className={inputCls + ' resize-none'} />
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t.descriptionEn}</label>
        <textarea name="description_en" defaultValue={defaults?.description_en} rows={3} className={inputCls + ' resize-none'} />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition-colors">{label}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-zinc-400 hover:text-white text-xs transition-colors">{t.cancel}</button>
      </div>
    </form>
  );
}
