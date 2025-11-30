import { useState, useEffect } from "react";
import CityInput from "@/components/dashboard/CityInput";
import CityOverview from "@/components/dashboard/CityOverview";
import PollutionCharts from "@/components/dashboard/PollutionCharts";
import SolutionCard from "@/components/dashboard/SolutionCard";
import { CITIES, DEMO_CITY_DATA, generateForecast, SOLUTIONS, CityData } from "@/lib/mockData";
import { motion } from "framer-motion";

import CityCrisisPredictor from "@/components/advanced/CityCrisisPredictor";
import HealthImpactPanel from "@/components/advanced/HealthImpactPanel";
import EconomicLossCalculator from "@/components/advanced/EconomicLossCalculator";
import Future2050Simulation from "@/components/advanced/Future2050Simulation";

import CitizenSentimentRadar from "@/components/smart-city/CitizenSentimentRadar";
import CrimePollutionLink from "@/components/smart-city/CrimePollutionLink";
import DisasterAftershockTracker from "@/components/smart-city/DisasterAftershockTracker";
import GreenBudgetPlanner from "@/components/smart-city/GreenBudgetPlanner";
import EmergencyCommandMode from "@/components/smart-city/EmergencyCommandMode";

import { 
  generateCrisisData, 
  generateHealthData, 
  generateEconomicData, 
  generateFutureData 
} from "@/lib/advancedFeaturesData";

import {
  generateSentimentData,
  generateCrimeLinkData,
  generateAftershockData
} from "@/lib/smartCityFeatures";

export default function CityControlHub() {
  const [selectedCity, setSelectedCity] = useState<CityData>(DEMO_CITY_DATA);
  const [forecastData, setForecastData] = useState<any[]>(generateForecast());
  const [loading, setLoading] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Derived Data
  const crisisData = generateCrisisData(selectedCity.riskScore);
  const healthData = generateHealthData(selectedCity.pollutionBreakdown.find(p => p.type === 'Air')?.value || 100);
  const economicData = generateEconomicData(selectedCity.riskScore);
  const futureData = generateFutureData(selectedCity.pollutionBreakdown.find(p => p.type === 'Air')?.value || 100);

  const sentimentData = generateSentimentData(selectedCity.riskScore);
  const crimeData = generateCrimeLinkData(selectedCity.riskScore, selectedCity.pollutionBreakdown.find(p => p.type === 'Heat')?.value || 30);
  const aftershockData = generateAftershockData(selectedCity.riskScore);

  useEffect(() => {
    setForecastData(generateForecast());
  }, []);

  const handleSearch = (term: string) => {
    setLoading(true);
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
    <div className={`space-y-8 relative transition-colors duration-500 ${emergencyMode ? 'bg-neon-red/5' : ''}`}>
      <div className="text-center space-y-4 mb-12 pt-8">
        <h2 className={`font-orbitron text-xs tracking-[0.5em] uppercase animate-pulse ${emergencyMode ? 'text-neon-red' : 'text-neon-cyan'}`}>
          System Online // CITY CONTROL HUB
        </h2>
      </div>

      <CityInput onSearch={handleSearch} className="mb-12" />

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
          <p className="text-neon-cyan font-orbitron animate-pulse">Recalibrating Sensors...</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="flex items-baseline gap-4 border-b border-white/10 pb-4">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white uppercase">
              {selectedCity.name === "SYSTEM DEMO SIMULATION" ? "Smart City Intelligence Overview" : selectedCity.name}
            </h1>
            <span className="text-gray-500 font-mono">{selectedCity.coordinates.join(', ')}</span>
          </div>

          {/* Emergency Command Toggle */}
          <EmergencyCommandMode active={emergencyMode} onToggle={() => setEmergencyMode(!emergencyMode)} />

          {/* MAIN DASHBOARD GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left Col: Overview + Crisis */}
            <div className="space-y-5">
              <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-gray-400 font-orbitron text-lg mb-4 tracking-wider">City Overview</h3>
                <CityOverview data={selectedCity} />
              </div>
              <CityCrisisPredictor data={crisisData} />
              <CitizenSentimentRadar data={sentimentData} />
            </div>

            {/* Middle Col: Forecast + Health + Economic */}
            <div className="space-y-5">
               <div className="glass-panel p-6 rounded-xl">
                 <h3 className="text-gray-400 font-orbitron text-lg mb-4 tracking-wider">Real-time Forecast</h3>
                 <PollutionCharts breakdown={selectedCity.pollutionBreakdown} forecast={forecastData} />
               </div>
               <HealthImpactPanel data={healthData} />
               <CrimePollutionLink data={crimeData} />
               <EconomicLossCalculator data={economicData} />
            </div>

            {/* Right Col: Solutions + Future Sim */}
            <div className="space-y-5">
               <Future2050Simulation data={futureData} />
               <DisasterAftershockTracker data={aftershockData} />
               <GreenBudgetPlanner />
               
               <div className="glass-panel p-6 rounded-xl">
                <h3 className="text-gray-400 font-orbitron text-xl mb-6 flex items-center gap-2 tracking-wider">
                  <span className="w-2 h-2 bg-neon-green rounded-full" />
                  Recommended Interventions
                </h3>
                <div className="space-y-4">
                  {Object.entries(SOLUTIONS).flatMap(([type, items]) => 
                    items.slice(0, 2).map((item, i) => ( 
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
    </div>
  );
}
