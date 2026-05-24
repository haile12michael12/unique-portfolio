import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Zap, Database, List, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

const TICK_MS = 120;

const PRESETS = [
  { label: '1K Users',   users: 1000,  color: '#00FFA3', threat: 'low' },
  { label: '10K Users',  users: 10000, color: '#9D50FF', threat: 'medium' },
  { label: '100K Users', users: 100000,color: '#FF6B35', threat: 'high' },
];

function lerp(a, b, t) { return a + (b - a) * t; }
function fmtNum(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return Math.round(n).toString();
}

// Sparkline — last N values as SVG path
function Sparkline({ values, color, height = 32 }) {
  if (values.length < 2) return null;
  const W = 120, H = height;
  const min = Math.min(...values);
  const max = Math.max(...values) || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W;
    const y = H - ((v - min) / (max - min)) * (H - 4) - 2;
    return `${x},${y}`;
  });
  const d = 'M' + pts.join(' L');
  return (
    <svg width={W} height={H} className="opacity-80">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d + ` L${W},${H} L0,${H} Z`} fill={`url(#sg-${color.replace('#','')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Single metric card
function MetricCard({ icon: Icon, label, value, unit, sub, color, sparkValues }) {
  return (
    <div className="border border-border/40 bg-card/30 p-4 flex flex-col gap-1 relative overflow-hidden">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" style={{ color }} />
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">{label}</span>
        </div>
        {sparkValues && (
          <div className="opacity-60">
            <Sparkline values={sparkValues} color={color} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-1.5">
        <span className="font-mono text-2xl font-bold" style={{ color }}>{value}</span>
        {unit && <span className="font-mono text-xs text-muted-foreground mb-1">{unit}</span>}
      </div>
      {sub && <div className="font-mono text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

// Animated queue bar
function QueueBar({ label, pct, color, count }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">{label}</span>
        <span className="font-mono text-[10px]" style={{ color }}>{fmtNum(count)}</span>
      </div>
      <div className="h-1.5 bg-secondary overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${Math.min(pct, 100)}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Log line
function LogLine({ line, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      className="font-mono text-[10px] leading-[1.6]"
    >
      <span className="text-muted-foreground">[{line.ts}]</span>{' '}
      <span style={{ color: line.color }}>{line.tag}</span>{' '}
      <span className="text-foreground/70">{line.msg}</span>
    </motion.div>
  );
}

const LOG_TEMPLATES = [
  (s) => ({ tag: 'REQ', color: '#9D50FF', msg: `Ingested ${fmtNum(s.rps)} req/s — routing to ${Math.ceil(s.users / 1200)} nodes` }),
  (s) => ({ tag: 'QUEUE', color: '#00FFA3', msg: `Queue depth ${fmtNum(s.queue)} — consumer lag ${Math.round(s.queue / 800)}ms` }),
  (s) => ({ tag: 'DB', color: '#FF6B35', msg: `${fmtNum(s.dbQps)} QPS — ${s.dbLoad > 80 ? '⚠ high' : 'nominal'} — cache hit ${s.cacheHit}%` }),
  (s) => ({ tag: 'GC', color: '#60A5FA', msg: `Heap 42% — GC pause ${(Math.random() * 2 + 0.5).toFixed(1)}ms` }),
  (s) => ({ tag: 'NET', color: '#A78BFA', msg: `Egress ${(s.rps * 1.2 / 1000).toFixed(1)} MB/s — p99 latency ${s.latency}ms` }),
  (s) => ({ tag: 'K8S', color: '#34D399', msg: `Scaled to ${Math.ceil(s.users / 1200)} replicas — HPA target 70% CPU` }),
];

export default function SystemSimulation() {
  const [running, setRunning] = useState(false);
  const [preset, setPreset] = useState(PRESETS[1]);
  const [tick, setTick] = useState(0);
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState({ rps: [], queue: [], dbLoad: [] });
  const logsRef = useRef(null);
  const intervalRef = useRef(null);
  const tickRef = useRef(0);

  // Derived simulation state from tick
  const sim = (() => {
    const t = tick;
    const users = preset.users;
    const rampT = Math.min(t / 40, 1); // ramp over 40 ticks
    const noise = () => 0.92 + Math.random() * 0.16;

    const rps = Math.round(users * 0.18 * rampT * noise());
    const queue = Math.round(users * 0.04 * rampT * noise());
    const dbLoad = Math.min(Math.round(users / 1000 * 8 * rampT * noise()), 99);
    const cacheHit = Math.max(100 - Math.round(dbLoad * 0.3) - Math.round(Math.random() * 5), 62);
    const dbQps = Math.round(rps * 0.6 * noise());
    const latency = Math.max(Math.round(2 + (dbLoad / 100) * 18 + (queue / users) * 30), 2);
    const cpuPct = Math.min(Math.round(20 + rampT * 55 * noise()), 98);
    const memPct = Math.min(Math.round(30 + rampT * 40 * noise()), 95);
    const errorRate = dbLoad > 85 ? (Math.random() * 0.8).toFixed(2) : (Math.random() * 0.08).toFixed(2);
    return { rps, queue, dbLoad, cacheHit, dbQps, latency, cpuPct, memPct, errorRate, users };
  })();

  // Tick engine
  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      tickRef.current += 1;
      setTick(t => t + 1);
    }, TICK_MS);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // History & logs on tick
  useEffect(() => {
    if (!running) return;
    setHistory(h => ({
      rps:    [...h.rps.slice(-30),    sim.rps],
      queue:  [...h.queue.slice(-30),  sim.queue],
      dbLoad: [...h.dbLoad.slice(-30), sim.dbLoad],
    }));
    // Add log line every ~4 ticks
    if (tick % 4 === 0) {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
      setLogs(l => [{ ...template(sim), ts, id: tick }, ...l.slice(0, 29)]);
    }
  }, [tick]);

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = 0;
  }, [logs]);

  const start = () => {
    setTick(0);
    setLogs([]);
    setHistory({ rps: [], queue: [], dbLoad: [] });
    setRunning(true);
  };
  const stop = () => setRunning(false);

  const threat = preset.threat;
  const statusColor = !running ? '#505050' : threat === 'high' ? '#FF6B35' : threat === 'medium' ? '#9D50FF' : '#00FFA3';

  return (
    <section id="simulation" className="relative py-24 md:py-36 border-t border-border/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">Live System Simulation</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4">
          LOAD<br /><span className="text-muted-foreground">SIMULATOR</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-10">
          Simulate real-world traffic load on a distributed architecture. Watch requests, queue depth, and database load respond in real time.
        </motion.p>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => { setPreset(p); if (running) { stop(); setTimeout(start, 50); } }}
              className={`font-mono text-xs px-4 py-2 border tracking-widest uppercase transition-colors ${
                preset.label === p.label
                  ? 'border-primary/60 text-primary bg-primary/10'
                  : 'border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {p.label}
            </button>
          ))}

          <div className="flex-1" />

          {/* Status badge */}
          <div className="flex items-center gap-2 border border-border/30 px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusColor }} />
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: statusColor }}>
              {running ? `SIM ACTIVE — ${preset.label}` : 'STANDBY'}
            </span>
          </div>

          {running ? (
            <button onClick={stop} className="flex items-center gap-2 px-4 py-2 border border-destructive/40 text-destructive hover:bg-destructive/10 font-mono text-xs tracking-widest uppercase transition-colors">
              <Square className="w-3.5 h-3.5" /> Stop
            </button>
          ) : (
            <button onClick={start} className="flex items-center gap-2 px-5 py-2 border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 font-mono text-xs tracking-widest uppercase transition-colors">
              <Play className="w-3.5 h-3.5" /> Simulate {preset.label.replace(' Users','')} Users
            </button>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — metric cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <MetricCard icon={Zap} label="Requests/sec" value={running ? fmtNum(sim.rps) : '—'} color="#9D50FF" sparkValues={history.rps} sub={running ? `${sim.users.toLocaleString()} users online` : 'Start simulation'} />
              <MetricCard icon={List} label="Queue Depth" value={running ? fmtNum(sim.queue) : '—'} unit="items" color="#00FFA3" sparkValues={history.queue} sub={running ? `Consumer lag ${Math.round(sim.queue / 800)}ms` : ''} />
              <MetricCard icon={Database} label="DB Load" value={running ? sim.dbLoad : '—'} unit="%" color="#FF6B35" sparkValues={history.dbLoad} sub={running ? `${fmtNum(sim.dbQps)} QPS · ${sim.cacheHit}% cache` : ''} />
              <MetricCard icon={Activity} label="P99 Latency" value={running ? sim.latency : '—'} unit="ms" color="#60A5FA" sub={running ? `Target: <10ms` : ''} />
              <MetricCard icon={Activity} label="CPU" value={running ? sim.cpuPct : '—'} unit="%" color="#A78BFA" sub={running ? `Mem ${sim.memPct}%` : ''} />
              <MetricCard
                icon={sim.errorRate > 0.1 ? AlertTriangle : CheckCircle2}
                label="Error Rate"
                value={running ? sim.errorRate : '—'} unit="%"
                color={running && sim.errorRate > 0.1 ? '#FF6B35' : '#00FFA3'}
                sub={running ? (sim.errorRate > 0.1 ? '⚠ Elevated' : 'Nominal') : ''}
              />
            </div>

            {/* Queue breakdown */}
            <div className="border border-border/40 bg-card/20 p-5 space-y-4">
              <div className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-2">Queue Processing</div>
              <QueueBar label="API Gateway"    pct={running ? Math.min((sim.rps / (preset.users * 0.22)) * 100, 100) : 0}    color="#9D50FF" count={running ? Math.round(sim.queue * 0.35) : 0} />
              <QueueBar label="Message Broker" pct={running ? Math.min((sim.queue / (preset.users * 0.06)) * 100, 100) : 0}   color="#00FFA3" count={running ? Math.round(sim.queue * 0.45) : 0} />
              <QueueBar label="DB Write Queue" pct={running ? Math.min(sim.dbLoad, 100) : 0}                                  color="#FF6B35" count={running ? Math.round(sim.queue * 0.2) : 0} />
              <QueueBar label="Cache Layer"    pct={running ? sim.cacheHit : 0}                                               color="#60A5FA" count={running ? Math.round(sim.rps * 0.6) : 0} />
            </div>
          </div>

          {/* Right — live log */}
          <div className="border border-border/40 bg-card/20 flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
              <div className={`w-1.5 h-1.5 rounded-full ${running ? 'animate-pulse' : ''}`} style={{ backgroundColor: statusColor }} />
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">System Log</span>
              <span className="ml-auto font-mono text-[9px] text-muted-foreground/60">{logs.length} entries</span>
            </div>
            <div ref={logsRef} className="flex-1 overflow-y-auto p-4 space-y-1.5 min-h-[320px] max-h-[420px]">
              {logs.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <span className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase">Awaiting simulation start</span>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {logs.map((l) => <LogLine key={l.id} line={l} />)}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}