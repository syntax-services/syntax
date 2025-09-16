// /app/api/bookings/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        full_name: body.full_name || null,
        phone: body.phone || null,
        whatsapp: body.whatsapp || null,
        project_type: body.project_type || null,
        details: body.details || null,
        preferred_contact: body.preferred_contact || null
      }
    ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, data })
}
