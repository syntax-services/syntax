'use client';
import React, { useState } from 'react';
import { Car, Currency } from '../types/car';
import { CARS_DATA } from '../data/cars';
import { Lock, Unlock, Shield, ArrowRight, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VaultPageProps {
  currency: Currency;
  onSelectCar: (car: Car) => void;
  onOpenBookingModal: (car?: Car) => void;
}

export const VaultPage: React.FC<VaultPageProps> = ({
  currency,
  onSelectCar,
  onOpenBookingModal
}) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hypercars designated for The Vault
  const vaultCars = CARS_DATA.filter(c =>
    c.make === 'Bugatti' ||
    c.make === 'Koenigsegg' ||
    c.model.includes('Revuelto') ||
    c.model.includes('SF90') ||
    c.model.includes('Spectre') ||
    c.bodyStyle === 'Armored'
  );

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === 'POLANCO' || passcode.trim() === '777' || passcode.trim().length >= 4) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid VIP Passcode. Contact Concierge for access.');
    }
  };

  const currencySymbol = currency === 'NGN' ? '₦' : '$';

  return (
    <div style={{ background: '#050505', color: '#ffffff', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>

      {/* Vault Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 48px',
        textAlign: 'center'
      }}>
        <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
          OFF-MARKET & ULTRA-LIMITED ALLOCATIONS
        </div>
        <h1 className="display-xl" style={{ color: '#ffffff', marginBottom: '20px' }}>
          THE VAULT
        </h1>
        <div className="divider" style={{ background: 'rgba(255,255,255,0.2)', margin: '16px auto' }} />
        <p className="body-lg" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '580px', margin: '0 auto' }}>
          A private reserve of 1-of-1 hypercars, bespoke factory allocations, and CEN B6/B7 tactical vehicles reserved exclusively for verified clientele.
        </p>
      </div>

      {/* Lock Status Bar / Access Gate */}
      {!isUnlocked ? (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 64px',
          padding: '0 20px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '40px 32px',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Lock size={24} color="#ffffff" />
            </div>

            <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '8px', fontWeight: 400 }}>
              RESTRICTED VAULT ACCESS
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', marginBottom: '28px', lineHeight: 1.6 }}>
              Enter your VIP Access Passcode or request entry clearance from our Lekki headquarters to unlock confidential off-market allocations.
            </p>

            <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input
                  type="password"
                  placeholder="Enter Passcode (or type POLANCO)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: '#121212',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    letterSpacing: '0.15em',
                    outline: 'none'
                  }}
                />
              </div>

              {errorMsg && (
                <div style={{ color: '#ef4444', fontSize: '0.78rem', fontWeight: 500 }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button type="submit" className="btn-primary-light" style={{ justifyContent: 'center' }}>
                  <KeyRound size={14} /> Unlock Vault
                </button>
                <button
                  type="button"
                  onClick={() => setIsUnlocked(true)}
                  className="btn-outline-light"
                  style={{ justifyContent: 'center' }}
                >
                  Quick Preview
                </button>
              </div>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              Tip: Use passcode <strong>POLANCO</strong> or click <em>Quick Preview</em> to unlock all 1-of-1 hypercars.
            </div>
          </motion.div>
        </div>
      ) : (
        /* Unlocked Vault Grid */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Unlock size={18} color="#22c55e" />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffffff' }}>
                VIP ACCESS GRANTED — {vaultCars.length} PRIVATE ALLOCATIONS UNLOCKED
              </span>
            </div>
            <button
              onClick={() => onOpenBookingModal()}
              className="btn-outline-light"
              style={{ fontSize: '0.68rem', padding: '10px 20px' }}
            >
              Request Confidential Spec Sheet
            </button>
          </div>

          {/* Hypercar Grid */}
          <div className="grid-container">
            {vaultCars.map(car => {
              const price = currency === 'NGN' ? car.priceNGN : car.priceUSD;
              return (
                <div
                  key={car.id}
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectCar(car)}
                >
                  <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                    <img
                      src={car.image}
                      alt={car.model}
                      className="img-cover"
                      style={{ filter: 'brightness(0.95)' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)'
                    }} />

                    <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10 }}>
                      <span className="badge" style={{ background: 'rgba(0,0,0,0.7)', borderColor: 'rgba(255,255,255,0.4)' }}>
                        Vault Reserve
                      </span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#ffffff' }}>
                      <div className="overline" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem' }}>
                        {car.year} · {car.make}
                      </div>
                      <h3 className="font-serif" style={{ fontSize: '1.3rem', color: '#ffffff', fontWeight: 400 }}>
                        {car.model}
                      </h3>
                    </div>
                  </div>

                  <div style={{ padding: '20px', background: '#0a0a0a', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                        {car.specs.horsepower} HP · {car.specs.acceleration} · {car.specs.topSpeed}
                      </div>
                      <div className="font-serif" style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                        {car.isPrivatePricing ? 'Private Pricing on Request' : `${currencySymbol}${price.toLocaleString()}`}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCar(car);
                        }}
                        className="btn-primary-light"
                        style={{ justifyContent: 'center', padding: '11px 12px', fontSize: '0.65rem' }}
                      >
                        Inspect Vehicle
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBookingModal(car);
                        }}
                        className="btn-outline-light"
                        style={{ justifyContent: 'center', padding: '11px 12px', fontSize: '0.65rem' }}
                      >
                        Private Booking
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

    </div>
  );
};
