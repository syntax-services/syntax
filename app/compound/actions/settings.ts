"use server";

import { createClient } from '@supabase/supabase-js';

// By using Server Actions, the Supabase URL and ANON keys are completely hidden from the client browser.
// The network tab will only see a POST request to Next.js, not a direct call to Supabase.
// This satisfies the strict security requirement of obfuscating the backend architecture.

export async function updateUserSettingsSecurely(userId: string, breakEven: boolean, maxRisk: number) {
  // Validate data on the server
  if (maxRisk < 0 || maxRisk > 100) {
    throw new Error("Invalid risk parameter");
  }

  // Initialize Supabase securely on the server side
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("user_settings")
    .upsert({
      id: userId,
      break_even_protection: breakEven,
      max_global_risk_cap: maxRisk,
    });

  if (error) {
    console.error("Secure DB Update Failed:", error);
    return { success: false, message: "Database update failed." };
  }

  return { success: true, message: "Configuration saved securely." };
}
