'use client';
import React from 'react';
import { Car, Currency } from '../types/car';
import { X, Trash2, ArrowRight, Zap, Gauge, Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VehicleComparatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedCars: Car[];
  onRemoveCar: (carId: string) => void;
  onClearAll: () => void;
  currency: Currency;
  onSelectCar: (car: Car) => void;
  onOpenBookingModal: (car: Car) => void;
}

export const VehicleComparatorDrawer: React.FC<VehicleComparatorDrawerProps> = ({
  isOpen,
  onClose,
  comparedCars,
  onRemoveCar,
  onClearAll,
  currency,
  onSelectCar,
  onOpenBookingModal
}) => {
  if (!isOpen) return null;

  const currencySymbol = currency === 'NGN' ? '₦' : '$';

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          style={{
            width: '100%',
            maxWidth: '1000px',
            height: '100vh',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '24px 32px',
            borderBottom: '1px solid var(--mist)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#faf9f7',
            position: 'sticky',
            top: 0,
            zIndex: 20
          }}>
            <div>
              <div className="overline" style={{ color: 'var(--slate)', marginBottom: '4px' }}>
                SPECIFICATION COMPARATOR ({comparedCars.length}/3)
              </div>
              <h2 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--black)' }}>
                Vehicle Comparison Matrix
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {comparedCars.length > 0 && (
                <button
                  onClick={onClearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--slate)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Trash2 size={14} /> Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="btn-icon"
                aria-label="Close comparator"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '32px', flexGrow: 1 }}>
            {comparedCars.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gauge size={48} color="var(--slate)" style={{ marginBottom: '16px', opacity: 0.5 }} />
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--black)', marginBottom: '8px' }}>
                  No Vehicles Selected for Comparison
                </h3>
                <p className="body-lg" style={{ maxWidth: '440px', marginBottom: '24px' }}>
                  Click the <strong>+ Compare</strong> button on any vehicle card in the collection to view side-by-side performance specs.
                </p>
                <button onClick={onClose} className="btn-primary">
                  Browse Collection <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedCars.length}, 1fr)`,
                gap: '24px',
                minWidth: comparedCars.length > 1 ? '600px' : 'auto',
                overflowX: 'auto'
              }}>
                {comparedCars.map(car => {
                  const price = currency === 'NGN' ? car.priceNGN : car.priceUSD;
                  return (
                    <div
                      key={car.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--mist)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      {/* Car Card Header */}
                      <div>
                        <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#0a0a0a' }}>
                          <img
                            src={car.image}
                            alt={car.model}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <button
                            onClick={() => onRemoveCar(car.id)}
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              background: 'rgba(0, 0, 0, 0.75)',
                              border: 'none',
                              color: '#ffffff',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              zIndex: 10
                            }}
                            title="Remove from comparison"
                          >
                            <X size={16} />
                          </button>
                          <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '16px',
                            right: '16px',
                            color: '#ffffff'
                          }}>
                            <div className="overline" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem' }}>
                              {car.year} · {car.make}
                            </div>
                            <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 400 }}>
                              {car.model}
                            </h4>
                          </div>
                        </div>

                        {/* Specs Matrix List */}
                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {/* Price */}
                          <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--mist)' }}>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>PRICE</div>
                            <div className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--black)' }}>
                              {car.isPrivatePricing ? 'Price on Request' : `${currencySymbol}${price.toLocaleString()}`}
                            </div>
                          </div>

                          {/* Horsepower */}
                          <div>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>HORSEPOWER</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--black)' }}>
                              {car.specs.horsepower} HP
                            </div>
                          </div>

                          {/* Acceleration */}
                          <div>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>0-60 MPH</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--black)' }}>
                              {car.specs.acceleration}
                            </div>
                          </div>

                          {/* Top Speed */}
                          <div>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>TOP SPEED</div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--black)' }}>
                              {car.specs.topSpeed}
                            </div>
                          </div>

                          {/* Engine Type */}
                          <div>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>ENGINE ARCHITECTURE</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--black)' }}>
                              {car.specs.engine}
                            </div>
                          </div>

                          {/* Drivetrain */}
                          <div>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>DRIVETRAIN</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--black)' }}>
                              {car.specs.drivetrain}
                            </div>
                          </div>

                          {/* Customs Status */}
                          <div>
                            <div className="overline" style={{ fontSize: '0.6rem', marginBottom: '2px' }}>LAGOS CUSTOMS STATUS</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Shield size={14} color="var(--black)" /> {car.specs.customsStatus}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ padding: '20px', paddingTop: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCar(car);
                          }}
                          className="btn-black"
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.68rem', padding: '12px' }}
                        >
                          Inspect Vehicle <ChevronRight size={14} />
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenBookingModal(car);
                          }}
                          className="btn-outline-black"
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.68rem', padding: '12px' }}
                        >
                          Book Inspection
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
