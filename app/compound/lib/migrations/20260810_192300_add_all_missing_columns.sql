-- ==============================================================================
-- CUM£OUND PROTOCOL FULL COLUMNS GUARANTEE MIGRATION (100% IDEMPOTENT)
-- Migration Date: 2026-08-10 19:23:00 WAT
-- File: src/lib/migrations/20260810_192300_add_all_missing_columns.sql
-- ==============================================================================

-- 1. PROFILES TABLE COLUMNS GUARANTEE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS full_name TEXT DEFAULT 'Protocol Trader',
    ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. MT5 CREDENTIALS TABLE COLUMNS GUARANTEE
CREATE TABLE IF NOT EXISTS public.mt5_credentials (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);
ALTER TABLE public.mt5_credentials 
    ADD COLUMN IF NOT EXISTS broker TEXT DEFAULT 'Exness Technologies',
    ADD COLUMN IF NOT EXISTS server TEXT DEFAULT 'Exness-Real7',
    ADD COLUMN IF NOT EXISTS login_id TEXT DEFAULT '',
    ADD COLUMN IF NOT EXISTS is_subscribed BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. TRANSACTIONS TABLE COLUMNS GUARANTEE
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);
ALTER TABLE public.transactions 
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS net_amount NUMERIC(12, 2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS fee NUMERIC(12, 2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS total_paid NUMERIC(12, 2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Completed',
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 4. TRADING LOGS TABLE COLUMNS GUARANTEE (Fixes column t.action does not exist)
CREATE TABLE IF NOT EXISTS public.trading_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);
ALTER TABLE public.trading_logs 
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ADD COLUMN IF NOT EXISTS symbol TEXT DEFAULT 'XAUUSD',
    ADD COLUMN IF NOT EXISTS action TEXT DEFAULT 'BUY',
    ADD COLUMN IF NOT EXISTS lot_size NUMERIC(8, 2) DEFAULT 0.01,
    ADD COLUMN IF NOT EXISTS price NUMERIC(12, 2) DEFAULT 2420.50,
    ADD COLUMN IF NOT EXISTS profit NUMERIC(12, 2) DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 5. SAFELY RE-CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_trading_logs_user_created 
    ON public.trading_logs (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_user_created 
    ON public.transactions (user_id, created_at DESC);

-- 6. SAFELY CREATE USER CHART TRADE HISTORY VIEW
CREATE OR REPLACE VIEW public.user_chart_trade_history AS
SELECT 
    t.id,
    t.user_id,
    t.symbol,
    t.action,
    t.lot_size,
    t.price,
    t.profit,
    t.created_at
FROM public.trading_logs t
ORDER BY t.created_at DESC;

-- Grant permissions
GRANT SELECT ON public.user_chart_trade_history TO authenticated;
