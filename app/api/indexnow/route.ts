// app/api/indexnow/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { urlList } = await req.json()

    const host = 'syntax.com.ng' // your domain
    const key = 'f5157ccc525e40c7b6d52d34780e2c22' // your IndexNow key

    const body = {
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList,
    }

    const res = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return NextResponse.json({ success: false, error: await res.text() }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
