'use client';
import React, { useState } from 'react';
import { X, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BespokeImportModalProps {
  onClose: () => void;
}

export const BespokeImportModal: React.FC<BespokeImportModalProps> = ({ onClose }) => {
  const [buyerName, setBuyerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [targetCar, setTargetCar] = useState('');
  const [armoredLevel, setArmoredLevel] = useState('Standard Unarmored');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1200,
      background: 'rgba(5, 5, 5, 0.88)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#ffffff',
          border: '1px solid var(--border-focus)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '580px',
          padding: '36px',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(11, 19, 43, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-dim)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={54} color="var(--text-navy)" style={{ marginBottom: '16px' }} />
            <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-navy)', marginBottom: '12px' }}>
              Custom Sourcing Inquiry Received
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Thank you, <strong>{buyerName}</strong>. Your custom sourcing allocation request for <strong>{targetCar}</strong> ({armoredLevel}) has been logged with our Special Vehicle Operations director.
            </p>

            <button onClick={onClose} className="btn-navy" style={{ width: '100%', justifyContent: 'center' }}>
              Close Confirmation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div className="tag-metadata" style={{ marginBottom: '6px' }}>
                SPECIAL VEHICLE OPERATIONS
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-navy)' }}>
                Bespoke Import & Armored Sourcing
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Secure factory build slots, off-market allocations, or certified B6/B7 ballistic security vehicles.
              </p>
            </div>

            <div>
              <label className="tag-metadata" style={{ display: 'block', marginBottom: '6px' }}>
                DESIRED VEHICLE & MODEL SPECIFICATION
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2025 Bugatti Tourbillon / Ferrari Daytona SP3 / Rolls-Royce Spectre"
                value={targetCar}
                onChange={(e) => setTargetCar(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="tag-metadata" style={{ display: 'block', marginBottom: '6px' }}>
                ARMORED SECURITY REQUIREMENT
              </label>
              <select
                value={armoredLevel}
                onChange={(e) => setArmoredLevel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                <option value="Standard Unarmored">Standard Unarmored Supercar</option>
                <option value="CEN B6 Armored Protection">CEN B6 Armored Protection (Assault Rifle Fire)</option>
                <option value="CEN B7 Armored Protection">CEN B7 Armored Protection (Armor Piercing Rounds)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="tag-metadata" style={{ display: 'block', marginBottom: '6px' }}>FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Chief / Senator Adeleke"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label className="tag-metadata" style={{ display: 'block', marginBottom: '6px' }}>PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 810 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn-navy" style={{ justifyContent: 'center', width: '100%', marginTop: '6px' }}>
              <Shield size={15} /> Submit Custom Sourcing Order
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
