'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Car } from '../types/car';
import { RotateCw, Play, Pause, Compass, ShieldCheck, Sparkles, Info, Eye, Sliders, Sun, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Vehicle360ViewerProps {
  car: Car;
}

export const Vehicle360Viewer: React.FC<Vehicle360ViewerProps> = ({ car }) => {
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [angle, setAngle] = useState(0); // 0 to 360 degrees
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startAngle = useRef(0);

  // Auto-spin 360 turntable timer
  useEffect(() => {
    let interval: any;
    if (isAutoSpinning && viewMode === 'exterior') {
      interval = setInterval(() => {
        setAngle((prev) => (prev + 3) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoSpinning, viewMode]);

  // Handle Drag Start
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (viewMode !== 'exterior') return;
    isDragging.current = true;
    setIsAutoSpinning(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    startX.current = clientX;
    startAngle.current = angle;
  };

  // Handle Drag Move
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || viewMode !== 'exterior') return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    let newAngle = (startAngle.current + deltaX * 0.8) % 360;
    if (newAngle < 0) newAngle += 360;
    setAngle(Math.round(newAngle));
  };

  // Handle Drag End
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Default vehicle exterior hotspots
  const exteriorHotspots = car.hotspots || [
    {
      id: 'engine',
      label: 'POWERTRAIN ENGINE BAY',
      angle: 0,
      detail: `${car.specs.horsepower} HP · ${car.specs.engine}`,
      topPercent: 54,
      leftPercent: 32
    },
    {
      id: 'cockpit',
      label: 'HANDCRAFTED COCKPIT',
      angle: 90,
      detail: car.specs.interiorPackage,
      topPercent: 46,
      leftPercent: 50
    },
    {
      id: 'aero',
      label: 'ACTIVE AERODYNAMICS & EXHAUST',
      angle: 180,
      detail: `Top Speed ${car.specs.topSpeed} · Quad-Pipe Exhaust`,
      topPercent: 52,
      leftPercent: 68
    },
    {
      id: 'brakes',
      label: 'CARBON CERAMIC BRAKES & WHEELS',
      angle: 270,
      detail: 'Lightweight Forged Alloy Wheels & Brembo Brakes',
      topPercent: 62,
      leftPercent: 44
    }
  ];

  // Interior cockpit hotspots
  const interiorHotspots = [
    {
      id: 'steering',
      label: 'CARBON PADDLE SHIFT STEERING',
      detail: 'Forged Carbon Fiber & Anodized Aluminum Controls',
      topPercent: 58,
      leftPercent: 36
    },
    {
      id: 'starlight',
      label: 'STARLIGHT FIBER-OPTIC HEADLINER',
      detail: '1,344 Individual Hand-Woven Fiber-Optic Lights',
      topPercent: 24,
      leftPercent: 50
    },
    {
      id: 'display',
      label: 'POLANCO DIGITAL OS TELEMETRY',
      detail: 'Dual High-Resolution Curved Telemetry Displays',
      topPercent: 45,
      leftPercent: 54
    },
    {
      id: 'leather',
      label: 'BESPOKE HAND-SEWN LEATHER',
      detail: car.specs.interiorPackage,
      topPercent: 72,
      leftPercent: 64
    }
  ];

  // Select interior photo asset (Rolls-Royce Starlight vs Hypercar Cockpit)
  const interiorImage = car.make === 'Rolls-Royce' || car.make === 'Mercedes-Maybach' || car.make === 'Bentley'
    ? '/images/starlight_interior.jpg'
    : '/images/hypercar_interior.jpg';

  const hasFrames = Boolean(car.frames360 && car.frames360.length > 0);
  const currentFrameIndex = hasFrames && car.frames360
    ? Math.min(car.frames360.length - 1, Math.floor((angle / 360) * car.frames360.length))
    : 0;
  const currentDisplayImage = hasFrames && car.frames360
    ? car.frames360[currentFrameIndex]
    : car.image;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '440px',
        background: '#050505',
        overflow: 'hidden',
        cursor: viewMode === 'exterior' ? (isDragging.current ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Background Ambience Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center bottom, rgba(30,30,30,0.85) 0%, rgba(5,5,5,0.98) 75%)',
        zIndex: 1
      }} />

      {/* Top Glass View Switcher (Exterior 360 vs Interior Cockpit) */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(10, 10, 10, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        padding: '5px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
      }}>
        <button
          onClick={() => setViewMode('exterior')}
          style={{
            background: viewMode === 'exterior' ? '#ffffff' : 'transparent',
            color: viewMode === 'exterior' ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
            border: 'none',
            padding: '6px 14px',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease'
          }}
        >
          <RotateCw size={12} /> 360° EXTERIOR TURNTABLE
        </button>

        <button
          onClick={() => {
            setViewMode('interior');
            setIsAutoSpinning(false);
          }}
          style={{
            background: viewMode === 'interior' ? '#ffffff' : 'transparent',
            color: viewMode === 'interior' ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
            border: 'none',
            padding: '6px 14px',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease'
          }}
        >
          <Sun size={12} /> BESPOKE COCKPIT INTERIOR
        </button>
      </div>

      {/* Main View Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'exterior' ? (
          <motion.div
            key="exterior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
          >
            <img
              src={currentDisplayImage}
              alt={`${car.year} ${car.make} ${car.model}`}
              style={{
                width: hasFrames ? '100%' : 'auto',
                height: hasFrames ? '100%' : 'auto',
                maxWidth: hasFrames ? '100%' : '92%',
                maxHeight: hasFrames ? '100%' : '340px',
                objectFit: hasFrames ? 'cover' : 'contain',
                filter: 'brightness(1.02)'
              }}
            />

            {/* Top Left Angle Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(10, 10, 10, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '6px 14px',
              backdropFilter: 'blur(12px)'
            }}>
              <RotateCw size={14} color="#ffffff" className={isAutoSpinning ? 'spin-slow' : ''} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff' }}>
                TURNTABLE · {angle}°
              </span>
            </div>

            {/* Exterior Hotspots */}
            {exteriorHotspots.map((spot) => {
              const angleDiff = Math.abs((angle - spot.angle + 360) % 360);
              const isVisible = angleDiff < 60 || angleDiff > 300;
              if (!isVisible) return null;

              return (
                <div
                  key={spot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: `${spot.topPercent}%`,
                    left: `${spot.leftPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 15,
                    cursor: 'pointer'
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '2px solid #0a0a0a',
                      boxShadow: '0 0 16px rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Info size={12} color="#0a0a0a" />
                  </motion.div>

                  {/* Hotspot Detail Popup */}
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        style={{
                          position: 'absolute',
                          bottom: '30px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '240px',
                          background: 'rgba(10, 10, 10, 0.92)',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          padding: '12px 14px',
                          color: '#ffffff',
                          backdropFilter: 'blur(16px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                          pointerEvents: 'none'
                        }}
                      >
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {spot.label}
                        </div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
                          {spot.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="interior"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2
            }}
          >
            <img
              src={interiorImage}
              alt={`${car.make} ${car.model} Bespoke Interior`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(1.02) contrast(1.04)'
              }}
            />

            {/* Subtle Vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
            }} />

            {/* Top Left Interior Label */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(10, 10, 10, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '6px 14px',
              backdropFilter: 'blur(12px)',
              color: '#ffffff'
            }}>
              <Sparkles size={14} color="#ffffff" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                COCKPIT PACKAGE · {car.specs.interiorPackage}
              </span>
            </div>

            {/* Interior Hotspots */}
            {interiorHotspots.map((spot) => (
              <div
                key={spot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                }}
                style={{
                  position: 'absolute',
                  top: `${spot.topPercent}%`,
                  left: `${spot.leftPercent}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 15,
                  cursor: 'pointer'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '2px solid #0a0a0a',
                    boxShadow: '0 0 16px rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Info size={12} color="#0a0a0a" />
                </motion.div>

                {/* Hotspot Detail Popup */}
                <AnimatePresence>
                  {activeHotspot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '250px',
                        background: 'rgba(10, 10, 10, 0.92)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        padding: '12px 14px',
                        color: '#ffffff',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        pointerEvents: 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {spot.label}
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
                        {spot.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Controls (Only shown for Exterior view) */}
      {viewMode === 'exterior' && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(10, 10, 10, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '8px 18px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {/* Play/Pause Auto-Spin */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAutoSpinning(!isAutoSpinning);
            }}
            style={{
              background: isAutoSpinning ? '#ffffff' : 'rgba(255,255,255,0.15)',
              color: isAutoSpinning ? '#0a0a0a' : '#ffffff',
              border: 'none',
              padding: '6px 12px',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-body)'
            }}
          >
            {isAutoSpinning ? <Pause size={12} /> : <Play size={12} />}
            <span>{isAutoSpinning ? 'Pause 360' : 'Auto 360'}</span>
          </button>

          <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)' }} />

          {/* Quick Angle Presets */}
          {[
            { label: '0° Front', val: 0 },
            { label: '90° Side', val: 90 },
            { label: '180° Rear', val: 180 },
            { label: '270° Profile', val: 270 }
          ].map((preset) => (
            <button
              key={preset.val}
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoSpinning(false);
                setAngle(preset.val);
              }}
              style={{
                background: angle === preset.val ? '#ffffff' : 'transparent',
                color: angle === preset.val ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
                border: 'none',
                padding: '4px 10px',
                fontSize: '0.62rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.2s ease'
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
