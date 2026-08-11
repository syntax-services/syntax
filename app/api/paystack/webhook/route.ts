import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY || "";
    const bodyText = await req.text();

    // 1. Verify Paystack HMAC SHA512 Cryptographic Signature
    const signature = req.headers.get("x-paystack-signature");
    const hash = crypto.createHmac("sha512", secretKey).update(bodyText).digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ success: false, error: "Invalid cryptographic signature" }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);

    // 2. Confirm Payment Event is Successful
    if (payload.event === "charge.success" && payload.data?.status === "success") {
      const metadata = payload.data.metadata || {};
      const amountUsd = metadata.amount_usd || 10;
      const type = metadata.type || "deposit";
      const customerEmail = payload.data.customer?.email;

      if (customerEmail) {
        // Find user by email in profiles/auth
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", customerEmail)
          .single();

        const userId = profile?.id;

        if (userId) {
          // Record confirmed transaction in Supabase
          await supabase.from("transactions").insert([
            {
              user_id: userId,
              net_amount: amountUsd,
              fee: 0,
              total_paid: amountUsd,
              status: "Completed",
            },
          ]);

          if (type === "mt5_subscription") {
            await supabase.from("mt5_credentials").upsert({
              id: userId,
              is_subscribed: true,
              updated_at: new Date().toISOString(),
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
