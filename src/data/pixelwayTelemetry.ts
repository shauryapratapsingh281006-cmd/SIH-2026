// ══════════════════════════════════════════════════════════════════════════
// PIXELWAY REAL-TIME OPERATIONS TELEMETRY DATA ARCHITECTURE
// All datasets are realistic mock structures prepared for immediate API swap
// ══════════════════════════════════════════════════════════════════════════

export type OperationalStatus = 'critical' | 'warning' | 'safe' | 'neutral';

export interface MetricCardData {
  id: string;
  telemetryCode: string;
  label: string;
  numericTarget: number;
  displayValue: string;
  unit?: string;
  change: string;
  status: OperationalStatus;
  trend: number[];
  accentColor: string;
  subMeta: string;
}

export interface ForecastPoint {
  day: string;
  timestamp?: string;
  uttarakhand: number;
  assam: number;
  kerala: number;
  odisha: number;
  // Metadata for advanced tooltips
  uttarakhandDelta?: string;
  assamDelta?: string;
  keralaDelta?: string;
  odishaDelta?: string;
}

export interface RegionalRiskItem {
  region: string;
  stateCode: string;
  riskScore: number; // 0 - 100
  signalIntensity: number; // dB or %
  status: OperationalStatus;
  statusLabel: string;
  activeAlerts: number;
  primaryThreat: string;
  hydrologicalVariance: string;
  seismicIndex: string;
  sensorCount: number;
}

export interface ResponseActivityPoint {
  time: string;
  incomingReports: number;
  verifiedIncidents: number;
  responseDeployments: number;
}

export interface AlertCategoryItem {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
  trend: string;
}

export interface IncidentEvent {
  id: string;
  timestamp: string;
  location: string;
  state: string;
  incidentType: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  verificationStatus: 'VERIFIED' | 'MONITORING' | 'IN_TRIAGE' | 'DISPATCHED';
  coordinates: string;
  signalConfidence: number; // percentage
}

export interface ReadinessAsset {
  id: string;
  name: string;
  percentage: number;
  activeUnits: string;
  totalCapacity: string;
  trendDelta: string;
  isPositive: boolean;
  status: 'OPTIMAL' | 'ELEVATED' | 'STRAINED';
  agencyLead: string;
  accentColor: string;
}

export interface RadarTargetNode {
  id: string;
  label: string;
  state: string;
  coordinates: [number, number]; // Lat, Lng
  azimuthDeg: number;
  distanceKm: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
  threatType: string;
  pulseSpeed: number;
  svgPos: { cx: number; cy: number };
}

export interface PipelineStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  metrics: string;
  metricLabel: string;
  status: 'NOMINAL' | 'ACTIVE' | 'PROCESSING';
  latency: string;
}

// ──────────────────────────────────────────────────────────────────────────
// 1. KPI / INTELLIGENCE CARDS (Card 1 to 4)
// ──────────────────────────────────────────────────────────────────────────
export const KPI_METRICS: MetricCardData[] = [
  {
    id: 'active-alerts',
    telemetryCode: 'ALR-01',
    label: 'ACTIVE ALERTS',
    numericTarget: 47,
    displayValue: '47',
    change: '+3 since 06:00',
    status: 'critical',
    trend: [22, 28, 31, 35, 38, 44, 47],
    accentColor: '#EF4444',
    subMeta: '7 High-Priority Escalations',
  },
  {
    id: 'population-monitored',
    telemetryCode: 'POP-02',
    label: 'POPULATION MONITORED',
    numericTarget: 2.4,
    displayValue: '2.4M',
    unit: 'M',
    change: 'In 5 declared red zones',
    status: 'neutral',
    trend: [1.8, 1.9, 2.1, 2.2, 2.3, 2.38, 2.4],
    accentColor: '#3B82F6',
    subMeta: 'Satellite Geospatial Tracking',
  },
  {
    id: 'risk-index',
    telemetryCode: 'RSK-03',
    label: 'RISK INDEX',
    numericTarget: 7.2,
    displayValue: '7.2 / 10',
    change: '+0.4 elevated risk',
    status: 'warning',
    trend: [5.6, 6.0, 6.2, 6.5, 6.8, 7.0, 7.2],
    accentColor: '#F59E0B',
    subMeta: 'Composite Saturation Score',
  },
  {
    id: 'response-readiness',
    telemetryCode: 'RED-04',
    label: 'RESPONSE READINESS',
    numericTarget: 83,
    displayValue: '83%',
    unit: '%',
    change: '38 partner teams active',
    status: 'safe',
    trend: [72, 74, 77, 79, 81, 82, 83],
    accentColor: '#10B981',
    subMeta: '12 Quick-Deployment Batches',
  },
];

// ──────────────────────────────────────────────────────────────────────────
// 2. MAIN 7-DAY DISASTER PROBABILITY FORECAST
// ──────────────────────────────────────────────────────────────────────────
export const FORECAST_7D: ForecastPoint[] = [
  {
    day: 'Mon',
    uttarakhand: 38,
    assam: 44,
    kerala: 28,
    odisha: 22,
    uttarakhandDelta: '+2.1%',
    assamDelta: '+1.8%',
    keralaDelta: '+0.9%',
    odishaDelta: '-0.5%',
  },
  {
    day: 'Tue',
    uttarakhand: 45,
    assam: 51,
    kerala: 34,
    odisha: 26,
    uttarakhandDelta: '+7.0%',
    assamDelta: '+7.0%',
    keralaDelta: '+6.0%',
    odishaDelta: '+4.0%',
  },
  {
    day: 'Wed',
    uttarakhand: 54,
    assam: 58,
    kerala: 42,
    odisha: 31,
    uttarakhandDelta: '+9.0%',
    assamDelta: '+7.0%',
    keralaDelta: '+8.0%',
    odishaDelta: '+5.0%',
  },
  {
    day: 'Thu',
    uttarakhand: 61,
    assam: 64,
    kerala: 49,
    odisha: 36,
    uttarakhandDelta: '+7.0%',
    assamDelta: '+6.0%',
    keralaDelta: '+7.0%',
    odishaDelta: '+5.0%',
  },
  {
    day: 'Fri',
    uttarakhand: 68,
    assam: 62,
    kerala: 57,
    odisha: 42,
    uttarakhandDelta: '+7.0%',
    assamDelta: '-2.0%',
    keralaDelta: '+8.0%',
    odishaDelta: '+6.0%',
  },
  {
    day: 'Sat',
    uttarakhand: 76,
    assam: 72,
    kerala: 64,
    odisha: 48,
    uttarakhandDelta: '+8.0%',
    assamDelta: '+10.0%',
    keralaDelta: '+7.0%',
    odishaDelta: '+6.0%',
  },
  {
    day: 'Sun',
    uttarakhand: 82,
    assam: 79,
    kerala: 69,
    odisha: 53,
    uttarakhandDelta: '+6.0%',
    assamDelta: '+7.0%',
    keralaDelta: '+5.0%',
    odishaDelta: '+5.0%',
  },
];

// 24H telemetry slice
export const FORECAST_24H: ForecastPoint[] = [
  { day: '00:00', uttarakhand: 64, assam: 58, kerala: 52, odisha: 38 },
  { day: '04:00', uttarakhand: 68, assam: 60, kerala: 54, odisha: 39 },
  { day: '08:00', uttarakhand: 72, assam: 65, kerala: 59, odisha: 41 },
  { day: '12:00', uttarakhand: 77, assam: 69, kerala: 63, odisha: 45 },
  { day: '16:00', uttarakhand: 80, assam: 74, kerala: 67, odisha: 49 },
  { day: '20:00', uttarakhand: 82, assam: 78, kerala: 69, odisha: 52 },
  { day: '24:00', uttarakhand: 84, assam: 79, kerala: 71, odisha: 54 },
];

// Live telemetry slice
export const FORECAST_LIVE: ForecastPoint[] = [
  { day: '-60m', uttarakhand: 79, assam: 76, kerala: 67, odisha: 51 },
  { day: '-50m', uttarakhand: 80, assam: 76, kerala: 68, odisha: 51 },
  { day: '-40m', uttarakhand: 81, assam: 77, kerala: 68, odisha: 52 },
  { day: '-30m', uttarakhand: 81, assam: 78, kerala: 69, odisha: 53 },
  { day: '-20m', uttarakhand: 82, assam: 78, kerala: 69, odisha: 53 },
  { day: '-10m', uttarakhand: 83, assam: 79, kerala: 70, odisha: 54 },
  { day: 'Now', uttarakhand: 84, assam: 79, kerala: 71, odisha: 54 },
];

// ──────────────────────────────────────────────────────────────────────────
// 3. REGIONAL RISK SIGNALS
// ──────────────────────────────────────────────────────────────────────────
export const REGIONAL_RISK_DATA: RegionalRiskItem[] = [
  {
    region: 'Uttarakhand',
    stateCode: 'UK',
    riskScore: 84,
    signalIntensity: 92,
    status: 'critical',
    statusLabel: 'CRITICAL',
    activeAlerts: 14,
    primaryThreat: 'Slope Saturation / Landslide',
    hydrologicalVariance: '+4.8σ',
    seismicIndex: 'IV-Elevated',
    sensorCount: 148,
  },
  {
    region: 'Assam',
    stateCode: 'AS',
    riskScore: 76,
    signalIntensity: 85,
    status: 'critical',
    statusLabel: 'HIGH',
    activeAlerts: 12,
    primaryThreat: 'Riverine Flash Flooding',
    hydrologicalVariance: '+3.9σ',
    seismicIndex: 'II-Guarded',
    sensorCount: 112,
  },
  {
    region: 'Kerala',
    stateCode: 'KL',
    riskScore: 68,
    signalIntensity: 74,
    status: 'warning',
    statusLabel: 'ELEVATED',
    activeAlerts: 9,
    primaryThreat: 'Catchment Inundation',
    hydrologicalVariance: '+3.1σ',
    seismicIndex: 'I-Nominal',
    sensorCount: 96,
  },
  {
    region: 'Odisha',
    stateCode: 'OD',
    riskScore: 54,
    signalIntensity: 62,
    status: 'warning',
    statusLabel: 'MODERATE',
    activeAlerts: 6,
    primaryThreat: 'Coastal Tidal Surge',
    hydrologicalVariance: '+2.1σ',
    seismicIndex: 'I-Nominal',
    sensorCount: 84,
  },
  {
    region: 'Bihar',
    stateCode: 'BR',
    riskScore: 42,
    signalIntensity: 48,
    status: 'neutral',
    statusLabel: 'GUARDED',
    activeAlerts: 4,
    primaryThreat: 'Embankment Seepage',
    hydrologicalVariance: '+1.4σ',
    seismicIndex: 'I-Nominal',
    sensorCount: 72,
  },
  {
    region: 'West Bengal',
    stateCode: 'WB',
    riskScore: 36,
    signalIntensity: 41,
    status: 'safe',
    statusLabel: 'LOW',
    activeAlerts: 2,
    primaryThreat: 'Deltaic Drainage Sluggishness',
    hydrologicalVariance: '+0.8σ',
    seismicIndex: 'I-Nominal',
    sensorCount: 65,
  },
];

// ──────────────────────────────────────────────────────────────────────────
// 4. RESPONSE ACTIVITY (24-Hour Timeline)
// ──────────────────────────────────────────────────────────────────────────
export const RESPONSE_ACTIVITY_DATA: ResponseActivityPoint[] = [
  { time: '00:00', incomingReports: 42, verifiedIncidents: 18, responseDeployments: 12 },
  { time: '04:00', incomingReports: 58, verifiedIncidents: 24, responseDeployments: 16 },
  { time: '08:00', incomingReports: 145, verifiedIncidents: 62, responseDeployments: 41 },
  { time: '12:00', incomingReports: 198, verifiedIncidents: 88, responseDeployments: 59 },
  { time: '16:00', incomingReports: 172, verifiedIncidents: 79, responseDeployments: 52 },
  { time: '20:00', incomingReports: 130, verifiedIncidents: 58, responseDeployments: 44 },
  { time: '24:00', incomingReports: 95, verifiedIncidents: 47, responseDeployments: 38 },
];

// ──────────────────────────────────────────────────────────────────────────
// 5. ALERT DISTRIBUTION (Total: 47 Active Alerts)
// ──────────────────────────────────────────────────────────────────────────
export const ALERT_DISTRIBUTION_DATA: AlertCategoryItem[] = [
  {
    id: 'flood',
    name: 'Flood',
    count: 19,
    percentage: 40.4,
    color: '#3B82F6',
    description: 'Riverine overflow & flash catchment surge',
    trend: '+4 in last 6h',
  },
  {
    id: 'landslide',
    name: 'Landslide',
    count: 11,
    percentage: 23.4,
    color: '#EF4444',
    description: 'Debris flow & steep slope saturation',
    trend: '+2 in last 6h',
  },
  {
    id: 'cyclone',
    name: 'Cyclone',
    count: 7,
    percentage: 14.9,
    color: '#06B6D4',
    description: 'Deep maritime depression & high squall gusts',
    trend: 'Stable',
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    count: 4,
    percentage: 8.5,
    color: '#F59E0B',
    description: 'Minor seismic tremor & micro-cracking events',
    trend: 'No change',
  },
  {
    id: 'heat',
    name: 'Heat',
    count: 3,
    percentage: 6.4,
    color: '#F97316',
    description: 'Severe thermal wet-bulb index anomaly',
    trend: '-1 from yesterday',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    count: 3,
    percentage: 6.4,
    color: '#8B5CF6',
    description: 'Bridge scour, embankment strain & culvert breach',
    trend: '+1 new report',
  },
];

// ──────────────────────────────────────────────────────────────────────────
// 6. LIVE INCIDENT FEED (Initial items + Simulated stream pool)
// ──────────────────────────────────────────────────────────────────────────
export const INITIAL_INCIDENTS: IncidentEvent[] = [
  {
    id: 'inc-101',
    timestamp: '08:42',
    location: 'Dehradun, Uttarakhand',
    state: 'Uttarakhand',
    incidentType: 'Flood signal detected',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    coordinates: '30.3165° N, 78.0322° E',
    signalConfidence: 96.8,
  },
  {
    id: 'inc-102',
    timestamp: '08:37',
    location: 'Guwahati, Assam',
    state: 'Assam',
    incidentType: 'River level anomaly',
    severity: 'MEDIUM',
    verificationStatus: 'MONITORING',
    coordinates: '26.1445° N, 91.7362° E',
    signalConfidence: 91.2,
  },
  {
    id: 'inc-103',
    timestamp: '08:31',
    location: 'Kochi, Kerala',
    state: 'Kerala',
    incidentType: 'Heavy rainfall cluster',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    coordinates: '9.9312° N, 76.2673° E',
    signalConfidence: 94.5,
  },
  {
    id: 'inc-104',
    timestamp: '08:24',
    location: 'Joshimath, Uttarakhand',
    state: 'Uttarakhand',
    incidentType: 'Ground displacement warning',
    severity: 'CRITICAL',
    verificationStatus: 'DISPATCHED',
    coordinates: '30.5550° N, 79.5660° E',
    signalConfidence: 99.1,
  },
  {
    id: 'inc-105',
    timestamp: '08:18',
    location: 'Silchar, Assam',
    state: 'Assam',
    incidentType: 'Embankment seepage telemetry',
    severity: 'MEDIUM',
    verificationStatus: 'IN_TRIAGE',
    coordinates: '24.8270° N, 92.7970° E',
    signalConfidence: 88.7,
  },
];

export const SIMULATED_INCIDENTS_POOL: Omit<IncidentEvent, 'id' | 'timestamp'>[] = [
  {
    location: 'Wayanad, Kerala',
    state: 'Kerala',
    incidentType: 'Slope saturation threshold crossed',
    severity: 'CRITICAL',
    verificationStatus: 'VERIFIED',
    coordinates: '11.6854° N, 76.1320° E',
    signalConfidence: 98.4,
  },
  {
    location: 'Puri Coast, Odisha',
    state: 'Odisha',
    incidentType: 'Tidal surge elevation alert',
    severity: 'HIGH',
    verificationStatus: 'MONITORING',
    coordinates: '19.8135° N, 85.8312° E',
    signalConfidence: 93.1,
  },
  {
    location: 'Rishikesh, Uttarakhand',
    state: 'Uttarakhand',
    incidentType: 'Ganga discharge rate spike',
    severity: 'HIGH',
    verificationStatus: 'VERIFIED',
    coordinates: '30.0869° N, 78.2676° E',
    signalConfidence: 97.2,
  },
  {
    location: 'Darbhanga, Bihar',
    state: 'Bihar',
    incidentType: 'Culvert block & runoff backup',
    severity: 'MEDIUM',
    verificationStatus: 'IN_TRIAGE',
    coordinates: '26.1542° N, 85.8918° E',
    signalConfidence: 89.6,
  },
  {
    location: 'Dibrugarh, Assam',
    state: 'Assam',
    incidentType: 'Brahmaputra bank erosion alert',
    severity: 'CRITICAL',
    verificationStatus: 'DISPATCHED',
    coordinates: '27.4728° N, 94.9120° E',
    signalConfidence: 98.9,
  },
  {
    location: 'Idukki, Kerala',
    state: 'Kerala',
    incidentType: 'Reservoir inflow spike (+18%)',
    severity: 'HIGH',
    verificationStatus: 'MONITORING',
    coordinates: '9.8494° N, 76.9710° E',
    signalConfidence: 95.0,
  },
  {
    location: 'Balasore, Odisha',
    state: 'Odisha',
    incidentType: 'Squall line wind anomaly (78 km/h)',
    severity: 'MEDIUM',
    verificationStatus: 'VERIFIED',
    coordinates: '21.4934° N, 86.9135° E',
    signalConfidence: 92.4,
  },
];

// ──────────────────────────────────────────────────────────────────────────
// 7. RESPONSE READINESS ASSETS
// ──────────────────────────────────────────────────────────────────────────
export const RESPONSE_READINESS_DATA: ReadinessAsset[] = [
  {
    id: 'medical-teams',
    name: 'Medical teams',
    percentage: 83,
    activeUnits: '24 / 29 Active',
    totalCapacity: '4,200 Triaged/Day',
    trendDelta: '+4.2%',
    isPositive: true,
    status: 'OPTIMAL',
    agencyLead: 'NDRF Medical / Armed Forces Corps',
    accentColor: '#10B981',
  },
  {
    id: 'rescue-teams',
    name: 'Rescue teams',
    percentage: 76,
    activeUnits: '38 / 50 Deployed',
    totalCapacity: '620 Amphibious Units',
    trendDelta: '+1.8%',
    isPositive: true,
    status: 'OPTIMAL',
    agencyLead: 'State Disaster Response Force (SDRF)',
    accentColor: '#3B82F6',
  },
  {
    id: 'transport',
    name: 'Transport',
    percentage: 91,
    activeUnits: '142 / 156 Operational',
    totalCapacity: '1,800 MT Transit Lift',
    trendDelta: '+6.5%',
    isPositive: true,
    status: 'OPTIMAL',
    agencyLead: 'Logistics Relief Fleet',
    accentColor: '#06B6D4',
  },
  {
    id: 'relief-supplies',
    name: 'Relief supplies',
    percentage: 68,
    activeUnits: '18 Hubs Stocked',
    totalCapacity: '72,000 Emergency Rations',
    trendDelta: '-2.4%',
    isPositive: false,
    status: 'ELEVATED',
    agencyLead: 'National Supply Depot Network',
    accentColor: '#F59E0B',
  },
  {
    id: 'shelter-capacity',
    name: 'Shelter capacity',
    percentage: 72,
    activeUnits: '52 Shelters Ready',
    totalCapacity: '38,500 Beds Available',
    trendDelta: '+3.1%',
    isPositive: true,
    status: 'OPTIMAL',
    agencyLead: 'District Emergency Command Centers',
    accentColor: '#8B5CF6',
  },
];

// ──────────────────────────────────────────────────────────────────────────
// 8. ABSTRACT RADAR GEOSPATIAL TARGETS (SVG coordinates in 300x300 canvas)
// ──────────────────────────────────────────────────────────────────────────
export const RADAR_TARGETS: RadarTargetNode[] = [
  {
    id: 'tgt-uk-1',
    label: 'Joshimath',
    state: 'Uttarakhand',
    coordinates: [30.555, 79.566],
    azimuthDeg: 345,
    distanceKm: 84,
    severity: 'CRITICAL',
    threatType: 'Landslide',
    pulseSpeed: 1.2,
    svgPos: { cx: 135, cy: 68 },
  },
  {
    id: 'tgt-as-1',
    label: 'Silchar',
    state: 'Assam',
    coordinates: [24.827, 92.797],
    azimuthDeg: 62,
    distanceKm: 168,
    severity: 'CRITICAL',
    threatType: 'Flash Flood',
    pulseSpeed: 1.4,
    svgPos: { cx: 228, cy: 92 },
  },
  {
    id: 'tgt-kl-1',
    label: 'Wayanad',
    state: 'Kerala',
    coordinates: [11.685, 76.132],
    azimuthDeg: 215,
    distanceKm: 142,
    severity: 'HIGH',
    threatType: 'Slope Saturation',
    pulseSpeed: 1.6,
    svgPos: { cx: 82, cy: 220 },
  },
  {
    id: 'tgt-od-1',
    label: 'Puri Coast',
    state: 'Odisha',
    coordinates: [19.813, 85.831],
    azimuthDeg: 128,
    distanceKm: 120,
    severity: 'HIGH',
    threatType: 'Tidal Surge',
    pulseSpeed: 1.8,
    svgPos: { cx: 212, cy: 198 },
  },
  {
    id: 'tgt-br-1',
    label: 'Patna Basin',
    state: 'Bihar',
    coordinates: [25.594, 85.137],
    azimuthDeg: 35,
    distanceKm: 110,
    severity: 'MEDIUM',
    threatType: 'Riverine Stage',
    pulseSpeed: 2.2,
    svgPos: { cx: 178, cy: 112 },
  },
  {
    id: 'tgt-wb-1',
    label: 'Siliguri Cor.',
    state: 'West Bengal',
    coordinates: [26.727, 88.395],
    azimuthDeg: 42,
    distanceKm: 135,
    severity: 'SAFE',
    threatType: 'Telemetry Clear',
    pulseSpeed: 2.8,
    svgPos: { cx: 195, cy: 80 },
  },
];

// ──────────────────────────────────────────────────────────────────────────
// 9. OPERATIONAL DATA FLOW PIPELINE
// ──────────────────────────────────────────────────────────────────────────
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'stage-ground',
    stepNumber: '01',
    title: 'GROUND REPORTS',
    subtitle: 'Crowdsourced & IoT mesh',
    metrics: '1,420 / min',
    metricLabel: 'Ingest Rate',
    status: 'ACTIVE',
    latency: '8ms',
  },
  {
    id: 'stage-verification',
    stepNumber: '02',
    title: 'DATA VERIFICATION',
    subtitle: 'Cross-sensor validation',
    metrics: '99.2%',
    metricLabel: 'Confidence Score',
    status: 'ACTIVE',
    latency: '14ms',
  },
  {
    id: 'stage-ai-engine',
    stepNumber: '03',
    title: 'AI RISK ENGINE',
    subtitle: 'Predictive multi-hazard model',
    metrics: 'v3.2 @ 91.4%',
    metricLabel: 'Model Certainty',
    status: 'ACTIVE',
    latency: '34ms',
  },
  {
    id: 'stage-triage',
    stepNumber: '04',
    title: 'TRIAGE',
    subtitle: 'Priority queue & hazard matrix',
    metrics: '47 Queues',
    metricLabel: 'Active Routing',
    status: 'ACTIVE',
    latency: '12ms',
  },
  {
    id: 'stage-dispatch',
    stepNumber: '05',
    title: 'RESPONSE DISPATCH',
    subtitle: 'Direct responder coordination',
    metrics: '38 Teams',
    metricLabel: 'Frontline Deployed',
    status: 'ACTIVE',
    latency: 'Realtime',
  },
];
