import { motion } from 'framer-motion';

export default function ProjectCard({ project, index, onSelect, dimmed, highlighted, activeFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      animate={{
        opacity: dimmed ? 0.28 : 1,
        scale: highlighted ? 1.01 : dimmed ? 0.99 : 1,
      }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer"
    >
      <div className={`relative overflow-hidden border transition-all duration-500 ${
        highlighted
          ? 'border-primary/70 shadow-[0_0_24px_-4px_hsl(var(--primary)/0.25)]'
          : 'border-border/50 hover:border-primary/40'
      }`}>
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Module index */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-primary tracking-[0.2em] uppercase">
            MODULE_{String(index + 1).padStart(2, '0')}
          </div>

          {/* Highlight badge */}
          {highlighted && activeFilter && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 font-mono text-[9px] px-2 py-1 bg-primary/20 border border-primary/50 text-primary tracking-widest uppercase"
            >
              {activeFilter}
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-syne text-xl font-bold text-foreground tracking-tight">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-muted-foreground mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Technical Vitals */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
            {project.vitals.map((vital, i) => (
              <div key={i}>
                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase">
                  {vital.label}
                </div>
                <div className="font-mono text-sm font-bold text-accent mt-0.5">
                  {vital.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack tags — highlight matching tag */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(tech => {
              const isMatch = activeFilter && tech.toLowerCase() === activeFilter.toLowerCase();
              return (
                <span
                  key={tech}
                  className={`font-mono text-[10px] px-2 py-0.5 border tracking-wider uppercase transition-all duration-200 ${
                    isMatch
                      ? 'border-primary/70 text-primary bg-primary/10'
                      : 'border-border/60 text-muted-foreground'
                  }`}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}