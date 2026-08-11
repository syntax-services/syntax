-- cum£ound Protocol PostgreSQL Supabase Database Schema
-- Includes User Profiles, 7-Day Session Tokens, Device Fingerprinting, MT5 Credentials,
-- Platform Rules Acceptance, Strategy Settings, and Transaction Logs.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Sessions Table (7-Day Timeout Management)
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    device_hash TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Device Fingerprints Table (Max 2 accounts per physical device)
CREATE TABLE IF NOT EXISTS public.device_fingerprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    device_hash TEXT UNIQUE NOT NULL,
    account_count INT DEFAULT 1,
    is_bypassed BOOLEAN DEFAULT FALSE, -- Admin workaround override
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Platform Rules Table (Managed by Admin)
CREATE TABLE IF NOT EXISTS public.platform_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version INT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Initial Rules
INSERT INTO public.platform_rules (version, title, content, is_active)
VALUES (
    1,
    'cum£ound Protocol Institutional Trading Rules & Risk Agreement',
    '1. Risk Management: All automated trades executed by the protocol adhere strictly to the user-selected Risk % per trade.\n2. Compounding Model: Profits are reinvested dynamically into high-probability SMC/ICT liquidity pools.\n3. Account Ownership: Users are responsible for maintaining valid MT5 broker connections.\n4. Device Policy: Maximum 2 registered accounts per physical device to preserve network liquidity.\n5. Profit Sharing: Protocol collects a 10% performance fee on net profitable trading cycles.',
    TRUE
) ON CONFLICT (version) DO NOTHING;

-- 5. User Rules Acceptance Audit Log
CREATE TABLE IF NOT EXISTS public.user_rules_acceptance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    rule_version INT REFERENCES public.platform_rules(version),
    accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    device_hash TEXT NOT NULL,
    UNIQUE(user_id, rule_version)
);

-- 6. MT5 Broker Credentials & Connections
CREATE TABLE IF NOT EXISTS public.mt5_credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    broker_name TEXT NOT NULL,
    server_name TEXT NOT NULL,
    login_number BIGINT NOT NULL,
    encrypted_password TEXT NOT NULL,
    is_connected BOOLEAN DEFAULT FALSE,
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. User Strategy Customization Settings
CREATE TABLE IF NOT EXISTS public.user_strategy_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    active_strategy TEXT DEFAULT 'wyckoff', -- 'wyckoff', 'poc', 'ict'
    risk_percentage NUMERIC(4,2) DEFAULT 1.50,
    max_drawdown_limit NUMERIC(4,2) DEFAULT 5.00,
    lot_sizing_type TEXT DEFAULT 'AUTO', -- 'AUTO', 'FIXED'
    fixed_lot_size NUMERIC(6,2) DEFAULT 0.10,
    trailing_stop_enabled BOOLEAN DEFAULT TRUE,
    tp_ratio TEXT DEFAULT '1:3',
    theme_accent TEXT DEFAULT '#0A84FF',
    bento_density TEXT DEFAULT 'DEFAULT',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Deposits & Withdrawals (Paystack Integration)
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'DEPOSIT', 'WITHDRAWAL', 'PERFORMANCE_FEE'
    amount NUMERIC(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'PENDING', -- 'PENDING', 'COMPLETED', 'FAILED'
    paystack_reference TEXT UNIQUE,
    payment_method TEXT DEFAULT 'CARD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Trading History & Closed Deals Log
CREATE TABLE IF NOT EXISTS public.trading_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    ticket_id BIGINT NOT NULL,
    symbol TEXT NOT NULL,
    order_type TEXT NOT NULL, -- 'BUY', 'SELL'
    volume NUMERIC(6,2) NOT NULL,
    open_price NUMERIC(12,5) NOT NULL,
    close_price NUMERIC(12,5) NOT NULL,
    sl_price NUMERIC(12,5),
    tp_price NUMERIC(12,5),
    profit NUMERIC(12,2) NOT NULL,
    open_time TIMESTAMP WITH TIME ZONE NOT NULL,
    close_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mt5_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_strategy_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_logs ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can access own MT5 credentials" ON public.mt5_credentials FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own settings" ON public.user_strategy_settings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own trading logs" ON public.trading_logs FOR SELECT USING (auth.uid() = user_id);
