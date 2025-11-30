export type PollutionType = 'Air' | 'Water' | 'Soil' | 'Noise' | 'Heat' | 'Traffic' | 'Industrial';

export interface PollutionData {
  type: PollutionType;
  value: number; // 0-100
  unit: string;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
  trend: 'up' | 'down' | 'stable';
}

export interface CityData {
  id: string;
  name: string;
  coordinates: [number, number];
  riskScore: number;
  category: 'Low' | 'Medium' | 'High' | 'Extreme';
  pollutionBreakdown: PollutionData[];
  disasterRisk: {
    type: string;
    probability: number; // 0-100
    impact: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
  };
  explanation: string;
}

export const MOCK_POLLUTION_BREAKDOWN: PollutionData[] = [
  { type: 'Air', value: 120, unit: 'AQI', status: 'Unhealthy', trend: 'up' },
  { type: 'Noise', value: 75, unit: 'dB', status: 'Moderate', trend: 'stable' },
  { type: 'Water', value: 60, unit: 'WQI', status: 'Moderate', trend: 'down' },
  { type: 'Heat', value: 38, unit: '°C', status: 'Unhealthy', trend: 'up' },
  { type: 'Traffic', value: 80, unit: 'Index', status: 'Unhealthy', trend: 'up' },
  { type: 'Industrial', value: 65, unit: 'Index', status: 'Moderate', trend: 'stable' },
  { type: 'Soil', value: 50, unit: 'SQI', status: 'Good', trend: 'down' },
];

export const DEMO_CITY_DATA: CityData = {
  id: "demo",
  name: "SYSTEM DEMO SIMULATION",
  coordinates: [20.5937, 78.9629],
  riskScore: 65,
  category: "Medium",
  pollutionBreakdown: MOCK_POLLUTION_BREAKDOWN,
  disasterRisk: {
    type: "Monsoon Surge",
    probability: 45,
    impact: "Medium",
    description: "Simulated data pattern indicating seasonal variability."
  },
  explanation: "Running demonstration simulation. All systems active and monitoring mock telemetry."
};

export const CITIES: Record<string, CityData> = {
  "New Delhi": {
    id: "delhi",
    name: "New Delhi",
    coordinates: [28.6139, 77.2090],
    riskScore: 92,
    category: "Extreme",
    pollutionBreakdown: [
      { type: 'Air', value: 450, unit: 'AQI', status: 'Hazardous', trend: 'up' },
      { type: 'Noise', value: 85, unit: 'dB', status: 'Unhealthy', trend: 'stable' },
      { type: 'Water', value: 65, unit: 'WQI', status: 'Moderate', trend: 'down' },
      { type: 'Heat', value: 42, unit: '°C', status: 'Unhealthy', trend: 'up' },
      { type: 'Traffic', value: 88, unit: 'Index', status: 'Hazardous', trend: 'up' },
      { type: 'Industrial', value: 75, unit: 'Index', status: 'Unhealthy', trend: 'stable' },
      { type: 'Soil', value: 55, unit: 'SQI', status: 'Moderate', trend: 'down' },
    ],
    disasterRisk: {
      type: "Heatwave",
      probability: 85,
      impact: "Critical",
      description: "Severe heat island effect exacerbating pollution retention."
    },
    explanation: "Topography traps pollutants; heavy vehicular density and industrial emissions contribute to severe AQI levels."
  },
  "Mumbai": {
    id: "mumbai",
    name: "Mumbai",
    coordinates: [19.0760, 72.8777],
    riskScore: 78,
    category: "High",
    pollutionBreakdown: [
      { type: 'Air', value: 180, unit: 'AQI', status: 'Unhealthy', trend: 'up' },
      { type: 'Noise', value: 90, unit: 'dB', status: 'Hazardous', trend: 'up' },
      { type: 'Water', value: 80, unit: 'WQI', status: 'Unhealthy', trend: 'stable' },
      { type: 'Heat', value: 35, unit: '°C', status: 'Moderate', trend: 'up' },
      { type: 'Traffic', value: 95, unit: 'Index', status: 'Hazardous', trend: 'up' },
      { type: 'Industrial', value: 60, unit: 'Index', status: 'Moderate', trend: 'down' },
      { type: 'Soil', value: 40, unit: 'SQI', status: 'Good', trend: 'stable' },
    ],
    disasterRisk: {
      type: "Flood",
      probability: 75,
      impact: "High",
      description: "Coastal proximity and drainage issues create high flood risk during monsoons."
    },
    explanation: "Construction dust and coastal humidity mix with vehicular exhaust."
  },
  "Bengaluru": {
    id: "bengaluru",
    name: "Bengaluru",
    coordinates: [12.9716, 77.5946],
    riskScore: 65,
    category: "Medium",
    pollutionBreakdown: [
      { type: 'Air', value: 110, unit: 'AQI', status: 'Moderate', trend: 'up' },
      { type: 'Traffic', value: 98, unit: 'Index', status: 'Hazardous', trend: 'up' },
      { type: 'Water', value: 75, unit: 'WQI', status: 'Unhealthy', trend: 'up' },
      { type: 'Noise', value: 70, unit: 'dB', status: 'Moderate', trend: 'stable' },
      { type: 'Heat', value: 32, unit: '°C', status: 'Good', trend: 'up' },
      { type: 'Industrial', value: 45, unit: 'Index', status: 'Good', trend: 'stable' },
      { type: 'Soil', value: 50, unit: 'SQI', status: 'Moderate', trend: 'down' },
    ],
    disasterRisk: {
      type: "Urban Flood",
      probability: 60,
      impact: "Medium",
      description: "Loss of wetlands leads to urban flooding during heavy rains."
    },
    explanation: "Exponential vehicle growth causes traffic-related emissions despite better airflow."
  },
  "Berhampur": {
    id: "berhampur",
    name: "Berhampur",
    coordinates: [19.3149, 84.7941],
    riskScore: 58,
    category: "Medium",
    pollutionBreakdown: [
      { type: 'Air', value: 95, unit: 'AQI', status: 'Moderate', trend: 'stable' },
      { type: 'Water', value: 85, unit: 'WQI', status: 'Unhealthy', trend: 'up' },
      { type: 'Soil', value: 60, unit: 'SQI', status: 'Moderate', trend: 'stable' },
      { type: 'Noise', value: 65, unit: 'dB', status: 'Moderate', trend: 'down' },
      { type: 'Heat', value: 36, unit: '°C', status: 'Unhealthy', trend: 'up' },
      { type: 'Traffic', value: 70, unit: 'Index', status: 'Moderate', trend: 'up' },
      { type: 'Industrial', value: 40, unit: 'Index', status: 'Good', trend: 'stable' },
    ],
    disasterRisk: {
      type: "Cyclone",
      probability: 80,
      impact: "High",
      description: "High vulnerability to Bay of Bengal cyclones impacting coastal infrastructure."
    },
    explanation: "Coastal humidity traps particulate matter; rapid urbanization stressing water quality and waste management systems."
  }
};

export const SOLUTIONS = {
  Air: [
    { title: "Smog Tower Deployment", impact: "High", cost: "$$$", time: "6mo" },
    { title: "EV Zone Mandate", impact: "Medium", cost: "$", time: "1mo" },
    { title: "Vertical Garden Corridors", impact: "Low", cost: "$$", time: "3mo" }
  ],
  Water: [
    { title: "River Aeration Systems", impact: "High", cost: "$$$", time: "1yr" },
    { title: "Industrial Effluent Sensors", impact: "Medium", cost: "$$", time: "2mo" }
  ],
  Traffic: [
    { title: "AI Signal Synchronization", impact: "High", cost: "$$", time: "3mo" },
    { title: "Congestion Pricing Zone", impact: "Medium", cost: "$", time: "1mo" }
  ]
};

export const generateForecast = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 100) + 100 + (i > 8 && i < 20 ? 50 : 0) // Peak hours
    });
  }
  return data;
};

export const GUARDIAN_STATUS = {
  Air: { status: "ONLINE", load: 85, efficiency: 92 },
  Water: { status: "ONLINE", load: 60, efficiency: 88 },
  Soil: { status: "ONLINE", load: 45, efficiency: 95 },
  Heat: { status: "ONLINE", load: 70, efficiency: 90 },
  Traffic: { status: "ONLINE", load: 95, efficiency: 78 },
  Industry: { status: "ONLINE", load: 55, efficiency: 85 },
  Disaster: { status: "ACTIVE", load: 30, efficiency: 99 },
  Energy: { status: "OPTIMAL", load: 80, efficiency: 94 }
};
