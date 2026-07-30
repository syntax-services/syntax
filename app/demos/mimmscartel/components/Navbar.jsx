'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Sun, Moon, Home, LayoutGrid, Info, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [theme, setTheme] = useState('dark');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('tml_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 30) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY + 8) {
        // Scrolling down -> Auto-hide brand logo & title
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY - 8) {
        // Scrolling up -> Reappear
        setIsHeaderVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('tml_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <>
      {/* Top Header: Standalone Brand Title on Left & Glassmorphic Pill on Right */}
      <div className="top-header-wrapper">
        {/* Top Left Auto-Hiding Standalone Brand Title & Logo */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isHeaderVisible ? 1 : 0, 
            y: isHeaderVisible ? 0 : -20,
            scale: isHeaderVisible ? 1 : 0.95
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          style={{ pointerEvents: isHeaderVisible ? 'auto' : 'none' }}
        >
          <Link href="/demos/mimmscartel" className="top-brand-standalone">
            <img src="/logo/logo.png" alt="TML Logo" className="brand-logo-img" />
            <span className="brand-title">
              TML <span className="font-serif brand-subtitle">Jewelries</span>
            </span>
          </Link>
        </motion.div>

        {/* Top Right Floating Glassmorphic Pill */}
        <div className="top-actions-pill-fixed">
          {/* Desktop Nav Links */}
          <ul className="nav-links-pill desktop-nav-links">
            <li>
              <Link href="/demos/mimmscartel" className={pathname === '/' ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link href="/demos/mimmscartel/shop" className={pathname === '/shop' ? 'active' : ''}>Shop</Link>
            </li>
            <li>
              <Link href="/demos/mimmscartel/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
            </li>
            <li>
              <Link href="/demos/mimmscartel/contact" className={pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </li>
          </ul>

          {/* Theme Toggle Button */}
          <button 
            className="icon-btn-compact" 
            onClick={toggleTheme} 
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Cart Trigger Button */}
          <button className="icon-btn-compact" onClick={() => setIsCartOpen(true)} title="Shopping Cart">
            <ShoppingBag size={14} />
            {totalCartCount > 0 && <span className="cart-badge-count-compact">{totalCartCount}</span>}
          </button>
        </div>
      </div>

      {/* Ultra-Micro Mobile Bottom Dock (< 640px) */}
      <div className="mobile-bottom-nav-dock-micro">
        <Link href="/demos/mimmscartel" className={`bottom-dock-micro-item ${pathname === '/' ? 'active' : ''}`}>
          <Home size={14} />
          <span>Home</span>
        </Link>
        <Link href="/demos/mimmscartel/shop" className={`bottom-dock-micro-item ${pathname === '/shop' ? 'active' : ''}`}>
          <LayoutGrid size={14} />
          <span>Shop</span>
        </Link>
        <Link href="/demos/mimmscartel/about" className={`bottom-dock-micro-item ${pathname === '/about' ? 'active' : ''}`}>
          <Info size={14} />
          <span>About</span>
        </Link>
        <Link href="/demos/mimmscartel/contact" className={`bottom-dock-micro-item ${pathname === '/contact' ? 'active' : ''}`}>
          <MessageCircle size={14} />
          <span>Contact</span>
        </Link>
      </div>
    </>
  );
}
