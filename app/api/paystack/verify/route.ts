import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ success: false, error: "Missing reference" }, { status: 400 });
  }

  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY || "";
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });

    const data = await res.json();

    if (data.status && data.data?.status === "success") {
      const metadata = data.data.metadata || {};
      const amountUsd = metadata.amount_usd || 10;
      const type = metadata.type || "deposit";

      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id;

      if (userId) {
        // Record transaction in Supabase
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

      return NextResponse.json({ success: true, transaction: data.data });
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
