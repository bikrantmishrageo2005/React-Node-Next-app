import { useState, useEffect } from "react";
import CityInput from "@/components/dashboard/CityInput";
import CityOverview from "@/components/dashboard/CityOverview";
import PollutionCharts from "@/components/dashboard/PollutionCharts";
import SolutionCard from "@/components/dashboard/SolutionCard";
import AetherAssistant from "@/components/ai/AetherAssistant";
import { CITIES, DEMO_CITY_DATA, generateForecast, SOLUTIONS, CityData } from "@/lib/mockData";
import { motion } from "framer-motion";

// New Features
import TeleportView from "@/components/advanced/TeleportView";
import CityCrisisPredictor from "@/components/advanced/CityCrisisPredictor";
import HealthImpactPanel from "@/components/advanced/HealthImpactPanel";
import EconomicLossCalculator from "@/components/advanced/EconomicLossCalculator";
import Future2050Simulation from "@/components/advanced/Future2050Simulation";
import { 
  ViewMode, 
  generateCrisisData, 
  generateHealthData, 
  generateEconomicData, 
  generateFutureData 
} from "@/lib/advancedFeaturesData";

export default function Dashboard() {
  // Initialize with DEMO data
  const [selectedCity, setSelectedCity] = useState<CityData>(DEMO_CITY_DATA);
  const [forecastData, setForecastData] = useState<any[]>(generateForecast());
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('City');

  // Generated Advanced Data based on current city state
  const crisisData = generateCrisisData(selectedCity.riskScore);
  const healthData = generateHealthData(selectedCity.pollutionBreakdown.find(p => p.type === 'Air')?.value || 100);
  const economicData = generateEconomicData(selectedCity.riskScore);
  const futureData = generateFutureData(selectedCity.pollutionBreakdown.find(p => p.type === 'Air')?.value || 100);

  // Ensure data is fresh on mount
  useEffect(() => {
    setForecastData(generateForecast());
  }, []);

  const handleSearch = (term: string) => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const city = Object.values(CITIES).find(c => c.name.toLowerCase().includes(term.toLowerCase()));
      if (city) {
        setSelectedCity(city);
        setForecastData(generateForecast());
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 relative min-h-screen pb-20">
      {/* Teleport Feature */}
      <TeleportView currentMode={viewMode} onModeChange={setViewMode} />

      <div className="text-center space-y-4 mb-12 pt-8">
        <h2 className="text-neon-cyan font-orbitron text-xs tracking-[0.5em] uppercase animate-pulse">
          System Online // {viewMode.toUpperCase()} MODE ACTIVE
        </h2>
      </div>

      {/* Only show City Input in City Mode */}
      {viewMode === 'City' && <CityInput onSearch={handleSearch} className="mb-12" />}

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
          <p className="text-neon-cyan font-orbitron animate-pulse">RECALIBRATING SENSORS...</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-baseline gap-4 border-b border-white/10 pb-4">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white uppercase">
              {selectedCity.name}
            </h1>
            <span className="text-gray-500 font-mono">{selectedCity.coordinates.join(', ')}</span>
          </div>

          {/* GRID LAYOUT FOR ADVANCED FEATURES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Overview + Crisis */}
            <div className="space-y-8">
              <CityOverview data={selectedCity} />
              <CityCrisisPredictor data={crisisData} />
            </div>

            {/* Middle Col: Forecast + Health + Economic */}
            <div className="space-y-8">
               <PollutionCharts breakdown={selectedCity.pollutionBreakdown} forecast={forecastData} />
               <HealthImpactPanel data={healthData} />
               <EconomicLossCalculator data={economicData} />
            </div>

            {/* Right Col: Solutions + Future Sim */}
            <div className="space-y-8">
               <Future2050Simulation data={futureData} />
               
               <div>
                <h3 className="text-gray-400 font-orbitron text-xl mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-green rounded-full" />
                  RECOMMENDED INTERVENTIONS
                </h3>
                <div className="space-y-4">
                  {Object.entries(SOLUTIONS).flatMap(([type, items]) => 
                    items.slice(0, 1).map((item, i) => ( // Show limited solutions to save space
                      <SolutionCard 
                        key={`${type}-${i}`} 
                        {...item} 
                        type={type} 
                        index={i} 
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      )}

      <AetherAssistant />
    </div>
  );
}
