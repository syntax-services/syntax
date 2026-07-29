// app/api/bookings/route.ts
import { NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { data, error } = await supabaseService
      .from('bookings')
      .insert([
        {
          full_name: body.full_name || body.name || 'Client Booking',
          email: body.email || null,
          phone: body.phone || body.whatsapp || null,
          whatsapp: body.whatsapp || body.phone || null,
          project_type: body.project_type || 'Web Application',
          details: body.details || body.message || 'Consultation booking',
          preferred_contact: body.preferred_contact || 'WhatsApp',
        },
      ])

    if (error) {
      console.warn('Bookings DB Insert note:', error.message)
      return NextResponse.json({ success: false, message: 'Failed to create booking' }, { status: 500 })
    }

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_key') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Syntax Services <onboarding@resend.dev>',
          to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'syntaxservices25@gmail.com'],
          subject: `New Booking from ${body.full_name || body.name || 'Client'}`,
          html: `
            <h2>New Booking Request</h2>
            <p><b>Name:</b> ${body.full_name || body.name || 'Client Booking'}</p>
            <p><b>Email:</b> ${body.email || 'Not provided'}</p>
            <p><b>Phone/WhatsApp:</b> ${body.phone || body.whatsapp || 'Not provided'}</p>
            <p><b>Project Type:</b> ${body.project_type || 'Web Application'}</p>
            <p><b>Preferred Contact:</b> ${body.preferred_contact || 'WhatsApp'}</p>
            <p><b>Details:</b><br/>${body.details || body.message || 'Consultation booking'}</p>
          `,
        })
      } catch (emailErr: any) {
        console.warn('Resend email notice:', emailErr.message || emailErr)
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.warn('Bookings API handler note:', err.message || err)
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 })
  }
}
