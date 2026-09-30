import React from 'react';

export default function RiskMetrics({
  probability = 87,
  expectedWindow = '45 min',
  severity = 'CRITICAL',
}) {
  const isCritical = severity === 'CRITICAL' || probability >= 80;
  const isHigh = severity === 'HIGH' || (probability >= 60 && probability < 80);

  const probColor = isCritical
    ? 'text-red-400'
    : isHigh
    ? 'text-amber-400'
    : 'text-emerald-400';

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-4.5">
      <div className="grid grid-cols-2 gap-6 sm:gap-8 divide-x divide-white/[0.06]">
        {/* Metric 1: Risk Probability */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl sm:text-3xl font-bold tracking-tight font-sans ${probColor}`}
            >
              {probability}%
            </span>
          </div>
          <p className="text-xs sm:text-[13px] font-medium text-slate-400 tracking-wide">
            Risk probability
          </p>
        </div>

        {/* Metric 2: Expected Window */}
        <div className="pl-6 sm:pl-8 space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-200/90 font-sans">
              {expectedWindow}
            </span>
          </div>
          <p className="text-xs sm:text-[13px] font-medium text-slate-400 tracking-wide">
            Expected
          </p>
        </div>
      </div>
    </div>
  );
}
