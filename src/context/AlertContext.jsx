import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// Default initial disaster threats detected by the Pixelway Risk Engine
export const INITIAL_ALERTS = [
  {
    id: 'alert-wayanad-01',
    title: 'Flood risk detected',
    hazardType: 'Flash Flood Warning',
    hazardCategory: 'hydrological',
    regionId: 'kerala',
    location: 'Wayanad, Kerala',
    zone: 'Western Ghats Highland',
    explanation: 'Heavy rainfall is creating a high probability of rapid flooding in the monitored area.',
    timeEstimate: '45 min',
    impactWindow: '18:30 – 21:00 IST',
    probability: 87,
    severity: 'CRITICAL', // 'CRITICAL' | 'HIGH' | 'MODERATE' | 'RESOLVED'
    state: 'NEW', // 'NEW' | 'ESCALATING' | 'ONGOING' | 'RESOLVED'
    actionRecommendation: 'Move to higher ground',
    actionSubtext: 'Avoid low-lying riverbanks, culverts, and vulnerable slope routes.',
    officialNotice: 'Follow instructions from local disaster management authorities (NDRF / SDMA).',
    evacuationInfo: {
      available: true,
      title: 'Wayanad Emergency Relief Corridor',
      district: 'Wayanad District, Kerala',
      emergencyHelpline: '1077 / 04936-204151',
      ndrfUnit: '4th Battalion NDRF (Unit Bravo)',
      stagingCentres: [
        { name: 'Kalpetta Higher Secondary Relief Hub', capacity: '450 persons', status: 'OPEN & EQUIPPED', dist: '3.2 km' },
        { name: 'Mananthavady St. Joseph Community Hall', capacity: '600 persons', status: 'OPEN & EQUIPPED', dist: '5.8 km' },
        { name: 'Vythiri Higher Primary Safe Staging Point', capacity: '300 persons', status: 'PREPARED', dist: '7.1 km' }
      ],
      safeRoutes: [
        'Primary: NH-766 Highway Corridor (Vythiri to Kalpetta) — High Clearance Recommended',
        'Secondary: Meppadi Upper Ridge Bypass (Avoid lower forest dip)'
      ],
      criticalChecklist: [
        'Secure waterproof emergency pouch with ID documents & medications',
        'Keep mobile devices charged and switch to low-power emergency telemetry mode',
        'Do not attempt to cross flooded causeways or underpasses',
        'Signal distress location via Pixelway SOS or direct SDMA line 1077'
      ]
    },
    metrics: {
      precipitation: '142 mm / 3h',
      waterDischarge: '+2.4 m/s',
      soilSaturation: '89.4%',
      sensorConfidence: '99.2%'
    },
    timestamp: new Date().toISOString(),
    updatedSecondsAgo: 14,
  },
  {
    id: 'alert-joshimath-02',
    title: 'Landslide risk detected',
    hazardType: 'Landslide Probability Warning',
    hazardCategory: 'geological',
    regionId: 'uttarakhand',
    location: 'Joshimath, Uttarakhand',
    zone: 'Himalayan Ridge Zone V',
    explanation: 'Deep slope saturation and ground subsidence indicate elevated debris displacement probability.',
    timeEstimate: '90 min',
    impactWindow: '19:00 – 23:30 IST',
    probability: 91,
    severity: 'CRITICAL',
    state: 'ESCALATING',
    actionRecommendation: 'Evacuate red-sector structures',
    actionSubtext: 'Move perpendicular to slope flow vector towards designated assembly zones.',
    officialNotice: 'Follow instructions from District Disaster Management Authority (DDMA Chamoli).',
    evacuationInfo: {
      available: true,
      title: 'Joshimath High-Ridge Evacuation Plan',
      district: 'Chamoli District, Uttarakhand',
      emergencyHelpline: '1070 / 01372-251010',
      ndrfUnit: '8th Battalion NDRF Dispatch',
      stagingCentres: [
        { name: 'Auli High Ground Safe Encampment', capacity: '750 persons', status: 'READY', dist: '4.1 km' },
        { name: 'Ravigram State Guest House Transit Facility', capacity: '350 persons', status: 'OPEN', dist: '1.9 km' }
      ],
      safeRoutes: [
        'Upper Sector Ridge Highway towards Pipalkoti Staging',
        'Avoid Sunil Ward lower embankment paths'
      ],
      criticalChecklist: [
        'Shut off domestic gas lines and main electrical breakers before departure',
        'Carry high-visibility torches and thermal emergency blankets',
        'Report structural fissures to DDMA emergency team immediately'
      ]
    },
    metrics: {
      fissureRate: '+3.8 mm/h',
      slopeIncline: '42°',
      moistureIndex: '94.1%',
      sensorConfidence: '98.7%'
    },
    timestamp: new Date(Date.now() - 120000).toISOString(),
    updatedSecondsAgo: 38,
  },
  {
    id: 'alert-assam-03',
    title: 'River flood risk detected',
    hazardType: 'Riverine Flood Stage Advisory',
    hazardCategory: 'hydrological',
    regionId: 'assam',
    location: 'Silchar, Assam',
    zone: 'Barak Valley Basin',
    explanation: 'Barak river telemetry has breached the danger line with upstream runoff surge continuing.',
    timeEstimate: '3 hours',
    impactWindow: '21:00 – 04:00 IST',
    probability: 76,
    severity: 'HIGH',
    state: 'ONGOING',
    actionRecommendation: 'Prepare for embankment overflow',
    actionSubtext: 'Move livestock and valuables to upper tiers; secure emergency rations.',
    officialNotice: 'Follow instructions from Assam State Disaster Management Authority (ASDMA).',
    evacuationInfo: {
      available: true,
      title: 'Silchar Urban & Rural Flood Response',
      district: 'Cachar District, Assam',
      emergencyHelpline: '1079 / 03842-245866',
      ndrfUnit: '1st Battalion NDRF Guwahati Support',
      stagingCentres: [
        { name: 'Silchar Polytechnic Relief Camp', capacity: '1,200 persons', status: 'OPEN', dist: '2.5 km' },
        { name: 'Tarapur Railway High School Staging Hub', capacity: '800 persons', status: 'OPEN', dist: '3.8 km' }
      ],
      safeRoutes: [
        'Rangirkhari High Road toward Cachar College bypass',
        'Avoid Annapurna Ghat link road'
      ],
      criticalChecklist: [
        'Stock 72-hour potable drinking water and water-purification tablets',
        'Store dry food rations in sealed waterproof containers',
        'Follow official ASDMA community wireless broadcasts'
      ]
    },
    metrics: {
      gaugeLevel: '+1.94m above danger',
      inflowVelocity: '3.1 m/s',
      catchmentRain: '185 mm',
      sensorConfidence: '99.5%'
    },
    timestamp: new Date(Date.now() - 360000).toISOString(),
    updatedSecondsAgo: 62,
  },
  {
    id: 'alert-odisha-04',
    title: 'Cyclone watch detected',
    hazardType: 'Cyclonic Surge Watch',
    hazardCategory: 'meteorological',
    regionId: 'odisha',
    location: 'Puri Coast, Odisha',
    zone: 'Bay of Bengal Littoral',
    explanation: 'Deep coastal depression generating 75 km/h sustained gusts with potential storm surge.',
    timeEstimate: '5 hours',
    impactWindow: '23:00 – 06:00 IST',
    probability: 71,
    severity: 'HIGH',
    state: 'ONGOING',
    actionRecommendation: 'Stay away from coastal fronts',
    actionSubtext: 'Secure loose external structures; fishermen strictly advised not to venture into sea.',
    officialNotice: 'Follow instructions from Odisha State Disaster Management Authority (OSDMA).',
    evacuationInfo: {
      available: true,
      title: 'Puri Multi-Purpose Cyclone Shelter Network',
      district: 'Puri District, Odisha',
      emergencyHelpline: '1077 / 06752-223230',
      ndrfUnit: '3rd Battalion NDRF Mundali',
      stagingCentres: [
        { name: 'Brahmagiri Multi-Purpose Cyclone Shelter', capacity: '1,500 persons', status: 'READY', dist: '6.0 km' },
        { name: 'Chakratirtha Coastal Shelter Unit 3', capacity: '900 persons', status: 'READY', dist: '1.2 km' }
      ],
      safeRoutes: [
        'Puri-Bhubaneswar National Highway (NH-316)',
        'Inland Bypass away from Marine Drive'
      ],
      criticalChecklist: [
        'Tape or shutter large glass windows facing windward side',
        'Keep emergency battery radio tuned to All India Radio Puri',
        'Keep emergency lighting and power banks charged'
      ]
    },
    metrics: {
      windGusts: '78 km/h',
      seaWaveHeight: '4.2 m',
      pressureDeficit: '994 hPa',
      sensorConfidence: '97.8%'
    },
    timestamp: new Date(Date.now() - 600000).toISOString(),
    updatedSecondsAgo: 85,
  }
];

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAlertCenterOpen, setIsAlertCenterOpen] = useState(false);
  const [evacuationModalAlert, setEvacuationModalAlert] = useState(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [focusedMapZone, setFocusedMapZone] = useState('kerala');
  const [mapPulseTrigger, setMapPulseTrigger] = useState(0);
  const [telemetryTick, setTelemetryTick] = useState(0);

  const audioCtxRef = useRef(null);

  // Play subtle enterprise emergency acoustic tone
  const playAlertChime = useCallback((severity = 'CRITICAL') => {
    if (!isSoundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      const freq1 = severity === 'CRITICAL' ? 880 : severity === 'HIGH' ? 660 : 520;
      const freq2 = severity === 'CRITICAL' ? 1760 : severity === 'HIGH' ? 1320 : 1040;

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(freq1, now);
      osc1.frequency.exponentialRampToValueAtTime(freq2, now + 0.08);

      osc2.frequency.setValueAtTime(freq2, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(freq1, now + 0.16);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.16);
      osc2.stop(now + 0.28);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [isSoundEnabled]);

  // Live seconds ticker to keep live telemetry updating dynamically
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update relative updatedSecondsAgo dynamically
  useEffect(() => {
    setAlerts((prev) =>
      prev.map((a) => ({
        ...a,
        updatedSecondsAgo: (a.updatedSecondsAgo || 0) + 1,
      }))
    );
  }, [telemetryTick]);

  // The currently focused active alert
  const currentAlert = alerts[activeAlertIndex] || alerts[0] || null;

  // Active (non-resolved) alerts count
  const activeAlerts = alerts.filter((a) => a.severity !== 'RESOLVED');
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;
  const highCount = alerts.filter((a) => a.severity === 'HIGH').length;
  const resolvedCount = alerts.filter((a) => a.severity === 'RESOLVED').length;

  // Has critical alert active right now
  const hasCriticalAlert = !isDismissed && currentAlert && currentAlert.severity === 'CRITICAL';

  // Navigate between alerts in stack
  const nextAlert = useCallback(() => {
    setActiveAlertIndex((prev) => (prev + 1) % alerts.length);
  }, [alerts.length]);

  const prevAlert = useCallback(() => {
    setActiveAlertIndex((prev) => (prev - 1 + alerts.length) % alerts.length);
  }, [alerts.length]);

  const selectAlertById = useCallback((id) => {
    const idx = alerts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      setActiveAlertIndex(idx);
      setIsDismissed(false);
    }
  }, [alerts]);

  // Trigger a new emergency alert from the engine
  const triggerAlert = useCallback((newAlertData) => {
    const newAlert = {
      id: `alert-${Date.now()}`,
      hazardType: newAlertData.hazardType || 'CRITICAL HAZARD DETECTED',
      hazardCategory: newAlertData.hazardCategory || 'environmental',
      regionId: newAlertData.regionId || 'kerala',
      location: newAlertData.location || 'Monitored Region',
      zone: newAlertData.zone || 'Target Basin',
      explanation: newAlertData.explanation || 'Elevated risk parameters detected by satellite telemetry & sensor network.',
      timeEstimate: newAlertData.timeEstimate || '30 minutes',
      impactWindow: newAlertData.impactWindow || 'Imminent Window',
      probability: newAlertData.probability || 88,
      severity: newAlertData.severity || 'CRITICAL',
      state: 'NEW',
      actionRecommendation: newAlertData.actionRecommendation || 'FOLLOW LOCAL EVACUATION ORDERS',
      actionSubtext: newAlertData.actionSubtext || 'Move away from hazardous zone and monitor official broadcasts.',
      officialNotice: newAlertData.officialNotice || 'Follow instructions from local disaster management authorities.',
      evacuationInfo: newAlertData.evacuationInfo || {
        available: true,
        title: `${newAlertData.location || 'Regional'} Emergency Action Plan`,
        district: newAlertData.location || 'Local District',
        emergencyHelpline: '1077 (Toll Free) / 112',
        ndrfUnit: 'Regional Disaster Response Force',
        stagingCentres: [
          { name: 'District Emergency Staging Complex', capacity: '500 persons', status: 'OPEN & EQUIPPED', dist: '2.8 km' },
          { name: 'Municipal Multi-Purpose Shelter Hub', capacity: '800 persons', status: 'ACTIVE', dist: '4.5 km' }
        ],
        safeRoutes: [
          'Primary High-Ridge Evacuation Arterial',
          'Avoid Low-Lying Riverine Crossings'
        ],
        criticalChecklist: [
          'Pack vital identity documents & medications',
          'Maintain emergency power bank charge',
          'Heed instructions from local emergency wardens'
        ]
      },
      metrics: newAlertData.metrics || {
        telemetryTrend: 'Sharp Spurt',
        sensorConfidence: '99.1%'
      },
      timestamp: new Date().toISOString(),
      updatedSecondsAgo: 2,
    };

    setAlerts((prev) => [newAlert, ...prev.filter((a) => a.id !== newAlert.id)]);
    setActiveAlertIndex(0);
    setIsDismissed(false);
    playAlertChime(newAlert.severity);
  }, [playAlertChime]);

  // Escalate an existing alert intelligently (instead of spamming duplicate popups)
  const escalateAlert = useCallback((id = null, newProb = 96, newTime = '25 minutes') => {
    const targetId = id || (currentAlert ? currentAlert.id : alerts[0]?.id);
    if (!targetId) return;

    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === targetId) {
          return {
            ...a,
            state: 'ESCALATING',
            severity: 'CRITICAL',
            probability: Math.min(99, newProb),
            timeEstimate: newTime,
            explanation: `[ESCALATION TELEMETRY] Hydro-meteorological sensor inflow has intensified rapidly. Impact probability elevated to ${newProb}%.`,
            actionRecommendation: 'IMMEDIATE EVACUATION REQUIRED — MOVE TO HIGH GROUND',
            updatedSecondsAgo: 0,
          };
        }
        return a;
      })
    );

    setIsDismissed(false);
    playAlertChime('CRITICAL');
  }, [alerts, currentAlert, playAlertChime]);

  // Resolve a threat cleanly
  const resolveAlert = useCallback((id = null) => {
    const targetId = id || (currentAlert ? currentAlert.id : alerts[0]?.id);
    if (!targetId) return;

    const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === targetId) {
          return {
            ...a,
            severity: 'RESOLVED',
            state: 'RESOLVED',
            resolvedAt: `RESOLVED · ${timeString} IST`,
            resolvedSummary: `Risk parameters for ${a.location} have returned below the critical threshold. Field telemetry normalized.`,
            actionRecommendation: 'CONDITIONS STABILIZING — AWAIT OFFICIAL ALL-CLEAR NOTICE',
            probability: 14,
            updatedSecondsAgo: 0,
          };
        }
        return a;
      })
    );
  }, [alerts, currentAlert]);

  // Dismiss current floating alert
  const dismissCurrentAlert = useCallback(() => {
    setIsDismissed(true);
  }, []);

  // Reopen floating alert
  const reopenAlert = useCallback(() => {
    setIsDismissed(false);
  }, []);

  // Focus a specific region on the interactive map & scroll smoothly
  const focusRegionOnMap = useCallback((regionId) => {
    setFocusedMapZone(regionId);
    setMapPulseTrigger((prev) => prev + 1);

    const mapElement = document.getElementById('red-zone');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Open verified evacuation modal
  const openEvacuationModal = useCallback((alertObj = null) => {
    setEvacuationModalAlert(alertObj || currentAlert);
  }, [currentAlert]);

  const closeEvacuationModal = useCallback(() => {
    setEvacuationModalAlert(null);
  }, []);

  // Toggle Alert Center drawer
  const toggleAlertCenter = useCallback(() => {
    setIsAlertCenterOpen((prev) => !prev);
  }, []);

  const closeAlertCenter = useCallback(() => {
    setIsAlertCenterOpen(false);
  }, []);

  // Toggle Sound Chime
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => !prev);
  }, []);

  // Simulation presets for easy demonstration of various real-world scenarios
  const triggerPreset = useCallback((presetKey) => {
    switch (presetKey) {
      case 'wayanad-flood':
        triggerAlert({
          hazardType: 'FLASH FLOOD WARNING',
          hazardCategory: 'hydrological',
          regionId: 'kerala',
          location: 'Wayanad, Kerala',
          zone: 'Western Ghats Highland',
          explanation: 'Rapid water-level rise is expected due to extreme rainfall in the monitored basin.',
          timeEstimate: '45 minutes',
          impactWindow: '18:30 – 21:00 IST',
          probability: 87,
          severity: 'CRITICAL',
          actionRecommendation: 'MOVE TO HIGHER GROUND IMMEDIATELY',
          actionSubtext: 'Avoid low-lying riverbanks, culverts, and vulnerable slope routes.',
          officialNotice: 'Follow instructions from local disaster management authorities (NDRF / SDMA).',
          metrics: { precipitation: '148 mm / 3h', discharge: '+2.6 m/s', saturation: '89.8%' }
        });
        break;

      case 'joshimath-landslide':
        triggerAlert({
          hazardType: 'LANDSLIDE PROBABILITY WARNING',
          hazardCategory: 'geological',
          regionId: 'uttarakhand',
          location: 'Joshimath, Uttarakhand',
          zone: 'Himalayan Ridge Zone V',
          explanation: 'Sub-surface shear sensors detected critical slope shift following glacial stream swelling.',
          timeEstimate: '35 minutes',
          impactWindow: '19:15 – 22:30 IST',
          probability: 94,
          severity: 'CRITICAL',
          actionRecommendation: 'EVACUATE DESIGNATED RED-SECTOR STRUCTURES',
          actionSubtext: 'Move immediately along designated upper ridge safe paths to Auli staging.',
          officialNotice: 'Follow instructions from Chamoli District Disaster Management Authority.',
          metrics: { fissureRate: '+4.2 mm/h', saturation: '95.2%', seismicVibe: '0.42g' }
        });
        break;

      case 'silchar-flood':
        triggerAlert({
          hazardType: 'RIVERINE FLOOD STAGE ADVISORY',
          hazardCategory: 'hydrological',
          regionId: 'assam',
          location: 'Silchar, Assam',
          zone: 'Barak Valley Basin',
          explanation: 'Barak river hydro-gauges indicate embankment breach risk within the next 2-3 hours.',
          timeEstimate: '2.5 hours',
          impactWindow: '20:30 – 03:00 IST',
          probability: 79,
          severity: 'HIGH',
          actionRecommendation: 'SECURE ESSENTIALS & MOVE TO RELIEF STAGING',
          actionSubtext: 'Keep livestock on elevated dykes; store potable drinking water.',
          officialNotice: 'Follow instructions from Assam State Disaster Management Authority (ASDMA).',
          metrics: { gauge: '+2.1m over danger', inflow: '3.4 m/s', rain: '192 mm' }
        });
        break;

      case 'puri-cyclone':
        triggerAlert({
          hazardType: 'CYCLONIC STORM INTENSIFICATION',
          hazardCategory: 'meteorological',
          regionId: 'odisha',
          location: 'Puri Coast, Odisha',
          zone: 'Bay of Bengal Littoral',
          explanation: 'Severe cyclonic storm system approaching coast with sustained gale-force winds of 90 km/h.',
          timeEstimate: '4 hours',
          impactWindow: '22:00 – 05:00 IST',
          probability: 82,
          severity: 'HIGH',
          actionRecommendation: 'SHELTER IN MULTI-PURPOSE CYCLONE BUILDINGS',
          actionSubtext: 'Avoid coastal fishing areas, open jetties, and unreinforced rooftops.',
          officialNotice: 'Follow instructions from Odisha State Disaster Management Authority (OSDMA).',
          metrics: { windGust: '92 km/h', tidalSurge: '1.8m', pressure: '988 hPa' }
        });
        break;

      case 'barmer-heat':
        triggerAlert({
          hazardType: 'EXTREME HEAT-WAVE & DRY RUNOFF',
          hazardCategory: 'thermal',
          regionId: 'rajasthan',
          location: 'Barmer, Rajasthan',
          zone: 'Thar Arid Zone',
          explanation: 'Surface temperature index exceeding 46°C with localized dry riverbed runoff surge.',
          timeEstimate: '6 hours',
          impactWindow: '12:00 – 18:00 IST',
          probability: 58,
          severity: 'MODERATE',
          actionRecommendation: 'LIMIT OUTDOOR EXPOSURE & HYDRATE REGULARLY',
          actionSubtext: 'Utilize community cooling shelters and report heat-stress symptoms.',
          officialNotice: 'Follow District Health & Disaster Relief Guidelines.',
          metrics: { peakTemp: '46.2°C', wetBulb: '31.5°C', dryRunoff: 'Moderate' }
        });
        break;

      case 'resolve-current':
        resolveAlert();
        break;

      case 'escalate-current':
        escalateAlert();
        break;

      case 'reset-all':
        setAlerts(INITIAL_ALERTS);
        setActiveAlertIndex(0);
        setIsDismissed(false);
        break;

      default:
        break;
    }
  }, [triggerAlert, resolveAlert, escalateAlert]);

  const value = {
    alerts,
    currentAlert,
    activeAlertIndex,
    activeAlerts,
    criticalCount,
    highCount,
    resolvedCount,
    isDismissed,
    hasCriticalAlert,
    isAlertCenterOpen,
    evacuationModalAlert,
    isSoundEnabled,
    focusedMapZone,
    mapPulseTrigger,
    telemetryTick,
    nextAlert,
    prevAlert,
    selectAlertById,
    triggerAlert,
    escalateAlert,
    resolveAlert,
    dismissCurrentAlert,
    reopenAlert,
    focusRegionOnMap,
    openEvacuationModal,
    closeEvacuationModal,
    toggleAlertCenter,
    closeAlertCenter,
    toggleSound,
    triggerPreset,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

export function useAlertSystem() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertSystem must be used within an AlertProvider');
  }
  return context;
}
