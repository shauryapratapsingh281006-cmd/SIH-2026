import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { RESPONSE_ACTIVITY_DATA } from '../../data/pixelwayTelemetry';

export const ResponseActivityChart: React.FC = () => {
  return (
    <div className="p-6 rounded-[18px] bg-[#0A1120] border border-[rgba(120,160,220,0.16)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-[#F4F7FF] tracking-tight">
            Response Activity
          </h3>
          <p className="text-[12.5px] text-[#8997B2] mt-0.5">
            Hourly event progression and field deployments.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Incoming
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> Verified
          </span>
        </div>
      </div>

      {/* Chart Area - FIXED: XAxis dataKey was "hour", now correctly "time" */}
      <div className="w-full h-[140px] my-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={RESPONSE_ACTIVITY_DATA}
            margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorVer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            {/* Fixed: was dataKey="hour", data has field "time" */}
            <XAxis
              dataKey="time"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#070C18',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '11px',
              }}
            />
            <Area
              type="monotone"
              dataKey="incomingReports"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInc)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="verifiedIncidents"
              stroke="#22D3EE"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVer)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Row */}
      <div className="pt-3 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[14px] font-bold text-white font-mono block">198 / hr</span>
          <span className="text-[10.5px] text-[#7B8EA8] uppercase font-mono">Incoming</span>
        </div>
        <div>
          <span className="text-[14px] font-bold text-cyan-400 font-mono block">46%</span>
          <span className="text-[10.5px] text-[#7B8EA8] uppercase font-mono">Verified</span>
        </div>
        <div>
          <span className="text-[14px] font-bold text-emerald-400 font-mono block">38</span>
          <span className="text-[10.5px] text-[#7B8EA8] uppercase font-mono">Deployed</span>
        </div>
      </div>
    </div>
  );
};

export default ResponseActivityChart;
