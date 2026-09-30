import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlertSystem } from '../context/AlertContext';

export default function EmergencySimToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    triggerPreset,
    isDismissed,
    reopenAlert,
    toggleAlertCenter,
    isSoundEnabled,
    toggleSound,
    alerts,
  } = useAlertSystem();

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 p-4 rounded-2xl bg-[#070B14]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl max-w-sm sm:max-w-md w-full space-y-3 font-mono text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="font-semibold text-white tracking-wide">
                  Risk Engine Simulation Suite
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Live Diagnostic</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Test how Pixelway's real-time emergency intelligence system reacts to various hazard thresholds, escalation telemetry, resolution flows, and alert stacks.
            </p>

            {/* Presets Grid */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                Trigger Verified Hazards:
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <button
                  onClick={() => triggerPreset('wayanad-flood')}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-200 border border-red-500/25 transition-all text-left truncate"
                >
                  ⚡ Flash Flood (87%)
                </button>
                <button
                  onClick={() => triggerPreset('joshimath-landslide')}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-200 border border-red-500/25 transition-all text-left truncate"
                >
                  🌋 Landslide (94%)
                </button>
                <button
                  onClick={() => triggerPreset('silchar-flood')}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 border border-amber-500/25 transition-all text-left truncate"
                >
                  🌊 River Flood (79%)
                </button>
                <button
                  onClick={() => triggerPreset('puri-cyclone')}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 border border-amber-500/25 transition-all text-left truncate"
                >
                  🌪️ Cyclone (82%)
                </button>
                <button
                  onClick={() => triggerPreset('barmer-heat')}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-blue-950/30 hover:bg-blue-900/40 text-blue-200 border border-blue-500/25 transition-all text-left truncate"
                >
                  ☀️ Heat Wave (58%)
                </button>
                <button
                  onClick={() => triggerPreset('escalate-current')}
                  type="button"
                  className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-200 border border-rose-500/30 transition-all text-left truncate font-semibold"
                >
                  📈 Escalate Risk (96%)
                </button>
              </div>
            </div>

            {/* State Actions */}
            <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5 text-[10.5px]">
              <button
                onClick={() => triggerPreset('resolve-current')}
                type="button"
                className="px-2 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/25 transition-colors"
              >
                ✓ Resolve Threat
              </button>

              {isDismissed && (
                <button
                  onClick={reopenAlert}
                  type="button"
                  className="px-2 py-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/30 transition-colors"
                >
                  👁️ Show Alert
                </button>
              )}

              <button
                onClick={toggleAlertCenter}
                type="button"
                className="px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] transition-colors"
              >
                🔔 Alert Center ({alerts.length})
              </button>

              <button
                onClick={toggleSound}
                type="button"
                className="px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/[0.08] transition-colors"
              >
                {isSoundEnabled ? '🔊 Audio ON' : '🔇 Audio OFF'}
              </button>

              <button
                onClick={() => triggerPreset('reset-all')}
                type="button"
                className="px-2 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors ml-auto"
              >
                Reset Engine
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Toggle Risk Engine Simulator"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#070B14]/90 hover:bg-[#0B1220] backdrop-blur-md border border-white/[0.15] hover:border-blue-500/40 text-slate-200 hover:text-white text-xs font-mono shadow-lg transition-all active:scale-95"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
        </span>
        <span className="font-medium">
          {isOpen ? 'Close Simulator' : '⚡ Simulate Risk Engine'}
        </span>
      </button>
    </div>
  );
}
