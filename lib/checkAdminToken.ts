// lib/checkAdminToken.ts
import { NextRequest, NextResponse } from 'next/server'

export function checkAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '')
  if (token !== process.env.ADMIN_API_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
