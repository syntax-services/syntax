// app/contact/route.ts
import { supabaseServer } from '@/lib/supabaseServerClient'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!) // add this key in Vercel dashboard

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 1. Save to Supabase table `contact`
    const { error } = await supabaseServer
      .from('contact')
      .insert([{ name, email, message }])

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 2. Send email using Resend
    await resend.emails.send({
      from: 'Syntax <no-reply@yourdomain.com>', // must match your verified domain in Resend
      to: 'yourgmail@gmail.com',               // where you want the messages delivered
      subject: 'New Contact Message from Syntax Website',
      html: `
        <h1>New Contact Message</h1>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
