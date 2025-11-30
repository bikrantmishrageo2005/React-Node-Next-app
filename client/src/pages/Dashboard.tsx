import { useState, useEffect } from "react";
import CityInput from "@/components/dashboard/CityInput";
import CityOverview from "@/components/dashboard/CityOverview";
import PollutionCharts from "@/components/dashboard/PollutionCharts";
import SolutionCard from "@/components/dashboard/SolutionCard";
import AetherAssistant from "@/components/ai/AetherAssistant";
import { CITIES, generateForecast, SOLUTIONS, CityData } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(CITIES["New Delhi"]);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial load
    setForecastData(generateForecast());
  }, []);

  const handleSearch = (term: string) => {
    setLoading(true);
    // Simulate network delay for "Scanning" effect
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
    <div className="space-y-8 relative">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-neon-cyan font-orbitron text-xs tracking-[0.5em] uppercase animate-pulse">System Online // Connected to Satellite Link</h2>
      </div>

      <CityInput onSearch={handleSearch} className="mb-12" />

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
          <p className="text-neon-cyan font-orbitron animate-pulse">SCANNING REGIONAL DATA...</p>
        </div>
      ) : selectedCity ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Title Section */}
          <div className="flex items-baseline gap-4 border-b border-white/10 pb-4">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white uppercase">
              {selectedCity.name}
            </h1>
            <span className="text-gray-500 font-mono">{selectedCity.coordinates.join(', ')}</span>
          </div>

          {/* Part 1: Overview */}
          <CityOverview data={selectedCity} />

          {/* Part 2: Prediction Engine */}
          <div className="relative">
             <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-purple to-transparent opacity-50" />
             <h3 className="text-gray-400 font-orbitron text-xl mb-6 pl-4">FUTURE PREDICTION ENGINE</h3>
             <PollutionCharts breakdown={selectedCity.pollutionBreakdown} forecast={forecastData} />
          </div>

          {/* Part 3 & 4: Solutions & Action Plan */}
          <div>
            <h3 className="text-gray-400 font-orbitron text-xl mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-green rounded-full" />
              RECOMMENDED INTERVENTIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(SOLUTIONS).flatMap(([type, items]) => 
                items.map((item, i) => (
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

        </motion.div>
      ) : (
        <div className="text-center text-gray-500 font-orbitron mt-20">
          AWAITING TARGET INPUT
        </div>
      )}

      <AetherAssistant />
    </div>
  );
}
