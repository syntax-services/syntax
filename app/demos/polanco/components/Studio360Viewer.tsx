'use client';
import React, { useState } from 'react';
import { Car, GalleryItem } from '../types/car';
import { Eye, RotateCw, Sparkles, Disc, Sliders, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Studio360ViewerProps {
  car: Car;
}

export const Studio360Viewer: React.FC<Studio360ViewerProps> = ({ car }) => {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  // Build 5 photoshoot angles from car assets or gallery
  const angles: { label: string; url: string; iconName: string }[] = [
    {
      label: '1. Showroom Exterior',
      url: car.image,
      iconName: 'Exterior'
    },
    {
      label: '2. Pirelli Wheel & Carbon Ceramic',
      url: car.gallery && car.gallery[1] ? car.gallery[1].url : '/polanco_assets/polanco_asset_2.jpg',
      iconName: 'Wheel'
    },
    {
      label: '3. Rear Quad-Exhaust & Diffuser',
      url: car.gallery && car.gallery[2] ? car.gallery[2].url : '/polanco_assets/polanco_asset_3.jpg',
      iconName: 'Rear'
    },
    {
      label: '4. Cockpit & Leather Interior',
      url: car.interiorImage || (car.gallery && car.gallery[3] ? car.gallery[3].url : '/polanco_assets/hypercar_interior.jpg'),
      iconName: 'Interior'
    },
    {
      label: '5. Engine Bay / Starlight Ceiling',
      url: car.gallery && car.gallery[4] ? car.gallery[4].url : '/polanco_assets/starlight_interior.jpg',
      iconName: 'Engine'
    }
  ];

  const currentAngle = angles[activeAngleIndex] || angles[0];

  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.15)',
      overflow: 'hidden'
    }}>
      {/* Studio Viewing Screen */}
      <div style={{ position: 'relative', height: '380px', background: '#000000', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentAngle.url}
            src={currentAngle.url}
            alt={`${car.model} ${currentAngle.label}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AnimatePresence>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Badge Indicator */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,0,0,0.75)',
          padding: '6px 14px',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#ffffff',
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)'
        }}>
          <RotateCw size={13} color="#ffffff" className="spin-slow" />
          <span>Studio 360° Photoshoot Angle</span>
        </div>

        {/* Current Angle Label */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: '#ffffff'
        }}>
          <div>
            <div className="overline" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem' }}>
              CAMERA PERSPECTIVE {activeAngleIndex + 1} OF 5
            </div>
            <div className="font-serif" style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 400 }}>
              {currentAngle.label}
            </div>
          </div>
        </div>
      </div>

      {/* Angle Selector Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: '#0a0a0a'
      }}>
        {angles.map((ang, idx) => (
          <button
            key={ang.label}
            onClick={() => setActiveAngleIndex(idx)}
            style={{
              background: activeAngleIndex === idx ? 'rgba(255,255,255,0.15)' : 'transparent',
              border: 'none',
              borderRight: idx < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              padding: '12px 8px',
              color: activeAngleIndex === idx ? '#ffffff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s ease',
              textAlign: 'center'
            }}
          >
            Angle {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
