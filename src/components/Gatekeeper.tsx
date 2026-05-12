import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import Logo from "./Logo";

interface GatekeeperProps {
  onAccessGranted: () => void;
}

export default function Gatekeeper({ onAccessGranted }: GatekeeperProps) {
  const [code, setCode] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 2,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    // Generate a random 6-character alphanumeric code
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const newCode = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
    setSessionCode(newCode);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toUpperCase() === sessionCode) {
      onAccessGranted();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleFollowClick = () => {
    // Open FB in new tab (using a placeholder or actual link)
    window.open("https://facebook.com", "_blank");
    // Simulate detecting the follow
    setTimeout(() => {
      setIsFollowing(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-brand-black flex flex-col items-center justify-center p-6 bg-animation">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center space-y-10"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-12">
            <Logo />
          </div>
          <div className="h-[1px] w-12 bg-brand-accent/50" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-brand-white/40">
            Encrypted Warehouse Access
          </span>
        </div>

        {/* Access Instructions */}
        <div className="bg-brand-gray/30 border border-brand-white/5 p-6 rounded-sm space-y-4">
           {isFollowing ? (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-4"
             >
                <div className="flex items-center justify-center gap-2 text-brand-accent">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Identity Verified</span>
                </div>
                <div className="py-4 border-y border-brand-white/10">
                   <p className="text-[8px] font-mono text-brand-white/40 uppercase mb-2">Your Access Key</p>
                   <p className="text-4xl font-black tracking-[0.2em] text-brand-white italic select-all cursor-copy">
                     {sessionCode}
                   </p>
                </div>
                <p className="text-[9px] font-mono text-brand-white/30 uppercase leading-relaxed">
                  Enter this token below to synchronize with the mainframe.
                </p>
             </motion.div>
           ) : (
             <div className="space-y-6">
                <p className="text-[10px] font-mono text-brand-white/60 uppercase leading-relaxed tracking-widest">
                  ACCESS IS RESTRICTED TO <span className="text-brand-accent">ACTIVE UNIT MEMBERS</span>. FOLLOW OUR CHANNEL TO RECEIVE YOUR DECRYPTION TOKEN.
                </p>
                <button 
                  onClick={handleFollowClick}
                  className="w-full py-4 border border-brand-accent text-brand-accent font-black uppercase text-[10px] tracking-[0.2em] hover:bg-brand-accent hover:text-brand-black transition-all flex items-center justify-center gap-2 px-6"
                >
                  FOLLOW UNTAMED FB UNIT
                  <ArrowRight size={14} />
                </button>
             </div>
           )}
        </div>

        {/* Access Form */}
        <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity ${!isFollowing ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          <div className="relative">
            <input
              type="text"
              disabled={!isFollowing}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={isFollowing ? "ENTER TOKEN" : "LOCKED"}
              className={`w-full bg-brand-gray/50 border-b-2 py-4 px-12 text-center text-sm font-mono tracking-[0.3em] outline-none transition-all ${
                error ? "border-red-500 text-red-500" : "border-brand-white/10 focus:border-brand-accent"
              }`}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20">
              {error ? <AlertCircle size={18} /> : <Lock size={18} />}
            </div>
            {code && !error && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-accent p-1"
              >
                <ArrowRight size={18} />
              </motion.button>
            )}
          </div>

          <button 
            type="submit"
            disabled={!isFollowing}
            className="w-full py-4 bg-brand-white text-brand-black font-black uppercase text-xs tracking-[0.4em] hover:bg-brand-accent transition-colors disabled:opacity-50"
          >
            Authorize Entry
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-brand-white/20">
          <ShieldCheck size={14} />
          <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Secure Shell v4.2.1</span>
        </div>
      </motion.div>

      {/* Background Decorative Text */}
      <div className="absolute inset-x-0 top-1/4 pointer-events-none overflow-hidden whitespace-nowrap opacity-[0.02]">
        <div className="text-[20vh] font-black italic tracking-tighter animate-marquee">
          RESTRICTED AREA RESTRICTED AREA RESTRICTED AREA
        </div>
      </div>
    </div>
  );
}
