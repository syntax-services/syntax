// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'

export const dynamic = 'force-dynamic'

// Helper to compute commissions (3% scout, 5% closer, 8% combined on ₦150k default)
function calculateCommissions(dealValue: number, scoutToken?: string, closerToken?: string) {
  const isSamePartner = scoutToken && closerToken && scoutToken === closerToken
  const scoutCommission = scoutToken ? Math.round(dealValue * 0.03) : 0 // 3% = ₦4,500 on ₦150k
  const closerCommission = closerToken ? Math.round(dealValue * 0.05) : 0 // 5% = ₦7,500 on ₦150k
  const totalCommission = isSamePartner
    ? Math.round(dealValue * 0.08) // 8% = ₦12,000 on ₦150k
    : scoutCommission + closerCommission

  return { scoutCommission, closerCommission, totalCommission }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { token, business_name, social_handle, followers_count, business_niche, notes, can_scout_pitch } = body

    if (!token || !business_name || !social_handle) {
      return NextResponse.json({ error: 'Missing required lead details' }, { status: 400 })
    }

    // Verify partner token
    const { data: partner, error: partnerErr } = await supabaseService
      .from('partners')
      .select('token, role')
      .eq('token', token.trim().toUpperCase())
      .single()

    if (partnerErr || !partner) {
      return NextResponse.json({ error: 'Invalid partner token' }, { status: 401 })
    }

    const defaultDealValue = 150000
    const scoutToken = partner.role === 'scout' || partner.role === 'scout_closer' ? partner.token : undefined
    const closerToken = partner.role === 'closer' ? partner.token : (can_scout_pitch ? partner.token : undefined)

    const { scoutCommission, closerCommission, totalCommission } = calculateCommissions(
      defaultDealValue,
      scoutToken,
      closerToken
    )

    const { data: lead, error: leadErr } = await supabaseService
      .from('leads')
      .insert([
        {
          scout_token: scoutToken,
          closer_token: closerToken,
          business_name,
          social_handle,
          followers_count: followers_count || 0,
          business_niche: business_niche || 'General',
          notes,
          can_scout_pitch: !!can_scout_pitch,
          status: 'lead_received',
          deal_value: defaultDealValue,
          scout_commission: scoutCommission,
          closer_commission: closerCommission,
          total_commission: totalCommission,
        },
      ])
      .select('*')
      .single()

    if (leadErr) throw leadErr

    return NextResponse.json({ success: true, lead })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token parameter is required' }, { status: 400 })
    }

    const cleanToken = token.trim().toUpperCase()

    // Fetch leads where partner is scout or closer
    const { data: leads, error } = await supabaseService
      .from('leads')
      .select('*')
      .or(`scout_token.eq.${cleanToken},closer_token.eq.${cleanToken}`)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ leads })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
