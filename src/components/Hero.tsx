import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Text Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none"
      >
        <h2 className="text-[30vw] font-black tracking-tighter leading-none">
          UNTAMED
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Main Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-brand-white/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-white/60">
                  Drop 01 / SS26 Available Now
                </span>
              </div>
              <h1 className="text-6xl lg:text-9xl font-black mb-6 leading-[0.9] tracking-tighter uppercase">
                Unleash <br />
                <span className="text-brand-accent">Your Style</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-white/70 mb-10 max-w-xl font-light leading-relaxed">
                Bold designs for the modern rebel. High-performance lifestyle wear that refuses to be contained. Born from the streets, refined for the elite.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <button className="group relative px-8 py-4 bg-brand-white text-brand-black font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:pr-12">
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Collection <ShoppingBag size={18} />
                  </span>
                  <div className="absolute right-0 top-0 h-full w-0 bg-brand-accent transition-all group-hover:w-10 flex items-center justify-center">
                    <ArrowRight size={18} className="translate-x-[-20%] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all delay-75" />
                  </div>
                </button>
                <button className="px-8 py-4 border border-brand-white/20 text-brand-white font-bold uppercase tracking-widest text-sm hover:bg-brand-white hover:text-brand-black transition-colors">
                  Lookbook
                </button>
              </div>
            </motion.div>
          </div>

          {/* Featured Image Parallax */}
          <motion.div 
            style={{ y: y2 }}
            className="flex-1 relative w-full aspect-[4/5] md:aspect-[3/4] max-w-[500px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="w-full h-full relative overflow-hidden rounded-sm border border-brand-white/10"
            >
              <img 
                src="/539774753_122153004626762548_7603440818693069588_n.jpg"
                alt="Untamed Collection"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Image Floating Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="block text-[10px] font-mono text-brand-accent mb-1">001</span>
                  <span className="text-xl font-bold uppercase tracking-tighter">Oversized Armor Hoodie</span>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-bold">$189.00</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-white to-transparent" />
      </motion.div>
    </section>
  );
}
