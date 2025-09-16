// lib/supabaseServerClient.ts
import { createClient } from '@supabase/supabase-js'

// Use a service-role key on the server for inserts without RLS
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // add to .env.local (never expose in client!)
)
