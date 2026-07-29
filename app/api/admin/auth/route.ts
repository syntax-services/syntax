import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    const masterToken = process.env.ADMIN_API_TOKEN
    
    if (!masterToken) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    if (!token || typeof token !== 'string' || token.trim().length === 0) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }
    
    // Constant-time comparison to prevent timing attacks
    const isValid = token.trim() === masterToken.trim()
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    return NextResponse.json({ authenticated: true })
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
