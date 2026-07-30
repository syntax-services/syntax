'use client';
import { MessageCircle, MapPin, Truck, Clock } from 'lucide-react';

const InstagramIcon = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TikTokIcon = ({ size = 16, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.75rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>GET IN TOUCH</span>
        <h1 className="font-serif" style={{ fontSize: '3rem', marginTop: '6px' }}>Contact TML Jewelry</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '12px auto 0', lineHeight: 1.7 }}>
          Have questions about ring sizing, delivery timelines, or restocks? Connect directly with us on WhatsApp, Instagram, or TikTok!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {/* WhatsApp Box */}
        <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-silver)', textAlign: 'center' }}>
          <MessageCircle size={32} style={{ color: '#25D366', margin: '0 auto 14px' }} />
          <h3 className="font-serif" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>WhatsApp Instant Order</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Chat directly with our Lagos store team for fast order processing.</p>
          <a 
            href="https://wa.me/2348162255533" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp-action"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            WhatsApp (+2348162255533)
          </a>
        </div>

        {/* Social Media Box */}
        <div style={{ background: 'var(--bg-secondary)', padding: '28px', borderRadius: '16px', border: '1px solid var(--border-silver)', textAlign: 'center' }}>
          <InstagramIcon size={32} style={{ color: 'var(--gold-accent)', margin: '0 auto 14px' }} />
          <h3 className="font-serif" style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Official Social Handles</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Follow our official pages for daily restocks and ring sizing support:</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href="https://www.instagram.com/tea_m_l_jewelries" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-action-morph"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '8px 12px' }}
            >
              <InstagramIcon size={14} /> <span>Instagram: @tea_m_l_jewelries</span>
            </a>

            <a 
              href="https://www.tiktok.com/@tml_jewelries" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-action-morph"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '8px 12px' }}
            >
              <TikTokIcon size={14} /> <span>TikTok: @tml_jewelries</span>
            </a>
          </div>
        </div>
      </div>

      {/* Delivery Information & Store Location */}
      <div style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-silver)' }}>
        <h3 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '24px', textAlign: 'center' }}>Store Location & Delivery Hub</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <MapPin size={22} style={{ color: 'var(--gold-accent)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>New Store Address</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Baruwa Bus Stop, Fatade Road, Ipaja, Lagos, Nigeria.</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-accent)', display: 'block', marginTop: '2px' }}>
                (Relocated from: Shop 7, Kabiyesi Oba Olawale Cole Block, Ile Epo Market, Abule Egba)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Truck size={22} style={{ color: 'var(--silver-primary)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Delivery Options</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Same-day Lagos delivery & 2-4 days interstate delivery to all 36 Nigerian states.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Clock size={22} style={{ color: 'var(--silver-primary)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Customer Service Hours</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Monday - Saturday (9:00 AM - 7:00 PM WAT).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
