'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  addServiceAction,
  deleteServiceAction,
  reorderServiceAction,
  updateServiceAction,
} from '../actions';
import type { Service } from '@/lib/types';
import { inputCls } from './styles';

export default function ServicesPanel({ services }: { services: Service[] }) {
  const t = useTranslations('admin.services');
  const [list, setList] = useState(services);
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
      const res = await deleteServiceAction(id);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) => prev.filter((s) => s.id !== id));
      flash(t('deleted'));
    } finally {
      setPendingOp(null);
    }
  };

  const handleReorder = async (id: number, direction: 'up' | 'down') => {
    setPendingOp(`${direction}:${id}`);
    try {
      const res = await reorderServiceAction(id, direction);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) => {
        const sorted = [...prev].sort((a, b) => a.order_index - b.order_index);
        const idx = sorted.findIndex((s) => s.id === id);
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
      const res = await updateServiceAction(fd);
      if (res?.error) {
        return flash(res.error);
      }
      setList((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                id,
                icon: fd.get('icon') as string,
                title: fd.get('title') as string,
                description: fd.get('description') as string,
                title_en: fd.get('title_en') as string,
                description_en: fd.get('description_en') as string,
                order_index: Number(fd.get('order_index')),
              }
            : s,
        ),
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
      const res = await addServiceAction(fd);
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
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
        <h2 className="text-white font-bold text-lg">{t('heading')}</h2>
        <button
          className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
          type="button"
          onClick={() => setAdding((v) => !v)}
        >
          {adding ? t('cancel') : t('add')}
        </button>
      </div>

      {feedback && <p className="text-amber-400 text-sm mb-3">{feedback}</p>}

      {adding && (
        <ServiceForm
          t={t}
          label={t('add').replace('+ ', '')}
          pendingOp={pendingOp}
          onSubmit={handleAdd}
          onCancel={() => setAdding(false)}
        />
      )}

      <div className="flex flex-col gap-3">
        {list.map((service) =>
          editingId === service.id ? (
            <ServiceForm
              key={service.id}
              t={t}
              defaults={service}
              label={t('update')}
              pendingOp={pendingOp}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={service.id}
              className={`flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4 transition-opacity ${pendingOp === `delete:${service.id}` ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <span className="text-2xl">{service.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">
                  {service.title}
                </p>
                <p className="text-zinc-500 text-xs mt-0.5 line-clamp-2">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <div className="flex gap-2">
                  <button
                    disabled={
                      pendingOp !== null ||
                      service.order_index ===
                        Math.min(...list.map((s) => s.order_index))
                    }
                    className={`text-xs transition-colors ${pendingOp === `up:${service.id}` ? 'opacity-40 text-zinc-400' : 'text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed'}`}
                    title="Move up"
                    type="button"
                    onClick={() => handleReorder(service.id, 'up')}
                  >
                    ↑
                  </button>
                  <button
                    disabled={
                      pendingOp !== null ||
                      service.order_index ===
                        Math.max(...list.map((s) => s.order_index))
                    }
                    className={`text-xs transition-colors ${pendingOp === `down:${service.id}` ? 'opacity-40 text-zinc-400' : 'text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed'}`}
                    title="Move down"
                    type="button"
                    onClick={() => handleReorder(service.id, 'down')}
                  >
                    ↓
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={pendingOp !== null}
                    className="text-xs text-zinc-400 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    type="button"
                    onClick={() => setEditingId(service.id)}
                  >
                    {t('edit')}
                  </button>
                  <button
                    disabled={pendingOp !== null}
                    className="text-xs text-zinc-400 hover:text-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    type="button"
                    onClick={() => handleDelete(service.id)}
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function ServiceForm({
  t,
  defaults,
  onSubmit,
  onCancel,
  label,
  pendingOp,
}: {
  t: ReturnType<typeof useTranslations>;
  defaults?: Service;
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
      <div>
        <label className="block text-zinc-400 text-xs mb-1">{t('icon')}</label>
        <input
          required
          name="icon"
          defaultValue={defaults?.icon}
          disabled={pendingOp !== null}
          className={inputCls}
        />
      </div>
      {defaults && (
        <input type="hidden" name="order_index" value={defaults.order_index} />
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-zinc-400 text-xs mb-1">
            {t('title')}
          </label>
          <input
            required
            name="title"
            defaultValue={defaults?.title}
            disabled={pendingOp !== null}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-zinc-400 text-xs mb-1">
            {t('titleEn')}
          </label>
          <input
            name="title_en"
            defaultValue={defaults?.title_en}
            disabled={pendingOp !== null}
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">
          {t('description')}
        </label>
        <textarea
          required
          name="description"
          defaultValue={defaults?.description}
          rows={3}
          disabled={pendingOp !== null}
          className={`${inputCls} resize-none`}
        />
      </div>
      <div>
        <label className="block text-zinc-400 text-xs mb-1">
          {t('descriptionEn')}
        </label>
        <textarea
          name="description_en"
          defaultValue={defaults?.description_en}
          rows={3}
          disabled={pendingOp !== null}
          className={`${inputCls} resize-none`}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pendingOp !== null}
          className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-amber-300 disabled:bg-zinc-600 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '...' : label}
        </button>
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
