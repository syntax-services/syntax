import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="site-footer">
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', textAlign: 'left', marginBottom: '40px' }}>
        {/* Column 1: Brand Info & Location */}
        <div>
          <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo/logo.png" alt="TML Emblem" style={{ width: '22px', height: '22px' }} />
            TML JEWELRY
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '14px' }}>
            The Market Line — Nigeria’s leading store for non-tarnish 18K gold replica jewelry, 925 sterling silver, knuckle rings, and bracelets.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <MapPin size={16} style={{ color: 'var(--gold-accent)' }} />
            <span>Baruwa Bus Stop, Fatade Road, Ipaja, Lagos, Nigeria</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            <Phone size={16} style={{ color: 'var(--whatsapp-green)' }} />
            <a href="https://wa.me/2348162255533" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              +234 816 225 5533
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px', color: 'var(--text-muted)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
            <li><Link href="/demos/mimmscartel/shop" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Shop Catalog</Link></li>
            <li><Link href="/demos/mimmscartel/about" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>About TML</Link></li>
            <li><Link href="/demos/mimmscartel/contact" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>WhatsApp Support</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px', color: 'var(--text-muted)' }}>Follow Our Social Handles</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Follow our official social pages for daily restocks, ring sizing videos, and customer reviews:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a 
              href="https://www.instagram.com/tea_m_l_jewelries" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-action-morph"
              style={{ fontSize: '0.8rem', padding: '8px 14px', justifyContent: 'flex-start' }}
            >
              <InstagramIcon size={16} />
              <span>Instagram: @tea_m_l_jewelries</span>
            </a>

            <a 
              href="https://www.tiktok.com/@tml_jewelries" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-action-morph"
              style={{ fontSize: '0.8rem', padding: '8px 14px', justifyContent: 'flex-start' }}
            >
              <TikTokIcon size={16} />
              <span>TikTok: @tml_jewelries</span>
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        &copy; 2026 The Market Line (TML) Jewelry. All rights reserved. • Lagos, Nigeria
      </div>
    </footer>
  );
}
