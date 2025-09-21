// supabase/functions/send-project-request/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API = "https://api.resend.com/emails";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders() });
  }

  try {
    const body = await req.json().catch(() => ({}));

    const full_name = (body.full_name ?? "").toString();
    const email = (body.email ?? "").toString();
    const project_type = (body.project_type ?? "").toString();
    const features = (body.features ?? "").toString();
    const budget = (body.budget ?? "").toString();

    if (!email || !project_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            ...corsHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
    }

    const subject = `New Project Request from ${full_name || "Unknown"}`;
    const html = `
      <h2>New Project Request</h2>
      <p><strong>Name:</strong> ${full_name || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Type:</strong> ${project_type}</p>
      <p><strong>Features:</strong> ${features || "N/A"}</p>
      <p><strong>Budget:</strong> ₦${budget || "N/A"}</p>
    `;

    // Send email with Resend
    const resendRes = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Syntax Services <noreply@syntax.com>", // must be verified in Resend
        to: ["syntaxservices25@gmail.com"],           // your email
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const text = await resendRes.text();
      console.error("Resend error:", text);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: text }),
        {
          status: 500,
          headers: {
            ...corsHeaders(),
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json",
      },
    });
  }
});
