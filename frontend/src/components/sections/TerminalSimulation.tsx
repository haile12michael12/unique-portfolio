import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface Line {
  type: "cmd" | "out" | "blank" | "success" | "error" | "warn" | "comment";
  text: string;
  delay?: number; // ms before this line appears
}

const SEQUENCE: Line[] = [
  { type: "comment", text: "# Deploying NexusDB v2.1.0 to production" },
  { type: "blank", text: "" },
  { type: "cmd", text: "git log --oneline -5" },
  { type: "out", text: "\u001b[33ma3f9c12\u001b[0m feat(raft): implement pre-vote optimization" },
  { type: "out", text: "\u001b[33mb8e2d71\u001b[0m fix: resolve backpressure at 50GB/day" },
  { type: "out", text: "\u001b[33mc1a4e98\u001b[0m perf: lock-free concurrent reads via MVCC" },
  { type: "out", text: "\u001b[33md5f3b22\u001b[0m test: chaos monkey simulates 200 node failures" },
  { type: "out", text: "\u001b[33me7c9a04\u001b[0m chore: bump version to v2.1.0" },
  { type: "blank", text: "" },
  { type: "cmd", text: "go test ./... -count=1 -race -coverprofile=coverage.out" },
  { type: "out", text: "ok    nexusdb/raft         0.412s  coverage: 94.3% of statements" },
  { type: "out", text: "ok    nexusdb/store        0.831s  coverage: 97.1% of statements" },
  { type: "out", text: "ok    nexusdb/cluster      1.203s  coverage: 91.8% of statements" },
  { type: "out", text: "ok    nexusdb/api          0.318s  coverage: 88.6% of statements" },
  { type: "success", text: "PASS  coverage: 93.2% total · 847 tests · 0 failures" },
  { type: "blank", text: "" },
  { type: "cmd", text: "go build -ldflags='-s -w' -o ./dist/nexusdb ./cmd/server" },
  { type: "out", text: "Binary size: 12.4 MB → 8.1 MB (stripped)" },
  { type: "blank", text: "" },
  { type: "cmd", text: "docker buildx build --platform linux/amd64,linux/arm64 -t nexusdb:v2.1.0 --push ." },
  { type: "out", text: "[1/3] FROM golang:1.23-alpine" },
  { type: "out", text: "[2/3] COPY . /build && RUN go build ..." },
  { type: "out", text: "[3/3] FROM gcr.io/distroless/static-debian12" },
  { type: "success", text: "✓  amd64 · pushed to registry.hailemichael.dev/nexusdb:v2.1.0" },
  { type: "success", text: "✓  arm64 · pushed to registry.hailemichael.dev/nexusdb:v2.1.0" },
  { type: "blank", text: "" },
  { type: "cmd", text: "kubectl set image deployment/nexusdb nexusdb=nexusdb:v2.1.0 --record" },
  { type: "out", text: 'deployment.apps/nexusdb image updated' },
  { type: "cmd", text: "kubectl rollout status deployment/nexusdb --timeout=120s" },
  { type: "out", text: "Waiting for deployment 'nexusdb' rollout to finish: 1 of 3 updated..." },
  { type: "out", text: "Waiting for deployment 'nexusdb' rollout to finish: 2 of 3 updated..." },
  { type: "success", text: "✓  deployment 'nexusdb' successfully rolled out" },
  { type: "blank", text: "" },
  { type: "cmd", text: "nexusdb-bench --ops 1000000 --clients 128 --duration 30s" },
  { type: "out", text: "Warming up cluster (3 nodes, Raft leader: node-1)..." },
  { type: "out", text: "GET   p50: 0.31ms  p99: 0.78ms  p999: 1.12ms" },
  { type: "out", text: "SET   p50: 0.44ms  p99: 0.89ms  p999: 1.34ms" },
  { type: "out", text: "DEL   p50: 0.28ms  p99: 0.71ms  p999: 1.05ms" },
  { type: "success", text: "✓  1,247,832 ops/sec · P99 < 1ms · 0 errors" },
  { type: "blank", text: "" },
  { type: "comment", text: "# NexusDB v2.1.0 is live in production 🚀" },
];

const COLORS: Record<Line["type"], string> = {
  cmd:     "text-foreground",
  out:     "text-muted-foreground/80",
  blank:   "",
  success: "text-emerald-400",
  error:   "text-red-400",
  warn:    "text-yellow-400",
  comment: "text-muted-foreground/50",
};

const PROMPT = (
  <span>
    <span className="text-emerald-400">hailemichael</span>
    <span className="text-muted-foreground/60">@</span>
    <span className="text-cyan-400">prod-cluster</span>
    <span className="text-muted-foreground/60"> ~ </span>
    <span className="text-foreground/60">$</span>
    {" "}
  </span>
);

// Typing speed per char (ms)
const TYPE_SPEED = 28;
// Pause after each command before output appears (ms)
const CMD_PAUSE = 320;
// Pause between output lines (ms)
const OUT_PAUSE = 60;

export function TerminalSimulation() {
  const [visibleLines, setVisibleLines] = useState<{ line: Line; typed: string; done: boolean }[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "output" | "done">("typing");
  const [running, setRunning] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const restart = () => {
    clear();
    setVisibleLines([]);
    setCurrentLineIdx(0);
    setTypedChars(0);
    setPhase("typing");
    setRunning(true);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLines, typedChars]);

  useEffect(() => {
    if (!running || currentLineIdx >= SEQUENCE.length) {
      setRunning(false);
      return;
    }

    const line = SEQUENCE[currentLineIdx];

    if (line.type === "blank") {
      timerRef.current = setTimeout(() => {
        setVisibleLines(prev => [...prev, { line, typed: "", done: true }]);
        setCurrentLineIdx(i => i + 1);
        setTypedChars(0);
        setPhase("typing");
      }, 80);
      return;
    }

    if (line.type === "comment" || line.type !== "cmd") {
      // Output lines appear all at once after a small delay
      timerRef.current = setTimeout(() => {
        setVisibleLines(prev => [...prev, { line, typed: line.text, done: true }]);
        setCurrentLineIdx(i => i + 1);
        setTypedChars(0);
      }, line.type === "out" ? OUT_PAUSE : 120);
      return;
    }

    // CMD lines: type character by character
    if (phase === "typing") {
      if (typedChars < line.text.length) {
        // Vary speed slightly for realism
        const jitter = Math.random() * 20 - 5;
        timerRef.current = setTimeout(() => {
          setTypedChars(n => n + 1);
          setVisibleLines(prev => {
            const last = prev[prev.length - 1];
            if (last && !last.done && last.line === line) {
              return [...prev.slice(0, -1), { line, typed: line.text.slice(0, typedChars + 1), done: false }];
            }
            return [...prev, { line, typed: line.text.slice(0, 1), done: false }];
          });
        }, TYPE_SPEED + jitter);
      } else {
        // Done typing, pause then move on
        timerRef.current = setTimeout(() => {
          setVisibleLines(prev => {
            const last = prev[prev.length - 1];
            if (last && last.line === line) {
              return [...prev.slice(0, -1), { ...last, done: true }];
            }
            return prev;
          });
          setCurrentLineIdx(i => i + 1);
          setTypedChars(0);
          setPhase("typing");
        }, CMD_PAUSE);
      }
    }
    return clear;
  }, [running, currentLineIdx, typedChars, phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border/50 overflow-hidden shadow-2xl shadow-black/50 bg-[#0d0d14]/95 backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/20 border-b border-border/40">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs font-mono text-muted-foreground/60">
          ssh hailemichael@prod-cluster · nexusdb deployment
        </span>
        <button
          onClick={restart}
          title="Restart simulation"
          className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          data-testid="button-restart-terminal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal body */}
      <div className="h-80 overflow-y-auto p-4 font-mono text-xs leading-5">
        <AnimatePresence initial={false}>
          {visibleLines.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className={entry.line.type === "blank" ? "h-3" : ""}
            >
              {entry.line.type === "cmd" && (
                <span>
                  {PROMPT}
                  <span className="text-foreground">{entry.typed}</span>
                  {!entry.done && (
                    <span className="inline-block w-1.5 h-3.5 bg-primary ml-px align-middle animate-pulse" />
                  )}
                </span>
              )}
              {entry.line.type !== "cmd" && entry.line.type !== "blank" && (
                <span className={COLORS[entry.line.type]}>
                  {entry.line.type === "success" && (
                    <span className="text-emerald-400 mr-1"></span>
                  )}
                  {entry.typed}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blinking cursor at end when done */}
        {!running && currentLineIdx >= SEQUENCE.length && (
          <div className="mt-1">
            {PROMPT}
            <span className="inline-block w-1.5 h-3.5 bg-primary align-middle animate-pulse" />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
