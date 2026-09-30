import React from 'react';
import { X } from 'lucide-react';

export default function AlertHeader({
  severity = 'CRITICAL',
  statusText = 'CRITICAL ALERT',
  onClose,
}) {
  const isCritical = severity === 'CRITICAL';
  const isHigh = severity === 'HIGH';
  const isResolved = severity === 'RESOLVED';

  const badgeConfig = isCritical
    ? {
        text: statusText || 'CRITICAL ALERT',
        textColor: 'text-red-400',
        dotBg: 'bg-red-500',
        pingBg: 'bg-red-500/60',
        glow: 'shadow-[0_0_12px_rgba(239,68,68,0.5)]',
      }
    : isHigh
    ? {
        text: statusText || 'HIGH RISK ALERT',
        textColor: 'text-amber-400',
        dotBg: 'bg-amber-500',
        pingBg: 'bg-amber-500/60',
        glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]',
      }
    : isResolved
    ? {
        text: statusText || 'THREAT RESOLVED',
        textColor: 'text-emerald-400',
        dotBg: 'bg-emerald-500',
        pingBg: 'bg-emerald-500/60',
        glow: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]',
      }
    : {
        text: statusText || 'RISK ADVISORY',
        textColor: 'text-blue-400',
        dotBg: 'bg-blue-500',
        pingBg: 'bg-blue-500/60',
        glow: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]',
      };

  return (
    <div className="flex items-center justify-between gap-4 pb-2">
      {/* Live Status Indicator & Text */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
          <span
            className={`absolute inline-flex h-full w-full rounded-full animate-ping opacity-60 ${badgeConfig.pingBg}`}
            style={{ animationDuration: '2s' }}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${badgeConfig.dotBg} ${badgeConfig.glow}`}
          />
        </span>
        <span
          className={`font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] select-none ${badgeConfig.textColor}`}
        >
          {badgeConfig.text}
        </span>
      </div>

      {/* Minimal Accessible Close Button */}
      <button
        onClick={onClose}
        type="button"
        aria-label="Dismiss alert"
        className="group relative -mr-1 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95"
      >
        <X className="h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-90" />
      </button>
    </div>
  );
}
