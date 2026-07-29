-- ========================================================
-- SYNTAX SERVICES PARTNER SUPPORT & DEMO REQUESTS SCHEMA
-- Date: 2026-07-29 11:30:00
-- ========================================================

-- 1. Create partner_support_tickets table if missing
CREATE TABLE IF NOT EXISTS partner_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_email TEXT NOT NULL,
  partner_name TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'open', -- 'open', 'resolved'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create partner_demo_requests table if missing
CREATE TABLE IF NOT EXISTS partner_demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_email TEXT NOT NULL,
  partner_name TEXT,
  client_business_name TEXT NOT NULL,
  client_industry TEXT NOT NULL,
  client_whatsapp TEXT NOT NULL,
  requested_features TEXT,
  special_notes TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'building', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Add password_hash & email to partners table if missing
ALTER TABLE partners ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS email_confirmed BOOLEAN DEFAULT false;
