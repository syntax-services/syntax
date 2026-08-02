'use client';
import React from 'react';
import { PageView } from '../types/car';
import { POLANCO_INFO } from '../data/cars';

interface FooterProps {
  setActiveView: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  return (
    <footer style={{
      background: '#0a0a0a',
      color: '#fff',
      padding: '72px 24px 36px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Top Row: Logo + Nav */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '40px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/polanco_assets/polanco_logo.png"
                alt="Polanco Exotic Cars"
                style={{ height: '34px', width: 'auto', objectFit: 'contain', filter: 'brightness(10)' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/polanco_logo.png';
                }}
              />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#fff',
                textTransform: 'uppercase'
              }}>
                EXOTIC CARS
              </span>
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '340px',
              lineHeight: 1.7
            }}>
              Nigeria's premier destination for brand-new hypercars,
              ultra-luxury vehicles, and CEN B6/B7 armored executive transport.
            </p>
          </div>

          {/* Nav Links */}
          <div style={{
            display: 'flex',
            gap: '48px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                NAVIGATE
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => setActiveView('home')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveView('inventory')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                >
                  Collection
                </button>
                <button
                  onClick={() => setActiveView('bespoke')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                >
                  Bespoke Sourcing
                </button>
                <button
                  onClick={() => setActiveView('about')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                >
                  About Polanco
                </button>
                <button
                  onClick={() => setActiveView('contact')}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
                >
                  Concierge
                </button>
              </div>
            </div>

            <div>
              <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                LEKKI SHOWROOM
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                {POLANCO_INFO.address}<br />
                VIP Hotline: {POLANCO_INFO.phones[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '32px',
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.4)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Polanco Exotic Cars Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Lagos Customs Cleared</span>
            <span>CEN B6/B7 Ballistic Certified</span>
            <span>Lekki Phase 1, Lagos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
