// app/api/admin/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseService } from '@/lib/supabaseService'

export const dynamic = 'force-dynamic'

const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN || process.env.NEXT_PUBLIC_ADMIN_API_TOKEN

function checkAdminAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace('Bearer ', '')
  return token === ADMIN_API_TOKEN
}

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized admin token' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { action } = body

    // 1. PARTNER & ACCESS KEY GENERATOR (Token + Surname)
    if (action === 'createPartner') {
      const { surname, full_name, email, phone_whatsapp, role, payout_account_name, payout_bank, payout_account_number } = body
      if (!surname || !full_name || !role) {
        return NextResponse.json({ error: 'Surname, Full Name, and Role are required' }, { status: 400 })
      }

      // Generate random string key (e.g. SYN-SCOUT-7829 / SYN-CLOSER-4401 / SYN-DUAL-9182)
      const rolePrefix = role === 'scout' ? 'SCOUT' : role === 'closer' ? 'CLOSER' : 'DUAL'
      const randomDigits = Math.floor(1000 + Math.random() * 9000)
      const token = `SYN-${rolePrefix}-${randomDigits}`

      const { data, error } = await supabaseService
        .from('partners')
        .insert([
          {
            token,
            surname: surname.trim(),
            full_name,
            email,
            phone_whatsapp: phone_whatsapp || '',
            role,
            payout_account_name,
            payout_bank,
            payout_account_number,
          },
        ])
        .select('*')
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, partner: data })
    }

    // 2. LEAD VERIFICATION & PIPELINE UPDATE
    if (action === 'updateLeadStatus') {
      const { lead_id, status, is_verified, demo_url, admin_notes, deal_value } = body
      const updateData: any = { status, updated_at: new Date().toISOString() }

      if (typeof is_verified === 'boolean') updateData.is_verified = is_verified
      if (demo_url) updateData.demo_url = demo_url
      if (admin_notes) updateData.admin_notes = admin_notes
      if (deal_value) {
        updateData.deal_value = deal_value
        updateData.scout_commission = Math.round(deal_value * 0.03)
        updateData.closer_commission = Math.round(deal_value * 0.05)
        updateData.total_commission = Math.round(deal_value * 0.08)
      }

      const { data, error } = await supabaseService
        .from('leads')
        .update(updateData)
        .eq('id', lead_id)
        .select('*')
        .single()

      if (error) throw error

      // If closed and paid, automatically update partner total_earned
      if (status === 'closed_paid' && data) {
        if (data.scout_token) {
          await supabaseService.rpc('increment_partner_earnings', {
            p_token: data.scout_token,
            p_amount: data.scout_commission,
          }).catch(() => {})
        }
        if (data.closer_token && data.closer_token !== data.scout_token) {
          await supabaseService.rpc('increment_partner_earnings', {
            p_token: data.closer_token,
            p_amount: data.closer_commission,
          }).catch(() => {})
        }
      }

      return NextResponse.json({ success: true, lead: data })
    }

    // 3. PROJECT CRUD (Live client builds)
    if (action === 'addProject') {
      const { title, client_name, description, image_url, live_url, category, built_year, annual_renewal_fee, renewal_due_date } = body
      const { data, error } = await supabaseService
        .from('projects')
        .insert([
          {
            title,
            client_name: client_name || title,
            description,
            image_url,
            live_url,
            category: category || 'Web Application',
            built_year: built_year || new Date().getFullYear(),
            annual_renewal_fee: annual_renewal_fee || 35000,
            renewal_due_date,
            is_live: true,
          },
        ])
        .select('*')
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, project: data })
    }

    // 4. DEMO VAULT CRUD (Sample builds)
    if (action === 'addDemo') {
      const { title, niche, demo_url, thumbnail_url, pitch_script, objection_handlers } = body
      const { data, error } = await supabaseService
        .from('demos')
        .insert([
          {
            title,
            niche,
            demo_url,
            thumbnail_url,
            pitch_script: pitch_script || 'Focus on speed, mobile design, and instant WhatsApp booking.',
            objection_handlers: objection_handlers || 'Address budget concerns by explaining our 2-part payment option.',
          },
        ])
        .select('*')
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, demo: data })
    }

    // 5. FINANCIAL LEDGER RECORD
    if (action === 'addFinancialRecord') {
      const { type, client_or_partner_name, amount, notes, due_date, status } = body
      const { data, error } = await supabaseService
        .from('financial_ledgers')
        .insert([
          {
            type,
            client_or_partner_name,
            amount,
            notes,
            due_date,
            status: status || 'pending',
          },
        ])
        .select('*')
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, record: data })
    }

    return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
