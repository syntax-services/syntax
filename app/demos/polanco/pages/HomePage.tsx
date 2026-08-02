'use client';
import React, { useState, useEffect } from 'react';
import { Car, Currency, PageView } from '../types/car';
import { CARS_DATA } from '../data/cars';
import { BrandLogoCarousel } from '../components/BrandLogoCarousel';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ArrowRight, Volume2, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomePageProps {
  currency: Currency;
  onSelectCar: (car: Car) => void;
  onPlaySound: (car: Car) => void;
  onOpenBookingModal: (car?: Car) => void;
  onOpenBuildSheetModal: (car?: Car) => void;
  onOpenBespokeModal: () => void;
  setActiveView: (view: PageView) => void;
  setSelectedMake?: (make: string) => void;
}

const HERO_SLIDES = [
  {
    image: '/images/hero_slides/slide_1_bugatti.jpg',
    make: 'BUGATTI',
    model: 'Chiron Pur Sport',
    specs: 'W16 8.0L Quad-Turbo · 1,479 HP · Showroom Turntable',
    badge: '1 OF 60 WORLDWIDE'
  },
  {
    image: '/images/hero_slides/slide_2_aston.jpg',
    make: 'ASTON MARTIN',
    model: 'DB12 Super Tourer',
    specs: '671 HP Twin-Turbo V8 · British Racing Green · Lekki Showroom',
    badge: 'NEW ARRIVAL'
  },
  {
    image: '/images/hero_slides/slide_3_mclaren.jpg',
    make: 'MCLAREN',
    model: '750S Spider',
    specs: '740 HP Twin-Turbo V8 · Papaya Orange · 0-60 in 2.7s',
    badge: 'IN STOCK NOW'
  },
  {
    image: '/images/hero_slides/slide_4_ferrari.jpg',
    make: 'FERRARI',
    model: 'Purosangue V12',
    specs: '715 HP Naturally Aspirated V12 · Rosso Corsa · Cleared Customs',
    badge: 'V12 FLAGSHIP'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onSelectCar,
  onPlaySound,
  onOpenBookingModal,
  setActiveView,
  setSelectedMake
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload all 4 hero images into browser cache immediately for instant zero-delay transitions
  useEffect(() => {
    HERO_SLIDES.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // Auto-change hero slide every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const rollsRoyce = CARS_DATA.find(c => c.make === 'Rolls-Royce') || CARS_DATA[0];
  const ferrari = CARS_DATA.find(c => c.make === 'Ferrari') || CARS_DATA[1];
  const soundCarSample = CARS_DATA.find(c => c.make === 'Lamborghini') || CARS_DATA[2];
  const armoredCar = CARS_DATA.find(c => c.bodyStyle === 'Armored') || CARS_DATA[CARS_DATA.length - 1];

  const handleMarqueClick = (brand: string) => {
    if (setSelectedMake) {
      setSelectedMake(brand);
    }
    setActiveView('inventory');
  };

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div style={{ background: '#ffffff', color: '#0a0a0a', overflowX: 'hidden' }}>

      {/* ═══════════ 1. HERO — Seamless Zero-Delay Cross-Fade Photography ═══════════ */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '660px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        background: '#0a0a0a'
      }}>
        {/* Instant Cross-Fade Image Stack (No mode="wait" to prevent blank gaps) */}
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].model}
              className="img-cover"
              style={{
                filter: 'brightness(1.02) contrast(1.04) saturate(1.06)',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimal Gradient Accent Behind Top & Bottom Controls Only (Center 80% Unblocked) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '220px',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* TOP FLOATING MINIMALIST HEADLINE */}
        <div className="hero-top-headline" style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '840px',
          padding: '110px 24px 0',
          width: '100%'
        }}>
          <motion.div
            key={`top-${currentSlide}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Top Location Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '5px 16px',
              marginBottom: '14px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#ffffff' }}>
                SHOWROOM TURNTABLE · {HERO_SLIDES[currentSlide].badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="display-xl" style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              lineHeight: 1.1,
              marginBottom: '8px',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              fontWeight: 500
            }}>
              {HERO_SLIDES[currentSlide].make} {HERO_SLIDES[currentSlide].model}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '0.88rem',
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: '0.08em',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              fontWeight: 500
            }}>
              {HERO_SLIDES[currentSlide].specs}
            </p>
          </motion.div>
        </div>

        {/* LEFT & RIGHT SLIDE ARROWS */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          style={{
            position: 'absolute',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          className="hidden-mobile"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          style={{
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          className="hidden-mobile"
        >
          <ChevronRight size={20} />
        </button>

        {/* BOTTOM FLOATING ACTION BUTTONS & SLIDE INDICATOR */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          paddingBottom: '36px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Action Buttons */}
          <div className="hero-action-buttons" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveView('inventory')}
              className="btn-primary-light"
              style={{
                padding: '14px 32px',
                fontSize: '0.72rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                background: '#ffffff',
                color: '#0a0a0a'
              }}
            >
              Explore Collection ({CARS_DATA.length}) <ArrowRight size={14} />
            </button>

            <button
              onClick={() => onOpenBookingModal()}
              style={{
                padding: '14px 32px',
                fontSize: '0.72rem',
                background: 'rgba(0, 0, 0, 0.55)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
            >
              Schedule VIP Inspection
            </button>
          </div>

          {/* Slide Indicator Bar Dots */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: idx === currentSlide ? '28px' : '8px',
                  height: '6px',
                  borderRadius: '3px',
                  background: idx === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: idx === currentSlide ? '0 0 10px rgba(255,255,255,0.8)' : 'none'
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════ 2. AUTO SCROLLING REAL LOGOS CAROUSEL ═══════════ */}
      <section style={{
        padding: '24px 16px',
        borderBottom: '1px solid var(--mist)',
        background: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div className="overline" style={{ fontSize: '0.62rem', color: 'var(--slate)', letterSpacing: '0.22em' }}>
            OFFICIAL MARQUES REPRESENTED IN SHOWROOM
          </div>

          <BrandLogoCarousel onSelectBrand={handleMarqueClick} />
        </div>
      </section>


      {/* ═══════════ 3. DEDICATED SHOWROOM PERFORMANCE METRICS BANNER ═══════════ */}
      <section style={{
        background: '#f9f8f6',
        padding: '56px 24px',
        borderBottom: '1px solid var(--mist)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '36px',
          textAlign: 'center'
        }}>
          {[
            { num: 65, suffix: '+', label: 'SHOWROOM VEHICLES' },
            { num: 100, suffix: '%', label: 'LAGOS CUSTOMS CLEARED' },
            { num: 15, suffix: '', label: 'EUROPEAN MARQUES' },
            { num: 500, suffix: '+', label: 'VIP CLIENTS DELIVERED' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="font-serif" style={{ fontSize: '2.4rem', color: '#0a0a0a', fontWeight: 500 }}>
                <AnimatedCounter value={stat.num} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--slate)', textTransform: 'uppercase', marginTop: '4px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ═══════════ 4. SPOTLIGHT 1 — Rolls-Royce Spectre ═══════════ */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="split-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '440px',
          border: '1px solid var(--mist)'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ overflow: 'hidden', minHeight: '340px' }}
          >
            <img
              src={rollsRoyce.image}
              alt={`${rollsRoyce.year} ${rollsRoyce.make} ${rollsRoyce.model}`}
              className="img-cover"
              style={{ minHeight: '340px' }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '44px 32px',
              background: '#f9f8f6'
            }}
          >
            <div className="overline" style={{ color: 'var(--slate)', marginBottom: '12px' }}>
              {rollsRoyce.year} · {rollsRoyce.make} FLAGSHIP
            </div>

            <h2 className="display-lg" style={{ color: '#0a0a0a', marginBottom: '16px' }}>
              {rollsRoyce.model}
            </h2>

            <div className="divider" style={{ background: '#0a0a0a' }} />

            <p className="body-lg" style={{ color: 'var(--slate)', marginBottom: '32px', maxWidth: '420px' }}>
              {rollsRoyce.overview.slice(0, 160)}...
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => onSelectCar(rollsRoyce)} className="btn-primary">
                Inspect Vehicle <ArrowRight size={14} />
              </button>
              <button onClick={() => onPlaySound(rollsRoyce)} className="btn-outline">
                <Volume2 size={14} /> Soundscape
              </button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════ 5. SPOTLIGHT 2 — Ferrari SF90 Stradale ═══════════ */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="split-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          minHeight: '440px',
          border: '1px solid var(--mist)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '44px 32px',
              background: '#f9f8f6',
              order: 1
            }}
          >
            <div className="overline" style={{ color: 'var(--slate)', marginBottom: '12px' }}>
              {ferrari.year} · {ferrari.make} HYPERCAR
            </div>

            <h2 className="display-lg" style={{ color: '#0a0a0a', marginBottom: '16px' }}>
              {ferrari.model}
            </h2>

            <div className="divider" style={{ background: '#0a0a0a' }} />

            <p className="body-lg" style={{ color: 'var(--slate)', marginBottom: '32px', maxWidth: '420px' }}>
              986 HP Twin-Turbo V8 hybrid powertrain delivering 0-60 mph in 2.5 seconds. Fully cleared and in stock at Lekki showroom.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => onSelectCar(ferrari)} className="btn-primary">
                Inspect Vehicle <ArrowRight size={14} />
              </button>
              <button onClick={() => onPlaySound(ferrari)} className="btn-outline">
                <Volume2 size={14} /> Soundscape
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ overflow: 'hidden', minHeight: '340px', order: 2 }}
          >
            <img
              src={ferrari.image}
              alt={`${ferrari.year} ${ferrari.make} ${ferrari.model}`}
              className="img-cover"
              style={{ minHeight: '340px' }}
            />
          </motion.div>
        </div>
      </section>


      {/* ═══════════ 6. EXHAUST SOUNDBOARD PROMO ═══════════ */}
      <section style={{
        background: '#f9f8f6',
        padding: 'var(--section-pad) 0',
        borderTop: '1px solid var(--mist)',
        borderBottom: '1px solid var(--mist)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            <div className="overline" style={{ color: 'var(--slate)', marginBottom: '16px' }}>
              EXHAUST SOUNDSCAPE SYNTHESIZER
            </div>
            <h2 className="display-lg" style={{ color: '#0a0a0a', marginBottom: '16px' }}>
              Experience The Sound
            </h2>
            <div className="divider" style={{ background: '#0a0a0a', margin: '16px auto' }} />
            <p className="body-lg" style={{ color: 'var(--slate)', marginBottom: '36px' }}>
              Listen to authentic Naturally Aspirated V12, Twin-Turbo V8, and W16 Quad-Turbo engine rev soundscapes with our digital tachometer gauge.
            </p>
            <button
              onClick={() => onPlaySound(soundCarSample)}
              className="btn-primary"
            >
              <Volume2 size={15} /> Launch Exhaust Soundboard
            </button>
          </motion.div>
        </div>
      </section>


      {/* ═══════════ 7. ARMORED EXECUTIVE DIVISION ═══════════ */}
      <section style={{ background: '#ffffff', padding: 'var(--section-pad) 0' }}>
        <div className="split-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          gap: '32px',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ padding: '8px' }}
          >
            <div className="overline" style={{ color: 'var(--slate)', marginBottom: '16px' }}>
              EXECUTIVE PROTECTION DIVISION
            </div>
            <h2 className="display-lg" style={{ color: '#0a0a0a', marginBottom: '16px' }}>
              CEN B6/B7 Ballistic Security
            </h2>
            <div className="divider" style={{ background: '#0a0a0a' }} />
            <p className="body-lg" style={{ color: 'var(--slate)', marginBottom: '32px', maxWidth: '440px' }}>
              CEN B6 & B7 certified armored vehicles engineered for executive protection across Nigeria. Fully retrofitted, heavy-duty suspension, run-flat tires, and customs cleared.
            </p>
            <button onClick={() => onSelectCar(armoredCar)} className="btn-outline">
              Inspect Armored Specs <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ height: '340px', overflow: 'hidden', border: '1px solid var(--mist)' }}
          >
            <img
              src={armoredCar.image}
              alt="Armored Vehicle"
              className="img-cover"
            />
          </motion.div>
        </div>
      </section>


      {/* ═══════════ 8. PRIVATE SHOWROOM BOOKING CTA ═══════════ */}
      <section className="section" style={{ background: '#f9f8f6', borderTop: '1px solid var(--mist)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '0 20px'
          }}
        >
          <div className="overline" style={{ color: 'var(--slate)', marginBottom: '20px' }}>
            LEKKI PHASE 1, LAGOS
          </div>
          <h2 className="display-lg" style={{ color: '#0a0a0a', marginBottom: '16px' }}>
            Schedule a Private Viewing
          </h2>
          <div className="divider" style={{ background: '#0a0a0a', margin: '16px auto' }} />
          <p className="body-lg" style={{ color: 'var(--slate)', marginBottom: '36px' }}>
            Experience our curated collection in person. Private showroom access,
            dedicated executive concierge, and confidential test drives by appointment.
          </p>
          <button onClick={() => onOpenBookingModal()} className="btn-primary">
            Book VIP Appointment <ArrowRight size={14} />
          </button>
        </motion.div>
      </section>

    </div>
  );
};
