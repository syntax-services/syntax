'use client';
import React, { useState } from 'react';
import { Car, Currency } from '../types/car';
import { X, Volume2, Calendar, CheckCircle2, FileText, ArrowRight, RotateCw, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Vehicle360Viewer } from './Vehicle360Viewer';

interface VehicleDetailModalProps {
  car: Car | null;
  currency: Currency;
  onClose: () => void;
  onPlaySound: (car: Car) => void;
  onOpenBookingModal: (car: Car) => void;
  onOpenBuildSheetModal: (car: Car) => void;
  onToggleCompare?: (car: Car) => void;
  isCompared?: boolean;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  car,
  currency,
  onClose,
  onPlaySound,
  onOpenBookingModal,
  onOpenBuildSheetModal,
  onToggleCompare,
  isCompared = false
}) => {
  if (!car) return null;

  const [activeTab, setActiveTab] = useState<'360' | 'specs' | 'finance'>('360');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36);

  const price = currency === 'NGN' ? car.priceNGN : car.priceUSD;
  const currencySymbol = currency === 'NGN' ? '₦' : '$';

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanPrincipal = price - downPaymentAmount;
  const interestRate = 0.09;
  const monthlyInterestRate = interestRate / 12;
  const estimatedMonthlyPayment = (loanPrincipal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#ffffff',
          border: '1px solid var(--mist)',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            background: '#ffffff'
          }}
          aria-label="Close vehicle details"
        >
          <X size={18} />
        </button>

        {/* Interactive 360° Showroom Turntable Suite */}
        <Vehicle360Viewer car={car} />

        {/* Action Header Strip */}
        <div style={{
          padding: '20px 24px',
          background: 'var(--cream)',
          borderBottom: '1px solid var(--mist)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div className="overline" style={{ marginBottom: '2px' }}>
              {car.year} · {car.make}
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--black)' }}>
              {car.model}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => onPlaySound(car)}
              className="btn-outline-black"
              style={{ fontSize: '0.7rem', padding: '10px 18px' }}
            >
              <Volume2 size={14} /> Exhaust Sound
            </button>

            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(car)}
                className={isCompared ? 'btn-black' : 'btn-outline-black'}
                style={{ fontSize: '0.7rem', padding: '10px 18px' }}
              >
                {isCompared ? <Check size={14} /> : <Plus size={14} />} {isCompared ? 'Compared' : 'Compare Spec'}
              </button>
            )}
          </div>
        </div>

        {/* Tabs Header */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--mist)',
          background: '#ffffff',
          padding: '0 24px'
        }}>
          {[
            { id: '360', label: 'Overview & Studio' },
            { id: 'specs', label: 'Technical Spec Matrix' },
            { id: 'finance', label: 'Acquisition Calculator' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'none',
                border: 'none',
                padding: '16px 20px',
                fontSize: '0.75rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                fontFamily: 'var(--font-body)',
                color: activeTab === tab.id ? 'var(--black)' : 'var(--slate)',
                borderBottom: activeTab === tab.id ? '2px solid var(--black)' : '2px solid transparent',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.12em'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ padding: '28px 24px' }}>
          {activeTab === '360' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p className="body-lg">
                {car.overview}
              </p>

              {/* Highlights */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px',
                padding: '20px',
                background: 'var(--ivory)',
                border: '1px solid var(--mist)'
              }}>
                <div>
                  <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>ENGINE ARCHITECTURE</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--black)' }}>{car.specs.engine}</div>
                </div>
                <div>
                  <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>HORSEPOWER</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--black)' }}>{car.specs.horsepower} HP</div>
                </div>
                <div>
                  <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>0-60 MPH</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--black)' }}>{car.specs.acceleration}</div>
                </div>
                <div>
                  <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>LAGOS CUSTOMS</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--black)' }}>{car.specs.customsStatus}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {[
                  { label: 'ENGINE TYPE', value: car.specs.engine },
                  { label: 'HORSEPOWER', value: `${car.specs.horsepower} HP` },
                  { label: 'TORQUE', value: car.specs.torque },
                  { label: '0-60 MPH', value: car.specs.acceleration },
                  { label: 'TOP SPEED', value: car.specs.topSpeed },
                  { label: 'TRANSMISSION', value: car.specs.transmission },
                  { label: 'DRIVETRAIN', value: car.specs.drivetrain },
                  { label: 'VIN NUMBER', value: car.specs.vin },
                  { label: 'CUSTOMS STATUS', value: car.specs.customsStatus }
                ].map((spec, i) => (
                  <div key={i} style={{
                    background: 'var(--ivory)',
                    border: '1px solid var(--mist)',
                    padding: '14px 16px'
                  }}>
                    <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>
                      {spec.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--black)' }}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="overline" style={{ marginBottom: '12px' }}>KEY OPTIONS & EQUIPMENT</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {car.keyFeatures.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--black)' }}>
                      <CheckCircle2 size={15} color="var(--black)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>
                    DOWN PAYMENT: {downPaymentPercent}% ({currencySymbol}{downPaymentAmount.toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={70}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    style={{ width: '100%', marginBottom: '20px' }}
                  />

                  <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>
                    DURATION: {loanTermMonths} MONTHS
                  </label>
                  <select
                    value={loanTermMonths}
                    onChange={(e) => setLoanTermMonths(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--mist)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      outline: 'none'
                    }}
                  >
                    <option value={12}>12 Months (1 Year)</option>
                    <option value={24}>24 Months (2 Years)</option>
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                  </select>
                </div>

                <div style={{
                  background: 'var(--black)',
                  color: '#ffffff',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}>
                  <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                    ESTIMATED MONTHLY INSTALLMENT
                  </div>
                  <div className="font-serif" style={{ fontSize: '2.2rem', color: '#ffffff' }}>
                    {currencySymbol}{Math.round(estimatedMonthlyPayment).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                    Based on 9.0% estimated annual rate
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div style={{
            borderTop: '1px solid var(--mist)',
            paddingTop: '24px',
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div className="overline" style={{ fontSize: '0.6rem' }}>VEHICLE LIST PRICE</div>
              <div className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--black)' }}>
                {car.isPrivatePricing ? 'Price on Request' : `${currencySymbol}${price.toLocaleString()}`}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal(car);
                }}
                className="btn-primary"
              >
                <Calendar size={14} /> Schedule Inspection
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
