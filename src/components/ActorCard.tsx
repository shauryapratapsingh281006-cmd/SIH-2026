import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export type ActorAccent = 'blue' | 'teal' | 'indigo';

export interface ActorCardProps {
  id: string;
  index: string;
  header: string;
  title: string;
  description: string;
  footer: string;
  icon: LucideIcon;
  accent: ActorAccent;
  isActive: boolean;
  onHover: (id: string | null) => void;
  customIndex?: number;
}

const ACCENTS: Record<ActorAccent, {
  primary: string;
  glow: string;
  iconBg: string;
  iconBorder: string;
  border: string;
  activeBorder: string;
  tag: string;
  tagText: string;
  dot: string;
  shimmer: string;
  topLine: string;
}> = {
  blue: {
    primary: '#60A5FA',
    glow: 'rgba(96, 165, 250, 0.25)',
    iconBg: 'rgba(96, 165, 250, 0.08)',
    iconBorder: 'rgba(96, 165, 250, 0.22)',
    border: 'rgba(96, 165, 250, 0.14)',
    activeBorder: 'rgba(96, 165, 250, 0.50)',
    tag: 'rgba(96, 165, 250, 0.08)',
    tagText: '#60A5FA',
    dot: '#60A5FA',
    shimmer: 'rgba(96, 165, 250, 0.06)',
    topLine: '#60A5FA',
  },
  teal: {
    primary: '#2DD4BF',
    glow: 'rgba(45, 212, 191, 0.25)',
    iconBg: 'rgba(45, 212, 191, 0.08)',
    iconBorder: 'rgba(45, 212, 191, 0.22)',
    border: 'rgba(45, 212, 191, 0.14)',
    activeBorder: 'rgba(45, 212, 191, 0.50)',
    tag: 'rgba(45, 212, 191, 0.08)',
    tagText: '#2DD4BF',
    dot: '#2DD4BF',
    shimmer: 'rgba(45, 212, 191, 0.06)',
    topLine: '#2DD4BF',
  },
  indigo: {
    primary: '#A78BFA',
    glow: 'rgba(167, 139, 250, 0.25)',
    iconBg: 'rgba(167, 139, 250, 0.08)',
    iconBorder: 'rgba(167, 139, 250, 0.22)',
    border: 'rgba(167, 139, 250, 0.14)',
    activeBorder: 'rgba(167, 139, 250, 0.50)',
    tag: 'rgba(167, 139, 250, 0.08)',
    tagText: '#A78BFA',
    dot: '#A78BFA',
    shimmer: 'rgba(167, 139, 250, 0.06)',
    topLine: '#A78BFA',
  },
};

export const ActorCard: React.FC<ActorCardProps> = ({
  id,
  header,
  title,
  description,
  footer,
  icon: Icon,
  accent,
  isActive,
  onHover,
  customIndex = 0,
}) => {
  const a = ACCENTS[accent];
  const indexStr = `0${customIndex + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: customIndex * 0.10,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      role="region"
      aria-label={`${title} coordination actor`}
      className="group relative flex w-full rounded-[14px] select-none cursor-pointer overflow-hidden transition-all duration-300 h-[135px]"
      style={{
        background: 'linear-gradient(160deg, rgba(14, 22, 44, 0.8) 0%, rgba(8, 13, 26, 0.9) 100%)',
        border: `1px solid ${isActive ? a.activeBorder : a.border}`,
        boxShadow: isActive
          ? `0 0 0 1px ${a.activeBorder}, 0 16px 48px -8px rgba(0,0,0,0.6), 0 0 32px -4px ${a.glow}`
          : '0 4px 24px -4px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
        transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Hover shimmer overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 200px at 80% 50%, ${a.shimmer}, transparent 65%)`,
        }}
      />

      {/* Index Number (Top Left) */}
      <div className="absolute top-3 left-3 flex items-center justify-center w-7 h-7 rounded bg-white/[0.03] border border-white/[0.05]">
        <span className="font-mono text-[10px] font-medium text-[#8BA5C4]">{indexStr}</span>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 flex w-full h-full p-4 pl-14 items-center gap-4">
        
        {/* Left: Icon */}
        <div
          className="flex items-center justify-center rounded-[14px] shrink-0 transition-transform duration-300 ease-out group-hover:scale-105"
          style={{
            width: 48,
            height: 48,
            background: `radial-gradient(circle at center, ${a.iconBg}, transparent 80%)`,
            border: `1px solid ${a.iconBorder}`,
            color: a.primary,
            boxShadow: `0 0 15px ${a.glow}, inset 0 0 10px ${a.glow}`,
          }}
        >
          <Icon className="w-5 h-5" strokeWidth={1.8} />
        </div>

        {/* Center: Text & Footer */}
        <div className="flex flex-col justify-center flex-1 h-full py-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-[#F0F4FF] mb-1 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-[12px] leading-[1.4] text-[#8BA5C4] line-clamp-2 max-w-[90%] mb-auto">
            {description}
          </p>
          
          {/* Footer Line & Label */}
          <div className="flex items-center gap-2 mt-2">
            <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: a.topLine }} />
            <div className="h-[2px] flex-1 rounded-full opacity-20" style={{ backgroundColor: a.topLine }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#5A6E8F] shrink-0 pl-2">
              {footer}
            </span>
          </div>
        </div>

        {/* Right: Arrow Button */}
        <div className="flex items-center justify-center pr-2 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#8BA5C4] group-hover:border-white/[0.15] group-hover:bg-white/[0.05] group-hover:text-white transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActorCard;
