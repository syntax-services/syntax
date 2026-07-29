// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import {
  ShieldCheck,
  Plus,
  Trash2,
  Globe,
  Vault,
  Key,
  FileVideo,
  Image as ImageIcon,
  MessageSquare,
  LifeBuoy,
  Users,
  CheckCircle2,
} from 'lucide-react'

export default function UpgradedAdminCommandCenter() {
  const [tokenInput, setTokenInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  const [activeTab, setActiveTab] = useState<'projects' | 'demos' | 'inquiries' | 'bookings' | 'support' | 'tokens' | 'analytics'>('projects')

  // Real Data States
  const [projects, setProjects] = useState<any[]>([])
  const [demos, setDemos] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [supportTickets, setSupportTickets] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  // New Live Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Web Application',
    client_name: '',
    description: '',
    demo_url: '',
    image_url: '',
    video_url: '',
    year: new Date().getFullYear(),
  })

  // New Demo Form State
  const [newDemo, setNewDemo] = useState({
    title: '',
    niche: 'E-Commerce & Retail',
    demo_url: '',
    image_url: '',
    video_url: '',
    pitch_script: '',
    objection_handlers: '',
  })

  // Token Generator Form State
  const [newToken, setNewToken] = useState({
    surname: '',
    full_name: '',
    email: '',
    role: 'scout',
  })
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenInput.trim() }),
      })
      if (res.ok) {
        setIsAuthenticated(true)
        setAuthError('')
        fetchAdminData()
      } else {
        setAuthError('Invalid Admin Access Token.')
      }
    } catch (err) {
      setAuthError('Error authenticating.')
    }
  }

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      // Fetch Projects
      const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      if (pData) setProjects(pData)

      // Fetch Demos
      const { data: dData } = await supabase.from('demos').select('*').order('created_at', { ascending: false })
      if (dData) setDemos(dData)

      // Fetch Contact Submissions
      const { data: cData } = await supabase.from('contact').select('*').order('created_at', { ascending: false })
      if (cData) setContacts(cData)

      // Fetch Bookings
      const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
      if (bData) setBookings(bData)

      // Fetch Support Tickets
      const { data: sData } = await supabase.from('partner_support_tickets').select('*').order('created_at', { ascending: false })
      if (sData) setSupportTickets(sData)

      // Fetch Visitor Analytics
      const { data: aData } = await supabase.from('visitor_analytics').select('*').order('created_at', { ascending: false }).limit(100)
      if (aData) setAnalytics(aData)
    } catch (err) {
      console.error('Error loading admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  // File Upload directly to Supabase storage bucket 'syntax'
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetForm: 'project' | 'demo',
    targetField: 'image_url' | 'video_url'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage.from('syntax').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const { data: publicUrlData } = supabase.storage.from('syntax').getPublicUrl(filePath)

      if (targetForm === 'project') {
        setNewProject((prev) => ({ ...prev, [targetField]: publicUrlData.publicUrl }))
      } else {
        setNewDemo((prev) => ({ ...prev, [targetField]: publicUrlData.publicUrl }))
      }
    } catch (err: any) {
      alert(`Upload error: ${err.message || 'Failed to upload file to syntax bucket.'}`)
    } finally {
      setUploading(false)
    }
  }

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const slug = newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      const payload = {
        title: newProject.title,
        category: newProject.category,
        client_name: newProject.client_name || 'Syntax Client',
        description: newProject.description,
        demo_url: newProject.demo_url || 'https://syntax.com.ng',
        image_url: newProject.image_url || null,
        video_url: newProject.video_url || null,
        slug,
        year: Number(newProject.year),
      }

      const { error } = await supabase.from('projects').insert([payload])
      if (error) throw error

      setNewProject({
        title: '',
        category: 'Web Application',
        client_name: '',
        description: '',
        demo_url: '',
        image_url: '',
        video_url: '',
        year: new Date().getFullYear(),
      })
      fetchAdminData()
    } catch (err: any) {
      alert(`Error creating project: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateDemo = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        title: newDemo.title,
        niche: newDemo.niche,
        demo_url: newDemo.demo_url,
        image_url: newDemo.image_url || null,
        video_url: newDemo.video_url || null,
        pitch_script: newDemo.pitch_script,
        objection_handlers: newDemo.objection_handlers,
      }

      const { error } = await supabase.from('demos').insert([payload])
      if (error) throw error

      setNewDemo({
        title: '',
        niche: 'E-Commerce & Retail',
        demo_url: '',
        image_url: '',
        video_url: '',
        pitch_script: '',
        objection_handlers: '',
      })
      fetchAdminData()
    } catch (err: any) {
      alert(`Error creating demo: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchAdminData()
  }

  const handleDeleteDemo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this demo build?')) return
    await supabase.from('demos').delete().eq('id', id)
    fetchAdminData()
  }

  const handleGenerateToken = async (e: React.FormEvent) => {
    e.preventDefault()
    const prefix = newToken.role === 'scout' ? 'SYN-SCOUT' : newToken.role === 'closer' ? 'SYN-CLOSER' : 'SYN-EXEC'
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    const randomNum = arr[0] % 9000 + 1000;
    const token = `${prefix}-${randomNum}`

    try {
      const { error } = await supabase.from('partners').insert([
        {
          access_token: token,
          surname: newToken.surname.trim(),
          full_name: newToken.full_name.trim(),
          email: newToken.email.trim() || null,
          role: newToken.role,
        },
      ])

      if (error) throw error
      setGeneratedKey(`Token: ${token} | Surname: ${newToken.surname.trim()}`)
      setNewToken({ surname: '', full_name: '', email: '', role: 'scout' })
    } catch (err: any) {
      alert(`Error generating token: ${err.message}`)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-4 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-2xl backdrop-blur-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6 mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-center">Admin Command Center</h1>
          <p className="text-xs text-neutral-500 text-center mt-1">
            Enter your secret master token to manage live projects, demos, and support.
          </p>

          {authError && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              placeholder="Admin API Token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full px-5 py-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors"
            >
              Authenticate Master Admin
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 max-w-7xl mx-auto text-neutral-900 dark:text-neutral-100">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            MASTER ADMIN LOGGED IN
          </span>
          <h1 className="text-3xl font-extrabold mt-2">Syntax Control Center</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap gap-2 mt-4 md:mt-0 pb-2 md:pb-0 scrollbar-hide">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'projects'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Live Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab('demos')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'demos'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Demo Vault ({demos.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'inquiries'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Inquiries ({contacts.length})
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'bookings'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'support'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Support Tickets ({supportTickets.length})
          </button>

          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'tokens'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Access Keys
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'analytics'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Analytics ({analytics.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Live Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-orange-500" />
              Add Live Project
            </h2>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wearabbie Store"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wearabbie Nigeria"
                  value={newProject.client_name}
                  onChange={(e) => setNewProject({ ...newProject, client_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Live URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://wearabbie.com.ng"
                  value={newProject.demo_url}
                  onChange={(e) => setNewProject({ ...newProject, demo_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Image Upload (Bucket &apos;syntax&apos;)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'project', 'image_url')}
                  className="w-full text-xs text-neutral-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-200 dark:file:bg-neutral-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Video Upload (.MP4 to &apos;syntax&apos;)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e, 'project', 'video_url')}
                  className="w-full text-xs text-neutral-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-neutral-200 dark:file:bg-neutral-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="High-speed custom e-commerce store..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full py-3 rounded-full bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-orange-600 shadow-md"
              >
                {uploading ? 'Uploading...' : 'Publish Live Project'}
              </button>
            </form>
          </div>

          {/* Existing Projects List with Image & Video Previews */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4">Live Client Projects ({projects.length})</h2>
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                {/* Media Preview Thumbnail */}
                <div className="w-full sm:w-28 h-20 rounded-2xl bg-neutral-950 overflow-hidden shrink-0">
                  {p.video_url ? (
                    <video src={p.video_url} className="w-full h-full object-cover" />
                  ) : p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                      <Globe className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-100 dark:bg-neutral-800">
                      {p.category || 'Web App'}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">{p.client_name}</span>
                  </div>
                  <h3 className="text-base font-bold mt-1 text-neutral-900 dark:text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{p.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={p.demo_url || p.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-orange-500"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    className="p-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Demo Vault Manager CRUD */}
      {activeTab === 'demos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-500" />
              Add Sample Demo Build
            </h2>

            <form onSubmit={handleCreateDemo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Demo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mimms Cartel E-Commerce"
                  value={newDemo.title}
                  onChange={(e) => setNewDemo({ ...newDemo, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Demo URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://syntax.com.ng/demos/marketline"
                  value={newDemo.demo_url}
                  onChange={(e) => setNewDemo({ ...newDemo, demo_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Pitch Script *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hello! We built a fast e-commerce demo..."
                  value={newDemo.pitch_script}
                  onChange={(e) => setNewDemo({ ...newDemo, pitch_script: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Objection Handling Guide *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Client: We have a site -> Response: Our builds load under 1.5s..."
                  value={newDemo.objection_handlers}
                  onChange={(e) => setNewDemo({ ...newDemo, objection_handlers: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
              >
                Publish Sample Demo
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4">Sample Demo Vault ({demos.length})</h2>
            {demos.map((d) => (
              <div
                key={d.id}
                className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start justify-between shadow-sm"
              >
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {d.niche || 'Demo'}
                  </span>
                  <h3 className="text-lg font-bold mt-1">{d.title}</h3>
                  <p className="text-xs text-neutral-500 font-mono mt-1">{d.demo_url}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={d.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-purple-500"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDeleteDemo(d.id)}
                    className="p-2.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Tickets Inbox Tab */}
      {activeTab === 'support' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Partner Support Tickets ({supportTickets.length})</h2>
          {supportTickets.length === 0 ? (
            <p className="text-xs text-neutral-500">No partner support complaints or tickets submitted yet.</p>
          ) : (
            supportTickets.map((st) => (
              <div
                key={st.id}
                className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-extrabold text-base">{st.partner_name || 'Partner Support'}</h3>
                    <p className="text-xs text-neutral-400 font-mono">{st.partner_email}</p>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {new Date(st.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-orange-500 mt-2">Subject: {st.subject}</h4>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-950 p-4 rounded-2xl mt-2">
                  {st.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Inquiries ({contacts.length})</h2>
          {contacts.length === 0 ? (
            <p className="text-xs text-neutral-500">No inquiries found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((c) => (
                <div key={c.id} className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base mb-1">{c.name}</h3>
                    {c.email && <p className="text-xs text-neutral-500 font-mono">{c.email}</p>}
                    {c.phone && <p className="text-xs text-neutral-500 font-mono">{c.phone}</p>}
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mt-2 mb-2">{c.project_type}</p>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-950 p-3 rounded-xl mt-2 line-clamp-4">{c.message}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-neutral-400">{new Date(c.created_at).toLocaleDateString()}</span>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase">Pref: {c.preferred_contact}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Bookings ({bookings.length})</h2>
          {bookings.length === 0 ? (
            <p className="text-xs text-neutral-500">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((b) => (
                <div key={b.id} className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base mb-1">{b.name || b.full_name}</h3>
                    {b.email && <p className="text-xs text-neutral-500 font-mono">{b.email}</p>}
                    {b.phone && <p className="text-xs text-neutral-500 font-mono">{b.phone}</p>}
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mt-2 mb-2">{b.project_type || b.service}</p>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-950 p-3 rounded-xl mt-2 line-clamp-4">{b.message || b.details}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-neutral-400">{new Date(b.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Access Keys Generator Tab */}
      {activeTab === 'tokens' && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-500" />
            Generate Partner Token
          </h2>

          {generatedKey && (
            <div className="p-4 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              {generatedKey}
            </div>
          )}

          <form onSubmit={handleGenerateToken} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Surname *</label>
              <input
                type="text"
                required
                placeholder="e.g. Adeyemi"
                value={newToken.surname}
                onChange={(e) => setNewToken({ ...newToken, surname: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Tobi Adeyemi"
                value={newToken.full_name}
                onChange={(e) => setNewToken({ ...newToken, full_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Role *</label>
              <select
                value={newToken.role}
                onChange={(e) => setNewToken({ ...newToken, role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
              >
                <option value="scout">Scout (3% Commission)</option>
                <option value="closer">Closer (5% Commission)</option>
                <option value="combined">Combined Executive (8% Commission)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg"
            >
              Generate Access Token
            </button>
          </form>
        </div>
      )}

      {/* Analytics Radar Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Visitor Activity &amp; Device Analytics ({analytics.length})</h2>
          <div className="overflow-x-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-500 uppercase font-mono">
                <tr>
                  <th className="p-4">Time</th>
                  <th className="p-4">Page</th>
                  <th className="p-4">Device Fingerprint</th>
                  <th className="p-4">Device / OS</th>
                  <th className="p-4">Browser</th>
                  <th className="p-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {analytics.map((a) => {
                  const fp = a.user_agent ? a.user_agent.split('|')[0].trim() : 'FP-UNKNOWN'
                  return (
                    <tr key={a.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/50">
                      <td className="p-4 font-mono">{new Date(a.created_at).toLocaleTimeString()}</td>
                      <td className="p-4 font-bold text-orange-500">{a.page_path || a.visited_page || '/'}</td>
                      <td className="p-4 font-mono text-purple-600 dark:text-purple-400 font-bold">{fp}</td>
                      <td className="p-4">
                        {a.device_type} ({a.os_name})
                      </td>
                      <td className="p-4">{a.browser_name}</td>
                      <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{a.ip_address || '127.0.0.1'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
