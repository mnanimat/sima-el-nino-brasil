export type SectorType = 'all' | 'satellite' | 'aviation' | 'housing' | 'transport';

export type RegionId = 'sul' | 'sudeste' | 'centro_oeste' | 'nordeste' | 'norte';

export type RiskLevel = 'baixo' | 'moderado' | 'alto' | 'critico';

export interface SatelliteTelemetry {
  satelliteId: string;
  name: string;
  mission: string;
  launchDate: string;
  orbitType: string;
  altitudeKm: number;
  speedKmS: number;
  inclinationDeg: number;
  orbitalPeriodMin: number;
  batteryLevelPct: number;
  solarPanelStatus: 'nominal' | 'eclipse' | 'peak';
  sensorCryoTempC: number;
  downlinkStatus: 'transmitting' | 'standby' | 'reorienting';
  downlinkRateMbps: number;
  activeGroundStation: string;
  currentLat: number;
  currentLng: number;
  currentSwathZone: string;
  sarMode: 'InSAR_Displacement' | 'SAR_L_Band_Flood' | 'Thermal_SWIR_Drought' | 'Optical_Multispectral_Smoke';
}

export interface SatelliteObservation {
  id: string;
  timestamp: string;
  targetRegion: RegionId;
  locationName: string;
  sensorType: string;
  primaryAnomaly: string;
  displacementMmOrLevel: string;
  waterSurfaceAreaKm2?: number;
  smokeAerosolOpticalDepth?: number;
  severity: RiskLevel;
  confidencePct: number;
  aiInterpretation: string;
  coordinates: { lat: number; lng: number };
}

export interface SatellitePass {
  passId: string;
  orbitNumber: number;
  scheduledTime: string;
  targetRegion: string;
  durationSeconds: number;
  sensorPayload: string;
  taskStatus: 'concluded' | 'in_progress' | 'scheduled';
}

export interface Hotspot {
  id: string;
  name: string;
  state: string;
  region: RegionId;
  sector: 'aviation' | 'housing' | 'transport' | 'multi';
  lat: number;
  lng: number;
  xSvg: number; // percentage coordinates for customized Brazil SVG map
  ySvg: number;
  riskLevel: RiskLevel;
  primaryThreat: string;
  description: string;
  historicalPrecedent: string;
  activeMeasures: string[];
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
    isCritical?: boolean;
  }[];
  contingencyHub?: string;
  civilDefenseLevel: string;
  satelliteData?: {
    lastSarPass: string;
    soilMoisturePct: number;
    slopeCreepRateMmDay: number;
    floodInundationRadiusKm: number;
  };
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  elNinoPattern: string;
  mainThreats: string[];
  vulnerabilityIndex: number; // 0 to 100
  activeHotspotsCount: number;
  aviationStatus: {
    status: RiskLevel;
    impactSummary: string;
    monitoredAirports: number;
    delayProbability: number;
  };
  housingStatus: {
    status: RiskLevel;
    impactSummary: string;
    slopesMonitored: number;
    familiesInRiskZones: number;
  };
  transportStatus: {
    status: RiskLevel;
    impactSummary: string;
    criticalHighwaysKm: number;
    riverDroughtLevel?: string;
  };
}

export interface AlertItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  sector: 'aviation' | 'housing' | 'transport';
  region: RegionId;
  severity: RiskLevel;
  location: string;
  affectedAssets: string[];
  recommendedAction: string;
  isSimulated?: boolean;
  acknowledged?: boolean;
}

export interface SimulationParams {
  intensity: 'fraco' | 'moderado' | 'forte' | 'super';
  season: 'primavera_verao' | 'outono_inverno';
  preventionLevel: 'baixo' | 'moderado' | 'alto' | 'avancado';
  targetRegion: RegionId | 'nacional';
}

export interface SimulationResult {
  flightsImpacted: number;
  flightsSavedByContingency: number;
  housingRiskUnits: number;
  housingProtectedUnits: number;
  roadKmBlocked: number;
  roadKmSavedByDrainage: number;
  riverDroughtDropMeters: number;
  estimatedLossWithoutPlanBrlMillions: number;
  estimatedLossWithPlanBrlMillions: number;
  netSavingsBrlMillions: number;
  timeToRecoverDays: number;
  chartData: {
    month: string;
    semPlano: number;
    comPlanoSIMA: number;
    precipitacaoMm: number;
  }[];
}

export interface PreventionMeasure {
  id: string;
  title: string;
  sector: 'aviation' | 'housing' | 'transport' | 'transversal';
  category: 'estrutural' | 'tecnologica' | 'operacional' | 'politica_publica';
  summary: string;
  howItWorks: string;
  implementationCost: 'Baixo' | 'Médio' | 'Alto' | 'Muito Alto';
  timeframe: 'Imediato (1-30 dias)' | 'Médio Prazo (3-6 meses)' | 'Longo Prazo (1-2 anos)';
  efficiencyRate: string;
  brazilianStandardOrLaw: string;
  realWorldApplication: string;
}

export interface ContingencyPlan {
  title: string;
  summary: string;
  phases: {
    phase: string;
    actions: string[];
  }[];
  technologies: string[];
  kpis: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface NewsGroundingSource {
  title?: string;
  url: string;
}

export interface EmergencyNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl?: string;
  publishedTime: string;
  region: RegionId | 'nacional';
  sector: 'aviation' | 'housing' | 'transport' | 'meteorologia' | 'defesa_civil' | 'geral';
  severity: 'critico' | 'alto' | 'moderado' | 'informativo';
  impactTag?: string;
  isRealTimeGoogleSearch?: boolean;
  groundingSources?: NewsGroundingSource[];
}
