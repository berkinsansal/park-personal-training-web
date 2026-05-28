'use client';

import { useState } from 'react';
import { addTeacherAction, updateTeacherAction, deleteTeacherAction } from '../actions';
import type { Teacher } from '@/lib/types';
import type { Dict } from '@/lib/i18n';
import { inputCls } from './styles';

export default function TeachersPanel({ teachers, dict }: { teachers: Teacher[]; dict: Dict }) {
  const t = dict.admin.teachers;
  const [list, setList] = useState(teachers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');

  const flash = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(''), 2500); };

  const handleDelete = async (id: number) => {
    const res = await deleteTeacherAction(id);
    if (res?.error) return flash(res.error);
    setList((prev) => prev.filter((teacher) => teacher.id !== id));
    flash(t.deleted);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await updateTeacherAction(fd);
    if (res?.error) return flash(res.error);
    const id = Number(fd.get('id'));
    setList((prev) => prev.map((teacher) => teacher.id === id ? {
      id,
      name: fd.get('name') as string,
      ig_handle: fd.get('ig_handle') as string,
      photo_url: teacher.photo_url,
      order_index: Number(fd.get('order_index')),
    } : teacher));
    setEditingId(null);
    flash(t.updated);
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await addTeacherAction(fd);
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
        <TeacherForm t={t} onSubmit={handleAdd} onCancel={() => setAdding(false)} label={t.add.replace('+ ', '')} />
      )}

      <div className="flex flex-col gap-3">
        {list.map((teacher) =>
          editingId === teacher.id ? (
            <TeacherForm
              key={teacher.id}
              t={t}
              defaults={teacher}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
              label={t.update}
            />
          ) : (
            <div key={teacher.id} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 overflow-hidden">
                {teacher.photo_url ? (
                  <img src={teacher.photo_url} alt={teacher.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-amber-400 font-bold text-sm">
                    {teacher.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{teacher.name}</p>
                <p className="text-zinc-500 text-xs mt-0.5">@{teacher.ig_handle}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditingId(teacher.id)} className="text-xs text-zinc-400 hover:text-amber-400 transition-colors">{t.edit}</button>
                <button onClick={() => handleDelete(teacher.id)} className="text-xs text-zinc-400 hover:text-red-400 transition-colors">{t.delete}</button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

type TeacherStrings = Dict['admin']['teachers'];

function TeacherForm({ t, defaults, onSubmit, onCancel, label }: {
  t: TeacherStrings;
  defaults?: Teacher;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  label: string;
}) {
  return (
    <form onSubmit={onSubmit} className="bg-zinc-900 border border-amber-400/30 rounded-xl p-4 flex flex-col gap-3 mb-3">
      {defaults && <input type="hidden" name="id" value={defaults.id} />}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.name}</label>
          <input name="name" defaultValue={defaults?.name} required className={inputCls} />
        </div>
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.order}</label>
          <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.igHandle}</label>
          <input name="ig_handle" defaultValue={defaults?.ig_handle} required className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t.photo}</label>
        {defaults?.photo_url && (
          <img src={defaults.photo_url} alt={defaults.name} className="w-12 h-12 rounded-full object-cover mb-2 border border-zinc-700" />
        )}
        <input name="photo" type="file" accept="image/*" className={inputCls} />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition-colors">{label}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 text-zinc-400 hover:text-white text-xs transition-colors">{t.cancel}</button>
      </div>
    </form>
  );
}
