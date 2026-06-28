export interface SiteInfo {
  ig_handle: string;
  phone: string;
  email: string;
  address_line1: string;
  address_line2: string;
  weekday_hours: string;
  weekend_hours: string;
  address_line1_en: string;
  address_line2_en: string;
  weekday_hours_en: string;
  weekend_hours_en: string;
  happy_customers: number;
  years_experience: number;
  latitude: number;
  longitude: number;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  title_en: string;
  description_en: string;
  order_index: number;
}

export interface Trainer {
  id: number;
  name: string;
  ig_handle: string;
  photo_url: string;
  order_index: number;
}

export interface Playlist {
  id: number;
  spotify_id: string;
  title: string;
  order_index: number;
}

export interface GalleryPhoto {
  id: number;
  image_url: string;
  alt_text: string;
  order_index: number;
}
