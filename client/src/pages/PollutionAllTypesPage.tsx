import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDIA_STATES_DATA, ICONS_MAP, PollutionCategory } from "@/lib/indiaStateData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { AlertTriangle, CheckCircle, ArrowRight, Zap } from "lucide-react";

const TABS: PollutionCategory[] = ['Air', 'Water', 'Soil', 'Noise', 'Heat', 'Traffic', 'Industrial'];

export default function PollutionAllTypesPage() {
  const [activeTab, setActiveTab] = useState<PollutionCategory>('Air');

  // Sort states by the active pollution index
  const sortedStates = Object.values(INDIA_STATES_DATA).sort((a, b) => 
    b.indices[activeTab].index - a.indices[activeTab].index
  );

  const top5Worst = sortedStates.slice(0, 5);
  const top5Best = sortedStates.slice(-5).reverse();
  
  const CurrentIcon = ICONS_MAP[activeTab];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-orbitron font-bold text-white uppercase">
        Pollution <span className="text-neon-cyan">All Types</span> Matrix
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {TABS.map((tab) => {
          const Icon = ICONS_MAP[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-t-lg font-rajdhani font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === tab 
                  ? "bg-neon-cyan/10 text-neon-cyan border-b-2 border-neon-cyan" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} /> {tab}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT COLUMN: Rankings */}
          <div className="lg:col-span-2 space-y-8">
             {/* Chart */}
             <div className="glass-panel p-6 rounded-xl h-[400px]">
               <h3 className="text-white font-orbitron mb-4">National Severity Index: {activeTab}</h3>
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={top5Worst}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                   <XAxis dataKey="name" stroke="#666" tick={{fill: '#888', fontSize: 10}} />
                   <YAxis stroke="#666" />
                   <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff' }}
                   />
                   <Bar dataKey={`indices.${activeTab}.index`} fill="hsl(180 100% 50%)" radius={[4, 4, 0, 0]} name="Severity Score" />
                 </BarChart>
               </ResponsiveContainer>
             </div>

             {/* Best vs Worst */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-red">
                 <h4 className="text-neon-red font-orbitron mb-4 flex items-center gap-2">
                   <AlertTriangle size={16} /> CRITICAL ZONES (WORST 5)
                 </h4>
                 <ul className="space-y-3">
                   {top5Worst.map((state, i) => (
                     <li key={state.id} className="flex justify-between items-center p-2 bg-white/5 rounded">
                       <span className="text-white font-rajdhani">{i+1}. {state.name}</span>
                       <span className="text-neon-red font-bold">{state.indices[activeTab].index}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               <div className="glass-panel p-6 rounded-xl border-l-4 border-neon-green">
                 <h4 className="text-neon-green font-orbitron mb-4 flex items-center gap-2">
                   <CheckCircle size={16} /> SAFE ZONES (BEST 5)
                 </h4>
                 <ul className="space-y-3">
                   {top5Best.map((state, i) => (
                     <li key={state.id} className="flex justify-between items-center p-2 bg-white/5 rounded">
                       <span className="text-white font-rajdhani">{i+1}. {state.name}</span>
                       <span className="text-neon-green font-bold">{state.indices[activeTab].index}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
          </div>

          {/* RIGHT COLUMN: Analysis & Solutions */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl bg-neon-cyan/5 border-neon-cyan/20">
              <CurrentIcon size={48} className="text-neon-cyan mb-4" />
              <h3 className="text-2xl text-white font-orbitron mb-2">{activeTab} Pollution Analysis</h3>
              <p className="text-gray-400 font-rajdhani text-sm mb-4">
                Primary vectors identified through OmegaCore satellite telemetry.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Natural Factors</div>
                  <div className="flex flex-wrap gap-2">
                    {top5Worst[0].indices[activeTab].naturalCauses.map((c, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Human Factors</div>
                  <div className="flex flex-wrap gap-2">
                    {top5Worst[0].indices[activeTab].humanCauses.map((c, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl">
              <h4 className="text-neon-purple font-orbitron mb-4">OMEGA PROTOCOLS</h4>
              <div className="space-y-4">
                <div className="p-3 bg-black/40 rounded border border-white/10">
                  <div className="text-xs text-neon-green mb-1">IMMEDIATE ACTION</div>
                  <div className="text-sm text-white">{top5Worst[0].indices[activeTab].solutions.immediate[0]}</div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/10">
                  <div className="text-xs text-neon-blue mb-1">GOVT POLICY</div>
                  <div className="text-sm text-white">{top5Worst[0].indices[activeTab].solutions.policy}</div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/10">
                  <div className="text-xs text-neon-purple mb-1">AI INTERVENTION</div>
                  <div className="text-sm text-white flex items-center gap-2">
                    <Zap size={12} /> {top5Worst[0].indices[activeTab].solutions.aiAction}
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 py-3 bg-neon-cyan/10 hover:bg-neon-cyan hover:text-black border border-neon-cyan/50 rounded font-orbitron text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all">
                DEPLOY COUNTERMEASURES <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
