-- ==============================================================================
-- CUM£OUND PROTOCOL USER CHART SETTINGS & FAVORITES PERSISTENCE SCHEMA
-- Migration Date: 2026-08-11 07:20:00 WAT
-- File: src/lib/migrations/20260811_072000_user_chart_settings_schema.sql
-- ==============================================================================

-- 1. CREATE USER CHART SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.user_chart_settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    chart_layout JSONB DEFAULT '{}'::jsonb,
    favorite_tools JSONB DEFAULT '[]'::jsonb,
    favorite_indicators JSONB DEFAULT '[]'::jsonb,
    symbol TEXT DEFAULT 'OANDA:XAUUSD',
    interval TEXT DEFAULT '5',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.user_chart_settings ENABLE ROW LEVEL SECURITY;

-- 3. DROP EXISTING POLICIES TO PREVENT POSTGRES ERROR 42710
DROP POLICY IF EXISTS "Users can read own chart settings" ON public.user_chart_settings;
DROP POLICY IF EXISTS "Users can insert own chart settings" ON public.user_chart_settings;
DROP POLICY IF EXISTS "Users can update own chart settings" ON public.user_chart_settings;

-- 4. STRICT ISOLATED USER ACCESS POLICIES
CREATE POLICY "Users can read own chart settings" 
    ON public.user_chart_settings FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chart settings" 
    ON public.user_chart_settings FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chart settings" 
    ON public.user_chart_settings FOR UPDATE 
    USING (auth.uid() = user_id);

-- 5. INDEX FOR FAST LOOKUPS
CREATE INDEX IF NOT EXISTS idx_user_chart_settings_user_id 
    ON public.user_chart_settings (user_id);
