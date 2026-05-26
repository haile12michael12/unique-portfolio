import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SupportButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground bg-card border border-border/60 px-3 py-1.5 whitespace-nowrap"
          >
            Support my work
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <Link to="/support">
        <motion.button
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              '0 0 0px 0px hsl(268 100% 65% / 0)',
              '0 0 16px 4px hsl(268 100% 65% / 0.35)',
              '0 0 0px 0px hsl(268 100% 65% / 0)',
            ],
          }}
          transition={{
            boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-mono text-sm font-semibold tracking-wider uppercase border border-primary hover:bg-primary/90 transition-colors duration-200"
        >
          <span>☕</span>
          <span>Support Me</span>
        </motion.button>
      </Link>
    </div>
  );
}