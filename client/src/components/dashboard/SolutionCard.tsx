import { ArrowRight, CheckCircle, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface SolutionCardProps {
  title: string;
  impact: string;
  cost: string;
  time: string;
  type: string;
  index: number;
}

export default function SolutionCard({ title, impact, cost, time, type, index }: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-black/40 border border-white/10 p-6 rounded-lg group overflow-hidden hover:border-neon-cyan/50 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:from-neon-cyan/20 transition-all" />
      
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-orbitron text-gray-500 uppercase tracking-wider border border-gray-800 px-2 py-1 rounded">
          {type} PROTOCOL
        </span>
        <div className="w-2 h-2 rounded-full bg-gray-700 group-hover:bg-neon-cyan transition-colors" />
      </div>

      <h3 className="text-white font-rajdhani font-bold text-xl mb-4 group-hover:text-neon-cyan transition-colors pr-4">
        {title}
      </h3>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white/5 p-2 rounded flex flex-col items-center">
          <span className="text-[10px] text-gray-500 uppercase">IMPACT</span>
          <span className={`font-bold text-sm ${
            impact === 'High' ? 'text-neon-green' : impact === 'Medium' ? 'text-neon-yellow' : 'text-gray-400'
          }`}>{impact}</span>
        </div>
        <div className="bg-white/5 p-2 rounded flex flex-col items-center">
          <span className="text-[10px] text-gray-500 uppercase">COST</span>
          <span className="font-bold text-sm text-white flex gap-0.5">
            {cost.split('').map((c, i) => <DollarSign key={i} size={12} />)}
          </span>
        </div>
        <div className="bg-white/5 p-2 rounded flex flex-col items-center">
          <span className="text-[10px] text-gray-500 uppercase">ETA</span>
          <span className="font-bold text-sm text-white flex items-center gap-1">
            <Clock size={12} /> {time}
          </span>
        </div>
      </div>

      <button className="w-full py-3 bg-white/5 hover:bg-neon-cyan hover:text-black border border-white/10 rounded font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all">
        INITIATE DEPLOYMENT <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}
