import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const EXPERIENCES = [
  {
    company: 'Vercel',
    role: 'Senior Software Engineer',
    period: '2022 — Present',
    location: 'San Francisco, CA',
    description: 'Leading the infrastructure team to optimize edge runtime performance. Reduced cold start times by 40% using custom eBPF probes and Rust-based orchestration.',
    achievements: [
      'Architected a distributed cache invalidation system handling 500k req/s',
      'Developed a custom Rust-based async runtime for edge functions',
      'Mentored 12+ junior and mid-level engineers'
    ]
  },
  {
    company: 'Stripe',
    role: 'Software Engineer',
    period: '2019 — 2022',
    location: 'San Francisco, CA',
    description: 'Developed core payment processing pipelines and fraud detection systems. Scaled transaction handling by 3x during peak holiday seasons.',
    achievements: [
      'Built a real-time fraud scoring engine using Go and Kafka',
      'Optimized SQL queries reducing average latency by 150ms',
      'Implemented mTLS across 200+ microservices'
    ]
  },
  {
    company: 'Google',
    role: 'Software Engineer',
    period: '2016 — 2019',
    location: 'Mountain View, CA',
    description: 'Worked on the Kubernetes core team, focusing on scheduling efficiency and node lifecycle management.',
    achievements: [
      'Contributed to Kube-scheduler optimization for large-scale clusters',
      'Developed internal tools for automated cluster health monitoring',
      'Reduced resource overhead on small nodes by 15%'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            Professional History — Experience
          </span>
        </motion.div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-[1fr_2fr] gap-8 border-l border-border/40 pl-8 relative"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-primary rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              
              <div className="space-y-2">
                <div className="font-mono text-xs text-primary uppercase tracking-widest">{exp.period}</div>
                <h3 className="font-syne text-2xl font-bold">{exp.company}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                  <Briefcase className="w-3 h-3" />
                  {exp.role}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed italic">
                  "{exp.description}"
                </p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-primary/40 rounded-full flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
