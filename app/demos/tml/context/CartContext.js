'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('tml_cart_items');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) {}
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('tml_cart_items', JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const idx = cart.findIndex(item => item.id === product.id);
    let updated;
    if (idx > -1) {
      updated = [...cart];
      updated[idx].qty += 1;
      saveCart(updated);
    } else {
      updated = [...cart, { ...product, qty: 1 }];
      saveCart(updated);
    }

    // Trigger Bottom-Right Toast notification
    setToast(`${product.name} added to cart!`);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const updateQty = (id, delta) => {
    const updated = cart.map(item => {
      if (item.id === id) return { ...item, qty: item.qty + delta };
      return item;
    }).filter(item => item.qty > 0);
    saveCart(updated);
  };

  const removeFromCart = (id) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      isCartOpen,
      setIsCartOpen,
      totalCartCount,
      toast,
      setToast
    }}>
      {children}

      {/* Bottom-Right Toast Notification */}
      {toast && (
        <div className="cart-toast-notification">
          <div className="toast-content">
            <span className="toast-dot"></span>
            <span>{toast}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
