import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Siren, Zap } from "lucide-react";

export default function EmergencyCommandMode({ active, onToggle }: { active: boolean, onToggle: () => void }) {
  return (
    <div className="mb-8">
       <motion.div 
         className={`p-6 rounded-xl border transition-all duration-500 relative overflow-hidden ${
           active 
             ? "bg-neon-red/10 border-neon-red shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
             : "glass-panel border-white/10"
         }`}
       >
         {/* Background Pulse Animation for Red Alert */}
         {active && (
           <div className="absolute inset-0 bg-neon-red/5 animate-pulse pointer-events-none" />
         )}

         <div className="flex items-center justify-between relative z-10">
           <div className="flex items-center gap-4">
             <div className={`p-3 rounded-full transition-colors ${active ? 'bg-neon-red text-black animate-bounce' : 'bg-white/5 text-gray-400'}`}>
               <Siren size={24} />
             </div>
             <div>
               <h3 className={`text-xl font-orbitron font-bold ${active ? 'text-neon-red' : 'text-white'}`}>
                 EMERGENCY COMMAND MODE
               </h3>
               <p className="text-sm text-gray-400 font-rajdhani">
                 {active ? "CRITICAL PROTOCOLS ACTIVE - HIGH ALERT" : "Standard Monitoring Protocols Active"}
               </p>
             </div>
           </div>

           <button 
             onClick={onToggle}
             className={`px-8 py-3 rounded font-bold font-orbitron tracking-wider transition-all border ${
               active 
                 ? "bg-neon-red text-black border-neon-red hover:bg-red-500" 
                 : "bg-white/5 text-gray-300 border-white/20 hover:bg-white/10"
             }`}
           >
             {active ? "DEACTIVATE ALERT" : "ACTIVATE RED ALERT"}
           </button>
         </div>

         {/* Emergency Actions Panel (Visible only when Active) */}
         {active && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             className="mt-6 pt-6 border-t border-neon-red/30 grid grid-cols-1 md:grid-cols-3 gap-4"
           >
             <div className="p-4 bg-black/40 border border-neon-red/50 rounded flex items-start gap-3">
               <ShieldAlert className="text-neon-red shrink-0" />
               <div>
                 <div className="text-neon-red font-bold text-sm mb-1">DEPLOY DISASTER UNITS</div>
                 <div className="text-gray-400 text-xs">Immediate mobilization of Guardian response teams to Sector 4.</div>
               </div>
             </div>
             <div className="p-4 bg-black/40 border border-neon-red/50 rounded flex items-start gap-3">
               <Zap className="text-neon-yellow shrink-0" />
               <div>
                 <div className="text-neon-yellow font-bold text-sm mb-1">POWER GRID OVERRIDE</div>
                 <div className="text-gray-400 text-xs">Reroute auxiliary power to critical medical infrastructure.</div>
               </div>
             </div>
             <div className="p-4 bg-black/40 border border-neon-red/50 rounded flex items-start gap-3">
               <AlertTriangle className="text-neon-orange shrink-0" />
               <div>
                 <div className="text-neon-orange font-bold text-sm mb-1">EVACUATE ZONES</div>
                 <div className="text-gray-400 text-xs">Initiate Level 3 evacuation protocol for low-lying coastal areas.</div>
               </div>
             </div>
           </motion.div>
         )}
       </motion.div>
    </div>
  );
}
