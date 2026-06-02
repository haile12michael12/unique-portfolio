import { motion } from 'framer-motion';
import Experience from '@/components/sections/portfolio/Experience';
import Resume from '@/components/sections/portfolio/Resume';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 border-b border-border/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
              About
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] mb-4"
          >
            PROFESSIONAL
            <br />
            <span className="text-muted-foreground">PROFILE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed"
          >
            Explore my career timeline and access the latest resume. This page brings
            together work history, technical impact, and credentials in one place.
          </motion.p>
        </div>
      </section>

      <Experience />
      <Resume />
    </div>
  );
}
