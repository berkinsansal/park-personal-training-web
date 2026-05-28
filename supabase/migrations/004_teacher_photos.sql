-- Remove initials column (now computed from name in application code)
ALTER TABLE teachers DROP COLUMN initials;

-- Add photo_url column (empty string = no photo uploaded)
ALTER TABLE teachers ADD COLUMN photo_url TEXT NOT NULL DEFAULT '';
