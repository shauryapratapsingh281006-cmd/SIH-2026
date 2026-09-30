import React from 'react';

interface OperationsHeaderProps {
  timeframe: '7D' | '24H' | 'LIVE';
  setTimeframe: (tf: '7D' | '24H' | 'LIVE') => void;
  onRefresh?: () => void;
}

export const OperationsHeader: React.FC<OperationsHeaderProps> = ({
  timeframe,
  setTimeframe,
}) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
      {/* Title & Concise Subtitle */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-950/40 px-3 py-0.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#38BDF8] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
          REAL-TIME OPERATIONS
        </div>
        <h2 className="text-[36px] sm:text-[46px] lg:text-[52px] font-bold text-[#F4F7FF] tracking-tight leading-[1.08] mb-2">
          Real-time Operations
        </h2>
        <p className="text-[16px] text-[#91A4C2] max-w-[620px] font-normal leading-[1.5]">
          Continuous multi-agency hazard monitoring, regional probability tracking, and response dispatch.
        </p>
      </div>

      {/* Timeframe Controls & Live Pulse */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex p-1 bg-[#0A1120] rounded-[10px] border border-white/[0.08]">
          {(['7D', '24H', 'LIVE'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3.5 py-1.5 rounded-[7px] text-[12px] font-mono font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#8295B5] hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[#0A1120] border border-white/[0.08] text-[11.5px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
          <span>LIVE FEED</span>
        </div>
      </div>
    </div>
  );
};

export default OperationsHeader;
