'use client';

import { useState } from 'react';
import { addTeacherAction, updateTeacherAction, deleteTeacherAction, reorderTeacherAction } from '../actions';
import type { Teacher } from '@/lib/types';
import type { Dict } from '@/lib/i18n';
import { inputCls } from './styles';

export default function TeachersPanel({ teachers, dict }: { teachers: Teacher[]; dict: Dict }) {
  const t = dict.admin.teachers;
  const [list, setList] = useState(teachers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [pendingOp, setPendingOp] = useState<string | null>(null);

  const flash = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(''), 2500); };

  const handleDelete = async (id: number) => {
    setPendingOp(`delete:${id}`);
    try {
      const res = await deleteTeacherAction(id);
      if (res?.error) return flash(res.error);
      setList((prev) => prev.filter((teacher) => teacher.id !== id));
      flash(t.deleted);
    } finally {
      setPendingOp(null);
    }
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    setPendingOp(`${direction}:${id}`);
    try {
      const res = await reorderTeacherAction(id, direction);
      if (res?.error) return flash(res.error);
      setList((prev) => {
        const sorted = [...prev].sort((a, b) => a.order_index - b.order_index);
        const idx = sorted.findIndex((t) => t.id === id);
        if (idx === -1) return prev;
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= sorted.length) return prev;
        const newIdx = sorted[idx].order_index;
        sorted[idx].order_index = sorted[swapIdx].order_index;
        sorted[swapIdx].order_index = newIdx;
        return sorted.sort((a, b) => a.order_index - b.order_index);
      });
    } finally {
      setPendingOp(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const id = Number(fd.get('id'));
    setPendingOp(`update:${id}`);
    try {
      const res = await updateTeacherAction(fd);
      if (res?.error) return flash(res.error);
      setList((prev) => prev.map((teacher) => {
        if (teacher.id !== id) return teacher;
        return {
          id,
          name: fd.get('name') as string,
          ig_handle: fd.get('ig_handle') as string,
          photo_url: res.photoUrl ?? teacher.photo_url,
          order_index: Number(fd.get('order_index')),
        };
      }));
      setEditingId(null);
      flash(t.updated);
    } finally {
      setPendingOp(null);
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPendingOp('add');
    try {
      const res = await addTeacherAction(fd);
      if (res?.error) return flash(res.error);
      if (res.data) {
        setList((prev) => [...prev, res.data].sort((a, b) => a.order_index - b.order_index));
      }
      setAdding(false);
      flash(t.added);
      (e.target as HTMLFormElement).reset();
    } finally {
      setPendingOp(null);
    }
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
        <TeacherForm t={t} onSubmit={handleAdd} onCancel={() => setAdding(false)} label={t.add.replace('+ ', '')} pendingOp={pendingOp} />
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
              pendingOp={pendingOp}
            />
          ) : (
            <div key={teacher.id} className={`flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4 transition-opacity ${pendingOp === `delete:${teacher.id}` ? 'opacity-50 pointer-events-none' : ''}`}>
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
              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex gap-2">
                  <button onClick={() => handleReorder(teacher.id, 'up')} disabled={pendingOp !== null || teacher.order_index === Math.min(...list.map(t => t.order_index))} className={`text-xs transition-colors ${pendingOp === `up:${teacher.id}` ? 'opacity-40 text-zinc-400' : 'text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed'}`} title="Move up">↑</button>
                  <button onClick={() => handleReorder(teacher.id, 'down')} disabled={pendingOp !== null || teacher.order_index === Math.max(...list.map(t => t.order_index))} className={`text-xs transition-colors ${pendingOp === `down:${teacher.id}` ? 'opacity-40 text-zinc-400' : 'text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed'}`} title="Move down">↓</button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(teacher.id)} disabled={pendingOp !== null} className="text-xs text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">{t.edit}</button>
                  <button onClick={() => handleDelete(teacher.id)} disabled={pendingOp !== null} className="text-xs text-zinc-400 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">{t.delete}</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

type TeacherStrings = Dict['admin']['teachers'];

function TeacherForm({ t, defaults, onSubmit, onCancel, label, pendingOp }: {
  t: TeacherStrings;
  defaults?: Teacher;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  label: string;
  pendingOp: string | null;
}) {
  const isSubmitting = pendingOp === 'add' || (defaults && pendingOp === `update:${defaults.id}`);
  return (
    <form onSubmit={onSubmit} className="bg-zinc-900 border border-amber-400/30 rounded-xl p-4 flex flex-col gap-3 mb-3">
      {defaults && <input type="hidden" name="id" value={defaults.id} />}
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t.name}</label>
        <input name="name" defaultValue={defaults?.name} required disabled={pendingOp !== null} className={inputCls} />
      </div>
      {defaults && <input type="hidden" name="order_index" value={defaults.order_index} />}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-400 text-xs mb-1">{t.igHandle}</label>
          <input name="ig_handle" defaultValue={defaults?.ig_handle} required disabled={pendingOp !== null} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t.photo}</label>
        {defaults?.photo_url && (
          <>
            <img src={defaults.photo_url} alt={defaults.name} className="w-12 h-12 rounded-full object-cover mb-2 border border-zinc-700" />
            <label className="flex items-center gap-2 text-zinc-400 text-xs cursor-pointer mb-2">
              <input type="checkbox" name="removePhoto" disabled={pendingOp !== null} className="w-3 h-3 rounded border-zinc-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed" />
              {t.removePhoto}
            </label>
          </>
        )}
        <input name="photo" type="file" accept="image/*" disabled={pendingOp !== null} className={inputCls} />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={pendingOp !== null} className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-amber-300 disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors">{isSubmitting ? '...' : label}</button>
        <button type="button" onClick={onCancel} disabled={pendingOp !== null} className="px-4 py-2 text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors">{t.cancel}</button>
      </div>
    </form>
  );
}
