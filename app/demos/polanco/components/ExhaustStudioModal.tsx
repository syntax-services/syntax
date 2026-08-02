'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Car } from '../types/car';
import { X, Volume2, Flame, Play, Square, Activity, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { globalAudioSynthesizer, MARQUE_ACOUSTIC_PROFILES } from '../utils/audioEngine';

interface ExhaustStudioModalProps {
  car: Car | null;
  onClose: () => void;
}

export const ExhaustStudioModal: React.FC<ExhaustStudioModalProps> = ({ car, onClose }) => {
  if (!car) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [rpm, setRpm] = useState(850);
  const [exhaustMode, setExhaustMode] = useState<'stock' | 'titanium' | 'flame'>('titanium');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Map car to acoustic profile key
  const profileKey = car.soundProfile?.type || 'v12-naturally-aspirated';
  const profile = MARQUE_ACOUSTIC_PROFILES[profileKey] || MARQUE_ACOUSTIC_PROFILES['v12-naturally-aspirated'];

  // Start sound when modal opens
  useEffect(() => {
    setRpm(profile.idleRpm);
    globalAudioSynthesizer.start(profileKey, profile.idleRpm);
    setIsPlaying(true);

    return () => {
      globalAudioSynthesizer.stop();
    };
  }, [car, profileKey]);

  // Update synthesizer RPM when slider changes
  const handleRpmChange = (newRpm: number) => {
    setRpm(newRpm);
    globalAudioSynthesizer.updateRpm(newRpm);
  };

  // Trigger Burble Pops
  const handleTriggerPop = () => {
    globalAudioSynthesizer.triggerBurblePops();
  };

  // Toggle Audio
  const togglePlay = () => {
    if (isPlaying) {
      globalAudioSynthesizer.stop();
      setIsPlaying(false);
    } else {
      globalAudioSynthesizer.start(profileKey, rpm);
      setIsPlaying(true);
    }
  };

  // Canvas Real-Time Spectrum Visualizer Effect
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      const barCount = 32;
      const barWidth = width / barCount;

      const rpmRatio = (rpm - profile.idleRpm) / (profile.redlineRpm - profile.idleRpm);

      for (let i = 0; i < barCount; i++) {
        const freq = (i / barCount) * Math.PI * 4;
        const amplitude = isPlaying
          ? (Math.sin(freq + Date.now() * 0.008) * 0.3 + 0.5) * (0.3 + rpmRatio * 0.7) * height * 0.8
          : 4;

        const x = i * barWidth;
        const y = height - amplitude;

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.7, '#6b6b6b');
        gradient.addColorStop(1, '#0a0a0a');

        ctx.fillStyle = isPlaying ? gradient : 'rgba(255,255,255,0.1)';
        ctx.fillRect(x, y, barWidth - 3, amplitude);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, rpm, profile]);

  const rpmPercentage = ((rpm - profile.idleRpm) / (profile.redlineRpm - profile.idleRpm)) * 100;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }} onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: '#0a0a0a',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          width: '100%',
          maxWidth: '680px',
          padding: '28px',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#ffffff',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close exhaust studio"
        >
          <X size={18} />
        </button>

        {/* Header Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Volume2 size={20} color="#ffffff" />
          <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
            POLANCO ACOUSTIC STUDIO · EXHAUST SYNTHESIZER
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: '#ffffff', marginBottom: '4px' }}>
          {car.year} {car.make} {car.model}
        </h2>

        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
          {profile.engineType} · {profile.description}
        </p>

        {/* Real-time Spectrum Canvas */}
        <div style={{
          position: 'relative',
          height: '110px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '12px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
              REAL-TIME ACOUSTIC SPECTRUM
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={12} color={isPlaying ? '#ffffff' : 'rgba(255,255,255,0.3)'} />
              <span style={{ fontSize: '0.62rem', color: isPlaying ? '#ffffff' : 'rgba(255,255,255,0.3)' }}>
                {isPlaying ? 'ACTIVE SYNTHESIS' : 'PAUSED'}
              </span>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={600}
            height={60}
            style={{ width: '100%', height: '60px', objectFit: 'cover' }}
          />
        </div>

        {/* Digital RPM Tachometer Needle Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
              ENGINE THROTTLE · TACHOMETER
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {rpm.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>RPM</span>
            </span>
          </div>

          <input
            type="range"
            min={profile.idleRpm}
            max={profile.redlineRpm}
            step={50}
            value={rpm}
            onChange={(e) => handleRpmChange(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#ffffff',
              height: '6px',
              cursor: 'pointer'
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
            <span>IDLE ({profile.idleRpm} RPM)</span>
            <span>MID REV (4,500 RPM)</span>
            <span>REDLINE ({profile.redlineRpm} RPM)</span>
          </div>
        </div>

        {/* Exhaust Mode Selector & Burble Trigger */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            onClick={handleTriggerPop}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '12px 20px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)'
            }}
          >
            <Flame size={14} color="#ffffff" /> Trigger Exhaust Pop & Burble
          </button>

          <button
            onClick={togglePlay}
            style={{
              background: isPlaying ? '#ffffff' : 'transparent',
              color: isPlaying ? '#0a0a0a' : '#ffffff',
              border: '1px solid #ffffff',
              padding: '12px 20px',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)'
            }}
          >
            {isPlaying ? <Square size={13} /> : <Play size={13} />}
            {isPlaying ? 'Mute Studio' : 'Start Engine Sound'}
          </button>
        </div>

        {/* Acoustic Spec Footer Strip */}
        <div style={{
          padding: '14px 18px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.7)'
        }}>
          <div>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>{profile.cylinders}-Cylinder Firing Sequence</span> · Redline @ {profile.redlineRpm} RPM
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', fontWeight: 600 }}>
            <ShieldCheck size={14} /> 100% Authentic Acoustics
          </div>
        </div>
      </motion.div>
    </div>
  );
};
