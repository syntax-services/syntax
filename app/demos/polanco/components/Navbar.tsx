'use client';
import React, { useState, useEffect } from 'react';
import { PageView } from '../types/car';
import { Menu, X, Layers, PhoneCall, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  comparedCount?: number;
  onOpenComparator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  comparedCount = 0,
  onOpenComparator
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems: { view: PageView; label: string }[] = [
    { view: 'inventory', label: 'Collection' },
    { view: 'about', label: 'About' },
    { view: 'contact', label: 'Concierge' },
  ];

  const isHeroPage = activeView === 'home';
  const isTransparent = !scrolled && isHeroPage;

  const navBg = isTransparent ? 'transparent' : 'rgba(255, 255, 255, 0.96)';
  const navBorder = isTransparent ? 'none' : '1px solid rgba(0,0,0,0.08)';
  const navShadow = isTransparent ? 'none' : '0 4px 20px rgba(0,0,0,0.04)';
  const textColor = isTransparent ? '#ffffff' : '#0a0a0a';
  const logoFilter = isTransparent ? 'brightness(10) drop-shadow(0 2px 8px rgba(0,0,0,0.5))' : 'none';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: navBg,
      backdropFilter: isTransparent ? 'none' : 'blur(20px)',
      WebkitBackdropFilter: isTransparent ? 'none' : 'blur(20px)',
      borderBottom: navBorder,
      boxShadow: navShadow,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo — @POLANCO emblem + EXOTIC CARS typography */}
        <div
          onClick={() => {
            setActiveView('home');
            setMobileMenuOpen(false);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <img
            src="/polanco_assets/polanco_logo.png"
            alt="Polanco Exotic Cars"
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              filter: logoFilter,
              transition: 'filter 0.4s ease'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/polanco_logo.png';
            }}
          />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: textColor,
            textShadow: isTransparent ? '0 2px 10px rgba(0,0,0,0.7)' : 'none',
            transition: 'all 0.4s ease'
          }}>
            EXOTIC CARS
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="hidden-mobile">
          {navItems.map(item => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: textColor,
                textShadow: isTransparent ? '0 2px 10px rgba(0,0,0,0.7)' : 'none',
                cursor: 'pointer',
                padding: '4px 0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: activeView === item.view ? 1 : 0.85,
                transition: 'all 0.3s ease'
              }}
            >
              {item.label}
              {activeView === item.view && (
                <motion.div
                  layoutId="activeNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: textColor,
                    boxShadow: isTransparent ? '0 0 8px rgba(255,255,255,0.8)' : 'none'
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Persistent Compare Trigger Button */}
          {comparedCount > 0 && onOpenComparator && (
            <button
              onClick={onOpenComparator}
              style={{
                background: isTransparent ? '#ffffff' : '#0a0a0a',
                color: isTransparent ? '#0a0a0a' : '#ffffff',
                border: 'none',
                padding: '6px 14px',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                boxShadow: isTransparent ? '0 4px 14px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              <Layers size={13} /> Compare ({comparedCount})
            </button>
          )}
        </nav>

        {/* Mobile Hamburger & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="show-mobile">
          {comparedCount > 0 && onOpenComparator && (
            <button
              onClick={onOpenComparator}
              style={{
                background: isTransparent ? '#ffffff' : '#0a0a0a',
                color: isTransparent ? '#0a0a0a' : '#ffffff',
                border: 'none',
                padding: '5px 10px',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)'
              }}
            >
              Compare ({comparedCount})
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* High-End Mobile Full-Screen Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              height: 'calc(100vh - 64px)',
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              color: '#ffffff',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px 24px 40px',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                NAVIGATION MENU
              </div>

              {navItems.map((item, idx) => (
                <motion.button
                  key={item.view}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => {
                    setActiveView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    color: activeView === item.view ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '10px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={18} color="rgba(255,255,255,0.4)" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Footer Card inside Drawer */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '20px',
              marginTop: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={14} color="#ffffff" />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: '#ffffff', textTransform: 'uppercase' }}>
                  LEKKI SHOWROOM · LAGOS
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '14px' }}>
                Admiralty Way / Lekki-Epe Expressway, Lekki Phase 1, Lagos, Nigeria
              </p>
              <button
                onClick={() => {
                  setActiveView('contact');
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#0a0a0a',
                  border: 'none',
                  padding: '12px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <PhoneCall size={14} /> Schedule VIP Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
