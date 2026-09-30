import React from 'react';

interface SimpleIncident {
  location: string;
  threat: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

const LATEST_INCIDENTS: SimpleIncident[] = [
  {
    location: 'Idukki, Kerala',
    threat: 'Reservoir inflow spike',
    severity: 'HIGH',
  },
  {
    location: 'Dibrugarh, Assam',
    threat: 'Brahmaputra bank erosion',
    severity: 'CRITICAL',
  },
  {
    location: 'Darbhanga, Bihar',
    threat: 'Runoff alert',
    severity: 'MEDIUM',
  },
  {
    location: 'Rishikesh, Uttarakhand',
    threat: 'Ganga discharge spike',
    severity: 'HIGH',
  },
];

export const IncidentStream: React.FC = () => {
  const getSeverityPill = (severity: SimpleIncident['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-500/15 border-red-500/30';
      case 'HIGH':
        return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
      case 'MEDIUM':
        return 'text-blue-400 bg-blue-500/15 border-blue-500/30';
    }
  };

  const getDotColor = (severity: SimpleIncident['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-400 shadow-[0_0_6px_#F87171]';
      case 'HIGH':
        return 'bg-amber-400 shadow-[0_0_6px_#FBBF24]';
      case 'MEDIUM':
        return 'bg-blue-400 shadow-[0_0_6px_#60A5FA]';
    }
  };

  return (
    <div className="p-6 rounded-[18px] bg-[#0A1120] border border-[rgba(120,160,220,0.16)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full">
      <div className="mb-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-[#F4F7FF] tracking-tight">
            Live Incident Stream
          </h3>
          <p className="text-[12.5px] text-[#8997B2] mt-0.5">
            Real-time multi-channel incident feed.
          </p>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
      </div>

      <div className="space-y-3 flex-1 flex flex-col justify-around py-1">
        {LATEST_INCIDENTS.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.04]"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getDotColor(item.severity)}`} />
              <div className="min-w-0">
                <span className="text-[13.5px] font-semibold text-white block leading-tight truncate">
                  {item.location}
                </span>
                <span className="text-[12px] text-[#8997B2] block leading-tight truncate mt-0.5">
                  {item.threat}
                </span>
              </div>
            </div>

            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border shrink-0 ${getSeverityPill(
                item.severity
              )}`}
            >
              {item.severity}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-white/[0.06] text-right">
        <span className="text-[12px] font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
          View all incidents →
        </span>
      </div>
    </div>
  );
};

export default IncidentStream;
