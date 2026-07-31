'use client';
import './tml-globals.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function TMLLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main className="pt-32 sm:pt-28 min-h-screen">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
