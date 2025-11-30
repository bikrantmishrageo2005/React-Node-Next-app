import { CityData } from "@/lib/mockData";
import { AlertTriangle, Activity, Wind, Droplets, Thermometer, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, unit, trend, status, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-panel p-4 rounded-xl relative overflow-hidden group hover:border-neon-cyan/50 transition-all flex flex-col justify-between h-full"
  >
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={48} />
    </div>
    <div className="flex justify-between items-start mb-3">
      <span className="text-gray-400 font-rajdhani uppercase text-xs tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border whitespace-nowrap ${
        status === 'Hazardous' ? 'border-neon-red text-neon-red bg-neon-red/10' :
        status === 'Unhealthy' ? 'border-neon-orange text-neon-orange bg-neon-orange/10' :
        'border-neon-green text-neon-green bg-neon-green/10'
      }`}>
        {status}
      </span>
    </div>
    <div className="flex items-baseline gap-2 mt-auto">
      <span className="text-3xl font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors leading-none">
        {value}
      </span>
      <span className="text-xs text-gray-500 font-rajdhani">{unit}</span>
    </div>
  </motion.div>
);

export default function CityOverview({ data }: { data: CityData }) {
  const getRiskColor = (score: number) => {
    if (score > 80) return "text-neon-red drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]";
    if (score > 50) return "text-neon-orange drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]";
    return "text-neon-green drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      {/* Main Risk Score */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-1 glass-panel p-6 rounded-2xl border-t-4 border-neon-purple relative flex flex-col justify-center items-center text-center min-h-[250px]"
      >
        <div className="absolute inset-0 bg-neon-purple/5 animate-pulse pointer-events-none" />
        <h3 className="text-gray-400 font-orbitron text-sm mb-4 relative z-10 tracking-widest">CITY RISK SCORE</h3>
        
        <div className="relative z-10 mb-4 flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-800" />
            <circle 
              cx="80" cy="80" r="70" 
              stroke="currentColor" strokeWidth="10" fill="transparent" 
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * data.riskScore) / 100}
              className={getRiskColor(data.riskScore)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-5xl font-orbitron font-bold leading-none mt-2 ${getRiskColor(data.riskScore)}`}>
              {data.riskScore}
            </span>
          </div>
        </div>
        
        <div className="text-xl font-rajdhani font-bold text-white uppercase tracking-widest relative z-10">
          {data.category} RISK
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.pollutionBreakdown.slice(0, 6).map((item, i) => (
          <StatCard 
            key={item.type}
            label={item.type}
            value={item.value}
            unit={item.unit}
            status={item.status}
            trend={item.trend}
            delay={i * 0.1}
            icon={
              item.type === 'Air' ? Wind :
              item.type === 'Water' ? Droplets :
              item.type === 'Heat' ? Thermometer :
              item.type === 'Noise' ? Volume2 :
              item.type === 'Traffic' ? Activity : AlertTriangle
            }
          />
        ))}
      </div>

      {/* Explanation & Disaster */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 lg:col-span-3 glass-panel p-6 rounded-xl border-l-4 border-neon-red flex flex-col md:flex-row gap-6 items-start"
      >
        <div className="flex-1">
          <h4 className="text-neon-cyan font-orbitron text-lg mb-3 flex items-center gap-2 tracking-wider">
            <Activity className="animate-pulse" size={20} /> SYSTEM ANALYSIS
          </h4>
          <p className="text-gray-300 font-rajdhani text-base leading-relaxed tracking-wide">
            {data.explanation}
          </p>
        </div>
        <div className="w-full md:w-1/3 bg-neon-red/10 p-5 rounded-lg border border-neon-red/30">
          <h5 className="text-neon-red font-orbitron text-sm mb-3 flex items-center gap-2 tracking-wider">
            <AlertTriangle size={16} /> CRITICAL THREAT
          </h5>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold text-sm tracking-wide">{data.disasterRisk.type}</span>
            <span className="text-neon-red font-mono text-xs font-bold">{data.disasterRisk.probability}% PROB</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-neon-red" 
              style={{ width: `${data.disasterRisk.probability}%` }}
            />
          </div>
          <p className="text-gray-400 text-xs font-rajdhani leading-normal">
            {data.disasterRisk.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
