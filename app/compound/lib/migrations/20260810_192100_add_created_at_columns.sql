-- ==============================================================================
-- CUM£OUND PROTOCOL FIX MISSING COLUMNS MIGRATION
-- Migration Date: 2026-08-10 19:21:00 WAT
-- File: src/lib/migrations/20260810_192100_add_created_at_columns.sql
-- ==============================================================================

-- 1. SAFELY ADD MISSING CREATED_AT COLUMNS TO ALL TABLES
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.mt5_credentials 
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.transactions 
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public.trading_logs 
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 2. CREATE INDEXES FOR FAST PER-USER QUERIES
CREATE INDEX IF NOT EXISTS idx_trading_logs_user_created 
    ON public.trading_logs (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_user_created 
    ON public.transactions (user_id, created_at DESC);

-- 3. CREATE USER CHART TRADE HISTORY VIEW
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

-- Grant select permissions
GRANT SELECT ON public.user_chart_trade_history TO authenticated;
