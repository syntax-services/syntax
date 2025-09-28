// app/api/indexnow/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const urlList: string[] = body.urlList || []

    if (!Array.isArray(urlList) || urlList.length === 0) {
      return NextResponse.json({ success: false, error: 'urlList must be a non-empty array' }, { status: 400 })
    }

    const host = 'syntax.com.ng' // your domain
    const key = 'f5157ccc525e40c7b6d52d34780e2c22' // your IndexNow key

    const payload = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList,
    }

    const res = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    const text = await res.text()
    if (!res.ok) {
      return NextResponse.json({ success: false, status: res.status, error: text }, { status: 500 })
    }
    return NextResponse.json({ success: true, response: text })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 })
  }
}
