-- Drop unused tables from initial migration
DROP TABLE IF EXISTS hero;
DROP TABLE IF EXISTS about;
DROP TABLE IF EXISTS contact;

-- Rebuild services to match component data
DROP TABLE IF EXISTS services;
CREATE TABLE services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  icon TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Rebuild teachers to match component data
DROP TABLE IF EXISTS teachers;
CREATE TABLE teachers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  ig_handle TEXT NOT NULL,
  initials TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Common site info (always single row)
CREATE TABLE site_info (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ig_handle TEXT NOT NULL DEFAULT 'parkpersonaltraining',
  phone TEXT NOT NULL DEFAULT '',
  address_line1 TEXT NOT NULL DEFAULT '',
  address_line2 TEXT NOT NULL DEFAULT '',
  weekday_hours TEXT NOT NULL DEFAULT '',
  weekend_hours TEXT NOT NULL DEFAULT '',
  happy_customers INT NOT NULL DEFAULT 0,
  years_experience INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_info ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "public_read" ON services FOR SELECT USING (true);
CREATE POLICY "public_read" ON teachers FOR SELECT USING (true);
CREATE POLICY "public_read" ON site_info FOR SELECT USING (true);
