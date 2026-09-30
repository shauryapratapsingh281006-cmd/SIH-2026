import React from 'react';
import { motion } from 'framer-motion';
import { MetricCardData } from '../../data/pixelwayTelemetry';

interface MetricCardProps {
  card: MetricCardData;
  index: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ card, index }) => {
  const getTrendColor = () => {
    switch (card.status) {
      case 'critical':
        return 'text-red-400';
      case 'warning':
        return 'text-amber-400';
      case 'safe':
        return 'text-emerald-400';
      default:
        return 'text-blue-400';
    }
  };

  const maxTrend = Math.max(...card.trend);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="p-5 sm:p-6 rounded-[16px] bg-[#0A1120] border border-[rgba(120,160,220,0.16)] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-blue-500/35 transition-all duration-300 group"
    >
      {/* Top: Telemetry code + change badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono font-semibold tracking-[0.08em] text-[#8295B5] uppercase">
          {card.label}
        </span>
        <span className={`text-[10.5px] font-mono ${getTrendColor()} truncate max-w-[120px] text-right`}>
          {card.change}
        </span>
      </div>

      {/* Primary Metric Value - FIXED: was card.value, now card.displayValue */}
      <div className="text-[34px] sm:text-[38px] font-bold text-[#F4F7FF] tracking-tight leading-none mb-3">
        {card.displayValue}
      </div>

      {/* Sparkline mini-bar chart */}
      <div className="flex items-end gap-[3px] h-9 mb-3">
        {card.trend.map((val, i) => {
          const heightPct = maxTrend > 0 ? (val / maxTrend) * 100 : 0;
          const isLast = i === card.trend.length - 1;
          return (
            <div
              key={i}
              className="flex-1 rounded-[2px] transition-all duration-300"
              style={{
                height: `${Math.max(8, heightPct)}%`,
                backgroundColor: card.accentColor,
                opacity: isLast ? 1 : 0.2 + (i / (card.trend.length - 1)) * 0.6,
                boxShadow: isLast ? `0 0 6px ${card.accentColor}80` : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Footer: subMeta info */}
      <div className="text-[11px] font-mono text-[#4D607A] truncate leading-tight">
        {card.subMeta}
      </div>
    </motion.div>
  );
};

export default MetricCard;
