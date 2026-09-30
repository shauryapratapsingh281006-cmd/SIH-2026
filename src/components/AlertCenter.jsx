import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlertSystem } from '../context/AlertContext';
import { Volume2, VolumeX, X, AlertTriangle } from 'lucide-react';

export default function AlertCenter() {
  const {
    alerts,
    isAlertCenterOpen,
    closeAlertCenter,
    focusRegionOnMap,
    openEvacuationModal,
    resolveAlert,
    isSoundEnabled,
    toggleSound,
  } = useAlertSystem();

  const [activeTab, setActiveTab] = useState('all');

  // Handle escape key to close Alert Center
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAlertCenterOpen) {
        closeAlertCenter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAlertCenterOpen, closeAlertCenter]);

  if (!isAlertCenterOpen) return null;

  const filteredAlerts = alerts.filter((alert) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'critical') return alert.severity === 'CRITICAL';
    if (activeTab === 'high') return alert.severity === 'HIGH';
    if (activeTab === 'resolved') return alert.severity === 'RESOLVED';
    return true;
  });

  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;
  const highCount = alerts.filter((a) => a.severity === 'HIGH').length;
  const resolvedCount = alerts.filter((a) => a.severity === 'RESOLVED').length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-center-heading"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      {/* Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={closeAlertCenter}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl h-full bg-[#080D18] border-l border-white/[0.10] shadow-[0_20px_80px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] bg-[#050812]">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
                <AlertTriangle className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 id="alert-center-heading" className="text-[17px] font-bold text-white tracking-tight">
                  Emergency Alert Center
                </h2>
                <span className="text-[12px] font-normal text-[#8997B2]">
                  Pixelway Autonomous Risk Engine
                </span>
              </div>
            </div>

            {/* Right Controls: Sound & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                type="button"
                className="p-2 rounded-lg text-[#8997B2] hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors cursor-pointer"
                title={isSoundEnabled ? 'Notification Sound On' : 'Notification Sound Off'}
                aria-label="Toggle Sound"
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={closeAlertCenter}
                type="button"
                className="p-2 rounded-lg text-[#8997B2] hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors cursor-pointer"
                aria-label="Close Alert Center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Segmented Filter Tabs */}
          <div className="flex p-1 bg-[#070B14] rounded-[10px] border border-white/[0.08]">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-1.5 text-[12px] font-semibold rounded-[7px] transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-[#8997B2] hover:text-white'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('critical')}
              className={`flex-1 py-1.5 text-[12px] font-semibold rounded-[7px] transition-all cursor-pointer ${
                activeTab === 'critical'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-red-400 hover:text-red-300'
              }`}
            >
              Critical ({criticalCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('high')}
              className={`flex-1 py-1.5 text-[12px] font-semibold rounded-[7px] transition-all cursor-pointer ${
                activeTab === 'high'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              High ({highCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resolved')}
              className={`flex-1 py-1.5 text-[12px] font-semibold rounded-[7px] transition-all cursor-pointer ${
                activeTab === 'resolved'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>

        {/* Alert Cards List */}
        <div className="flex-1 p-5 sm:p-6 space-y-4 overflow-y-auto">
          <AnimatePresence>
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-16 text-[#64748B]">
                <p className="text-[14px]">No alerts in this category.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                const isCrit = alert.severity === 'CRITICAL';
                const isResolved = alert.severity === 'RESOLVED';

                return (
                  <motion.div
                    key={alert.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-5 rounded-[16px] bg-[#0A1120] border border-[rgba(120,160,220,0.16)] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] space-y-3"
                  >
                    {/* Top Row: Severity Dot, Title, Badge + Percentage */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isCrit
                              ? 'bg-red-400 shadow-[0_0_6px_#F87171]'
                              : isResolved
                              ? 'bg-emerald-400 shadow-[0_0_6px_#34D399]'
                              : 'bg-amber-400 shadow-[0_0_6px_#FBBF24]'
                          }`}
                        />
                        <h4 className="text-[16px] font-bold text-white tracking-tight">
                          {alert.title}
                        </h4>
                      </div>

                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] border shrink-0 ${
                          isCrit
                            ? 'bg-red-500/15 border-red-500/30 text-red-400'
                            : isResolved
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        {alert.severity} · {alert.probability ? `${alert.probability}%` : '99%'}
                      </span>
                    </div>

                    {/* Second Row: Location */}
                    <div className="text-[13px] text-[#7B8EA8] font-mono">
                      📍 {alert.location}
                    </div>

                    {/* Main Description: 1 Concise Sentence */}
                    <p className="text-[14px] text-[#91A4C2] leading-[1.5]">
                      {alert.description ||
                        'Heavy rainfall is creating a high probability of rapid flooding in the monitored area.'}
                    </p>

                    {/* Key Information: 3-Column Info Row */}
                    <div className="p-3 rounded-[10px] bg-white/[0.02] border border-white/[0.06] grid grid-cols-3 gap-2 text-center font-mono">
                      <div>
                        <span className="text-[10px] uppercase text-[#64748B] block">EXPECTED</span>
                        <span className="text-[13.5px] font-bold text-white">
                          {alert.expectedArrival || '45 min'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#64748B] block">IMPACT WINDOW</span>
                        <span className="text-[13.5px] font-bold text-white">
                          {alert.impactWindow || '18:30 – 21:00'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-[#64748B] block">CONFIDENCE</span>
                        <span className="text-[13.5px] font-bold text-emerald-400">
                          {alert.confidence || '99.4%'}
                        </span>
                      </div>
                    </div>

                    {/* Action Recommendation */}
                    <div className="p-2.5 rounded-[9px] bg-red-500/10 border border-red-500/25 text-[13px] text-red-300 font-medium flex items-center gap-2">
                      <span>⚠</span>
                      <span>{alert.recommendation || 'Move to higher ground immediately.'}</span>
                    </div>

                    {/* Action Buttons: Focus on Map (Primary), Evacuation Plan (Secondary), Resolve (Tertiary) */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (alert.regionId) focusRegionOnMap(alert.regionId);
                          closeAlertCenter();
                        }}
                        className="flex-1 py-2 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white text-[12.5px] font-semibold transition-all cursor-pointer shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
                      >
                        Focus on Map
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          openEvacuationModal(alert);
                          closeAlertCenter();
                        }}
                        className="flex-1 py-2 rounded-[8px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#DCE4F0] text-[12.5px] font-semibold transition-all cursor-pointer"
                      >
                        Evacuation Plan
                      </button>

                      {!isResolved && (
                        <button
                          type="button"
                          onClick={() => resolveAlert(alert.id)}
                          className="px-3 py-2 rounded-[8px] text-[12px] font-mono text-[#8997B2] hover:text-emerald-400 transition-colors cursor-pointer"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Tiny Unobtrusive Footer Status Bar */}
        <div className="px-6 py-3 bg-[#050812] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Sensor network operational</span>
          </div>
          <span>Latency &lt; 90ms</span>
        </div>
      </motion.div>
    </div>
  );
}
