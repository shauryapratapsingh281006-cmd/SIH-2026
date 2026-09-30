import { useEffect, useMemo, useState } from 'react';
import {
  Activity, Bot, CheckCircle2, Clock3, CloudRain, Crosshair, HeartPulse,
  MapPin, MessageCircle, Navigation, Phone, Radio, ShieldAlert, Siren,
  Thermometer, Users, Wind, X, Send, LocateFixed, LogOut
} from 'lucide-react';

const NGOs = [
  { name: 'Sahyadri Rescue Foundation', distance: '1.8 km', status: 'Available', eta: '8 min' },
  { name: 'City Relief Network', distance: '3.2 km', status: 'Deploying', eta: '14 min' },
  { name: 'Seva Disaster Response', distance: '5.1 km', status: 'Available', eta: '19 min' },
];

const chatReplies = [
  'I can help with evacuation, shelter locations, emergency preparation, and contacting responders.',
  'If your risk becomes critical, turn on GPS sharing and move toward the nearest verified safe shelter.',
  'For immediate danger, use the emergency call option and keep your location sharing active.'
];

export default function IndividualDashboard({ onLogout }) {
  const [gps, setGps] = useState(false);
  const [coords, setCoords] = useState({ lat: 18.5204, lng: 73.8567 });
  const [gpsMessage, setGpsMessage] = useState('Location sharing is off');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello. I am Pixelway Emergency Assistant. Tell me what you need help with.' }
  ]);
  const [communityText, setCommunityText] = useState('');
  const [communityMessages, setCommunityMessages] = useState([
    { name: 'Aarav', text: 'Anyone near Kothrud? Roads are getting difficult.' },
    { name: 'Meera', text: 'We are safe at the community hall near the main road.' }
  ]);

  useEffect(() => {
    if (!gps || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setGpsMessage('Live GPS location shared with verified responders');
      },
      () => setGpsMessage('GPS permission was not granted. Demo location remains active.')
    );
  }, [gps]);

  const risk = 68;
  const riskLabel = risk >= 70 ? 'HIGH' : risk >= 40 ? 'ELEVATED' : 'LOW';

  const sendChat = () => {
    const text = chatText.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setChatText('');
    setTimeout(() => {
      const reply = chatReplies[Math.floor(Math.random() * chatReplies.length)];
      setMessages((m) => [...m, { from: 'ai', text: reply }]);
    }, 350);
  };

  const sendCommunity = () => {
    const text = communityText.trim();
    if (!text) return;
    setCommunityMessages((m) => [...m, { name: 'You', text }]);
    setCommunityText('');
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;

  return (
    <div className="premium-dashboard min-h-screen bg-[#050812] text-[#E8ECF5]">
      <header className="sticky top-0 z-40 bg-[#050812]/92 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="app-container h-[72px] flex items-center justify-between">
          <div>
            <div className="text-white font-bold tracking-tight">Pixelway</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.14em] text-blue-400">Individual Safety Console</div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${gps ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-white/[0.03] text-slate-400'}`}>
              <span className={`w-2 h-2 rounded-full ${gps ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              {gps ? 'GPS SHARING ON' : 'GPS OFF'}
            </span>
            <button onClick={onLogout} className="px-3 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.05] flex items-center gap-2 text-sm">
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </div>
        </div>
      </header>

      <main className="app-container py-8 space-y-6">
        <section className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.10] via-[#0A1020] to-[#070D18] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <div className="flex items-center gap-2 text-red-300 text-xs font-mono uppercase tracking-[0.14em]"><ShieldAlert className="w-4 h-4" /> Local hazard intelligence</div>
                <h1 className="text-3xl sm:text-4xl font-bold mt-2">Elevated disaster probability</h1>
                <p className="text-slate-400 mt-2 max-w-xl">The risk engine currently estimates a {risk}% probability of a significant hazard event in your monitored zone within the next 3 hours.</p>
              </div>
              <div className="w-32 h-32 rounded-full border-8 border-red-500/20 bg-red-500/10 flex flex-col items-center justify-center shrink-0">
                <strong className="text-4xl">{risk}%</strong>
                <span className="text-[10px] font-mono text-red-300">{riskLabel} RISK</span>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <Metric label="Time horizon" value="03:00 hrs" icon={Clock3} />
              <Metric label="Confidence" value="87%" icon={Activity} />
              <Metric label="Monitored zone" value="2.4 km" icon={Crosshair} />
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-blue-500/20 bg-[#070D18] p-5">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-mono uppercase tracking-[0.12em]"><LocateFixed className="w-4 h-4" /> Emergency location</div>
            <h2 className="text-xl font-semibold mt-3">Share your GPS</h2>
            <p className="text-sm text-slate-400 mt-1">Verified responders can use your live location to coordinate rescue.</p>
            <button
              onClick={() => setGps((v) => !v)}
              className={`w-full mt-5 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${gps ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
              <MapPin className="w-4 h-4" /> {gps ? 'Stop sharing GPS' : 'Turn on GPS sharing'}
            </button>
            <div className="mt-3 text-xs text-slate-500">{gpsMessage}</div>
            <div className="mt-4 rounded-xl bg-black/20 border border-white/5 p-3 font-mono text-[11px] text-slate-400">
              {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-5">
          <DashboardCard title="Weather right now" icon={CloudRain}>
            <div className="flex items-end gap-3"><span className="text-4xl font-bold">24°C</span><span className="text-slate-400 mb-1">Rain likely</span></div>
            <div className="grid grid-cols-2 gap-3 mt-5"><Metric label="Wind" value="18 km/h" icon={Wind} /><Metric label="Humidity" value="82%" icon={CloudRain} /></div>
          </DashboardCard>
          <DashboardCard title="Safety instructions" icon={Siren}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Keep essential documents and medicines with you.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Avoid low-lying roads if rainfall intensifies.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Follow verified responder instructions.</li>
            </ul>
          </DashboardCard>
          <DashboardCard title="Emergency actions" icon={HeartPulse}>
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-left hover:bg-red-500/15"><Phone className="w-5 h-5 text-red-300" /><div className="mt-2 font-semibold">Emergency call</div><div className="text-xs text-slate-500">112 / local control room</div></button>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-left hover:bg-blue-500/15"><Navigation className="w-5 h-5 text-blue-300" /><div className="mt-2 font-semibold">Open map</div><div className="text-xs text-slate-500">View your coordinates</div></a>
            </div>
          </DashboardCard>
        </section>

        <section className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#070D18] p-5">
            <div className="flex items-center justify-between"><div><div className="text-xs font-mono text-slate-500 uppercase">Nearby verified responders</div><h2 className="text-xl font-semibold mt-1">Who can reach you</h2></div><Radio className="w-5 h-5 text-blue-400" /></div>
            <div className="mt-4 space-y-3">
              {NGOs.map((ngo) => <div key={ngo.name} className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/[0.06]"><div><div className="font-medium">{ngo.name}</div><div className="text-xs text-slate-500 mt-1">{ngo.distance} away · ETA {ngo.eta}</div></div><span className={`text-xs px-2 py-1 rounded-full ${ngo.status === 'Available' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>{ngo.status}</span></div>)}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#070D18] p-5">
            <div className="flex items-center justify-between"><div><div className="text-xs font-mono text-slate-500 uppercase">Community support</div><h2 className="text-xl font-semibold mt-1">People helping people</h2></div><Users className="w-5 h-5 text-cyan-400" /></div>
            <div className="mt-4 space-y-2 max-h-52 overflow-auto">{communityMessages.map((m, i) => <div key={i} className="p-3 rounded-xl bg-white/[0.025]"><div className="text-xs text-blue-300">{m.name}</div><div className="text-sm text-slate-300 mt-1">{m.text}</div></div>)}</div>
            <div className="mt-3 flex gap-2"><input value={communityText} onChange={e=>setCommunityText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendCommunity()} placeholder="Share a useful update..." className="min-w-0 flex-1 rounded-xl bg-[#0A1020] border border-white/10 px-3 text-sm outline-none focus:border-blue-500" /><button onClick={sendCommunity} className="p-3 rounded-xl bg-blue-600"><Send className="w-4 h-4" /></button></div>
          </div>
        </section>
      </main>

      <button onClick={() => setChatOpen(true)} className="fixed right-5 bottom-5 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 shadow-[0_8px_30px_rgba(37,99,235,.4)] flex items-center justify-center"><Bot className="w-6 h-6" /></button>

      {chatOpen && (
        <div className="fixed right-5 bottom-24 z-50 w-[min(380px,calc(100vw-32px))] rounded-2xl border border-blue-500/20 bg-[#070D18] shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between"><div><div className="font-semibold">Pixelway AI Assistant</div><div className="text-xs text-emerald-400">Emergency guidance mode</div></div><button onClick={()=>setChatOpen(false)}><X className="w-4 h-4 text-slate-400" /></button></div>
          <div className="h-72 overflow-auto p-3 space-y-2">{messages.map((m,i)=><div key={i} className={`max-w-[85%] p-3 rounded-xl text-sm ${m.from==='user'?'ml-auto bg-blue-600 text-white':'bg-white/[0.05] text-slate-300'}`}>{m.text}</div>)}</div>
          <div className="p-3 border-t border-white/10 flex gap-2"><input value={chatText} onChange={e=>setChatText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()} placeholder="Ask about safety..." className="flex-1 rounded-xl bg-[#0A1020] border border-white/10 px-3 text-sm outline-none" /><button onClick={sendChat} className="p-3 rounded-xl bg-blue-600"><Send className="w-4 h-4" /></button></div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, icon: Icon }) {
  return <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"><div className="flex items-center gap-2 text-slate-500 text-[11px] uppercase"><Icon className="w-3.5 h-3.5" />{label}</div><div className="text-lg font-semibold mt-1">{value}</div></div>;
}

function DashboardCard({ title, icon: Icon, children }) {
  return <div className="rounded-2xl border border-white/10 bg-[#070D18] p-5"><div className="flex items-center gap-2 text-slate-300"><Icon className="w-4 h-4 text-blue-400" /><h2 className="font-semibold">{title}</h2></div><div className="mt-4">{children}</div></div>;
}
