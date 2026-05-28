ALTER TABLE site_info
  ADD COLUMN address_line1_en TEXT NOT NULL DEFAULT '',
  ADD COLUMN address_line2_en TEXT NOT NULL DEFAULT '',
  ADD COLUMN weekday_hours_en TEXT NOT NULL DEFAULT '',
  ADD COLUMN weekend_hours_en TEXT NOT NULL DEFAULT '';

ALTER TABLE services
  ADD COLUMN title_en TEXT NOT NULL DEFAULT '',
  ADD COLUMN description_en TEXT NOT NULL DEFAULT '';
