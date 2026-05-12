import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-black border-l border-brand-white/10 z-[1001] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} className="text-brand-accent" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Your Bag</h2>
                <span className="bg-brand-gray px-2 py-0.5 text-[10px] font-mono rounded">
                  {cart.length} ITEMS
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-brand-white/5 transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <ShoppingBag size={64} className="stroke-1" />
                  <p className="text-sm font-mono uppercase tracking-[0.3em]">Empty Warehouse</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 aspect-[3/4] bg-brand-gray relative overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold uppercase tracking-tight text-sm line-clamp-1">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] font-mono text-brand-white/40 uppercase tracking-widest">
                          {item.size} / {item.color}
                        </p>
                        {item.customText && (
                          <p className="text-[10px] font-mono text-brand-accent uppercase tracking-widest">
                            Custom: "{item.customText}"
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-brand-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-brand-white/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-brand-white/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-brand-gray/50 border-t border-brand-white/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-brand-white/40 uppercase">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono">
                    <span className="text-brand-white/40 uppercase">Shipping</span>
                    <span className={shipping === 0 ? "text-brand-accent" : ""}>
                      {shipping === 0 ? "COMPLIMENTARY" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[9px] font-mono text-brand-accent/60 uppercase tracking-widest">
                      Spend ${(75 - subtotal).toFixed(2)} more for complimentary delivery
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-black uppercase pt-4 border-t border-brand-white/10">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckout();
                  }}
                  className="w-full py-4 bg-brand-white text-brand-black font-black uppercase text-xs tracking-[0.4em] hover:bg-brand-accent transition-colors flex items-center justify-center gap-2"
                >
                  Initiate Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
