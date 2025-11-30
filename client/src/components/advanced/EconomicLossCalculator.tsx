import { motion } from "framer-motion";
import { EconomicData } from "@/lib/advancedFeaturesData";
import { DollarSign, TrendingDown, PieChart } from "lucide-react";
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function EconomicLossCalculator({ data }: { data: EconomicData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-6 rounded-xl border-r-4 border-neon-yellow"
    >
      <h3 className="text-neon-yellow font-orbitron text-lg mb-6 flex items-center gap-2">
        <DollarSign size={20} /> ECONOMIC LOSS CALCULATOR
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white/5 rounded-lg text-center">
          <div className="text-xs text-gray-500 font-rajdhani uppercase mb-1">DAILY LOSS</div>
          <div className="text-2xl font-bold text-white font-orbitron">₹{data.dailyLoss}Cr</div>
          <div className="text-xs text-neon-red flex items-center justify-center gap-1 mt-1">
            <TrendingDown size={12} /> High
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg text-center">
          <div className="text-xs text-gray-500 font-rajdhani uppercase mb-1">HEALTHCARE COST</div>
          <div className="text-2xl font-bold text-white font-orbitron">₹{data.healthcareCost}Cr</div>
        </div>
      </div>

      <div className="h-40 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.sectorDistribution} layout="vertical">
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.sectorDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#facc15', '#a855f7', '#06b6d4', '#22c55e'][index % 4]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-neon-yellow/10 rounded border border-neon-yellow/20">
        <div className="text-xs text-neon-yellow font-bold mb-2 flex items-center gap-2">
          <PieChart size={12} /> OMEGA STRATEGY
        </div>
        <p className="text-gray-300 text-xs font-rajdhani">
          Reducing industrial downtime by 20% could save ₹{Math.floor(data.industryShutdownLoss * 0.2)}Cr annually. 
          Recommend implementing staggered shift protocols.
        </p>
      </div>
    </motion.div>
  );
}
