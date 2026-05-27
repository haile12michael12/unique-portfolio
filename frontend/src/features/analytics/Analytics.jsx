import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  Cpu, 
  Globe, 
  Users 
} from 'lucide-react';

const STATS = [
  { label: 'System Uptime', value: '99.99%', sub: 'Last 30 days', icon: Activity, color: 'text-emerald-400' },
  { label: 'Global Latency', value: '4.2ms', sub: 'Avg P99', icon: Zap, color: 'text-cyan-400' },
  { label: 'Edge Nodes', value: '240', sub: 'Across 12 regions', icon: Globe, color: 'text-blue-400' },
  { label: 'Active Users', value: '1.2M', sub: 'Concurrent peak', icon: Users, color: 'text-primary' },
];

export default function Analytics() {
  return (
    <section id="analytics" className="py-24 border-t border-border/30 bg-card/20 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            System Analytics — Live Stream
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-border/40 bg-card/40 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-12 h-12" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-primary/5 border border-primary/20 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>

              <div className="space-y-1">
                <div className="font-syne font-bold text-3xl text-foreground">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase">
                  {stat.sub}
                </div>
              </div>

              {/* Decorative line graph indicator */}
              <div className="mt-6 h-1 w-full bg-muted/20 overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '0%' }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  className={`h-full bg-gradient-to-r from-transparent to-primary w-[70%]`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Performance Graph Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="p-8 border border-border/40 bg-card/60 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-syne font-bold text-xl uppercase tracking-tight">Throughput Distribution</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Real-time Optimization Active</span>
            </div>
          </div>

          <div className="aspect-[21/9] md:aspect-[32/9] flex items-end gap-1 md:gap-2">
            {Array.from({ length: 48 }).map((_, i) => {
              const h = 20 + Math.random() * 80;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.01 }}
                  className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors relative group"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/40 group-hover:bg-primary opacity-0 group-hover:opacity-100 transition-all" />
                </motion.div>
              );
            })}
          </div>
          
          <div className="flex justify-between mt-4 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            <span>T-48h</span>
            <span>T-24h</span>
            <span>Current Cycle</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
