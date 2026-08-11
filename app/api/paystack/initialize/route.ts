import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amountUsd, type } = body;

    const secretKey = process.env.PAYSTACK_SECRET_KEY || "";
    const amountInKobo = Math.round(Number(amountUsd) * 100 * 1600); // 1 USD ~ 1600 NGN in Kobo for Paystack NGN fallback or USD account

    const origin = req.headers.get("origin") || "https://syntax.com.ng";
    const callbackUrl = `${origin}/compound/settings?payment=success&type=${encodeURIComponent(type || "deposit")}`;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email || "trader@compoundprotocol.com",
        amount: amountInKobo,
        currency: "NGN",
        callback_url: callbackUrl,
        metadata: {
          type: type || "deposit",
          amount_usd: amountUsd,
        },
      }),
    });

    const data = await response.json();

    if (data.status && data.data?.authorization_url) {
      return NextResponse.json({
        success: true,
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.message || "Paystack initialization failed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
