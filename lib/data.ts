import { cacheLife, cacheTag } from 'next/cache';
import { createAdminClient } from '@/lib/supabase-server';
import type { SiteInfo, Service, Trainer, Playlist, GalleryPhoto } from '@/lib/types';

async function fetchWithRetry<T>(fn: () => Promise<T>, attempt = 0): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempt < 2) {
      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 500));
      return fetchWithRetry(fn, attempt + 1);
    }
    console.error('Fatal error fetching data after 3 attempts:', error);
    throw error;
  }
}

export async function getSiteInfo(): Promise<SiteInfo> {
  'use cache: remote';
  cacheTag('siteinfo');
  cacheLife('max');

  const db = createAdminClient();
  return fetchWithRetry(async () => {
    const { data, error } = await db.from('site_info').select('*').single();
    if (error) throw new Error(`site_info: ${error.message}`);
    return data as SiteInfo;
  });
}

export async function getServices(): Promise<Service[]> {
  'use cache: remote';
  cacheTag('services');
  cacheLife('max');

  const db = createAdminClient();
  return fetchWithRetry(async () => {
    const { data, error } = await db.from('services').select('*').order('order_index');
    if (error) throw new Error(`services: ${error.message}`);
    return data as Service[];
  });
}

export async function getTrainers(): Promise<Trainer[]> {
  'use cache: remote';
  cacheTag('trainers');
  cacheLife('max');

  const db = createAdminClient();
  return fetchWithRetry(async () => {
    const { data, error } = await db.from('trainers').select('*').order('order_index');
    if (error) throw new Error(`trainers: ${error.message}`);
    return data as Trainer[];
  });
}

export async function getGallery(): Promise<GalleryPhoto[]> {
  'use cache: remote';
  cacheTag('gallery');
  cacheLife('max');

  const db = createAdminClient();
  return fetchWithRetry(async () => {
    const { data, error } = await db.from('gallery').select('*').order('order_index');
    if (error) throw new Error(`gallery: ${error.message}`);
    return data as GalleryPhoto[];
  });
}

export async function getPlaylists(): Promise<Playlist[]> {
  'use cache: remote';
  cacheTag('playlists');
  cacheLife('max');

  const db = createAdminClient();
  return fetchWithRetry(async () => {
    const { data, error } = await db.from('playlists').select('*').order('order_index');
    if (error) throw new Error(`playlists: ${error.message}`);
    return data as Playlist[];
  });
}
