import { motion } from "framer-motion";
import { AftershockData } from "@/lib/smartCityFeatures";
import { Activity, AlertTriangle, Clock } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from "recharts";

export default function DisasterAftershockTracker({ data }: { data: AftershockData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-6 rounded-xl border-b-4 border-neon-red"
    >
      <h3 className="text-neon-red font-orbitron text-lg mb-4 flex items-center gap-2">
        <Activity size={20} /> Disaster Aftershock Tracker
      </h3>

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="text-xs text-gray-500 font-rajdhani uppercase">Event Type</div>
          <div className="text-xl font-bold text-white font-orbitron">{data.disasterType.toUpperCase()}</div>
        </div>
        <div className="text-right">
           <div className="text-xs text-gray-500 font-rajdhani uppercase">Est. Recovery</div>
           <div className="text-xl font-bold text-neon-green font-orbitron flex items-center justify-end gap-1">
             <Clock size={16} /> {data.recoveryDays} Days
           </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="p-2 bg-white/5 rounded border border-white/10">
          <div className="text-[10px] text-gray-400">Air Spike</div>
          <div className="text-neon-red font-bold">+{data.impacts.airSpike}%</div>
        </div>
        <div className="p-2 bg-white/5 rounded border border-white/10">
          <div className="text-[10px] text-gray-400">Water Contam.</div>
          <div className="text-neon-orange font-bold">+{data.impacts.waterContamination}%</div>
        </div>
        <div className="p-2 bg-white/5 rounded border border-white/10">
          <div className="text-[10px] text-gray-400">Debris</div>
          <div className="text-white font-bold">{data.impacts.wasteDebris}T</div>
        </div>
      </div>

      <div className="h-32 w-full mb-4">
         <ResponsiveContainer width="100%" height="100%">
           <LineChart data={data.timeline}>
             <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
             <XAxis dataKey="phase" stroke="#666" tick={{fontSize: 10}} />
             <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
             <Line type="monotone" dataKey="pollutionLevel" stroke="#ef4444" strokeWidth={2} dot={{r: 3}} />
           </LineChart>
         </ResponsiveContainer>
      </div>

      <div className="flex items-start gap-2 p-3 bg-neon-red/5 rounded border border-neon-red/20">
        <AlertTriangle size={16} className="text-neon-red shrink-0 mt-0.5" />
        <p className="text-xs text-gray-300 font-rajdhani">
          {data.aiText}
        </p>
      </div>
    </motion.div>
  );
}
