'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  addPlaylistAction,
  deletePlaylistAction,
  reorderPlaylistAction,
  updatePlaylistAction,
} from '../actions';
import type { Playlist } from '@/lib/types';
import { inputCls } from './styles';
import { Button } from '@/components/ui/button';
import { PanelHeader } from '@/components/admin/panel-header';
import { FeedbackFlash } from '@/components/admin/feedback-flash';
import { ItemRow } from '@/components/admin/item-row';

export default function PlaylistsPanel({
  playlists,
}: {
  playlists: Playlist[];
}) {
  const t = useTranslations('admin.playlists');
  const [list, setList] = useState(playlists);
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
      const res = await deletePlaylistAction(id);
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
      const res = await reorderPlaylistAction(id, direction);
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
      const res = await updatePlaylistAction(fd);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) =>
        prev.map((p) => {
          if (p.id !== id) {
            return p;
          }
          return {
            id,
            spotify_id: fd.get('spotify_id') as string,
            title: fd.get('title') as string,
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
    setPendingOp('add');
    try {
      const res = await addPlaylistAction(fd);
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
        <PlaylistForm
          t={t}
          label={t('add').replace('+ ', '')}
          pendingOp={pendingOp}
          onSubmit={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="flex flex-col gap-3">
        {list.map((playlist) =>
          editingId === playlist.id ? (
            <PlaylistForm
              key={playlist.id}
              t={t}
              defaults={playlist}
              label={t('update')}
              pendingOp={pendingOp}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <ItemRow
              key={playlist.id}
              className="flex items-center gap-4"
              isPending={pendingOp === `delete:${playlist.id}`}
            >
              <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 text-green-400 text-xl">
                🎵
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">
                  {playlist.title}
                </p>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {playlist.spotify_id}
                </p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex gap-2">
                  <button
                    disabled={
                      pendingOp !== null ||
                      playlist.order_index ===
                        Math.min(...list.map((p) => p.order_index))
                    }
                    className={`text-xs transition-colors ${pendingOp === `up:${playlist.id}` ? 'opacity-40 text-zinc-400' : 'text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed'}`}
                    type="button"
                    onClick={() => handleReorder(playlist.id, 'up')}
                  >
                    ↑
                  </button>
                  <button
                    disabled={
                      pendingOp !== null ||
                      playlist.order_index ===
                        Math.max(...list.map((p) => p.order_index))
                    }
                    className={`text-xs transition-colors ${pendingOp === `down:${playlist.id}` ? 'opacity-40 text-zinc-400' : 'text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed'}`}
                    type="button"
                    onClick={() => handleReorder(playlist.id, 'down')}
                  >
                    ↓
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={pendingOp !== null}
                    className="text-xs text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    type="button"
                    onClick={() => setEditingId(playlist.id)}
                  >
                    {t('edit')}
                  </button>
                  <button
                    disabled={pendingOp !== null}
                    className="text-xs text-zinc-400 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    type="button"
                    onClick={() => handleDelete(playlist.id)}
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            </ItemRow>
          ),
        )}
      </div>
    </section>
  );
}

function PlaylistForm({
  t,
  defaults,
  onSubmit,
  onCancel,
  label,
  pendingOp,
}: {
  t: ReturnType<typeof useTranslations>;
  defaults?: Playlist;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  label: string;
  pendingOp: string | null;
}) {
  const isSubmitting =
    pendingOp === 'add' || (defaults && pendingOp === `update:${defaults.id}`);
  return (
    <form
      className="bg-zinc-900 border border-amber-400/30 rounded-xl p-4 flex flex-col gap-3 mb-3"
      onSubmit={onSubmit}
    >
      {defaults && <input type="hidden" name="id" value={defaults.id} />}
      {defaults && (
        <input type="hidden" name="order_index" value={defaults.order_index} />
      )}
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t('title')}</label>
        <input
          required
          name="title"
          defaultValue={defaults?.title}
          disabled={pendingOp !== null}
          className={inputCls}
          placeholder="e.g. Morning Workout"
        />
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">
          {t('spotifyId')}
        </label>
        <input
          required
          name="spotify_id"
          defaultValue={defaults?.spotify_id}
          disabled={pendingOp !== null}
          className={inputCls}
          placeholder="e.g. 37i9dQZF1DX8FwnYE6PRvL"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={pendingOp !== null}
          variant="primary"
          size="sm"
        >
          {isSubmitting ? '...' : label}
        </Button>
        <button
          type="button"
          disabled={pendingOp !== null}
          className="px-4 py-2 text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs transition-colors"
          onClick={onCancel}
        >
          {t('cancel')}
        </button>
      </div>
    </form>
  );
}
