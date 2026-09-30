import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function RecommendedAction({
  action = 'Move to higher ground',
  subtext = 'Follow instructions from local authorities.',
  severity = 'CRITICAL',
}) {
  const isCritical = severity === 'CRITICAL';
  const isHigh = severity === 'HIGH';

  const styling = isCritical
    ? {
        container: 'bg-red-500/[0.08] border-red-500/25',
        iconColor: 'text-red-400',
        titleColor: 'text-red-200',
        subtextColor: 'text-red-300/70',
      }
    : isHigh
    ? {
        container: 'bg-amber-500/[0.08] border-amber-500/25',
        iconColor: 'text-amber-400',
        titleColor: 'text-amber-200',
        subtextColor: 'text-amber-300/70',
      }
    : {
        container: 'bg-blue-500/[0.08] border-blue-500/25',
        iconColor: 'text-blue-400',
        titleColor: 'text-blue-200',
        subtextColor: 'text-blue-300/70',
      };

  return (
    <div
      className={`rounded-xl border p-3.5 sm:p-4 transition-colors ${styling.container}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <AlertTriangle className={`h-5 w-5 ${styling.iconColor}`} aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h3 className={`text-[14.5px] sm:text-[15px] font-semibold leading-snug ${styling.titleColor}`}>
            {action}
          </h3>
          <p className={`text-xs sm:text-[13px] leading-relaxed ${styling.subtextColor}`}>
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
}
