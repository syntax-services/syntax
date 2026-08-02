'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Car } from '../types/car';
import { X, Volume2, Flame, Play, Square, Gauge, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface EngineSoundboardModalProps {
  car: Car | null;
  onClose: () => void;
}

export const EngineSoundboardModal: React.FC<EngineSoundboardModalProps> = ({
  car,
  onClose
}) => {
  if (!car) return null;

  const { idleRpm, redlineRpm, soundLabel, basePitch, type: soundType } = car.soundProfile;

  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(idleRpm);
  const [isRevving, setIsRevving] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      if (soundType === 'v12-naturally-aspirated') {
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
      } else if (soundType === 'v8-twin-turbo') {
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
      } else if (soundType === 'flat-6-high-rev') {
        osc1.type = 'square';
        osc2.type = 'sawtooth';
      } else if (soundType === 'v8-supercharged') {
        osc1.type = 'sawtooth';
        osc2.type = 'square';
      } else if (soundType === 'w16-quad-turbo') {
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
      } else {
        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
      }

      osc1.frequency.setValueAtTime(55 * basePitch, ctx.currentTime);
      osc2.frequency.setValueAtTime(110 * basePitch, ctx.currentTime);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gain;

      setIsPlaying(true);
    } catch (e) {
      console.error('Audio synthesizer error:', e);
    }
  };

  const stopAudio = () => {
    if (osc1Ref.current) osc1Ref.current.stop();
    if (osc2Ref.current) osc2Ref.current.stop();
    if (audioCtxRef.current) audioCtxRef.current.close();
    setIsPlaying(false);
    setRpm(idleRpm);
  };

  const handleRevStart = () => {
    if (!isPlaying) startAudio();
    setIsRevving(true);
  };

  const handleRevEnd = () => {
    setIsRevving(false);
  };

  useEffect(() => {
    let interval: any;
    if (isRevving) {
      interval = setInterval(() => {
        setRpm((prev) => {
          const next = prev + 480;
          return next > redlineRpm ? redlineRpm : next;
        });
      }, 40);
    } else {
      interval = setInterval(() => {
        setRpm((prev) => {
          const next = prev - 380;
          return next < idleRpm ? idleRpm : next;
        });
      }, 40);
    }
    return () => clearInterval(interval);
  }, [isRevving, idleRpm, redlineRpm]);

  useEffect(() => {
    if (isPlaying && audioCtxRef.current && osc1Ref.current && osc2Ref.current) {
      const ctx = audioCtxRef.current;
      const rpmFraction = (rpm - idleRpm) / (redlineRpm - idleRpm);
      const freq1 = (50 + rpmFraction * 380) * basePitch;
      const freq2 = freq1 * 2.0;

      osc1Ref.current.frequency.setTargetAtTime(freq1, ctx.currentTime, 0.04);
      osc2Ref.current.frequency.setTargetAtTime(freq2, ctx.currentTime, 0.04);
    }
  }, [rpm, isPlaying, idleRpm, redlineRpm, basePitch]);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const rpmPercentage = Math.min(100, Math.max(0, ((rpm - idleRpm) / (redlineRpm - idleRpm)) * 100));
  const isNearRedline = rpm >= redlineRpm - 1000;

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
    }} onClick={() => { stopAudio(); onClose(); }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#ffffff',
          width: '100%',
          maxWidth: '540px',
          padding: '36px 28px',
          position: 'relative',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { stopAudio(); onClose(); }}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div className="overline" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
          EXHAUST SOUNDSCAPE SOUNDBOARD
        </div>

        <h3 className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 400, color: '#ffffff', marginBottom: '4px' }}>
          {car.make} {car.model}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
          {soundLabel}
        </p>

        {/* Digital RPM Tachometer */}
        <div style={{
          background: '#121212',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '24px',
          marginBottom: '24px',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              DIGITAL TACHOMETER
            </span>
            <span style={{ fontSize: '0.7rem', color: isNearRedline ? '#ef4444' : 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              {isNearRedline ? 'REDLINE MAX' : `IDLE: ${idleRpm} RPM`}
            </span>
          </div>

          <div className="font-serif" style={{
            fontSize: '3.6rem',
            fontWeight: 400,
            color: isNearRedline ? '#ef4444' : '#ffffff',
            transition: 'color 0.1s'
          }}>
            {rpm.toLocaleString()} <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>RPM</span>
          </div>

          {/* RPM Bar */}
          <div style={{
            height: '6px',
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            marginTop: '16px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${rpmPercentage}%`,
              background: isNearRedline ? '#ef4444' : '#ffffff',
              transition: 'width 0.04s linear'
            }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onMouseDown={handleRevStart}
            onMouseUp={handleRevEnd}
            onTouchStart={handleRevStart}
            onTouchEnd={handleRevEnd}
            className="btn-primary-light"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '0.75rem',
              justifyContent: 'center',
              userSelect: 'none',
              transform: isRevving ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <Flame size={16} /> PRESS & HOLD THROTTLE (REV ENGINE)
          </button>

          <button
            onClick={() => {
              if (isPlaying) stopAudio();
              else startAudio();
            }}
            className="btn-outline-light"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.75rem' }}
          >
            {isPlaying ? (
              <><Square size={14} /> Stop Engine Audio</>
            ) : (
              <><Play size={14} /> Start Engine Idle</>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
