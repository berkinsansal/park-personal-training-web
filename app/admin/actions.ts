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
    happy_customers: Number(formData.get('happy_customers')),
    years_experience: Number(formData.get('years_experience')),
    updated_at: new Date().toISOString(),
  }).eq('id', 1);

  if (error) return { error: error.message };
  updateTag('homepage');
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
    order_index: Number(formData.get('order_index') || 0),
  });

  if (error) return { error: error.message };
  updateTag('homepage');
  return { success: true };
}

export async function updateServiceAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('services').update({
    icon: formData.get('icon'),
    title: formData.get('title'),
    description: formData.get('description'),
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  }).eq('id', Number(formData.get('id')));

  if (error) return { error: error.message };
  updateTag('homepage');
  return { success: true };
}

export async function deleteServiceAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('services').delete().eq('id', id);
  if (error) return { error: error.message };
  updateTag('homepage');
  return { success: true };
}

// Teachers
export async function addTeacherAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('teachers').insert({
    name: formData.get('name'),
    ig_handle: formData.get('ig_handle'),
    initials: formData.get('initials'),
    order_index: Number(formData.get('order_index') || 0),
  });

  if (error) return { error: error.message };
  updateTag('homepage');
  return { success: true };
}

export async function updateTeacherAction(formData: FormData) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('teachers').update({
    name: formData.get('name'),
    ig_handle: formData.get('ig_handle'),
    initials: formData.get('initials'),
    order_index: Number(formData.get('order_index') || 0),
    updated_at: new Date().toISOString(),
  }).eq('id', Number(formData.get('id')));

  if (error) return { error: error.message };
  updateTag('homepage');
  return { success: true };
}

export async function deleteTeacherAction(id: number) {
  await requireAuth();
  const db = createAdminClient();

  const { error } = await db.from('teachers').delete().eq('id', id);
  if (error) return { error: error.message };
  updateTag('homepage');
  return { success: true };
}
