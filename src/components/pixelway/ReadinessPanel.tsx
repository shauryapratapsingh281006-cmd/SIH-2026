import React from 'react';

const READINESS_ITEMS = [
  { name: 'Medical Teams', percent: 83, color: 'bg-emerald-400' },
  { name: 'Rescue Teams', percent: 76, color: 'bg-blue-400' },
  { name: 'Transport', percent: 91, color: 'bg-cyan-400' },
  { name: 'Relief Supplies', percent: 68, color: 'bg-amber-400' },
  { name: 'Shelter Capacity', percent: 72, color: 'bg-purple-400' },
];

export const ReadinessPanel: React.FC = () => {
  return (
    <div className="p-6 rounded-[18px] bg-[#0A1120] border border-[rgba(120,160,220,0.16)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
      <div className="mb-5 pb-3 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-[#F4F7FF] tracking-tight">
            Response Readiness
          </h3>
          <p className="text-[12.5px] text-[#8997B2] mt-0.5">
            Operational capacity across core relief verticals.
          </p>
        </div>
        <span className="text-[12px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-[5px] bg-emerald-500/10 border border-emerald-500/25">
          83% Overall
        </span>
      </div>

      <div className="space-y-3.5 flex-1 flex flex-col justify-around">
        {READINESS_ITEMS.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-[#E2E8F0]">{item.name}</span>
              <span className="font-mono font-bold text-[#A6B9D6]">{item.percent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadinessPanel;
