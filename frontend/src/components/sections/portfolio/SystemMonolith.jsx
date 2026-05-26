import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SystemMonolith() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSection, setCurrentSection] = useState('overview');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(Math.round((scrollTop / docHeight) * 100));

      // Determine current section
      const sections = ['hero', 'archive', 'terminal'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setCurrentSection(
            sections[i] === 'hero' ? 'overview' :
            sections[i] === 'archive' ? 'archive' :
            'terminal'
          );
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="fixed right-0 top-0 bottom-0 w-10 z-40 hidden xl:flex flex-col items-center justify-between py-20 border-l border-border/20 bg-background/30 backdrop-blur-sm"
    >
      {/* Scroll progress */}
      <div className="relative h-32 w-px bg-border/30">
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      {/* Section indicator */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[8px] text-muted-foreground tracking-widest uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {currentSection}
        </span>
      </div>

      {/* Scroll percent */}
      <div className="font-mono text-[9px] text-muted-foreground">
        {scrollPercent}%
      </div>
    </motion.div>
  );
}