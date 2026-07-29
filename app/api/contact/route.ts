// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

function escapeHtml(str: string) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, full_name, email, phone, message, details, project_type, preferred_contact } = body

    const contactName = name || full_name || ''
    const contactEmail = email || ''
    const contactMessage = message || details || ''

    // Input Validation
    if (!contactName || typeof contactName !== 'string' || !contactName.trim()) {
      return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 })
    }
    if (!contactEmail || typeof contactEmail !== 'string' || !contactEmail.includes('@')) {
      return NextResponse.json({ success: false, message: 'Valid email is required' }, { status: 400 })
    }
    if (!contactMessage || typeof contactMessage !== 'string' || !contactMessage.trim()) {
      return NextResponse.json({ success: false, message: 'Message is required' }, { status: 400 })
    }
    if (contactMessage.length >= 5000) {
      return NextResponse.json({ success: false, message: 'Message is too long (must be under 5000 characters)' }, { status: 400 })
    }

    // 1️⃣ Save to Supabase table `contact`
    const { error: dbError } = await supabaseService
      .from('contact')
      .insert([
        {
          name: contactName,
          email: contactEmail,
          phone: phone || null,
          project_type: project_type || 'Web Application',
          preferred_contact: preferred_contact || 'WhatsApp',
          message: contactMessage,
        },
      ])

    if (dbError) {
      console.warn('Contact DB Insert note:', dbError.message)
      return NextResponse.json({ success: false, message: 'Failed to save inquiry' }, { status: 500 })
    }

    // 2️⃣ Optional Resend Email Dispatch
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_key') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Syntax Services <onboarding@resend.dev>',
          to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'syntaxservices25@gmail.com'],
          subject: `New Project Inquiry from ${contactName}`,
          html: `
            <h2>New Project Consultation Inquiry</h2>
            <p><b>Name:</b> ${escapeHtml(contactName)}</p>
            <p><b>Email:</b> ${escapeHtml(contactEmail)}</p>
            <p><b>Phone/WhatsApp:</b> ${escapeHtml(phone || 'Not provided')}</p>
            <p><b>Project Type:</b> ${escapeHtml(project_type || 'General')}</p>
            <p><b>Preferred Contact:</b> ${escapeHtml(preferred_contact || 'WhatsApp')}</p>
            <p><b>Details:</b><br/>${escapeHtml(contactMessage)}</p>
          `,
        })
      } catch (emailErr: any) {
        console.warn('Resend email notice:', emailErr.message || emailErr)
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' }, { status: 200 })
  } catch (err: any) {
    console.warn('Contact API handler note:', err.message || err)
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
  }
}
