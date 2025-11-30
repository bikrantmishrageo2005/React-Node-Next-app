import { Brain, Cpu, Database, Eye, Network } from "lucide-react";
import { motion } from "framer-motion";

const CoreModule = ({ title, icon: Icon, description, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className={`glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-${color}/50 transition-all`}
  >
    <div className={`absolute inset-0 bg-${color}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
    
    <div className={`w-16 h-16 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 text-${color} group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
      <Icon size={32} />
    </div>

    <h3 className="font-orbitron text-2xl text-white mb-3 group-hover:text-neon-cyan transition-colors">{title}</h3>
    <p className="font-rajdhani text-gray-400 leading-relaxed text-lg">{description}</p>

    <div className="mt-8 flex items-center gap-2">
      <div className={`h-1 flex-1 bg-gray-800 rounded-full overflow-hidden`}>
        <div className={`h-full bg-${color} w-full animate-pulse`} />
      </div>
      <span className={`text-xs font-mono text-${color}`}>ACTIVE</span>
    </div>
  </motion.div>
);

export default function OmegaPage() {
  return (
    <div className="space-y-12">
      <div className="text-center relative py-12">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
           <Brain size={400} className="text-neon-purple animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-white uppercase relative z-10 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
          OMEGA <span className="text-neon-purple">CORE</span>
        </h1>
        <p className="text-xl text-gray-400 font-rajdhani mt-4 max-w-2xl mx-auto relative z-10">
          The Central Nervous System of India's Future Cities. 
          Processing 400 Petabytes of environmental telemetry daily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CoreModule 
          title="SENSE LAYER" 
          icon={Eye} 
          description="Hyper-spectral satellite imagery fusion with ground-level IoT sensors for real-time environmental awareness."
          color="neon-cyan"
          delay={0.1}
        />
        <CoreModule 
          title="BRAIN LAYER" 
          icon={Brain} 
          description="Quantum-ready predictive modeling engine simulating 14 million pollution permutations per second."
          color="neon-purple"
          delay={0.2}
        />
        <CoreModule 
          title="ACTION LAYER" 
          icon={Cpu} 
          description="Autonomous intervention protocols triggering automated smog towers, traffic rerouting, and industrial shutdowns."
          color="neon-green"
          delay={0.3}
        />
        <CoreModule 
          title="EXPERIENCE LAYER" 
          icon={Network} 
          description="Citizen-facing AR interfaces and holographic alert systems for seamless urban communication."
          color="neon-yellow"
          delay={0.4}
        />
      </div>
    </div>
  );
}
