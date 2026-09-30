import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AlertActions({ onViewLiveRisk, onDismiss }) {
  return (
    <div className="space-y-2.5 pt-1">
      {/* Primary CTA: View Live Risk */}
      <button
        onClick={onViewLiveRisk}
        type="button"
        className="group relative flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-sans text-[14.5px] sm:text-[15px] font-semibold text-white shadow-[0_2px_14px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_4px_24px_rgba(37,99,235,0.5)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220]"
      >
        <span>View Live Risk</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>

      {/* Secondary Action: Dismiss */}
      <button
        onClick={onDismiss}
        type="button"
        className="flex h-9 w-full items-center justify-center rounded-lg font-sans text-[13.5px] font-medium text-slate-400 transition-colors duration-150 hover:text-slate-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 active:scale-[0.99]"
      >
        Dismiss
      </button>
    </div>
  );
}
