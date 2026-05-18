const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Coffee, Github, CreditCard, Building2, Star, Lock, BookOpen, Code2, Video, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUPPORT_OPTIONS = [
  {
    id: 'coffee',
    icon: Coffee,
    label: 'Buy Me a Coffee',
    color: '#F59E0B',
    amounts: [3, 5, 10],
    description: 'Quick one-time support. Every cup fuels a new open-source commit.',
  },
  {
    id: 'github_sponsors',
    icon: Github,
    label: 'GitHub Sponsors',
    color: '#9D50FF',
    amounts: [5, 10, 25],
    description: 'Recurring monthly support via GitHub. Unlock sponsor badges and private repos.',
  },
  {
    id: 'paypal',
    icon: CreditCard,
    label: 'PayPal / Card',
    color: '#3178C6',
    amounts: [10, 25, 50],
    description: 'Direct transfer via PayPal. International cards accepted.',
  },
  {
    id: 'bank_transfer',
    icon: Building2,
    label: 'Bank Transfer (Ethiopia)',
    color: '#00FFA3',
    amounts: [100, 250, 500],
    description: 'Local ETB bank transfer via CBE or Awash Bank. Contact me for account details.',
  },
];

const EXCLUSIVE_CONTENT = [
  { icon: BookOpen, label: 'Premium Case Studies', description: 'Deep technical write-ups not published anywhere else' },
  { icon: Code2,    label: 'Source Code Downloads', description: 'Full source of select open-source projects with setup guides' },
  { icon: Video,    label: 'Private Video Tutorials', description: 'Architecture walkthroughs recorded exclusively for supporters' },
  { icon: Star,     label: 'Early Access',            description: 'First look at new projects and tools before public release' },
];

function RecentSupporters({ supporters }) {
  if (!supporters.length) return null;
  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-px bg-accent" />
        <span className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase">Recent Supporters</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {supporters.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-border/40 bg-card/30 p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-mono text-sm font-bold text-primary">
              {s.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs font-bold text-foreground truncate">{s.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">${s.amount} · {s.method.replace('_', ' ')}</div>
            </div>
            <Heart className="w-3 h-3 text-primary flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Support() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '', is_public: true });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [supporters, setSupporters] = useState([]);

  useEffect(() => {
    db.entities.Supporter.filter({ is_public: true }, '-created_date', 12)
      .then(setSupporters)
      .catch(() => {});
  }, []);

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMethod || !finalAmount || !form.name || !form.email) return;
    setLoading(true);
    await db.entities.Supporter.create({
      ...form,
      amount: finalAmount,
      method: selectedMethod,
    });
    setLoading(false);
    setSuccess(true);
    // Refresh supporters
    db.entities.Supporter.filter({ is_public: true }, '-created_date', 12)
      .then(setSupporters)
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 h-14 flex items-center px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Portfolio
        </Link>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-28 pb-24">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">Support the Work</span>
          </div>
          <h1 className="font-syne text-4xl md:text-6xl font-extrabold tracking-[-0.04em] text-foreground mb-4">
            FUEL THE
            <br />
            <span className="text-muted-foreground">MISSION</span>
          </h1>
          <p className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed mb-12">
            Support my work and help me build more open-source tools, educational content, and
            developer resources — especially for the Ethiopian tech community. 🇪🇹
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border border-accent/40 bg-accent/5 p-10 flex flex-col items-center text-center gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-accent" />
                  <h2 className="font-syne text-2xl font-bold text-foreground">Thank You! ☕</h2>
                  <p className="font-mono text-sm text-muted-foreground max-w-sm">
                    Your support is recorded and deeply appreciated. I'll be in touch with exclusive content soon.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="font-mono text-xs px-6 py-2.5 border border-border/60 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase mt-2"
                  >
                    Support Again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Step 1: Method */}
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-4">
                      01 — Choose Method
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SUPPORT_OPTIONS.map(opt => {
                        const Icon = opt.icon;
                        const active = selectedMethod === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => { setSelectedMethod(opt.id); setSelectedAmount(opt.amounts[0]); setCustomAmount(''); }}
                            className={`text-left p-4 border transition-all duration-200 ${
                              active ? 'border-primary/70 bg-primary/10' : 'border-border/40 hover:border-border bg-card/20'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-4 h-4" style={{ color: opt.color }} />
                              <span className="font-mono text-xs font-bold text-foreground">{opt.label}</span>
                            </div>
                            <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{opt.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Amount */}
                  <AnimatePresence>
                    {selectedMethod && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-4">
                          02 — Choose Amount {selectedMethod === 'bank_transfer' ? '(ETB)' : '(USD)'}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {SUPPORT_OPTIONS.find(o => o.id === selectedMethod)?.amounts.map(amt => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                              className={`font-mono text-sm px-5 py-2.5 border transition-all ${
                                selectedAmount === amt && !customAmount
                                  ? 'border-primary text-primary bg-primary/10'
                                  : 'border-border/50 text-muted-foreground hover:border-border'
                              }`}
                            >
                              {selectedMethod === 'bank_transfer' ? `${amt} ETB` : `$${amt}`}
                            </button>
                          ))}
                          <input
                            type="number"
                            min="1"
                            placeholder="Custom"
                            value={customAmount}
                            onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                            className="font-mono text-sm px-4 py-2.5 border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-28 transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 3: Details */}
                  <AnimatePresence>
                    {selectedMethod && finalAmount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="space-y-4"
                      >
                        <div className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-2">
                          03 — Your Details
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase block mb-1.5">Name *</label>
                            <input
                              required
                              value={form.name}
                              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                              placeholder="Abebe Bekele"
                              className="w-full font-mono text-sm px-4 py-2.5 border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase block mb-1.5">Email *</label>
                            <input
                              required
                              type="email"
                              value={form.email}
                              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                              placeholder="you@example.com"
                              className="w-full font-mono text-sm px-4 py-2.5 border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase block mb-1.5">Message (optional)</label>
                          <textarea
                            rows={3}
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            placeholder="Keep building awesome things..."
                            className="w-full font-mono text-sm px-4 py-2.5 border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.is_public}
                            onChange={e => setForm(f => ({ ...f, is_public: e.target.checked }))}
                            className="accent-primary"
                          />
                          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.1em]">Show me in Recent Supporters</span>
                        </label>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full font-mono text-sm font-bold py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tracking-widest uppercase disabled:opacity-50 mt-2"
                        >
                          {loading ? 'Recording...' : `☕ Support with ${selectedMethod === 'bank_transfer' ? `${finalAmount} ETB` : `$${finalAmount}`}`}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — Exclusive content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2"
          >
            <div className="border border-border/40 bg-card/20 p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Lock className="w-4 h-4 text-primary" />
                <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">Unlock Exclusive</span>
              </div>
              <div className="space-y-5">
                {EXCLUSIVE_CONTENT.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-foreground mb-0.5">{item.label}</div>
                        <div className="font-mono text-[10px] text-muted-foreground leading-relaxed">{item.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-border/40">
                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase mb-2">Impact Note</div>
                <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                  50% of all support goes directly toward mentoring Ethiopian developers and funding open-source tools for local communities. 🇪🇹
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent supporters */}
        <RecentSupporters supporters={supporters} />
      </div>
    </div>
  );
}