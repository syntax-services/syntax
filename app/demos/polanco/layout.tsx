'use client';
import './polanco-globals.css';

export default function PolancoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-500 selection:text-neutral-950">
      {children}
    </div>
  );
}
