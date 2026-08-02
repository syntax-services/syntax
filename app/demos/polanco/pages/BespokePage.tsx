'use client';
import React from 'react';
import { Currency } from '../types/car';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BespokePageProps {
  currency: Currency;
  onOpenBespokeModal: () => void;
}

export const BespokePage: React.FC<BespokePageProps> = ({ onOpenBespokeModal }) => {
  return (
    <div style={{ paddingTop: '100px' }}>

      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px 48px',
        textAlign: 'center'
      }}>
        <div className="overline" style={{ marginBottom: '12px' }}>
          SPECIAL OPERATIONS
        </div>
        <h1 className="display-lg">
          Bespoke & Armored
        </h1>
        <p className="body-lg" style={{ maxWidth: '560px', margin: '12px auto 0' }}>
          Custom factory order allocation and CEN B6/B7 ballistic security integration for high-net-worth clients.
        </p>
      </div>

      {/* Feature Split */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px 80px'
      }}>
        <div className="split-grid" style={{ gap: '0', minHeight: '400px' }}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '36px 28px',
              background: '#fff',
              border: '1px solid var(--mist)'
            }}
          >
            <div className="overline" style={{ marginBottom: '16px' }}>
              FACTORY SOURCING
            </div>
            <h2 className="display-md" style={{ marginBottom: '16px' }}>
              Direct Factory Allocation
            </h2>
            <div className="divider" />
            <p className="body-lg" style={{ marginBottom: '24px', maxWidth: '420px' }}>
              Access rare allocations for limited-run hypercars directly from European marque headquarters. Ferrari 812 Competizione, Bugatti Chiron, Porsche 911 S/T.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {[
                'Global factory allocation network',
                'CEN B6/B7 ballistic armor integration',
                'Full Lagos port customs clearance',
                'End-to-end executive concierge'
              ].map((item, idx) => (
                <div key={idx} style={{
                  fontSize: '0.85rem',
                  color: 'var(--black)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--black)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>

            <div>
              <button onClick={onOpenBespokeModal} className="btn-primary">
                Initiate Request <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ overflow: 'hidden', minHeight: '300px' }}
          >
            <img
              src="/polanco_assets/rolls_royce.jpg"
              alt="Bespoke Sourcing"
              className="img-cover"
              style={{ minHeight: '300px' }}
            />
          </motion.div>
        </div>
      </div>

    </div>
  );
};
