import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="font-syne text-lg font-bold text-foreground tracking-tight">
              Hailemichael Assefa
            </div>
            <div className="font-mono text-[11px] text-muted-foreground tracking-[0.1em] uppercase">
              Senior Software Architect — Available for select engagements
            </div>
          </div>

          <div className="flex items-center gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map(label => (
              <a
                key={label}
                href="#"
                className="font-mono text-[11px] text-muted-foreground hover:text-primary tracking-[0.1em] uppercase transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono text-[10px] text-muted-foreground/60 tracking-wider">
            © 2026 — ALL SYSTEMS NOMINAL
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] text-accent/80 tracking-wider uppercase">
              System Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}