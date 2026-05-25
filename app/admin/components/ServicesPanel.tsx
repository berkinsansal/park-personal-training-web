'use client';

import { useState } from 'react';
import { addServiceAction, updateServiceAction, deleteServiceAction } from '../actions';

type Service = {
  id: number;
  icon: string;
  title: string;
  description: string;
  order_index: number;
};

export default function ServicesPanel({ services }: { services: Service[] }) {
  const [list, setList] = useState(services);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');

  const flash = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(''), 2500); };

  const handleDelete = async (id: number) => {
    const res = await deleteServiceAction(id);
    if (res?.error) return flash(res.error);
    setList((prev) => prev.filter((s) => s.id !== id));
    flash('Silindi.');
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
      order_index: Number(fd.get('order_index')),
    } : s));
    setEditingId(null);
    flash('Güncellendi.');
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await addServiceAction(fd);
    if (res?.error) return flash(res.error);
    setAdding(false);
    flash('Eklendi. Sayfayı yenileyin.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
        <h2 className="text-white font-bold text-lg">Hizmetler</h2>
        <button
          onClick={() => setAdding((v) => !v)}
          className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
        >
          {adding ? 'İptal' : '+ Ekle'}
        </button>
      </div>

      {feedback && <p className="text-amber-400 text-sm mb-3">{feedback}</p>}

      {adding && (
        <ServiceForm onSubmit={handleAdd} onCancel={() => setAdding(false)} label="Ekle" />
      )}

      <div className="flex flex-col gap-3">
        {list.map((service) =>
          editingId === service.id ? (
            <ServiceForm
              key={service.id}
              defaults={service}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
              label="Güncelle"
            />
          ) : (
            <div key={service.id} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <span className="text-2xl">{service.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{service.title}</p>
                <p className="text-zinc-500 text-xs mt-0.5 line-clamp-2">{service.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditingId(service.id)} className="text-xs text-zinc-400 hover:text-amber-400 transition-colors">Düzenle</button>
                <button onClick={() => handleDelete(service.id)} className="text-xs text-zinc-400 hover:text-red-400 transition-colors">Sil</button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function ServiceForm({ defaults, onSubmit, onCancel, label }: {
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
          <label className="block text-zinc-400 text-xs mb-1">İkon (emoji)</label>
          <input name="icon" defaultValue={defaults?.icon} required className={inputCls} />
        </div>
        <div>
          <label className="block text-zinc-400 text-xs mb-1">Sıra</label>
          <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">Başlık</label>
        <input name="title" defaultValue={defaults?.title} required className={inputCls} />
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">Açıklama</label>
        <textarea name="description" defaultValue={defaults?.description} rows={3} required className={inputCls + ' resize-none'} />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition-colors">{label}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-zinc-400 hover:text-white text-xs transition-colors">İptal</button>
      </div>
    </form>
  );
}

const inputCls = 'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors';
