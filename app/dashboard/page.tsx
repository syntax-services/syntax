// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import FaintParticleBackground from '@/components/ParticleBackground'
import PartnerTour from '@/components/PartnerTour'
import {
  Zap,
  PlusCircle,
  Building2,
  MapPin,
  Instagram,
  UserCheck,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  LifeBuoy,
  HelpCircle,
  Copy,
  Check,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Send,
} from 'lucide-react'

export default function RedesignedPartnerDashboard() {
  const [authMode, setAuthMode] = useState<'token' | 'register'>('token')

  // Auth Form State
  const [tokenInput, setTokenInput] = useState('')
  const [surnameInput, setSurnameInput] = useState('')
  const [partner, setPartner] = useState<any | null>(null)
  const [authError, setAuthError] = useState('')

  // Registration Form State
  const [registerForm, setRegisterForm] = useState({
    email: '',
    surname: '',
    full_name: '',
    role: 'scout',
  })
  const [registeredKey, setRegisteredKey] = useState<string | null>(null)
  const [copiedToken, setCopiedToken] = useState(false)

  // Interactive Tour State
  const [showTour, setShowTour] = useState(false)

  // Dashboard Tabs: 'pipeline' | 'strategy' | 'demo_request' | 'invoices' | 'support'
  const [activeTab, setActiveTab] = useState<'pipeline' | 'strategy' | 'demo_request' | 'invoices' | 'support'>('pipeline')

  // Official Invoice Request State
  const [invoiceForm, setInvoiceForm] = useState({
    client_business_name: '',
    client_name: '',
    client_email: '',
    client_whatsapp: '',
    client_address: 'Lagos, Nigeria',
    package_title: 'E-Commerce Retail Platform',
    agreed_price: 450000,
    deposit_percentage: 50,
    notes: 'Includes mobile quick-cart drawer, automated WhatsApp checkout, and payment gateway setup.',
  })
  const [activeInvoice, setActiveInvoice] = useState<any | null>(null)
  const [invoiceSuccess, setInvoiceSuccess] = useState('')

  // Institutional Lead Form State
  const [leads, setLeads] = useState<any[]>([])
  const [newLead, setNewLead] = useState({
    client_name: '',
    business_name: '',
    location: '',
    social_page: '',
    decision_maker_role: 'Managing Director / Owner',
    whatsapp: '',
    agreed_price: 280000,
    pain_point: 'No official website (Instagram DM overload)',
    notes: '',
  })
  const [leadSuccess, setLeadSuccess] = useState('')

  // Custom Demo Request State
  const [demoReq, setDemoReq] = useState({
    client_business_name: '',
    client_industry: 'E-Commerce & Retail',
    client_whatsapp: '',
    client_social: '',
    requested_features: '',
    special_notes: '',
  })
  const [demoReqSuccess, setDemoReqSuccess] = useState('')

  // Support Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    message: '',
  })
  const [ticketSuccess, setTicketSuccess] = useState('')

  const handleTokenLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    const cleanToken = tokenInput.trim()
    const cleanSurname = surnameInput.trim().toLowerCase()

    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('access_token', cleanToken)

      if (error || !data || data.length === 0) {
        setAuthError('Invalid Access Token. Please check your token and try again.')
        return
      }

      const match = data.find((p) => p.surname.toLowerCase() === cleanSurname)
      if (!match) {
        setAuthError('Surname does not match the record for this Access Token.')
        return
      }

      setPartner(match)
      fetchPartnerLeads(match.access_token)
    } catch (err: any) {
      setAuthError('Authentication error. Please try again.')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setRegisteredKey(null)

    const prefix = registerForm.role === 'scout' ? 'SYN-SCOUT' : registerForm.role === 'closer' ? 'SYN-CLOSER' : 'SYN-EXEC'
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const generatedToken = `${prefix}-${randomNum}`

    try {
      const { data, error } = await supabase.from('partners').insert([
        {
          access_token: generatedToken,
          email: registerForm.email.trim(),
          surname: registerForm.surname.trim(),
          full_name: registerForm.full_name.trim(),
          role: registerForm.role,
        },
      ]).select('*').single()

      if (error) {
        throw error
      }

      setRegisteredKey(generatedToken)
      setPartner(data)
      setShowTour(true)
    } catch (err: any) {
      setAuthError(`Registration error: ${err.message || 'Failed to create partner record.'}`)
    }
  }

  const fetchPartnerLeads = async (token: string) => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .or(`scout_token.eq.${token},closer_token.eq.${token}`)
      .order('created_at', { ascending: false })

    if (data) setLeads(data)
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!partner) return

    const price = Number(newLead.agreed_price) || 280000
    const scoutComm = price * 0.03
    const closerComm = price * 0.05

    try {
      const { error } = await supabase.from('leads').insert([
        {
          scout_token: partner.role === 'scout' || partner.role === 'combined' ? partner.access_token : null,
          closer_token: partner.role === 'closer' || partner.role === 'combined' ? partner.access_token : null,
          client_name: newLead.client_name,
          business_name: newLead.business_name,
          whatsapp: `${newLead.whatsapp} | Loc: ${newLead.location} | Social: ${newLead.social_page}`,
          agreed_price: price,
          scout_commission: scoutComm,
          closer_commission: closerComm,
          status: 'pitching',
          notes: `Role: ${newLead.decision_maker_role} | Pain Point: ${newLead.pain_point} | Notes: ${newLead.notes}`,
        },
      ])

      if (error) console.warn('Lead save note:', error.message)

      setLeadSuccess('Institutional lead registered in pipeline!')
      setTimeout(() => setLeadSuccess(''), 5000)
      setNewLead({
        client_name: '',
        business_name: '',
        location: '',
        social_page: '',
        decision_maker_role: 'Managing Director / Owner',
        whatsapp: '',
        agreed_price: 280000,
        pain_point: 'No official website (Instagram DM overload)',
        notes: '',
      })
      fetchPartnerLeads(partner.access_token)
    } catch (err: any) {
      alert(`Lead submission note: ${err.message}`)
    }
  }

  const handleCustomDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!partner) return

    try {
      const { error } = await supabase.from('partner_demo_requests').insert([
        {
          partner_email: partner.email || `${partner.access_token}@syntax.com.ng`,
          partner_name: partner.full_name,
          client_business_name: demoReq.client_business_name,
          client_industry: demoReq.client_industry,
          client_whatsapp: `${demoReq.client_whatsapp} | Social: ${demoReq.client_social}`,
          requested_features: demoReq.requested_features,
          special_notes: demoReq.special_notes,
        },
      ])

      if (error) console.warn('Demo request note:', error.message)

      setDemoReqSuccess('Custom demo build request submitted to engineering team!')
      setTimeout(() => setDemoReqSuccess(''), 5000)
      setDemoReq({
        client_business_name: '',
        client_industry: 'E-Commerce & Retail',
        client_whatsapp: '',
        client_social: '',
        requested_features: '',
        special_notes: '',
      })
    } catch (err: any) {
      alert(`Demo request note: ${err.message}`)
    }
  }

  const handleSupportTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!partner) return

    try {
      const { error } = await supabase.from('partner_support_tickets').insert([
        {
          partner_email: partner.email || `${partner.access_token}@syntax.com.ng`,
          partner_name: partner.full_name,
          subject: ticketForm.subject,
          message: ticketForm.message,
        },
      ])

      if (error) console.warn('Support ticket note:', error.message)

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Partner Support: ${partner.full_name}`,
          email: partner.email || 'syntaxservices25@gmail.com',
          message: `Subject: ${ticketForm.subject}\n\nMessage: ${ticketForm.message}`,
        }),
      }).catch(() => {})

      setTicketSuccess('Support ticket logged! Notification sent to syntaxservices25@gmail.com & habeebtijanivictor@gmail.com.')
      setTimeout(() => setTicketSuccess(''), 5000)
      setTicketForm({ subject: '', message: '' })
    } catch (err: any) {
      alert(`Support ticket note: ${err.message}`)
    }
  }

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!partner) return

    const invNum = `SYN-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const depositAmt = Math.round(invoiceForm.agreed_price * (invoiceForm.deposit_percentage / 100))

    const invoiceObj = {
      invoice_number: invNum,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      partner_name: partner.full_name,
      partner_token: partner.access_token,
      client_business_name: invoiceForm.client_business_name,
      client_name: invoiceForm.client_name,
      client_email: invoiceForm.client_email || 'Not Provided',
      client_whatsapp: invoiceForm.client_whatsapp,
      client_address: invoiceForm.client_address,
      package_title: invoiceForm.package_title,
      agreed_price: invoiceForm.agreed_price,
      deposit_amount: depositAmt,
      notes: invoiceForm.notes,
    }

    setActiveInvoice(invoiceObj)
    setInvoiceSuccess(`Official Invoice ${invNum} generated! Click below to open and share directly with client.`)
    setTimeout(() => setInvoiceSuccess(''), 6000)
  }

  const copyToken = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  if (!partner) {
    return (
      <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pt-36 pb-24 px-4 flex items-center justify-center overflow-hidden">
        <FaintParticleBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] bg-white/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 shadow-2xl backdrop-blur-2xl z-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 mx-auto shadow-inner">
            <Zap className="w-7 h-7" />
          </div>

          <h1 className="text-3xl font-bold text-center">Syntax Partner &amp; Scout Network</h1>
          <p className="text-xs text-neutral-500 text-center mt-2">
            Institutional sales network earning direct 3% (Scout), 5% (Closer), or 8% (Combined) payouts.
          </p>

          <div className="flex justify-center gap-2 mt-6 p-1 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setAuthMode('token')}
              className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                authMode === 'token'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Access Token Login
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                authMode === 'register'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Partner Signup
            </button>
          </div>

          {authError && (
            <div className="mt-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold text-center">
              {authError}
            </div>
          )}

          {authMode === 'token' ? (
            <form onSubmit={handleTokenLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Access Token *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SYN-SCOUT-7829"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Surname *</label>
                <input
                  type="text"
                  required
                  placeholder="Your registered surname"
                  value={surnameInput}
                  onChange={(e) => setSurnameInput(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all"
              >
                Access Partner Portal
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tobi Adeyemi"
                  value={registerForm.full_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, full_name: e.target.value })}
                  className="w-full px-5 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Surname *</label>
                <input
                  type="text"
                  required
                  placeholder="Surname"
                  value={registerForm.surname}
                  onChange={(e) => setRegisterForm({ ...registerForm, surname: e.target.value })}
                  className="w-full px-5 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-5 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Partner Role *</label>
                <select
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                  className="w-full px-5 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                >
                  <option value="scout">Scout (3% Commission ~₦8,400+ per ₦280k deal)</option>
                  <option value="closer">Closer (5% Commission ~₦14,000+ per ₦280k deal)</option>
                  <option value="combined">Combined Executive (8% Commission ~₦22,400+ per ₦280k deal)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Register &amp; Obtain Token
              </button>
            </form>
          )}
        </motion.div>
      </div>
    )
  }

  // Calculate Role-Specific Earnings
  const rate = partner.role === 'scout' ? 0.03 : partner.role === 'closer' ? 0.05 : 0.08
  const baseEarnings = 280000 * rate

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 pt-28 pb-24 px-4">
      <FaintParticleBackground />

      {/* Interactive Element Tour */}
      {showTour && (
        <PartnerTour
          role={partner.role}
          onClose={() => setShowTour(false)}
        />
      )}

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Registration Credentials Banner */}
        {registeredKey && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                ACCOUNT CREATED &amp; CONFIRMED
              </span>
              <p className="text-sm font-bold">
                Welcome {partner.full_name}! Your Access Token is ready for future logins.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-neutral-900 dark:bg-neutral-950 text-white font-mono font-extrabold text-sm border border-emerald-500/40">
                {registeredKey}
              </span>
              <button
                onClick={() => copyToken(registeredKey)}
                className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-600 text-white flex items-center gap-1"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Copied' : 'Copy Token'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Role-Specific Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                id="tour-role-badge"
                className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              >
                {partner.role.toUpperCase()} DASHBOARD — {(rate * 100).toFixed(0)}% COMMISSION LEDGER (~₦{baseEarnings.toLocaleString()} PER ₦280K DEAL)
              </span>
              <button
                onClick={() => setShowTour(true)}
                className="text-xs text-neutral-500 hover:text-orange-500 flex items-center gap-1 ml-2"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Show Guided Tour</span>
              </button>
            </div>
            <h1 className="text-3xl font-extrabold">Syntax Partner Network</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {partner.role === 'scout' ? 'Lead Discovery' : partner.role === 'closer' ? 'Deal Closing Pipeline' : 'Executive Pipeline'}
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'strategy'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {partner.role === 'scout' ? 'Field Scout Guide' : 'Closing Playbook'}
            </button>
            <button
              id="tour-request-demo"
              onClick={() => setActiveTab('demo_request')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'demo_request'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Request Custom Demo
            </button>
            {(partner.role === 'closer' || partner.role === 'combined') && (
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'invoices'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                Request Client Invoice
              </button>
            )}
            <button
              id="tour-support"
              onClick={() => setActiveTab('support')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'support'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Support Desk
            </button>
          </div>
        </div>

        {/* Tab 1: Institutional Lead Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Institutional Lead Submission Form */}
            <div id="tour-lead-form" className="p-6 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm h-fit">
              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-500" />
                Register Institutional Lead
              </h2>
              <p className="text-xs text-neutral-500 mb-6">
                Register verified business prospects with full location and social details.
              </p>

              {leadSuccess && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  {leadSuccess}
                </div>
              )}

              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Company / Business Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Logistics Nigeria Ltd"
                    value={newLead.business_name}
                    onChange={(e) => setNewLead({ ...newLead, business_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Physical Location / State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ikeja, Lagos State"
                      value={newLead.location}
                      onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Instagram / Social Page *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. @apexluxury"
                      value={newLead.social_page}
                      onChange={(e) => setNewLead({ ...newLead, social_page: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Decision Maker Name &amp; Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Johnson (MD / CEO)"
                    value={newLead.client_name}
                    onChange={(e) => setNewLead({ ...newLead, client_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Decision Maker WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +234 803 000 0000"
                    value={newLead.whatsapp}
                    onChange={(e) => setNewLead({ ...newLead, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Estimated Deal Budget (₦) *</label>
                  <select
                    value={newLead.agreed_price}
                    onChange={(e) => setNewLead({ ...newLead, agreed_price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  >
                    <option value={280000}>₦280,000 — Business Website (Commission: ₦{(280000 * rate).toLocaleString()})</option>
                    <option value={450000}>₦450,000 — E-Commerce Store (Commission: ₦{(450000 * rate).toLocaleString()})</option>
                    <option value={680000}>₦680,000 — Web Application / SaaS (Commission: ₦{(680000 * rate).toLocaleString()})</option>
                    <option value={850000}>₦850,000+ — Custom Enterprise System (Commission: ₦{(850000 * rate).toLocaleString()}+)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-orange-600 shadow-md transition-all"
                >
                  Register Lead to Pipeline
                </button>
              </form>
            </div>

            {/* Registered Leads Pipeline */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold mb-4">Active Pipeline Records ({leads.length})</h2>
              {leads.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6">
                  <UserCheck className="w-10 h-10 text-neutral-400 mx-auto mb-2" />
                  <p className="font-bold text-sm">No Pipeline Leads Registered Yet</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Use the institutional form to record prospects you are pitching to lock in your payout.
                  </p>
                </div>
              ) : (
                leads.map((l) => (
                  <div
                    key={l.id}
                    className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-500/10 text-orange-500">
                          {l.status}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">{l.business_name}</span>
                      </div>
                      <h3 className="text-lg font-bold mt-1">{l.client_name}</h3>
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">{l.whatsapp}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-neutral-400 block font-mono">Calculated Payout</span>
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        ₦{(l.scout_commission ?? l.closer_commission ?? 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Role-Specific Playbook */}
        {activeTab === 'strategy' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-orange-500/10 text-orange-500 mb-3 inline-block">
                {partner.role.toUpperCase()} MASTERCLASS &amp; STRATEGY
              </span>
              <h2 className="text-2xl font-bold mb-4">
                {partner.role === 'scout'
                  ? 'Institutional Prospecting: How to Source High-Ticket Clients'
                  : partner.role === 'closer'
                  ? 'Deal Closing Playbook: Overcoming Objections &amp; Converting Deposits'
                  : 'Executive Field Guide: Sourcing, Pitching &amp; Closing Deals'}
              </h2>

              <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                    1. Professional Outreach (No &quot;Begging&quot; Vibe)
                  </h3>
                  <p>
                    Never position yourself as begging for work! Position Syntax Services as an elite engineering agency upgrading business performance:
                  </p>
                  <p className="mt-3 font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-neutral-100 dark:bg-neutral-900 p-4 rounded-xl leading-relaxed">
                    &quot;Good day [Decision Maker Name]. I represent Syntax Services. We noticed your company page has great reach, but lacks a high-speed web application to capture orders directly. We build custom platforms that load in under 1.5 seconds and dispatch customer orders directly to your WhatsApp or in-site portal. Let&apos;s schedule a 5-minute proposal call.&quot;
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">
                    2. Handling The &quot;We Have Instagram / WhatsApp&quot; Objection
                  </h3>
                  <p>
                    Explain to business owners that Instagram/WhatsApp accounts get banned, algorithm reach drops, and manual DM answering loses 40% of prospective buyers who want instant automated checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Request Custom Demo */}
        {activeTab === 'demo_request' && (
          <div className="max-w-xl mx-auto p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Request Custom Demo for Client</h2>
            <p className="text-xs text-neutral-500 mb-6">
              Provide company location and specific feature needs so our engineering team builds a targeted demo.
            </p>

            {demoReqSuccess && (
              <div className="p-4 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                {demoReqSuccess}
              </div>
            )}

            <form onSubmit={handleCustomDemoRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Client Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Luxury Fabrics"
                  value={demoReq.client_business_name}
                  onChange={(e) => setDemoReq({ ...demoReq, client_business_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Industry *</label>
                  <select
                    value={demoReq.client_industry}
                    onChange={(e) => setDemoReq({ ...demoReq, client_industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  >
                    <option value="Fashion & Retail">Fashion &amp; Retail</option>
                    <option value="Logistics & Delivery">Logistics &amp; Delivery</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Hospitality & Hotel">Hospitality &amp; Hotel</option>
                    <option value="Service & Agency">Service &amp; Agency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Client Social / Website</label>
                  <input
                    type="text"
                    placeholder="e.g. @apexluxury"
                    value={demoReq.client_social}
                    onChange={(e) => setDemoReq({ ...demoReq, client_social: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Client WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="+234 800..."
                  value={demoReq.client_whatsapp}
                  onChange={(e) => setDemoReq({ ...demoReq, client_whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Requested Features</label>
                <textarea
                  rows={3}
                  placeholder="WhatsApp order dispatch, in-site portal, inventory tracker..."
                  value={demoReq.requested_features}
                  onChange={(e) => setDemoReq({ ...demoReq, requested_features: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg"
              >
                Submit Custom Demo Build Request
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Official Client Invoice Request */}
        {activeTab === 'invoices' && (
          <div className="max-w-2xl mx-auto p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-emerald-500" />
              Generate Official Client Invoice
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Generate an official Syntax Services invoice with bank transfer details to share directly with your prospective client on WhatsApp.
            </p>

            {invoiceSuccess && (
              <div className="p-4 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                {invoiceSuccess}
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Client Business / Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mimms Apparel Ltd"
                  value={invoiceForm.client_business_name}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, client_business_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Decision Maker Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. David Okonkwo"
                    value={invoiceForm.client_name}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, client_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Client WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+234 800..."
                    value={invoiceForm.client_whatsapp}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, client_whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Package Selected *</label>
                  <select
                    value={invoiceForm.package_title}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, package_title: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  >
                    <option value="Business Web Application">Business Web Application (₦280,000)</option>
                    <option value="E-Commerce Retail Platform">E-Commerce Retail Platform (₦450,000)</option>
                    <option value="Custom SaaS & Client Portal">Custom SaaS &amp; Client Portal (₦680,000)</option>
                    <option value="Custom Enterprise Solution">Custom Enterprise Solution (₦850,000+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Agreed Total Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={invoiceForm.agreed_price}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, agreed_price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Required Initial Deposit (%) *</label>
                <select
                  value={invoiceForm.deposit_percentage}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, deposit_percentage: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                >
                  <option value={50}>50% Deposit Required to Commence Build</option>
                  <option value={60}>60% Deposit Required</option>
                  <option value={100}>100% Full Upfront Payment</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Generate Official Invoice
              </button>
            </form>
          </div>
        )}

        {/* Printable & Shareable Invoice Modal */}
        <AnimatePresence>
          {activeInvoice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-xl p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-neutral-100 my-8"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500">
                      SYNTAX SERVICES OFFICIAL INVOICE
                    </span>
                    <h3 className="text-2xl font-extrabold">{activeInvoice.invoice_number}</h3>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">Date Issued: {activeInvoice.date}</p>
                  </div>
                  <button
                    onClick={() => setActiveInvoice(null)}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  >
                    Close
                  </button>
                </div>

                {/* Billed To */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs">
                  <div>
                    <span className="font-bold text-neutral-400 block uppercase">BILLED TO</span>
                    <p className="font-extrabold text-sm text-neutral-900 dark:text-white mt-1">{activeInvoice.client_business_name}</p>
                    <p className="text-neutral-500">{activeInvoice.client_name}</p>
                    <p className="text-neutral-500 font-mono">{activeInvoice.client_whatsapp}</p>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-400 block uppercase">ISSUED BY</span>
                    <p className="font-extrabold text-sm text-neutral-900 dark:text-white mt-1">Syntax Services</p>
                    <p className="text-neutral-500">Executive Partner: {activeInvoice.partner_name}</p>
                    <p className="text-neutral-500 font-mono">contact@syntax.com.ng</p>
                  </div>
                </div>

                {/* Itemized Line */}
                <div className="mb-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                  <div className="bg-neutral-100 dark:bg-neutral-950 p-3 text-xs font-mono font-bold uppercase flex justify-between">
                    <span>Description</span>
                    <span>Amount</span>
                  </div>
                  <div className="p-4 flex justify-between items-center text-sm border-b border-neutral-200 dark:border-neutral-800">
                    <div>
                      <p className="font-bold">{activeInvoice.package_title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{activeInvoice.notes}</p>
                    </div>
                    <span className="font-bold font-mono">₦{activeInvoice.agreed_price.toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-emerald-500/10 flex justify-between items-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Required Initial Deposit</span>
                    <span className="font-mono text-base">₦{activeInvoice.deposit_amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Bank Payment Details */}
                <div className="mb-6 p-4 rounded-2xl bg-neutral-900 dark:bg-black text-white text-xs space-y-1 font-mono">
                  <span className="text-emerald-400 font-bold block uppercase mb-1">OFFICIAL PAYMENT BANK DETAILS</span>
                  <p><span className="text-neutral-400">Bank:</span> Zenith Bank / Kuda Microfinance Bank</p>
                  <p><span className="text-neutral-400">Account Name:</span> Habeeb Tijani Victor / Syntax Services</p>
                  <p><span className="text-neutral-400">Account Number:</span> 2085131036</p>
                  <p><span className="text-neutral-400">Payment Reference:</span> {activeInvoice.invoice_number}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/${activeInvoice.client_whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${activeInvoice.client_name}! Here is your official invoice from Syntax Services:\n\n*Invoice No:* ${activeInvoice.invoice_number}\n*Package:* ${activeInvoice.package_title}\n*Total Amount:* ₦${activeInvoice.agreed_price.toLocaleString()}\n*Deposit Required:* ₦${activeInvoice.deposit_amount.toLocaleString()}\n\n*Bank Payment Details:*\nBank: Zenith Bank / Kuda\nAccount Name: Habeeb Tijani Victor / Syntax Services\nAccount Number: 2085131036\n\nPlease let us know once deposit is sent so we activate your project build instantly!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Share Invoice on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => window.print()}
                    className="py-3.5 px-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    Print / Download
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Tab 4: Partner Support Desk */}
        {activeTab === 'support' && (
          <div className="max-w-xl mx-auto p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <LifeBuoy className="w-6 h-6 text-orange-500" />
              Partner Support Desk
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Send complaints or payout questions directly to Admin. Notifications sent to syntaxservices25@gmail.com &amp; habeebtijanivictor@gmail.com.
            </p>

            {ticketSuccess && (
              <div className="p-4 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                {ticketSuccess}
              </div>
            )}

            <form onSubmit={handleSupportTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Payout verification inquiry"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your request..."
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              >
                <span>Send Support Ticket</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
