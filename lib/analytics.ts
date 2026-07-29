// lib/analytics.ts
'use client'

export function getDeviceDetails() {
  if (typeof window === 'undefined') return {}
  const ua = navigator.userAgent
  let deviceType = 'Desktop'
  if (/mobile/i.test(ua)) deviceType = 'Mobile'
  else if (/tablet|ipad/i.test(ua)) deviceType = 'Tablet'

  let osName = 'Unknown OS'
  if (/windows/i.test(ua)) osName = 'Windows'
  else if (/macintosh|mac os x/i.test(ua)) osName = 'macOS'
  else if (/android/i.test(ua)) osName = 'Android'
  else if (/iphone|ipad|ipod/i.test(ua)) osName = 'iOS'
  else if (/linux/i.test(ua)) osName = 'Linux'

  let browserName = 'Browser'
  if (/chrome|crios/i.test(ua)) browserName = 'Chrome'
  else if (/firefox|fxios/i.test(ua)) browserName = 'Firefox'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browserName = 'Safari'
  else if (/edg/i.test(ua)) browserName = 'Edge'

  // Generate lightweight device fingerprint (no API key needed)
  const screenRes = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '0x0'
  const timeZone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC'
  const fingerprint = `FP-${btoa(encodeURIComponent(`${screenRes}_${timeZone}_${navigator.platform}`)).substring(0, 12)}`

  return { deviceType, osName, browserName, userAgent: ua, fingerprint }
}

let lastPagePath = ''
let lastCallTime = 0

export async function logPageView(pagePath: string) {
  try {
    const now = Date.now()
    if (pagePath === lastPagePath && now - lastCallTime < 2000) {
      return
    }
    lastPagePath = pagePath
    lastCallTime = now

    const details = getDeviceDetails()

    const publicIp = 'server-resolved'

    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_path: pagePath,
        public_ip: publicIp,
        ...details,
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      }),
    })
  } catch (e) {
    // Silent fail for analytics
  }
}
