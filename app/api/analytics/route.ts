// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { page_path, public_ip, deviceType, osName, browserName, userAgent, fingerprint, referrer } = body

    // Retrieve IP from headers or client public_ip
    const forwardedFor = req.headers.get('x-forwarded-for')
    const headerIp = forwardedFor ? forwardedFor.split(',')[0] : req.headers.get('x-real-ip')
    const finalIp = public_ip || headerIp || '127.0.0.1'

    // Save into visitor_analytics table
    await supabaseService.from('visitor_analytics').insert([
      {
        ip_address: finalIp,
        user_agent: `${fingerprint || 'FP-UNKNOWN'} | ${userAgent || ''}`,
        device_type: deviceType,
        os_name: osName,
        browser_name: browserName,
        page_path: page_path || '/',
        referrer: referrer || '',
      },
    ])

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || ''
    const token = authHeader.replace('Bearer ', '')

    if (token !== process.env.ADMIN_API_TOKEN && token !== process.env.NEXT_PUBLIC_ADMIN_API_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseService
      .from('visitor_analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error
    return NextResponse.json({ data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
