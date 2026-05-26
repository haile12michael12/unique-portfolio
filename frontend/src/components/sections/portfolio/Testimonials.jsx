import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Staff Engineer @ CloudScale',
    content: 'The Nexus Engine architecture is one of the most elegant implementations of Raft I have seen. The performance metrics speak for themselves.',
    avatar: 'SC'
  },
  {
    name: 'Marcus Thorne',
    role: 'CTO @ DataStream',
    content: 'The Atlas Pipeline transformed our data processing from a bottleneck into a competitive advantage. Highly recommend this architectural approach.',
    avatar: 'MT'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Lead Developer @ SecureLink',
    content: 'Chronos Mesh solved our real-time synchronization issues where every other solution failed. The use of CRDTs is masterfully done.',
    avatar: 'ER'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-t border-border/30 bg-muted/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            Peer Reviews — Validated
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-border/40 bg-card/50 backdrop-blur-sm relative group hover:border-primary/30 transition-all"
            >
              <Quote className="absolute top-6 right-8 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-none border border-primary/40 bg-primary/10 flex items-center justify-center font-mono text-xs font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-syne font-bold text-foreground">{t.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{t.role}</div>
                </div>
              </div>

              <p className="font-mono text-sm text-muted-foreground leading-relaxed italic">
                "{t.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
