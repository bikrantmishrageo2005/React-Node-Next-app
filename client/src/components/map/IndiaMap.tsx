import { useState } from "react";
import { motion } from "framer-motion";
import { CITIES } from "@/lib/mockData";
import { useLocation } from "wouter";

// Simplified India SVG Path (Abstract representation for style)
const INDIA_PATH = "M350,650 L380,600 L420,580 L450,520 L420,450 L450,400 L500,380 L520,320 L480,280 L450,200 L400,150 L350,100 L300,120 L250,150 L220,200 L200,280 L180,350 L150,400 L180,480 L220,550 L280,600 Z";

export default function IndiaMap() {
  const [, setLocation] = useLocation();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center bg-black/20 rounded-3xl overflow-hidden border border-white/5">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <svg viewBox="0 0 700 800" className="w-full h-full max-w-[600px] drop-shadow-[0_0_20px_rgba(0,243,255,0.2)]">
        {/* Map Outline */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          d={INDIA_PATH} // Using a placeholder shape as real India SVG path is too long for this snippet. 
          // In a real app, I'd import a proper GeoJSON or detailed SVG path.
          fill="rgba(0, 20, 40, 0.8)"
          stroke="rgba(0, 243, 255, 0.5)"
          strokeWidth="2"
          className="cursor-pointer hover:fill-neon-cyan/10 transition-colors"
        />

        {/* City Markers */}
        {Object.values(CITIES).map((city, i) => {
            // Mock coordinates mapping to SVG space (just for demo)
            const cx = city.id === 'delhi' ? 350 : city.id === 'mumbai' ? 220 : 300;
            const cy = city.id === 'delhi' ? 250 : city.id === 'mumbai' ? 450 : 550;
            
            return (
              <g key={city.id} onClick={() => setLocation(`/?city=${city.name}`)} className="cursor-pointer group">
                <motion.circle
                  initial={{ r: 0 }}
                  animate={{ r: 6 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  cx={cx}
                  cy={cy}
                  fill="#fff"
                  className="group-hover:fill-neon-cyan"
                />
                <motion.circle
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: 15, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  cx={cx}
                  cy={cy}
                  fill="rgba(0, 243, 255, 0.5)"
                />
                
                {/* Label */}
                <text 
                  x={cx + 20} 
                  y={cy + 5} 
                  fill="white" 
                  className="font-orbitron text-xs opacity-60 group-hover:opacity-100 group-hover:text-neon-cyan transition-all"
                >
                  {city.name.toUpperCase()}
                </text>
              </g>
            );
        })}
      </svg>

      <div className="absolute bottom-8 left-8 glass-panel p-4 rounded-lg border-l-4 border-neon-cyan">
        <h3 className="text-neon-cyan font-orbitron text-sm mb-1">LIVE SATELLITE FEED</h3>
        <p className="text-gray-500 font-rajdhani text-xs">Tracking Active Pollution Hotspots</p>
      </div>
    </div>
  );
}
