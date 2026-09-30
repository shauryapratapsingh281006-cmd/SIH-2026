import { useMemo, useState } from 'react';
import {
  AlertTriangle, Building2, CheckCircle2, Clock3, CloudRain, Crosshair,
  Filter, LocateFixed, LogOut, MapPin, Navigation, Phone, Radio, Route,
  Search, ShieldCheck, Siren, Users, Wind, X
} from 'lucide-react';

const PEOPLE = [
  { id:'PX-1042', name:'Priya S.', area:'Kothrud', need:'Medical assistance', priority:'Critical', lat:18.5074, lng:73.8077, eta:'7 min' },
  { id:'PX-1188', name:'Aarav K.', area:'Warje', need:'Evacuation', priority:'High', lat:18.4848, lng:73.7973, eta:'11 min' },
  { id:'PX-1204', name:'Meera R.', area:'Shivajinagar', need:'Shelter', priority:'Medium', lat:18.5308, lng:73.8475, eta:'16 min' },
  { id:'PX-1231', name:'Rohan P.', area:'Aundh', need:'Food & water', priority:'Medium', lat:18.5600, lng:73.8077, eta:'21 min' },
];

const SHELTERS = [
  { name:'Kothrud Community Hall', area:'Kothrud', capacity:250, occupied:182, distance:'1.9 km', type:'Community shelter' },
  { name:'Balewadi Sports Complex', area:'Balewadi', capacity:600, occupied:341, distance:'4.8 km', type:'Large-capacity shelter' },
  { name:'Aundh Municipal School', area:'Aundh', capacity:320, occupied:210, distance:'5.2 km', type:'Relief centre' },
];

export default function NGODashboard({ onLogout }) {
  const [selected, setSelected] = useState(PEOPLE[0]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [dispatched, setDispatched] = useState({});
  const [alertSent, setAlertSent] = useState(false);

  const filtered = useMemo(() => PEOPLE.filter(p => (filter === 'All' || p.priority === filter) && `${p.name} ${p.area} ${p.id}`.toLowerCase().includes(query.toLowerCase())), [query, filter]);

  const mapsUrl = selected ? `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}` : '#';

  const dispatch = (id) => setDispatched(d => ({ ...d, [id]: true }));

  return (
    <div className="premium-dashboard min-h-screen bg-[#050812] text-[#E8ECF5]">
      <header className="sticky top-0 z-40 bg-[#050812]/92 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="app-container h-[72px] flex items-center justify-between">
          <div><div className="text-white font-bold">Pixelway</div><div className="text-[10px] font-mono uppercase tracking-[0.14em] text-cyan-400">NGO Response Command Centre</div></div>
          <div className="flex items-center gap-3"><span className="hidden md:flex items-center gap-2 text-xs text-emerald-300"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Response network online</span><button onClick={onLogout} className="px-3 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white flex items-center gap-2 text-sm"><LogOut className="w-4 h-4" /> Exit</button></div>
        </div>
      </header>

      <main className="app-container py-7 space-y-5">
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Stat title="People needing help" value="24" icon={Users} tone="red" />
          <Stat title="Responders deployed" value="11" icon={ShieldCheck} tone="blue" />
          <Stat title="Critical cases" value="4" icon={AlertTriangle} tone="amber" />
          <Stat title="Shelter beds available" value="437" icon={Building2} tone="emerald" />
        </section>

        <section className="grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#070D18] overflow-hidden">
            <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div><div className="text-xs font-mono text-slate-500 uppercase">Live response map</div><h1 className="text-2xl font-bold mt-1">People & responder locations</h1></div>
              <div className="flex gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search person / zone" className="w-48 h-9 pl-9 pr-3 rounded-lg bg-[#0A1020] border border-white/10 text-sm outline-none" /></div><button onClick={()=>setFilter(filter==='All'?'Critical':'All')} className="h-9 px-3 rounded-lg border border-white/10 text-xs flex items-center gap-2"><Filter className="w-3.5 h-3.5" /> {filter}</button></div>
            </div>
            <div className="relative h-[390px] bg-[radial-gradient(circle_at_45%_45%,rgba(37,99,235,.18),transparent_30%),linear-gradient(135deg,#07101e,#050812)] overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(rgba(96,165,250,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.08) 1px,transparent 1px)',backgroundSize:'42px 42px'}} />
              {PEOPLE.map((p,i)=><button key={p.id} onClick={()=>setSelected(p)} className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center ${selected.id===p.id?'scale-125 border-white bg-red-500/30':'border-red-400/40 bg-red-500/10'} transition`} style={{left:`${22+i*20}%`,top:`${35+(i%2)*28}%`}}><span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" /></button>)}
              <div className="absolute left-[62%] top-[60%] w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/10 flex items-center justify-center"><Radio className="w-4 h-4 text-emerald-300" /></div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2"><Legend color="bg-red-400" label="People needing help" /><Legend color="bg-emerald-400" label="Responder" /><Legend color="bg-blue-400" label="Shelter zone" /></div>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#070D18] p-5">
            <div className="flex items-start justify-between"><div><div className="text-xs font-mono text-slate-500 uppercase">Selected person</div><h2 className="text-xl font-semibold mt-1">{selected.name}</h2></div><span className={`text-xs px-2 py-1 rounded-full ${selected.priority==='Critical'?'bg-red-500/15 text-red-300':'bg-amber-500/15 text-amber-300'}`}>{selected.priority}</span></div>
            <div className="mt-5 space-y-3 text-sm"><Info label="Case ID" value={selected.id} /><Info label="Area" value={selected.area} /><Info label="Need" value={selected.need} /><Info label="Coordinates" value={`${selected.lat}, ${selected.lng}`} /><Info label="Estimated response" value={selected.eta} /></div>
            <div className="grid grid-cols-2 gap-2 mt-5"><button onClick={()=>dispatch(selected.id)} className="rounded-xl bg-blue-600 hover:bg-blue-500 py-3 font-semibold flex items-center justify-center gap-2"><Siren className="w-4 h-4" />{dispatched[selected.id]?'Dispatched':'Dispatch team'}</button><a href={mapsUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 py-3 font-semibold flex items-center justify-center gap-2"><Navigation className="w-4 h-4" />Navigate</a></div>
            <button onClick={()=>setAlertSent(true)} className="w-full mt-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 py-3 text-sm">{alertSent?'Emergency alert sent':'Send emergency alert'}</button>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-white/10 bg-[#070D18] p-5">
            <div className="flex items-center justify-between"><div><div className="text-xs font-mono text-slate-500 uppercase">Rescue queue</div><h2 className="text-xl font-semibold mt-1">Active assistance requests</h2></div><Clock3 className="w-5 h-5 text-blue-400" /></div>
            <div className="mt-4 space-y-2 max-h-[330px] overflow-auto">{filtered.map(p=><button key={p.id} onClick={()=>setSelected(p)} className={`w-full text-left p-4 rounded-xl border transition ${selected.id===p.id?'border-blue-500/30 bg-blue-500/[0.07]':'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'}`}><div className="flex justify-between gap-3"><div><div className="font-medium">{p.name} · {p.area}</div><div className="text-xs text-slate-500 mt-1">{p.id} · {p.need}</div></div><span className="text-xs text-slate-400">{p.eta}</span></div></button>)}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#070D18] p-5">
            <div className="flex items-center justify-between"><div><div className="text-xs font-mono text-slate-500 uppercase">Relief infrastructure</div><h2 className="text-xl font-semibold mt-1">Recommended safe sites</h2></div><Building2 className="w-5 h-5 text-emerald-400" /></div>
            <div className="mt-4 space-y-3">{SHELTERS.map(s=>{const pct=Math.round((s.occupied/s.capacity)*100); return <div key={s.name} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"><div className="flex justify-between gap-3"><div><div className="font-medium">{s.name}</div><div className="text-xs text-slate-500 mt-1">{s.type} · {s.distance}</div></div><div className="text-right"><div className="text-sm font-semibold">{s.capacity-s.occupied}</div><div className="text-[10px] text-slate-500">beds free</div></div></div><div className="h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden"><div className={`h-full ${pct>80?'bg-amber-400':'bg-emerald-400'}`} style={{width:`${pct}%`}} /></div></div>})}</div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <InfoPanel icon={CloudRain} title="Weather alert" text="24°C · Heavy rain probability 78% · Wind 18 km/h" />
          <InfoPanel icon={Crosshair} title="Risk engine" text="Elevated risk · 87% model confidence · 3-hour horizon" />
          <InfoPanel icon={Route} title="Response routing" text="Road network is recalculated using reported hazard zones." />
        </section>
      </main>
    </div>
  );
}

function Stat({title,value,icon:Icon,tone}){const tones={red:'text-red-300',blue:'text-blue-300',amber:'text-amber-300',emerald:'text-emerald-300'};return <div className="rounded-2xl border border-white/10 bg-[#070D18] p-4"><Icon className={`w-5 h-5 ${tones[tone]}`} /><div className="text-3xl font-bold mt-3">{value}</div><div className="text-xs text-slate-500 mt-1">{title}</div></div>}
function Info({label,value}){return <div className="flex justify-between gap-3 border-b border-white/[0.05] pb-2"><span className="text-slate-500">{label}</span><span className="text-right">{value}</span></div>}
function Legend({color,label}){return <span className="px-2.5 py-1.5 rounded-lg bg-black/30 border border-white/10 text-[10px] text-slate-300 flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${color}`} />{label}</span>}
function InfoPanel({icon:Icon,title,text}){return <div className="rounded-2xl border border-white/10 bg-[#070D18] p-4 flex gap-3"><Icon className="w-5 h-5 text-blue-400 shrink-0" /><div><div className="font-semibold">{title}</div><div className="text-xs text-slate-500 mt-1">{text}</div></div></div>}
