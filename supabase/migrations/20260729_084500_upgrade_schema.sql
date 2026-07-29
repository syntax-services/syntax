-- ========================================================
-- SYNTAX SERVICES SCHEMA UPGRADE MIGRATION
-- Date: 2026-07-29 08:45:00
-- ========================================================

-- 1. Add video_url to projects table if missing
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;

-- 2. Add video_url to demos table if missing
ALTER TABLE demos ADD COLUMN IF NOT EXISTS video_url TEXT;

-- 3. Add status & notes to contact table if missing
ALTER TABLE contact ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE contact ADD COLUMN IF NOT EXISTS notes TEXT;

-- 4. Add status & notes to bookings table if missing
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- 5. Create storage bucket policy helper for 'projects' bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read access policy for projects bucket
CREATE POLICY "Public Read Access Projects Bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'projects');

-- Service Role write access policy for projects bucket
CREATE POLICY "Service Role Upload Projects Bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'projects');
