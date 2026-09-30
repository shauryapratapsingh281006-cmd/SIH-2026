import React from 'react';

interface SimpleRegionalRisk {
  region: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE';
  score: number;
}

const REGIONS: SimpleRegionalRisk[] = [
  { region: 'Uttarakhand', riskLevel: 'CRITICAL', score: 84 },
  { region: 'Assam', riskLevel: 'HIGH', score: 76 },
  { region: 'Kerala', riskLevel: 'ELEVATED', score: 68 },
  { region: 'Odisha', riskLevel: 'MODERATE', score: 54 },
];

export const RegionalRiskChart: React.FC = () => {
  const getLevelStyle = (level: SimpleRegionalRisk['riskLevel']) => {
    switch (level) {
      case 'CRITICAL':
        return { text: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30', bar: 'bg-red-500' };
      case 'HIGH':
        return { text: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30', bar: 'bg-amber-500' };
      case 'ELEVATED':
        return { text: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30', bar: 'bg-blue-500' };
      case 'MODERATE':
        return { text: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', bar: 'bg-emerald-500' };
    }
  };

  return (
    <div className="p-6 rounded-[18px] bg-[#0A1120] border border-[rgba(120,160,220,0.16)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[18px] font-bold text-[#F4F7FF] tracking-tight">
          Risk signals by region
        </h3>
        <p className="text-[13px] text-[#8997B2] mt-1 font-normal">
          Top monitored sectors by composite threat index.
        </p>
      </div>

      {/* 4 Clean Rows */}
      <div className="space-y-4 flex-1 flex flex-col justify-around">
        {REGIONS.map((item) => {
          const style = getLevelStyle(item.riskLevel);

          return (
            <div key={item.region} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-[14.5px] font-semibold text-[#F4F7FF]">
                    {item.region}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border ${style.bg} ${style.text}`}
                  >
                    {item.riskLevel}
                  </span>
                </div>
                <span className="text-[14px] font-mono font-bold text-white">
                  {item.score}
                </span>
              </div>

              {/* Clean Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className={`h-full rounded-full ${style.bar}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionalRiskChart;
