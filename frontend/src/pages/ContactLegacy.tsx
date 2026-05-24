import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, Clock, MapPin } from "lucide-react";
import { Globe3D } from "@/components/Globe3D";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const now = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
    hour12: true,
  });

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Contact</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Get In Touch</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Whether you have a project idea, want to collaborate on open source, or just want to talk systems — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Globe + info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            {/* 3D Globe */}
            <Globe3D />

            {/* Location pill row */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 border border-border/50 text-xs text-muted-foreground">
                <Clock className="w-3 h-3 text-primary" />
                <span className="font-mono">{now} PT</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 border border-border/50 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 text-primary" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {[
                { href: "mailto:alex@morgan.dev", icon: Mail, label: "alex@morgan.dev", color: "hover:text-primary hover:border-primary/30" },
                { href: "https://github.com", icon: Github, label: "github.com/alexmorgan", color: "hover:text-foreground hover:border-border" },
                { href: "https://linkedin.com", icon: Linkedin, label: "linkedin.com/in/alexmorgan", color: "hover:text-blue-400 hover:border-blue-400/30" },
                { href: "https://twitter.com", icon: Twitter, label: "@alexmorgan_dev", color: "hover:text-sky-400 hover:border-sky-400/30" },
              ].map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-testid={`link-contact-${label.split(".")[0].replace("@", "").replace(":", "")}`}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border border-border/40 bg-card/40 text-muted-foreground ${color} transition-all text-xs`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="font-mono truncate">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {sent ? (
              <div className="flex items-center justify-center p-16 rounded-xl bg-card/60 border border-emerald-500/40 text-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">I'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm space-y-4"
                data-testid="form-contact"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      data-testid="input-contact-name"
                      placeholder="Jane Smith"
                      className="w-full px-3 py-2 rounded-lg bg-background/60 border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-muted-foreground">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      data-testid="input-contact-email"
                      placeholder="jane@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-background/60 border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    data-testid="input-contact-subject"
                    placeholder="Consulting · Collaboration · Speaking"
                    className="w-full px-3 py-2 rounded-lg bg-background/60 border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-muted-foreground">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    data-testid="input-contact-message"
                    rows={5}
                    placeholder="Tell me about your project, opportunity, or question..."
                    className="w-full px-3 py-2 rounded-lg bg-background/60 border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  data-testid="button-contact-submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] text-sm"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
