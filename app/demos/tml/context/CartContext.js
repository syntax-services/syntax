'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const defaultContext = {
  cart: [],
  addToCart: () => {},
  updateQty: () => {},
  removeFromCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  totalCartCount: 0,
  toast: null,
  setToast: () => {}
};

const CartContext = createContext(defaultContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('tml_cart_items');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {}
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('tml_cart_items', JSON.stringify(newCart));
    } catch (e) {}
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

    setToast(`${product.name || product.title || 'Item'} added to cart!`);
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

  const totalCartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

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
  const ctx = useContext(CartContext);
  return ctx || defaultContext;
}
