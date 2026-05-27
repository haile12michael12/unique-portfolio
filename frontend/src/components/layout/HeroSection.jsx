import { motion } from 'framer-motion';
import HeroSignalAnimation from '@/components/animations/HeroSignalAnimation';
import ActivityPulse from '@/components/sections/shared/ActivityPulse';
import heroImage from '@/assets/hero.png';

export default function HeroSection() {
  const scrollToArchive = () => {
    document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background activity pulse */}
      <ActivityPulse />
      <HeroSignalAnimation />

      {/* Decorative background image */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
        <img 
          src={heroImage} 
          alt="System Architecture" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
      </div>

      {/* Vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[20, 40, 60, 80].map(p => (
          <div
            key={p}
            className="absolute top-0 bottom-0 w-px bg-border/30"
            style={{ left: `${p}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
        {/* System metadata */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-widest uppercase">
            System Overview — Initialised
          </span>
        </motion.div>

        {/* Name - massive structural element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-extrabold leading-[0.85] tracking-[-0.04em] text-foreground">
           Hailemichael 
            <br />
            <span className="text-primary">Assefa</span>
          </h1>
        </motion.div>

        {/* Stack definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-6 md:gap-16"
        >
          <div className="space-y-2">
            <div className="font-mono text-[11px] text-muted-foreground tracking-[0.1em] uppercase">
              Primary Directives
            </div>
            <div className="font-syne text-xl md:text-2xl font-bold text-foreground/80 tracking-tight">
              DISTRIBUTED SYSTEMS / ARCHITECTURE / LEADERSHIP
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-mono text-[11px] text-muted-foreground tracking-[0.1em] uppercase">
              Experience
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-accent">
              3+<span className="text-sm text-muted-foreground ml-1">YRS</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-mono text-[11px] text-muted-foreground tracking-[0.1em] uppercase">
              Systems Deployed
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-foreground">
              7
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 md:mt-20"
        >
          <button
            onClick={scrollToArchive}
            className="group relative inline-flex items-center gap-4 font-mono text-xs tracking-[0.15em] uppercase text-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <span className="relative z-10 py-3 px-6 border border-primary/40 hover:bg-primary transition-all duration-300">
              Initialise Protocol
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-primary"
            >
              →
            </motion.span>
          </button>
        </motion.div>

        {/* Bottom trace line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 h-px bg-gradient-to-r from-primary/40 via-border to-transparent origin-left"
        />
      </div>

      {/* Hero image overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block pointer-events-none">
        <img
          src="/assets/hero-crystal-structure.svg"
          alt="Abstract crystalline data structure with ray-traced glass surfaces"
          className="w-full h-full object-cover opacity-20 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>
    </section>
  );
}
