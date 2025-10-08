// app/api/contact/route.ts
import { supabaseServer } from '@/lib/supabaseServerClient'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const message = String(body?.message || '').trim()

    // 1️⃣ Validate input
    if (!name || !email || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // 2️⃣ Save to Supabase
    const { error: dbError } = await supabaseServer
      .from('contact')
      .insert([{ name, email, message }])

    if (dbError) {
      console.error('❌ Supabase error:', dbError)
      return Response.json({ error: 'Failed to save message.' }, { status: 500 })
    }

    // 3️⃣ Send email (only if API key is present)
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('⚠️ RESEND_API_KEY missing — skipping email send.')
    } else {
      try {
        const resend = new Resend(apiKey)

        await resend.emails.send({
          from: 'Syntax <no-reply@syntax.com.ng>', // must match verified sender in Resend
          to: ['yourgmail@gmail.com'], // change to your receiving email
          subject: `New Contact Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
              <h2>New Message from Syntax Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `,
        })
      } catch (err: any) {
        console.error('📧 Resend email error:', err)
        // Note: we do NOT fail the request here since DB insert succeeded
      }
    }

    // 4️⃣ Final success response
    return Response.json({ success: true, message: 'Message sent successfully.' })
  } catch (err: any) {
    console.error('🔥 Handler error:', err)
    return Response.json(
      { error: err?.message || 'Internal server error.' },
      { status: 500 }
    )
  }
}
