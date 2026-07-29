-- ========================================================
-- SYNTAX SERVICES COMPLETE SUPABASE TABLES CREATION SCRIPT
-- Paste and Run this in your Supabase Dashboard -> SQL Editor
-- ========================================================

-- 1. Create 'partners' table for Scouts & Closers
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  surname TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'scout', -- 'scout', 'closer', 'combined'
  password_hash TEXT,
  email_confirmed BOOLEAN DEFAULT false,
  bank_name TEXT,
  account_number TEXT,
  account_name TEXT,
  total_earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'leads' table for Sales Pipeline
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scout_token TEXT REFERENCES partners(access_token),
  closer_token TEXT REFERENCES partners(access_token),
  client_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  agreed_price NUMERIC NOT NULL DEFAULT 280000,
  scout_commission NUMERIC DEFAULT 8400, -- 3%
  closer_commission NUMERIC DEFAULT 14000, -- 5%
  status TEXT DEFAULT 'pitching', -- 'pitching', 'closed', 'paid'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create 'demos' table for Sample Vault
CREATE TABLE IF NOT EXISTS public.demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  niche TEXT NOT NULL,
  demo_url TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  description TEXT,
  pitch_script TEXT,
  objection_handlers TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create 'partner_support_tickets' table
CREATE TABLE IF NOT EXISTS public.partner_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_email TEXT NOT NULL,
  partner_name TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create 'partner_demo_requests' table
CREATE TABLE IF NOT EXISTS public.partner_demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_email TEXT NOT NULL,
  partner_name TEXT,
  client_business_name TEXT NOT NULL,
  client_industry TEXT NOT NULL,
  client_whatsapp TEXT NOT NULL,
  requested_features TEXT,
  special_notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create 'visitor_analytics' table
CREATE TABLE IF NOT EXISTS public.visitor_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT,
  os_name TEXT,
  browser_name TEXT,
  page_path TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and Grant Access
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Allow Public & Service Role Access Policies
CREATE POLICY "Allow Public Insert Partners" ON public.partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Select Partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Select Leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow Public Select Demos" ON public.demos FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Support" ON public.partner_support_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Insert Demo Req" ON public.partner_demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Insert Analytics" ON public.visitor_analytics FOR INSERT WITH CHECK (true);
