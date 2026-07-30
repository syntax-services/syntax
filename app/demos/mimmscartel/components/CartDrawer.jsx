'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQty, removeFromCart } = useCart();
  const [custName, setCustName] = useState('');
  const [custAddress, setCustAddress] = useState('');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.priceNGN * item.qty, 0);

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const nameStr = custName.trim() || 'Valued Customer';
    const addressStr = custAddress.trim() || 'Address to be confirmed on WhatsApp';

    const itemsText = cart.map((item, idx) => {
      return `${idx + 1}. *${item.name}* x ${item.qty} - ₦${(item.priceNGN * item.qty).toLocaleString()}`;
    }).join('\n');

    const message = 
`👑 *NEW CATALOG ORDER* - TML Jewelry

Hi TML Jewelry! I would like to place an order from your website:

*ORDERED ITEMS:*
${itemsText}

💰 *Total Amount:* ₦${subtotal.toLocaleString()}
👤 *Customer Name:* ${nameStr}
📍 *Delivery Location:* ${addressStr}

_Note: Please confirm availability and delivery schedule for this order._`;

    window.open(`https://wa.me/2348162255533?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay" 
            onClick={() => setIsCartOpen(false)} 
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="cart-drawer-sheet"
          >
            <div className="cart-header">
              <h3 className="font-serif" style={{fontSize:'1.25rem', display:'flex', alignItems:'center', gap:'10px'}}>
                <ShoppingBag size={18} /> Your Shopping Cart ({totalCount})
              </h3>
              <button className="icon-btn" onClick={() => setIsCartOpen(false)}><X size={16} /></button>
            </div>

            <div className="cart-body">
              {cart.length === 0 ? (
                <div style={{textAlign:'center', padding:'40px 10px', color:'var(--text-muted)'}}>
                  <ShoppingBag size={36} style={{margin:'0 auto 12px'}} />
                  <p>Your jewelry cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{display:'flex', gap:'12px', background:'rgba(255,255,255,0.03)', padding:'10px', borderRadius:'10px', border:'1px solid var(--border-subtle)', alignItems:'center'}}>
                    <img src={item.image} alt={item.name} style={{width:'54px', height:'54px', borderRadius:'6px', objectFit:'cover'}} />
                    <div style={{flex:1}}>
                      <div style={{fontSize:'0.85rem', fontWeight:600}}>{item.name}</div>
                      <div style={{fontSize:'0.82rem', fontWeight:700, marginTop:'2px'}}>
                        ₦{(item.priceNGN * item.qty).toLocaleString()}
                      </div>
                      <div style={{display:'flex', gap:'6px', alignItems:'center', marginTop:'4px'}}>
                        <button className="icon-btn" style={{width:'22px', height:'22px'}} onClick={() => updateQty(item.id, -1)}><Minus size={10} /></button>
                        <span style={{fontSize:'0.8rem'}}>{item.qty}</span>
                        <button className="icon-btn" style={{width:'22px', height:'22px'}} onClick={() => updateQty(item.id, 1)}><Plus size={10} /></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{background:'none', border:'none', color:'#E11D48', cursor:'pointer'}} title="Remove">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', fontSize:'1.05rem', fontWeight:700}}>
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>

                <div style={{display:'flex', flexDirection:'column', gap:'8px', marginBottom:'14px'}}>
                  <input 
                    type="text" 
                    placeholder="Your Full Name"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    style={{width:'100%', padding:'9px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid var(--border-subtle)', borderRadius:'8px', color:'var(--text-primary)', outline:'none', fontSize:'0.85rem'}}
                  />
                  <input 
                    type="text" 
                    placeholder="Delivery Address & State"
                    value={custAddress}
                    onChange={(e) => setCustAddress(e.target.value)}
                    style={{width:'100%', padding:'9px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid var(--border-subtle)', borderRadius:'8px', color:'var(--text-primary)', outline:'none', fontSize:'0.85rem'}}
                  />
                </div>

                <button className="btn-whatsapp-action" style={{width:'100%'}} onClick={sendWhatsAppOrder}>
                  <MessageCircle size={18} /> Send Order to WhatsApp (08162255533)
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
