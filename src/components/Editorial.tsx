import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Editorial() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section id="editorial" className="py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] rounded-sm overflow-hidden border border-brand-white/10"
          >
            <motion.img 
              src="/481258796_122110117106762548_2630223373076442854_n (1).jpg"
              alt="Editorial"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="absolute inset-0 bg-brand-black/20" />
          </motion.div>

          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-brand-accent block">Manifesto</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                Refuse <br />
                To be <br />
                <span className="italic text-transparent border-text font-outline">Contained</span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 max-w-lg"
            >
              <p className="text-lg text-brand-white/60 font-light leading-relaxed">
                Untamed is more than a brand; it’s a commitment to raw expression. We build for those who operate outside the bounds of convention.
              </p>
              <p className="text-brand-white/60 font-light leading-relaxed">
                Our materials are sourced from industrial durability, our silhouettes born from movement, and our aesthetic anchored in the future.
              </p>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group flex items-center gap-4 text-xs font-mono uppercase tracking-[0.3em] py-2 border-b border-brand-white/20 hover:border-brand-accent transition-colors"
            >
              Explore Our History <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-10 border-t border-brand-white/10"
            >
              <div>
                <p className="text-2xl font-black italic">12+</p>
                <p className="text-[10px] font-mono text-brand-white/40 uppercase tracking-widest mt-1">Countries</p>
              </div>
              <div>
                <p className="text-2xl font-black italic">4M</p>
                <p className="text-[10px] font-mono text-brand-white/40 uppercase tracking-widest mt-1">Community</p>
              </div>
              <div>
                <p className="text-2xl font-black italic">01</p>
                <p className="text-[10px] font-mono text-brand-white/40 uppercase tracking-widest mt-1">Mission</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
