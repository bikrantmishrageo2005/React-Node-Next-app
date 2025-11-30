import { 
  Smile, 
  Frown, 
  Meh, 
  Angry, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShieldAlert,
  Leaf,
  Zap,
  Activity
} from "lucide-react";

// FEATURE A: Citizen Live Sentiment
export type SentimentType = 'Happy' | 'Neutral' | 'Worried' | 'Stressed' | 'Angry';

export interface SentimentData {
  mood: SentimentType;
  score: number; // 0-100
  summary: string;
}

export const generateSentimentData = (riskScore: number): SentimentData => {
  let mood: SentimentType = 'Neutral';
  let summary = "Citizens are generally content with current conditions.";

  if (riskScore > 80) {
    mood = 'Angry';
    summary = "Public outcry over hazardous air quality and health risks is peaking.";
  } else if (riskScore > 60) {
    mood = 'Stressed';
    summary = "Growing anxiety regarding persistent smog and traffic congestion.";
  } else if (riskScore > 40) {
    mood = 'Worried';
    summary = "Moderate concern about rising pollution trends.";
  } else if (riskScore < 20) {
    mood = 'Happy';
    summary = "Positive feedback on recent green initiatives and clear skies.";
  }

  return {
    mood,
    score: Math.max(0, 100 - riskScore + Math.floor(Math.random() * 10 - 5)),
    summary
  };
};

// FEATURE B: Crime-Pollution Link
export interface CrimeLinkData {
  crimeRiskIndex: number; // 0-100
  correlationFactors: {
    traffic: number; // 0-100 impact
    heat: number;
    nightPollution: number;
  };
  trend: { pollution: number; crime: number }[]; // for graph
  explanation: string;
}

export const generateCrimeLinkData = (riskScore: number, heatIndex: number): CrimeLinkData => {
  const crimeIndex = Math.min(100, (riskScore * 0.4) + (heatIndex * 0.3) + 20);
  
  return {
    crimeRiskIndex: Math.floor(crimeIndex),
    correlationFactors: {
      traffic: Math.floor(riskScore * 0.8),
      heat: Math.floor(heatIndex * 0.9),
      nightPollution: Math.floor(riskScore * 0.6)
    },
    trend: [
      { pollution: 40, crime: 30 },
      { pollution: 55, crime: 45 },
      { pollution: 70, crime: 60 },
      { pollution: 85, crime: 75 },
      { pollution: 60, crime: 50 }
    ],
    explanation: "High heat stress and traffic congestion correlate with increased irritability and lower police response times, slightly elevating localized crime risk."
  };
};

// FEATURE C: Disaster Aftershock Tracker
export type DisasterType = 'Flood' | 'Cyclone' | 'Earthquake' | 'Heatwave';

export interface AftershockData {
  disasterType: DisasterType;
  recoveryDays: number;
  impacts: {
    airSpike: number; // % increase
    waterContamination: number; // % increase
    wasteDebris: number; // tons
  };
  timeline: { phase: string; pollutionLevel: number }[];
  aiText: string;
}

export const generateAftershockData = (riskScore: number): AftershockData => ({
  disasterType: riskScore > 70 ? 'Flood' : 'Heatwave',
  recoveryDays: Math.floor(riskScore / 5),
  impacts: {
    airSpike: Math.floor(riskScore * 0.5),
    waterContamination: Math.floor(riskScore * 0.8),
    wasteDebris: Math.floor(riskScore * 10)
  },
  timeline: [
    { phase: 'Before', pollutionLevel: 40 },
    { phase: 'Event', pollutionLevel: 95 },
    { phase: 'Day 1', pollutionLevel: 85 },
    { phase: 'Day 3', pollutionLevel: 70 },
    { phase: 'Day 7', pollutionLevel: 55 },
    { phase: 'Recovery', pollutionLevel: 45 }
  ],
  aiText: "Projected recovery timeline suggests normalization of environmental parameters within 14 days post-event."
});

// FEATURE D: Green Budget Planner
export interface BudgetPlan {
  budget: number; // in Crores
  reductionPotential: number; // %
  actions: string[];
  summary: string;
}

export const generateBudgetPlan = (budget: number): BudgetPlan => {
  let reduction = 0;
  let actions: string[] = [];
  let summary = "";

  if (budget < 100) {
    reduction = 5;
    actions = ["Public Awareness Campaigns", "Traffic Signal Optimization", "Waste Segregation Pilots"];
    summary = "Small investment focuses on behavioral change and efficiency.";
  } else if (budget < 500) {
    reduction = 15;
    actions = ["EV Charging Network", "Urban Tree Plantation", "Road Dust Vacuums"];
    summary = "Moderate investment allows for infrastructure improvements and green cover expansion.";
  } else {
    reduction = 35;
    actions = ["Mass Rapid Transit Expansion", "Industrial Green Zones", "River Purification Plants", "Subsidy for EV Transition"];
    summary = "High investment enables structural transformation and significant long-term pollution reduction.";
  }

  return {
    budget,
    reductionPotential: reduction,
    actions,
    summary
  };
};
