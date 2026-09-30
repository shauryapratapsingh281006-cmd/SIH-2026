import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export const GeospatialGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center overflow-visible select-none">
      {/* Ambient background glow */}
      <div className="absolute w-[320px] h-[320px] rounded-full bg-blue-600/15 blur-[80px] pointer-events-none" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />

      {/* Floating Indicator 1: Top Left - Live Global Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-2 left-2 sm:left-4 z-20 px-3.5 py-2 rounded-[12px] bg-[#0A1224]/90 border border-blue-500/25 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center gap-2.5"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
        <div>
          <div className="text-[11px] font-mono font-bold text-white tracking-wide leading-tight">
            Live Global Monitoring
          </div>
          <div className="text-[10px] text-[#8997B2] leading-tight">
            Tracking risks. Saving lives.
          </div>
        </div>
      </motion.div>

      {/* Floating Indicator 2: Top Right - Active Alerts Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-2 right-2 sm:right-4 z-20 px-3.5 py-2 rounded-[12px] bg-[#140C16]/90 border border-red-500/30 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center gap-3"
      >
        <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-mono font-bold text-white leading-tight">47</span>
            <span className="text-[10.5px] font-mono text-red-400 font-semibold">Active Alerts</span>
          </div>
          <div className="text-[10px] font-mono text-red-400/90 leading-tight">
            ↑ +3 since 08:00
          </div>
        </div>
      </motion.div>

      {/* The Geospatial Sphere Visualization */}
      <div className="relative w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-full flex items-center justify-center">
        {/* Globe Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.25),inset_0_0_30px_rgba(59,130,246,0.15)]" />

        {/* Animated Latitude Ellipses */}
        <div className="absolute w-[98%] h-[38%] rounded-[100%] border border-blue-400/20" />
        <div className="absolute w-[92%] h-[68%] rounded-[100%] border border-blue-400/20" />
        <div className="absolute w-[98%] h-[98%] rounded-full border border-blue-400/10" />

        {/* Animated Longitude Meridian Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full flex items-center justify-center"
        >
          <div className="w-[34%] h-full rounded-[100%] border border-cyan-400/25" />
          <div className="w-[66%] h-full rounded-[100%] border border-cyan-400/20" />
          <div className="w-full h-[50%] rounded-[100%] border border-blue-400/20" />
        </motion.div>

        {/* Counter-rotating subtle orbital ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[116%] h-[42%] rounded-[100%] border border-blue-400/25 rotate-12 pointer-events-none"
        />

        {/* Globe Surface Coordinates & Pulse Markers */}
        <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center">
          {/* Subtle grid pattern inside sphere */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* India / Asia Geographic Center Marker */}
          <div className="absolute top-[38%] left-[52%]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_10px_#EF4444]" />
            </span>
            <div className="absolute -top-5 left-3 text-[9px] font-mono text-red-300 font-semibold whitespace-nowrap bg-black/70 px-1 rounded border border-red-500/30">
              Uttarakhand 84%
            </div>
          </div>

          {/* Assam Marker */}
          <div className="absolute top-[44%] left-[68%]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" style={{ animationDelay: '0.4s' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            </span>
          </div>

          {/* Kerala Marker */}
          <div className="absolute top-[62%] left-[48%]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" style={{ animationDelay: '0.8s' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
            </span>
          </div>

          {/* Odisha Marker */}
          <div className="absolute top-[52%] left-[58%]">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_#10B981]" />
            </span>
          </div>

          {/* Pacific / Global Active Sensor Node */}
          <div className="absolute top-[28%] left-[25%]">
            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-blue-400 shadow-[0_0_6px_#60A5FA]" />
          </div>

          <div className="absolute bottom-[25%] right-[25%]">
            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-blue-400/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialGlobe;
