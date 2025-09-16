// supabase/functions/send-contact-email/index.ts

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/** Escape HTML to prevent injection */
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Read secrets from environment
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = Deno.env.get("TO_EMAIL");

// Common headers for CORS
const corsHeaders: HeadersInit = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const email = (body?.email ?? "").toString().trim();
    const message = (body?.message ?? "").toString().trim();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, message" }),
        { status: 400, headers: corsHeaders },
      );
    }

    if (!RESEND_API_KEY || !TO_EMAIL) {
      console.error("Missing RESEND_API_KEY or TO_EMAIL env var");
      return new Response(
        JSON.stringify({ error: "Server misconfiguration (missing secrets)" }),
        { status: 500, headers: corsHeaders },
      );
    }

    // Safe HTML email body
    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #111; line-height: 1.4;">
        <h2 style="margin-bottom:8px">New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <div style="padding:12px;border-radius:8px;background:#f7f7f7;margin-top:8px;">
          ${escapeHtml(message).replaceAll("\n", "<br>")}
        </div>
        <hr style="margin-top:18px; border:none; border-top:1px solid #eee" />
        <p style="font-size:12px;color:#666;margin-top:8px;">Sent from Syntax contact form</p>
      </div>
    `;

    // Send email via Resend
    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Syntax Contact <no-reply@syntax.example>", // replace with verified sender if needed
        to: [TO_EMAIL],
        subject: `New contact from ${name}`,
        html,
      }),
    });

    const resendData = await resendResp.json();

    if (!resendResp.ok) {
      console.error("Resend API error:", resendResp.status, resendData);
      return new Response(
        JSON.stringify({ error: "Failed to send email", detail: resendData }),
        { status: 502, headers: corsHeaders },
      );
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Unhandled error in send-contact-email:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
