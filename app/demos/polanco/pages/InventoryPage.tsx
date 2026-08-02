'use client';
import React, { useState } from 'react';
import { Car, Currency } from '../types/car';
import { CARS_DATA } from '../data/cars';
import { VehicleCard } from '../components/VehicleCard';
import { BrandLogoCarousel } from '../components/BrandLogoCarousel';
import { Search, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InventoryPageProps {
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  onSelectCar: (car: Car) => void;
  onPlaySound: (car: Car) => void;
  onOpenBuildSheetModal: (car: Car) => void;
  comparedCars?: Car[];
  onToggleCompare?: (car: Car) => void;
  onOpenComparator?: () => void;
  selectedMake?: string;
  setSelectedMake?: (make: string) => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({
  currency,
  setCurrency,
  onSelectCar,
  onPlaySound,
  comparedCars = [],
  onToggleCompare,
  onOpenComparator,
  selectedMake: externalSelectedMake,
  setSelectedMake: externalSetSelectedMake
}) => {
  const [internalSelectedMake, setInternalSelectedMake] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBodyStyle, setSelectedBodyStyle] = useState<string>('All');

  const selectedMake = externalSelectedMake !== undefined ? externalSelectedMake : internalSelectedMake;
  const handleMakeChange = (make: string) => {
    if (externalSetSelectedMake) {
      externalSetSelectedMake(make);
    } else {
      setInternalSelectedMake(make);
    }
  };

  const makes = ['All', 'Ferrari', 'Rolls-Royce', 'Lamborghini', 'Mercedes-AMG', 'Range Rover', 'Porsche', 'Cadillac', 'Bentley', 'McLaren', 'Aston Martin', 'Mercedes-Maybach', 'BMW M', 'Audi RS', 'Bugatti', 'Koenigsegg'];
  const bodyStyles = ['All', 'Coupe', 'SUV', 'Sedan', 'Convertible', 'Armored'];

  const filteredCars = CARS_DATA.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          car.specs.engine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMake = selectedMake === 'All' || car.make === selectedMake;
    const matchesBody = selectedBodyStyle === 'All' || car.bodyStyle === selectedBodyStyle;
    return matchesSearch && matchesMake && matchesBody;
  });

  const resetFilters = () => {
    setSearchQuery('');
    handleMakeChange('All');
    setSelectedBodyStyle('All');
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--mist)',
    background: '#fff',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--black)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: 0
  };

  return (
    <div style={{ paddingTop: '100px', position: 'relative' }}>

      {/* Page Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px 28px',
        textAlign: 'center'
      }}>
        <div className="overline" style={{ marginBottom: '12px' }}>
          {CARS_DATA.length} SHOWROOM VEHICLES
        </div>
        <h1 className="display-lg">
          The Collection
        </h1>
        <p className="body-lg" style={{ maxWidth: '520px', margin: '12px auto 0' }}>
          Every vehicle is brand-new, fully customs cleared, and available for private inspection at our Lekki showroom.
        </p>
      </div>

      {/* Minimalist Brand Logo Carousel Bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 24px',
        padding: '0 16px'
      }}>
        <BrandLogoCarousel
          onSelectBrand={handleMakeChange}
          selectedBrand={selectedMake}
        />
      </div>

      {/* Filter Control Bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px 32px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '12px',
          padding: '20px',
          background: '#fff',
          border: '1px solid var(--mist)'
        }}>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--slate)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by model, make, engine V12, V8..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...selectStyle,
                paddingLeft: '42px'
              }}
            />
          </div>

          {/* Filter Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '12px'
          }}>
            <select value={selectedMake} onChange={(e) => handleMakeChange(e.target.value)} style={selectStyle}>
              <option value="All">All Marques ({makes.length - 1})</option>
              {makes.filter(m => m !== 'All').map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select value={selectedBodyStyle} onChange={(e) => setSelectedBodyStyle(e.target.value)} style={selectStyle}>
              <option value="All">All Body Styles</option>
              {bodyStyles.filter(b => b !== 'All').map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Currency Toggle */}
            <div style={{
              display: 'flex',
              gap: '0',
              border: '1px solid var(--mist)'
            }}>
              {(['USD', 'NGN'] as Currency[]).map(cur => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  style={{
                    flex: 1,
                    background: currency === cur ? 'var(--black)' : '#fff',
                    color: currency === cur ? '#fff' : 'var(--black)',
                    border: 'none',
                    padding: '12px 16px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cur === 'NGN' ? '₦ NGN' : '$ USD'}
                </button>
              ))}
            </div>
          </div>

          {/* Reset & Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--slate)' }}>
              Showing {filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--slate)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              <RefreshCw size={13} /> Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px 120px'
      }}>
        {filteredCars.length > 0 ? (
          <div className="grid-container">
            {filteredCars.map(car => (
              <VehicleCard
                key={car.id}
                car={car}
                currency={currency}
                onSelectCar={onSelectCar}
                onPlaySound={onPlaySound}
                onToggleCompare={onToggleCompare}
                isCompared={comparedCars.some(c => c.id === car.id)}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '64px 20px',
            background: '#fff',
            border: '1px solid var(--mist)'
          }}>
            <h3 className="display-md" style={{ marginBottom: '12px' }}>
              No Vehicles Match Filter Criteria
            </h3>
            <p className="body-lg" style={{ marginBottom: '24px' }}>
              Try resetting your marque or body style filter to view all 65 vehicles.
            </p>
            <button onClick={resetFilters} className="btn-primary">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Comparator Trigger Bar */}
      <AnimatePresence>
        {comparedCars.length > 0 && onOpenComparator && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: '#0a0a0a',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              maxWidth: '90%',
              width: 'max-content'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Layers size={18} color="#ffffff" />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {comparedCars.length} Vehicle{comparedCars.length > 1 ? 's' : ''} Selected for Comparison
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>
                  {comparedCars.map(c => c.model).join(' · ')}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenComparator}
              className="btn-primary-light"
              style={{ padding: '10px 20px', fontSize: '0.68rem', flexShrink: 0 }}
            >
              Compare Specs Side-by-Side <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
