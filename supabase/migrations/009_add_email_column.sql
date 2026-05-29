-- Add email column to site_info
ALTER TABLE site_info ADD COLUMN IF NOT EXISTS email VARCHAR(255) NOT NULL DEFAULT 'info@parkpersonaltraining.com';
