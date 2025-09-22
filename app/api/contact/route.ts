// app/api/contact/route.ts
import { supabaseServer } from '@/lib/supabaseServerClient'
import { Resend } from 'resend'

// Make sure you have RESEND_API_KEY set in Vercel dashboard
const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body as {
      name: string
      email: string
      message: string
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // 1️⃣ Save to Supabase table `contact`
    const { error: dbError } = await supabaseServer
      .from('contact')
      .insert([{ name, email, message }])

    if (dbError) {
      console.error('Supabase error:', dbError)
      return new Response(JSON.stringify({ error: dbError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 2️⃣ Send email using Resend
    try {
      await resend.emails.send({
        // must be a verified domain or address in your Resend dashboard
        from: 'Syntax <no-reply@yourdomain.com>',
        // where you want to receive the leads
        to: ['yourgmail@gmail.com'],
        subject: 'New Contact Message from Syntax Website',
        html: `
          <h1>New Contact Message</h1>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br/>${message}</p>
        `,
      })
    } catch (emailErr: any) {
      console.error('Resend error:', emailErr)
      // we still return success to the client if DB insert worked,
      // but you can choose to fail the whole request if you prefer
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('Handler error:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
