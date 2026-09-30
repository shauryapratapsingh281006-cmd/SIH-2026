/**
 * Pixelway Disaster Intelligence Telemetry Types & Schemas
 * Ready for live GPS, Weather API, hydrological sensor network, and NDRF/SDMA data feeds.
 */

export const SEVERITY_LEVELS = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MODERATE: 'MODERATE',
  RESOLVED: 'RESOLVED',
};

export const DEFAULT_DISASTER_ALERT = {
  id: 'alert-wayanad-01',
  severity: SEVERITY_LEVELS.CRITICAL,
  hazardType: 'Flood risk detected',
  title: 'Flood risk detected',
  location: 'Wayanad, Kerala',
  coordinates: {
    latitude: 11.6854,
    longitude: 76.132,
    elevation: '700m - 2100m ASL',
  },
  zone: 'Western Ghats Highland Catchment',
  regionId: 'kerala',
  probability: 87,
  expectedWindow: '45 min',
  recommendation: 'Move to higher ground',
  officialNotice: 'Follow instructions from local authorities.',
  description:
    'Heavy rainfall is creating a high probability of rapid flooding in the monitored area.',
  source: 'Pixelway Risk Engine',
  updatedSecondsAgo: 22,
  telemetry: {
    precipitationRate: '142 mm / 3h',
    waterDischargeRate: '+2.4 m/s',
    soilSaturation: '89.4%',
    sensorConfidence: '99.2%',
    riverGaugeVariance: '+1.8m above danger threshold',
  },
};
