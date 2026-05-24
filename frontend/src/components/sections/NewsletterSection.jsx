const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    await db.entities.Subscriber.create({ email, source: 'portfolio' });
    setLoading(false);
    setSuccess(true);
    setEmail('');
  };

  return (
    <section id="updates" className="relative py-24 md:py-32 border-t border-border/30">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
              Development Updates
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
          >
            STAY IN THE
            <br />
            <span className="text-muted-foreground">LOOP</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-mono text-sm text-muted-foreground leading-relaxed mb-10"
          >
            Get notified when I publish new case studies, release open-source tools, or drop architecture deep-dives.
            No spam — only signal.
          </motion.p>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 border border-accent/40 bg-accent/5 px-5 py-4"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="font-mono text-sm text-accent">
                    You're in. I'll reach out when something ships.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-0"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 font-mono text-sm px-5 py-3.5 border border-border/60 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 font-mono text-xs font-bold px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tracking-widest uppercase disabled:opacity-50 border border-primary whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Fine print */}
            {!success && (
              <p className="font-mono text-[10px] text-muted-foreground/60 mt-3 tracking-wider">
                No spam. Unsubscribe anytime. Updates ship when things are worth sharing.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}