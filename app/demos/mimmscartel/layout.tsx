'use client';
import { CartProvider } from './context/CartContext';

export default function MimmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-neutral-950 text-white selection:bg-amber-500 selection:text-neutral-950">
        {children}
      </div>
    </CartProvider>
  );
}
