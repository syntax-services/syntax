'use client';
import React from 'react';
import { PageView } from '../types/car';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ShieldCheck, Award, Lock, MapPin, Phone, Clock, ArrowRight, CheckCircle2, Truck, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutPageProps {
  setActiveView: (view: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveView }) => {
  return (
    <div style={{ paddingTop: '100px', background: '#ffffff', color: '#0a0a0a' }}>

      {/* Hero Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 64px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="overline" style={{ marginBottom: '16px' }}>
            ESTABLISHED IN LEKKI PHASE 1 · LAGOS
          </div>
          <h1 className="display-xl" style={{ marginBottom: '24px' }}>
            Redefining Luxury<br />Automotive Retailing
          </h1>
          <p className="body-lg" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Polanco Exotic Cars is West Africa's leading dealership for brand-new hypercars, flagship European luxury vehicles, and CEN B6/B7 ballistic executive protection.
          </p>
        </motion.div>
      </div>

      {/* Motion-Detecting Showroom Metrics Counter Bar */}
      <section style={{
        background: '#f9f8f6',
        padding: '48px 24px',
        borderTop: '1px solid var(--mist)',
        borderBottom: '1px solid var(--mist)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
          {[
            { num: 65, suffix: '+', label: 'In-Stock Hypercars & SUVs' },
            { num: 100, suffix: '%', label: 'Customs & Duty Verified' },
            { num: 15, suffix: '', label: 'Represented European Marques' },
            { num: 500, suffix: '+', label: 'VIP Executive Deliveries' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="font-serif" style={{ fontSize: '2.4rem', fontWeight: 500, color: '#0a0a0a' }}>
                <AnimatedCounter value={stat.num} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--slate)', marginTop: '4px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Showroom Image & Brand Narrative Split */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="split-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', gap: '48px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overline" style={{ marginBottom: '16px' }}>
              OUR PHILOSOPHY
            </div>
            <h2 className="display-lg" style={{ marginBottom: '20px' }}>
              Uncompromising Standards & Absolute Privacy
            </h2>
            <div className="divider" />
            <p className="body-lg" style={{ marginBottom: '24px' }}>
              Founded with a singular focus to elevate automotive luxury in Nigeria, Polanco Exotic Cars operates a state-of-the-art flagship showroom in Lekki Phase 1.
            </p>
            <p className="body-lg" style={{ marginBottom: '32px' }}>
              We eliminate the friction of importing luxury automobiles. Every vehicle in our 65+ inventory is imported brand-new, fully cleared with federal customs documentation, and stored in our climate-controlled private viewing gallery.
            </p>
            <button onClick={() => setActiveView('inventory')} className="btn-primary">
              Explore Collection <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: '420px', overflow: 'hidden', border: '1px solid var(--mist)' }}
          >
            <img
              src="/images/showroom.jpg"
              alt="Polanco Showroom Gallery"
              className="img-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="section" style={{ background: '#f9f8f6', borderTop: '1px solid var(--mist)', borderBottom: '1px solid var(--mist)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}>
            <div className="overline" style={{ marginBottom: '12px' }}>
              BENCHMARK OF PRESTIGE
            </div>
            <h2 className="display-lg">
              The Four Pillars of Polanco
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                icon: FileCheck,
                title: '100% Customs & Duty Cleared',
                desc: 'Complete federal customs documentation, single-goods declaration, and duty paid certificates provided with every purchase.'
              },
              {
                icon: ShieldCheck,
                title: 'CEN B6/B7 Ballistic Armor',
                desc: 'Factory and retrofitted executive protection vehicles certified to withstand high-powered rifle rounds and grenade blasts.'
              },
              {
                icon: Truck,
                title: 'Nationwide En-Route Delivery',
                desc: 'Discreet covered multi-car enclosed transport to Lagos, Abuja, Port Harcourt, Kano, Asaba, and Delta State with armed escort options.'
              },
              {
                icon: Lock,
                title: 'Bespoke Factory Sourcing',
                desc: 'Direct allocation access to exclusive European build slots for Ferrari Atelier, Rolls-Royce Bespoke, and Porsche Exclusive Manufaktur.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{
                  background: '#ffffff',
                  padding: '36px 28px',
                  border: '1px solid var(--mist)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <item.icon size={32} color="#0a0a0a" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 500 }}>
                  {item.title}
                </h3>
                <p className="body-sm" style={{ color: 'var(--slate)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Showroom Information */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="split-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', gap: '48px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="overline" style={{ marginBottom: '16px' }}>
              VISIT OUR SHOWROOM
            </div>
            <h2 className="display-lg" style={{ marginBottom: '24px' }}>
              Lekki Phase 1 Flagship
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <MapPin size={22} color="#0a0a0a" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>Showroom Address</div>
                  <div className="body-sm">Admiralty Way, Lekki Phase 1, Lagos, Nigeria</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <Clock size={22} color="#0a0a0a" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>Operating Hours</div>
                  <div className="body-sm">Monday – Saturday: 9:00 AM – 7:00 PM<br />Sunday: Private Appointment Only</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <Phone size={22} color="#0a0a0a" style={{ flexShrink: 0, marginTop: '4px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>VIP Direct Line</div>
                  <div className="body-sm">+234 813 000 0000 · concierge@polancoexoticcars.com</div>
                </div>
              </div>
            </div>

            <button onClick={() => setActiveView('contact')} className="btn-primary">
              Book Private Viewing <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              height: '380px',
              background: '#0a0a0a',
              color: '#ffffff',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
              EXECUTIVE CONCIERGE
            </div>
            <h3 className="display-md" style={{ color: '#ffffff', marginBottom: '16px' }}>
              Confidential Private Viewing
            </h3>
            <p className="body-sm" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
              Request exclusive access to our private viewing bay with dedicated executive Relationship Managers, jetway pickup, and confidential test drives.
            </p>
            <div>
              <button onClick={() => setActiveView('contact')} className="btn-primary-light">
                Request VIP Access <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
