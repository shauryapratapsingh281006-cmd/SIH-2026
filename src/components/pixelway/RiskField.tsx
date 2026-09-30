import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RADAR_TARGETS, RadarTargetNode } from '../../data/pixelwayTelemetry';
import { Compass, Radio, Crosshair } from 'lucide-react';

export const RiskField: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<RadarTargetNode | null>(RADAR_TARGETS[0]);

  return (
    <div className="relative p-6 rounded-2xl bg-[#080E1C]/95 border border-white/[0.09] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-1.5 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '24s' }} />
            <h3 className="text-base sm:text-lg font-bold text-[#F1F5FF] tracking-tight">
              LIVE RISK FIELD
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-semibold flex items-center gap-1">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            RADAR ACTIVE
          </span>
        </div>

        <p className="text-xs text-[#8997B2] mb-4">
          Abstract geospatial telemetry sweep mapping dynamic threat clusters & telemetry vectors.
        </p>

        {/* Radar Screen Area */}
        <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-full bg-[#040711] border border-blue-500/20 shadow-[0_0_40px_rgba(37,99,235,0.12)] overflow-hidden flex items-center justify-center p-2">
          {/* Subtle Coordinate Grid Lines */}
          <div className="absolute inset-0 subtle-grid opacity-20" />

          {/* Concentric Range Rings */}
          <div className="absolute w-[25%] h-[25%] rounded-full border border-blue-500/20" />
          <div className="absolute w-[50%] h-[50%] rounded-full border border-blue-500/20" />
          <div className="absolute w-[75%] h-[75%] rounded-full border border-blue-500/20" />
          <div className="absolute w-[95%] h-[95%] rounded-full border border-blue-500/30" />

          {/* Crosshairs */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-500/15" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-500/15" />
          {/* Diagonal Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-blue-500/10 rotate-45" />
            <div className="w-full h-px bg-blue-500/10 -rotate-45" />
          </div>

          {/* Radar Sweep Beam (Rotating SVG Gradient Sector) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'linear' }}
            className="absolute inset-0 origin-center pointer-events-none"
          >
            <div
              className="w-1/2 h-1/2 origin-bottom-right"
              style={{
                background: 'conic-gradient(from 0deg at 100% 100%, rgba(59, 130, 246, 0.45) 0deg, rgba(6, 182, 212, 0.15) 30deg, transparent 60deg)',
              }}
            />
          </motion.div>

          {/* Center Coordinates Pivot */}
          <div className="absolute w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3B82F6] z-10" />

          {/* Interactive Glowing Target Nodes */}
          {RADAR_TARGETS.map((tgt) => {
            const isSelected = selectedTarget?.id === tgt.id;
            const isCritical = tgt.severity === 'CRITICAL';
            const isHigh = tgt.severity === 'HIGH';
            const markerColor = isCritical ? '#EF4444' : isHigh ? '#F59E0B' : '#10B981';

            // Convert svgPos (canvas 300x300) to percentage
            const leftPct = (tgt.svgPos.cx / 300) * 100;
            const topPct = (tgt.svgPos.cy / 300) * 100;

            return (
              <div
                key={tgt.id}
                onClick={() => setSelectedTarget(tgt)}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Pulsing Beacon Ripple */}
                <motion.div
                  animate={{ scale: [1, 2.2, 2.6], opacity: [0.8, 0.3, 0] }}
                  transition={{ repeat: Infinity, duration: tgt.pulseSpeed, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: markerColor }}
                />

                {/* Target Node Point */}
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-transform duration-200 ${
                    isSelected
                      ? 'scale-135 border-white shadow-[0_0_12px_#FFF]'
                      : 'border-slate-900 group-hover:scale-120'
                  }`}
                  style={{ backgroundColor: markerColor }}
                />

                {/* Target Tiny Label */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="px-1.5 py-0.5 rounded bg-black/80 border border-white/10 font-mono text-[9px] text-white">
                    {tgt.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Target Callout Box */}
      {selectedTarget && (
        <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-blue-400" />
              {selectedTarget.label}, {selectedTarget.state}
            </span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                selectedTarget.severity === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : selectedTarget.severity === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {selectedTarget.severity}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 mt-2">
            <div>
              <span className="block text-slate-400">BEARING</span>
              <span className="text-white font-semibold">{selectedTarget.azimuthDeg}° AZM</span>
            </div>
            <div>
              <span className="block text-slate-400">RANGE</span>
              <span className="text-white font-semibold">{selectedTarget.distanceKm} km</span>
            </div>
            <div>
              <span className="block text-slate-400">VECTOR</span>
              <span className="text-blue-400 font-semibold">{selectedTarget.threatType}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>SWEEP: 360° CONTINUOUS</span>
        <span className="text-blue-400">6 NODES TRACKED</span>
      </div>
    </div>
  );
};
