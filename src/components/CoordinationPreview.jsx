import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Zap, Plus, Send } from 'lucide-react';

const CHAT_THREAD = [
  {
    id: 'msg-1',
    initials: 'PS',
    avatarGradient: 'from-blue-600 to-indigo-600',
    sender: 'Priya Sharma',
    role: 'Resident',
    roleType: 'resident',
    time: '14:32',
    message: 'Water level has risen near Kosi Bridge. 18 families are requesting evacuation assistance.',
  },
  {
    id: 'msg-2',
    initials: 'AI',
    avatarGradient: 'from-blue-500 via-cyan-400 to-blue-600',
    sender: 'Pixelway AI',
    role: 'Intake Engine',
    roleType: 'ai',
    time: '14:32',
    message: 'Is the eastern road currently passable?',
  },
  {
    id: 'msg-3',
    initials: 'PS',
    avatarGradient: 'from-blue-600 to-indigo-600',
    sender: 'Priya Sharma',
    role: 'Resident',
    roleType: 'resident',
    time: '14:33',
    message: 'The road is still passable, but water is rising.',
  },
  {
    id: 'msg-4',
    initials: 'RV',
    avatarGradient: 'from-teal-600 to-emerald-600',
    sender: 'Rahul Verma',
    role: 'SafeHaven NGO',
    roleType: 'ngo',
    time: '14:35',
    message: 'Field Unit 4 is en route. ETA 18 minutes.',
  },
];

export default function CoordinationPreview() {
  const [messages, setMessages] = useState(CHAT_THREAD);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      initials: 'OP',
      avatarGradient: 'from-blue-500 to-cyan-500',
      sender: 'Ops Commander',
      role: 'Responder',
      roleType: 'ngo',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      message: inputValue.trim(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
  };

  const features = [
    {
      icon: MessageSquare,
      title: 'AI-guided triage',
      desc: 'Clarifies urgency',
    },
    {
      icon: Users,
      title: 'Shared live context',
      desc: 'Everyone aligned',
    },
    {
      icon: Zap,
      title: 'Priority-based routing',
      desc: 'Automatic escalation',
    },
  ];

  return (
    <section id="coordination" className="section-heavy relative w-full bg-[#050812] overflow-hidden text-[#F2F5FA] border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[500px] bg-blue-600/[0.04] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-600/[0.03] blur-[120px] pointer-events-none" />

      {/* Controlled Centered Container (Exact 1200px System) */}
      <div className="app-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── LEFT COLUMN: ~44% (lg:col-span-5) Marketing & Triage Overview ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            {/* Small Eyebrow (14px to heading) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-950/40 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.12)] w-fit mb-3.5">
              INTELLIGENT TRIAGE
            </div>

            {/* Main Heading (16px to description) */}
            <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] font-bold text-[#F4F7FF] tracking-tight leading-[1.08] mb-4">
              Everyone in one<br />
              room.<br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                AI keeping context.
              </span>
            </h2>

            {/* Supporting Copy (28px to feature items) */}
            <p className="text-[15px] sm:text-[15.5px] text-[#91A4C2] leading-[1.6] mb-7 font-normal">
              Residents report conditions. AI asks clarifying questions. Responders coordinate resources. Government teams track escalation — all from one shared operational thread.
            </p>

            {/* 3 Compact Feature Items Arranged Horizontally (28px to SLA metrics) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex flex-col items-start gap-2.5">
                    <div className="w-10 h-10 rounded-[10px] bg-[#0A1324] border border-blue-500/20 flex items-center justify-center text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.1)]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[13.5px] font-semibold text-[#F4F7FF] tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[12px] text-[#7B8EA8] leading-[1.4] mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Divider Above Metrics */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center gap-10">
              <div>
                <span className="text-[26px] font-bold text-[#F4F7FF] tracking-tight block leading-none mb-1.5">
                  42 sec
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#7B8EA8]">
                  AVG TRIAGE RESOLUTION
                </span>
              </div>
              <div className="w-px h-9 bg-white/[0.10]" />
              <div>
                <span className="text-[26px] font-bold text-[#F4F7FF] tracking-tight block leading-none mb-1.5">
                  100%
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#7B8EA8]">
                  AUDIT TRAIL CAPTURED
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: ~56% (lg:col-span-7) Live Operational Thread / Chat Interface ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="w-full rounded-[18px] bg-[#070D18] border border-[rgba(120,150,200,0.18)] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(59,130,246,0.12)] overflow-hidden flex flex-col">
              
              {/* Header */}
              <div className="px-5 py-3.5 bg-[#060A13] border-b border-white/[0.08] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">LIVE</span>
                  </div>
                  <span className="text-[12px] font-mono text-[#91A4C2]">
                    pixelway.ops / Thread / Kosi Bridge Relief
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded-[5px] bg-red-500/15 border border-red-500/30 text-red-400 text-[10px] font-semibold tracking-wide">
                    PRIORITY 2
                  </span>
                  <span className="hidden sm:inline text-[10.5px] text-[#7B8EA8] tracking-wide uppercase">
                    4 ACTIVE DISPATCHES
                  </span>
                </div>
              </div>

              {/* Message Rows */}
              <div className="p-5 sm:p-6 space-y-3">
                {messages.map((msg) => {
                  const isAi = msg.roleType === 'ai';
                  const isNgo = msg.roleType === 'ngo';

                  return (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-[12px] transition-all flex items-start gap-3 ${
                        isAi
                          ? 'bg-[#0B1428] border border-blue-500/25'
                          : isNgo
                          ? 'bg-[#08181A] border border-emerald-500/25'
                          : 'bg-[#0B101E] border border-white/[0.06]'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${msg.avatarGradient} flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm`}
                      >
                        {msg.initials}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-[13.5px] tracking-tight">
                              {msg.sender}
                            </span>
                            <span
                              className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-[4px] border ${
                                isAi
                                  ? 'bg-blue-500/15 text-blue-300 border-blue-500/30 font-medium'
                                  : isNgo
                                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                  : 'bg-white/[0.06] text-[#8997B2] border-white/[0.08]'
                              }`}
                            >
                              {msg.role}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#62748E]">
                            {msg.time}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#D1D9E6] leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Input Bar */}
              <form
                onSubmit={handleSend}
                className="px-4 py-3 bg-[#060A13] border-t border-white/[0.08] flex items-center gap-2.5"
              >
                {/* Round Plus Button */}
                <button
                  type="button"
                  aria-label="Add attachment"
                  className="w-8 h-8 rounded-full bg-[#0F172A] hover:bg-[#1E293B] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Input Field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter operational report or respond to triage..."
                  className="flex-1 h-9 px-3.5 bg-[#0B101E] rounded-[8px] border border-white/[0.08] text-[13px] text-white placeholder:text-[#56647E] focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  aria-label="Send message"
                  className="h-9 px-4 rounded-[8px] bg-blue-600 hover:bg-blue-500 text-white text-[12.5px] font-medium shadow-[0_1px_10px_rgba(37,99,235,0.35)] hover:-translate-y-[0.5px] transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
