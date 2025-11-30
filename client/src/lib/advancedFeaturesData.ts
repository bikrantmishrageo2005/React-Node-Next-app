import { 
  Heart,
  Activity, 
  Eye, 
  Thermometer, 
  Baby, 
  User, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  Globe,
  Calendar,
  Clock,
  MapPin
} from "lucide-react";

// --- TELEPORT TYPES ---
export type ViewMode = 'City' | 'State' | 'India' | 'Asia' | 'World';

export const GLOBAL_HOTSPOTS = [
  { name: "New Delhi", lat: 28.61, lng: 77.20, aqi: 450 },
  { name: "Beijing", lat: 39.90, lng: 116.40, aqi: 180 },
  { name: "Los Angeles", lat: 34.05, lng: -118.24, aqi: 85 },
  { name: "Tokyo", lat: 35.67, lng: 139.65, aqi: 65 },
  { name: "London", lat: 51.50, lng: -0.12, aqi: 45 },
  { name: "Dubai", lat: 25.20, lng: 55.27, aqi: 120 },
  { name: "Mumbai", lat: 19.07, lng: 72.87, aqi: 160 },
  { name: "New York", lat: 40.71, lng: -74.00, aqi: 55 }
];

// --- HEALTH IMPACT TYPES ---
export interface HealthImpactData {
  asthmaRisk: number; // %
  lungDamageRisk: number; // %
  heartStressRisk: number; // %
  eyeIrritation: 'Low' | 'Moderate' | 'High' | 'Severe';
  heatStrokeRisk: number; // %
  childHazardScore: number; // 0-100
  elderlyHazardScore: number; // 0-100
  overallIndex: number; // 0-100
}

export const generateHealthData = (aqi: number): HealthImpactData => ({
  asthmaRisk: Math.min(95, Math.floor(aqi / 3)),
  lungDamageRisk: Math.min(90, Math.floor(aqi / 4)),
  heartStressRisk: Math.min(85, Math.floor(aqi / 5)),
  eyeIrritation: aqi > 300 ? 'Severe' : aqi > 200 ? 'High' : aqi > 100 ? 'Moderate' : 'Low',
  heatStrokeRisk: Math.floor(Math.random() * 40),
  childHazardScore: Math.min(99, Math.floor(aqi / 2.5)),
  elderlyHazardScore: Math.min(99, Math.floor(aqi / 2.2)),
  overallIndex: Math.min(100, Math.floor(aqi / 3.5))
});

// --- ECONOMIC LOSS TYPES ---
export interface EconomicData {
  dailyLoss: number; // in Crores
  healthcareCost: number; // in Crores
  productivityLoss: number; // %
  industryShutdownLoss: number; // in Crores
  transportDelayLoss: number; // in Crores
  seasonalDamage: number; // in Crores
  sectorDistribution: { name: string; value: number }[];
}

export const generateEconomicData = (riskScore: number): EconomicData => ({
  dailyLoss: Math.floor(riskScore * 1.5),
  healthcareCost: Math.floor(riskScore * 0.8),
  productivityLoss: Math.floor(riskScore / 3),
  industryShutdownLoss: Math.floor(riskScore * 2.5),
  transportDelayLoss: Math.floor(riskScore * 0.5),
  seasonalDamage: Math.floor(riskScore * 10),
  sectorDistribution: [
    { name: 'Healthcare', value: 30 },
    { name: 'Transport', value: 20 },
    { name: 'Industry', value: 35 },
    { name: 'Agriculture', value: 15 }
  ]
});

// --- FUTURE 2050 TYPES ---
export interface FutureData {
  year: number;
  aqi: number;
  heatRise: number; // degrees C
  populationDensity: number; // growth %
  greenCover: number; // % change
  floodRisk: number; // %
  survivabilityIndex: number; // 0-100
}

export const generateFutureData = (baseAqi: number): FutureData[] => [
  { year: 2024, aqi: baseAqi, heatRise: 0, populationDensity: 0, greenCover: 0, floodRisk: 20, survivabilityIndex: 85 },
  { year: 2030, aqi: baseAqi * 1.2, heatRise: 0.5, populationDensity: 10, greenCover: -5, floodRisk: 35, survivabilityIndex: 75 },
  { year: 2040, aqi: baseAqi * 1.5, heatRise: 1.2, populationDensity: 25, greenCover: -15, floodRisk: 55, survivabilityIndex: 60 },
  { year: 2050, aqi: baseAqi * 1.8, heatRise: 2.1, populationDensity: 45, greenCover: -30, floodRisk: 80, survivabilityIndex: 45 },
];

// --- CRISIS PREDICTOR TYPES ---
export interface CrisisData {
  dangerScore: number; // 0-100
  extremePollutionProb: number; // %
  heatwaveProb: number; // %
  floodProb: number; // %
  forecast72h: number[]; // risk scores
  forecast7d: number[]; // risk scores
  explanation: string;
}

export const generateCrisisData = (baseRisk: number): CrisisData => ({
  dangerScore: Math.min(100, baseRisk + 10),
  extremePollutionProb: Math.min(99, baseRisk + 15),
  heatwaveProb: Math.floor(Math.random() * 60),
  floodProb: Math.floor(Math.random() * 50),
  forecast72h: [baseRisk, baseRisk + 5, baseRisk - 2],
  forecast7d: Array(7).fill(0).map(() => Math.min(100, Math.max(0, baseRisk + Math.floor(Math.random() * 20 - 10)))),
  explanation: "Confluence of high pressure system and industrial output creating critical stagnation."
});
