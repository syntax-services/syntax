import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qbpoxakkalpcuawcdapd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFicG94YWtrYWxwY3Vhd2NkYXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTczODQsImV4cCI6MjA3MzM3MzM4NH0.r35LW-x7odg5kwZhnOAu8upGWALFAfHLm6Y69387bnU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
