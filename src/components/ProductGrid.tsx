import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Ruler, X, Check, AlertTriangle } from "lucide-react";
import { useCart } from "../context/CartContext";

// Simulated inventory levels
const INVENTORY: Record<number, number> = {
  1: 5,
  2: 0, // Vector Cargo is out of stock for demo
  3: 12,
  4: 8,
};

const products = [
  {
    id: 1,
    name: "Obsidian Parka",
    category: "Outerwear",
    price: 340.00,
    image: "/481007472_122110117076762548_526558860017776102_n.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "Vector Cargo v2",
    category: "Bottoms",
    price: 210.00,
    image: "/480871242_122110116254762548_9117241639066617930_n.jpg",
    isNew: true,
  },
  {
    id: 3,
    name: "Industrial Link",
    category: "Accessories",
    price: 85.00,
    image: "/480574304_122110116968762548_912286112570212459_n.jpg",
    isNew: false,
  },
  {
    id: 4,
    name: "Cyber Tote",
    category: "Accessories",
    price: 120.00,
    image: "/480877875_122110117022762548_1120340245365913681_n.jpg",
    isNew: false,
  },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    Object.fromEntries(products.map(p => [p.id, "M"]))
  );

  const handleAddToCart = (product: typeof products[0]) => {
    if (INVENTORY[product.id] === 0) return;
    
    setAddingId(product.id);
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSizes[product.id],
      color: "Black",
      image: product.image,
      quantity: 1
    });
    setTimeout(() => setAddingId(null), 1500);
  };

  const updateSize = (pid: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [pid]: size }));
  };

  return (
    <section id="shop" className="py-32 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-brand-white/40 block mb-4">Latest Arrivals</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Current <br /><span className="text-brand-accent">Inventory</span></h2>
          </div>
          <div className="flex items-center gap-8">
             <button 
              onClick={() => setIsSizeGuideOpen(true)}
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-white/40 hover:text-brand-white transition-colors"
             >
                <Ruler size={14} /> Size Guide
             </button>
             <button className="flex items-center gap-2 group text-sm font-mono uppercase tracking-widest border-b border-brand-white/20 pb-2 hover:border-brand-accent transition-colors">
                View All Series <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray border border-brand-white/5 mb-6">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                {product.isNew && INVENTORY[product.id] > 0 && (
                  <div className="absolute top-4 left-4 bg-brand-accent text-brand-black text-[10px] font-black uppercase px-2 py-1">
                    New
                  </div>
                )}

                {INVENTORY[product.id] === 0 && (
                   <div className="absolute inset-0 bg-brand-black/60 flex items-center justify-center p-6 text-center">
                      <div className="space-y-2">
                        <AlertTriangle className="mx-auto text-brand-accent" size={24} />
                        <p className="text-xs font-black uppercase tracking-widest text-brand-accent">Exhausted Stock</p>
                      </div>
                   </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <div className="space-y-4">
                    {/* Inline Size Selector */}
                    <div className="flex gap-1 justify-center">
                      {SIZES.map(s => (
                        <button
                          key={s}
                          onClick={(e) => { e.stopPropagation(); updateSize(product.id, s); }}
                          className={`w-8 h-8 text-[9px] font-mono border transition-all ${selectedSizes[product.id] === s ? 'bg-brand-accent text-brand-black border-brand-accent' : 'bg-brand-black/80 text-white border-brand-white/20 hover:border-brand-white'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button 
                      disabled={INVENTORY[product.id] === 0}
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-3 font-bold uppercase text-[10px] tracking-widest transition-colors flex items-center justify-center gap-2 ${
                        addingId === product.id ? "bg-brand-accent text-brand-black" : "bg-brand-white text-brand-black hover:bg-brand-accent"
                      } ${INVENTORY[product.id] === 0 ? "opacity-50 cursor-not-allowed text-brand-white/40" : ""}`}
                    >
                      {addingId === product.id ? (
                        <><Check size={14} /> Added</>
                      ) : (
                        INVENTORY[product.id] === 0 ? "Depleted" : "Authorize Acquisition"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-brand-white/40 mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h3>
                </div>
                <p className="font-mono text-sm uppercase">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-brand-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-brand-gray w-full max-w-2xl p-10 border border-brand-white/10 space-y-10"
            >
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-black uppercase tracking-tighter">Dimensional Grid</h3>
                 <button onClick={() => setIsSizeGuideOpen(false)}>
                    <X size={24} />
                 </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono uppercase tracking-widest">
                  <thead className="border-b border-brand-white/10">
                    <tr>
                       <th className="py-4 font-normal text-brand-white/40">Size</th>
                       <th className="py-4 font-normal text-brand-white/40">Chest (In)</th>
                       <th className="py-4 font-normal text-brand-white/40">Waist (In)</th>
                       <th className="py-4 font-normal text-brand-white/40">Length (In)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-white/5">
                    {[
                      { s: "XS", c: "34-36", w: "28-30", l: "26" },
                      { s: "S", c: "36-38", w: "30-32", l: "27" },
                      { s: "M", c: "38-40", w: "32-34", l: "28" },
                      { s: "L", c: "40-42", w: "34-36", l: "29" },
                      { s: "XL", c: "42-44", w: "36-38", l: "30" },
                      { s: "2XL", c: "44-46", w: "38-40", l: "31" },
                    ].map(row => (
                      <tr key={row.s}>
                        <td className="py-4 font-bold text-brand-accent">{row.s}</td>
                        <td className="py-4 opacity-60">{row.c}</td>
                        <td className="py-4 opacity-60">{row.w}</td>
                        <td className="py-4 opacity-60">{row.l}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] font-mono text-brand-white/20 uppercase text-center tracking-[0.2em]">
                All measurements are approximations. Silhouettes are engineered for oversized fit.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
