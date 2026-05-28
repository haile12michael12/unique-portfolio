import { RadioTower, Gauge, Target, BrainCircuit } from 'lucide-react';

export const OBJECTIVES = {
  scale: {
    label: 'Scale',
    icon: RadioTower,
    signals: ['High Throughput', 'Low Latency', 'Distributed', 'Microservices', 'Go', 'Kafka'],
  },
  resilience: {
    label: 'Resilience',
    icon: Gauge,
    signals: ['Fault Tolerance', 'Zero-Trust', 'Compliance', 'Rust', 'eBPF', 'K8s'],
  },
  velocity: {
    label: 'Velocity',
    icon: Target,
    signals: ['Cost Reduction', 'Data Pipeline', 'Developer Tools', 'Python', 'Airflow', 'TypeScript'],
  },
};

export function calculateFit(project, objective, riskTolerance) {
  const signals = new Set(OBJECTIVES[objective].signals);
  const searchable = [
    ...project.stack,
    ...project.architecture,
    ...project.industry,
    ...project.challenges,
  ];
  const signalHits = searchable.filter(item => signals.has(item)).length;
  const complexityBonus = Math.min(project.specs.length * 2, 12);
  const riskBonus = project.challenges.includes('Fault Tolerance') ? 100 - riskTolerance : riskTolerance;

  return Math.min(98, Math.round(48 + signalHits * 9 + complexityBonus + riskBonus * 0.16));
}

export function projectMatchesFilters(project, filters) {
  const { tech, architecture, industry, challenge } = filters;

  if (tech.size > 0 && !project.stack.some(s => tech.has(s))) return false;
  if (architecture.size > 0 && !project.architecture.some(a => architecture.has(a))) return false;
  if (industry.size > 0 && !project.industry.some(ind => industry.has(ind))) return false;
  if (challenge.size > 0 && !project.challenges.some(c => challenge.has(c))) return false;

  return true;
}
