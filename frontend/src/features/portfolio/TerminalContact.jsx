import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <section id="terminal" className="relative py-24 md:py-40">
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
                terminal@mercer.sys
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
                <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Processing
                  </motion.span>
                  <span className="inline-flex gap-0.5">
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
                  </span>
                </div>
              )}
            </div>

            {/* Input line */}
            <form onSubmit={handleSubmit} className="border-t border-border/40 flex items-center">
              <span className="pl-4 font-mono text-sm text-accent">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command or message..."
                className="flex-1 bg-transparent px-3 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                disabled={isProcessing}
              />
            </form>
          </div>

          {/* Quick commands */}
          <div className="flex flex-wrap gap-2 mt-4">
            {QUICK_COMMANDS.map(qc => (
              <button
                key={qc.cmd}
                onClick={() => processCommand(qc.cmd)}
                disabled={isProcessing}
                className="font-mono text-[11px] px-3 py-1.5 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors tracking-wider"
              >
                {qc.cmd} <span className="text-muted-foreground/50 ml-1">— {qc.desc}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}