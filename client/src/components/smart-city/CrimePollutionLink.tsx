import { motion } from "framer-motion";
import { CrimeLinkData } from "@/lib/smartCityFeatures";
import { ShieldAlert, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export default function CrimePollutionLink({ data }: { data: CrimeLinkData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-panel p-6 rounded-xl border-r-4 border-neon-orange"
    >
      <h3 className="text-neon-orange font-orbitron text-lg mb-4 flex items-center gap-2">
        <ShieldAlert size={20} /> Crime–Pollution Link
      </h3>

      <div className="flex items-end gap-4 mb-6">
        <div>
          <div className="text-4xl font-bold font-orbitron text-white">{data.crimeRiskIndex}</div>
          <div className="text-xs text-gray-500 font-rajdhani uppercase">Risk Correlation Index</div>
        </div>
        <div className="text-neon-orange text-xs font-bold mb-1 flex items-center gap-1">
          <TrendingUp size={14} /> Trending High
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-rajdhani">Traffic Congestion Impact</span>
          <span className="text-white font-bold">{data.correlationFactors.traffic}%</span>
        </div>
        <div className="w-full bg-gray-800 h-1 rounded-full">
          <div className="h-full bg-neon-orange" style={{ width: `${data.correlationFactors.traffic}%` }} />
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 font-rajdhani">Heat Stress Correlation</span>
          <span className="text-white font-bold">{data.correlationFactors.heat}%</span>
        </div>
        <div className="w-full bg-gray-800 h-1 rounded-full">
          <div className="h-full bg-neon-red" style={{ width: `${data.correlationFactors.heat}%` }} />
        </div>
      </div>

      <div className="h-24 w-full mb-4 opacity-80">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={data.trend}>
             <Area type="monotone" dataKey="crime" stroke="#f97316" fill="#f97316" fillOpacity={0.2} strokeWidth={2} />
             <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
           </AreaChart>
         </ResponsiveContainer>
      </div>

      <p className="text-xs text-gray-400 font-rajdhani italic border-l-2 border-neon-orange pl-2">
        {data.explanation}
      </p>
    </motion.div>
  );
}
