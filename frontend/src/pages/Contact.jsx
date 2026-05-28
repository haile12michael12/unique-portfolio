import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const QUICK_COMMANDS = [
  { cmd: '/hire', desc: 'Open to opportunities' },
  { cmd: '/resume', desc: 'Download CV' },
  { cmd: '/coffee', desc: 'Schedule a chat' },
];

const RESPONSES = {
  '/hire': '→ Excellent. I am open to senior/staff-level architecture and engineering leadership roles. Please provide your email and I\'ll reach out within 24 hours.',
  '/resume': '→ Resume package compiled. In production, this would trigger a PDF download of the latest CV.',
  '/coffee': '→ Coffee protocol initiated. I\'m available for 30-minute technical discussions. Suggest a time and I\'ll confirm.',
  '/help': '→ Available commands: /hire, /resume, /coffee, /stack, /help. Or type any message to send directly.',
  '/stack': '→ Primary: Go, Rust, TypeScript, Python. Infrastructure: K8s, Terraform, AWS/GCP. Data: Kafka, PostgreSQL, Redis, Snowflake. Specialties: Distributed Systems, CQRS, Event Sourcing, CRDTs.',
};

export default function TerminalContact() {
  const [lines, setLines] = useState([
    { type: 'system', text: 'TERMINAL v2.4.1 — Contact Interface Loaded' },
    { type: 'system', text: 'Type a message or use quick commands below. Type /help for options.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const processCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setLines(prev => [...prev, { type: 'user', text: trimmed }]);
    setInput('');
    setIsProcessing(true);

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 400 + Math.random() * 400));

    const lowerCmd = trimmed.toLowerCase();
    if (RESPONSES[lowerCmd]) {
      setLines(prev => [...prev, { type: 'response', text: RESPONSES[lowerCmd] }]);
    } else {
      setLines(prev => [...prev, {
        type: 'response',
        text: `→ Message received: "${trimmed}". In production, this would be queued and delivered. Thank you for reaching out.`
      }]);
    }
    setIsProcessing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processCommand(input);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Top bar for standalone page */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-8">
        <Link to="/" className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Systems
        </Link>
      </div>

      <section id="terminal" className="py-12 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
              The Terminal — Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
          >
            INITIATE
            <br />
            <span className="text-muted-foreground">CONTACT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-muted-foreground max-w-xl mb-12"
          >
            Interface directly. Use commands or send a free-form message.
          </motion.p>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="border border-border/60 bg-card/50 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
               hailemichaelassefa5@gmail.com
                </span>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="p-4 h-72 overflow-y-auto space-y-2"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div key={i} className={`font-mono text-sm ${
                    line.type === 'system' ? 'text-muted-foreground' :
                    line.type === 'user' ? 'text-primary' :
                    'text-foreground/80'
                  }`}>
                    {line.type === 'user' && (
                      <span className="text-accent mr-2">❯</span>
                    )}
                    {line.text}
                  </div>
                ))}
                {isProcessing && (
                  <div className="font-mono text-sm text-primary animate-pulse">
                    <span className="text-accent mr-2">❯</span>
                    Processing...
                  </div>
                )}
              </div>

              {/* Input area */}
              <form onSubmit={handleSubmit} className="border-t border-border/40 p-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-accent">❯</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command or message..."
                    className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground/40"
                    disabled={isProcessing}
                  />
                </div>
              </form>
            </div>

            {/* Quick commands */}
            <div className="mt-6 flex flex-wrap gap-3">
              {QUICK_COMMANDS.map((q) => (
                <button
                  key={q.cmd}
                  onClick={() => processCommand(q.cmd)}
                  disabled={isProcessing}
                  className="px-3 py-1.5 border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <span className="font-mono text-xs text-primary mr-2">{q.cmd}</span>
                  <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">{q.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
