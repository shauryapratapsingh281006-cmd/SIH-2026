import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Truck, Landmark, Play, ArrowRight } from 'lucide-react';
import { ActorCard, ActorAccent } from './ActorCard';
import { ConnectionLines } from './ConnectionLines';
import { IntelligenceLayer } from './IntelligenceLayer';

import globeImage from '../assets/dark_earth_globe.jpg';

interface ActorData {
  id: string;
  index: string;
  header: string;
  title: string;
  description: string;
  footer: string;
  icon: typeof Users;
  accent: ActorAccent;
}

const ACTORS_DATA: ActorData[] = [
  {
    id: 'people',
    index: '01',
    header: '01 / PEOPLE',
    title: 'People',
    description: 'Report conditions, request evacuation, and receive location-based alerts.',
    footer: 'GROUND REPORTS & GPS',
    icon: Users,
    accent: 'blue',
  },
  {
    id: 'ngos',
    index: '02',
    header: '02 / NGOS & RESPONDERS',
    title: 'NGOs & Responders',
    description: 'Coordinate teams, supplies, transport, and emergency response.',
    footer: 'MOBILIZATION & FLEETS',
    icon: Truck,
    accent: 'teal',
  },
  {
    id: 'gov',
    index: '03',
    header: '03 / GOVERNMENT',
    title: 'Government',
    description: 'Authorize action, allocate resources, and track relief delivery.',
    footer: 'POLICY & FUNDS',
    icon: Landmark,
    accent: 'indigo',
  },
];

const FloatingLabel = ({ actor, style, delay = 0, isHovered }: any) => {
  const accentColors = {
    blue: { bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.3)', text: '#60A5FA' },
    teal: { bg: 'rgba(45, 212, 191, 0.1)', border: 'rgba(45, 212, 191, 0.3)', text: '#2DD4BF' },
    indigo: { bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.3)', text: '#A78BFA' },
  };
  const colors = accentColors[actor.accent as ActorAccent];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute z-20 flex items-center gap-3 pr-4 pl-1.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
      style={{
        ...style,
        background: 'rgba(10, 15, 28, 0.6)',
        border: `1px solid ${isHovered ? colors.text : 'rgba(255,255,255,0.1)'}`,
        boxShadow: isHovered ? `0 0 20px ${colors.bg}` : '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <div 
        className="flex items-center justify-center w-8 h-8 rounded-full"
        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
      >
        <actor.icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-[13px] font-bold text-white leading-tight">{actor.title}</span>
        <span className="text-[10px] font-mono text-[#8BA5C4] leading-tight">{actor.footer}</span>
      </div>
    </motion.div>
  );
};

export const PixelwayArchitecture: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section
      id="architecture"
      className="section-heavy relative w-full overflow-hidden flex flex-col items-center border-t border-b border-white/[0.06]"
      style={{
        background: '#030711',
      }}
    >
      {/* ── Background: subtle stars / grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 w-full"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* ── CENTERED CONTAINER (Exact 1200px System) ── */}
      <div className="app-container relative flex flex-col items-center">
        
        {/* ══ HERO SECTION ══ */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-10 lg:mb-12 gap-10">
          
          {/* LEFT: Text & Buttons (~40%) */}
          <div className="flex flex-col items-start w-full lg:w-[42%] z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-3.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#60A5FA',
              }}
            >
              COORDINATION ARCHITECTURE
              <div className="w-10 h-[1px] bg-[#60A5FA]/40 ml-2" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.07 }}
              className="font-bold tracking-tight leading-[1.05] text-[#F0F4FF] text-[42px] md:text-[56px] lg:text-[64px] mb-4"
            >
              Three actors.<br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #60A5FA 0%, #2DD4BF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                One shared layer.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[16px] md:text-[18px] max-w-[480px]"
              style={{ lineHeight: 1.5, color: '#8BA5C4' }}
            >
              Connecting distributed ground intelligence with rapid-response logistics and strategic command in high-stakes environments.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 mt-7"
            >
              <a
                href="#auth"
                className="group flex items-center justify-center gap-2 h-[46px] px-5 rounded-[11px] bg-blue-600 hover:bg-blue-500 text-white font-medium text-[13.5px] shadow-[0_2px_16px_rgba(37,99,235,0.4)] hover:-translate-y-[1px] transition-all cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                type="button"
                className="group flex items-center justify-center gap-2 h-[46px] px-4.5 rounded-[11px] bg-white/[0.04] border border-white/[0.12] text-[#E2E8F0] hover:text-white font-medium text-[13.5px] hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#2DD4BF]" />
                <span>Watch How It Works</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Globe Visualization (~58%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-[58%] h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            {/* The Globe Image Background */}
            <div 
              className="absolute right-[-10%] md:right-0 top-0 bottom-0 w-[120%] md:w-[100%] rounded-full opacity-90"
              style={{
                backgroundImage: `url(${globeImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
                maskImage: 'radial-gradient(circle at 70% 50%, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 70% 50%, black 40%, transparent 70%)',
              }}
            />
            
            {/* Subtle glow behind globe */}
            <div className="absolute right-0 w-[80%] h-[80%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

            {/* Network Connections overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.5))' }}>
              <motion.path
                d="M 20% 50% Q 50% 30% 70% 25%"
                fill="none"
                stroke="rgba(96, 165, 250, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              <motion.path
                d="M 20% 50% Q 50% 60% 80% 55%"
                fill="none"
                stroke="rgba(45, 212, 191, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
              <motion.path
                d="M 70% 25% Q 75% 40% 80% 55%"
                fill="none"
                stroke="rgba(167, 139, 250, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.9 }}
              />
            </svg>

            {/* Actor Floating Labels */}
            <FloatingLabel 
              actor={ACTORS_DATA[0]} 
              style={{ left: '10%', top: '45%' }} 
              delay={0.6}
              isHovered={activeNode === 'people'}
            />
            <FloatingLabel 
              actor={ACTORS_DATA[2]} 
              style={{ right: '15%', top: '15%' }} 
              delay={0.8}
              isHovered={activeNode === 'gov'}
            />
            <FloatingLabel 
              actor={ACTORS_DATA[1]} 
              style={{ right: '5%', top: '50%' }} 
              delay={1.0}
              isHovered={activeNode === 'ngos'}
            />
            
          </motion.div>
        </div>

        {/* ══ BOTTOM SECTION: Cards & Core Layer ══ */}
        <div className="flex flex-col w-full gap-8 relative z-20">
          
          {/* Three actor cards (Horizontal Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {ACTORS_DATA.map((actor, idx) => (
              <ActorCard
                key={actor.id}
                {...actor}
                customIndex={idx}
                isActive={activeNode === actor.id}
                onHover={setActiveNode}
              />
            ))}
          </div>

          {/* Connection lines bridging cards → core */}
          <div className="hidden md:block w-full h-[32px]">
            <ConnectionLines activeNode={activeNode} />
          </div>

          {/* Central Intelligence Layer */}
          <div className="w-full">
            <IntelligenceLayer activeNode={activeNode} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PixelwayArchitecture;
