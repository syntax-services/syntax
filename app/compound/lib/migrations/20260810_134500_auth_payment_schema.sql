-- ============================================================================
-- COMPOUND PROTOCOL SUPABASE MIGRATION
-- Timestamp: 2026-08-10 13:45:00
-- Target: Strict 3-Stage Auth, Terms Acceptance & Payment Gate System
-- ============================================================================

-- 1. Create or Update User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    terms_accepted BOOLEAN DEFAULT FALSE,
    terms_accepted_at TIMESTAMPTZ,
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid_deposit', 'subscribed_mt5'
    net_deposited_usd NUMERIC(12, 2) DEFAULT 0.00,
    is_developer_bypass BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- 2. Create User Transactions Audit Table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tx_reference TEXT UNIQUE NOT NULL,
    gateway TEXT DEFAULT 'paystack',
    net_amount NUMERIC(12, 2) NOT NULL,
    processing_fee NUMERIC(12, 2) NOT NULL,
    total_paid NUMERIC(12, 2) NOT NULL,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own transactions" 
    ON public.transactions FOR SELECT 
    USING (auth.uid() = user_id);

-- Trigger for auto-profile creation on Supabase Auth SignUp
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, terms_accepted, payment_status)
    VALUES (new.id, new.email, FALSE, 'pending');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
