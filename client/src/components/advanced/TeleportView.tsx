import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewMode, GLOBAL_HOTSPOTS } from "@/lib/advancedFeaturesData";
import { Globe, MapPin, Navigation } from "lucide-react";

export default function TeleportView({ currentMode, onModeChange }: { currentMode: ViewMode, onModeChange: (mode: ViewMode) => void }) {
  const modes: ViewMode[] = ['City', 'State', 'India', 'Asia', 'World'];

  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-4">
      <div className="glass-panel p-2 rounded-full flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-neon-cyan/30">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={`px-4 py-2 rounded-full font-orbitron text-xs font-bold transition-all ${
              currentMode === mode 
                ? "bg-neon-cyan text-black shadow-[0_0_15px_rgba(0,243,255,0.5)]" 
                : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {currentMode === 'World' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel p-4 rounded-xl w-64 border-t-4 border-neon-purple"
          >
            <h4 className="text-neon-purple font-orbitron text-sm mb-3 flex items-center gap-2">
              <Globe size={16} /> GLOBAL HOTSPOTS
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-hide">
              {GLOBAL_HOTSPOTS.map((city) => (
                <div key={city.name} className="flex justify-between items-center p-2 bg-white/5 rounded hover:bg-neon-purple/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-gray-500 group-hover:text-neon-purple" />
                    <span className="text-sm text-gray-300 font-rajdhani">{city.name}</span>
                  </div>
                  <span className={`text-xs font-bold ${city.aqi > 150 ? 'text-neon-red' : city.aqi > 100 ? 'text-neon-orange' : 'text-neon-green'}`}>
                    {city.aqi} AQI
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
