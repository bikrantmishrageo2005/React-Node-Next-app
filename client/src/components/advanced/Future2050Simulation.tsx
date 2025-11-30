import { useState } from "react";
import { motion } from "framer-motion";
import { FutureData } from "@/lib/advancedFeaturesData";
import { Clock, TrendingUp, Droplets, Thermometer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Future2050Simulation({ data }: { data: FutureData[] }) {
  const [year, setYear] = useState(2024);
  const currentData = data.find(d => d.year === year) || data[0];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-6 rounded-xl border border-neon-cyan/30 bg-black/80 relative overflow-hidden"
    >
      {/* Hologram Grid BG */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-neon-cyan font-orbitron text-lg md:text-xl flex items-center gap-3 tracking-wider">
            <Clock size={24} className="animate-spin-slow" /> FUTURE 2050 SIMULATION
          </h3>
          <div className="text-4xl font-bold font-orbitron text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] tracking-widest">
            {year}
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="mb-10 px-4">
          <input 
            type="range" 
            min="2024" 
            max="2050" 
            step={year < 2030 ? 6 : 10} 
            value={year}
            onChange={(e) => {
              const val = Number(e.target.value);
              // Snap to data points
              if (val <= 2027) setYear(2024);
              else if (val <= 2035) setYear(2030);
              else if (val <= 2045) setYear(2040);
              else setYear(2050);
            }}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
          />
          <div className="flex justify-between text-xs font-mono text-gray-500 mt-3 tracking-widest">
            <span>2024</span>
            <span>2030</span>
            <span>2040</span>
            <span>2050</span>
          </div>
        </div>

        {/* Simulation Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-white/5 rounded border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-gray-400 font-rajdhani mb-1 tracking-widest uppercase">AQI LEVEL</div>
            <div className="text-xl font-bold text-neon-purple leading-none">{Math.round(currentData.aqi)}</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-gray-400 font-rajdhani mb-1 tracking-widest uppercase">HEAT RISE</div>
            <div className="text-xl font-bold text-neon-orange leading-none">+{currentData.heatRise}°C</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-gray-400 font-rajdhani mb-1 tracking-widest uppercase">FLOOD RISK</div>
            <div className="text-xl font-bold text-neon-blue leading-none">{currentData.floodRisk}%</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-gray-400 font-rajdhani mb-1 tracking-widest uppercase">SURVIVABILITY</div>
            <div className="text-xl font-bold text-neon-green leading-none">{currentData.survivabilityIndex}%</div>
          </div>
        </div>

        {/* Trend Curve */}
        <div className="h-48 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
               <XAxis dataKey="year" stroke="#666" tick={{fill: '#888', fontSize: 10}} tickLine={false} axisLine={false} />
               <YAxis stroke="#666" tick={{fill: '#888', fontSize: 10}} tickLine={false} axisLine={false} />
               <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
               <Line type="monotone" dataKey="aqi" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, fill: '#06b6d4'}} />
               <Line type="monotone" dataKey="survivabilityIndex" stroke="#22c55e" strokeWidth={3} dot={{r: 4, fill: '#22c55e'}} />
             </LineChart>
           </ResponsiveContainer>
        </div>

        <div className="mt-6 text-center">
          <p className="text-neon-cyan font-orbitron text-sm animate-pulse tracking-widest">
            {year === 2050 
              ? "CRITICAL WARNING: UNINHABITABLE ZONES DETECTED" 
              : "SIMULATING ENVIRONMENTAL EVOLUTION..."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
