import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

const RESUME_LINK = "https://drive.google.com/file/d/1tBsXjkEP_v81T3hfPu-ZkkofP-A7gO7e/view?usp=drive_link";

export default function Resume() {
  return (
    <section id="resume" className="py-24 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="bg-card/40 border border-border/60 rounded-2xl p-8 md:p-16 relative overflow-hidden group">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-1000" />

          <div className="relative z-10 grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
                  Curriculum Vitae — Resume
                </span>
              </motion.div>

              <div className="space-y-4">
                <h2 className="font-syne text-4xl md:text-6xl font-extrabold tracking-tight leading-none">
                  ACCESS THE <br />
                  <span className="text-primary">CORE MANIFEST</span>
                </h2>
                <p className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed">
                  Download the complete technical breakdown of my engineering career, architectural decisions, and impact across top-tier technology companies.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all group/btn shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  <FileText className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  View Resume
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                
                <button className="flex items-center gap-3 px-8 py-4 border border-border/60 hover:border-primary/40 bg-background/40 backdrop-blur-sm font-mono text-xs font-bold uppercase tracking-widest transition-all group/dl">
                  <Download className="w-4 h-4 group-hover/dl:translate-y-0.5 transition-transform" />
                  Download PDF
                </button>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative w-64 h-80 bg-background border border-border/40 p-6 shadow-2xl"
              >
                <div className="space-y-4 opacity-40 select-none pointer-events-none">
                  <div className="w-full h-4 bg-muted rounded" />
                  <div className="w-3/4 h-2 bg-muted rounded" />
                  <div className="space-y-2 pt-4">
                    <div className="w-full h-1 bg-muted rounded" />
                    <div className="w-full h-1 bg-muted rounded" />
                    <div className="w-full h-1 bg-muted rounded" />
                    <div className="w-2/3 h-1 bg-muted rounded" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="w-full h-1 bg-muted rounded" />
                    <div className="w-full h-1 bg-muted rounded" />
                    <div className="w-full h-1 bg-muted rounded" />
                  </div>
                </div>
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-pulse">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
