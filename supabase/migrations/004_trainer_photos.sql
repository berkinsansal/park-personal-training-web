-- Remove initials column (now computed from name in application code)
ALTER TABLE trainers DROP COLUMN initials;

-- Add photo_url column (empty string = no photo uploaded)
ALTER TABLE trainers ADD COLUMN photo_url TEXT NOT NULL DEFAULT '';
