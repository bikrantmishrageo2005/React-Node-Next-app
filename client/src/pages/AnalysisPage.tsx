import { Activity, Database, Server, Share2, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { generateForecast } from "@/lib/mockData";

export default function AnalysisPage() {
  const data = generateForecast();
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-orbitron font-bold text-white uppercase">
        Deep <span className="text-neon-purple">Analysis</span> Protocol
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Long Term Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-xl border-l-4 border-neon-purple"
        >
          <h3 className="text-neon-purple font-orbitron text-lg mb-4 flex items-center gap-2">
            <Activity size={18} /> LONGITUDINAL DATA STREAM
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#444" tick={{fill: '#666', fontSize: 10}} />
                <YAxis stroke="#444" tick={{fill: '#666', fontSize: 10}} />
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Source Attribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-xl border-r-4 border-neon-cyan"
        >
          <h3 className="text-neon-cyan font-orbitron text-lg mb-4 flex items-center gap-2">
            <Database size={18} /> POLLUTANT SOURCE ATTRIBUTION
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" stroke="#444" tick={{fill: '#666', fontSize: 10}} />
                <YAxis stroke="#444" tick={{fill: '#666', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                />
                <Bar dataKey="value" fill="hsl(180 100% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* System Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Neural Net Optimization", icon: Workflow, status: "OPTIMAL", color: "text-neon-green" },
          { title: "Data Ingestion Rate", icon: Server, status: "1.2 TB/s", color: "text-neon-blue" },
          { title: "Predictive Accuracy", icon: Share2, status: "98.4%", color: "text-neon-purple" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-panel p-6 rounded-xl flex items-center justify-between group hover:bg-white/5 transition-colors"
          >
            <div>
              <h4 className="text-gray-400 font-rajdhani text-sm uppercase tracking-wider">{item.title}</h4>
              <p className={`text-2xl font-orbitron font-bold mt-1 ${item.color} group-hover:scale-105 transition-transform`}>
                {item.status}
              </p>
            </div>
            <div className={`p-3 rounded-full bg-white/5 ${item.color}`}>
              <item.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
