import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'
import { checkAdmin } from '@/lib/checkAdminToken'

export async function GET(req: NextRequest) {
  const unauthorized = checkAdmin(req)
  if (unauthorized) return unauthorized

  const searchParams = req.nextUrl.searchParams
  const type = searchParams.get('type') // 'contacts' or 'bookings'

  if (!type || !['contacts', 'bookings'].includes(type))
    return NextResponse.json({ error: 'type must be contacts or bookings' }, { status: 400 })

  const table = type === 'contacts' ? 'contact' : 'bookings'
  const { data, error } = await supabaseService.from(table).select('*')

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // convert to CSV manually
  const keys = Object.keys(data[0] || {})
  const rows = [
    keys.join(','),
    ...data.map((row: any) =>
      keys.map((k) => `"${(row[k] ?? '').toString().replace(/"/g, '""')}"`).join(',')
    ),
  ]
  const csv = rows.join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${type}.csv"`,
    },
  })
}
