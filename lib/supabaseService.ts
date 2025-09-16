// lib/supabaseService.ts
import { createClient } from '@supabase/supabase-js'

// This client uses the *service role* key — only use it on the server (API routes).
export const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,       // your project URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!       // your service role key from Supabase settings
)
