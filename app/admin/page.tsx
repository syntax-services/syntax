// app/admin/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

// -------------------- Types --------------------
type ContactRow = {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

type BookingRow = {
  id: string
  full_name: string | null
  phone: string | null
  whatsapp: string | null
  project_type: string | null
  details: string | null
  preferred_contact: string | null
  status: string | null
  admin_notes: string | null
  created_at: string
}

type ProjectRow = {
  id: string
  title: string
  description: string
  image_url: string | null
  created_at: string
}

// -------------------- Config --------------------
// Do NOT use sensitive secrets with NEXT_PUBLIC (exposes to browser)
// ADMIN_EMAIL is okay client-side for gating
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || ''

// Token should ONLY be used in your backend API routes (not client)
// So here we just keep the function call generic, and API route will validate securely.
export default function AdminDashboard() {
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [bookings, setBookings] = useState<BookingRow[]>([])
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({})
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null)
  const [editImage, setEditImage] = useState<File | null>(null)

  // IndexNow states
  const [indexLoading, setIndexLoading] = useState(false)
  const [indexMsg, setIndexMsg] = useState<string | null>(null)
  const [indexSuccess, setIndexSuccess] = useState<boolean | null>(null)
  const [lastPingAt, setLastPingAt] = useState<string | null>(null)
  const [indexResponse, setIndexResponse] = useState<any>(null)
  const [showIndexDetails, setShowIndexDetails] = useState(false)

  const router = useRouter()

  // -------------------- Auth + Fetch --------------------
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const user = session?.user
      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace('/login')
        return
      }

      await Promise.all([fetchContacts(), fetchBookings(), fetchProjects()])
      setLoading(false)
      setAuthChecked(true)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user
      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace('/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  // -------------------- Fetch Helpers --------------------
  const fetchContacts = async () => {
    const { data } = await supabase
      .from('contact')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setContacts(data as ContactRow[])
  }

  const fetchBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setBookings(data as BookingRow[])
  }

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProjects(data as ProjectRow[])
  }

  // -------------------- API Wrapper --------------------
  const callAdminApi = async (body: any) => {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    return res.json()
  }

  // -------------------- Project Handlers --------------------
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    await callAdminApi({
      action: 'addProject',
      title: newTitle,
      description: newDescription,
      image_url: newImage ? newImage.name : null,
    })
    setNewTitle('')
    setNewDescription('')
    setNewImage(null)
    await fetchProjects()
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return
    await callAdminApi({
      action: 'updateProject',
      id: editingProject.id,
      title: editingProject.title,
      description: editingProject.description,
      image_url: editImage ? editImage.name : editingProject.image_url,
    })
    setEditingProject(null)
    setEditImage(null)
    await fetchProjects()
  }

  const handleDeleteProject = async (id: string) => {
    await callAdminApi({ action: 'deleteProject', id })
    await fetchProjects()
  }

  const handleEditProject = (project: ProjectRow) => {
    setEditingProject(project)
    setEditImage(null)
  }

  // -------------------- Bookings Update --------------------
  const handleBookingUpdate = async (id: string, updates: Partial<BookingRow>) => {
    await callAdminApi({ action: 'updateBooking', id, updates })
    await fetchBookings()
  }

  // -------------------- CSV Export --------------------
  const exportCSV = (rows: any[], filename: string) => {
    if (!rows.length) return
    const headers = Object.keys(rows[0])
    const csv = [
      headers.join(','),
      ...rows.map((r) =>
        headers.map((h) => `"${(r[h] ?? '').toString().replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  // -------------------- IndexNow --------------------
  const DEFAULT_INDEX_URLS = [
    'https://syntax.com.ng/',
    'https://syntax.com.ng/portfolio',
    'https://syntax.com.ng/services',
    'https://syntax.com.ng/book',
    'https://syntax.com.ng/sitemap.xml',
  ]

  const handleIndexNow = async (urls: string[] = DEFAULT_INDEX_URLS) => {
    setIndexLoading(true)
    setIndexMsg(null)
    setIndexSuccess(null)
    setIndexResponse(null)
    setShowIndexDetails(false)

    try {
      const res = await fetch('/api/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urlList: urls }),
      })

      const json = await res.json().catch(() => null)
      if (!res.ok) {
        setIndexSuccess(false)
        setIndexMsg(json?.error || `IndexNow failed (status ${res.status})`)
        setIndexResponse(json)
      } else {
        setIndexSuccess(true)
        setIndexMsg('IndexNow ping succeeded — search engines notified.')
        setIndexResponse(json)
      }
      setLastPingAt(new Date().toISOString())
    } catch (err: any) {
      setIndexSuccess(false)
      setIndexMsg('Network error — could not reach the IndexNow endpoint.')
      setIndexResponse(err?.message || String(err))
      setLastPingAt(new Date().toISOString())
    } finally {
      setIndexLoading(false)
    }
  }

  // -------------------- Render --------------------
  if (!authChecked || loading) return <p className="p-6 text-center">Loading…</p>

  return (
    <main className="p-6 bg-syntaxCream dark:bg-syntaxDark min-h-screen text-syntaxDark dark:text-syntaxCream">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="flex items-center gap-2">
          {/* IndexNow Ping Button */}
          <div className="flex flex-col items-end">
            <button
              onClick={() => handleIndexNow()}
              disabled={indexLoading}
              title="Notify search engines (IndexNow) about important pages"
              className="px-3 py-2 rounded-3xl bg-syntaxBlue hover:bg-blue-700 text-white font-semibold shadow-lg transition inline-flex items-center gap-2"
            >
              {indexLoading ? 'Pinging…' : 'Notify Search Engines'}
            </button>

            {/* small status / timestamp */}
            <div className="mt-2 text-right">
              {indexMsg && (
                <div
                  className={`text-sm ${indexSuccess ? 'text-green-700' : 'text-red-600'
                    }`}
                >
                  {indexMsg}
                </div>
              )}
              {lastPingAt && (
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Last ping: {new Date(lastPingAt).toLocaleString()}
                  {indexResponse && (
                    <button
                      onClick={() => setShowIndexDetails((s) => !s)}
                      className="ml-3 text-xs underline"
                    >
                      {showIndexDetails ? 'Hide details' : 'Show details'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* details panel (collapsible) */}
            {showIndexDetails && indexResponse && (
              <pre className="mt-2 p-3 bg-white dark:bg-neutral-900 rounded-lg text-xs max-w-md overflow-auto shadow">
                {typeof indexResponse === 'string'
                  ? indexResponse
                  : JSON.stringify(indexResponse, null, 2)}
              </pre>
            )}
          </div>

          {/* Export / Logout buttons */}
          <button
            onClick={() => exportCSV(contacts, 'contacts.csv')}
            className="px-3 py-2 rounded bg-green-600 text-white"
          >
            Export Contacts
          </button>
          <button
            onClick={() => exportCSV(bookings, 'bookings.csv')}
            className="px-3 py-2 rounded bg-green-600 text-white"
          >
            Export Bookings
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.replace('/login')
            }}
            className="px-4 py-2 rounded-xl bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTACTS TABLE */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Contact Submissions</h2>
        <div className="overflow-x-auto bg-white dark:bg-neutral-900 rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b dark:border-neutral-700">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b dark:border-neutral-800">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.message}</td>
                  <td className="p-3">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td className="p-3" colSpan={4}>
                    No contact submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* BOOKINGS */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Bookings</h2>
        <div className="overflow-x-auto bg-white dark:bg-neutral-900 rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b dark:border-neutral-700">
                <th className="p-3">Full Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">WhatsApp</th>
                <th className="p-3">Preferred Contact</th>
                <th className="p-3">Project Type</th>
                <th className="p-3">Details</th>
                <th className="p-3">Status</th>
                <th className="p-3">Admin Notes</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const isExpanded = expandedDetails[b.id]
                const displayedDetails =
                  !b.details
                    ? ''
                    : isExpanded
                      ? b.details
                      : b.details.length > 100
                        ? b.details.slice(0, 100) + '…'
                        : b.details
                return (
                  <tr key={b.id} className="border-b dark:border-neutral-800 align-top">
                    <td className="p-3">{b.full_name}</td>
                    <td className="p-3">{b.phone}</td>
                    <td className="p-3">{b.whatsapp}</td>
                    <td className="p-3">{b.preferred_contact}</td>
                    <td className="p-3">{b.project_type}</td>
                    <td className="p-3">
                      <div className="whitespace-pre-wrap">{displayedDetails}</div>
                      {b.details && b.details.length > 100 && (
                        <button
                          onClick={() =>
                            setExpandedDetails((prev) => ({
                              ...prev,
                              [b.id]: !isExpanded,
                            }))
                          }
                          className="text-blue-600 dark:text-blue-400 text-sm mt-1 underline"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </td>
                    <td className="p-3">
                      <select
                        value={b.status ?? 'pending'}
                        onChange={(e) =>
                          handleBookingUpdate(b.id, { status: e.target.value })
                        }
                        className="px-2 py-1 rounded border"
                      >
                        <option value="pending">Pending</option>
                        <option value="processed">Processed</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <textarea
                        value={b.admin_notes ?? ''}
                        onChange={(e) =>
                          handleBookingUpdate(b.id, { admin_notes: e.target.value })
                        }
                        className="w-40 px-2 py-1 rounded border dark:bg-neutral-800"
                      />
                    </td>
                    <td className="p-3">
                      {new Date(b.created_at).toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Projects</h2>

        {editingProject ? (
          <form
            onSubmit={handleUpdateProject}
            className="bg-white dark:bg-neutral-900 rounded-xl shadow p-4 mb-6 space-y-3"
          >
            <h3 className="text-xl font-semibold">Edit Project</h3>
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) =>
                setEditingProject({ ...editingProject, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded border dark:bg-neutral-800"
              required
            />
            <textarea
              value={editingProject.description}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded border dark:bg-neutral-800"
              rows={3}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditImage(e.target.files ? e.target.files[0] : null)
              }
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleAddProject}
            className="bg-white dark:bg-neutral-900 rounded-xl shadow p-4 mb-6 space-y-3"
          >
            <h3 className="text-xl font-semibold">Add New Project</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-neutral-800"
              required
            />
            <textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-neutral-800"
              rows={3}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewImage(e.target.files ? e.target.files[0] : null)
              }
            />
            <button
              type="submit"
              className="bg-syntaxBlue hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            >
              Upload Project
            </button>
          </form>
        )}

        <div className="overflow-x-auto bg-white dark:bg-neutral-900 rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b dark:border-neutral-700">
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Image</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b dark:border-neutral-800">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.description}</td>
                  <td className="p-3">
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEditProject(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
