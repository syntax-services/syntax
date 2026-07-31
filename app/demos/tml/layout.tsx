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
      <main style={{ paddingTop: '105px' }}>
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
