'use client';
import React from 'react';
import { MarqueBadge } from './MarqueBadge';

interface BrandLogoCarouselProps {
  onSelectBrand: (brand: string) => void;
  selectedBrand?: string;
}

export const BrandLogoCarousel: React.FC<BrandLogoCarouselProps> = ({
  onSelectBrand,
  selectedBrand = 'All'
}) => {

  const marques = [
    { name: 'Ferrari' },
    { name: 'Rolls-Royce' },
    { name: 'Lamborghini' },
    { name: 'Porsche' },
    { name: 'McLaren' },
    { name: 'Bugatti' },
    { name: 'Koenigsegg' },
    { name: 'Bentley' },
    { name: 'Aston Martin' },
    { name: 'Mercedes-Maybach' },
    { name: 'Mercedes-AMG' },
    { name: 'Range Rover' },
    { name: 'BMW M' },
    { name: 'Audi RS' },
    { name: 'Cadillac' },
  ];

  // Triplicate marques array for seamless infinite auto-scroll loop
  const duplicatedMarques = [...marques, ...marques, ...marques];

  return (
    <div className="auto-scroll-container" style={{ padding: '16px 0', width: '100%' }}>
      <div className="auto-scroll-track" style={{ gap: '20px' }}>
        {duplicatedMarques.map((item, idx) => {
          const isSelected = selectedBrand === item.name;
          return (
            <button
              key={`${item.name}-${idx}`}
              onClick={() => onSelectBrand(item.name)}
              title={item.name}
              style={{
                flexShrink: 0,
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: isSelected ? '#0a0a0a' : '#ffffff',
                border: isSelected ? '2px solid #0a0a0a' : '1px solid var(--mist)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 10px 24px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.05)',
                padding: '12px'
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1.12)';
                  e.currentTarget.style.borderColor = '#0a0a0a';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--mist)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                }
              }}
            >
              <MarqueBadge
                make={item.name}
                size={38}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
