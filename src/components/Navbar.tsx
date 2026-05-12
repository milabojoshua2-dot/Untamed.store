import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Search, Circle, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";

interface NavbarProps {
  onOpenCustomizer: () => void;
}

export default function Navbar({ onOpenCustomizer }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop All", href: "#shop" },
    { name: "Custom Designer", href: "#custom", onClick: (e: React.MouseEvent) => { e.preventDefault(); onOpenCustomizer(); } },
    { name: "Track Order", href: "#track", onClick: (e: React.MouseEvent) => { e.preventDefault(); alert("Order tracking module coming soon."); } },
  ];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "py-4 bg-brand-black/80 backdrop-blur-md border-b border-brand-white/10" : "py-8 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-32 h-12 bg-transparent flex items-center justify-center transition-transform group-hover:scale-105">
              <Logo />
            </div>
          </a>
        </div>

        {/* Center: Main Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={link.onClick}
                className="text-[10px] font-mono uppercase tracking-[0.3em] hover:text-brand-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-accent transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button className="hover:text-brand-accent transition-colors hidden sm:block">
            <Search size={18} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-brand-accent transition-colors p-2 group"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 w-4 h-4 bg-brand-accent text-brand-black text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(224,255,0,0.5)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 top-0 bg-brand-black z-[200] flex flex-col p-10 md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
               <Logo className="w-32" />
               <button onClick={() => setIsMobileMenuOpen(false)}>
                 <X size={32} />
               </button>
            </div>
            
            <ul className="space-y-8 flex-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      link.onClick?.(e);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-4xl font-black uppercase tracking-tighter hover:text-brand-accent transition-colors flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <Circle className="w-4 h-4 text-brand-white/20 group-hover:text-brand-accent group-hover:scale-150 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto pt-10 border-t border-brand-white/10 space-y-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-brand-white/40 mb-2">Comms</p>
                <p className="text-xl font-bold tracking-tighter">TERMINAL@UNTAMED.IND</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full border border-brand-white/10" />
                 <div className="w-8 h-8 rounded-full border border-brand-white/10" />
                 <div className="w-8 h-8 rounded-full border border-brand-white/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
