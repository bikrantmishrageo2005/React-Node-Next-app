import { motion } from "framer-motion";
import { SentimentData } from "@/lib/smartCityFeatures";
import { Smile, Meh, Frown, Angry, AlertCircle } from "lucide-react";

const IconMap = {
  Happy: Smile,
  Neutral: Meh,
  Worried: AlertCircle,
  Stressed: Frown,
  Angry: Angry
};

const ColorMap = {
  Happy: "text-neon-green",
  Neutral: "text-neon-blue",
  Worried: "text-neon-yellow",
  Stressed: "text-neon-orange",
  Angry: "text-neon-red"
};

export default function CitizenSentimentRadar({ data }: { data: SentimentData }) {
  const Icon = IconMap[data.mood];
  const colorClass = ColorMap[data.mood];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-6 rounded-xl border-t-4 border-neon-blue"
    >
      <h3 className="text-neon-blue font-orbitron text-lg mb-4">Citizen Sentiment Radar</h3>
      
      <div className="flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 animate-ping">
           <div className={`w-24 h-24 rounded-full bg-current ${colorClass}`} />
        </div>
        <Icon size={64} className={`${colorClass} drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`} />
      </div>

      <div className="text-center mb-4">
        <div className={`text-2xl font-orbitron font-bold ${colorClass}`}>{data.mood.toUpperCase()}</div>
        <div className="text-xs text-gray-500 font-rajdhani uppercase">Current Public Mood</div>
      </div>

      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full transition-all duration-1000 ${data.mood === 'Happy' ? 'bg-neon-green' : data.mood === 'Angry' ? 'bg-neon-red' : 'bg-neon-blue'}`} 
          style={{ width: `${data.score}%` }} 
        />
      </div>

      <div className="p-3 bg-white/5 rounded border border-white/10">
        <div className="text-xs text-gray-400 font-bold mb-1">AI INSIGHT</div>
        <p className="text-sm text-gray-300 font-rajdhani leading-relaxed">
          "{data.summary}"
        </p>
      </div>
    </motion.div>
  );
}
