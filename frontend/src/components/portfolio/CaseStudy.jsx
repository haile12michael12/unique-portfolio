import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function CaseStudy({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-background/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-5xl max-h-full overflow-auto bg-card border rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8 md:p-12">
          <div className="font-mono text-xs text-primary mb-4 tracking-widest uppercase">Case Study — {project.id}</div>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold mb-6">{project.title}</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-mono text-sm font-bold uppercase mb-4 tracking-widest">The Problem</h3>
              <p className="text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold uppercase mb-4 tracking-widest">The Solution</h3>
              <p className="text-muted-foreground">{project.solution}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
