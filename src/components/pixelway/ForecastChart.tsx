import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  ForecastPoint,
  FORECAST_7D,
  FORECAST_24H,
  FORECAST_LIVE,
} from '../../data/pixelwayTelemetry';
import { Activity, Info, Filter, Sparkles, TrendingUp } from 'lucide-react';

interface ForecastChartProps {
  timeframe: '7D' | '24H' | 'LIVE';
}

interface RegionConfig {
  key: keyof Omit<ForecastPoint, 'day' | 'timestamp' | 'uttarakhandDelta' | 'assamDelta' | 'keralaDelta' | 'odishaDelta'>;
  name: string;
  color: string;
  gradId: string;
  riskStatus: string;
  defaultTrend: string;
}

const REGIONS: RegionConfig[] = [
  {
    key: 'uttarakhand',
    name: 'Uttarakhand',
    color: '#EF4444',
    gradId: 'gradUttarakhand',
    riskStatus: 'CRITICAL',
    defaultTrend: '+4.2%',
  },
  {
    key: 'assam',
    name: 'Assam',
    color: '#F59E0B',
    gradId: 'gradAssam',
    riskStatus: 'ELEVATED',
    defaultTrend: '+3.1%',
  },
  {
    key: 'kerala',
    name: 'Kerala',
    color: '#3B82F6',
    gradId: 'gradKerala',
    riskStatus: 'WATCH',
    defaultTrend: '+2.8%',
  },
  {
    key: 'odisha',
    name: 'Odisha',
    color: '#10B981',
    gradId: 'gradOdisha',
    riskStatus: 'STABLE',
    defaultTrend: '+0.5%',
  },
];

/* Custom High-Tech Operational Intelligence Tooltip */
const OperationalTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const currentData = payload[0]?.payload as ForecastPoint;

  return (
    <div className="bg-[#080E1B]/95 border border-white/[0.14] rounded-xl p-3.5 shadow-2xl backdrop-blur-xl min-w-[240px] text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            {label} TELEMETRY
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
          MODEL v3.2
        </span>
      </div>

      {/* Region rows */}
      <div className="space-y-2">
        {payload.map((p: any) => {
          const region = REGIONS.find((r) => r.key === p.dataKey);
          if (!region) return null;

          const deltaKey = `${p.dataKey}Delta` as keyof ForecastPoint;
          const delta = (currentData && currentData[deltaKey]) || region.defaultTrend;

          return (
            <div
              key={p.dataKey}
              className="flex items-center justify-between gap-3 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shadow-sm"
                  style={{ backgroundColor: region.color }}
                />
                <span className="font-semibold text-white tracking-wide">
                  {region.name.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-bold text-white text-sm">
                  {p.value}%
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    region.riskStatus === 'CRITICAL'
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : region.riskStatus === 'ELEVATED'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : region.riskStatus === 'WATCH'
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {region.riskStatus}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5 text-slate-400" />
                  {delta}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip Footer */}
      <div className="mt-2.5 pt-2 border-t border-white/[0.06] text-[10px] text-slate-400 flex items-center justify-between">
        <span>Variance: ±1.8%</span>
        <span>Confidence: 91.4%</span>
      </div>
    </div>
  );
};

export const ForecastChart: React.FC<ForecastChartProps> = ({ timeframe }) => {
  // Active region filters (allow toggling individual lines)
  const [activeRegions, setActiveRegions] = useState<Record<string, boolean>>({
    uttarakhand: true,
    assam: true,
    kerala: true,
    odisha: true,
  });

  const toggleRegion = (key: string) => {
    setActiveRegions((prev) => {
      // Don't disable all
      const count = Object.values(prev).filter(Boolean).length;
      if (count === 1 && prev[key]) return prev;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const chartData =
    timeframe === '24H'
      ? FORECAST_24H
      : timeframe === 'LIVE'
      ? FORECAST_LIVE
      : FORECAST_7D;

  return (
    <div className="relative p-6 sm:p-7 rounded-2xl bg-[#080E1C]/95 border border-white/[0.09] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Top Header Block */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-[#F1F5FF] tracking-tight">
              Disaster probability · {timeframe === '7D' ? '7-day forecast' : timeframe === '24H' ? '24-hour progression' : 'Real-time telemetry'}
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.07] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              Predictive Model v3.2
            </span>
            <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              DEMO DATA · SYNTHETIC FORECAST
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#8997B2] font-normal">
            Calculated per multi-source saturation, riverine stage & seismic variance.
          </p>
        </div>

        {/* Interactive Region Legend Filter Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" />
            Layers:
          </span>
          {REGIONS.map((region) => {
            const isActive = activeRegions[region.key];
            return (
              <button
                key={region.key}
                onClick={() => toggleRegion(region.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white/[0.06] border-white/[0.16] text-white shadow-sm'
                    : 'bg-transparent border-white/[0.05] text-slate-400 opacity-50 hover:opacity-80'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full transition-transform"
                  style={{
                    backgroundColor: region.color,
                    boxShadow: isActive ? `0 0 6px ${region.color}` : 'none',
                  }}
                />
                <span className="text-[11px] font-medium">{region.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="h-[280px] sm:h-[320px] md:h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 12, right: 12, left: -14, bottom: 4 }}
          >
            <defs>
              <linearGradient id="gradUttarakhand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradAssam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradKerala" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradOdisha" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="rgba(137,151,178,0.3)"
              tick={{ fill: '#8997B2', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
              dy={6}
            />

            <YAxis
              stroke="rgba(137,151,178,0.3)"
              tick={{ fill: '#8997B2', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip content={<OperationalTooltip />} />

            {activeRegions.uttarakhand && (
              <Area
                type="monotone"
                dataKey="uttarakhand"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#gradUttarakhand)"
                dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#EF4444', stroke: '#FFF', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={900}
              />
            )}

            {activeRegions.assam && (
              <Area
                type="monotone"
                dataKey="assam"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#gradAssam)"
                dot={{ r: 3, fill: '#F59E0B', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#F59E0B', stroke: '#FFF', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1000}
              />
            )}

            {activeRegions.kerala && (
              <Area
                type="monotone"
                dataKey="kerala"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#gradKerala)"
                dot={{ r: 3, fill: '#3B82F6', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#3B82F6', stroke: '#FFF', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1100}
              />
            )}

            {activeRegions.odisha && (
              <Area
                type="monotone"
                dataKey="odisha"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#gradOdisha)"
                dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#10B981', stroke: '#FFF', strokeWidth: 2 }}
                isAnimationActive={true}
                animationDuration={1200}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Chart Metadata Bar */}
      <div className="mt-4 pt-3 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            <Info className="w-3 h-3 text-blue-400" />
            Hover point for region breakdown & delta variance
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40">CALIBRATION: SATELLITE RADAR INSAR</span>
          <span className="text-emerald-400">SYNC: 100% OK</span>
        </div>
      </div>
    </div>
  );
};
