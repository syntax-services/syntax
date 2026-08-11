-- ==============================================================================
-- CUM£OUND PROTOCOL PRODUCTION SUPABASE MIGRATION SCHEMA (IDEMPOTENT FIX)
-- Migration Date: 2026-08-10 18:15:00 WAT
-- File: src/lib/migrations/20260810_174000_production_schema.sql
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Stores user account metadata & privacy preferences)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT DEFAULT 'Protocol Trader',
    terms_accepted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. MT5 CREDENTIALS TABLE (Stores encrypted MT5 server logins per user)
CREATE TABLE IF NOT EXISTS public.mt5_credentials (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    broker TEXT DEFAULT 'Exness Technologies',
    server TEXT DEFAULT 'Exness-Real7',
    login_id TEXT DEFAULT '',
    is_subscribed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRANSACTIONS TABLE (Stores Paystack deposits & fee audit logs)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    net_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRADING LOGS TABLE (Stores live SMC bot trade execution signals)
CREATE TABLE IF NOT EXISTS public.trading_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    symbol TEXT DEFAULT 'XAUUSD',
    action TEXT CHECK (action IN ('BUY', 'SELL')),
    lot_size NUMERIC(8, 2) DEFAULT 0.01,
    price NUMERIC(12, 2) NOT NULL,
    profit NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mt5_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_logs ENABLE ROW LEVEL SECURITY;

-- Idempotent Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Idempotent MT5 Credentials Policies
DROP POLICY IF EXISTS "Users can read own MT5 credentials" ON public.mt5_credentials;
CREATE POLICY "Users can read own MT5 credentials" ON public.mt5_credentials
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own MT5 credentials" ON public.mt5_credentials;
CREATE POLICY "Users can update own MT5 credentials" ON public.mt5_credentials
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own MT5 credentials" ON public.mt5_credentials;
CREATE POLICY "Users can insert own MT5 credentials" ON public.mt5_credentials
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Idempotent Transactions Policies
DROP POLICY IF EXISTS "Users can read own transactions" ON public.transactions;
CREATE POLICY "Users can read own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transactions;
CREATE POLICY "Users can insert own transactions" ON public.transactions
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Idempotent Trading Logs Policies
DROP POLICY IF EXISTS "Users can read own trading logs" ON public.trading_logs;
CREATE POLICY "Users can read own trading logs" ON public.trading_logs
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own trading logs" ON public.trading_logs;
CREATE POLICY "Users can insert own trading logs" ON public.trading_logs
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ENABLE SUPABASE REALTIME PUBLICATION FOR LIVE TRADING LOGS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime FOR TABLE public.trading_logs, public.transactions;
  ELSE
    ALTER PUBLICATION supabase_realtime ADD TABLE public.trading_logs;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- Publication table add fallback
  NULL;
END $$;
