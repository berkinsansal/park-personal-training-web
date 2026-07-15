'use client';

import { Button } from '@/components/ui/button';
import { FeedbackFlash } from '@/components/admin/feedback-flash';
import { ItemRow } from '@/components/admin/item-row';
import { PanelHeader } from '@/components/admin/panel-header';
import type { GalleryPhoto } from '@/lib/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import {
  addGalleryPhotoAction,
  deleteGalleryPhotoAction,
  reorderGalleryPhotoAction,
  updateGalleryPhotoAction,
} from '../actions';
import { inputCls } from './styles';

export default function GalleryPanel({ gallery }: { gallery: GalleryPhoto[] }) {
  const t = useTranslations('admin.gallery');
  const [list, setList] = useState(gallery);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [pendingOp, setPendingOp] = useState<string | null>(null);

  const flash = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 2500);
  };

  const handleDelete = async (id: number) => {
    setPendingOp(`delete:${id}`);
    try {
      const res = await deleteGalleryPhotoAction(id);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) => prev.filter((p) => p.id !== id));
      flash(t('deleted'));
    } finally {
      setPendingOp(null);
    }
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    setPendingOp(`${direction}:${id}`);
    try {
      const res = await reorderGalleryPhotoAction(id, direction);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) => {
        const sorted = [...prev].sort((a, b) => a.order_index - b.order_index);
        const idx = sorted.findIndex((p) => p.id === id);
        if (idx === -1) {
          return prev;
        }
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= sorted.length) {
          return prev;
        }
        const newIdx = sorted[idx].order_index;
        sorted[idx].order_index = sorted[swapIdx].order_index;
        sorted[swapIdx].order_index = newIdx;
        return sorted.sort((a, b) => a.order_index - b.order_index);
      });
    } finally {
      setPendingOp(null);
    }
  };

  const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const id = Number(fd.get('id'));
    setPendingOp(`update:${id}`);
    try {
      const res = await updateGalleryPhotoAction(fd);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) =>
        prev.map((photo) => {
          if (photo.id !== id) {
            return photo;
          }
          return {
            id,
            image_url: res.imageUrl ?? photo.image_url,
            alt_text: fd.get('alt_text') as string,
            order_index: Number(fd.get('order_index')),
          };
        }),
      );
      setEditingId(null);
      flash(t('updated'));
    } finally {
      setPendingOp(null);
    }
  };

  const handleAdd = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const maxOrder =
      list.length > 0 ? Math.max(...list.map((p) => p.order_index)) : -1;
    fd.set('order_index', String(maxOrder + 1));
    setPendingOp('add');
    try {
      const res = await addGalleryPhotoAction(fd);
      if (res?.error) {
        return flash(res.error);
      }
      if (res.data) {
        setList((prev) =>
          [...prev, res.data].sort((a, b) => a.order_index - b.order_index),
        );
      }
      setAdding(false);
      flash(t('added'));
      (e.target as HTMLFormElement).reset();
    } finally {
      setPendingOp(null);
    }
  };

  return (
    <section>
      <PanelHeader
        title={t('heading')}
        isAdding={adding}
        onToggleAdd={() => setAdding((v) => !v)}
      />

      <FeedbackFlash message={feedback} />

      {adding && (
        <GalleryForm
          t={t}
          label={t('add').replace('+ ', '')}
          pendingOp={pendingOp}
          onSubmit={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map((photo) =>
          editingId === photo.id ? (
            <GalleryForm
              key={photo.id}
              t={t}
              defaults={photo}
              label={t('update')}
              pendingOp={pendingOp}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <ItemRow
              key={photo.id}
              className="flex flex-col overflow-hidden"
              isPending={pendingOp === `delete:${photo.id}`}
            >
              <div className="relative w-full h-40 bg-zinc-800">
                {photo.image_url && (
                  <Image
                    fill
                    sizes="100vw"
                    src={photo.image_url}
                    alt={photo.alt_text}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <p className="text-white font-semibold text-sm">
                  {photo.alt_text || '(No description)'}
                </p>
                <div className="flex gap-2 mt-auto pt-2 flex-wrap">
                  <Button
                    disabled={
                      pendingOp !== null ||
                      photo.order_index ===
                        Math.min(...list.map((p) => p.order_index))
                    }
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleReorder(photo.id, 'up')}
                  >
                    ↑
                  </Button>
                  <Button
                    disabled={
                      pendingOp !== null ||
                      photo.order_index ===
                        Math.max(...list.map((p) => p.order_index))
                    }
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleReorder(photo.id, 'down')}
                  >
                    ↓
                  </Button>
                  <Button
                    disabled={pendingOp !== null}
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    onClick={() => setEditingId(photo.id)}
                  >
                    {t('edit')}
                  </Button>
                  <Button
                    disabled={pendingOp !== null}
                    variant="secondary"
                    size="sm"
                    className="text-xs hover:text-red-400"
                    onClick={() => handleDelete(photo.id)}
                  >
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </ItemRow>
          ),
        )}
      </div>
    </section>
  );
}

function GalleryForm({
  t,
  onSubmit,
  onCancel,
  label,
  defaults,
  pendingOp,
}: {
  t: ReturnType<typeof useTranslations>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
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
    <form
      className="bg-zinc-900 border border-amber-400/20 rounded-xl p-4 mb-3"
      onSubmit={onSubmit}
    >
      {defaults && <input type="hidden" name="id" value={defaults.id} />}

      <div className="mb-3">
        <label className="block text-zinc-300 text-sm font-medium mb-2">
          {t('image')}
        </label>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          className={`${inputCls} block`}
          onChange={handleImageChange}
        />
        {preview && (
          <div className="mt-2 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 w-full aspect-video relative">
            <Image
              fill
              sizes="100vw"
              src={preview}
              alt="Preview"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-zinc-300 text-sm font-medium mb-2">
          {t('altText')}
        </label>
        <input
          type="text"
          name="alt_text"
          defaultValue={defaults?.alt_text || ''}
          className={inputCls}
          placeholder="Studio view, group training, equipment..."
        />
      </div>

      <input
        type="hidden"
        name="order_index"
        defaultValue={defaults?.order_index || 0}
      />

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={pendingOp !== null}
        >
          {label}
        </Button>
        <Button
          type="button"
          disabled={pendingOp !== null}
          variant="secondary"
          onClick={onCancel}
        >
          {t('cancel')}
        </Button>
      </div>
    </form>
  );
}
