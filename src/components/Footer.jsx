import { footerLinks } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="bg-[#04060E] border-t border-white/[0.07] text-[#8997B2]">
      <div className="app-container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5">
            <a href="#" className="flex items-center gap-2.5 mb-3.5 group">
              <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                  <rect x="4" y="4" width="5" height="5" rx="1" fill="currentColor" />
                  <rect x="15" y="4" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
                  <rect x="15" y="15" width="5" height="5" rx="1" fill="currentColor" />
                  <rect x="4" y="15" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="font-semibold text-white tracking-tight text-[15px]">Pixelway</span>
            </a>

            <p className="text-[13px] text-[#8997B2] leading-relaxed max-w-sm mb-5 font-normal">
              Real-time intelligence for safer, faster disaster response. Connecting ground reality to authoritative action.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>National Operations Network: Normal</span>
            </div>
          </div>

          {/* Navigation Columns (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                  {category}
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[#8997B2] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Disclaimer & Legal Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <p className="text-[#8997B2] leading-relaxed max-w-2xl text-[11px] font-normal">
            © 2026 Pixelway. Building safer communities through connected intelligence.
            <span className="block text-slate-400 mt-1">
              Pixelway is an operational coordination layer. In imminent life-threatening danger, dial <strong className="text-slate-300 font-mono">112</strong> (National Emergency) or <strong className="text-slate-300 font-mono">1078</strong> (NDRF Control).
            </span>
          </p>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 flex-shrink-0">
            <span>ISO 27001 Certified</span>
            <span>·</span>
            <span>GDPR / DPDPA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
