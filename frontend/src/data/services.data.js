/**
 * Services Data
 * Professional service offerings and engagement models
 */

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'ai', label: 'AI & Data' },
];

export const SERVICES = [
  {
    id: 'fullstack',
    category: 'engineering',
    title: 'Full-Stack Development',
    tagline: 'End-to-end product engineering',
    description:
      'Build production-grade web applications from architecture to deployment. React, TypeScript, Node.js, and modern tooling with performance-first engineering.',
    icon: 'Code2',
    features: [
      'React / Next.js / TypeScript frontends',
      'REST & GraphQL API design',
      'Database modeling & optimization',
      'CI/CD pipeline setup',
      'Performance audits & Core Web Vitals',
    ],
    deliverables: ['Production-ready codebase', 'Technical documentation', 'Deployment pipeline', '30-day post-launch support'],
    timeline: '4–12 weeks',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 'distributed',
    category: 'engineering',
    title: 'Distributed Systems',
    tagline: 'Scale beyond the monolith',
    description:
      'Design and implement event-driven microservices, message queues, and fault-tolerant architectures that handle millions of requests with sub-10ms latency.',
    icon: 'Network',
    features: [
      'Microservices architecture design',
      'Event-driven patterns (CQRS, Event Sourcing)',
      'Kafka / Redis / gRPC integration',
      'Circuit breakers & bulkhead isolation',
      'Load testing & capacity planning',
    ],
    deliverables: ['Architecture decision records', 'Service mesh configuration', 'Monitoring dashboards', 'Runbook documentation'],
    timeline: '6–16 weeks',
    stack: ['Go', 'Kafka', 'Redis', 'K8s', 'gRPC'],
  },
  {
    id: 'devops',
    category: 'infrastructure',
    title: 'DevOps & Cloud Infrastructure',
    tagline: 'Infrastructure as code, automated',
    description:
      'Terraform-managed cloud infrastructure, Kubernetes orchestration, and GitOps workflows that reduce deployment time from hours to minutes.',
    icon: 'Cloud',
    features: [
      'AWS / GCP / Azure provisioning',
      'Kubernetes cluster setup & tuning',
      'Terraform & Helm chart authoring',
      'GitOps with ArgoCD / Flux',
      'Cost optimization & FinOps',
    ],
    deliverables: ['IaC repository', 'Cluster runbooks', 'Cost analysis report', 'Disaster recovery plan'],
    timeline: '3–8 weeks',
    stack: ['Terraform', 'K8s', 'Docker', 'ArgoCD', 'Prometheus'],
  },
  {
    id: 'security',
    category: 'infrastructure',
    title: 'Security & Zero-Trust',
    tagline: 'Defense in depth at every layer',
    description:
      'Implement zero-trust security models with mTLS, SPIFFE identity, policy-as-code enforcement, and eBPF-based runtime monitoring.',
    icon: 'Shield',
    features: [
      'Zero-trust network architecture',
      'mTLS & SPIFFE/SPIRE identity',
      'Policy-as-code with OPA/Kyverno',
      'Security audit & penetration testing',
      'Compliance (SOC2, GDPR readiness)',
    ],
    deliverables: ['Security assessment report', 'Policy configuration', 'Incident response playbook', 'Compliance checklist'],
    timeline: '4–10 weeks',
    stack: ['Envoy', 'SPIRE', 'OPA', 'Falco', 'Vault'],
  },
  {
    id: 'architecture',
    category: 'consulting',
    title: 'Technical Architecture Review',
    tagline: 'Expert eyes on your system design',
    description:
      'Deep-dive architecture reviews, technical due diligence, and strategic roadmaps for teams scaling from startup to enterprise.',
    icon: 'Layers',
    features: [
      'System design review & critique',
      'Technical debt assessment',
      'Scalability bottleneck analysis',
      'Technology stack evaluation',
      'Engineering team structure advice',
    ],
    deliverables: ['Architecture review document', 'Risk matrix & recommendations', '90-day roadmap', 'Executive summary'],
    timeline: '1–3 weeks',
    stack: ['ADR', 'C4 Model', 'DORA Metrics', 'SRE'],
  },
  {
    id: 'ai-pipeline',
    category: 'ai',
    title: 'AI & Data Pipelines',
    tagline: 'From raw data to intelligent products',
    description:
      'Build ML-powered data pipelines, LLM integrations, and analytics platforms that process terabytes daily with automated schema evolution.',
    icon: 'Brain',
    features: [
      'ETL/ELT pipeline design',
      'LLM integration & RAG systems',
      'Real-time analytics dashboards',
      'Schema drift detection',
      'MLOps & model serving',
    ],
    deliverables: ['Pipeline codebase', 'Data catalog', 'Monitoring & alerting', 'Model evaluation report'],
    timeline: '4–12 weeks',
    stack: ['Python', 'Spark', 'Airflow', 'Snowflake', 'OpenAI'],
  },
];

export const ENGAGEMENT_MODELS = [
  {
    id: 'project',
    title: 'Fixed Project',
    description: 'Defined scope, fixed timeline, and deliverables. Best for well-specified builds.',
    icon: 'Target',
    highlights: ['Fixed price quote', 'Milestone-based delivery', 'Clear acceptance criteria'],
  },
  {
    id: 'retainer',
    title: 'Monthly Retainer',
    description: 'Ongoing engineering capacity for teams that need consistent senior-level support.',
    icon: 'Calendar',
    highlights: ['Dedicated hours/month', 'Priority response SLA', 'Flexible scope'],
  },
  {
    id: 'advisory',
    title: 'Advisory',
    description: 'Strategic guidance for CTOs and engineering leaders navigating complex technical decisions.',
    icon: 'Lightbulb',
    highlights: ['Weekly strategy calls', 'Architecture reviews', 'Team mentoring'],
  },
];

export const WORK_PROCESS = [
  { step: '01', title: 'Discovery', body: 'Deep-dive into your goals, constraints, and existing systems. Define success metrics and scope.' },
  { step: '02', title: 'Architecture', body: 'Design the solution with ADRs, diagrams, and a phased delivery plan aligned to your timeline.' },
  { step: '03', title: 'Build', body: 'Iterative development with weekly demos, code reviews, and transparent progress tracking.' },
  { step: '04', title: 'Deploy & Handoff', body: 'Production deployment, documentation, knowledge transfer, and post-launch support window.' },
];

export default { SERVICE_CATEGORIES, SERVICES, ENGAGEMENT_MODELS, WORK_PROCESS };
