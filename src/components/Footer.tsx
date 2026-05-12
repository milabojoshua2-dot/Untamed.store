import { Instagram, Twitter, Facebook, Github, Mail } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  onOpenAdmin: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  return (
    <footer className="bg-brand-gray pt-32 pb-10 mt-32 border-t border-brand-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-24 h-10 bg-transparent flex items-center justify-center">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">UNTAMED</span>
            </div>
            <p className="text-sm text-brand-white/40 leading-relaxed max-w-[240px]">
              Defining the future of brutalist lifestyle. Architecting the uniform of the modern rebel.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-white/10 rounded-full hover:bg-brand-white hover:text-brand-black transition-all" title="Follow on Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 border border-brand-white/10 rounded-full hover:bg-brand-white hover:text-brand-black transition-all" title="Follow on Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 border border-brand-white/10 rounded-full hover:bg-brand-white hover:text-brand-black transition-all" title="Follow on Twitter">
                <Twitter size={18} />
              </a>
              <button 
                onClick={onOpenAdmin}
                className="p-2 border border-brand-white/10 rounded-full hover:bg-brand-accent hover:text-brand-black transition-all opacity-10 hover:opacity-100"
                title="System Administration"
              >
                <Github size={18} />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {["Shop All", "Collection 01", "Accessories", "Lifestyle", "Archive"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold uppercase tracking-tight hover:text-brand-accent transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em] mb-8">Service</h4>
            <ul className="space-y-4">
              {["Shipping", "Returns", "Size Guide", "Order Tracking", "Sitemap"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold uppercase tracking-tight hover:text-brand-accent transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.3em] mb-8">Join the Resistance</h4>
            <p className="text-sm text-brand-white/40 mb-6">Receive early access to limited edition drops.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="EMAIL@UNTAMED.CO" 
                className="w-full bg-transparent border-b border-brand-white/20 py-3 text-sm focus:border-brand-accent outline-none font-mono transition-colors"
              />
              <button className="absolute right-0 bottom-3">
                <Mail size={18} className="text-brand-white/40 hover:text-brand-accent transition-colors" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono text-brand-white/20 uppercase tracking-widest">
            © 2026 UNTAMED CORE INDUSTRIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono text-brand-white/20 uppercase tracking-widest hover:text-brand-white">Privacy</a>
            <a href="#" className="text-[10px] font-mono text-brand-white/20 uppercase tracking-widest hover:text-brand-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
