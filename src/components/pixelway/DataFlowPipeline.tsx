import React from 'react';
import { motion } from 'framer-motion';
import { PIPELINE_STAGES } from '../../data/pixelwayTelemetry';
import {
  Layers,
  ArrowRight,
  Database,
  CheckCircle2,
  Cpu,
  Filter,
  Send,
  Zap,
} from 'lucide-react';

export const DataFlowPipeline: React.FC = () => {
  const getStageIcon = (id: string) => {
    switch (id) {
      case 'stage-ground':
        return <Database className="w-4 h-4 text-blue-400" />;
      case 'stage-verification':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'stage-ai-engine':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'stage-triage':
        return <Filter className="w-4 h-4 text-amber-400" />;
      case 'stage-dispatch':
        return <Send className="w-4 h-4 text-emerald-400" />;
      default:
        return <Zap className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative p-6 rounded-2xl bg-[#080E1C]/95 border border-white/[0.09] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -top-12 left-1/3 w-64 h-24 bg-blue-600/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-base sm:text-lg font-bold text-[#F1F5FF] tracking-tight">
              OPERATIONAL DATA PIPELINE
            </h3>
          </div>
          <p className="text-xs text-[#8997B2] mt-0.5">
            End-to-end signal lifecycle: Ingest → Validation → Neural inference → Prioritization → Response dispatch
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400 self-start sm:self-auto">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            STREAM HEALTH: OPTIMAL
          </span>
          <span className="text-[11px] text-slate-400">
            Avg Latency: 28ms
          </span>
        </div>
      </div>

      {/* Pipeline Stages Flow Row */}
      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isLast = idx === PIPELINE_STAGES.length - 1;

          return (
            <div key={stage.id} className="relative flex flex-col justify-between">
              {/* Stage Card */}
              <div className="relative h-full p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.045] border border-white/[0.06] hover:border-blue-500/30 transition-all duration-200 group flex flex-col justify-between">
                {/* Micro Number & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-400 transition-colors">
                      {stage.stepNumber}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      {getStageIcon(stage.id)}
                    </div>
                  </div>

                  <h4 className="text-xs font-mono font-bold text-white tracking-wider mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-3 leading-snug">
                    {stage.subtitle}
                  </p>
                </div>

                {/* Metric footer */}
                <div className="pt-2.5 border-t border-white/[0.04] font-mono">
                  <div className="text-[10px] text-slate-400">{stage.metricLabel}</div>
                  <div className="text-sm font-bold text-blue-400 flex items-center justify-between">
                    <span>{stage.metrics}</span>
                    <span className="text-[9px] font-normal text-slate-400">
                      {stage.latency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Connection Arrow / Moving Packet Between Columns (Desktop only) */}
              {!isLast && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#080E1C] border border-blue-500/30 flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-3 h-3 text-blue-400" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Animated Data Packets Flow Line */}
      <div className="relative w-full h-1.5 rounded-full bg-slate-900 overflow-hidden mt-6">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
          className="w-1/3 h-full rounded-full bg-gradient-to-r from-transparent via-blue-500 to-cyan-400 shadow-[0_0_12px_#3B82F6]"
        />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-time Ingestion Broker: Kafka Mesh @ 10,000 IOPS</span>
        </div>
        <div className="text-slate-400">
          ZERO PACKET DROPS IN LAST 24H
        </div>
      </div>
    </div>
  );
};
