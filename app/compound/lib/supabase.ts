import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Safely handle missing keys in the client UI so the app doesn't crash on boot during waitlist
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("cum£ound Warning: Missing Supabase Environment Variables. Please copy .env.example to .env.local and populate your keys for live functionality.");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-anon-key'
);
