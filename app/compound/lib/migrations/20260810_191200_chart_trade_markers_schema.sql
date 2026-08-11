-- ==============================================================================
-- CUM£OUND PROTOCOL CHART TRADE MARKERS & REALTIME INDEX MIGRATION
-- Migration Date: 2026-08-10 19:12:00 WAT
-- File: src/lib/migrations/20260810_191200_chart_trade_markers_schema.sql
-- ==============================================================================

-- 1. INDEXES FOR LIGHTNING-FAST PER-USER CHART MARKER QUERIES
CREATE INDEX IF NOT EXISTS idx_trading_logs_user_created 
    ON public.trading_logs (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_user_created 
    ON public.transactions (user_id, created_at DESC);

-- 2. USER CHART TRADE HISTORY VIEW (Reflects trades executed per user since signup)
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

-- Grant select permissions on view
GRANT SELECT ON public.user_chart_trade_history TO authenticated;

-- 3. ENSURE IDEMPOTENT SUPABASE REALTIME PUBLICATION FOR CHART MARKERS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime FOR TABLE public.trading_logs, public.transactions;
  ELSE
    ALTER PUBLICATION supabase_realtime ADD TABLE public.trading_logs;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
