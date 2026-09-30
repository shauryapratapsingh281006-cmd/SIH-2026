import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { KPI_METRICS } from '../../data/pixelwayTelemetry';
import { MetricCard } from './MetricCard';
import { GeospatialGlobe } from './GeospatialGlobe';
import { ForecastChart } from './ForecastChart';
import { RegionalRiskChart } from './RegionalRiskChart';
import { ResponseMetricsRow } from './ResponseMetricsRow';

export const PixelwayOperations: React.FC = () => {
  const [timeframe] = useState<'7D' | '24H' | 'LIVE'>('7D');

  return (
    <div className="relative w-full bg-[#050914] overflow-hidden text-[#E8ECF5]">
      {/* Background Ambient Lighting */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-blue-600/10 via-blue-900/5 to-transparent blur-3xl opacity-60" />
      <div className="pointer-events-none absolute top-[700px] right-0 w-[500px] h-[400px] bg-cyan-600/5 blur-3xl" />

      {/* ============================================================== */}
      {/* SECTION 1 — REAL-TIME OPERATIONS                               */}
      {/* Exact 1200px centered container · Responsive section rhythm    */}
      {/* ============================================================== */}
      <section
        id="live-risk"
        aria-label="Pixelway Real-Time Operations"
        className="section-heavy relative border-t border-white/[0.06]"
      >
        <div className="app-container relative">
          
          {/* Top Hero Visual & Data Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-10 lg:mb-12">
            
            {/* LEFT: Text + CTA + Hero Metrics (~50%) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              {/* Eyebrow (14px to heading) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-950/40 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.12)] w-fit mb-3.5">
                REAL-TIME OPERATIONS
              </div>

              {/* Main Heading (16px to description) */}
              <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] font-bold text-[#F4F7FF] tracking-tight leading-[1.08] mb-4">
                Real-time <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Operations
                </span>
              </h2>

              {/* Subheading (28px to buttons) */}
              <p className="text-[15px] sm:text-[16px] text-[#91A4C2] leading-[1.6] max-w-[480px] font-normal mb-7">
                Continuous multi-agency hazard monitoring, regional probability tracking, and response dispatch.
              </p>

              {/* CTA Buttons (36px to metrics) */}
              <div className="flex flex-wrap items-center gap-3.5 mb-9">
                <a
                  href="#red-zone"
                  className="h-[46px] px-5 rounded-[11px] bg-blue-600 hover:bg-blue-500 text-white text-[13.5px] font-medium shadow-[0_2px_16px_rgba(37,99,235,0.4)] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Live Data</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  className="h-[46px] px-4.5 rounded-[11px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-[#E2E8F0] hover:text-white text-[13.5px] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-slate-300" />
                  <span>Watch Overview</span>
                </button>
              </div>

              {/* Hero Metrics Row */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-4 max-w-[480px]">
                <div>
                  <div className="text-[9.5px] sm:text-[10px] font-mono uppercase text-[#7B8EA8] tracking-wider mb-1">
                    FASTER RESPONSE
                  </div>
                  <div className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight leading-none mb-1">
                    3x
                  </div>
                  <div className="text-[11px] text-[#8997B2] leading-tight">
                    than conventional systems
                  </div>
                </div>

                <div className="border-l border-white/[0.08] pl-3 sm:pl-4">
                  <div className="text-[9.5px] sm:text-[10px] font-mono uppercase text-[#7B8EA8] tracking-wider mb-1">
                    BROADER COVERAGE
                  </div>
                  <div className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight leading-none mb-1">
                    2.4M
                  </div>
                  <div className="text-[11px] text-[#8997B2] leading-tight">
                    population monitored
                  </div>
                </div>

                <div className="border-l border-white/[0.08] pl-3 sm:pl-4">
                  <div className="text-[9.5px] sm:text-[10px] font-mono uppercase text-[#7B8EA8] tracking-wider mb-1">
                    HIGHER ACCURACY
                  </div>
                  <div className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight leading-none mb-1">
                    83%
                  </div>
                  <div className="text-[11px] text-[#8997B2] leading-tight">
                    response readiness
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Sophisticated Dark Globe Visual (~50%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 flex items-center justify-center"
            >
              <GeospatialGlobe />
            </motion.div>
          </div>

          {/* 4 Data Cards (24px gap, 24px inner padding) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {KPI_METRICS.map((card, idx) => (
              <MetricCard key={card.id} card={card} index={idx} />
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2 — DISASTER PROBABILITY · 7-DAY FORECAST              */}
      {/* Clear vertical separation with divider border                  */}
      {/* ============================================================== */}
      <section
        id="response-insights"
        aria-label="Disaster Probability and Regional Risk Forecast"
        className="section-heavy relative border-t border-white/[0.06]"
      >
        <div className="app-container relative">
          
          {/* Section 2 Header (14px eyebrow->heading, 16px heading->subheading) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-950/40 px-3 py-0.5 font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase text-[#38BDF8] mb-3">
                RESPONSE INSIGHTS
              </div>
              <h3 className="text-[28px] sm:text-[34px] font-bold text-[#F4F7FF] tracking-tight leading-tight mb-4">
                Disaster probability · 7-day forecast
              </h3>
              <p className="text-[14.5px] sm:text-[15px] text-[#8997B2] font-normal max-w-[620px]">
                Calculated per multi-source saturation, riverine stage & seismic variance.
              </p>
            </div>
          </div>

          {/* Forecast Layout: Two Columns (Left ~68% Graph, Right ~32% Risk signals, 24px gap) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: Large Forecast Graph */}
            <div className="lg:col-span-8 flex flex-col">
              <ForecastChart timeframe={timeframe} />
            </div>

            {/* RIGHT: Risk Signals by Region */}
            <div className="lg:col-span-4 flex flex-col">
              <RegionalRiskChart />
            </div>
          </div>

          {/* Small 3 Metric Cards Row (24px gap from chart above) */}
          <div className="mt-6">
            <ResponseMetricsRow />
          </div>

        </div>
      </section>
    </div>
  );
};

export default PixelwayOperations;
