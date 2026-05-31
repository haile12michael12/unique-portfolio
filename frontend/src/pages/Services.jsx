import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Network,
  Cloud,
  Shield,
  Layers,
  Brain,
  Target,
  Calendar,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  SERVICES,
  ENGAGEMENT_MODELS,
  WORK_PROCESS,
} from '@/data/services.data';

const ICON_MAP = {
  Code2,
  Network,
  Cloud,
  Shield,
  Layers,
  Brain,
  Target,
  Calendar,
  Lightbulb,
};

function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[service.icon] || Code2;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative border border-border/60 bg-card/40 backdrop-blur-sm hover:border-primary/40 transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-syne text-xl font-bold text-foreground">{service.title}</h3>
              <p className="font-mono text-[11px] text-accent tracking-wider uppercase mt-0.5">
                {service.tagline}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground tracking-wider whitespace-nowrap">
            {service.timeline}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {service.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase border border-border/50 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 font-mono text-xs text-primary hover:text-accent transition-colors"
        >
          {expanded ? 'Hide details' : 'View deliverables'}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-border/40 grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                    Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                    Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = useMemo(
    () =>
      activeCategory === 'all'
        ? SERVICES
        : SERVICES.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Systems
        </Link>
      </div>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            Service Catalog
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
        >
          ENGINEERING
          <br />
          <span className="text-muted-foreground">SERVICES</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Production-grade engineering for teams that need senior-level expertise in distributed systems,
          cloud infrastructure, and full-stack development. Filter by category to explore offerings.
        </motion.p>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Service grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <AnimatePresence mode="popLayout">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* Engagement models */}
      <section className="border-t border-border/30 bg-card/20 py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase">
              Engagement Models
            </span>
          </div>
          <h2 className="font-syne text-3xl md:text-4xl font-extrabold mb-12">
            HOW WE <span className="text-primary">WORK TOGETHER</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {ENGAGEMENT_MODELS.map((model, i) => {
              const Icon = ICON_MAP[model.icon] || Target;
              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-border/60 bg-background/60 p-6 md:p-8 hover:border-accent/40 transition-colors"
                >
                  <Icon className="h-6 w-6 text-accent mb-4" />
                  <h3 className="font-syne text-xl font-bold mb-2">{model.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{model.description}</p>
                  <ul className="space-y-2">
                    {model.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 font-mono text-xs text-foreground/70">
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            Delivery Process
          </span>
        </div>
        <h2 className="font-syne text-3xl md:text-4xl font-extrabold mb-12">
          FROM DISCOVERY TO <span className="text-muted-foreground">DEPLOYMENT</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span className="font-mono text-4xl font-bold text-primary/20">{step.step}</span>
              <h3 className="font-syne text-lg font-bold mt-2 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/30 py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold mb-4">
            READY TO <span className="text-primary">BUILD</span>?
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto mb-8">
            Open to select projects. Initiate contact through the terminal interface or schedule a discovery call.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary bg-primary/10 text-primary font-mono text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Initiate Contact
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
