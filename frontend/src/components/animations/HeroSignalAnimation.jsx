import { motion } from 'framer-motion';

const nodes = [
  { top: '18%', left: '18%', delay: 0 },
  { top: '32%', left: '68%', delay: 0.35 },
  { top: '58%', left: '24%', delay: 0.7 },
  { top: '72%', left: '78%', delay: 1.05 },
];

const streams = [
  { top: '24%', width: '38%', delay: 0.2 },
  { top: '48%', width: '52%', delay: 0.65 },
  { top: '68%', width: '32%', delay: 1.1 },
];

export default function HeroSignalAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
        className="absolute right-[-12%] top-1/2 hidden h-[680px] w-[680px] -translate-y-1/2 lg:block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-14 rounded-full border border-primary/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-28 rounded-full border border-accent/15"
        />
        <div className="absolute inset-40 rounded-full border border-border/50 bg-background/20 backdrop-blur-[2px]" />

        {nodes.map((node) => (
          <motion.span
            key={`${node.top}-${node.left}`}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.85, 1.2, 0.85],
            }}
            transition={{
              duration: 2.8,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_24px_hsl(var(--accent))]"
            style={{ top: node.top, left: node.left }}
          />
        ))}

        {streams.map((stream) => (
          <motion.span
            key={stream.top}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: [0, 0.8, 0], x: 320 }}
            transition={{
              duration: 3.6,
              delay: stream.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute left-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: stream.top, width: stream.width }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.18, 0.36, 0.18] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />

      <motion.div
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: '120%', opacity: [0, 0.18, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-primary/20 to-transparent"
      />
    </div>
  );
}
