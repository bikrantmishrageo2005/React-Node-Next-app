import { Shield, Wind, Droplets, Zap, Activity, Truck, Factory, AlertTriangle, Check } from "lucide-react";
import { motion } from "framer-motion";
import { GUARDIAN_STATUS } from "@/lib/mockData";

const GuardianCard = ({ type, data, icon: Icon, index }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="glass-panel p-6 rounded-xl border border-white/5 hover:border-neon-green/50 transition-all group relative overflow-hidden"
  >
    {/* Status Light */}
    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${data.status === 'ONLINE' || data.status === 'OPTIMAL' || data.status === 'ACTIVE' ? 'bg-neon-green shadow-[0_0_10px_#00ff00]' : 'bg-neon-red'} animate-pulse`} />

    <div className="mb-6 text-gray-400 group-hover:text-white transition-colors">
      <Icon size={40} />
    </div>

    <h3 className="font-orbitron text-xl text-white mb-1 uppercase tracking-wider">{type} GUARDIAN</h3>
    <p className="font-rajdhani text-neon-green text-sm mb-6 flex items-center gap-2">
      <Check size={14} /> SYSTEM {data.status}
    </p>

    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs font-rajdhani text-gray-400 mb-1">
          <span>PROCESSING LOAD</span>
          <span>{data.load}%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-neon-cyan transition-all duration-1000" style={{ width: `${data.load}%` }} />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs font-rajdhani text-gray-400 mb-1">
          <span>EFFICIENCY</span>
          <span>{data.efficiency}%</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-neon-purple transition-all duration-1000" style={{ width: `${data.efficiency}%` }} />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function GuardiansPage() {
  const icons = {
    Air: Wind,
    Water: Droplets,
    Soil: Activity,
    Heat: Zap,
    Traffic: Truck,
    Industry: Factory,
    Disaster: AlertTriangle,
    Energy: Zap
  };

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-4xl font-orbitron font-bold text-white uppercase">
            Guardian <span className="text-neon-green">Grid</span>
          </h1>
          <p className="text-gray-500 font-rajdhani mt-2">8-BRANCH AUTONOMOUS PROTECTION SYSTEM</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-neon-green font-orbitron text-xl font-bold">ALL SYSTEMS NOMINAL</div>
          <div className="text-gray-600 text-xs font-mono">UPTIME: 99.999%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(GUARDIAN_STATUS).map(([key, data], i) => (
          <GuardianCard 
            key={key} 
            type={key} 
            data={data} 
            icon={icons[key as keyof typeof icons]} 
            index={i} 
          />
        ))}
      </div>
    </div>
  );
}
