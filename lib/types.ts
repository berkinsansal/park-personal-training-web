export type SiteInfo = {
  ig_handle: string;
  phone: string;
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
};

export type Service = {
  id: number;
  icon: string;
  title: string;
  description: string;
  title_en: string;
  description_en: string;
  order_index: number;
};

export type Teacher = {
  id: number;
  name: string;
  ig_handle: string;
  initials: string;
  order_index: number;
};
