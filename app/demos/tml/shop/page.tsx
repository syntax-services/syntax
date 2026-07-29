import '../tml-globals.css';
'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { Search, ShoppingBag, SlidersHorizontal, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catalogTopRef = useRef(null);
  const initialCat = searchParams?.get('cat') || 'all';

  const { addToCart } = useCart();
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [search, setSearch] = useState('');
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 30;

  useEffect(() => {
    const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random());
    setShuffledProducts(shuffled);
  }, []);

  useEffect(() => {
    const cat = searchParams?.get('cat');
    if (cat) {
      setSelectedCat(cat);
    }
  }, [searchParams]);

  // Reset pagination to page 1 whenever search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCat]);

  const categoriesList = [
    { key: 'all', label: 'All Items' },
    { key: 'gold', label: 'Gold Replicas' },
    { key: 'silver', label: 'Sterling Silver' },
    { key: 'necklaces', label: 'Necklaces & Pendants' },
    { key: 'rings', label: 'Knuckle & Ring Stacks' },
    { key: 'bracelets', label: 'Bracelets & Bangles' },
    { key: 'earrings', label: 'Earrings & Huggies' },
    { key: 'sets', label: 'Multi-Piece Jewelry Sets' },
  ].filter(cat => {
    if (cat.key === 'all') return true;
    return PRODUCTS.some(p => p.category === cat.key || p.type === cat.key);
  });

  const getCategoryCount = (catKey) => {
    if (catKey === 'all') return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === catKey || p.type === catKey).length;
  };

  const filtered = shuffledProducts.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat || p.type === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate pagination boundaries
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filtered.length);
  const paginatedProducts = filtered.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (catalogTopRef.current) {
        catalogTopRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div ref={catalogTopRef} style={{ maxWidth: '1000px', margin: '0 auto', padding: '30px 20px 70px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>TML STOREFRONT</span>
        <h1 className="font-serif" style={{ fontSize: '2.4rem', marginTop: '4px' }}>Shop Jewelry Catalog</h1>
      </div>

      {/* Filter Icon & Search Bar Row */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
          <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search jewelry catalog..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 14px 10px 38px', 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-silver)', 
              borderRadius: 'var(--radius-pill)', 
              color: 'var(--text-primary)', 
              outline: 'none', 
              fontSize: '0.85rem' 
            }}
          />
        </div>

        {/* Filter Pop-up Icon Button */}
        <button 
          className="icon-btn"
          onClick={() => setIsFilterOpen(true)}
          style={{ width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0 }}
          title="Filter Categories"
        >
          <SlidersHorizontal size={18} />
          {selectedCat !== 'all' && (
            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', background: 'var(--gold-accent)', borderRadius: '50%' }} />
          )}
        </button>
      </div>

      {/* Pop-Up Category Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="category-modal-overlay"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="category-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 className="font-serif" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                  <SlidersHorizontal size={16} /> Select Category
                </h3>
                <button className="icon-btn" onClick={() => setIsFilterOpen(false)}><X size={15} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {categoriesList.map(cat => {
                  const count = getCategoryCount(cat.key);
                  const isSelected = selectedCat === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setSelectedCat(cat.key);
                        setIsFilterOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: isSelected ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                        border: isSelected ? '1px solid var(--border-silver)' : '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: isSelected ? 700 : 500,
                        transition: 'var(--transition)'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isSelected && <Check size={15} style={{ color: 'var(--gold-accent)' }} />}
                        {cat.label}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'var(--border-subtle)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                        {count} items
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <p>No jewelry found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="product-grid-responsive">
            {paginatedProducts.map(product => (
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

          {/* Mobile-First Pagination Bar (30 items per page) */}
          {totalPages > 1 && (
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Showing {startIndex + 1}–{endIndex} of {filtered.length} items (Page {currentPage} of {totalPages})
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  className="icon-btn" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: currentPage === page ? 'var(--text-primary)' : 'var(--bg-secondary)',
                      color: currentPage === page ? 'var(--bg-primary)' : 'var(--text-primary)',
                      border: '1px solid var(--border-silver)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button 
                  className="icon-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '60px' }}>Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
