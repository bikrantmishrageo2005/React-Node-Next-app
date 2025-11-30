import { 
  CloudFog, 
  Droplets, 
  Sprout, 
  Volume2, 
  ThermometerSun, 
  Car, 
  Factory,
  Activity,
  AlertTriangle,
  Wind
} from "lucide-react";

// Types
export type PollutionCategory = 'Air' | 'Water' | 'Soil' | 'Noise' | 'Heat' | 'Traffic' | 'Industrial';

export interface PollutionDetail {
  index: number;
  naturalCauses: string[];
  humanCauses: string[];
  solutions: {
    immediate: string[];
    longTerm: string[];
    policy: string;
    aiAction: string;
  };
}

export interface StateData {
  id: string;
  name: string;
  coordinates: [number, number]; // Lat, Lng
  pollutionRank: number; // 1-36
  overallScore: number; // 0-100
  disasterRisk: number; // 0-100
  weather: {
    temp: number;
    humidity: number;
  };
  pollutants: {
    aqi: number;
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
  };
  indices: {
    Air: PollutionDetail;
    Water: PollutionDetail;
    Soil: PollutionDetail;
    Noise: PollutionDetail;
    Heat: PollutionDetail;
    Traffic: PollutionDetail;
    Industrial: PollutionDetail;
  };
}

// --- MOCK DATA GENERATOR ---

const STATES_LIST = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", 
  "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const POLLUTION_TYPES: PollutionCategory[] = ['Air', 'Water', 'Soil', 'Noise', 'Heat', 'Traffic', 'Industrial'];

const SOLUTIONS_DB = {
  Air: {
    immediate: ["Smog Tower Deployment", "Water Sprinkling", "Construction Ban"],
    longTerm: ["Green Cover Expansion", "EV Transition Mandate", "Renewable Energy Grid"],
    policy: "National Clean Air Program 2.0",
    aiAction: "Automated Industrial Shutdown Trigger"
  },
  Water: {
    immediate: ["River Aeration", "Effluent Treatment Checks", "Plastic Ban Enforcement"],
    longTerm: ["River Rejuvenation Projects", "Smart Sewage Networks", "Wetland Restoration"],
    policy: "Jal Jeevan Mission + AI",
    aiAction: "Real-time Contamination Alert System"
  },
  Soil: {
    immediate: ["Bio-remediation", "Waste Segregation Drives", "Chemical Fertilizer Ban"],
    longTerm: ["Organic Farming Corridors", "Landfill Mining", "Soil Health Cards"],
    policy: "Soil Health Management Scheme",
    aiAction: "Drone-based Soil Nutrient Mapping"
  },
  Noise: {
    immediate: ["Silence Zone Enforcement", "Traffic Calming", "Construction Curfew"],
    longTerm: ["Sound Barrier Installation", "Quiet Pavement Tech", "Urban Zoning Reform"],
    policy: "Noise Pollution (Regulation and Control) Rules",
    aiAction: "Dynamic Traffic Noise Cancellation Arrays"
  },
  Heat: {
    immediate: ["Cool Shelters", "Water Misting Stations", "Work Hour Adjustment"],
    longTerm: ["Urban Forest Corridors", "Cool Roof Mandates", "Lake Restoration"],
    policy: "Heat Action Plan 2.0",
    aiAction: "Predictive Heatwave Early Warning"
  },
  Traffic: {
    immediate: ["Odd-Even Rule", "Signal Synchronization", "Carpool Incentives"],
    longTerm: ["Metro Network Expansion", "Hyperloop Corridors", "Dedicated Cycle Tracks"],
    policy: "National Urban Transport Policy",
    aiAction: "AI-Driven Traffic Flow Optimization"
  },
  Industrial: {
    immediate: ["Emission Cap Enforcement", "Waste Audits", "Filter Upgrades"],
    longTerm: ["Industrial Park Relocation", "Green Manufacturing Incentives", "Carbon Trading"],
    policy: "Industrial Pollution Control Act",
    aiAction: "Smart Factory Emission Monitoring"
  }
};

const generatePollutionDetail = (type: PollutionCategory, baseScore: number): PollutionDetail => ({
  index: Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 20 - 10))),
  naturalCauses: ["Seasonal Variations", "Geographical Trap", "Climate Patterns"],
  humanCauses: ["Urbanization", "Industrial Activity", "Vehicular Emissions"],
  solutions: SOLUTIONS_DB[type]
});

export const INDIA_STATES_DATA: Record<string, StateData> = {};

STATES_LIST.forEach((state, index) => {
  const baseScore = Math.floor(Math.random() * 60) + 30; // Random base score 30-90
  
  INDIA_STATES_DATA[state] = {
    id: state.toLowerCase().replace(/ /g, '-'),
    name: state,
    coordinates: [20 + Math.random() * 10, 78 + Math.random() * 10], // Mock coords
    pollutionRank: index + 1,
    overallScore: baseScore,
    disasterRisk: Math.floor(Math.random() * 100),
    weather: {
      temp: Math.floor(Math.random() * 15) + 25,
      humidity: Math.floor(Math.random() * 40) + 40,
    },
    pollutants: {
      aqi: baseScore * 2 + Math.floor(Math.random() * 50),
      pm25: baseScore + Math.floor(Math.random() * 20),
      pm10: baseScore * 1.5 + Math.floor(Math.random() * 30),
      no2: Math.floor(Math.random() * 50),
      so2: Math.floor(Math.random() * 30),
      co: Math.floor(Math.random() * 10),
    },
    indices: {
      Air: generatePollutionDetail('Air', baseScore),
      Water: generatePollutionDetail('Water', baseScore),
      Soil: generatePollutionDetail('Soil', baseScore),
      Noise: generatePollutionDetail('Noise', baseScore),
      Heat: generatePollutionDetail('Heat', baseScore),
      Traffic: generatePollutionDetail('Traffic', baseScore),
      Industrial: generatePollutionDetail('Industrial', baseScore),
    }
  };
});

export const ICONS_MAP = {
  Air: CloudFog,
  Water: Droplets,
  Soil: Sprout,
  Noise: Volume2,
  Heat: ThermometerSun,
  Traffic: Car,
  Industrial: Factory
};
