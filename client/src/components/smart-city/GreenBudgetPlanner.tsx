import { useState } from "react";
import { motion } from "framer-motion";
import { generateBudgetPlan } from "@/lib/smartCityFeatures";
import { DollarSign, Leaf, TrendingDown, CheckCircle } from "lucide-react";

export default function GreenBudgetPlanner() {
  const [budget, setBudget] = useState(100);
  const plan = generateBudgetPlan(budget);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-6 rounded-xl border-l-4 border-neon-green"
    >
      <h3 className="text-neon-green font-orbitron text-lg mb-6 flex items-center gap-2">
        <Leaf size={20} /> Green Budget Planner
      </h3>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400 font-rajdhani uppercase">Proposed Budget</span>
          <span className="text-2xl font-bold text-white font-orbitron">₹{budget} Cr</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="1000" 
          step="10" 
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-green"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1 font-mono">
          <span>₹10 Cr</span>
          <span>₹1000 Cr</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
            <div className="text-xs text-gray-400 mb-1">Pollution Reduction</div>
            <div className="text-xl font-bold text-neon-green flex items-center justify-center gap-1">
              <TrendingDown size={16} /> {plan.reductionPotential}%
            </div>
         </div>
         <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
            <div className="text-xs text-gray-400 mb-1">ROI Estimate</div>
            <div className="text-xl font-bold text-white flex items-center justify-center gap-1">
              <DollarSign size={16} /> High
            </div>
         </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs text-gray-500 font-bold mb-3 uppercase">Recommended Actions</h4>
        <ul className="space-y-2">
          {plan.actions.map((action, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-rajdhani">
              <CheckCircle size={14} className="text-neon-green" /> {action}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-gray-400 italic border-t border-white/10 pt-3 mt-2">
        "{plan.summary}"
      </p>
    </motion.div>
  );
}
