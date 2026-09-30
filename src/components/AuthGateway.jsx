import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Users, MapPin, Shield, Zap, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

export default function AuthGateway({ onLogin }) {
  const [mode, setMode] = useState('individual'); // 'individual' | 'ngo'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password to continue.');
      return;
    }
    onLogin?.(isNgo ? 'ngo' : 'individual');
  };

  const isNgo = mode === 'ngo';

  return (
    <section id="auth" className="section-heavy relative w-full bg-[#050812] overflow-hidden text-[#F2F5FA] border-t border-white/[0.06]">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/[0.05] blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-purple-600/[0.04] blur-[120px] pointer-events-none" />

      {/* Controlled Centered Container (Exact 1200px System) */}
      <div className="app-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── LEFT SIDE: Brand & Benefits with Atmospheric Map (~52%) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col justify-between"
          >
            {/* Atmospheric Map / Geospatial Network Background */}
            <div className="absolute -top-12 -left-12 w-[130%] h-[120%] pointer-events-none opacity-40 select-none overflow-hidden">
              {/* Topographic River / Contour Lines */}
              <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="cityGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Organic River Curve */}
                <path
                  d="M 280 20 C 260 120, 340 180, 310 270 S 240 340, 260 420 S 340 500, 330 580"
                  stroke="url(#riverGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                <path
                  d="M 310 270 Q 390 280 480 340"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  fill="none"
                />

                {/* Network Mesh Lines */}
                <line x1="220" y1="180" x2="310" y2="270" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="310" y1="270" x2="420" y2="240" stroke="rgba(147,51,234,0.3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="310" y1="270" x2="250" y2="380" stroke="rgba(6,182,212,0.3)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="250" y1="380" x2="380" y2="400" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Ripple Circles Around Center Hub */}
                <circle cx="310" cy="270" r="28" stroke="rgba(59,130,246,0.4)" strokeWidth="1" fill="none" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="310" cy="270" r="18" fill="rgba(59,130,246,0.2)" />
                <circle cx="310" cy="270" r="6" fill="#3B82F6" filter="url(#cityGlow)" />

                {/* Smaller Location Points */}
                <circle cx="220" cy="180" r="4" fill="#38BDF8" filter="url(#cityGlow)" />
                <circle cx="420" cy="240" r="4" fill="#A855F7" filter="url(#cityGlow)" />
                <circle cx="250" cy="380" r="4" fill="#06B6D4" filter="url(#cityGlow)" />
                <circle cx="380" cy="400" r="4" fill="#3B82F6" filter="url(#cityGlow)" />
              </svg>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10">
              {/* Pixelway Logo + Wordmark (14px to heading) */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-500 p-[1.5px] shadow-[0_0_14px_rgba(59,130,246,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#070D1A] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60A5FA]" />
                  </div>
                </div>
                <span className="font-bold text-white tracking-tight text-[17px]">Pixelway</span>
              </div>

              {/* Main Headline (16px to description) */}
              <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] font-bold text-[#F4F7FF] tracking-tight leading-[1.08] mb-4">
                Stay informed. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  Stay safe.
                </span>
              </h2>

              {/* Supporting Text (28px to benefit rows) */}
              <p className="text-[15px] sm:text-[15.5px] text-[#91A4C2] leading-[1.6] max-w-[440px] font-normal mb-7">
                Receive real-time risk alerts, report ground conditions, and connect with nearby responders.
              </p>

              {/* 3 Compact Benefit Rows (32px to trust strip) */}
              <div className="space-y-3.5 mb-8 max-w-[420px]">
                {/* Row 1 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[10px] bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 shadow-sm">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-semibold text-white tracking-tight leading-tight">
                      Real-time alerts
                    </h4>
                    <p className="text-[12px] text-[#8997B2] leading-tight mt-0.5">
                      Be the first to know about risks nearby.
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[10px] bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-semibold text-white tracking-tight leading-tight">
                      Verified responders
                    </h4>
                    <p className="text-[12px] text-[#8997B2] leading-tight mt-0.5">
                      Connect with trusted help in your area.
                    </p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[10px] bg-blue-600/15 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-semibold text-white tracking-tight leading-tight">
                      Safer communities
                    </h4>
                    <p className="text-[12px] text-[#8997B2] leading-tight mt-0.5">
                      Stronger together, everywhere.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Strip */}
              <div className="pt-6 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#64748B] mb-2 font-medium">
                  TRUSTED BY GOVERNMENT & COMMUNITIES
                </div>
                <div className="flex items-center gap-4 text-[11.5px] text-[#8997B2]">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>Secure</span>
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real-time</span>
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Community driven</span>
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Login Card (~48%) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-[460px] rounded-[20px] bg-[#070D18]/90 border border-blue-500/20 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.85),0_0_35px_-8px_rgba(59,130,246,0.18)] p-6 sm:p-7 backdrop-blur-xl">
              
              {/* Segmented Control Role Switcher */}
              <div className="p-1 bg-[#050812] rounded-[11px] border border-white/[0.08] flex items-center mb-6">
                <button
                  type="button"
                  onClick={() => setMode('individual')}
                  className={`flex-1 py-2 text-[12.5px] font-semibold rounded-[8px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    !isNgo
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_2px_12px_rgba(59,130,246,0.35)]'
                      : 'text-[#8295B5] hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Individual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('ngo')}
                  className={`flex-1 py-2 text-[12.5px] font-semibold rounded-[8px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isNgo
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_2px_12px_rgba(59,130,246,0.35)]'
                      : 'text-[#8295B5] hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>NGO / Community</span>
                </button>
              </div>

              {/* Form Heading & Subtitle */}
              <div className="mb-6">
                <h3 className="text-[22px] font-bold text-[#F4F7FF] tracking-tight">
                  {isNgo ? 'Access NGO Operations Center' : 'Sign in to Pixelway'}
                </h3>
                <p className="text-[13.5px] text-[#8997B2] mt-1 font-normal leading-normal">
                  {isNgo
                    ? 'Deploy response fleets, manage supplies, and coordinate alerts.'
                    : 'Monitor local vulnerability zones and access verified help.'}
                </p>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-[#8997B2] mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isNgo ? 'ops@safehaven-disaster.org' : 'priya.sharma@domain.in'}
                      className="w-full h-[46px] pl-10 pr-4 rounded-[10px] bg-[#0A1020] border border-[rgba(120,150,200,0.18)] text-[13.5px] text-white placeholder:text-[#56647E] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-[#8997B2] mb-1.5">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-[46px] pl-10 pr-10 rounded-[10px] bg-[#0A1020] border border-[rgba(120,150,200,0.18)] text-[13.5px] text-white placeholder:text-[#56647E] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                    {error}
                  </div>
                )}

                {/* Primary Button */}
                <button
                  type="submit"
                  className="w-full h-[46px] rounded-[10px] bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white text-[14px] font-semibold shadow-[0_3px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <span>{isNgo ? 'Continue as an NGO / Responder' : 'Continue as an Individual'}</span>
                  <span className="text-base">→</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-2.5">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-[10.5px] font-mono text-[#64748B]">OR</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Continue with Google */}
                <button
                  type="button"
                  onClick={() => onLogin?.(isNgo ? 'ngo' : 'individual')}
                  className="w-full h-[44px] rounded-[10px] bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.10] text-[13.5px] font-medium text-[#E2E8F0] hover:text-white transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Bottom Assistance Link */}
                <div className="text-center pt-2">
                  <span className="text-[12px] text-[#7B8EA8]">
                    Don't have an account?{' '}
                    <a href="#contact" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Contact your organization
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
