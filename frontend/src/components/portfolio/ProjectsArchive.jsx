const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ArchiveFilterBar, { emptyFilters, hasActiveFilters, toggleFilter } from './ArchiveFilterBar';

const PROJECTS = [
  {
    id: 'nexus',
    title: 'Nexus Engine',
    description: 'Distributed real-time transaction processing platform handling 2M+ events/sec with sub-5ms latency guarantees.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Data center servers with blue lights',
    stack: ['Go', 'Kafka', 'Redis', 'K8s', 'gRPC'],
    // filter metadata
    architecture: ['Microservices', 'Event-Driven', 'Distributed'],
    industry: ['Fintech'],
    challenges: ['High Throughput', 'Low Latency', 'Fault Tolerance'],
    vitals: [
      { label: 'Throughput', value: '2.1M/s' },
      { label: 'Latency P99', value: '4.2ms' },
      { label: 'User Scale', value: '18M' },
    ],
    specs: [
      { label: 'Regions', value: '12' },
      { label: 'Nodes', value: '240' },
      { label: 'Avg Msg Size', value: '1.2KB' },
      { label: 'Replication Factor', value: '3x' },
      { label: 'Recovery RTO', value: '<30s' },
      { label: 'Storage', value: '4.8TB/day' },
    ],
    architecture_desc: 'Event-driven microservices with CQRS pattern. Custom consensus protocol for distributed state management across 12 regions.',
    problem: 'Legacy monolith couldn\'t scale beyond 50K transactions/sec. System failures during peak loads caused $2M+ monthly revenue loss.',
    solution: 'Designed a horizontally-scalable event mesh using Go micro-services, Apache Kafka for event streaming, and a custom partition-aware routing layer. Implemented circuit breakers and bulkhead patterns for fault isolation.',
    impact: 'Reduced latency by 94%, achieved 99.999% uptime, and scaled to handle 40x the original transaction volume.',
    howItWorks: [
      { step: '01', title: 'Edge Ingestion', body: 'Requests hit API Gateway nodes co-located in 12 AWS regions. mTLS-authenticated gRPC streams deliver events to partition-aware routers.' },
      { step: '02', title: 'Event Mesh', body: 'Kafka clusters with custom partition logic route messages by entity key. Consumer groups scale independently, enabling zero-downtime deploys.' },
      { step: '03', title: 'State Coordination', body: 'Redis Cluster holds hot state with TTL-based eviction. A custom Raft consensus layer reconciles distributed writes during network partitions.' },
      { step: '04', title: 'Fault Isolation', body: 'Circuit breakers + bulkheads prevent cascade failures. Canary deployments with automated rollback on P99 regression > 2ms.' },
    ],
    links: [
      { label: 'Architecture Doc', url: 'https://github.com', icon: 'doc' },
      { label: 'Live Demo', url: 'https://github.com', icon: 'demo' },
      { label: 'GitHub Repo', url: 'https://github.com', icon: 'github' },
      { label: 'Benchmark Results', url: 'https://github.com', icon: 'chart' },
    ],
  },
  {
    id: 'atlas',
    title: 'Atlas Pipeline',
    description: 'ML-powered data pipeline orchestration framework processing 50TB+ daily across heterogeneous data sources.',
    image: 'https://images.unsplash.com/photo-1551288049-bbda4833effb?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Abstract data flow visualization',
    stack: ['Python', 'Spark', 'Airflow', 'dbt', 'Snowflake'],
    architecture: ['Data Pipeline', 'Event-Driven'],
    industry: ['Data & Analytics'],
    challenges: ['Cost Reduction', 'Fault Tolerance', 'High Throughput'],
    vitals: [
      { label: 'Daily Volume', value: '52TB' },
      { label: 'Pipeline SLA', value: '99.97%' },
      { label: 'Cost Reduction', value: '68%' },
    ],
    specs: [
      { label: 'DAGs', value: '1,200+' },
      { label: 'Downstream Jobs', value: '200+' },
      { label: 'Avg Job Duration', value: '4.2min' },
      { label: 'Schema Versions', value: 'Auto' },
      { label: 'Data Sources', value: '34' },
      { label: 'Freshness SLA', value: '15min' },
    ],
    architecture_desc: 'Modular ETL framework with dependency-aware scheduling, automated schema evolution, and self-healing pipeline recovery.',
    problem: 'Data team spent 70% of time on pipeline maintenance. Schema changes caused cascading failures across 200+ downstream jobs.',
    solution: 'Built an intelligent orchestration layer with automated schema drift detection, self-healing retry logic, and a declarative pipeline DSL that reduced configuration from 500 lines to 40.',
    impact: 'Freed 12 engineers from maintenance. Pipeline failures dropped 94%. Data freshness improved from 6 hours to 15 minutes.',
    howItWorks: [
      { step: '01', title: 'Source Ingestion', body: 'Connectors for S3, GCS, Postgres, and 30+ sources stream raw data into a landing zone. Schema fingerprinting runs on every batch.' },
      { step: '02', title: 'Drift Detection', body: 'ML classifier compares incoming schema fingerprints against the registry. Incompatible changes are quarantined, not silently propagated.' },
      { step: '03', title: 'Spark Transform', body: 'Declarative DSL compiles to optimized Spark DAGs. Column-level lineage is tracked and exposed via REST API for downstream consumers.' },
      { step: '04', title: 'Self-Healing', body: 'Airflow sensors monitor SLA windows. On breach, exponential-backoff retry triggers; on repeated failure, Slack alert + auto-rollback activates.' },
    ],
    links: [
      { label: 'Architecture Doc', url: 'https://github.com', icon: 'doc' },
      { label: 'PyPI Package', url: 'https://github.com', icon: 'demo' },
      { label: 'GitHub Repo', url: 'https://github.com', icon: 'github' },
      { label: 'Blog Post', url: 'https://github.com', icon: 'chart' },
    ],
  },
  {
    id: 'chronos',
    title: 'Chronos Mesh',
    description: 'Real-time collaborative editing engine with conflict-free replicated data types (CRDTs) supporting 10K+ concurrent users.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Network of interconnected dots',
    stack: ['Rust', 'WebSocket', 'CRDT', 'Wasm', 'React'],
    architecture: ['P2P / CRDT', 'Distributed'],
    industry: ['Collaboration', 'Developer Tools'],
    challenges: ['Conflict Resolution', 'Low Latency', 'Fault Tolerance'],
    vitals: [
      { label: 'Concurrency', value: '10K+' },
      { label: 'Sync Latency', value: '12ms' },
      { label: 'Repo Size', value: '142K LOC' },
    ],
    specs: [
      { label: 'WASM Bundle', value: '82KB' },
      { label: 'Op Types', value: '14' },
      { label: 'Offline Support', value: 'Full' },
      { label: 'Merge Algo', value: 'Custom RGA' },
      { label: 'WS Connections', value: '10K/node' },
      { label: 'Relay Nodes', value: '8' },
    ],
    architecture_desc: 'Custom CRDT implementation in Rust compiled to WebAssembly. Peer-to-peer sync with central relay servers for persistence.',
    problem: 'Existing OT-based solution couldn\'t handle offline editing or network partitions. Users lost work during poor connectivity.',
    solution: 'Implemented a novel CRDT variant optimized for rich-text and tree-structured data. Rust core compiled to WASM for browser execution with native-level performance.',
    impact: 'Zero data loss incidents post-launch. Collaboration latency reduced from 200ms to 12ms. Support tickets dropped 82%.',
    howItWorks: [
      { step: '01', title: 'WASM Core', body: 'Rust CRDT engine compiles to a 82KB WASM module. The browser runs it on a dedicated Web Worker — zero UI thread blocking.' },
      { step: '02', title: 'Local Operations', body: 'All edits apply instantly to local state via immutable op log. Unique Lamport timestamps make ops totally ordered across peers.' },
      { step: '03', title: 'Relay Sync', body: 'WebSocket relay broadcasts delta-encoded op batches. Clients apply remote ops idempotently; merges are always conflict-free.' },
      { step: '04', title: 'Persistence', body: 'Op logs persist to Postgres with compaction every 10K ops. Full document state can be reconstructed at any historical timestamp.' },
    ],
    links: [
      { label: 'Architecture Doc', url: 'https://github.com', icon: 'doc' },
      { label: 'Live Demo', url: 'https://github.com', icon: 'demo' },
      { label: 'GitHub Repo', url: 'https://github.com', icon: 'github' },
      { label: 'CRDT Deep-Dive', url: 'https://github.com', icon: 'chart' },
    ],
  },
  {
    id: 'sentinel',
    title: 'Sentinel Shield',
    description: 'Zero-trust security infrastructure with runtime threat detection, automated incident response, and compliance automation.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    imageAlt: 'Digital security shield representation',
    stack: ['Rust', 'eBPF', 'Terraform', 'OPA', 'SPIFFE'],
    architecture: ['Zero-Trust', 'Distributed'],
    industry: ['Security & Compliance'],
    challenges: ['Compliance', 'Fault Tolerance', 'Low Latency'],
    vitals: [
      { label: 'Threat Detection', value: '<50ms' },
      { label: 'False Positives', value: '0.02%' },
      { label: 'Compliance', value: 'SOC2/ISO' },
    ],
    specs: [
      { label: 'eBPF Probes', value: '47' },
      { label: 'Policy Rules', value: '320+' },
      { label: 'Identities (SPIFFE)', value: '1,800' },
      { label: 'Audit Coverage', value: '100%' },
      { label: 'MTTR', value: '4min' },
      { label: 'Audit Duration', value: '2 days' },
    ],
    architecture_desc: 'eBPF-based runtime monitoring with policy-as-code enforcement. Service mesh integration with mTLS and SPIFFE identity.',
    problem: 'Manual security audits took 6 weeks. No real-time threat detection. Compliance processes were entirely manual and error-prone.',
    solution: 'Deployed eBPF probes for kernel-level observability. Built a policy engine using OPA for automated compliance checks. Implemented zero-trust network architecture with SPIFFE identities.',
    impact: 'Audit time reduced from 6 weeks to 2 days. Achieved SOC2 Type II and ISO 27001 compliance. Zero security breaches in 3 years.',
    howItWorks: [
      { step: '01', title: 'Identity Bootstrap', body: 'SPIFFE/SPIRE issues X.509 SVIDs to every workload at startup. mTLS via Envoy enforces mutual authentication on all service-to-service calls.' },
      { step: '02', title: 'eBPF Observability', body: '47 eBPF probes attached to kernel syscall hooks capture syscall patterns, network flows, and file access in <1μs overhead.' },
      { step: '03', title: 'Policy Evaluation', body: 'OPA evaluates 320+ Rego policies against real-time telemetry. Policy violations trigger automated quarantine within 50ms.' },
      { step: '04', title: 'Compliance Automation', body: 'Continuous evidence collection feeds audit reports. SOC2 and ISO27001 evidence packages generate in 2 days vs 6 weeks manually.' },
    ],
    links: [
      { label: 'Architecture Doc', url: 'https://github.com', icon: 'doc' },
      { label: 'Policy Playground', url: 'https://github.com', icon: 'demo' },
      { label: 'GitHub Repo', url: 'https://github.com', icon: 'github' },
      { label: 'Security Report', url: 'https://github.com', icon: 'chart' },
    ],
  },
];

function projectMatchesFilters(project, filters) {
  const { tech, architecture, industry, challenge } = filters;

  if (tech.size > 0 && !project.stack.some(s => tech.has(s))) return false;
  if (architecture.size > 0 && !project.architecture.some(a => architecture.has(a))) return false;
  if (industry.size > 0 && !project.industry.some(ind => industry.has(ind))) return false;
  if (challenge.size > 0 && !project.challenges.some(c => challenge.has(c))) return false;

  return true;
}

export default function ProjectsArchive({ onSelectProject }) {
  const [filters, setFilters] = useState(emptyFilters());

  const handleToggle = (groupKey, value) => {
    setFilters(prev => toggleFilter(prev, groupKey, value));
  };

  const handleClear = () => setFilters(emptyFilters());

  const active = hasActiveFilters(filters);
  const filtered = PROJECTS.filter(p => projectMatchesFilters(p, filters));

  return (
    <section id="archive" className="relative py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            The Archive — Projects
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
        >
          ENGINEERING
          <br />
          <span className="text-muted-foreground">ARCHIVE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-10"
        >
          Each module represents a system designed, built, and scaled to production.
          Filter by architecture type, industry, or challenge — then click any module for the full deep-dive.
        </motion.p>

        {/* Filter bar */}
        <ArchiveFilterBar filters={filters} onToggle={handleToggle} onClear={handleClear} />

        {/* Result count */}
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-6"
          >
            {filtered.length} of {PROJECTS.length} projects match
          </motion.div>
        )}

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={{ ...project, architecture: project.architecture_desc }}
              index={i}
              onSelect={onSelectProject}
              dimmed={active && !filtered.includes(project)}
              highlighted={active && filtered.includes(project)}
              activeFilter={null}
            />
          ))}
        </div>

        {active && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 font-mono text-sm text-muted-foreground"
          >
            No projects match the selected filters. <button onClick={handleClear} className="text-primary hover:underline">Clear all</button>
          </motion.div>
        )}
      </div>
    </section>
  );
}