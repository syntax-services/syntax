'use client';
import React, { useState } from 'react';
import { Car } from '../types/car';
import { X, Calendar, Clock, MapPin, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface VIPBookingModalProps {
  car: Car | null;
  onClose: () => void;
}

export const VIPBookingModal: React.FC<VIPBookingModalProps> = ({ car, onClose }) => {
  if (!car) return null;

  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('12:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experienceType, setExperienceType] = useState<'walkthrough' | 'test-drive' | 'home-delivery'>('walkthrough');
  const [submitted, setSubmitted] = useState(false);

  const TIME_SLOTS = [
    { time: '10:00 AM', status: 'Available' },
    { time: '12:00 PM', status: 'Available' },
    { time: '02:00 PM', status: 'Available' },
    { time: '04:00 PM', status: 'Limited' },
    { time: '06:00 PM', status: 'VIP Exclusive' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1200,
      background: 'rgba(5, 5, 5, 0.85)',
      backdropFilter: 'blur(16px)',
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
          border: '1px solid var(--mist)',
          borderRadius: '0',
          width: '100%',
          maxWidth: '580px',
          padding: '36px',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
          color: '#0a0a0a'
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
            color: '#0a0a0a',
            cursor: 'pointer'
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle size={54} color="#0a0a0a" style={{ marginBottom: '16px' }} />
            <h3 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 500, color: '#0a0a0a', marginBottom: '12px' }}>
              VIP Reservation Confirmed
            </h3>
            <p style={{ color: 'var(--slate)', fontSize: '0.92rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Thank you, <strong>{name}</strong>. Your private inspection for the <strong>{car.year} {car.make} {car.model}</strong> on <strong>{date} at {timeSlot}</strong> has been logged with our Lekki Concierge Director.
            </p>

            <div style={{
              background: '#f9f8f6',
              border: '1px solid var(--mist)',
              padding: '20px',
              textAlign: 'left',
              fontSize: '0.85rem',
              color: '#0a0a0a',
              marginBottom: '28px',
              lineHeight: 1.7
            }}>
              <strong>Appointment Details:</strong> <br />
              • Vehicle: {car.year} {car.make} {car.model} <br />
              • Location: Polanco Showroom, Lekki Phase 1, Lagos <br />
              • Experience: {experienceType === 'walkthrough' ? 'Private Walk-through' : experienceType === 'test-drive' ? 'Private Test Drive' : 'Doorstep Presentation'}
            </div>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Close Confirmation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div className="overline" style={{ marginBottom: '6px' }}>
                SHOWROOM SCHEDULING ENGINE
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#0a0a0a' }}>
                Book Inspection: {car.make} {car.model}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate)', marginTop: '4px' }}>
                Select your preferred date, experience, and automated time slot for a private walk-through.
              </p>
            </div>

            {/* Experience Type Selector */}
            <div>
              <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>
                CHOOSE VIP EXPERIENCE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { id: 'walkthrough', label: 'Walk-through' },
                  { id: 'test-drive', label: 'Test Drive' },
                  { id: 'home-delivery', label: 'Doorstep VIP' }
                ].map(item => {
                  const isSelected = experienceType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setExperienceType(item.id as any)}
                      style={{
                        background: isSelected ? '#0a0a0a' : '#f9f8f6',
                        color: isSelected ? '#ffffff' : '#0a0a0a',
                        border: isSelected ? '1px solid #0a0a0a' : '1px solid var(--mist)',
                        padding: '12px 6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="overline" style={{ display: 'block', marginBottom: '6px' }}>YOUR FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Chief / Honorable Senator"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--mist)',
                    background: '#ffffff',
                    color: '#0a0a0a',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="overline" style={{ display: 'block', marginBottom: '6px' }}>PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 810 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--mist)',
                    background: '#ffffff',
                    color: '#0a0a0a',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="overline" style={{ display: 'block', marginBottom: '6px' }}>INSPECTION DATE</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid var(--mist)',
                  background: '#ffffff',
                  color: '#0a0a0a',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  outline: 'none'
                }}
              />
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="overline" style={{ display: 'block', marginBottom: '8px' }}>AUTOMATED TIME SLOTS</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                {TIME_SLOTS.map(slot => {
                  const isSelected = timeSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTimeSlot(slot.time)}
                      style={{
                        background: isSelected ? '#0a0a0a' : '#f9f8f6',
                        color: isSelected ? '#ffffff' : '#0a0a0a',
                        border: isSelected ? '1px solid #0a0a0a' : '1px solid var(--mist)',
                        padding: '10px 4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center', width: '100%' }}>
              Confirm VIP Reservation <ArrowRight size={14} />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
