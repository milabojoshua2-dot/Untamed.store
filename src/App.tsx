/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Editorial from "./components/Editorial";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Gatekeeper from "./components/Gatekeeper";
import CartDrawer from "./components/CartDrawer";
import Customizer from "./components/Customizer";
import Checkout from "./components/Checkout";
import AdminDashboard from "./components/AdminDashboard";
import { CartProvider } from "./context/CartContext";

function RootApp() {
  const [isHovering, setIsHovering] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Custom cursor logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if user already had access in this session
    const access = sessionStorage.getItem("untamed_access");
    if (access === "true") setHasAccess(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.tagName === "BUTTON" || target.tagName === "A") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const grantAccess = () => {
    setHasAccess(true);
    sessionStorage.setItem("untamed_access", "true");
  };

  if (!hasAccess) {
    return <Gatekeeper onAccessGranted={grantAccess} />;
  }

  return (
    <div className="relative min-h-screen bg-brand-black overflow-x-hidden">
      {/* Animated Background */}
      <div className="bg-animation" />

      {/* Custom Cursor / Floating Logo */}
      <motion.div
        className="custom-cursor pointer-events-none fixed top-0 left-0 w-24 h-24 flex items-center justify-center opacity-10 md:opacity-20 translate-x-[-50%] translate-y-[-50%]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 1.5 : 1,
        }}
      >
        <div className="w-full h-full relative">
          {/* Logo Symbol Representation */}
          <div className="absolute inset-0 border-2 border-brand-white rounded-full animate-spin-slow opacity-20" />
          <div className="absolute inset-2 border-2 border-brand-accent rounded-full animate-reverse-spin-slow opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
             <Logo />
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <Navbar onOpenCustomizer={() => setIsCustomizerOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Categories / Teaser */}
        <section className="py-20 border-y border-brand-white/5">
          <div className="container mx-auto px-6 overflow-hidden">
             <div className="flex whitespace-nowrap gap-20 animate-marquee">
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex items-center gap-10">
                      <span className="text-6xl md:text-8xl font-black italic tracking-tighter text-transparent border-text font-outline opacity-20">UNTAMED</span>
                      <span className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">Drop 001</span>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* Product Grid */}
        <ProductGrid />

        {/* Feature / Lifestyle */}
        <section className="py-32 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
          <Editorial />
        </section>

        {/* Lifestyle Grid / Bento */}
        <section className="py-32 bg-brand-gray">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
              <div className="md:col-span-8 relative overflow-hidden group">
                <img 
                  src="/481957306_122110116938762548_2501235231784603732_n (2).jpg" 
                  alt="Industrial"
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-all" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-4xl font-black uppercase mb-2">The Archive</h3>
                  <p className="text-sm font-mono text-brand-accent tracking-widest">Historical Artifacts</p>
                </div>
              </div>
              <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <div className="relative overflow-hidden group">
                  <img 
                    src="/480574304_122110116968762548_912286112570212459_n.jpg" 
                    alt="Street"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-black/40" />
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-brand-accent text-brand-black text-[10px] font-black uppercase">Restock</span>
                  </div>
                </div>
                <div className="relative overflow-hidden group">
                  <img 
                    src="/480877875_122110117022762548_1120340245365913681_n.jpg" 
                    alt="Refined"
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-black/40" />
                  <div className="absolute bottom-6 left-6">
                     <span className="text-xs font-mono uppercase tracking-widest">Refined Series</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram / Feed teaser */}
        <section className="py-32">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 italic">
              @UNTAMED_IND
            </h2>
            <div className="flex overflow-x-auto pb-10 gap-4 no-scrollbar">
               {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="min-w-[280px] aspect-square bg-brand-gray border border-brand-white/5 relative group overflow-hidden">
                    <img 
                      src={`/${[
                        "539774753_122153004626762548_7603440818693069588_n.jpg",
                        "481957306_122110116938762548_2501235231784603732_n (2).jpg",
                        "481258796_122110117106762548_2630223373076442854_n (1).jpg",
                        "481007472_122110117076762548_526558860017776102_n.jpg",
                        "480871242_122110116254762548_9117241639066617930_n.jpg",
                        "480574304_122110116968762548_912286112570212459_n.jpg"
                      ][i % 6]}`} 
                      alt="social"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
               ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      
      {/* UI States */}
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
      <Customizer isOpen={isCustomizerOpen} onClose={() => setIsCustomizerOpen(false)} />
      <Checkout isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <AnimatePresence>
        {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
      </AnimatePresence>
      
      {/* Global Checkbox Trigger for Checkout (Simple integration for demo) */}
      <div className="hidden">
         <button id="trigger-checkout" onClick={() => setIsCheckoutOpen(true)} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <RootApp />
    </CartProvider>
  );
}
