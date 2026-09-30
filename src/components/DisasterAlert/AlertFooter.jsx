import React from 'react';

export default function AlertFooter({
  engineName = 'Pixelway Risk Engine',
  updatedSecondsAgo = 22,
}) {
  return (
    <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-500">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      <span>{engineName}</span>
      <span className="text-slate-600">•</span>
      <span>Updated {updatedSecondsAgo} sec ago</span>
    </div>
  );
}
