-- ========================================================
-- SYNTAX SERVICES PLATFORM DATABASE SCHEMA
-- Location: supabase/schema.sql
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PARTNERS TABLE (Key + Surname locked authentication)
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT UNIQUE NOT NULL, -- Unique key e.g. SYN-SCOUT-7829 or SYN-CLOSER-4401
  surname TEXT NOT NULL,      -- Surname required along with token for login
  full_name TEXT NOT NULL,
  email TEXT,
  phone_whatsapp TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('scout', 'closer', 'scout_closer')),
  payout_account_name TEXT,
  payout_bank TEXT,
  payout_account_number TEXT,
  total_earned NUMERIC(12, 2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast authentication lookup
CREATE INDEX IF NOT EXISTS idx_partners_token_surname ON public.partners (token, LOWER(surname));

-- 2. LEADS TABLE (Scout & Closer pipeline tracking)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scout_token TEXT REFERENCES public.partners(token) ON DELETE SET NULL,
  closer_token TEXT REFERENCES public.partners(token) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  social_handle TEXT NOT NULL, -- IG/TikTok handle or link
  followers_count INTEGER DEFAULT 0,
  business_niche TEXT,
  notes TEXT,
  can_scout_pitch BOOLEAN DEFAULT FALSE, -- Scout opted to attempt pitch
  status TEXT NOT NULL DEFAULT 'lead_received' 
    CHECK (status IN ('lead_received', 'demo_built', 'pitching', 'closed_paid', 'rejected')),
  demo_url TEXT,
  deal_value NUMERIC(12, 2) DEFAULT 150000.00, -- Default ₦150,000 deal
  scout_commission NUMERIC(12, 2) DEFAULT 0.00, -- 3% = ₦4,500 on ₦150k
  closer_commission NUMERIC(12, 2) DEFAULT 0.00, -- 5% = ₦7,500 on ₦150k
  total_commission NUMERIC(12, 2) DEFAULT 0.00, -- 8% = ₦12,000 if same person
  is_verified BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_scout ON public.leads (scout_token);
CREATE INDEX IF NOT EXISTS idx_leads_closer ON public.leads (closer_token);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);

-- 3. PROJECTS TABLE (Real live client portfolio showcase)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  live_url TEXT NOT NULL,
  category TEXT DEFAULT 'Web Application',
  tech_stack TEXT[] DEFAULT ARRAY['Next.js', 'Tailwind CSS', 'Supabase'],
  built_year INTEGER DEFAULT 2024,
  is_live BOOLEAN DEFAULT TRUE,
  annual_renewal_fee NUMERIC(12, 2) DEFAULT 35000.00, -- Domain & hosting renewal tracking
  renewal_due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DEMOS TABLE (Sample demo vault for Closers & Admin)
CREATE TABLE IF NOT EXISTS public.demos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  niche TEXT NOT NULL,
  demo_url TEXT NOT NULL, -- e.g. https://tml-topaz.vercel.app
  thumbnail_url TEXT,
  pitch_script TEXT NOT NULL,
  objection_handlers TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FINANCIAL LEDGERS TABLE (Deposits, Domain/Hosting Renewals & Payouts)
CREATE TABLE IF NOT EXISTS public.financial_ledgers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('upfront_deposit', 'domain_renewal', 'hosting_renewal', 'commission_payout')),
  client_or_partner_name TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  notes TEXT,
  due_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VISITOR ANALYTICS TABLE (Device, IP, Location tracking for Admin)
CREATE TABLE IF NOT EXISTS public.visitor_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT, -- Mobile, Tablet, Desktop
  os_name TEXT,     -- iOS, Android, Windows, macOS, Linux
  browser_name TEXT,
  location_country TEXT,
  location_city TEXT,
  page_path TEXT NOT NULL,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.visitor_analytics (created_at DESC);

-- Enable RLS (Row Level Security) - enable policy rules as needed
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_ledgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anon public read for live projects & demos
CREATE POLICY "Allow public read of live projects" ON public.projects FOR SELECT USING (is_live = true);
CREATE POLICY "Allow public read of demos" ON public.demos FOR SELECT USING (true);
