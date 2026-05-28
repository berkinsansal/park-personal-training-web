'use server';

import { createAdminClient, createSessionClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { updateTag } from 'next/cache';

async function requireAuth() {
  const supabase = await createSessionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  return supabase;
}

function invalidateHomepage() {
  updateTag('homepage-tr');
  updateTag('homepage-en');
}

// Auth
export async function loginAction(_prev: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: 'Geçersiz e-posta veya şifre.' };

  redirect('/admin');
}

export async function logoutAction() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// Site Info
export async function updateSiteInfoAction(_prev: unknown, formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('site_info').update({
    ig_handle: formData.get('ig_handle'),
    phone: formData.get('phone'),
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
    updated_at: new Date().toISOString(),
  }).eq('id', 1);

  if (error) return { error: error.message };
  invalidateHomepage();
  return { success: true };
}

// Services
export async function addServiceAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('services').insert({
    icon: formData.get('icon'),
    title: formData.get('title'),
    description: formData.get('description'),
    title_en: formData.get('title_en') ?? '',
    description_en: formData.get('description_en') ?? '',
    order_index: Number(formData.get('order_index') || 0),
  });

  if (error) return { error: error.message };
  invalidateHomepage();
  return { success: true };
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

  if (error) return { error: error.message };
  invalidateHomepage();
  return { success: true };
}

export async function deleteServiceAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('services').delete().eq('id', id);
  if (error) return { error: error.message };
  invalidateHomepage();
  return { success: true };
}

export async function reorderServiceAction(id: number, direction: 'up' | 'down') {
  await requireAuth();
  const db = createAdminClient();

  const { data: current } = await db.from('services').select('order_index').eq('id', id).single();
  if (!current) return { error: 'Service not found' };

  const { data: other } = await db.from('services')
    .select('id, order_index')
    .eq('order_index', direction === 'up' ? current.order_index - 1 : current.order_index + 1)
    .single();

  if (!other) return { error: 'Cannot reorder' };

  await Promise.all([
    db.from('services').update({ order_index: other.order_index, updated_at: new Date().toISOString() }).eq('id', id),
    db.from('services').update({ order_index: current.order_index, updated_at: new Date().toISOString() }).eq('id', other.id),
  ]);

  invalidateHomepage();
  return { success: true };
}

// Teachers
const PHOTO_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

function getFileExt(file: File): string {
  const parts = file.name.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : 'jpg';
}

export async function addTeacherAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { data, error } = await db.from('teachers').insert({
    name: formData.get('name'),
    ig_handle: formData.get('ig_handle'),
    order_index: Number(formData.get('order_index') || 0),
  }).select('id').single();

  if (error) return { error: error.message };

  const photo = formData.get('photo');
  if (photo instanceof File && photo.size > 0) {
    const ext = getFileExt(photo);
    const path = `${data.id}.${ext}`;
    const { error: uploadError } = await db.storage.from('teacher-photos').upload(path, photo, { upsert: true });
    if (!uploadError) {
      const { data: { publicUrl } } = db.storage.from('teacher-photos').getPublicUrl(path);
      await db.from('teachers').update({ photo_url: publicUrl }).eq('id', data.id);
    }
  }

  invalidateHomepage();
  return { success: true };
}

export async function updateTeacherAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();
  const id = Number(formData.get('id'));

  const updates: Record<string, unknown> = {
    name: formData.get('name'),
    ig_handle: formData.get('ig_handle'),
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  };

  const removePhoto = formData.get('removePhoto') === 'on';
  const photo = formData.get('photo');

  if (removePhoto) {
    await Promise.allSettled(PHOTO_EXTS.map((e) => db.storage.from('teacher-photos').remove([`${id}.${e}`])));
    updates.photo_url = '';
  }

  if (photo instanceof File && photo.size > 0) {
    if (!removePhoto) {
      await Promise.allSettled(PHOTO_EXTS.map((e) => db.storage.from('teacher-photos').remove([`${id}.${e}`])));
    }
    const ext = getFileExt(photo);
    const path = `${id}.${ext}`;
    const { error: uploadError } = await db.storage.from('teacher-photos').upload(path, photo, { upsert: true });
    if (!uploadError) {
      const { data: { publicUrl } } = db.storage.from('teacher-photos').getPublicUrl(path);
      updates.photo_url = publicUrl;
    }
  }

  const { error } = await db.from('teachers').update(updates).eq('id', id);
  if (error) return { error: error.message };
  invalidateHomepage();
  return { success: true };
}

export async function deleteTeacherAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { data: teacher } = await db.from('teachers').select('photo_url').eq('id', id).single();
  const { error } = await db.from('teachers').delete().eq('id', id);
  if (error) return { error: error.message };

  if (teacher?.photo_url) {
    const marker = '/teacher-photos/';
    const idx = teacher.photo_url.indexOf(marker);
    if (idx !== -1) {
      const storagePath = teacher.photo_url.slice(idx + marker.length);
      await db.storage.from('teacher-photos').remove([storagePath]);
    }
  }

  invalidateHomepage();
  return { success: true };
}

export async function reorderTeacherAction(id: number, direction: 'up' | 'down') {
  await requireAuth();
  const db = createAdminClient();

  const { data: current } = await db.from('teachers').select('order_index').eq('id', id).single();
  if (!current) return { error: 'Teacher not found' };

  const { data: other } = await db.from('teachers')
    .select('id, order_index')
    .eq('order_index', direction === 'up' ? current.order_index - 1 : current.order_index + 1)
    .single();

  if (!other) return { error: 'Cannot reorder' };

  await Promise.all([
    db.from('teachers').update({ order_index: other.order_index, updated_at: new Date().toISOString() }).eq('id', id),
    db.from('teachers').update({ order_index: current.order_index, updated_at: new Date().toISOString() }).eq('id', other.id),
  ]);

  invalidateHomepage();
  return { success: true };
}
