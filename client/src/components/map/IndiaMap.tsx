import { INDIA_STATES_DATA } from "@/lib/indiaStateData";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Wind, Droplets, ThermometerSun, CheckCircle } from "lucide-react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from "recharts";
import TeleportView from "@/components/advanced/TeleportView";
import { ViewMode } from "@/lib/advancedFeaturesData";

// Simplified map path - in a real app this would be a proper GeoJSON
const INDIA_MAP_PATH = "M350,650 L380,600 L420,580 L450,520 L420,450 L450,400 L500,380 L520,320 L480,280 L450,200 L400,150 L350,100 L300,120 L250,150 L220,200 L200,280 L180,350 L150,400 L180,480 L220,550 L280,600 Z";

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('India');

  const activeStateData = selectedState ? INDIA_STATES_DATA[selectedState] : null;

  const radarData = activeStateData ? [
    { subject: 'Air', A: activeStateData.indices.Air.index, fullMark: 100 },
    { subject: 'Water', A: activeStateData.indices.Water.index, fullMark: 100 },
    { subject: 'Soil', A: activeStateData.indices.Soil.index, fullMark: 100 },
    { subject: 'Noise', A: activeStateData.indices.Noise.index, fullMark: 100 },
    { subject: 'Heat', A: activeStateData.indices.Heat.index, fullMark: 100 },
    { subject: 'Traffic', A: activeStateData.indices.Traffic.index, fullMark: 100 },
  ] : [];

  return (
    <div className="relative w-full h-full min-h-[800px] flex items-center justify-center bg-black/20 rounded-3xl overflow-hidden border border-white/5">
      <TeleportView currentMode={viewMode} onModeChange={setViewMode} />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <svg viewBox="0 0 700 800" className="w-full h-full max-w-[800px] drop-shadow-[0_0_20px_rgba(0,243,255,0.2)] z-10 transition-all duration-1000"
        style={{ transform: viewMode === 'World' ? 'scale(0.2)' : viewMode === 'Asia' ? 'scale(0.5)' : 'scale(1)' }}
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          d={INDIA_MAP_PATH} 
          fill="rgba(0, 20, 40, 0.8)"
          stroke="rgba(0, 243, 255, 0.5)"
          strokeWidth="2"
          className="cursor-pointer hover:fill-neon-cyan/10 transition-colors"
        />

        {/* State Markers */}
        {Object.values(INDIA_STATES_DATA).map((state, i) => {
            // Generate pseudo-random positions based on name hash for demo
            // In production, use real lat/long projection
            const pseudoX = 350 + (Math.sin(i) * 150);
            const pseudoY = 350 + (Math.cos(i) * 200);
            
            return (
              <g 
                key={state.id} 
                onClick={() => setSelectedState(state.name)} 
                className="cursor-pointer group"
              >
                <circle
                  cx={pseudoX}
                  cy={pseudoY}
                  r={4}
                  className={`fill-white group-hover:fill-neon-cyan transition-colors ${selectedState === state.name ? 'fill-neon-purple' : ''}`}
                />
                <circle
                  cx={pseudoX}
                  cy={pseudoY}
                  r={10}
                  className="fill-transparent stroke-neon-cyan/30 stroke-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </g>
            );
        })}
      </svg>

      {/* State Dashboard Popup */}
      <AnimatePresence>
        {activeStateData && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className="absolute right-0 top-0 bottom-0 w-full md:w-[400px] glass-panel border-l border-neon-cyan/30 z-20 p-6 overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedState(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-orbitron font-bold text-white uppercase mb-1">{activeStateData.name}</h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2 py-0.5 bg-neon-purple/20 border border-neon-purple/50 rounded text-xs text-neon-purple font-bold">
                RANK #{activeStateData.pollutionRank}
              </span>
              <span className="text-gray-500 font-mono text-xs">
                RISK SCORE: {activeStateData.overallScore}/100
              </span>
            </div>

            <div className="h-[250px] mb-8 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Pollution" dataKey="A" stroke="hsl(180 100% 50%)" fill="hsl(180 100% 50%)" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                     <ThermometerSun size={14} /> TEMP
                   </div>
                   <div className="text-xl font-bold text-white">{activeStateData.weather.temp}°C</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                     <Droplets size={14} /> HUMIDITY
                   </div>
                   <div className="text-xl font-bold text-white">{activeStateData.weather.humidity}%</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                     <Wind size={14} /> AQI
                   </div>
                   <div className="text-xl font-bold text-neon-red">{activeStateData.pollutants.aqi}</div>
                 </div>
                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                     <Activity size={14} /> PM2.5
                   </div>
                   <div className="text-xl font-bold text-neon-orange">{activeStateData.pollutants.pm25}</div>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-neon-green font-orbitron text-sm mb-4">RECOMMENDED SOLUTIONS</h3>
              <ul className="space-y-3">
                {activeStateData.indices.Air.solutions.immediate.map((sol, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle size={16} className="text-neon-green shrink-0 mt-0.5" />
                    {sol}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
