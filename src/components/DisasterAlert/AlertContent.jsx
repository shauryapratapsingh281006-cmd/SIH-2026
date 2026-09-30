import React from 'react';
import { MapPin } from 'lucide-react';

export default function AlertContent({
  title = 'Flood risk detected',
  location = 'Wayanad, Kerala',
  description = 'Heavy rainfall is creating a high probability of rapid flooding in the monitored area.',
}) {
  return (
    <div className="space-y-3 pt-1">
      {/* Main Title & Affected Region */}
      <div className="space-y-1.5">
        <h2
          id="disaster-alert-heading"
          className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#F8FAFC] leading-[1.25]"
        >
          {title}
        </h2>

        {/* Location with Pin */}
        <div className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-medium text-blue-300/90">
          <MapPin className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
          <span>{location}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[15px] sm:text-[16px] text-slate-300/95 leading-relaxed max-w-[500px]">
        {description}
      </p>
    </div>
  );
}
