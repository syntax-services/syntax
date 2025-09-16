import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function AdminBookingsPage() {
  const { data: bookings, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div>Error: {error.message}</div>

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <div className="space-y-4">
        {bookings?.map((b: any) => (
          <div key={b.id} className="p-4 border rounded">
            <div className="font-semibold">{b.full_name}</div>
            <div className="text-sm text-gray-500">{b.phone} • {b.project_type}</div>
            <p className="mt-2">{b.details}</p>
            <div className="text-xs text-gray-400 mt-1">{new Date(b.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
