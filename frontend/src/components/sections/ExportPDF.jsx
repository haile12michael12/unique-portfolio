import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileText, Loader2, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

const PROJECTS = [
  {
    title: 'Nexus Engine',
    description: 'Distributed real-time transaction processing platform handling 2M+ events/sec with sub-5ms latency guarantees.',
    stack: ['Go', 'Kafka', 'Redis', 'K8s', 'gRPC'],
    vitals: [{ label: 'Throughput', value: '2.1M/s' }, { label: 'Latency P99', value: '4.2ms' }, { label: 'User Scale', value: '18M' }],
    impact: 'Reduced latency by 94%, achieved 99.999% uptime, scaled to handle 40x original transaction volume.',
  },
  {
    title: 'Atlas Pipeline',
    description: 'ML-powered data pipeline orchestration framework processing 50TB+ daily across heterogeneous data sources.',
    stack: ['Python', 'Spark', 'Airflow', 'dbt', 'Snowflake'],
    vitals: [{ label: 'Daily Volume', value: '52TB' }, { label: 'Pipeline SLA', value: '99.97%' }, { label: 'Cost Reduction', value: '68%' }],
    impact: 'Freed 12 engineers from maintenance. Pipeline failures dropped 94%. Data freshness 6h → 15min.',
  },
  {
    title: 'Chronos Mesh',
    description: 'Real-time collaborative editing engine with CRDTs supporting 10K+ concurrent users.',
    stack: ['Rust', 'WebSocket', 'CRDT', 'WASM', 'React'],
    vitals: [{ label: 'Concurrency', value: '10K+' }, { label: 'Sync Latency', value: '12ms' }, { label: 'Repo Size', value: '142K LOC' }],
    impact: 'Zero data loss post-launch. Latency 200ms → 12ms. Support tickets dropped 82%.',
  },
  {
    title: 'Sentinel Shield',
    description: 'Zero-trust security infrastructure with runtime threat detection and compliance automation.',
    stack: ['Rust', 'eBPF', 'Terraform', 'OPA', 'SPIFFE'],
    vitals: [{ label: 'Threat Detection', value: '<50ms' }, { label: 'False Positives', value: '0.02%' }, { label: 'Compliance', value: 'SOC2/ISO' }],
    impact: 'Audit 6 weeks → 2 days. SOC2 Type II + ISO 27001. Zero breaches in 3 years.',
  },
];

const EXPERTISE = [
  { title: 'Distributed Systems', metric: '47 systems', detail: 'Consensus protocols, event sourcing, CQRS, fault-tolerant architectures.' },
  { title: 'Engineering Leadership', metric: '60+ engineers', detail: 'Led cross-functional teams of 8–25. Technical strategy, mentorship, culture.' },
  { title: 'Performance Engineering', metric: '94% avg latency reduction', detail: 'Systematic profiling, algorithmic optimization, infrastructure tuning.' },
  { title: 'Platform Architecture', metric: '3× delivery speed', detail: 'Internal dev platforms, CI/CD pipelines, infrastructure-as-code.' },
];

// ── Pure jsPDF renderer ─────────────────────────────────────────────────────
function buildPDF() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const MARGIN = 18;
  const COL = W - MARGIN * 2;
  let y = 0;

  // ── Helpers ──────────────────────────────────────────────────────────────
  const hex = (h) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return [r, g, b];
  };

  const setColor  = (h) => doc.setTextColor(...hex(h));
  const setFill   = (h) => doc.setFillColor(...hex(h));
  const setDraw   = (h) => doc.setDrawColor(...hex(h));

  const text = (str, x, size, color = '#E2E2E2', align = 'left', maxW) => {
    doc.setFontSize(size);
    setColor(color);
    if (maxW) {
      doc.text(str, x, y, { align, maxWidth: maxW });
    } else {
      doc.text(str, x, y, { align });
    }
  };

  const rule = (color = '#242424', h = 0.25) => {
    setDraw(color);
    doc.setLineWidth(h);
    doc.line(MARGIN, y, W - MARGIN, y);
  };

  const newPage = () => {
    doc.addPage();
    y = MARGIN + 6;
    // subtle top rule
    setDraw('#242424');
    doc.setLineWidth(0.2);
    doc.line(MARGIN, 10, W - MARGIN, 10);
    // page number
    doc.setFontSize(7);
    setColor('#505050');
    doc.setFont('helvetica', 'normal');
    doc.text(`${doc.getNumberOfPages()}`, W - MARGIN, 8, { align: 'right' });
  };

  const checkPage = (needed = 14) => {
    if (y + needed > 280) newPage();
  };

  // ── COVER BLOCK ──────────────────────────────────────────────────────────
  // Dark background strip
  setFill('#0A0A0B');
  doc.rect(0, 0, W, 68, 'F');

  // Accent line top-left
  setFill('#9D50FF');
  doc.rect(MARGIN, 10, 18, 0.6, 'F');

  y = 20;
  doc.setFont('helvetica', 'bold');
  text('SYS.ACTIVE — v2.4.1', MARGIN, 7, '#9D50FF');

  y = 32;
  doc.setFont('helvetica', 'bold');
  text('ENGINEERING', MARGIN, 26, '#E2E2E2');

  y = 46;
  doc.setFont('helvetica', 'normal');
  text('PORTFOLIO', MARGIN, 26, '#606060');

  // Right-side metadata
  doc.setFont('helvetica', 'normal');
  const META = ['Senior Software Engineer', 'Distributed Systems · Platform Architecture', 'Open Source · Ethiopian Tech Community'];
  META.forEach((m, i) => {
    doc.setFontSize(7.5);
    setColor(i === 0 ? '#00FFA3' : '#606060');
    doc.text(m, W - MARGIN, 26 + i * 10, { align: 'right' });
  });

  y = 74;

  // ── SECTION: CORE EXPERTISE ──────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  text('/ COMPETENCY MATRIX', MARGIN, 7.5, '#9D50FF');
  y += 5;
  rule('#242424');
  y += 4;

  doc.setFont('helvetica', 'bold');
  text('CORE EXPERTISE', MARGIN, 14, '#E2E2E2');
  y += 7;

  const halfW = (COL - 4) / 2;
  EXPERTISE.forEach((exp, i) => {
    const col = i % 2;
    const x = MARGIN + col * (halfW + 4);
    if (col === 0) checkPage(28);

    // Box
    setFill('#111111');
    setDraw('#242424');
    doc.setLineWidth(0.2);
    doc.rect(x, y, halfW, 24, 'FD');

    // Accent dot
    setFill('#9D50FF');
    doc.rect(x + 3, y + 3.5, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    setColor('#E2E2E2');
    doc.text(exp.title, x + 7, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    setColor('#606060');
    const lines = doc.splitTextToSize(exp.detail, halfW - 8);
    doc.text(lines, x + 3, y + 10);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    setColor('#00FFA3');
    doc.text(exp.metric, x + 3, y + 21);

    if (col === 1) y += 28;
  });
  y += 28; // last row

  // ── SECTION: PROJECTS ────────────────────────────────────────────────────
  checkPage(20);
  y += 2;
  doc.setFont('helvetica', 'bold');
  text('/ ENGINEERING ARCHIVE', MARGIN, 7.5, '#9D50FF');
  y += 5;
  rule('#242424');
  y += 4;

  doc.setFont('helvetica', 'bold');
  text('PROJECTS', MARGIN, 14, '#E2E2E2');
  y += 8;

  PROJECTS.forEach((proj, idx) => {
    checkPage(52);

    // Project number tag
    setFill('#1A0A2E');
    doc.rect(MARGIN, y, 8, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    setColor('#9D50FF');
    doc.text(`0${idx + 1}`, MARGIN + 1.5, y + 3.5);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    setColor('#E2E2E2');
    doc.text(proj.title, MARGIN + 11, y + 4);

    y += 8;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    setColor('#909090');
    const descLines = doc.splitTextToSize(proj.description, COL);
    doc.text(descLines, MARGIN, y);
    y += descLines.length * 4 + 2;

    // Stack tags
    let tagX = MARGIN;
    proj.stack.forEach(tech => {
      const tw = doc.getTextWidth(tech) + 4;
      setFill('#1A0A2E');
      setDraw('#9D50FF');
      doc.setLineWidth(0.15);
      doc.rect(tagX, y, tw, 4.5, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(5.5);
      setColor('#9D50FF');
      doc.text(tech, tagX + 2, y + 3.2);
      tagX += tw + 2;
    });
    y += 7;

    // Vitals row
    const vw = COL / proj.vitals.length;
    proj.vitals.forEach((v, vi) => {
      const vx = MARGIN + vi * vw;
      setFill('#0D0D0D');
      setDraw('#1E1E1E');
      doc.setLineWidth(0.15);
      doc.rect(vx, y, vw - 1, 10, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(5.5);
      setColor('#505050');
      doc.text(v.label.toUpperCase(), vx + 2.5, y + 3.8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      setColor('#00FFA3');
      doc.text(v.value, vx + 2.5, y + 8.5);
    });
    y += 13;

    // Impact
    setFill('#0A1A0F');
    setDraw('#1A3A1F');
    doc.setLineWidth(0.15);
    doc.rect(MARGIN, y, COL, 8, 'FD');

    setFill('#00FFA3');
    doc.rect(MARGIN, y, 1, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    setColor('#00FFA3');
    doc.text('IMPACT', MARGIN + 3, y + 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    setColor('#90C090');
    const impactLines = doc.splitTextToSize(proj.impact, COL - 22);
    doc.text(impactLines, MARGIN + 16, y + 3);

    y += 12;

    // Divider between projects
    if (idx < PROJECTS.length - 1) {
      setDraw('#1A1A1A');
      doc.setLineWidth(0.2);
      doc.line(MARGIN, y, W - MARGIN, y);
      y += 6;
    }
  });

  // ── FOOTER ───────────────────────────────────────────────────────────────
  checkPage(20);
  y += 8;
  rule('#242424');
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  setColor('#404040');
  doc.text('Generated from portfolio — All metrics reflect production deployments', MARGIN, y);
  doc.setFont('helvetica', 'bold');
  setColor('#9D50FF');
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), W - MARGIN, y, { align: 'right' });

  return doc;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ExportPDF() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | generating | done

  const handleExport = async () => {
    setStatus('generating');
    // Small delay so spinner renders
    await new Promise(r => setTimeout(r, 80));
    const doc = buildPDF();
    doc.save('portfolio-engineering.pdf');
    setStatus('done');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <>
      {/* Trigger button — placed in bottom-right area */}
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.04 }}
        className="fixed bottom-5 right-20 z-50 flex items-center gap-2 px-4 py-2.5 bg-background border border-border/50 hover:border-accent/50 text-muted-foreground hover:text-accent transition-colors duration-200 shadow-lg"
        title="Export portfolio as PDF"
      >
        <FileText className="w-4 h-4" />
        <span className="font-mono text-[10px] tracking-widest uppercase hidden sm:inline">Export PDF</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md border border-border/60 bg-background shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent" />
                  <span className="font-mono text-xs tracking-[0.15em] uppercase text-foreground font-bold">Export Portfolio</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-5">
                <p className="font-mono text-xs text-muted-foreground leading-[1.8]">
                  Generates a professionally formatted PDF containing your full engineering portfolio — projects, metrics, expertise, and tech stack — in the same minimalist aesthetic as this site.
                </p>

                {/* What's included */}
                <div className="border border-border/40 divide-y divide-border/30">
                  {[
                    'Cover with system identity',
                    'Core Expertise matrix (4 domains)',
                    'All 4 engineering projects',
                    'Performance vitals + impact per project',
                    'Full tech stack tags',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 px-4 py-2.5">
                      <div className="w-1 h-1 bg-primary flex-shrink-0" />
                      <span className="font-mono text-[11px] text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Export button */}
                <button
                  onClick={handleExport}
                  disabled={status === 'generating'}
                  className="w-full flex items-center justify-center gap-2.5 py-3 border border-accent/40 bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs tracking-widest uppercase transition-colors disabled:opacity-60"
                >
                  {status === 'generating' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {status === 'done' && <CheckCircle className="w-3.5 h-3.5" />}
                  {status === 'idle' && <Download className="w-3.5 h-3.5" />}
                  {status === 'generating' ? 'Generating...' : status === 'done' ? 'Downloaded!' : 'Download PDF'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}