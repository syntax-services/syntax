import '../tml-globals.css';
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, ShieldCheck, Droplet, ShoppingBag, MessageCircle } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [bestSellers, setBestSellers] = useState([]);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const collectionsScrollRef = useRef(null);

  // Storefront photos array for smooth crossfade carousel
  const showroomImages = [
    '/assets/tml_product_5.jpg',
    '/assets/tml_product_10.jpg',
    '/assets/tml_product_15.jpg',
    '/assets/tml_product_20.jpg'
  ];

  useEffect(() => {
    // Shuffler: Randomize the products on mount/reload so it's always fresh!
    const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random());
    setBestSellers(shuffled.slice(0, 4));

    // Smooth random crossfade slideshow every 6 seconds
    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % showroomImages.length);
    }, 6000);

    // Mobile Collections Carousel Auto-Scroll (Advances gently, pauses on touch/drag)
    const container = collectionsScrollRef.current;
    let autoScrollInterval;

    if (container) {
      autoScrollInterval = setInterval(() => {
        if (window.innerWidth <= 640 && container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScroll - 15) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 236, behavior: 'smooth' });
          }
        }
      }, 3400);
    }

    return () => {
      clearInterval(slideTimer);
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    };
  }, []);

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '70px 20px 40px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold-accent)', fontWeight: 700, display: 'block', marginBottom: '14px' }}>
            TML JEWELRY
          </span>
          
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', fontWeight: 600, lineHeight: 1.1, marginBottom: '18px' }}>
            Non-Tarnish Gold & <br />
            <span style={{ color: 'var(--silver-primary)' }}>Signature Silver</span>
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 30px', lineHeight: 1.6 }}>
            Discover TML’s premium non-tarnish 18K gold replica jewelry, waterproof chains, stackable knuckle rings, and multi-piece sets engineered for daily brilliance.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/demos/tml/shop" 
              className="btn-action-morph"
              onMouseEnter={() => setHoveredBtn('heroShop')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <span>{hoveredBtn === 'heroShop' ? 'Explore Catalog' : 'Shop Non-Tarnish Gold'}</span>
              <ArrowRight size={16} />
            </Link>

            <a 
              href="https://wa.me/2348162255533" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-action"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* Sleek Minimalist Showcase Slideshow (Clean Border, No Heavy Shadow, No Text Overlay) */}
      <section style={{ maxWidth: '900px', margin: '0 auto 50px', padding: '0 20px' }}>
        <div 
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            height: '240px',
            border: '1px solid var(--border-silver)',
            background: 'var(--bg-secondary)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img 
              key={activeSlide}
              src={showroomImages[activeSlide]} 
              alt="TML Jewelry Showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </AnimatePresence>
        </div>
      </section>

      {/* Category Grid / Mobile Interactive Swipeable Carousel Section */}
      <section style={{ background: 'var(--bg-secondary)', padding: '60px 20px', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>COLLECTIONS</span>
            <h2 className="font-serif" style={{ fontSize: '2.1rem', marginTop: '4px' }}>Browse Collections</h2>
          </div>

          <div className="collections-marquee-wrapper" ref={collectionsScrollRef}>
            <div className="collections-marquee-track">
              {/* Collection Card 1 */}
              <Link href="/shop?cat=gold" className="collection-card-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-card-silver" style={{ textAlign: 'center', padding: '20px' }}>
                  <div className="product-img-wrap" style={{ borderRadius: '8px', marginBottom: '14px' }}>
                    <div className="watermark-overlay">
                      <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
                    </div>
                    <img src="/assets/tml_product_1.png" alt="Non-Tarnish Gold" className="main-product-img" loading="lazy" />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Non-Tarnish Gold</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* Collection Card 2 */}
              <Link href="/shop?cat=silver" className="collection-card-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-card-silver" style={{ textAlign: 'center', padding: '20px' }}>
                  <div className="product-img-wrap" style={{ borderRadius: '8px', marginBottom: '14px' }}>
                    <div className="watermark-overlay">
                      <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
                    </div>
                    <img src="/assets/tml_product_3.png" alt="Sterling Silver" className="main-product-img" loading="lazy" />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Sterling Silver</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* Collection Card 3 */}
              <Link href="/shop?cat=rings" className="collection-card-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-card-silver" style={{ textAlign: 'center', padding: '20px' }}>
                  <div className="product-img-wrap" style={{ borderRadius: '8px', marginBottom: '14px' }}>
                    <div className="watermark-overlay">
                      <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
                    </div>
                    <img src="/assets/tml_product_2.png" alt="Knuckle & Rings" className="main-product-img" loading="lazy" />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Knuckle & Rings</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* Collection Card 4 */}
              <Link href="/shop?cat=sets" className="collection-card-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-card-silver" style={{ textAlign: 'center', padding: '20px' }}>
                  <div className="product-img-wrap" style={{ borderRadius: '8px', marginBottom: '14px' }}>
                    <div className="watermark-overlay">
                      <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
                    </div>
                    <img src="/assets/tml_product_8.jpg" alt="Jewelry Sets" className="main-product-img" loading="lazy" />
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Jewelry Sets</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    Explore Collection <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>TML SELECTION</span>
            <h2 className="font-serif" style={{ fontSize: '2rem', marginTop: '4px' }}>Best Sellers</h2>
          </div>
          <Link href="/demos/tml/shop" className="btn-action-morph" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>
            <span>View Full Shop</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="product-grid-responsive">
          {bestSellers.map(product => (
            <div 
              key={product.id} 
              className="product-card-silver"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <div className="product-img-wrap">
                <div className="watermark-overlay">
                  <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
                </div>
                <img src={product.image} alt={product.name} className="main-product-img" loading="lazy" />
                <span className="card-badge">{product.badge}</span>
                
                <button 
                  className="card-quick-cart-btn"
                  onClick={(e) => handleQuickAdd(e, product)}
                  title="Add to Cart"
                >
                  <ShoppingBag size={15} />
                </button>
              </div>

              <div className="card-details">
                <span className="card-category">{product.category}</span>
                <h3 className="card-title">{product.name}</h3>
                <div className="card-price">₦{product.priceNGN.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>THE TML GUARANTEE</span>
            <h2 className="font-serif" style={{ fontSize: '2.1rem', margin: '8px 0 16px', lineHeight: 1.2 }}>
              Jewelry Engineered for <br /><span>Daily Longevity</span>
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '24px' }}>
              At The Market Line, we specialize in high-grade non-tarnish gold replica jewelry and 925 sterling silver engineered for daily wear without skin discoloration or tarnishing.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <ShieldCheck size={18} style={{ color: 'var(--silver-primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '2px' }}>18K Anti-Oxidation Finish</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Waterproof & sweatproof</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Droplet size={18} style={{ color: 'var(--silver-primary)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '2px' }}>Skin-Safe Guarantee</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% hypoallergenic</p>
                </div>
              </div>
            </div>
          </div>

          <div className="product-card-silver">
            <div className="product-img-wrap" style={{ height: '300px', paddingTop: 0 }}>
              <div className="watermark-overlay">
                <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
              </div>
              <img src="/assets/tml_product_5.jpg" alt="Craftsmanship" className="main-product-img" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
