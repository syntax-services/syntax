-- ========================================================
-- SYNTAX SERVICES SCHEMA MIGRATION (INSPECTION SYNC)
-- Date: 2026-07-29 09:00:00
-- ========================================================

-- 1. Ensure 'syntax' Storage Bucket is Public
INSERT INTO storage.buckets (id, name, public)
VALUES ('syntax', 'syntax', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read access policy for 'syntax' bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access Syntax Bucket'
  ) THEN
    CREATE POLICY "Public Read Access Syntax Bucket" ON storage.objects
      FOR SELECT USING (bucket_id = 'syntax');
  END IF;
END $$;

-- Service role write policy for 'syntax' bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Service Role Upload Syntax Bucket'
  ) THEN
    CREATE POLICY "Service Role Upload Syntax Bucket" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'syntax');
  END IF;
END $$;

-- 2. Add missing columns to existing 'projects' table safely
ALTER TABLE projects ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_live BOOLEAN DEFAULT true;

-- 3. Create missing 'demos' table
CREATE TABLE IF NOT EXISTS demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  description TEXT,
  pitch_talking_points TEXT,
  objection_guide TEXT,
  target_industry TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create missing 'partners' table (Scouts & Closers)
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT UNIQUE NOT NULL,
  surname TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'scout', -- 'scout', 'closer', 'combined'
  bank_name TEXT,
  account_number TEXT,
  account_name TEXT,
  total_earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create missing 'leads' table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_token TEXT REFERENCES partners(access_token),
  closer_token TEXT REFERENCES partners(access_token),
  client_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  agreed_price NUMERIC NOT NULL DEFAULT 150000,
  scout_commission NUMERIC DEFAULT 4500, -- 3%
  closer_commission NUMERIC DEFAULT 7500, -- 5%
  status TEXT DEFAULT 'pitching', -- 'pitching', 'closed', 'paid'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create missing 'financial_ledgers' table
CREATE TABLE IF NOT EXISTS financial_ledgers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  amount_paid NUMERIC NOT NULL,
  deposit_date TIMESTAMPTZ DEFAULT NOW(),
  renewal_date TIMESTAMPTZ,
  domain_name TEXT,
  hosting_provider TEXT DEFAULT 'Vercel / Supabase',
  status TEXT DEFAULT 'active'
);

-- 7. Create missing 'visitor_analytics' table
CREATE TABLE IF NOT EXISTS visitor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT,
  os_name TEXT,
  browser_name TEXT,
  visited_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
