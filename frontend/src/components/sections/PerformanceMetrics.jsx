import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const METRICS = [
  {
    project: 'Nexus Engine',
    color: '#9D50FF',
    stats: [
      { label: 'P50 Latency', before: '420ms', after: '1.8ms', unit: 'ms', trend: 'down', delta: '-99%' },
      { label: 'P99 Latency', before: '4,200ms', after: '4.2ms', unit: 'ms', trend: 'down', delta: '-99.9%' },
      { label: 'Throughput', before: '50K/s', after: '2.1M/s', unit: 'events/s', trend: 'up', delta: '+4,100%' },
      { label: 'Uptime', before: '96.2%', after: '99.999%', unit: '%', trend: 'up', delta: '+3.8pp' },
    ],
    chart: [
      { t: 'Before', latency: 4200, throughput: 50 },
      { t: 'Week 1', latency: 2800, throughput: 180 },
      { t: 'Week 4', latency: 900, throughput: 620 },
      { t: 'Month 3', latency: 120, throughput: 1400 },
      { t: 'Now', latency: 4.2, throughput: 2100 },
    ],
  },
  {
    project: 'Atlas Pipeline',
    color: '#00FFA3',
    stats: [
      { label: 'Data Freshness', before: '6 hours', after: '15 min', unit: '', trend: 'down', delta: '-96%' },
      { label: 'Pipeline Failures', before: '38/week', after: '2/week', unit: '/week', trend: 'down', delta: '-94%' },
      { label: 'Daily Volume', before: '8TB', after: '52TB', unit: 'TB/day', trend: 'up', delta: '+550%' },
      { label: 'Infra Cost', before: '$42K/mo', after: '$13.4K/mo', unit: '/mo', trend: 'down', delta: '-68%' },
    ],
    chart: [
      { t: 'Before', failures: 38, volume: 8 },
      { t: 'Week 2', failures: 28, volume: 14 },
      { t: 'Month 1', failures: 12, volume: 28 },
      { t: 'Month 3', failures: 5, volume: 42 },
      { t: 'Now', failures: 2, volume: 52 },
    ],
  },
  {
    project: 'Chronos Mesh',
    color: '#60A5FA',
    stats: [
      { label: 'Sync Latency', before: '200ms', after: '12ms', unit: 'ms', trend: 'down', delta: '-94%' },
      { label: 'Concurrency', before: '800', after: '10K+', unit: 'users', trend: 'up', delta: '+1,150%' },
      { label: 'Data Loss Events', before: '~60/mo', after: '0', unit: '/mo', trend: 'down', delta: '-100%' },
      { label: 'Support Tickets', before: '340/mo', after: '61/mo', unit: '/mo', trend: 'down', delta: '-82%' },
    ],
    chart: [
      { t: 'Before', latency: 200, concurrency: 800 },
      { t: 'Alpha', latency: 140, concurrency: 2000 },
      { t: 'Beta', latency: 68, concurrency: 5000 },
      { t: 'Launch', latency: 28, concurrency: 7500 },
      { t: 'Now', latency: 12, concurrency: 10000 },
    ],
  },
  {
    project: 'Sentinel Shield',
    color: '#FF6B35',
    stats: [
      { label: 'Threat Detection', before: 'Manual / hours', after: '<50ms', unit: '', trend: 'down', delta: '-99.9%' },
      { label: 'Audit Duration', before: '6 weeks', after: '2 days', unit: '', trend: 'down', delta: '-95%' },
      { label: 'False Positives', before: '~12%', after: '0.02%', unit: '%', trend: 'down', delta: '-99.8%' },
      { label: 'Security Breaches', before: '3/year', after: '0', unit: '/year', trend: 'down', delta: '-100%' },
    ],
    chart: [
      { t: 'Before', detectionMs: 14400000, falsePos: 12 },
      { t: 'Month 1', detectionMs: 5000, falsePos: 6 },
      { t: 'Month 3', detectionMs: 800, falsePos: 1.2 },
      { t: 'Month 6', detectionMs: 200, falsePos: 0.15 },
      { t: 'Now', detectionMs: 50, falsePos: 0.02 },
    ],
  },
];

function TrendIcon({ trend }) {
  if (trend === 'up') return <TrendingUp className="w-3 h-3 text-accent" />;
  if (trend === 'down') return <TrendingDown className="w-3 h-3 text-accent" />;
  return <Minus className="w-3 h-3 text-muted-foreground" />;
}

function CountUp({ target, duration = 1200 }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(target); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = num * eased;
          setDisplay(target.replace(/[\d.]+/, current.toFixed(current < 10 ? 1 : 0)));
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function PerformanceMetrics() {
  const [activeProject, setActiveProject] = useState(0);
  const m = METRICS[activeProject];

  return (
    <section id="metrics" className="relative py-24 md:py-36 border-t border-border/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">Performance Metrics</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4">
          NUMBERS<br /><span className="text-muted-foreground">THAT MATTER</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-10">
          Before/after production metrics from real systems. No benchmarks — real traffic, real load.
        </motion.p>

        {/* Project tabs */}
        <div className="flex gap-0 border-b border-border/30 mb-10 overflow-x-auto">
          {METRICS.map((m, i) => (
            <button key={m.project} onClick={() => setActiveProject(i)}
              className={`relative font-mono text-xs px-5 py-3 tracking-widest uppercase transition-colors whitespace-nowrap flex-shrink-0 ${activeProject === i ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {m.project}
              {activeProject === i && (
                <motion.div layoutId="metrics-tab" className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: m.color }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={activeProject} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {m.stats.map((s, i) => (
              <div key={i} className="border border-border/30 p-4 bg-card/20">
                <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase mb-3">{s.label}</div>
                <div className="font-mono text-[10px] text-muted-foreground line-through mb-1">{s.before}</div>
                <div className="font-mono text-2xl font-bold mb-2" style={{ color: m.color }}>
                  <CountUp target={s.after} />
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendIcon trend={s.trend} />
                  <span className="font-mono text-[10px] text-accent font-bold">{s.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="border border-border/30 p-5 bg-card/20">
            <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase mb-4">Improvement Over Time</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={m.chart}>
                <XAxis dataKey="t" tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  contentStyle={{ background: '#0a0a0a', border: `1px solid ${m.color}40`, borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: 10 }}
                  labelStyle={{ color: m.color }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                {Object.keys(m.chart[0]).filter(k => k !== 't').map((key, ki) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={ki === 0 ? m.color : '#00FFA3'}
                    strokeWidth={2} dot={{ fill: m.color, r: 3 }} activeDot={{ r: 5 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}