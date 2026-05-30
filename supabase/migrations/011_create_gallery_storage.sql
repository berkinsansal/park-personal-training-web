-- Create gallery-images storage bucket
INSERT INTO storage.buckets (id, name, public, created_at, updated_at, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-images',
  'gallery-images',
  true,
  now(),
  now(),
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for gallery-images bucket
DO $$ BEGIN
  CREATE POLICY "gallery_public_read" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery-images');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "gallery_authenticated_insert" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "gallery_authenticated_update" ON storage.objects
    FOR UPDATE WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "gallery_authenticated_delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
