import { motion } from "framer-motion";
import { HealthImpactData } from "@/lib/advancedFeaturesData";
import { Heart, Stethoscope, Eye, Thermometer, Activity, User, Baby } from "lucide-react";

const HealthMetric = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
    <div className={`p-2 rounded-full bg-${color}/10 text-${color}`}>
      <Icon size={20} />
    </div>
    <div className="flex-1">
      <div className="text-xs text-gray-500 font-rajdhani uppercase">{label}</div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full bg-${color}`} style={{ width: `${value}%` }} />
        </div>
        <span className="text-sm font-bold text-white w-8 text-right">{value}%</span>
      </div>
    </div>
  </div>
);

export default function HealthImpactPanel({ data }: { data: HealthImpactData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-panel p-6 rounded-xl border-t-4 border-neon-green"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-neon-green font-orbitron text-lg flex items-center gap-2">
          <Activity size={20} /> HEALTH IMPACT MATRIX
        </h3>
        <div className="text-right">
          <div className="text-3xl font-bold font-orbitron text-white">{data.overallIndex}</div>
          <div className="text-xs text-gray-500 font-mono">IMPACT INDEX</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthMetric icon={Stethoscope} label="Asthma Risk" value={data.asthmaRisk} color="neon-purple" />
        <HealthMetric icon={Heart} label="Heart Stress" value={data.heartStressRisk} color="neon-red" />
        <HealthMetric icon={Eye} label="Eye Irritation" value={data.eyeIrritation === 'Severe' ? 90 : data.eyeIrritation === 'High' ? 70 : 40} color="neon-yellow" />
        <HealthMetric icon={Thermometer} label="Heat Stroke" value={data.heatStrokeRisk} color="neon-orange" />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-neon-green/5 rounded border border-neon-green/20 flex items-center gap-3">
          <Baby size={24} className="text-neon-green" />
          <div>
            <div className="text-xs text-gray-400">CHILD HAZARD</div>
            <div className="text-lg font-bold text-white">{data.childHazardScore}/100</div>
          </div>
        </div>
        <div className="p-3 bg-neon-green/5 rounded border border-neon-green/20 flex items-center gap-3">
          <User size={24} className="text-neon-green" />
          <div>
            <div className="text-xs text-gray-400">ELDERLY HAZARD</div>
            <div className="text-lg font-bold text-white">{data.elderlyHazardScore}/100</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
