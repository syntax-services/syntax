import '../../tml-globals.css';
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Droplet, Award, ArrowRight, Volume2, VolumeX, MapPin, Store, Watch, Gem, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [isMuted, setIsMuted] = useState(true);
  const [activeBranch, setActiveBranch] = useState('new');
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.70;
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px 80px', overflowX: 'hidden' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-accent)', fontWeight: 700 }}>OUR STORY & ESSENCE</span>
        <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginTop: '8px' }}>About TML Jewelry</h1>
        <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', lineHeight: 1.65 }}>
          The Market Line — Premier Wholesale & Retail destination for non-tarnish 18K gold replica, 925 sterling silver, luxury watches, and zirconia bridal sets.
        </p>
      </div>

      {/* 100% Centered Trunk Tree with Left (UP) & Right (DOWN) Compact Branches */}
      <section style={{ marginBottom: '80px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="font-serif" style={{ fontSize: '2rem' }}>Store Evolution</h2>
        </div>

        {/* Tree Trunk Container */}
        <div className="tree-trunk-container">
          
          {/* Long Central Vertical Trunk Line */}
          <div className="tree-trunk-line" />

          {/* Staggered Vertical Branch Wrapper */}
          <div className="tree-branch-wrapper">
            
            {/* 1. LEFT BRANCH (HIGHER UP): Former Market Origin */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setActiveBranch('former')}
              className="tree-branch-left"
              style={{
                padding: '16px 18px', 
                background: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', justifyContent: 'inherit' }}>
                <Store size={14} /> Former Location
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Ile Epo Market
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', lineHeight: 1.45 }}>
                Shop 7, Kabiyesi Oba Olawale Cole Block, Ile Epo Market, Abule Egba, Lagos.
              </p>
            </motion.div>

            {/* 2. RIGHT BRANCH (LOWER DOWN STAGGERED): Current Location */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onHoverStart={() => setActiveBranch('new')}
              className="tree-branch-right"
              style={{ 
                padding: '16px 18px', 
                background: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--gold-accent)',
                boxShadow: '0 8px 25px rgba(226, 183, 85, 0.12)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-accent)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                <MapPin size={14} /> Current Location
              </div>
              <h3 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                Baruwa Bus Stop, Ipaja
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.45 }}>
                Baruwa Bus Stop, Fatade Road, Ipaja, Lagos, Nigeria.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Video Reel Player Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '70px' }}>
        <div>
          <span style={{ fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>INSTAGRAM REEL SHOWCASE</span>
          <h2 className="font-serif" style={{ fontSize: '1.9rem', margin: '8px 0 14px' }}>Wholesale & Retail Collections</h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '20px' }}>
            From non-tarnish daily wear to bridal set collections, TML Jewelry provides high-grade anti-oxidation pieces engineered for long-lasting luster.
          </p>

          {/* Instagram Offerings List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <Watch size={15} style={{ color: 'var(--text-muted)' }} />
              <span>Male & Female Luxury Watches</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <Gem size={15} style={{ color: 'var(--text-muted)' }} />
              <span>Engagement & Wedding Rings</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <ShoppingBag size={15} style={{ color: 'var(--text-muted)' }} />
              <span>Zirconia Jewelries & Multi-Piece Sets</span>
            </div>
          </div>

          <Link href="/demos/mimmscartel/shop" className="btn-action-morph">
            <span>Explore Collection</span> <ArrowRight size={15} />
          </Link>
        </div>

        {/* Video Reel Player */}
        <div>
          <div 
            onClick={toggleSound}
            style={{ 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              border: '1px solid var(--border-silver)', 
              background: '#000', 
              position: 'relative', 
              cursor: 'pointer'
            }}
          >
            <video 
              ref={videoRef}
              src="/assets/about_store_primary.mp4" 
              autoPlay 
              loop 
              muted={isMuted} 
              playsInline 
              style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
            />

            {/* Mute/Unmute Overlay */}
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSound(); }}
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-silver)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 16px',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              {isMuted ? (
                <>
                  <VolumeX size={15} />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} />
                  <span>Sound Active</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div style={{ background: 'var(--bg-secondary)', padding: '40px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-silver)', textAlign: 'center' }}>
        <h3 className="font-serif" style={{ fontSize: '1.6rem', marginBottom: '28px' }}>Why Choose TML Jewelry</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div>
            <ShieldCheck size={24} style={{ color: 'var(--text-primary)', margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Anti-Tarnish Coating</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Advanced anti-oxidation layer</p>
          </div>

          <div>
            <Droplet size={24} style={{ color: 'var(--text-primary)', margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Water Resistant</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Engineered for daily wear</p>
          </div>

          <div>
            <Award size={24} style={{ color: 'var(--text-primary)', margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '0.95rem', marginBottom: '4px' }}>Hypoallergenic Core</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nickel-free & skin safe</p>
          </div>
        </div>
      </div>
    </div>
  );
}
