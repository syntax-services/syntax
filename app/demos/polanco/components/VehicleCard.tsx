'use client';
import React from 'react';
import { Car, Currency } from '../types/car';
import { Volume2, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface VehicleCardProps {
  car: Car;
  currency: Currency;
  onSelectCar: (car: Car) => void;
  onPlaySound: (car: Car) => void;
  onToggleCompare?: (car: Car) => void;
  isCompared?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  car,
  currency,
  onSelectCar,
  onPlaySound,
  onToggleCompare,
  isCompared = false
}) => {
  const price = currency === 'NGN' ? car.priceNGN : car.priceUSD;
  const currencySymbol = currency === 'NGN' ? '₦' : '$';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        border: '1px solid var(--mist)',
        background: '#ffffff',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onClick={() => onSelectCar(car)}
    >
      {/* Image Thumbnail with Overlay Specs */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#050505' }}>
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="img-cover"
          style={{ transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)'
        }} />

        {/* Badge (Status / Armored) */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10 }}>
          {car.bodyStyle === 'Armored' ? (
            <span className="badge-armored">CEN B6</span>
          ) : (
            <span className="badge-black">{car.status}</span>
          )}
        </div>

        {/* Sound Check Trigger Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlaySound(car);
          }}
          title="Exhaust sound check"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Volume2 size={14} color="#0a0a0a" />
        </button>

        {/* Floating Spec Chips over Image Bottom */}
        <div style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          right: '14px',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '2px'
            }}>
              {car.year} · {car.make}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.2
            }}>
              {car.model}
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#ffffff',
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '3px 8px',
              backdropFilter: 'blur(6px)'
            }}>
              {car.specs.horsepower} HP
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        background: '#ffffff'
      }}>
        {/* Key Specs Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--mist)'
        }}>
          <div>
            <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '2px' }}>
              0-60 MPH
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--black)' }}>
              {car.specs.acceleration}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '2px' }}>
              Top Speed
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--black)' }}>
              {car.specs.topSpeed}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: '2px' }}>
              Engine
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--black)' }}>
              {car.specs.engineType}
            </div>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div>
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--black)' }}>
              {car.isPrivatePricing ? 'Price on Request' : `${currencySymbol}${price.toLocaleString()}`}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectCar(car);
              }}
              className="btn-black"
              style={{ justifyContent: 'center', padding: '11px 12px', fontSize: '0.65rem' }}
            >
              View Details
            </button>

            {onToggleCompare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(car);
                }}
                className={isCompared ? 'btn-black' : 'btn-outline-black'}
                style={{ justifyContent: 'center', padding: '11px 12px', fontSize: '0.65rem' }}
              >
                {isCompared ? <Check size={13} /> : <Plus size={13} />} {isCompared ? 'Compared' : 'Compare'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
