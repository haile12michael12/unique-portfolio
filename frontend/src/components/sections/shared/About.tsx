import { motion } from "framer-motion";
import { TerminalSimulation } from "@/components/TerminalSimulation";
import { MapPin, Coffee, Zap, Code2 } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "8+" },
  { label: "GitHub Stars", value: "7k+" },
  { label: "Production Systems", value: "12+" },
  { label: "Open Source Repos", value: "24" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">About</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">A bit about me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Senior Software Engineer with 8 years of experience building infrastructure,
                developer tools, and distributed systems at companies like{" "}
                <span className="text-foreground font-medium">Google</span>,{" "}
                <span className="text-foreground font-medium">Stripe</span>, and{" "}
                <span className="text-foreground font-medium">Vercel</span>.
              </p>
              <p>
                My work sits at the intersection of correctness and performance — I care deeply
                about systems that are provably right, blazingly fast, and maintainable by
                future engineers who've never met me.
              </p>
              <p>
                When I'm not writing Go or Rust, I'm contributing to open source projects,
                speaking at conferences, or writing deeply technical blog posts that try to
                make hard things understandable.
              </p>
            </div>

            {/* Quick facts */}
            <div className="flex flex-col gap-2 pt-2">
              {[
                { icon: MapPin, text: "San Francisco, CA — UTC-7" },
                { icon: Coffee, text: "Daily driver: Neovim + tmux + Ghostty" },
                { icon: Zap, text: "Current obsession: eBPF and Rust async runtimes" },
                { icon: Code2, text: "Writing: ~2000 lines of production code per week" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-primary font-mono">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Cinematic Terminal Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TerminalSimulation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
