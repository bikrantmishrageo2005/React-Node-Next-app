import { motion } from "framer-motion";
import { CrisisData } from "@/lib/advancedFeaturesData";
import { AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export default function CityCrisisPredictor({ data }: { data: CrisisData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl border-l-4 border-neon-red relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <AlertTriangle size={100} className="text-neon-red" />
      </div>

      <h3 className="text-neon-red font-orbitron text-lg mb-6 flex items-center gap-2">
        <AlertTriangle size={20} className="animate-pulse" /> CRISIS PREDICTOR
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gauge */}
        <div className="flex flex-col items-center justify-center relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="#333" strokeWidth="12" fill="transparent" />
            <circle 
              cx="96" cy="96" r="88" 
              stroke="currentColor" strokeWidth="12" fill="transparent" 
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * data.dangerScore) / 100}
              className="text-neon-red drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-orbitron font-bold text-white">{data.dangerScore}</span>
            <span className="text-neon-red font-rajdhani text-sm tracking-widest">DANGER SCORE</span>
          </div>
        </div>

        {/* Probabilities */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1 font-rajdhani">
              <span>EXTREME POLLUTION PROBABILITY</span>
              <span>{data.extremePollutionProb}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon-orange" style={{ width: `${data.extremePollutionProb}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1 font-rajdhani">
              <span>HEATWAVE SPIKE PROBABILITY</span>
              <span>{data.heatwaveProb}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon-yellow" style={{ width: `${data.heatwaveProb}%` }} />
            </div>
          </div>
          
          <div className="p-4 bg-neon-red/10 rounded border border-neon-red/20 mt-4">
            <div className="text-xs text-neon-red font-bold mb-1 flex items-center gap-2">
              <Zap size={12} /> OMEGA CORE ALERT
            </div>
            <p className="text-gray-300 text-xs font-rajdhani">{data.explanation}</p>
          </div>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-24 mt-6 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.forecast7d.map((v, i) => ({ day: i, val: v }))}>
            <defs>
              <linearGradient id="colorDanger" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="val" stroke="#ef4444" fillOpacity={1} fill="url(#colorDanger)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="text-center text-xs text-gray-500 font-mono mt-1">7-DAY DANGER FORECAST</div>
      </div>
    </motion.div>
  );
}
