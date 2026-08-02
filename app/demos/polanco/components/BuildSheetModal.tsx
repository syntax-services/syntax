'use client';
import React, { useState } from 'react';
import { Car, Currency } from '../types/car';
import { X, FileText, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface BuildSheetModalProps {
  car: Car | null;
  currency: Currency;
  onClose: () => void;
}

export const BuildSheetModal: React.FC<BuildSheetModalProps> = ({ car, currency, onClose }) => {
  if (!car) return null;

  const [downloaded, setDownloaded] = useState(false);

  const price = currency === 'NGN' ? car.priceNGN : car.priceUSD;
  const currencySymbol = currency === 'NGN' ? '₦' : '$';

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
        style={{
          background: '#ffffff',
          border: '1px solid #000000',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '680px',
          padding: '36px',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <FileText size={22} color="#000000" />
          <div className="tag-metadata" style={{ color: '#000000' }}>CONFIDENTIAL FACTORY BUILD SHEET</div>
        </div>

        <h2 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '16px' }}>
          {car.year} {car.make} {car.model}
        </h2>

        <div style={{
          background: '#f4f4f6',
          border: '1px solid #000000',
          borderRadius: 'var(--radius-sm)',
          padding: '20px',
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#000000'
        }}>
          <div>VIN: {car.specs.vin}</div>
          <div>ENGINE: {car.specs.engine}</div>
          <div>POWER: {car.specs.horsepower} HP</div>
          <div>TOP SPEED: {car.specs.topSpeed}</div>
          <div>INTERIOR: {car.specs.interiorPackage}</div>
          <div>CLEARANCE: {car.specs.customsStatus}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <div>
            <div className="tag-metadata" style={{ fontSize: '0.65rem' }}>OFFICIAL PRICE</div>
            <div className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000' }}>
              {car.isPrivatePricing ? 'Private Pricing on Request' : `${currencySymbol}${price.toLocaleString()}`}
            </div>
          </div>

          <button
            onClick={() => setDownloaded(true)}
            className="btn-black"
          >
            {downloaded ? <CheckCircle2 size={16} /> : <Download size={16} />}
            {downloaded ? 'Build Sheet Downloaded' : 'Download Official PDF'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
