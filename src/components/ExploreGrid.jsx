import { motion } from 'framer-motion';
import { exploreRegions } from '../data/mockData';

/* Minimal topographic/satellite SVG patterns for card headers */
const regionThumbnails = {
  Kerala: (
    <svg viewBox="0 0 320 96" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gKerala" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D172A" /><stop offset="100%" stopColor="#070D18" />
        </linearGradient>
      </defs>
      <rect width="320" height="96" fill="url(#gKerala)" />
      <path d="M0,74 Q60,32 140,58 T320,42 L320,96 L0,96 Z" fill="rgba(59,130,246,0.12)" />
      <path d="M0,52 Q80,22 200,64 T320,32 L320,96 L0,96 Z" fill="rgba(16,185,129,0.08)" />
      <circle cx="210" cy="42" r="3" fill="#EF4444" />
      <circle cx="210" cy="42" r="8" fill="rgba(239,68,68,0.2)" />
    </svg>
  ),
  Uttarakhand: (
    <svg viewBox="0 0 320 96" className="w-full h-full" preserveAspectRatio="none">
      <rect width="320" height="96" fill="#0D1629" />
      <polygon points="0,96 50,32 110,68 170,22 230,58 290,16 320,48 320,96" fill="rgba(239,68,68,0.10)" />
      <polygon points="0,96 70,52 140,78 220,36 320,68 320,96" fill="rgba(59,130,246,0.07)" />
      <circle cx="170" cy="22" r="3" fill="#EF4444" />
      <circle cx="170" cy="22" r="8" fill="rgba(239,68,68,0.2)" />
    </svg>
  ),
  'Assam Floodplain': (
    <svg viewBox="0 0 320 96" className="w-full h-full" preserveAspectRatio="none">
      <rect width="320" height="96" fill="#0A1424" />
      <path d="M0,48 Q70,78 160,38 T320,58" stroke="rgba(59,130,246,0.25)" strokeWidth="2.5" fill="none" />
      <path d="M0,64 Q80,88 180,48 T320,74" stroke="rgba(245,158,11,0.18)" strokeWidth="1.8" fill="none" />
      <circle cx="160" cy="38" r="3" fill="#F59E0B" />
      <circle cx="160" cy="38" r="8" fill="rgba(245,158,11,0.2)" />
    </svg>
  ),
  'Odisha Coast': (
    <svg viewBox="0 0 320 96" className="w-full h-full" preserveAspectRatio="none">
      <rect width="320" height="96" fill="#0C162B" />
      <path d="M0,64 C60,42 120,78 180,52 C240,26 280,68 320,48 L320,96 L0,96 Z" fill="rgba(59,130,246,0.12)" />
      <circle cx="180" cy="52" r="3" fill="#F59E0B" />
      <circle cx="180" cy="52" r="8" fill="rgba(245,158,11,0.2)" />
    </svg>
  ),
  Rajasthan: (
    <svg viewBox="0 0 320 96" className="w-full h-full" preserveAspectRatio="none">
      <rect width="320" height="96" fill="#121422" />
      <path d="M0,68 Q80,48 160,64 T320,54 L320,96 L0,96 Z" fill="rgba(245,158,11,0.07)" />
      <path d="M0,78 Q100,58 200,74 T320,64 L320,96 L0,96 Z" fill="rgba(255,255,255,0.02)" />
      <circle cx="130" cy="58" r="3" fill="#8997B2" />
    </svg>
  ),
  Maharashtra: (
    <svg viewBox="0 0 320 96" className="w-full h-full" preserveAspectRatio="none">
      <rect width="320" height="96" fill="#0B1528" />
      <path d="M0,58 Q60,36 120,64 T240,42 T320,68 L320,96 L0,96 Z" fill="rgba(99,102,241,0.10)" />
      <circle cx="220" cy="48" r="3" fill="#F59E0B" />
      <circle cx="220" cy="48" r="8" fill="rgba(245,158,11,0.2)" />
    </svg>
  ),
};

export default function ExploreGrid() {
  return (
    <section id="explore" className="section-wrapper bg-[#050812] border-t border-white/[0.06]">
      <div className="app-container">
        {/* Section Header with Strict Spacing Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-9 lg:mb-10"
        >
          <div className="section-eyebrow">
            REGIONAL OBSERVATORY
          </div>
          <h2 className="section-title mb-4">
            Browse monitored regions
          </h2>
          <p className="section-desc max-w-xl mx-auto">
            Explore active zones, risk levels, response activity, and emerging disaster patterns.
          </p>
        </motion.div>

        {/* 3 Columns Desktop Grid (Equal Heights) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {exploreRegions.map((region, idx) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="saas-card overflow-hidden flex flex-col justify-between h-full group"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-24 w-full border-b border-white/[0.06] overflow-hidden">
                  {regionThumbnails[region.name] || regionThumbnails['Kerala']}
                  
                  {/* Risk Badge overlay */}
                  <div className="absolute top-3 right-3">
                    <span className={`badge-status ${
                      region.riskTag === 'CRITICAL' ? 'badge-critical' :
                      region.riskTag === 'SEVERE' ? 'badge-critical' :
                      region.riskTag === 'HIGH' ? 'badge-warning' : 'badge-neutral'
                    }`}>
                      {region.riskTag}
                    </span>
                  </div>

                  {/* Weather Telemetry Pill */}
                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/[0.06]">
                    {region.weatherMetric}
                  </div>
                </div>

                {/* Body Content with Controlled Line Length */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-[18px] font-semibold text-[#F1F5FF] group-hover:text-blue-300 transition-colors">
                      {region.name}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mb-2.5">
                    {region.zone}
                  </div>
                  <p className="text-[13.5px] text-[#8997B2] leading-relaxed line-clamp-2 font-normal">
                    {region.description}
                  </p>
                </div>
              </div>

              {/* Footer Row */}
              <div className="px-6 py-3.5 border-t border-white/[0.06] bg-[#070B14]/40 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {region.ngoCount} NGOs active
                </span>
                <a
                  href="#auth"
                  className="text-blue-400 hover:text-blue-300 font-medium text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  View details →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
