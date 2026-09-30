import React from 'react';
import { motion } from 'framer-motion';

export default function RiskIndicator({ probability = 87 }) {
  const clampedProb = Math.min(100, Math.max(0, probability));

  // Determine current tier label
  const tierLabel =
    clampedProb >= 80
      ? 'CRITICAL TIER'
      : clampedProb >= 60
      ? 'HIGH RISK'
      : clampedProb >= 40
      ? 'ELEVATED'
      : 'ADVISORY';

  return (
    <div className="space-y-2 pt-1">
      {/* Indicator Subheader */}
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400 uppercase tracking-wider">
          Threat Probability Index
        </span>
        <span className="font-semibold text-red-400 tracking-wide">
          {tierLabel} ({clampedProb}%)
        </span>
      </div>

      {/* Progress Track Container */}
      <div className="relative h-2.5 w-full rounded-full bg-slate-800/80 p-[1px] border border-white/5 overflow-visible">
        {/* Restrained Gradient Track (safe -> warning -> critical) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/40 via-amber-500/50 to-red-500/70 opacity-30" />

        {/* Animated Active Bar */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${clampedProb}%` }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
        >
          {/* Active Marker Pin at the End of the Filled Bar */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute h-full w-full rounded-full bg-white opacity-40 animate-ping" />
            <span className="h-2.5 w-2.5 rounded-full bg-white border-2 border-red-500 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </span>
        </motion.div>
      </div>

      {/* Ticks & Range Labels */}
      <div className="flex items-center justify-between text-[10.5px] font-mono text-slate-500 px-0.5 pt-0.5">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span className="text-slate-400 font-semibold">100%</span>
      </div>
    </div>
  );
}
