import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlertSystem } from '../context/AlertContext';

export default function EvacuationInfoModal() {
  const { evacuationModalAlert, closeEvacuationModal, focusRegionOnMap } = useAlertSystem();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && evacuationModalAlert) {
        closeEvacuationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [evacuationModalAlert, closeEvacuationModal]);

  if (!evacuationModalAlert) return null;

  const evac = evacuationModalAlert.evacuationInfo;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="evacuation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={closeEvacuationModal}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#080D1A] border border-red-500/35 shadow-[0_20px_60px_-10px_rgba(239,68,68,0.25)] overflow-hidden"
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 bg-[#050812] border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/35 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-red-400 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded">
                  VERIFIED EVACUATION INTELLIGENCE
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {evacuationModalAlert.location}
                </span>
              </div>
              <h2 id="evacuation-modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {evac?.title || 'Emergency Evacuation & Staging Directive'}
              </h2>
            </div>
          </div>

          <button
            onClick={closeEvacuationModal}
            type="button"
            aria-label="Close Evacuation Modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-sm">
          {/* Authority notice */}
          <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/25 flex items-start gap-3 text-red-200">
            <span className="text-base flex-shrink-0 mt-0.5">⚠</span>
            <div className="text-xs leading-relaxed">
              <span className="font-semibold block mb-0.5 text-white">
                Official Disaster Response Guidelines
              </span>
              This emergency data is synthesized from state emergency operations and NDRF coordinate feeds. Always prioritize immediate verbal instructions from uniformed emergency personnel on site.
            </div>
          </div>

          {/* Emergency Hotlines & Field Units */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#050812] border border-white/[0.06]">
              <span className="text-[10.5px] font-mono text-slate-400 uppercase block mb-1">
                DISTRICT EMERGENCY OPERATIONS (DEOC)
              </span>
              <div className="text-white font-mono font-bold text-sm">
                📞 {evac?.emergencyHelpline || '1077 (Toll Free)'}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                24/7 Monitored Emergency Dispatch Line
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#050812] border border-white/[0.06]">
              <span className="text-[10.5px] font-mono text-slate-400 uppercase block mb-1">
                DEPLOYED RESPONSE FORCE
              </span>
              <div className="text-white font-mono font-semibold text-sm">
                🛡️ {evac?.ndrfUnit || 'National Disaster Response Force (NDRF)'}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Field teams active on primary access routes
              </span>
            </div>
          </div>

          {/* Verified Safe Staging Centers */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Verified Safe Staging & Relief Centers
            </h3>
            <div className="space-y-2">
              {evac?.stagingCentres?.map((centre, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#0B1220] border border-white/[0.06] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm">
                      {centre.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Capacity: <span className="text-slate-200">{centre.capacity}</span> · Distance: <span className="text-blue-400">{centre.dist}</span>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex-shrink-0">
                    {centre.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Safe Corridors */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Authorized Evacuation Corridors
            </h3>
            <div className="space-y-2">
              {evac?.safeRoutes?.map((route, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#050812] border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-200"
                >
                  <span className="w-5 h-5 rounded-md bg-blue-500/15 text-blue-400 font-mono font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{route}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Personal Safety Checklist */}
          <div>
            <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Pre-Evacuation Checklist
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {evac?.criticalChecklist?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]"
                >
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#050812] border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              focusRegionOnMap(evacuationModalAlert.regionId);
              closeEvacuationModal();
            }}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5"
          >
            <span>Focus Danger Zone on Map</span>
            <span>→</span>
          </button>

          <button
            onClick={closeEvacuationModal}
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
