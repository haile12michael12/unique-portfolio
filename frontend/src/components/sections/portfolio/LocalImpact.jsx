import { motion } from 'framer-motion';
import { MapPin, Users, Code2, Wifi, GraduationCap, Globe } from 'lucide-react';

const IMPACTS = [
  {
    icon: GraduationCap,
    color: '#00FFA3',
    title: 'Open-Source Education Tools',
    description: 'Built free developer learning platforms used by 2,000+ Ethiopian computer science students at Addis Ababa University and AASTU.',
    metric: '2,000+',
    metricLabel: 'Students Reached',
  },
  {
    icon: Code2,
    color: '#9D50FF',
    title: 'Amharic Dev Community',
    description: 'Founded an Amharic-language programming community — tutorials, code reviews, and mentorship sessions conducted natively.',
    metric: '800+',
    metricLabel: 'Community Members',
  },
  {
    icon: Wifi,
    color: '#3178C6',
    title: 'Low-Bandwidth Optimization',
    description: 'Engineered lightweight, offline-first web apps designed for Ethiopia\'s connectivity constraints — sub-50KB initial loads.',
    metric: '<50KB',
    metricLabel: 'Initial Bundle',
  },
  {
    icon: Users,
    color: '#F74C00',
    title: 'Mentorship & Hiring Pipeline',
    description: 'Mentored 40+ junior developers from Addis Ababa into international remote roles at European and US tech companies.',
    metric: '40+',
    metricLabel: 'Engineers Placed',
  },
  {
    icon: Globe,
    color: '#00FFA3',
    title: 'Fintech for Underserved Markets',
    description: 'Contributed to mobile payment infrastructure supporting smallholder farmers and cooperatives across the Oromia region.',
    metric: '120K+',
    metricLabel: 'Transactions Enabled',
  },
  {
    icon: MapPin,
    color: '#9D50FF',
    title: 'Healthcare Data Systems',
    description: 'Architected a patient record system deployed across 12 rural health clinics in the SNNPR region, replacing paper-based workflows.',
    metric: '12',
    metricLabel: 'Clinics Digitized',
  },
];

export default function LocalImpact() {
  return (
    <section id="impact" className="relative py-24 md:py-40 border-t border-border/30 overflow-hidden">
      {/* Ethiopian flag accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 flex">
        <div className="flex-1 bg-green-500/60" />
        <div className="flex-1 bg-yellow-400/60" />
        <div className="flex-1 bg-red-500/60" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-accent" />
          <span className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase">
            Local Impact — Ethiopia
          </span>
          <span className="text-lg">🇪🇹</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
        >
          BUILDING
          <br />
          <span className="text-muted-foreground">ETHIOPIA'S STACK</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-16 leading-relaxed"
        >
          Engineering isn't just about systems at scale — it's about creating real change at home.
          Here's how I'm investing in Ethiopia's next generation of builders.
        </motion.p>

        {/* Impact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {IMPACTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background p-8 group hover:bg-card/50 transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 flex items-center justify-center border"
                    style={{ borderColor: `${item.color}40` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 h-px" style={{ backgroundColor: `${item.color}20` }} />
                </div>

                <h3 className="font-syne text-base font-bold text-foreground tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="font-mono text-[11px] text-muted-foreground leading-[1.8] mb-5">
                  {item.description}
                </p>

                <div className="flex items-end gap-2">
                  <span className="font-mono text-2xl font-bold" style={{ color: item.color }}>
                    {item.metric}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase pb-1">
                    {item.metricLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 border border-accent/20 bg-accent/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <div className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase mb-2">
              Help Scale This Impact
            </div>
            <p className="font-mono text-sm text-muted-foreground max-w-lg">
              Your support directly funds open-source tools, mentorship sessions, and educational content for Ethiopian developers.
            </p>
          </div>
          <a
            href="/support"
            className="flex-shrink-0 font-mono text-xs px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300 tracking-widest uppercase"
          >
            ☕ Support the Mission
          </a>
        </motion.div>
      </div>
    </section>
  );
}