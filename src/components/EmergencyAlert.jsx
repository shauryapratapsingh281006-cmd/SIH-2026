import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlertSystem } from '../context/AlertContext';
import DisasterAlert from './DisasterAlert';
import { RefreshCw } from 'lucide-react';

/**
 * EmergencyAlert Wrapper
 * Connects the production-grade DisasterAlert component to Pixelway's live AlertContext
 * Provides dismiss feedback toast ("Alert dismissed — monitoring continues") with reopen ability.
 */
export default function EmergencyAlert() {
  const {
    currentAlert,
    isDismissed,
    dismissCurrentAlert,
    reopenAlert,
    focusRegionOnMap,
  } = useAlertSystem();

  const [showToast, setShowToast] = useState(false);

  const handleDismiss = () => {
    dismissCurrentAlert();
    setShowToast(true);
  };

  const handleReopen = () => {
    setShowToast(false);
    reopenAlert();
  };

  const handleViewLiveRisk = (alertObj) => {
    if (alertObj?.regionId) {
      focusRegionOnMap(alertObj.regionId);
    } else {
      const mapSection = document.getElementById('red-zone');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    dismissCurrentAlert();
  };

  return (
    <>
      {/* ── Main High-Priority Disaster Alert Modal ── */}
      <DisasterAlert
        alert={currentAlert}
        isOpen={!isDismissed && !!currentAlert}
        onClose={handleDismiss}
        onDismiss={handleDismiss}
        onViewLiveRisk={handleViewLiveRisk}
      />

      {/* ── Subtle Post-Dismissal Feedback Toast ("Alert dismissed — monitoring continues") ── */}
      <AnimatePresence>
        {isDismissed && showToast && currentAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-xl bg-[#090F1C]/95 border border-blue-500/20 px-4 py-2.5 shadow-2xl backdrop-blur-md text-xs font-sans text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>

            <span>Alert dismissed — monitoring continues.</span>

            <button
              onClick={handleReopen}
              type="button"
              className="ml-2 flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 transition-colors focus:outline-none"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reopen</span>
            </button>

            <button
              onClick={() => setShowToast(false)}
              type="button"
              aria-label="Close notification"
              className="ml-1 text-slate-500 hover:text-slate-300 p-0.5"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
