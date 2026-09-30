import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { navLinks } from '../data/mockData';
import { useAlertSystem } from '../context/AlertContext';

export default function Navbar() {
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleAlertCenter, alerts, activeAlerts } = useAlertSystem();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050812]/92 backdrop-blur-md border-b border-white/[0.07] shadow-sm'
          : 'bg-[#050812]/60 backdrop-blur-sm border-b border-white/[0.04]'
      }`}
    >
      <div className="app-container h-[70px] flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400/50 group-hover:bg-blue-600/25 transition-all">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <rect x="4" y="4" width="5" height="5" rx="1" fill="currentColor" />
              <rect x="15" y="4" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
              <rect x="15" y="15" width="5" height="5" rx="1" fill="currentColor" />
              <rect x="4" y="15" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </div>
          <span className="font-semibold text-[16px] tracking-tight text-white">
            Pixelway
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-slate-400 hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Emergency Alert Bell Indicator */}
          <button
            onClick={toggleAlertCenter}
            type="button"
            aria-label={`Open Alert Center (${alerts.length} alerts active)`}
            title="Emergency Alert Center"
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-all flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {activeAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-500 text-[9.5px] font-mono font-bold text-white shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                {activeAlerts.length}
              </span>
            )}
          </button>

          <a
            href="#auth"
            className="px-3 py-1.5 text-[13px] font-medium text-slate-300 hover:text-white border border-white/[0.10] hover:border-white/[0.20] rounded-lg transition-all"
          >
            Log in
          </a>
          <a
            href="#auth"
            className="px-3.5 py-1.5 text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-[0_1px_12px_rgba(37,99,235,0.35)] hover:shadow-[0_2px_16px_rgba(37,99,235,0.45)] flex items-center gap-1.5 active:scale-[0.98]"
          >
            <span>Get Started</span>
            <span className="text-xs">→</span>
          </a>
        </div>

        {/* Mobile Hamburger & Alert Bell Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleAlertCenter}
            type="button"
            aria-label="Open Alert Center"
            className="relative p-2 text-slate-300 hover:text-white border border-white/[0.08] rounded-lg bg-white/[0.04]"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {activeAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 min-w-3.5 px-0.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-mono font-bold text-white">
                {activeAlerts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#070B14] border-b border-white/[0.08] overflow-hidden"
          >
            <div className="app-container py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-white py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                <a
                  href="#auth"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2 text-sm font-medium text-slate-300 border border-white/[0.10] rounded-lg"
                >
                  Log in
                </a>
                <a
                  href="#auth"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
