import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";

export default function AetherBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Chat Bubble */}
      <AnimatePresence>
        {(isOpen || showBubble) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-4 mr-2 bg-black/80 backdrop-blur-xl border border-neon-cyan/50 p-4 rounded-2xl rounded-br-none shadow-[0_0_20px_rgba(0,243,255,0.3)] max-w-[280px] pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-neon-cyan font-orbitron text-xs font-bold">AetherBot</span>
              <button onClick={() => { setIsOpen(false); setShowBubble(false); }} className="text-gray-500 hover:text-white">
                <X size={14} />
              </button>
            </div>
            <p className="text-white font-rajdhani text-sm leading-relaxed">
              Hi! I’m AetherBot. I'm monitoring city sensors for you. How can I assist with the analysis today?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Avatar Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowBubble(true)}
        onMouseLeave={() => !isOpen && setShowBubble(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-20 h-20 pointer-events-auto group"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-xl animate-pulse group-hover:bg-neon-cyan/40 transition-all" />
        
        {/* Anime Robot SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
          {/* Head */}
          <circle cx="50" cy="50" r="35" className="fill-black/80 stroke-neon-cyan stroke-2" />
          {/* Ears / Antennae */}
          <path d="M15 40 L25 50 L15 60 Z" className="fill-neon-purple" />
          <path d="M85 40 L75 50 L85 60 Z" className="fill-neon-purple" />
          <rect x="48" y="10" width="4" height="15" className="fill-neon-cyan" />
          <circle cx="50" cy="8" r="4" className="fill-neon-purple animate-pulse" />
          
          {/* Face */}
          <circle cx="35" cy="45" r="4" className="fill-neon-green animate-blink" /> {/* Left Eye */}
          <circle cx="65" cy="45" r="4" className="fill-neon-green animate-blink" /> {/* Right Eye */}
          <path d="M40 65 Q50 75 60 65" className="stroke-white stroke-2 fill-none" /> {/* Smile */}
          
          {/* Cheeks */}
          <circle cx="30" cy="55" r="3" className="fill-neon-pink/50 blur-[1px]" />
          <circle cx="70" cy="55" r="3" className="fill-neon-pink/50 blur-[1px]" />
        </svg>
        
        {/* Status Dot */}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-neon-green border-2 border-black rounded-full animate-bounce" />
      </motion.button>
    </div>
  );
}
