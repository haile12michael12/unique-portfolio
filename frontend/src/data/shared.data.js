/**
 * Shared Components Data
 * Data for shared section components like ExportPDF, About, etc.
 */

export const PDF_PROJECTS = [
  {
    title: 'Nexus Engine',
    description: 'Distributed real-time transaction processing platform handling 2M+ events/sec with sub-5ms latency guarantees.',
    stack: ['Go', 'Kafka', 'Redis', 'K8s', 'gRPC'],
    vitals: [
      { label: 'Throughput', value: '2.1M/s' },
      { label: 'Latency P99', value: '4.2ms' },
      { label: 'User Scale', value: '18M' },
    ],
    impact: 'Reduced latency by 94%, achieved 99.999% uptime, scaled to handle 40x original transaction volume.',
  },
  {
    title: 'Atlas Pipeline',
    description: 'ML-powered data pipeline orchestration framework processing 50TB+ daily across heterogeneous data sources.',
    stack: ['Python', 'Spark', 'Airflow', 'dbt', 'Snowflake'],
    vitals: [
      { label: 'Daily Volume', value: '52TB' },
      { label: 'Pipeline SLA', value: '99.97%' },
      { label: 'Cost Reduction', value: '68%' },
    ],
    impact: 'Freed 12 engineers from maintenance. Pipeline failures dropped 94%. Data freshness 6h → 15min.',
  },
  {
    title: 'Chronos Mesh',
    description: 'Real-time collaborative editing engine with CRDTs supporting 10K+ concurrent users.',
    stack: ['Rust', 'WebSocket', 'CRDT', 'WASM', 'React'],
    vitals: [
      { label: 'Concurrency', value: '10K+' },
      { label: 'Sync Latency', value: '12ms' },
      { label: 'Repo Size', value: '142K LOC' },
    ],
    impact: 'Zero data loss post-launch. Latency 200ms → 12ms. Support tickets dropped 82%.',
  },
  {
    title: 'Sentinel Shield',
    description: 'Zero-trust security infrastructure with runtime threat detection and compliance automation.',
    stack: ['Rust', 'eBPF', 'Terraform', 'OPA', 'SPIFFE'],
    vitals: [
      { label: 'Threat Detection', value: '<50ms' },
      { label: 'False Positives', value: '0.02%' },
      { label: 'Compliance', value: 'SOC2/ISO' },
    ],
    impact: 'Audit 6 weeks → 2 days. SOC2 Type II + ISO 27001. Zero breaches in 3 years.',
  },
];

export const PDF_EXPERTISE = [
  {
    title: 'Distributed Systems',
    metric: '47 systems',
    detail: 'Consensus protocols, event sourcing, CQRS, fault-tolerant architectures.',
  },
  {
    title: 'Engineering Leadership',
    metric: '60+ engineers',
    detail: 'Led cross-functional teams of 8–25. Technical strategy, mentorship, culture.',
  },
  {
    title: 'Performance Engineering',
    metric: '94% avg latency reduction',
    detail: 'Systematic profiling, algorithmic optimization, infrastructure tuning.',
  },
  {
    title: 'Platform Architecture',
    metric: '3× delivery speed',
    detail: 'Internal dev platforms, CI/CD pipelines, infrastructure-as-code.',
  },
];

export const ABOUT_STATS = [
  { label: 'Years Experience', value: '8+' },
  { label: 'GitHub Stars', value: '7k+' },
  { label: 'Production Systems', value: '12+' },
  { label: 'Open Source Repos', value: '24' },
];

export const ABOUT_BIO = {
  intro: 'Senior Software Engineer with 8+ years of experience building infrastructure, developer tools, and distributed systems at companies like Google, Stripe, and Vercel.',
  mission: 'My work sits at the intersection of correctness and performance — I care deeply about systems that are provably right, blazingly fast, and maintainable by future engineers who\'ve never met me.',
  hobbies: 'When I\'m not writing Go or Rust, I\'m contributing to open source projects, speaking at conferences, or writing deeply technical blog posts that try to demystify complex systems.',
  values: [
    'Systems that are observable, reliable, and scalable from day one',
    'Engineering leadership that prioritizes learning and psychological safety',
    'Open source as a form of technical communication',
    'Performance optimization as a multiplier on team productivity',
  ],
};

export default {
  PDF_PROJECTS,
  PDF_EXPERTISE,
  ABOUT_STATS,
  ABOUT_BIO,
};
