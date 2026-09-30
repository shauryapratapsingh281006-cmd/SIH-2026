import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ── Live Intelligence Network Canvas Animation ── */
function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let particles = [];
    let orbitalPoints = [];

    function handleResize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSystem();
    }

    function initSystem() {
      particles = [];
      orbitalPoints = [];

      // 50 drifting ambient network telemetry nodes
      const count = Math.min(Math.floor((width * height) / 20000), 55);

      for (let i = 0; i < count; i++) {
        const isBeacon = i % 8 === 0;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isBeacon ? 0.16 : 0.10),
          vy: (Math.random() - 0.5) * (isBeacon ? 0.14 : 0.08) - 0.03,
          radius: isBeacon ? 1.8 : 1.1,
          baseOpacity: isBeacon ? 0.70 : 0.20,
          pulseSpeed: 0.001 + Math.random() * 0.002,
          pulseOffset: Math.random() * Math.PI * 2,
          isBeacon,
        });
      }

      // 12 orbital satellite data points traveling along elliptical trajectory paths
      const orbitalCount = 12;
      for (let i = 0; i < orbitalCount; i++) {
        orbitalPoints.push({
          orbitIndex: i % 3,
          progress: Math.random(),
          speed: (0.00025 + (i % 3) * 0.00012) * (i % 2 === 0 ? 1 : -0.8),
          radius: i % 4 === 0 ? 2.2 : 1.3,
          isBeacon: i % 4 === 0,
        });
      }
    }

    function getEllipsePoint(cx, cy, rx, ry, rotationAngle, t) {
      const angle = t * Math.PI * 2;
      const unrotatedX = rx * Math.cos(angle);
      const unrotatedY = ry * Math.sin(angle);
      const cosR = Math.cos(rotationAngle);
      const sinR = Math.sin(rotationAngle);
      return {
        x: cx + unrotatedX * cosR - unrotatedY * sinR,
        y: cy + unrotatedX * sinR + unrotatedY * cosR,
      };
    }

    function render(time) {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.60;

      const orbits = [
        { rx: width * 0.46, ry: height * 0.36, rot: -0.15 },
        { rx: width * 0.62, ry: height * 0.44, rot: 0.10 },
        { rx: width * 0.80, ry: height * 0.52, rot: -0.05 },
      ];

      // Draw faint orbital paths
      ctx.lineWidth = 1;
      orbits.forEach((orb) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orb.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.setLineDash([3, 14]);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
        ctx.stroke();
        ctx.restore();
      });

      // Render drifting network particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset);
        const opacity = Math.max(0.08, p.baseOpacity + pulse * 0.22);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isBeacon) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
          grad.addColorStop(0, `rgba(96, 165, 250, ${opacity})`);
          grad.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 0.4})`);
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(137, 151, 178, ${opacity})`;
          ctx.fill();
        }

        // Faint connecting vectors for nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 6400) {
            const lineAlpha = (1 - distSq / 6400) * 0.06;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Render orbital satellite points
      orbitalPoints.forEach((op) => {
        if (!prefersReducedMotion) {
          op.progress = (op.progress + op.speed + 1) % 1;
        }
        const orb = orbits[op.orbitIndex];
        const pt = getEllipsePoint(cx, cy, orb.rx, orb.ry, orb.rot, op.progress);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, op.radius, 0, Math.PI * 2);

        if (op.isBeacon) {
          const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 7);
          grad.addColorStop(0, 'rgba(147, 197, 253, 0.8)');
          grad.addColorStop(0.4, 'rgba(59, 130, 246, 0.35)');
          grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-center items-center pt-24 pb-20 md:py-32 overflow-hidden bg-[#050812]">
      {/* ── Background Layer 1: Atmospheric Blue Radial Glow ── */}
      <div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1100px] h-[520px] sm:h-[620px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(37, 99, 235, 0.12) 0%, rgba(14, 116, 144, 0.04) 50%, rgba(5, 8, 18, 0) 80%)',
        }}
      />

      {/* ── Background Layer 2: Subtle Ambient Grid Texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Background Layer 3: Large Abstract Orbital Rings (SVG) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 1400 900"
          className="w-[1400px] h-[900px] max-w-none opacity-40 select-none"
          fill="none"
        >
          <circle
            cx="700"
            cy="520"
            r="380"
            stroke="rgba(59, 130, 246, 0.07)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="700"
            cy="520"
            r="520"
            stroke="rgba(148, 163, 184, 0.04)"
            strokeWidth="1"
            strokeDasharray="2 12"
          />
          <path
            d="M 100,750 Q 700,480 1300,750"
            stroke="rgba(59, 130, 246, 0.08)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
        </svg>
      </div>

      {/* ── Background Layer 4: Live Intelligence Network Canvas ── */}
      <NetworkBackground />

      {/* ── Hero Foreground Content ── */}
      <div className="app-container relative z-10 w-full text-center flex flex-col items-center">
        {/* Live Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#0B1220]/90 border border-white/[0.08] backdrop-blur-md text-xs font-mono tracking-wide shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-semibold text-slate-200">LIVE</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">214 ZONES MONITORED</span>
        </motion.div>

        {/* Main Headline with Refined Typographic Scale */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] sm:text-[54px] md:text-[66px] lg:text-[72px] font-bold text-[#F1F5FF] tracking-tight leading-[1.08] mb-4 max-w-4xl mx-auto"
          style={{ fontWeight: 700 }}
        >
          See the danger before <br className="hidden sm:inline" />
          it reaches your door.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[16px] sm:text-[17px] md:text-[18px] text-[#8997B2] max-w-[660px] mx-auto leading-relaxed mb-8 font-normal"
        >
          Pixelway connects people on the ground, response organizations, and government teams into one real-time coordination layer — so critical help reaches the right place before disaster strikes.
        </motion.p>

        {/* Unified Button Actions */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <a href="#auth" className="btn-primary w-full sm:w-auto">
            <span>Get Started</span>
            <span className="btn-arrow text-sm">→</span>
          </a>

          <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
            See how it works
          </a>
        </motion.div>
      </div>

      {/* ── Seamless Bottom Gradient Transition ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-b from-transparent via-[#050812]/60 to-[#050812] z-10" />
    </section>
  );
}
