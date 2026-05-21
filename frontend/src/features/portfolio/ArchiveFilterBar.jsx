import { motion } from 'framer-motion';

export const emptyFilters = () => ({
  tech: new Set(),
  architecture: new Set(),
  industry: new Set(),
  challenge: new Set(),
});

export const hasActiveFilters = (filters) => {
  return filters.tech.size > 0 || 
         filters.architecture.size > 0 || 
         filters.industry.size > 0 || 
         filters.challenge.size > 0;
};

export const toggleFilter = (filters, groupKey, value) => {
  const newFilters = { ...filters };
  const group = new Set(newFilters[groupKey]);
  if (group.has(value)) {
    group.delete(value);
  } else {
    group.add(value);
  }
  newFilters[groupKey] = group;
  return newFilters;
};

export default function ArchiveFilterBar({ filters, onToggle, onClear }) {
  const groups = [
    { key: 'architecture', label: 'Architecture', options: ['Microservices', 'Event-Driven', 'Distributed', 'P2P / CRDT', 'Zero-Trust', 'Data Pipeline'] },
    { key: 'industry', label: 'Industry', options: ['Fintech', 'Data & Analytics', 'Collaboration', 'Security & Compliance'] },
    { key: 'challenge', label: 'Challenge', options: ['High Throughput', 'Low Latency', 'Fault Tolerance', 'Cost Reduction', 'Conflict Resolution', 'Compliance'] },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {groups.map(group => (
        <div key={group.key} className="space-y-2">
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{group.label}</div>
          <div className="flex flex-wrap gap-2">
            {group.options.map(opt => (
              <button
                key={opt}
                onClick={() => onToggle(group.key, opt)}
                className={`px-3 py-1 font-mono text-[11px] border transition-colors ${
                  filters[group.key].has(opt)
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      {hasActiveFilters(filters) && (
        <button
          onClick={onClear}
          className="px-3 py-1 font-mono text-[11px] text-primary hover:underline self-end mb-[2px]"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
