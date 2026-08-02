'use client';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2, Plane, Truck, Lock, UserCheck, Sparkles, Shield, KeyRound, Compass, Send } from 'lucide-react';
import { POLANCO_INFO } from '../data/cars';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactPageProps {
  onOpenBookingModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'jetway' | 'armored' | 'transport' | 'factory'>('jetway');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Private Viewing',
    preferredContact: 'WhatsApp VIP',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const CONCIERGE_TIERS = [
    {
      id: 'jetway',
      title: 'Private Airside Jetway Shuttle',
      subtitle: 'Murtala Muhammed Intl (MMIA) Private Terminal Service',
      icon: Plane,
      image: '/polanco_assets/cullinan.jpg',
      badge: 'AIRSIDE ACCESS CERTIFIED',
      desc: 'Seamless tarmac-to-showroom private chauffeur transit. Our executive security team meets your private jet or international commercial flight at the jetway with a Rolls-Royce Cullinan or armored SUV, escorting you directly to our Lekki Phase 1 private viewing suite.',
      perks: [
        'Direct jetway tarmac ramp clearance',
        'Armored SUV escort options with trained security detail',
        'Complimentary executive refreshments & luggage transport',
        'Confidential express immigration clearance support'
      ]
    },
    {
      id: 'armored',
      title: 'Ballistic Armor & Executive Escort',
      subtitle: 'CEN B6 & B7 Military-Grade Vehicle Retrofitting',
      icon: ShieldCheck,
      image: '/polanco_assets/g63.jpg',
      badge: 'STANAG LEVEL 2 CERTIFIED',
      desc: 'Complete ballistic engineering for executive protection. We outfit Range Rover SV, Cadillac Escalade-V, Mercedes G63 AMG, and Rolls-Royce Cullinan with high-density ballistic steel, 39mm multi-layer bullet-resistant glass, run-flat tires, and blast-protected floors.',
      perks: [
        'Withstands 7.62x51mm M80 NATO rifle rounds & grenade blasts',
        'Heavy-duty upgraded suspension & performance braking system',
        'Operable power front windows with emergency escape hatches',
        'Nationwide armed mobile security convoy coordination'
      ]
    },
    {
      id: 'transport',
      title: 'Nationwide Enclosed Transporter',
      subtitle: 'Discreet Covered Multi-Car Transport Across Nigeria',
      icon: Truck,
      image: '/polanco_assets/rangerover.jpg',
      badge: 'GPS TRACKED & INSURED',
      desc: 'Zero-kilometer door-to-door vehicle delivery. Our custom hydraulically lowered, fully enclosed car transporters deliver your brand-new hypercar directly to your residence or private estate anywhere in Nigeria with zero road wear.',
      perks: [
        'Fully covered climate-controlled hydraulic transporter',
        'Direct deliveries to Lagos, Abuja, Port Harcourt, Kano, Asaba & Delta',
        'Real-time satellite GPS tracking link provided to client',
        'Comprehensive multi-million dollar transit insurance coverage'
      ]
    },
    {
      id: 'factory',
      title: 'Bespoke Factory Build Allocations',
      subtitle: 'Direct Atelier & Custom Specification Sourcing',
      icon: KeyRound,
      image: '/polanco_assets/ferrari.jpg',
      badge: 'RESERVED GLOBAL ALLOCATIONS',
      desc: 'Skip global waiting lists. Through our direct relationships with European factory directors, Polanco secures guaranteed build slots for limited-production vehicles from Ferrari Atelier, Rolls-Royce Bespoke, and Porsche Exclusive Manufaktur.',
      perks: [
        'Access to reserved 1-of-1 global factory build allocations',
        'Private specification consultation with physical leather/carbon samples',
        'Direct factory progress updates & VIN assignment tracking',
        'Full federal customs importation & license registration'
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '90px', background: '#ffffff', color: '#0a0a0a' }}>

      {/* ═══════════ 1. HERO — Full Viewport Executive Atmosphere ═══════════ */}
      <section style={{
        position: 'relative',
        padding: '100px 24px 80px',
        background: '#050505',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/images/showroom_hero.jpg"
            alt="Polanco VIP Concierge"
            className="img-cover"
            style={{ opacity: 0.45 }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(5,5,5,0.9) 85%)'
          }} />
        </div>

        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '6px 18px',
              marginBottom: '28px',
              backdropFilter: 'blur(10px)'
            }}>
              <Sparkles size={14} color="#ffffff" />
              <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ffffff' }}>
                WHITE-GLOVE VIP CLIENT SERVICES
              </span>
            </div>

            <h1 className="display-xl" style={{ color: '#ffffff', marginBottom: '20px' }}>
              Executive Concierge
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8
            }}>
              Private airside jetway shuttles, certified CEN B6/B7 ballistic security escort, and nationwide enclosed transport engineered for discerning leaders.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ═══════════ 2. INTERACTIVE CONCIERGE EXPERIENCE HUBS ═══════════ */}
      <section style={{ padding: '80px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <div className="overline" style={{ marginBottom: '12px' }}>
              CHOOSE YOUR CONCIERGE SERVICE
            </div>
            <h2 className="display-lg">
              Tailored Executive Solutions
            </h2>
          </div>

          {/* Service Selector Tabs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            justifyContent: 'center',
            marginBottom: '48px',
            paddingBottom: '8px'
          }}>
            {CONCIERGE_TIERS.map(tier => {
              const isActive = activeTab === tier.id;
              const IconComp = tier.icon;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTab(tier.id as any)}
                  style={{
                    background: isActive ? '#0a0a0a' : '#f9f8f6',
                    color: isActive ? '#ffffff' : '#0a0a0a',
                    border: isActive ? '1px solid #0a0a0a' : '1px solid var(--mist)',
                    padding: '14px 28px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <IconComp size={16} />
                  <span>{tier.title.split(' ')[0]} {tier.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Concierge Hub Display */}
          <AnimatePresence mode="wait">
            {CONCIERGE_TIERS.filter(t => t.id === activeTab).map(tier => {
              const IconComp = tier.icon;
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="split-grid"
                  style={{
                    border: '1px solid var(--mist)',
                    background: '#f9f8f6',
                    alignItems: 'stretch'
                  }}
                >
                  {/* Image Column */}
                  <div style={{ minHeight: '360px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={tier.image}
                      alt={tier.title}
                      className="img-cover"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      background: 'rgba(10,10,10,0.85)',
                      color: '#ffffff',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      padding: '6px 14px',
                      backdropFilter: 'blur(8px)'
                    }}>
                      {tier.badge}
                    </div>
                  </div>

                  {/* Narrative Column */}
                  <div style={{ padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <IconComp size={22} color="#0a0a0a" />
                      <div className="overline" style={{ color: 'var(--slate)' }}>
                        {tier.subtitle}
                      </div>
                    </div>

                    <h3 className="display-md" style={{ marginBottom: '16px' }}>
                      {tier.title}
                    </h3>

                    <div className="divider" style={{ background: '#0a0a0a', margin: '12px 0 20px' }} />

                    <p className="body-lg" style={{ marginBottom: '28px' }}>
                      {tier.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                      {tier.perks.map((perk, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#0a0a0a' }}>
                          <CheckCircle2 size={16} color="#0a0a0a" style={{ flexShrink: 0 }} />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>


      {/* ═══════════ 3. VIP APPOINTMENT SCHEDULER & SHOWROOM CONTACT ═══════════ */}
      <section className="section" style={{ background: '#ffffff', borderTop: '1px solid var(--mist)' }}>
        <div className="split-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', gap: '56px' }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overline" style={{ marginBottom: '16px' }}>
              DIRECT EXECUTIVE APPOINTMENT
            </div>
            <h2 className="display-lg" style={{ marginBottom: '12px' }}>
              Book Private Consultation
            </h2>
            <p className="body-lg" style={{ marginBottom: '36px' }}>
              Fill out your details below to schedule an exclusive showroom walk-through, airside shuttle, or bespoke vehicle order.
            </p>

            {submitted ? (
              <div style={{
                padding: '44px 36px',
                background: '#f9f8f6',
                border: '1px solid var(--mist)',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={54} color="#0a0a0a" style={{ margin: '0 auto 16px' }} />
                <h3 className="display-md" style={{ marginBottom: '12px' }}>
                  VIP Consultation Reserved
                </h3>
                <p className="body-lg">
                  Thank you, <strong>{formData.name}</strong>. Your executive relationship manager will contact you via <strong>{formData.preferredContact}</strong> within 30 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Chief / Honorable Senator / Executive"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 810 000 0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="client@executive.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>Service Interest</label>
                    <select
                      value={formData.serviceInterest}
                      onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 0',
                        border: 'none',
                        borderBottom: '1px solid var(--mist)',
                        background: 'transparent',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Private Viewing">Showroom Private Viewing</option>
                      <option value="Airside Pickup">Airside Jetway Shuttle</option>
                      <option value="Armored Vehicles">CEN B6/B7 Ballistic Armor</option>
                      <option value="Enclosed Delivery">Nationwide Enclosed Delivery</option>
                      <option value="Bespoke Sourcing">Bespoke Factory Sourcing</option>
                    </select>
                  </div>

                  <div>
                    <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>Preferred Contact</label>
                    <select
                      value={formData.preferredContact}
                      onChange={e => setFormData({ ...formData, preferredContact: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 0',
                        border: 'none',
                        borderBottom: '1px solid var(--mist)',
                        background: 'transparent',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="WhatsApp VIP">WhatsApp VIP Line</option>
                      <option value="Phone Call">Direct Phone Call</option>
                      <option value="Email">Encrypted Email</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>Special Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Specify target vehicle, flight arrival time, or security escort details..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send VIP Request <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Showroom & VIP Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: '#0a0a0a',
              color: '#ffffff',
              padding: '48px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div>
              <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                LEKKI PHASE 1 SHOWROOM
              </div>
              <h3 className="display-md" style={{ color: '#ffffff', marginBottom: '24px' }}>
                Direct Executive Lines
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <MapPin size={22} color="#ffffff" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>LOCATION</div>
                    <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{POLANCO_INFO.address}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Phone size={22} color="#ffffff" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>VIP HOTLINE</div>
                    <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{POLANCO_INFO.phones[0]}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Secondary: {POLANCO_INFO.phones[1]}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Mail size={22} color="#ffffff" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>EXECUTIVE EMAIL</div>
                    <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{POLANCO_INFO.email}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Clock size={22} color="#ffffff" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>HOURS</div>
                    <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{POLANCO_INFO.hours.weekdays}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{POLANCO_INFO.hours.saturday}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{POLANCO_INFO.hours.sunday}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                <Lock size={12} color="#ffffff" /> ENCRYPTED & CONFIDENTIAL
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                All client consultations, flight schedules, and delivery locations are kept under strict NDA privacy protocols.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};
