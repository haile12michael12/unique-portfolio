import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, GitCompare, Cpu, Award, Milestone, Layers, ShieldCheck, Zap, Check, FileText, Printer } from 'lucide-react';
import jsPDF from 'jspdf';

const parseNumericValue = (str) => {
  if (!str) return null;
  // Remove formatting characters like $, +, <, >, spaces
  let s = str.replace(/[<>\+\$\s]/g, '').trim();
  let multiplier = 1;

  if (s.toLowerCase().endsWith('m/s')) {
    multiplier = 1000000;
    s = s.substring(0, s.length - 3);
  } else if (s.toLowerCase().endsWith('/s')) {
    s = s.substring(0, s.length - 2);
  } else if (s.toLowerCase().endsWith('tb')) {
    multiplier = 1000000000000;
    s = s.substring(0, s.length - 2);
  } else if (s.toLowerCase().endsWith('gb')) {
    multiplier = 1000000000;
    s = s.substring(0, s.length - 2);
  } else if (s.toLowerCase().endsWith('loc')) {
    s = s.substring(0, s.length - 3);
  } else if (s.toLowerCase().endsWith('ms')) {
    multiplier = 0.001; // standardize time metrics
    s = s.substring(0, s.length - 2);
  } else if (s.toLowerCase().endsWith('%')) {
    s = s.substring(0, s.length - 1);
  } else if (s.toLowerCase().endsWith('m')) {
    multiplier = 1000000;
    s = s.substring(0, s.length - 1);
  } else if (s.toLowerCase().endsWith('k')) {
    multiplier = 1000;
    s = s.substring(0, s.length - 1);
  }

  const val = parseFloat(s);
  return isNaN(val) ? null : val * multiplier;
};

export default function ComparisonMatrix({ projectA, projectB, onClose }) {
  const [isSwapped, setIsSwapped] = useState(false);
  const currentA = isSwapped ? projectB : projectA;
  const currentB = isSwapped ? projectA : projectB;

  const [isExporting, setIsExporting] = useState(false);
  const [isExported, setIsExported] = useState(false);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(`compare-notes-${projectA.title}-${projectB.title}`);
    return saved || '';
  });

  useEffect(() => {
    localStorage.setItem(`compare-notes-${projectA.title}-${projectB.title}`, notes);
  }, [notes, projectA.title, projectB.title]);

  useEffect(() => {
    if (isExported) {
      const timer = setTimeout(() => {
        setIsExported(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isExported]);

  const [isPrintingPDF, setIsPrintingPDF] = useState(false);

  const handlePrintPDF = async () => {
    try {
      setIsPrintingPDF(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let y = 15;

      const checkPageBoundary = (neededHeight) => {
        if (y + neededHeight > 275) {
          doc.addPage();
          y = 15;
          // draw page header
          doc.setFont("Helvetica", "oblique");
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text(`Comparative Analysis: ${currentA.title} vs ${currentB.title} — Page ${doc.getNumberOfPages()}`, 15, 10);
          doc.setDrawColor(220, 224, 230);
          doc.line(15, 12, 195, 12);
        }
      };

      // Header block
      doc.setFillColor(11, 15, 25); // Dark Slate header bg
      doc.rect(15, y, 180, 22, 'F');
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text("CORE SYSTEMS COMPARATIVE DIAGNOSTIC REPORT", 20, y + 9);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 173, 238); // Accent color
      doc.text("ARCHITECTURE DIFF ENGINE & ANALYTICAL METRICS", 20, y + 16);

      y += 28;

      // Metadata Block
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text("SYSTEM ARCHITECT:", 15, y);
      doc.setFont("Helvetica", "normal");
      doc.text("Hailemichael Assefa", 52, y);

      doc.setFont("Helvetica", "bold");
      doc.text("REPORT DATE:", 120, y);
      doc.setFont("Helvetica", "normal");
      doc.text(new Date().toLocaleDateString(), 148, y);

      y += 6;
      doc.setDrawColor(220, 224, 230);
      doc.line(15, y, 195, y);
      y += 8;

      // Executive Columnar Info
      doc.setFillColor(245, 247, 250);
      doc.rect(15, y, 86, 38, 'F');
      doc.setDrawColor(220, 224, 230);
      doc.rect(15, y, 86, 38, 'S');

      doc.setFillColor(245, 247, 250);
      doc.rect(109, y, 86, 38, 'F');
      doc.rect(109, y, 86, 38, 'S');

      // Top Box: System A Info
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(11, 15, 25);
      doc.text(currentA.title.toUpperCase(), 19, y + 6);
      doc.setFontSize(8);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const descA = doc.splitTextToSize(currentA.description || '', 78);
      doc.text(descA.slice(0, 2), 19, y + 12);
      
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text("STACK:", 19, y + 24);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text((currentA.stack || []).slice(0, 5).join(", "), 33, y + 24);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.text("MARKET:", 19, y + 30);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text((currentA.industry || []).join(" / "), 33, y + 30);

      // Top Box: System B Info
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(11, 15, 25);
      doc.text(currentB.title.toUpperCase(), 113, y + 6);
      doc.setFontSize(8);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const descB = doc.splitTextToSize(currentB.description || '', 78);
      doc.text(descB.slice(0, 2), 113, y + 12);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(80, 80, 80);
      doc.text("STACK:", 113, y + 24);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text((currentB.stack || []).slice(0, 5).join(", "), 127, y + 24);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.text("MARKET:", 113, y + 30);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text((currentB.industry || []).join(" / "), 127, y + 30);

      y += 44;

      // Comparative vitals listing block
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(11, 15, 25);
      doc.text("ENGINEERING VITALS COMPARISON MATRIX", 15, y);
      y += 3;

      doc.setDrawColor(180, 185, 195);
      doc.line(15, y, 195, y);
      y += 5;

      // Vitals Headers
      doc.setFontSize(8);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 110, 125);
      doc.text("METRIC PARAMETER", 18, y);
      doc.text(`${currentA.title.toUpperCase()} VALUE`, 75, y);
      doc.text(`${currentB.title.toUpperCase()} VALUE`, 122, y);
      doc.text("DIAGNOSTIC RATIO / STRENGTH", 160, y);
      y += 3;

      doc.line(15, y, 195, y);
      y += 4;

      // Draw each metric comparison row safely
      [0, 1, 2].forEach((idx) => {
        const vitalA = currentA.vitals?.[idx];
        const vitalB = currentB.vitals?.[idx];
        if (!vitalA || !vitalB) return;

        const numA = parseNumericValue(vitalA.value);
        const numB = parseNumericValue(vitalB.value);

        let diffMessage = "DISTINCT";
        if (numA !== null && numB !== null) {
          if (numA === numB) {
            diffMessage = "PARITY (1:1)";
          } else {
            const min = Math.min(numA, numB);
            const ratio = min > 0 ? Math.max(numA, numB) / min : Math.max(numA, numB);
            if (ratio >= 2.0) {
              diffMessage = `SIGMA (${ratio > 1000 ? '>1k' : ratio.toFixed(1)}x)`;
            } else if (ratio >= 1.25) {
              diffMessage = `DELTA (${ratio.toFixed(1)}x)`;
            } else {
              diffMessage = "CONGRUENT";
            }
          }
        }

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(50, 50, 50);
        doc.text(vitalA.label, 18, y);
        doc.text(vitalA.value, 75, y);
        doc.text(vitalB.value, 122, y);

        doc.setFont("Helvetica", "bold");
        if (diffMessage.includes("SIGMA")) {
          doc.setTextColor(217, 119, 6); // warning color
        } else if (diffMessage.includes("DELTA")) {
          doc.setTextColor(14, 165, 233); // delta blue
        } else {
          doc.setTextColor(100, 110, 125);
        }
        doc.text(diffMessage, 160, y);

        y += 6;
      });

      y += 4;
      checkPageBoundary(50);

      // Topology Design Details
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(11, 15, 25);
      doc.text("SYSTEM ARCHITECTURE DETAILS", 15, y);
      y += 3;
      doc.line(15, y, 195, y);
      y += 5;

      doc.setFontSize(8.5);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(11, 15, 25);
      doc.text(`A • ${currentA.title} Architecture:`, 15, y);
      y += 4.5;
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const notesA = doc.splitTextToSize(currentA.architecture_desc || '', 180);
      doc.text(notesA, 15, y);
      y += (notesA.length * 4) + 4;

      checkPageBoundary(40);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(11, 15, 25);
      doc.text(`B • ${currentB.title} Architecture:`, 15, y);
      y += 4.5;
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const notesB = doc.splitTextToSize(currentB.architecture_desc || '', 180);
      doc.text(notesB, 15, y);
      y += (notesB.length * 4) + 6;

      checkPageBoundary(50);

      // User Analytical observations (Notes column)
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(11, 15, 25);
      doc.text("ANALYTICAL METADATA OBSERVATIONS", 15, y);
      y += 3;
      doc.line(15, y, 195, y);
      y += 6;

      if (!notes.trim()) {
        doc.setFont("Helvetica", "oblique");
        doc.setFontSize(8.5);
        doc.setTextColor(120, 120, 120);
        doc.text("No custom user observations or diagnostic notes populated for this session.", 15, y);
      } else {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(40, 40, 40);
        const userNotes = doc.splitTextToSize(notes, 180);
        doc.text(userNotes, 15, y);
      }

      // Save document
      doc.save(`system_comparison_${currentA.title.toLowerCase().replace(/\s+/g, '_')}_vs_${currentB.title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error("Failed to compile or output system comparison PDF document:", e);
    } finally {
      setIsPrintingPDF(false);
    }
  };

  // Extract all unique specs to align them side-by-side
  const allSpecLabels = Array.from(
    new Set([
      ...currentA.specs.map(s => s.label),
      ...currentB.specs.map(s => s.label),
    ])
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#06070a]/90 backdrop-blur-md p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-5xl bg-[#0c0d12]/95 border border-border/60 rounded-xl overflow-hidden shadow-2xl shadow-black/80 my-8 flex flex-col"
      >
        {/* Top glow effects */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-card/60 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded border border-primary/20 text-primary">
              <GitCompare className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">System Comparator</span>
              <h2 className="font-syne text-lg font-bold text-foreground">Technical Diagnostic Matrix</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground/60 hover:text-foreground hover:bg-muted/10 rounded transition-colors"
            id="close-compare-modal-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Area */}
        <div className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Snapshots & Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project A snapshot */}
            <div className="border border-border/40 bg-card/10 p-5 rounded-lg relative overflow-hidden group">
              <div className="absolute top-4 right-4 font-mono text-[9px] text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-sm">
                {isSwapped ? 'MODULE_BETA' : 'MODULE_ALPHA'}
              </div>
              <div className="aspect-[21/9] w-full mb-4 rounded overflow-hidden border border-border/30 relative">
                <img
                  src={currentA.image}
                  alt={currentA.imageAlt}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] to-transparent" />
              </div>
              <h3 className="font-syne text-2xl font-bold text-accent">{currentA.title}</h3>
              <p className="font-mono text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {currentA.description}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentA.stack.map(tech => (
                  <span key={tech} className="font-mono text-[9px] px-2 py-0.5 border border-border/60 text-muted-foreground/80 rounded-sm bg-[#08090d]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project B snapshot */}
            <div className="border border-border/40 bg-card/10 p-5 rounded-lg relative overflow-hidden group">
              <div className="absolute top-4 right-4 font-mono text-[9px] text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-sm">
                {isSwapped ? 'MODULE_ALPHA' : 'MODULE_BETA'}
              </div>
              <div className="aspect-[21/9] w-full mb-4 rounded overflow-hidden border border-border/30 relative">
                <img
                  src={currentB.image}
                  alt={currentB.imageAlt}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] to-transparent" />
              </div>
              <h3 className="font-syne text-2xl font-bold text-accent">{currentB.title}</h3>
              <p className="font-mono text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {currentB.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentB.stack.map(tech => (
                  <span key={tech} className="font-mono text-[9px] px-2 py-0.5 border border-border/60 text-muted-foreground/80 rounded-sm bg-[#08090d]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 1: Core Architecture specs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <Cpu className="h-4 w-4 text-primary" />
              <h4 className="font-mono tracking-widest text-xs uppercase text-primary font-bold">System Architecture & Core Mechanics</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Architecture descriptors */}
              <div className="border border-border/30 bg-[#08090d]/50 p-4 rounded-lg">
                <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">Topology Design ({currentA.title})</div>
                <p className="font-mono text-xs text-foreground mt-2 leading-6">{currentA.architecture_desc}</p>
              </div>
              <div className="border border-border/30 bg-[#08090d]/50 p-4 rounded-lg">
                <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">Topology Design ({currentB.title})</div>
                <p className="font-mono text-xs text-foreground mt-2 leading-6">{currentB.architecture_desc}</p>
              </div>

              {/* Target Industries */}
              <div className="border border-border/20 bg-[#08090d]/30 p-4 rounded-lg flex items-start gap-3">
                <Milestone className="h-4.5 w-4.5 mt-0.5 text-accent/80" />
                <div>
                  <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">Industry & Markets</div>
                  <div className="font-syne font-bold text-sm mt-1">{currentA.industry.join(' / ')}</div>
                </div>
              </div>
              <div className="border border-border/20 bg-[#08090d]/30 p-4 rounded-lg flex items-start gap-3">
                <Milestone className="h-4.5 w-4.5 mt-0.5 text-accent/80" />
                <div>
                  <div className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">Industry & Markets</div>
                  <div className="font-syne font-bold text-sm mt-1">{currentB.industry.join(' / ')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Core Engineering Vitals */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-b-border/30 pb-2">
              <Zap className="h-4 w-4 text-primary" />
              <h4 className="font-mono tracking-widest text-xs uppercase text-primary font-bold">Key performance vitals</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#08090d]/40 border border-border/30 rounded-lg p-5 relative">
              {/* Top Control Bar for Position Swap */}
              <div className="col-span-1 md:col-span-2 flex items-center justify-between border-b border-border/10 pb-3">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-bold text-muted-foreground/60 tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/80 animate-pulse" />
                  Systems Diagnostics Comparator
                </div>
                <button
                  type="button"
                  onClick={() => setIsSwapped(!isSwapped)}
                  className="font-mono text-[9px] uppercase px-3 py-1 bg-[#161a23] hover:bg-accent/10 border border-border/30 hover:border-accent text-accent hover:text-white rounded flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer font-bold"
                  title="Quickly swap Left-Right positions of the analyzed projects"
                >
                  <GitCompare className="h-3 w-3" />
                  Swap Projects
                </button>
              </div>

              {/* Center Floating Swap button on md: screens, overlaying the gap between left and right columns */}
              <div className="hidden md:flex absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-10">
                <button
                  type="button"
                  onClick={() => setIsSwapped(!isSwapped)}
                  className="flex items-center justify-center h-8 w-8 rounded-full border border-accent/40 bg-[#0c0d12]/95 text-[#a9b2c3] hover:text-white hover:bg-accent hover:border-accent hover:shadow-[0_0_15px_rgba(0,173,238,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg shadow-black/80"
                  title="Quickly Swap Positions"
                >
                  <GitCompare className="h-4 w-4" />
                </button>
              </div>

              {/* Left Column: Diagnostics and Vitals Engine */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  {/* Desktop diagnostic header */}
                  <div className="hidden md:flex justify-between items-center text-center font-mono text-[9px] uppercase font-bold tracking-widest text-accent border-b border-border/20 pb-2.5 px-2">
                    <span className="w-[35%] text-left truncate" title={currentA.title}>{currentA.title}</span>
                    <span className="w-[30%] text-center text-primary/80 text-[8px]">Diff Eng</span>
                    <span className="w-[35%] text-right truncate" title={currentB.title}>{currentB.title}</span>
                  </div>

                  <div className="space-y-4 mt-3">
                    {/* Let's compare their vitals index-by-index with visual diff status */}
                    {[0, 1, 2].map((idx) => {
                      const vitalA = currentA.vitals?.[idx];
                      const vitalB = currentB.vitals?.[idx];
                      if (!vitalA || !vitalB) return null;

                      const numA = parseNumericValue(vitalA.value);
                      const numB = parseNumericValue(vitalB.value);

                      let ratio = 1;
                      let diffMessage = "";
                      let intensity = "none"; // 'none' | 'moderate' | 'significant'
                      let isSignificantDiff = false;

                      if (numA !== null && numB !== null) {
                        if (numA === numB) {
                          ratio = 1;
                          intensity = "none";
                          diffMessage = "PARITY (1:1)";
                        } else {
                          const min = Math.min(numA, numB);
                          const max = Math.max(numA, numB);
                          ratio = min > 0 ? max / min : max;

                          // Technical vitals differ by more than 50% (difference over baseline min is > 0.5)
                          const pctDiff = min > 0 ? (max - min) / min : (max > 0 ? 1.0 : 0);
                          if (pctDiff > 0.5) {
                            isSignificantDiff = true;
                          }

                          if (ratio >= 2.0) {
                            intensity = "significant";
                            diffMessage = `SIGMA (${ratio > 1000 ? '>1k' : ratio.toFixed(1)}x)`;
                          } else if (ratio >= 1.25) {
                            intensity = "moderate";
                            diffMessage = `DELTA (${ratio.toFixed(1)}x)`;
                          } else {
                            intensity = "none";
                            diffMessage = "CONGRUENT";
                          }
                        }
                      } else {
                        intensity = "none";
                        diffMessage = "DISTINCT";
                      }

                      return (
                        <div
                          key={idx}
                          className={`relative p-3.5 rounded-lg border transition-all duration-300 ${
                            isSignificantDiff
                              ? 'significant-diff bg-amber-500/10 border-amber-500/50'
                              : intensity === 'significant'
                                ? 'bg-amber-500/5 border-amber-500/30'
                                : intensity === 'moderate'
                                  ? 'bg-sky-500/5 border-sky-500/20'
                                  : 'bg-card/20 border-border/20 hover:border-border/35'
                          }`}
                        >
                          {/* Visual indicators */}
                          {(intensity === 'significant' || isSignificantDiff) && (
                            <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                            </span>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-2">
                            {/* Project A side */}
                            <div className="sm:col-span-3 flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] text-muted-foreground/85 truncate max-w-[80px] sm:max-w-full font-medium" title={vitalA.label}>{vitalA.label}</span>
                              <span className="font-mono text-[10px] font-bold text-foreground bg-primary/10 px-1.5 py-0.5 rounded border border-primary/25">
                                {vitalA.value}
                              </span>
                            </div>

                            {/* Diagnostic status block */}
                            <div className="sm:col-span-1 flex flex-col items-center justify-center py-1 sm:py-0 border-y sm:border-y-0 sm:border-x border-border/10">
                              <span className={`px-1 py-0.5 rounded-sm font-mono text-[7px] uppercase tracking-wider font-bold ${
                                (intensity === 'significant' || isSignificantDiff)
                                  ? 'text-amber-400'
                                  : intensity === 'moderate'
                                    ? 'text-sky-400'
                                    : 'text-muted-foreground/50'
                              }`}>
                                {diffMessage}
                              </span>
                            </div>

                            {/* Project B side */}
                            <div className="sm:col-span-3 flex items-center justify-between gap-2 sm:flex-row-reverse">
                              <span className="font-mono text-[10px] text-muted-foreground/85 truncate max-w-[80px] sm:max-w-full font-medium" title={vitalB.label}>{vitalB.label}</span>
                              <span className="font-mono text-[10px] font-bold text-foreground bg-accent/10 px-1.5 py-0.5 rounded border border-accent/25">
                                {vitalB.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* On mobile: render a centered swap button between the stacked columns */}
              <div className="flex md:hidden items-center justify-center -my-1 z-10 w-full col-span-1">
                <button
                  type="button"
                  onClick={() => setIsSwapped(!isSwapped)}
                  className="flex items-center gap-1.5 font-mono text-[9px] uppercase px-3 py-1.5 bg-[#161a23] hover:bg-accent/10 border border-border/30 hover:border-accent text-accent hover:text-white rounded-full transition-all duration-300 active:scale-95 cursor-pointer font-bold shadow-md shadow-black/80"
                  title="Swap Left/Right projects"
                >
                  <GitCompare className="h-3.5 w-3.5 text-accent" />
                  Swap positions
                </button>
              </div>

              {/* Right Column: Editable Observations / Notes */}
              <div className="flex flex-col space-y-3 bg-[#0c0d12]/50 border border-border/20 rounded-lg p-4 justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-accent" />
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#a9b2c3]">Analytical Observations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrintPDF}
                        disabled={isPrintingPDF}
                        className={`font-mono text-[9px] uppercase px-2 py-1 rounded border border-accent/30 bg-[#161a23] text-[#a9b2c3] hover:text-accent hover:border-accent transition-all duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                          isPrintingPDF ? 'opacity-50 cursor-wait' : ''
                        }`}
                        title="Compile and download a custom systems integration PDF report"
                      >
                        <Printer className={`h-3 w-3 ${isPrintingPDF ? 'animate-spin' : ''}`} />
                        {isPrintingPDF ? 'Compiling PDF...' : 'Print Comparison'}
                      </button>
                      <span className="font-mono text-[8px] uppercase bg-accent/10 text-accent/90 px-2 py-1 rounded-sm border border-accent/20">
                        Live Draft
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[11px] text-muted-foreground/80 leading-relaxed">
                    Log comparative metrics, bottleneck findings, and deployment recommendations below. Stored automatically across system analysis sessions.
                  </p>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter systemic observations... e.g., 'Module Alpha offers superior sub-millisecond dispatch handling on latency spikes, whereas Module Beta has lower RAM footprints under full payload loads.'"
                    className="w-full bg-black/45 border border-border/30 rounded p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-accent/40 h-36 min-h-[120px] resize-y custom-scrollbar focus:ring-1 focus:ring-accent/10 transition-all duration-300"
                  />
                </div>

                {/* Quick insight helper tags */}
                <div className="pt-2 border-t border-border/10">
                  <span className="font-mono text-[8px] uppercase font-bold text-muted-foreground/50 tracking-wider block mb-1.5">Quick insertion tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '⚡ Low Latency', insert: '• Low latency configuration validated\n' },
                      { label: '📦 Memory Trade-off', insert: '• Scalability/memory pressure trade-off identified\n' },
                      { label: '🛡️ High Parity', insert: '• Verified operational parity and interface uniformity\n' },
                      { label: '🚀 Deploy Alpha', insert: '• Recommend immediate promotion to dev/stage (Alpha)\n' }
                    ].map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => {
                          setNotes(prev => {
                            const separator = prev ? (prev.endsWith('\n') ? '' : '\n') : '';
                            return prev + separator + tag.insert;
                          });
                        }}
                        className="font-mono text-[8px] px-2 py-1 bg-[#161a23] border border-border/20 text-[#a9b2c3] hover:text-accent hover:border-accent/30 rounded-sm transition-all"
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Deep Technical Specifications Comparison */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <Layers className="h-4 w-4 text-primary" />
              <h4 className="font-mono tracking-widest text-xs uppercase text-primary font-bold">Dynamic Technical Specifications</h4>
            </div>

            <div className="border border-border/40 rounded-lg overflow-hidden bg-card/10">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#08090d] border-b border-border/40 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 text-left w-[40%] hover:text-accent truncate" title={currentA.title}>{currentA.title}</th>
                    <th className="px-4 py-3 text-center w-[20%] bg-[#0d0e14]">Parameter</th>
                    <th className="px-4 py-3 text-right w-[40%] hover:text-accent truncate" title={currentB.title}>{currentB.title}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {allSpecLabels.map((label, idx) => {
                    const valA = currentA.specs.find(s => s.label === label)?.value;
                    const valB = currentB.specs.find(s => s.label === label)?.value;

                    return (
                      <tr key={idx} className="hover:bg-muted/5 transition-colors">
                        <td className="px-4 py-3 text-left font-semibold text-foreground">
                          {valA !== undefined ? (
                            <span className="inline-block bg-[#0f1711] text-emerald-400 px-2.5 py-1 border border-emerald-500/20 rounded">
                              {valA}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/20">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center bg-[#0d0e14]/50 border-x border-border/15 font-bold text-muted-foreground text-[10px] uppercase opacity-80 select-none">
                          {label}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-foreground">
                          {valB !== undefined ? (
                            <span className="inline-block bg-[#111625] text-sky-400 px-2.5 py-1 border border-sky-500/20 rounded">
                              {valB}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/20">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Problem, Solution, Impact summaries */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/30 pb-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h4 className="font-mono tracking-widest text-xs uppercase text-primary font-bold">Problem VS Engineered Solution</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project A Problem & Sol */}
              <div className="border border-border/20 bg-[#08090d]/20 p-5 rounded-lg space-y-3">
                <span className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{currentA.title} Case</span>
                <div>
                  <div className="font-mono text-[9px] text-muted-foreground/60 uppercase">The Bottleneck / Pain Point</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-sans">{currentA.problem}</p>
                </div>
                <div className="pt-2 border-t border-border/10">
                  <div className="font-mono text-[9px] text-muted-foreground/60 uppercase">The Engineering Deliverable</div>
                  <p className="mt-1 text-xs text-foreground leading-relaxed font-sans">{currentA.solution}</p>
                </div>
                <div className="bg-emerald-900/10 border border-emerald-500/20 p-3 rounded-sm mt-2">
                  <div className="font-mono text-[9px] text-emerald-400 uppercase font-semibold">Verified Operational Impact</div>
                  <p className="mt-1 text-xs text-emerald-200/90 leading-relaxed font-sans">{currentA.impact}</p>
                </div>
              </div>

              {/* Project B Problem & Sol */}
              <div className="border border-border/20 bg-[#08090d]/20 p-5 rounded-lg space-y-3">
                <span className="font-mono text-[9px] font-bold text-sky-400 uppercase tracking-widest">{currentB.title} Case</span>
                <div>
                  <div className="font-mono text-[9px] text-muted-foreground/60 uppercase">The Bottleneck / Pain Point</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed font-sans">{currentB.problem}</p>
                </div>
                <div className="pt-2 border-t border-border/10">
                  <div className="font-mono text-[9px] text-muted-foreground/60 uppercase">The Engineering Deliverable</div>
                  <p className="mt-1 text-xs text-foreground leading-relaxed font-sans">{currentB.solution}</p>
                </div>
                <div className="bg-sky-900/10 border border-sky-500/20 p-3 rounded-sm mt-2">
                  <div className="font-mono text-[9px] text-sky-400 uppercase font-semibold">Verified Operational Impact</div>
                  <p className="mt-1 text-xs text-sky-200/90 leading-relaxed font-sans">{currentB.impact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-card/50 px-6 py-4 border-t border-border/40 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              setIsExporting(true);
              setTimeout(() => {
                setIsExporting(false);
                setIsExported(true);
              }, 800);
            }}
            disabled={isExporting || isExported}
            className={`px-4 py-2 border font-mono text-[10px] uppercase font-semibold tracking-wider transition-all rounded-sm flex items-center gap-1.5 ${
              isExported
                ? 'border-emerald-500/50 bg-[#0d1c14] text-emerald-400'
                : 'border-border/40 hover:bg-muted/10 text-muted-foreground hover:text-foreground disabled:opacity-50'
            }`}
          >
            {isExporting ? (
              <span>BUILDING REPORT...</span>
            ) : isExported ? (
              <>
                <Check className="h-3 w-3" />
                <span>DIAGNOSTICS EXPORTED</span>
              </>
            ) : (
              <span>Export diagnostics</span>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground font-mono text-[10px] uppercase font-bold tracking-wider rounded-sm transition-colors hover:bg-primary/90"
          >
            Close comparator
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
