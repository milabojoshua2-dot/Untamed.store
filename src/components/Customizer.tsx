import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, Type, Palette, Ruler, 
  ArrowRight, Check, X, 
  ChevronRight, Sparkles 
} from "lucide-react";
import { useCart } from "../context/CartContext";

const BASE_COLORS = [
  { name: "Black", value: "#0A0A0A", hex: "000" },
  { name: "White", value: "#FFFFFF", hex: "FFF" },
  { name: "Navy", value: "#1A2E44", hex: "123" },
  { name: "Heather", value: "#4A4A4A", hex: "444" },
  { name: "Acid", value: "#E0FF00", hex: "E0F" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

const FONTS = [
  { name: "Mono", class: "font-mono" },
  { name: "Display", class: "font-display" },
  { name: "Sans", class: "font-sans" },
];

export default function Customizer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState(BASE_COLORS[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [premiumMaterials, setPremiumMaterials] = useState(false);
  const [doubleSided, setDoubleSided] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const basePrice = 85;
  const premiumAddon = premiumMaterials ? 45 : 0;
  const printAddon = doubleSided ? 25 : 0;
  const totalPrice = basePrice + premiumAddon + printAddon;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    addToCart({
      productId: 999, // Custom product id
      name: "Custom Untamed Identity",
      price: totalPrice,
      size: selectedSize,
      color: selectedColor.name,
      image: "/539774753_122153004626762548_7603440818693069588_n.jpg", // Mock base image
      quantity: 1,
      customText,
      customFont: selectedFont.class,
      customImage: uploadedImage || undefined,
    });
    onClose();
    setStep(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] bg-brand-black flex items-center justify-center overflow-hidden"
        >
          {/* Close Header */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-brand-black z-10">
             <div className="flex items-center gap-3">
               <Sparkles className="text-brand-accent animate-pulse" size={20} />
               <h2 className="text-lg font-black uppercase tracking-tighter">Identity Lab</h2>
             </div>
             <button 
              onClick={onClose}
              className="p-2 border border-brand-white/10 rounded-full hover:bg-brand-white hover:text-brand-black transition-all"
             >
               <X size={20} />
             </button>
          </div>

          <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row pt-24 pb-12 gap-12 overflow-hidden">
            
            {/* Real-time Preview Area */}
            <div className="flex-1 bg-brand-gray/50 rounded-sm overflow-hidden relative group flex items-center justify-center p-12 border border-brand-white/5">
               <div 
                className="w-full max-w-md aspect-[3/4] relative shadow-2xl transition-all duration-500"
                style={{ backgroundColor: selectedColor.value }}
               >
                 {/* Product Base Image Silhouette / Placeholder */}
                 <div className={`absolute inset-0 flex flex-col items-center justify-center p-10 ${selectedColor.name === 'White' ? 'text-black' : 'text-white'}`}>
                    {uploadedImage && (
                      <motion.img 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={uploadedImage} 
                        className="w-40 h-40 object-contain mb-4 mix-blend-multiply opacity-80"
                      />
                    )}
                    {customText && (
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-4xl font-black text-center break-words uppercase ${selectedFont.class}`}
                      >
                        {customText}
                      </motion.h3>
                    )}
                    {!uploadedImage && !customText && (
                       <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-20">Awaiting Signal...</span>
                    )}
                 </div>
                 <div className="absolute bottom-4 right-4 text-[8px] font-mono opacity-20 uppercase tracking-widest">
                   Prototype v0.9-Alpha
                 </div>
               </div>

               {/* Stats Overlay */}
               <div className="absolute bottom-6 left-6 p-4 border border-brand-white/10 bg-brand-black/40 backdrop-blur-md">
                 <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[8px] font-mono uppercase opacity-40">Configuration</p>
                      <p className="text-xs font-bold uppercase">{selectedColor.name} // {selectedSize}</p>
                    </div>
                    <div className="w-[1px] h-8 bg-brand-white/10" />
                    <div>
                      <p className="text-[8px] font-mono uppercase opacity-40">Core Material</p>
                      <p className="text-xs font-bold uppercase">{premiumMaterials ? "Ceramic Infused" : "Industrial Cotton"}</p>
                    </div>
                 </div>
               </div>
            </div>

            {/* Selection Options (Sidebar) */}
            <div className="w-full lg:w-[400px] flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div className="space-y-12 pb-12">
                
                {/* 1. Base selection */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-white text-brand-black font-black text-[10px] rounded-full">01</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-white/40">Base Chassis</h4>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Colors */}
                    <div className="flex gap-4">
                      {BASE_COLORS.map(color => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all scale-100 active:scale-90 ${selectedColor.name === color.name ? 'border-brand-accent p-1' : 'border-transparent'}`}
                        >
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color.value }} />
                        </button>
                      ))}
                    </div>

                    {/* Sizes */}
                    <div className="grid grid-cols-4 gap-2">
                      {SIZES.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 text-[10px] font-mono border transition-all ${selectedSize === size ? 'bg-brand-white text-brand-black border-brand-white' : 'bg-transparent border-brand-white/10 text-brand-white/40 hover:border-brand-white/30'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 2. Visual Graphics */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-white text-brand-black font-black text-[10px] rounded-full">02</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-white/40">Visual Signal</h4>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Text Input */}
                    <div className="relative">
                      <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/40" />
                      <input 
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="INPUT CUSTOM TEXT"
                        className="w-full bg-brand-gray border border-brand-white/10 p-4 pl-12 text-xs font-mono outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>

                    {/* Font Selection */}
                    <div className="flex gap-2">
                       {FONTS.map(font => (
                         <button
                           key={font.name}
                           onClick={() => setSelectedFont(font)}
                           className={`flex-1 py-2 text-[8px] font-mono border transition-all ${selectedFont.name === font.name ? 'border-brand-accent text-brand-accent' : 'border-brand-white/10 text-brand-white/30 hover:border-brand-white/20'}`}
                         >
                           {font.name.toUpperCase()}
                         </button>
                       ))}
                    </div>

                    {/* Image Upload Trigger */}
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-brand-white/10 flex flex-col items-center justify-center gap-2 text-brand-white/40 hover:border-brand-accent hover:text-brand-accent transition-all group"
                    >
                      <Upload size={20} className="group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-mono tracking-widest uppercase">
                        {uploadedImage ? "Replace Component" : "Upload Graphic"}
                      </span>
                      <input 
                        type="file" 
                        id="graphic-upload"
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </button>
                  </div>
                </section>

                {/* 3. Performance Upgrades */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="w-6 h-6 flex items-center justify-center bg-brand-white text-brand-black font-black text-[10px] rounded-full">03</span>
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-brand-white/40">Performance Modules</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setPremiumMaterials(!premiumMaterials)}
                      className={`w-full p-4 border flex items-center justify-between transition-all ${premiumMaterials ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-white/10 hover:border-brand-white/20'}`}
                    >
                      <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-widest">Ceramic Tech Weave</p>
                        <p className="text-[9px] font-mono text-brand-white/40 uppercase">Enhanced Durability</p>
                      </div>
                      <span className="text-xs font-mono">+$45</span>
                    </button>

                    <button 
                      onClick={() => setDoubleSided(!doubleSided)}
                      className={`w-full p-4 border flex items-center justify-between transition-all ${doubleSided ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-white/10 hover:border-brand-white/20'}`}
                    >
                      <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-widest">360° Signal Overlay</p>
                        <p className="text-[9px] font-mono text-brand-white/40 uppercase">Double-Sided Print</p>
                      </div>
                      <span className="text-xs font-mono">+$25</span>
                    </button>
                  </div>
                </section>
              </div>

              {/* Price Summary & CTA */}
              <div className="pt-8 border-t border-brand-white/10 space-y-6 bg-brand-black">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] font-mono text-brand-white/40 uppercase tracking-[0.3em]">Estimated Value</p>
                     <p className="text-4xl font-black text-brand-accent">${totalPrice.toFixed(2)}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-mono text-brand-white/40 uppercase">ETA Delivery</p>
                     <p className="text-xs font-bold uppercase">5-7 Business Cycles</p>
                   </div>
                </div>

                <button 
                  onClick={handleComplete}
                  className="w-full py-5 bg-brand-white text-brand-black font-black uppercase text-xs tracking-[0.5em] hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group"
                >
                  Authorize Identity <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
