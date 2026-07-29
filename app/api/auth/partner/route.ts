// app/api/auth/partner/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { token, surname } = await req.json()

    if (!token || !surname) {
      return NextResponse.json({ error: 'Token and Surname are required' }, { status: 400 })
    }

    const cleanToken = token.trim().toUpperCase()
    const cleanSurname = surname.trim().toLowerCase()

    const { data: partner, error } = await supabaseService
      .from('partners')
      .select('*')
      .eq('token', cleanToken)
      .single()

    if (error || !partner) {
      return NextResponse.json({ error: 'Invalid Access Key or Partner record not found' }, { status: 401 })
    }

    if (partner.surname.toLowerCase() !== cleanSurname) {
      return NextResponse.json({ error: 'Invalid Surname for provided Access Key' }, { status: 401 })
    }

    if (!partner.is_active) {
      return NextResponse.json({ error: 'This partner access key has been deactivated' }, { status: 403 })
    }

    return NextResponse.json({ partner })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
