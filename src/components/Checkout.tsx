import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, ArrowLeft, CreditCard, Truck, User, Package, Trophy } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, subtotal, shipping, total } = useCart();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    shippingMethod: "standard",
    notes: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFinalize = () => {
    // Save order to localStorage for the Admin Dashboard demo
    const newOrder = {
      id: `UNT-${Math.floor(Math.random() * 10000)}-XK-${Math.floor(Math.random() * 10)}`,
      timestamp: new Date().toISOString(),
      items: cart,
      customer: formData,
      total: total,
      status: "New"
    };

    const existingOrders = JSON.parse(localStorage.getItem("untamed_orders") || "[]");
    localStorage.setItem("untamed_orders", JSON.stringify([newOrder, ...existingOrders]));

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-brand-black flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg bg-brand-gray p-12 text-center space-y-8 border border-brand-white/10"
            >
              <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(224,255,0,0.3)]">
                <Check size={40} className="text-brand-black" />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Transmission Confirmed</h2>
                <p className="text-brand-white/60 font-light max-w-sm mx-auto leading-relaxed">
                  The resistance has received your order. A confirmation signal has been dispatched to your neural link (email).
                </p>
              </div>
              <div className="pt-8 space-y-4">
                <div className="bg-brand-black/50 p-6 border border-brand-white/5 rounded-sm flex flex-col gap-4">
                   <div className="flex justify-between items-center text-xs font-mono">
                      <span className="opacity-40">Order Hash</span>
                      <span className="text-brand-accent">UNT-2947-XK-9</span>
                   </div>
                   <div className="flex justify-between items-center text-xs font-mono">
                      <span className="opacity-40">Value</span>
                      <span>${total.toFixed(2)}</span>
                   </div>
                </div>
                <button 
                  onClick={() => {
                    setIsSuccess(false);
                    setStep(1);
                    onClose();
                  }}
                  className="w-full py-4 bg-brand-white text-brand-black font-black uppercase text-xs tracking-[0.4em] hover:bg-brand-accent transition-all"
                >
                  Return to Base
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[3000] bg-brand-black flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-brand-white/10 flex justify-between items-center bg-brand-black">
             <div className="flex items-center gap-3">
               <Package className="text-brand-accent" size={20} />
               <h2 className="text-lg font-black uppercase tracking-tighter">Checkout Protocol</h2>
             </div>
             <button 
              onClick={onClose}
              className="text-[10px] font-mono uppercase tracking-widest text-brand-white/40 hover:text-brand-white transition-colors"
             >
               Abort
             </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="container mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
               
               {/* Left: Steps Flow */}
               <div className="lg:col-span-8 space-y-12">
                  
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center max-w-sm mx-auto mb-16">
                     {[1, 2, 3].map((s) => (
                       <div key={s} className="flex items-center">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${step >= s ? 'border-brand-accent bg-brand-accent text-brand-black shadow-[0_0_15px_rgba(224,255,0,0.4)]' : 'border-brand-white/20 text-brand-white/20'}`}>
                             {step > s ? <Check size={14} /> : s}
                          </div>
                          {s < 3 && (
                            <div className={`w-12 sm:w-24 h-[2px] transition-all ${step > s ? 'bg-brand-accent' : 'bg-brand-white/10'}`} />
                          )}
                       </div>
                     ))}
                  </div>

                  {/* Form Content */}
                  <div className="bg-brand-gray/30 p-8 sm:p-12 border border-brand-white/5 rounded-sm">
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                         <div className="flex items-center gap-4 mb-4">
                            <User className="text-brand-accent" size={18} />
                            <h3 className="text-xl font-bold uppercase tracking-tight">Identity Information</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-mono uppercase opacity-40">Email Protocol</label>
                               <input 
                                type="email" 
                                placeholder="ENTITY@DOMAIN.CO"
                                className="w-full bg-brand-black border border-brand-white/10 p-4 text-xs font-mono outline-none focus:border-brand-accent"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                               />
                            </div>
                            <div className="flex-1 invisible md:visible" />
                            <div className="space-y-2">
                               <label className="text-[10px] font-mono uppercase opacity-40">First Coordinate</label>
                               <input 
                                type="text"
                                placeholder="NAME"
                                className="w-full bg-brand-black border border-brand-white/10 p-4 text-xs font-mono outline-none focus:border-brand-accent"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                               />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-mono uppercase opacity-40">Last Coordinate</label>
                               <input 
                                type="text"
                                placeholder="SURNAME"
                                className="w-full bg-brand-black border border-brand-white/10 p-4 text-xs font-mono outline-none focus:border-brand-accent"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                               />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-mono uppercase opacity-40">Order Directives (Notes)</label>
                            <textarea 
                              placeholder="ANY SPECIFIC MODIFICATIONS OR NOTES"
                              className="w-full bg-brand-black border border-brand-white/10 p-4 h-32 text-xs font-mono outline-none focus:border-brand-accent resize-none"
                              value={formData.notes}
                              onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            />
                         </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                         <div className="flex items-center gap-4 mb-4">
                            <Truck className="text-brand-accent" size={18} />
                            <h3 className="text-xl font-bold uppercase tracking-tight">Logistic Routing</h3>
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-mono uppercase opacity-40">Street Vector</label>
                               <input 
                                type="text"
                                placeholder="123 SECTOR ST"
                                className="w-full bg-brand-black border border-brand-white/10 p-4 text-xs font-mono outline-none focus:border-brand-accent"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                               />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-mono uppercase opacity-40">City Cluster</label>
                                  <input 
                                   type="text"
                                   placeholder="NEO CITY"
                                   className="w-full bg-brand-black border border-brand-white/10 p-4 text-xs font-mono outline-none focus:border-brand-accent"
                                   value={formData.city}
                                   onChange={(e) => setFormData({...formData, city: e.target.value})}
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-mono uppercase opacity-40">Zone ID (Zip)</label>
                                  <input 
                                   type="text"
                                   placeholder="00000"
                                   className="w-full bg-brand-black border border-brand-white/10 p-4 text-xs font-mono outline-none focus:border-brand-accent"
                                   value={formData.zip}
                                   onChange={(e) => setFormData({...formData, zip: e.target.value})}
                                  />
                               </div>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <label className="text-[10px] font-mono uppercase opacity-40">Transport Priority</label>
                            <div className="space-y-3">
                               <button 
                                onClick={() => setFormData({...formData, shippingMethod: "standard"})}
                                className={`w-full p-4 border flex items-center justify-between text-left transition-all ${formData.shippingMethod === "standard" ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-white/10 hover:border-brand-white/20'}`}
                               >
                                  <div>
                                     <p className="text-xs font-bold uppercase">Standard Transport</p>
                                     <p className="text-[9px] font-mono opacity-40 uppercase">5-7 Business Cycles</p>
                                  </div>
                                  <span className="text-xs font-mono">$5.99</span>
                               </button>
                               <button 
                                onClick={() => setFormData({...formData, shippingMethod: "express"})}
                                className={`w-full p-4 border flex items-center justify-between text-left transition-all ${formData.shippingMethod === "express" ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-white/10 hover:border-brand-white/20'}`}
                               >
                                  <div>
                                     <p className="text-xs font-bold uppercase">Express Velocity</p>
                                     <p className="text-[9px] font-mono opacity-40 uppercase">2 Business Cycles</p>
                                  </div>
                                  <span className="text-xs font-mono">$15.00</span>
                               </button>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                         <div className="flex items-center gap-4 mb-4">
                            <CreditCard className="text-brand-accent" size={18} />
                            <h3 className="text-xl font-bold uppercase tracking-tight">Currency Exchange</h3>
                         </div>
                         <div className="bg-brand-black p-8 border border-brand-white/10 text-center space-y-6">
                            <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.2em] max-w-xs mx-auto">
                               Secure encrypted portal. No physical credentials stored on local servers.
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                               <div className="space-y-2 text-left">
                                  <label className="text-[10px] font-mono uppercase opacity-40">Card ID</label>
                                  <div className="w-full bg-brand-gray border border-brand-white/10 p-4 text-xs font-mono">XXXX XXXX XXXX XXXX</div>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2 text-left">
                                     <label className="text-[10px] font-mono uppercase opacity-40">Expiry</label>
                                     <div className="w-full bg-brand-gray border border-brand-white/10 p-4 text-xs font-mono">MM / YY</div>
                                  </div>
                                  <div className="space-y-2 text-left">
                                     <label className="text-[10px] font-mono uppercase opacity-40">CVV</label>
                                     <div className="w-full bg-brand-gray border border-brand-white/10 p-4 text-xs font-mono">XXX</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={step === 1 ? onClose : prevStep}
                      className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
                    >
                      <ArrowLeft size={16} /> {step === 1 ? "Cancel Transaction" : "Previous Stage"}
                    </button>
                    <button 
                      onClick={step === 3 ? handleFinalize : nextStep}
                      className="px-10 py-5 bg-brand-white text-brand-black font-black uppercase text-xs tracking-[0.4em] hover:bg-brand-accent transition-all flex items-center gap-3 group"
                    >
                      {step === 3 ? "Authorize Transaction" : "Proceed to Selection"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
               </div>

               {/* Right: Summary */}
               <div className="lg:col-span-4">
                  <div className="sticky top-12 space-y-6">
                     <div className="bg-brand-gray/50 border border-brand-white/10 p-8 space-y-8">
                        <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-brand-white/40">Cargo Summary</h4>
                        
                        <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                           {cart.map(item => (
                             <div key={item.id} className="flex gap-4">
                                <div className="w-16 aspect-[3/4] bg-brand-black border border-brand-white/5 overflow-hidden flex-shrink-0">
                                   <img src={item.image} className="w-full h-full object-cover grayscale" />
                                </div>
                                <div className="flex-1 space-y-1">
                                   <p className="text-[10px] font-bold uppercase truncate">{item.name}</p>
                                   <p className="text-[8px] font-mono opacity-40 uppercase">{item.size} / QTY: {item.quantity}</p>
                                   <p className="text-[10px] font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                             </div>
                           ))}
                        </div>

                        <div className="pt-8 border-t border-brand-white/10 space-y-3">
                           <div className="flex justify-between text-[10px] font-mono opacity-40 uppercase">
                              <span>Inventory Subtotal</span>
                              <span>${subtotal.toFixed(2)}</span>
                           </div>
                           <div className="flex justify-between text-[10px] font-mono opacity-40 uppercase">
                              <span>Logistics</span>
                              <span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                           </div>
                           <div className="flex justify-between text-lg font-black uppercase pt-4 border-t border-brand-white/10">
                              <span>Total Value</span>
                              <span>${total.toFixed(2)}</span>
                           </div>
                        </div>
                     </div>

                     <div className="p-6 border border-brand-accent/20 bg-brand-accent/5 flex items-center gap-4">
                        <Trophy className="text-brand-accent" size={24} />
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold uppercase">Untamed Elite Member</p>
                           <p className="text-[8px] font-mono opacity-60 uppercase">Earning 450 Loyalty Points</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
