// app/api/admin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service key
)

const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN! // must match client

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace('Bearer ', '')

  if (token !== ADMIN_API_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { action } = body

  try {
    if (action === 'addProject') {
      const { title, description, image_url } = body
      const { data, error } = await supabase
        .from('projects')
        .insert([{ title, description, image_url }])
      if (error) throw error
      return NextResponse.json({ data })
    }

    if (action === 'updateProject') {
      const { id, title, description, image_url } = body
      const { data, error } = await supabase
        .from('projects')
        .update({ title, description, image_url })
        .eq('id', id)
      if (error) throw error
      return NextResponse.json({ data })
    }

    if (action === 'deleteProject') {
      const { id } = body
      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      if (error) throw error
      return NextResponse.json({ data })
    }

    if (action === 'updateBooking') {
      const { id, updates } = body // updates is partial booking row
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
      if (error) throw error
      return NextResponse.json({ data })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
