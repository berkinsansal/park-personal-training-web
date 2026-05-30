'use client';

import { useState } from 'react';
import { addGalleryPhotoAction, updateGalleryPhotoAction, deleteGalleryPhotoAction, reorderGalleryPhotoAction } from '../actions';
import type { GalleryPhoto } from '@/lib/types';
import type { Dict } from '@/lib/i18n';
import { inputCls } from './styles';

export default function GalleryPanel({ gallery, dict }: { gallery: GalleryPhoto[]; dict: Dict }) {
  const t = dict.admin.gallery;
  const [list, setList] = useState(gallery);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [pendingOp, setPendingOp] = useState<string | null>(null);

  const flash = (msg: string) => { setFeedback(msg); setTimeout(() => setFeedback(''), 2500); };

  const handleDelete = async (id: number) => {
    setPendingOp(`delete:${id}`);
    try {
      const res = await deleteGalleryPhotoAction(id);
      if (res?.error) return flash(res.error);
      setList((prev) => prev.filter((p) => p.id !== id));
      flash(t.deleted);
    } finally {
      setPendingOp(null);
    }
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    setPendingOp(`${direction}:${id}`);
    try {
      const res = await reorderGalleryPhotoAction(id, direction);
      if (res?.error) return flash(res.error);
      setList((prev) => {
        const sorted = [...prev].sort((a, b) => a.order_index - b.order_index);
        const idx = sorted.findIndex((p) => p.id === id);
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
      const res = await updateGalleryPhotoAction(fd);
      if (res?.error) return flash(res.error);
      setList((prev) => prev.map((photo) => {
        if (photo.id !== id) return photo;
        return {
          id,
          image_url: res.imageUrl ?? photo.image_url,
          alt_text: fd.get('alt_text') as string,
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
      const res = await addGalleryPhotoAction(fd);
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
        <GalleryForm t={t} onSubmit={handleAdd} onCancel={() => setAdding(false)} label={t.add.replace('+ ', '')} pendingOp={pendingOp} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map((photo) =>
          editingId === photo.id ? (
            <GalleryForm
              key={photo.id}
              t={t}
              defaults={photo}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
              label={t.update}
              pendingOp={pendingOp}
            />
          ) : (
            <div key={photo.id} className={`flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-opacity ${pendingOp === `delete:${photo.id}` ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="relative w-full h-40 bg-zinc-800">
                {photo.image_url && (
                  <img src={photo.image_url} alt={photo.alt_text} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <p className="text-white font-semibold text-sm">{photo.alt_text || '(No description)'}</p>
                <div className="flex gap-2 mt-auto pt-2 flex-wrap">
                  <button onClick={() => handleReorder(photo.id, 'up')} disabled={pendingOp !== null || photo.order_index === Math.min(...list.map(p => p.order_index))} className={`text-xs px-2 py-1 rounded transition-colors ${pendingOp === `up:${photo.id}` ? 'opacity-40 text-zinc-400 bg-zinc-800' : 'text-zinc-400 hover:text-amber-400 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed'}`} title="Move up">↑</button>
                  <button onClick={() => handleReorder(photo.id, 'down')} disabled={pendingOp !== null || photo.order_index === Math.max(...list.map(p => p.order_index))} className={`text-xs px-2 py-1 rounded transition-colors ${pendingOp === `down:${photo.id}` ? 'opacity-40 text-zinc-400 bg-zinc-800' : 'text-zinc-400 hover:text-amber-400 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed'}`} title="Move down">↓</button>
                  <button onClick={() => setEditingId(photo.id)} disabled={pendingOp !== null} className="text-xs px-2 py-1 rounded text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-zinc-800 hover:bg-zinc-700">{t.edit}</button>
                  <button onClick={() => handleDelete(photo.id)} disabled={pendingOp !== null} className="text-xs px-2 py-1 rounded text-zinc-400 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-zinc-800 hover:bg-zinc-700">{t.delete}</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

type GalleryStrings = Dict['admin']['gallery'];

function GalleryForm({
  t, onSubmit, onCancel, label, defaults, pendingOp
}: {
  t: GalleryStrings;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onCancel: () => void;
  label: string;
  defaults?: GalleryPhoto;
  pendingOp: string | null;
}) {
  const [preview, setPreview] = useState(defaults?.image_url || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-zinc-900 border border-amber-400/20 rounded-xl p-4 mb-3">
      {defaults && <input type="hidden" name="id" value={defaults.id} />}

      <div className="mb-3">
        <label className="block text-zinc-300 text-sm font-medium mb-2">{t.image}</label>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className={`${inputCls} block`}
        />
        {preview && (
          <div className="mt-2 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 w-full max-h-48">
            <img src={preview} alt="Preview" className="w-full h-auto object-cover max-h-48" />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-zinc-300 text-sm font-medium mb-2">{t.altText}</label>
        <input
          type="text"
          name="alt_text"
          defaultValue={defaults?.alt_text || ''}
          className={inputCls}
          placeholder="Studio view, group training, equipment..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-zinc-300 text-sm font-medium mb-2">{t.order}</label>
        <input
          type="number"
          name="order_index"
          defaultValue={defaults?.order_index || 0}
          className={inputCls}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pendingOp !== null}
          className="flex-1 px-3 py-2 bg-amber-400 text-zinc-950 font-semibold rounded-lg hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={pendingOp !== null}
          className="flex-1 px-3 py-2 bg-zinc-800 text-zinc-300 font-semibold rounded-lg hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {t.cancel}
        </button>
      </div>
    </form>
  );
}
