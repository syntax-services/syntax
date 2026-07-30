'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { PRODUCTS } from '../../data/products';
import { ShieldCheck, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('7');
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImg(product.image);
    }
  }, [product]);

  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const openWhatsAppDirect = () => {
    const msg = `👑 *PRODUCT INQUIRY* - TML Jewelry\n\nHi TML Jewelry! I am interested in ordering the *${product.name}* (₦${product.priceNGN.toLocaleString()}).\n\nIs this item available for delivery?`;
    window.open(`https://wa.me/2348162255533?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!product) return null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 24px 80px' }}>
      <Link href="/demos/tml/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '28px' }}>
        <ArrowLeft size={16} /> Back to Shop Catalog
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'flex-start', marginBottom: '80px' }}>
        {/* Left Column: Image Gallery */}
        <div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-silver)', background: '#000', marginBottom: '16px', position: 'relative' }}>
            <div className="watermark-overlay" style={{ opacity: 0.12 }}>
              <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
            </div>
            <img src={activeImg || product.image} alt={product.name} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 2 }} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {product.gallery.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="Thumbnail" 
                loading="lazy"
                onClick={() => setActiveImg(img)}
                style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', border: activeImg === img ? '2px solid var(--silver-primary)' : '1px solid var(--border-subtle)', cursor: 'pointer' }} 
              />
            ))}
          </div>
        </div>

        {/* Right Column: Details & Specs */}
        <div>
          <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>{product.category}</span>
          <h1 className="font-serif" style={{ fontSize: '2.4rem', margin: '8px 0 12px' }}>{product.name}</h1>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
            ₦{product.priceNGN.toLocaleString()}
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Size Selector for Rings */}
          {product.category === 'rings' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Select Ring Size:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['6', '7', '8'].map(sz => (
                  <button 
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`btn-action-morph ${selectedSize === sz ? 'active' : ''}`}
                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                  >
                    Size {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Box */}
          <div style={{ background: 'var(--bg-secondary)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-silver)', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--silver-primary)' }} /> Non-Tarnish Quality Guarantee
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {product.specs}
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn-action-morph" style={{ flex: 1, justifyContent: 'center' }} onClick={handleAddToCart}>
              <ShoppingBag size={18} /> <span>{addedNotice ? 'Added to Cart!' : 'Add to Cart'}</span>
            </button>
            <button className="btn-whatsapp-action" style={{ flex: 1, justifyContent: 'center' }} onClick={openWhatsAppDirect}>
              <MessageCircle size={18} /> Instant Order via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '24px' }}>You May Also Like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {related.map(rel => (
              <div 
                key={rel.id} 
                className="product-card-silver"
                onClick={() => router.push(`/product/${rel.id}`)}
              >
                <div className="product-img-wrap">
                  <div className="watermark-overlay">
                    <img src="/logo/logo.png" alt="TML Watermark" loading="lazy" />
                  </div>
                  <img src={rel.image} alt={rel.name} className="main-product-img" loading="lazy" />
                  <span className="card-badge">{rel.badge}</span>

                  <button 
                    className="card-quick-cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(rel);
                    }}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={15} />
                  </button>
                </div>
                <div className="card-details">
                  <span className="card-category">{rel.category}</span>
                  <h3 className="card-title">{rel.name}</h3>
                  <div className="card-price">₦{rel.priceNGN.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
