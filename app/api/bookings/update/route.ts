import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'
import { checkAdmin } from '@/lib/checkAdminToken'

export async function POST(req: NextRequest) {
  const unauthorized = checkAdmin(req)
  if (unauthorized) return unauthorized

  const { id, status, admin_notes } = await req.json()

  const { error } = await supabaseService
    .from('bookings')
    .update({ status, admin_notes })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
