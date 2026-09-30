import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { DEFAULT_DISASTER_ALERT } from './types';

export default function DisasterAlert({
  alert = DEFAULT_DISASTER_ALERT,
  isOpen = true,
  onClose,
  onDismiss,
  onViewLiveRisk,
}) {
  const modalRef = useRef(null);

  // Keyboard accessibility: Escape to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (onDismiss) onDismiss();
        else if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDismiss, onClose]);

  // Focus trap / auto-focus
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !alert) return null;

  const isCritical = alert.severity === 'CRITICAL';

  const handleClose = () => {
    if (onClose) onClose();
    else if (onDismiss) onDismiss();
  };

  const handleDismiss = () => {
    if (onDismiss) onDismiss();
    else if (onClose) onClose();
  };

  const handleViewLiveRisk = () => {
    if (onViewLiveRisk) {
      onViewLiveRisk(alert);
    } else {
      const mapSection = document.getElementById('red-zone');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
      }
      handleDismiss();
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="disaster-alert-heading"
        tabIndex={-1}
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto focus:outline-none"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={handleDismiss}
          className="fixed inset-0 bg-[#020617]/80 backdrop-blur-[8px] overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle red ambient glow expanding behind modal */}
          {isCritical && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[550px] rounded-full bg-red-600/[0.08] blur-[120px] pointer-events-none" />
          )}
        </motion.div>

        {/* ── Centered Enterprise Alert Modal (640–680px) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[640px] rounded-[22px] bg-[#080D18] border border-white/[0.10] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(239,68,68,0.18)] p-7 sm:p-8 text-left overflow-hidden"
        >
          {/* 1. Top Header: Single line */}
          <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#EF4444]" />
              <span className="text-[12px] font-mono font-bold tracking-[0.08em] uppercase text-red-400">
                CRITICAL ALERT
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-wider text-[#64748B] uppercase select-none">
                GEO-INTEL // {alert.regionId ? alert.regionId.toUpperCase() : 'KERALA'}
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#8997B2] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Alert Modal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Main Alert Title (One line desktop) & Location Pin */}
          <div className="mb-4">
            <h3
              id="disaster-alert-heading"
              className="text-[30px] sm:text-[34px] font-bold text-[#F4F7FF] tracking-tight leading-[1.1] mb-2 sm:whitespace-nowrap"
            >
              {alert.title || 'Flood risk detected'}
            </h3>
            <div className="text-[14.5px] font-medium text-[#38BDF8] flex items-center gap-1.5">
              <span>📍</span>
              <span>{alert.location || 'Wayanad, Kerala'}</span>
            </div>
          </div>

          {/* 3. Concise Description */}
          <p className="text-[15.5px] text-[#91A4C2] leading-[1.5] max-w-[560px] mb-5 font-normal">
            {alert.description ||
              'Heavy rainfall is creating a high probability of rapid flooding in the monitored area.'}
          </p>

          {/* 4. Key Metrics: Two Equal-Width Columns */}
          <div className="grid grid-cols-2 gap-3.5 mb-4">
            <div className="p-4 rounded-[14px] bg-white/[0.025] border border-white/[0.07] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7B8EA8]">
                  Risk probability
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-red-400">
                  CRITICAL · {alert.probability ?? 87}%
                </span>
              </div>
              <span className="text-[32px] font-bold text-red-400 font-mono leading-tight">
                {alert.probability ?? 87}%
              </span>
            </div>

            <div className="p-4 rounded-[14px] bg-white/[0.025] border border-white/[0.07] flex flex-col justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#7B8EA8] mb-1">
                Expected
              </span>
              <span className="text-[32px] font-bold text-amber-400 font-mono leading-tight">
                {alert.expectedWindow || alert.timeEstimate || '45 min'}
              </span>
            </div>
          </div>

          {/* 5. Recommended Action: Compact Action Panel */}
          <div className="p-3.5 rounded-[12px] bg-red-500/[0.06] border border-red-500/20 mb-5 flex items-start gap-3">
            <span className="text-red-400 text-base mt-0.5">⚠</span>
            <div>
              <h4 className="text-[14px] font-semibold text-red-200 tracking-tight leading-tight">
                {alert.recommendation || alert.actionRecommendation || 'Move to higher ground'}
              </h4>
              <p className="text-[12.5px] text-[#A6B4C8] mt-0.5 font-normal">
                {alert.recommendationSubtext ||
                  alert.officialNotice ||
                  'Follow instructions from local disaster management authorities.'}
              </p>
            </div>
          </div>

          {/* 6. Primary CTA: Full width with subtle blue gradient */}
          <button
            type="button"
            onClick={handleViewLiveRisk}
            className="group w-full h-[54px] rounded-[13px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-[15px] font-semibold shadow-[0_4px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_30px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer mb-2.5"
          >
            <span>View Live Risk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 7. Dismiss: Subtle Text Button Underneath */}
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={handleDismiss}
              className="text-[13px] font-medium text-[#7B8EA8] hover:text-[#CBD5E1] transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          {/* 8. System Metadata: Tiny Unobtrusive Secondary String */}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] font-mono text-[#64748B]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Risk engine active · Updated 7 min ago</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
