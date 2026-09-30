import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Navigation2, BellRing, Target, Layers } from 'lucide-react';

export interface IntelligenceLayerProps {
  activeNode?: string | null;
}

const CAPABILITIES = [
  { name: 'AI Risk Detection', icon: Brain },
  { name: 'Real-time GPS', icon: Navigation2 },
  { name: 'Triage', icon: BellRing },
  { name: 'Priority Scoring', icon: Target },
  { name: 'Multi-agency Dispatch', icon: Layers },
];

export const IntelligenceLayer: React.FC<IntelligenceLayerProps> = ({ activeNode }) => {
  const isAnyActive = !!activeNode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-2xl overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, rgba(12, 24, 56, 0.8) 0%, rgba(8, 15, 36, 0.9) 100%)',
        border: `1px solid ${isAnyActive ? 'rgba(96, 165, 250, 0.40)' : 'rgba(96, 165, 250, 0.20)'}`,
        boxShadow: isAnyActive
          ? '0 0 0 1px rgba(96,165,250,0.15), 0 16px 56px -8px rgba(0,0,0,0.65), 0 0 48px -8px rgba(96,165,250,0.18)'
          : '0 8px 40px -8px rgba(0,0,0,0.55), 0 0 24px -8px rgba(96,165,250,0.10)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Subtle top accent glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, rgba(96,165,250,0.6) 35%, rgba(45,212,191,0.6) 65%, transparent 95%)',
        }}
      />

      {/* Animated radial ambient on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(ellipse 70% 140% at 50% -20%, rgba(96,165,250,0.12), transparent 65%)',
        }}
      />

      {/* Inner grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-0 min-h-[96px]">
        {/* LEFT — Brand identity */}
        <div
          className="flex items-center gap-4 px-6 py-4 md:py-0 h-[96px] shrink-0 md:w-[28%]"
          style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Logo mark */}
          <div
            className="flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-105"
            style={{
              width: 42,
              height: 42,
              background: 'rgba(96,165,250,0.08)',
              border: '1px solid rgba(96,165,250,0.25)',
              color: '#60A5FA',
              boxShadow: '0 0 20px rgba(96,165,250,0.18)',
            }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          <div className="space-y-0.5">
            <h4 className="text-[16px] font-bold text-[#F0F4FF] tracking-tight">
              PIXELWAY
            </h4>
            <p className="text-[11px] font-mono text-[#5A728F] leading-tight">
              Intelligent coordination layer.
            </p>
          </div>
        </div>

        {/* CENTER — Core description */}
        <div
          className="flex flex-col justify-center px-6 py-4 md:py-0 h-[96px] md:w-[32%]"
          style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.10em] text-[#4A6080] mb-1">
            Core Function
          </div>
          <p className="text-[13px] leading-[1.4] text-[#8BA5C4]">
            Unified telemetry, verification and multi-agency response dispatch.
          </p>
        </div>

        {/* RIGHT — Capabilities grid */}
        <div className="flex flex-col justify-center px-6 py-4 md:py-0 h-[96px] flex-1">
          <div className="font-mono text-[9px] uppercase tracking-[0.10em] text-[#4A6080] mb-2">
            Capabilities
          </div>
          <div className="flex items-center justify-between gap-2">
            {CAPABILITIES.map((cap, idx) => (
              <motion.div
                key={cap.name}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 + idx * 0.05 }}
                className="flex flex-col items-center gap-1.5 group/cap"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[#60A5FA] group-hover/cap:bg-[#60A5FA]/10 group-hover/cap:border-[#60A5FA]/30 group-hover/cap:text-blue-400 transition-all duration-300">
                  <cap.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-medium text-[#7A90B0] group-hover/cap:text-[#C8D8F0] transition-colors text-center max-w-[60px] leading-[1.2]">
                  {cap.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntelligenceLayer;
