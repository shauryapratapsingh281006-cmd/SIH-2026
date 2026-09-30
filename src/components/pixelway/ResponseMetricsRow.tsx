import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Box } from 'lucide-react';

export const ResponseMetricsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
      {/* CARD 1: Incoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="p-4 sm:p-4.5 rounded-[14px] bg-[#0A1120] border border-[rgba(120,160,220,0.14)] shadow-sm flex items-center justify-between hover:border-blue-500/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[20px] sm:text-[22px] font-bold text-[#F4F7FF] tracking-tight leading-none font-mono">
                198 / hr
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                +12%
              </span>
            </div>
            <div className="text-[12px] text-[#8997B2] mt-1 font-medium">
              Incoming Events
            </div>
          </div>
        </div>

        {/* Small line sparkline SVG */}
        <div className="w-16 h-7 opacity-80">
          <svg viewBox="0 0 64 28" fill="none" className="w-full h-full">
            <path
              d="M2 20 L14 16 L26 22 L38 10 L50 14 L62 4"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* CARD 2: Verified */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-4 sm:p-4.5 rounded-[14px] bg-[#0A1120] border border-[rgba(120,160,220,0.14)] shadow-sm flex items-center justify-between hover:border-emerald-500/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] sm:text-[22px] font-bold text-[#F4F7FF] tracking-tight leading-none font-mono">
              46%
            </div>
            <div className="text-[12px] text-[#8997B2] mt-1 font-medium">
              Verified
            </div>
          </div>
        </div>

        {/* Small bar sparkline */}
        <div className="flex items-end gap-1 h-7">
          {[35, 50, 42, 68, 85, 60, 92].map((val, i) => (
            <div
              key={i}
              className="w-1.5 rounded-t-[1.5px] bg-blue-500"
              style={{
                height: `${val}%`,
                opacity: 0.3 + (i / 6) * 0.7,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* CARD 3: Deployed */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="p-4 sm:p-4.5 rounded-[14px] bg-[#0A1120] border border-[rgba(120,160,220,0.14)] shadow-sm flex items-center justify-between hover:border-cyan-500/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[10px] bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 shrink-0">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[20px] sm:text-[22px] font-bold text-[#F4F7FF] tracking-tight leading-none font-mono">
              38
            </div>
            <div className="text-[12px] text-[#8997B2] mt-1 font-medium">
              Deployed
            </div>
          </div>
        </div>

        {/* Small emerald bar sparkline */}
        <div className="flex items-end gap-1 h-7">
          {[20, 38, 45, 60, 75, 88, 100].map((val, i) => (
            <div
              key={i}
              className="w-1.5 rounded-t-[1.5px] bg-emerald-400"
              style={{
                height: `${val}%`,
                opacity: 0.3 + (i / 6) * 0.7,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ResponseMetricsRow;
