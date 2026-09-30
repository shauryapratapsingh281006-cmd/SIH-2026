import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Brain, Crosshair, Truck, HeartHandshake } from 'lucide-react';
import { redZoneMarkers } from '../data/mockData';
import { useAlertSystem } from '../context/AlertContext';

// Accurate coordinates for the monitored regions in 500x580 SVG viewBox
const REGION_COORDS = {
  uttarakhand: { cx: 255, cy: 150 },
  assam: { cx: 440, cy: 225 },
  odisha: { cx: 320, cy: 345 },
  kerala: { cx: 195, cy: 475 },
  rajasthan: { cx: 130, cy: 215 },
};

const PIPELINE_STEPS = [
  {
    step: '01',
    icon: Radio,
    title: 'Ground Reports',
    desc: 'Crowdsourced GPS, citizen alerts & automated stream intake',
    tag: 'Raw Telemetry',
    color: '#3B82F6',
  },
  {
    step: '02',
    icon: Brain,
    title: 'AI Risk Engine',
    desc: 'Hydrological modeling & soil saturation correlation in real time',
    tag: 'Core Analysis',
    color: '#6366F1',
  },
  {
    step: '03',
    icon: Crosshair,
    title: 'Priority & Triage',
    desc: 'Automated urgency scoring & incident classification routing',
    tag: 'Triage Gateway',
    color: '#F59E0B',
  },
  {
    step: '04',
    icon: Truck,
    title: 'NGO Dispatch',
    desc: 'Field volunteer allocation, vehicle fleets & route clearance',
    tag: 'Action Mobilized',
    color: '#10B981',
  },
  {
    step: '05',
    icon: HeartHandshake,
    title: 'Relief Delivery',
    desc: 'Shelter intake, verified life-support delivery & state audit',
    tag: 'Outcome Logged',
    color: '#06B6D4',
  },
];

export default function RedZoneMap() {
  const { focusedMapZone, openEvacuationModal } = useAlertSystem();
  const [activeZone, setActiveZone] = useState(redZoneMarkers[3]); // Default Kerala / Wayanad

  useEffect(() => {
    if (focusedMapZone) {
      const match = redZoneMarkers.find((m) => m.id === focusedMapZone);
      if (match) {
        setActiveZone(match);
      }
    }
  }, [focusedMapZone]);

  return (
    <section id="red-zone" className="section-heavy relative w-full bg-[#050812] overflow-hidden text-[#F2F5FA] border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-blue-700/[0.04] blur-[140px] pointer-events-none" />

      {/* Controlled Centered Container (Exact 1200px System) */}
      <div className="app-container relative">
        
        {/* ── SECTION HEADER ── */}
        <div className="w-full flex flex-col items-center text-center mb-9 lg:mb-10">
          <div className="inline-flex items-center rounded-full border border-blue-500/25 bg-blue-950/40 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.12)] mb-3.5">
            GEOSPATIAL INTELLIGENCE
          </div>

          <h2 className="text-[34px] sm:text-[42px] lg:text-[46px] font-bold tracking-tight text-[#F4F7FF] leading-[1.1] mb-4">
            Hazard identification & response pipeline
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#91A4C2] leading-[1.5] max-w-[700px] font-normal">
            Precision geospatial red zone tracking linked directly to an automated operational response pipeline.
          </p>
        </div>

        {/* ── BALANCED TWO-COLUMN PANELS (~50% / ~50%) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── LEFT PANEL: India Geospatial Map (~50%) ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-[18px] bg-[#070D18] border border-[rgba(100,140,200,0.18)] shadow-[0_16px_50px_-10px_rgba(0,0,0,0.7)] p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              {/* Map Panel Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/[0.07]">
                <div>
                  <h3 className="text-[16px] font-bold text-[#F4F7FF] tracking-tight">
                    India Hazard Vector Map
                  </h3>
                  <span className="text-[11.5px] font-mono text-[#7B8EA8]">
                    Real-time vulnerability coordinates.
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10.5px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-red-500/15 border border-red-500/30 text-red-400 font-semibold tracking-wide">
                    5 active hazard zones
                  </span>
                  <span className="px-2.5 py-0.5 rounded-[5px] bg-white/[0.05] border border-white/[0.08] text-[#8997B2]">
                    57 alerts
                  </span>
                </div>
              </div>

              {/* Stylized Accurate Digital India Map */}
              <div className="relative w-full h-[320px] sm:h-[340px] bg-[#050812] rounded-[12px] border border-white/[0.06] p-2 flex items-center justify-center overflow-hidden">
                {/* Coordinate Grid Texture */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(79, 140, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 140, 255, 0.15) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />

                {/* Floating Map Legend (Top Right) */}
                <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1.5 rounded-[8px] bg-[#070D1A]/90 border border-white/[0.08] text-[9.5px] font-mono flex flex-col gap-1 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>Moderate</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Watch</span>
                  </div>
                </div>

                <svg viewBox="0 0 500 580" className="w-full h-full max-h-[330px] select-none">
                  <defs>
                    <linearGradient id="indiaFillGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0E1B33" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#0A1426" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#070E1C" stopOpacity="0.95" />
                    </linearGradient>
                    <filter id="indiaGlow2" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Recognized India Silhouette Boundary */}
                  <path
                    d="M 200 35 L 235 45 L 252 75 L 242 110 L 280 138 L 325 162 L 355 172 L 372 186 L 430 172 L 476 182 L 470 220 L 442 250 L 420 274 L 392 255 L 362 252 L 358 280 L 328 312 L 298 362 L 268 424 L 244 482 L 228 544 L 216 554 L 208 544 L 198 498 L 184 430 L 168 360 L 158 312 L 148 280 L 118 300 L 88 290 L 78 260 L 104 240 L 124 230 L 96 210 L 116 186 L 142 160 L 162 120 L 176 76 Z"
                    fill="url(#indiaFillGrad2)"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                    filter="url(#indiaGlow2)"
                  />

                  {/* Internal Contours */}
                  <path d="M 176 76 Q 210 115 242 110" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                  <path d="M 142 160 Q 200 175 280 138" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                  <path d="M 124 230 Q 220 240 325 162" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                  <path d="M 148 280 Q 230 290 358 280" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                  <path d="M 168 360 Q 235 375 298 362" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                  <path d="M 184 430 Q 220 445 268 424" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />
                  <path d="M 198 498 Q 215 510 244 482" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none" />

                  {/* Connecting Telemetry Lines */}
                  <path d="M 255 150 Q 210 300 195 475" stroke="rgba(79, 140, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <path d="M 255 150 Q 350 180 440 225" stroke="rgba(79, 140, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <path d="M 440 225 Q 380 290 320 345" stroke="rgba(79, 140, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <path d="M 320 345 Q 260 410 195 475" stroke="rgba(79, 140, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" fill="none" />

                  {/* Monitored Red Zone Hazard Markers */}
                  {redZoneMarkers.map((marker) => {
                    const coords = REGION_COORDS[marker.id] || { cx: 250, cy: 250 };
                    const isSelected = activeZone.id === marker.id;
                    const isCrit = marker.riskLevel === 'CRITICAL' || marker.riskLevel === 'SEVERE';
                    const markerColor = isCrit ? '#EF4444' : marker.riskLevel === 'HIGH' ? '#F59E0B' : marker.riskLevel === 'ELEVATED' ? '#38BDF8' : '#10B981';

                    return (
                      <g
                        key={marker.id}
                        className="cursor-pointer group"
                        onClick={() => setActiveZone(marker)}
                      >
                        {isSelected && (
                          <>
                            <circle
                              cx={coords.cx}
                              cy={coords.cy}
                              r={20}
                              fill="none"
                              stroke={markerColor}
                              strokeWidth="1.2"
                              strokeOpacity="0.4"
                              className="animate-ping"
                            />
                            <circle
                              cx={coords.cx}
                              cy={coords.cy}
                              r={14}
                              fill={markerColor}
                              fillOpacity="0.2"
                            />
                          </>
                        )}

                        <circle
                          cx={coords.cx}
                          cy={coords.cy}
                          r={isSelected ? 7 : 5}
                          fill="#070D18"
                          stroke={markerColor}
                          strokeWidth={isSelected ? '2' : '1.5'}
                        />

                        <circle
                          cx={coords.cx}
                          cy={coords.cy}
                          r={isSelected ? 3.5 : 2.5}
                          fill={markerColor}
                        />

                        <text
                          x={coords.cx + (coords.cx > 350 ? -10 : 10)}
                          y={coords.cy + 4}
                          textAnchor={coords.cx > 350 ? 'end' : 'start'}
                          fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                          fontSize="10.5"
                          fontFamily="monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {marker.name.split(',')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Bottom Card (Wayanad, Kerala / Selected zone) */}
            <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-[14px] font-bold text-white tracking-tight">
                    {activeZone.name.toUpperCase()}
                  </h4>
                  <span className="px-1.5 py-0.5 rounded-[4px] bg-red-500/15 text-red-400 text-[9.5px] font-mono font-bold tracking-wider">
                    {activeZone.riskLevel}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#8997B2]">
                  Western Ghats highland · High precipitation slope failure risk
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase">Population</span>
                  <span className="text-[13px] font-bold text-white font-mono">{activeZone.population}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase">Capacity</span>
                  <span className="text-[13px] font-bold text-amber-400 font-mono">{activeZone.carryingCapacity}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openEvacuationModal(activeZone)}
                  className="px-3 py-1.5 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white text-[11.5px] font-semibold transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Evacuation Plan →
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL: Response Pipeline (~50%) ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-[18px] bg-[#070D18] border border-[rgba(100,140,200,0.18)] shadow-[0_16px_50px_-10px_rgba(0,0,0,0.7)] p-5 sm:p-6 flex flex-col justify-between"
          >
            {/* Pipeline Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/[0.07]">
              <div>
                <h3 className="text-[16px] font-bold text-[#F4F7FF] tracking-tight">
                  Response Pipeline
                </h3>
                <span className="text-[11.5px] font-mono text-[#7B8EA8]">
                  Autonomous workflow from trigger to relief.
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] bg-emerald-500/10 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                <span className="text-[10.5px] font-mono font-bold text-emerald-400">83% readiness</span>
              </div>
            </div>

            {/* Five Compact Workflow Rows */}
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              {PIPELINE_STEPS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.step}
                    className="p-3 rounded-[11px] bg-[#060A14] border border-white/[0.06] hover:border-blue-500/25 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Step Number */}
                      <span className="text-[12px] font-mono font-bold text-blue-400/80 shrink-0">
                        {item.step}
                      </span>

                      {/* Small Icon */}
                      <div className="w-7 h-7 rounded-[7px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>

                      {/* Step Content */}
                      <div className="min-w-0">
                        <h4 className="text-[13.5px] font-semibold text-[#F4F7FF] tracking-tight leading-tight truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11.5px] text-[#8997B2] leading-tight truncate mt-0.5 font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Status Tag */}
                    <span className="shrink-0 px-2 py-0.5 rounded-[4px] bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-[#94A3B8] whitespace-nowrap">
                      {item.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
