import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  ALERT_DISTRIBUTION_DATA,
  AlertCategoryItem,
} from '../../data/pixelwayTelemetry';
import { PieChart as PieIcon } from 'lucide-react';

export const AlertDistribution: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<AlertCategoryItem | null>(null);

  const totalAlerts = ALERT_DISTRIBUTION_DATA.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="relative p-6 rounded-2xl bg-[#080E1C]/95 border border-white/[0.09] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-1 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-[#F1F5FF] tracking-tight">
              Alert distribution
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.07]">
            6 THREAT VECTORS
          </span>
        </div>

        <p className="text-xs text-[#8997B2] mb-3">
          Categorical breakdown of 47 current active disaster warnings.
        </p>

        {/* Donut Chart with Centered Total */}
        <div className="relative h-[200px] w-full flex items-center justify-center my-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ALERT_DISTRIBUTION_DATA}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={84}
                paddingAngle={3}
                onMouseEnter={(_, index) => setActiveCategory(ALERT_DISTRIBUTION_DATA[index])}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {ALERT_DISTRIBUTION_DATA.map((entry) => (
                  <Cell
                    key={`cell-${entry.id}`}
                    fill={entry.color}
                    stroke="rgba(8,14,28,0.9)"
                    strokeWidth={2}
                    className="cursor-pointer transition-all duration-200 hover:opacity-85"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Total Active Alerts Display */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            {activeCategory ? (
              <>
                <span
                  className="text-2xl font-mono font-bold tracking-tight leading-none"
                  style={{ color: activeCategory.color }}
                >
                  {activeCategory.count}
                </span>
                <span className="text-[10px] font-mono font-semibold text-slate-200 mt-1 uppercase tracking-wider">
                  {activeCategory.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {activeCategory.percentage}%
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-mono font-bold text-white tracking-tight leading-none">
                  {totalAlerts}
                </span>
                <span className="text-[9px] font-mono font-semibold text-slate-400 mt-1 uppercase tracking-widest">
                  ACTIVE ALERTS
                </span>
              </>
            )}
          </div>
        </div>

        {/* Custom Legend / Category Breakdown */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {ALERT_DISTRIBUTION_DATA.map((item) => {
            const isSelected = activeCategory?.id === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCategory(item)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`p-1.5 px-2 rounded-lg border transition-all duration-150 cursor-pointer flex items-center justify-between text-xs font-mono ${
                  isSelected
                    ? 'bg-white/[0.08] border-white/[0.20]'
                    : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 truncate text-[11px]">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  <span className="font-bold text-white text-[11px]">{item.count}</span>
                  <span className="text-slate-400 text-[10px]">{item.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Callout */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.06] text-[10px] font-mono text-slate-400 flex items-center justify-between">
        <span>PRIMARY: FLOOD (40.4%)</span>
        <span className="text-cyan-400">SATURATION MESH</span>
      </div>
    </div>
  );
};
