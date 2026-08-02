'use client';
import React from 'react';

interface MarqueBadgeProps {
  make: string;
  size?: number;
  color?: string;
  className?: string;
}

export const MarqueBadge: React.FC<MarqueBadgeProps> = ({
  make,
  size = 28,
  className = ''
}) => {
  const m = make.toLowerCase();

  let logoFile = 'ferrari.svg';

  if (m.includes('rolls')) logoFile = 'rolls-royce.svg';
  else if (m.includes('lambo')) logoFile = 'lamborghini.svg';
  else if (m.includes('porsche')) logoFile = 'porsche.svg';
  else if (m.includes('mclaren')) logoFile = 'mclaren.svg';
  else if (m.includes('bugatti')) logoFile = 'bugatti.svg';
  else if (m.includes('koenigsegg')) logoFile = 'koenigsegg.svg';
  else if (m.includes('bentley')) logoFile = 'bentley.svg';
  else if (m.includes('aston')) logoFile = 'aston-martin.svg';
  else if (m.includes('maybach')) logoFile = 'mercedes-maybach.svg';
  else if (m.includes('amg') || m.includes('mercedes')) logoFile = 'mercedes-amg.svg';
  else if (m.includes('range') || m.includes('rover')) logoFile = 'range-rover.svg';
  else if (m.includes('bmw')) logoFile = 'bmw-m.svg';
  else if (m.includes('audi')) logoFile = 'audi-rs.svg';
  else if (m.includes('cadillac')) logoFile = 'cadillac.svg';

  const logoSrc = `/brand_logos/${logoFile}`;

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
    >
      <img
        src={logoSrc}
        alt={`${make} Logo`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
        onError={(e) => {
          // Fallback if image load encounters an error
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
};
