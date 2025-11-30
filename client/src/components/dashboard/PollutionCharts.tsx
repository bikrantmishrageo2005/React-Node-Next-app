import { PollutionData } from "@/lib/mockData";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";
import { motion } from "framer-motion";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-neon-cyan p-3 rounded shadow-[0_0_10px_rgba(0,243,255,0.3)]">
        <p className="text-neon-cyan font-orbitron text-xs mb-1">{label}</p>
        <p className="text-white font-rajdhani font-bold text-lg">
          {payload[0].value} <span className="text-xs text-gray-400">INDEX</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function PollutionCharts({ breakdown, forecast }: { breakdown: PollutionData[], forecast: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Radar Chart */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel p-6 rounded-xl min-h-[400px] flex flex-col"
      >
        <h3 className="text-neon-purple font-orbitron text-lg mb-4">POLLUTION VECTOR ANALYSIS</h3>
        <div className="flex-1 w-full h-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={breakdown}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="type" tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Rajdhani' }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Pollution"
                dataKey="value"
                stroke="hsl(280 100% 60%)"
                strokeWidth={3}
                fill="hsl(280 100% 60%)"
                fillOpacity={0.2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Forecast Chart */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel p-6 rounded-xl min-h-[400px] flex flex-col"
      >
        <h3 className="text-neon-cyan font-orbitron text-lg mb-4">24H PREDICTIVE MODEL</h3>
        <div className="flex-1 w-full h-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecast} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(180 100% 50%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(180 100% 50%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#333" tick={{ fill: '#666', fontSize: 10 }} />
              <YAxis stroke="#333" tick={{ fill: '#666', fontSize: 10 }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(180 100% 50%)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
