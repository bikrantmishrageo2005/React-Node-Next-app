import { useState } from "react";
import { motion } from "framer-motion";
import IndiaMap from "@/components/map/IndiaMap";
import TeleportView from "@/components/advanced/TeleportView";
import { ViewMode } from "@/lib/advancedFeaturesData";
import PollutionAllTypesPage from "@/pages/PollutionAllTypesPage";
import AnalysisPage from "@/pages/AnalysisPage";
import GuardiansPage from "@/pages/GuardiansPage";
import OmegaPage from "@/pages/OmegaPage";

export default function NationalControlHub() {
  const [viewMode, setViewMode] = useState<ViewMode>('India');

  return (
    <div className="space-y-12 relative min-h-screen pb-20">
      {/* Teleport Feature - Global Scope */}
      <TeleportView currentMode={viewMode} onModeChange={setViewMode} />

      <div className="text-center space-y-4 pt-8 border-b border-white/10 pb-8">
        <h2 className="text-neon-purple font-orbitron text-xs tracking-[0.5em] uppercase animate-pulse">
          System Online // NATIONAL CONTROL HUB
        </h2>
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white uppercase">
          India <span className="text-neon-purple">Command Center</span>
        </h1>
      </div>

      {/* Section 1: Global Map Surveillance */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-orbitron text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-neon-cyan rounded-full" />
            National Surveillance Grid
          </h3>
        </div>
        <div className="h-[800px] rounded-3xl overflow-hidden border border-white/10 bg-black/40">
          <IndiaMap />
        </div>
      </section>

      {/* Section 2: National Analytics Matrix */}
      <section className="space-y-6">
        <h3 className="text-2xl font-orbitron text-white flex items-center gap-2">
           <span className="w-2 h-8 bg-neon-purple rounded-full" />
           National Pollution Matrix
        </h3>
        <div className="glass-panel p-8 rounded-2xl border-t-4 border-neon-purple">
           <PollutionAllTypesPage />
        </div>
      </section>

      {/* Section 3: Guardian Grid & Omega Core */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h3 className="text-2xl font-orbitron text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-neon-green rounded-full" />
            Guardian Defense Grid
          </h3>
          <div className="glass-panel p-6 rounded-2xl">
            <GuardiansPage />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-2xl font-orbitron text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-neon-yellow rounded-full" />
            Omega Core Intelligence
          </h3>
          <div className="glass-panel p-6 rounded-2xl">
            <OmegaPage />
          </div>
        </section>
      </div>

      {/* Section 4: Deep System Analysis */}
      <section className="space-y-6">
        <h3 className="text-2xl font-orbitron text-white flex items-center gap-2">
           <span className="w-2 h-8 bg-neon-blue rounded-full" />
           Deep System Analytics
        </h3>
        <AnalysisPage />
      </section>

    </div>
  );
}
