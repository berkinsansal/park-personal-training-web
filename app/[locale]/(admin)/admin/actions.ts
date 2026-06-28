'use server';

import { createAdminClient, createSessionClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';
import { getLocale, getTranslations } from 'next-intl/server';

async function requireAuth() {
  const supabase = await createSessionClient();
  const { data: { user } } = await supabase.auth.getUser();
  const locale = await getLocale();
  if (!user) {redirect(`/${locale === 'en' ? 'en/' : ''}admin/login`);}
  return supabase;
}


async function reorderItem(
  table: 'services' | 'trainers' | 'playlists' | 'gallery',
  id: number,
  direction: 'up' | 'down',
) {
  const db = createAdminClient();
  const { data: items } = await db.from(table).select('id, order_index').order('order_index');
  if (!items) {return { error: 'Not found' };}

  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) {return { error: 'Not found' };}

  const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= items.length) {return { error: 'Cannot reorder' };}

  const now = new Date().toISOString();
  await Promise.all([
    db.from(table).update({ order_index: items[swapIdx].order_index, updated_at: now }).eq('id', id),
    db.from(table).update({ order_index: items[idx].order_index, updated_at: now }).eq('id', items[swapIdx].id),
  ]);

  updateTag(table);
  return { success: true };
}

// Auth
export async function loginAction(_prev: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const t = await getTranslations('admin.login');
    return { error: t('error') };
  }

  const locale = await getLocale();
  const redirectPath = locale === 'en' ? '/en/admin' : '/admin';
  redirect(redirectPath);
}

export async function logoutAction() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  const locale = await getLocale();
  redirect(`/${locale === 'en' ? 'en/' : ''}admin/login`);
}

// Site Info
export async function updateSiteInfoAction(_prev: unknown, formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('site_info').update({
    ig_handle: formData.get('ig_handle'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address_line1: formData.get('address_line1'),
    address_line2: formData.get('address_line2'),
    weekday_hours: formData.get('weekday_hours'),
    weekend_hours: formData.get('weekend_hours'),
    address_line1_en: formData.get('address_line1_en'),
    address_line2_en: formData.get('address_line2_en'),
    weekday_hours_en: formData.get('weekday_hours_en'),
    weekend_hours_en: formData.get('weekend_hours_en'),
    happy_customers: Number(formData.get('happy_customers')),
    years_experience: Number(formData.get('years_experience')),
    latitude: Number(formData.get('latitude')),
    longitude: Number(formData.get('longitude')),
    updated_at: new Date().toISOString(),
  }).eq('id', 1);

  if (error) {return { error: error.message };}
  updateTag('siteinfo');
  return { success: true };
}

// Services
export async function addServiceAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { data, error } = await db.from('services').insert({
    icon: formData.get('icon'),
    title: formData.get('title'),
    description: formData.get('description'),
    title_en: formData.get('title_en') ?? '',
    description_en: formData.get('description_en') ?? '',
    order_index: Number(formData.get('order_index') || 0),
  }).select('*').single();

  if (error) {return { error: error.message };}
  updateTag('services');
  return { success: true, data };
}

export async function updateServiceAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('services').update({
    icon: formData.get('icon'),
    title: formData.get('title'),
    description: formData.get('description'),
    title_en: formData.get('title_en') ?? '',
    description_en: formData.get('description_en') ?? '',
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  }).eq('id', Number(formData.get('id')));

  if (error) {return { error: error.message };}
  updateTag('services');
  return { success: true };
}

export async function deleteServiceAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('services').delete().eq('id', id);
  if (error) {return { error: error.message };}
  updateTag('services');
  return { success: true };
}

export async function reorderServiceAction(id: number, direction: 'up' | 'down') {
  await requireAuth();
  return reorderItem('services', id, direction);
}

// Trainers
const PHOTO_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

function getFileExt(file: File): string {
  const parts = file.name.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : 'jpg';
}

export async function addTrainerAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { data: inserted, error } = await db.from('trainers').insert({
    name: formData.get('name'),
    ig_handle: formData.get('ig_handle'),
    order_index: Number(formData.get('order_index') || 0),
  }).select('*').single();

  if (error) {return { error: error.message };}

  let photo_url = '';
  const photo = formData.get('photo');
  if (photo instanceof File && photo.size > 0) {
    const ext = getFileExt(photo);
    const path = `${inserted.id}.${ext}`;
    const { error: uploadError } = await db.storage.from('trainer-photos').upload(path, photo, { upsert: true });
    if (!uploadError) {
      const { data: { publicUrl } } = db.storage.from('trainer-photos').getPublicUrl(path);
      await db.from('trainers').update({ photo_url: publicUrl }).eq('id', inserted.id);
      photo_url = publicUrl;
    }
  }

  updateTag('trainers');
  return { success: true, data: { ...inserted, photo_url } };
}

export async function updateTrainerAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();
  const id = Number(formData.get('id'));

  const updates: Record<string, unknown> = {
    name: formData.get('name'),
    ig_handle: formData.get('ig_handle'),
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  };

  let photoUrl: string | null = null;
  const removePhoto = formData.get('removePhoto') === 'on';
  const photo = formData.get('photo');

  if (removePhoto) {
    await Promise.allSettled(PHOTO_EXTS.map((e) => db.storage.from('trainer-photos').remove([`${id}.${e}`])));
    updates.photo_url = '';
    photoUrl = '';
  }

  if (photo instanceof File && photo.size > 0) {
    if (!removePhoto) {
      await Promise.allSettled(PHOTO_EXTS.map((e) => db.storage.from('trainer-photos').remove([`${id}.${e}`])));
    }
    const ext = getFileExt(photo);
    const path = `${id}.${ext}`;
    const { error: uploadError } = await db.storage.from('trainer-photos').upload(path, photo, { upsert: true });
    if (!uploadError) {
      const { data: { publicUrl } } = db.storage.from('trainer-photos').getPublicUrl(path);
      updates.photo_url = publicUrl;
      photoUrl = publicUrl;
    }
  }

  const { error } = await db.from('trainers').update(updates).eq('id', id);
  if (error) {return { error: error.message };}
  updateTag('trainers');
  return { success: true, photoUrl };
}

export async function deleteTrainerAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { data: trainer } = await db.from('trainers').select('photo_url').eq('id', id).single();
  const { error } = await db.from('trainers').delete().eq('id', id);
  if (error) {return { error: error.message };}

  if (trainer?.photo_url) {
    const marker = '/trainer-photos/';
    const idx = trainer.photo_url.indexOf(marker);
    if (idx !== -1) {
      const storagePath = trainer.photo_url.slice(idx + marker.length);
      await db.storage.from('trainer-photos').remove([storagePath]);
    }
  }

  updateTag('trainers');
  return { success: true };
}

export async function reorderTrainerAction(id: number, direction: 'up' | 'down') {
  await requireAuth();
  return reorderItem('trainers', id, direction);
}

// Playlists
export async function addPlaylistAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { data, error } = await db.from('playlists').insert({
    title: formData.get('title'),
    spotify_id: formData.get('spotify_id'),
    order_index: Number(formData.get('order_index') || 0),
  }).select('*').single();

  if (error) {return { error: error.message };}
  updateTag('playlists');
  return { success: true, data };
}

export async function updatePlaylistAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('playlists').update({
    title: formData.get('title'),
    spotify_id: formData.get('spotify_id'),
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  }).eq('id', Number(formData.get('id')));

  if (error) {return { error: error.message };}
  updateTag('playlists');
  return { success: true };
}

export async function deletePlaylistAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('playlists').delete().eq('id', id);
  if (error) {return { error: error.message };}
  updateTag('playlists');
  return { success: true };
}

export async function reorderPlaylistAction(id: number, direction: 'up' | 'down') {
  await requireAuth();
  return reorderItem('playlists', id, direction);
}

// Gallery
const GALLERY_EXTS = ['jpg', 'jpeg', 'png', 'webp'];

export async function addGalleryPhotoAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { data: inserted, error } = await db.from('gallery').insert({
    alt_text: formData.get('alt_text') || '',
    image_url: '',
    order_index: Number(formData.get('order_index') || 0),
  }).select('*').single();

  if (error) {return { error: error.message };}

  let image_url = '';
  const image = formData.get('image');
  if (image instanceof File && image.size > 0) {
    const ext = getFileExt(image);
    const path = `${inserted.id}.${ext}`;
    const { error: uploadError } = await db.storage.from('gallery-images').upload(path, image, { upsert: true });
    if (!uploadError) {
      const { data: { publicUrl } } = db.storage.from('gallery-images').getPublicUrl(path);
      await db.from('gallery').update({ image_url: publicUrl }).eq('id', inserted.id);
      image_url = publicUrl;
    }
  }

  updateTag('gallery');
  return { success: true, data: { ...inserted, image_url } };
}

export async function updateGalleryPhotoAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();
  const id = Number(formData.get('id'));

  const updates: Record<string, unknown> = {
    alt_text: formData.get('alt_text') || '',
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  };

  let imageUrl: string | null = null;
  const image = formData.get('image');

  if (image instanceof File && image.size > 0) {
    await Promise.allSettled(GALLERY_EXTS.map((e) => db.storage.from('gallery-images').remove([`${id}.${e}`])));
    const ext = getFileExt(image);
    const path = `${id}.${ext}`;
    const { error: uploadError } = await db.storage.from('gallery-images').upload(path, image, { upsert: true });
    if (!uploadError) {
      const { data: { publicUrl } } = db.storage.from('gallery-images').getPublicUrl(path);
      updates.image_url = publicUrl;
      imageUrl = publicUrl;
    }
  }

  const { error } = await db.from('gallery').update(updates).eq('id', id);
  if (error) {return { error: error.message };}
  updateTag('gallery');
  return { success: true, imageUrl };
}

export async function deleteGalleryPhotoAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { data: photo } = await db.from('gallery').select('image_url').eq('id', id).single();
  const { error } = await db.from('gallery').delete().eq('id', id);
  if (error) {return { error: error.message };}

  if (photo?.image_url) {
    const marker = '/gallery-images/';
    const idx = photo.image_url.indexOf(marker);
    if (idx !== -1) {
      const storagePath = photo.image_url.slice(idx + marker.length);
      await db.storage.from('gallery-images').remove([storagePath]);
    }
  }

  updateTag('gallery');
  return { success: true };
}

export async function reorderGalleryPhotoAction(id: number, direction: 'up' | 'down') {
  await requireAuth();
  return reorderItem('gallery', id, direction);
}
