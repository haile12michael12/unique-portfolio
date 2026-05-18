import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen, FileCode2, ChevronRight, X, ArrowRight } from 'lucide-react';

const CODEBASES = [
  {
    id: 'nexus',
    label: 'Nexus Engine',
    color: '#9D50FF',
    description: 'Distributed real-time transaction processing — 2M events/sec',
    tree: [
      {
        name: 'nexus-engine/',
        type: 'dir',
        desc: 'Root monorepo. Each top-level directory is an independently deployable service.',
        children: [
          {
            name: 'gateway/',
            type: 'dir',
            desc: 'API Gateway layer. Handles mTLS termination, rate limiting, and partition-aware request routing.',
            children: [
              { name: 'router.go', type: 'file', desc: 'Core routing logic. Hashes entity keys to Kafka partitions using consistent hashing ring. ~320 LOC.' },
              { name: 'middleware.go', type: 'file', desc: 'Auth, rate-limit, and circuit-breaker middleware chain. Each middleware is composable.' },
              { name: 'config.yaml', type: 'file', desc: 'Region-aware routing config. Defines per-region partition maps and failover targets.' },
            ],
          },
          {
            name: 'event-mesh/',
            type: 'dir',
            desc: 'Kafka abstraction layer. Wraps producer/consumer lifecycle with backpressure and retry semantics.',
            children: [
              { name: 'producer.go', type: 'file', desc: 'Idempotent producer with exactly-once semantics. Handles transactional batching for atomic multi-partition writes.' },
              { name: 'consumer.go', type: 'file', desc: 'Consumer group manager. Implements cooperative rebalance to minimize partition reassignment downtime.' },
              { name: 'partition_manager.go', type: 'file', desc: 'Custom partition assignment strategy. Assigns partitions by entity type to enable workload isolation.' },
            ],
          },
          {
            name: 'state-engine/',
            type: 'dir',
            desc: 'Distributed state layer. Redis Cluster for hot state, Postgres for durability. Custom Raft for cross-region coordination.',
            children: [
              { name: 'raft/', type: 'dir', desc: 'Custom Raft consensus implementation. Used for distributed leader election and state reconciliation during network partitions.' },
              { name: 'cache.go', type: 'file', desc: 'Redis Cluster client with TTL-based eviction. Implements cache-aside pattern with write-through for critical state.' },
              { name: 'store.go', type: 'file', desc: 'Postgres write layer. Batches writes with 10ms flush window for throughput optimization.' },
            ],
          },
          {
            name: 'fault-isolation/',
            type: 'dir',
            desc: 'Reliability patterns. Circuit breakers, bulkheads, and canary deployment logic.',
            children: [
              { name: 'circuit_breaker.go', type: 'file', desc: 'Configurable circuit breaker. States: CLOSED → OPEN → HALF_OPEN. Trips on >5% error rate in 30s window.' },
              { name: 'bulkhead.go', type: 'file', desc: 'Semaphore-based bulkhead isolating thread pools per consumer group. Prevents cascade failures.' },
              { name: 'canary.go', type: 'file', desc: 'Canary traffic splitter. Routes N% of partition traffic to new consumer version. Auto-rollback on P99 regression >2ms.' },
            ],
          },
          {
            name: 'infra/',
            type: 'dir',
            desc: 'Infrastructure-as-code. Terraform modules for multi-region Kubernetes clusters.',
            children: [
              { name: 'k8s/', type: 'dir', desc: 'Kubernetes manifests. HPA configs, PodDisruptionBudgets, and topology spread constraints for multi-zone resilience.' },
              { name: 'terraform/', type: 'dir', desc: 'Terraform modules for AWS EKS, MSK (Kafka), and ElastiCache (Redis) across 12 regions.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'atlas',
    label: 'Atlas Pipeline',
    color: '#00FFA3',
    description: 'ML-powered data pipeline — 52TB/day, self-healing',
    tree: [
      {
        name: 'atlas-pipeline/',
        type: 'dir',
        desc: 'Modular ETL orchestration framework. Declarative DSL compiles to optimized Spark DAGs.',
        children: [
          {
            name: 'ingestion/',
            type: 'dir',
            desc: 'Source connectors. Standardized interface for 34 data sources including S3, GCS, Postgres, and REST APIs.',
            children: [
              { name: 'connectors/', type: 'dir', desc: '34 source-specific connector implementations. Each exposes a standard read() → DataFrame interface.' },
              { name: 'fingerprint.py', type: 'file', desc: 'Schema fingerprinting engine. Hashes column names, types, and nullability into a 64-bit hash for drift detection.' },
              { name: 'landing_zone.py', type: 'file', desc: 'Partitioned raw landing zone on S3. Organizes by source/date/batch for efficient downstream reads.' },
            ],
          },
          {
            name: 'schema-registry/',
            type: 'dir',
            desc: 'Schema contract management. Stores registered schemas and evaluates compatibility for incoming batches.',
            children: [
              { name: 'registry.py', type: 'file', desc: 'Schema versioning store backed by Postgres. Supports FULL_COMPATIBLE, ADDITIVE, and BREAKING compatibility modes.' },
              { name: 'quarantine.py', type: 'file', desc: 'Quarantine manager. Routes breaking schema changes to isolated S3 prefix for human review before propagation.' },
            ],
          },
          {
            name: 'transform/',
            type: 'dir',
            desc: 'Spark transformation layer. Declarative DSL reduces 500-line configs to ~40-line pipeline definitions.',
            children: [
              { name: 'dsl/', type: 'dir', desc: 'Pipeline DSL parser and compiler. Transforms YAML pipeline specs into optimized PySpark DAGs.' },
              { name: 'lineage.py', type: 'file', desc: 'Column-level lineage tracker. Records input→output column mappings for every transformation step.' },
              { name: 'optimizer.py', type: 'file', desc: 'DAG optimizer. Applies predicate pushdown, partition pruning, and join reordering before Spark submission.' },
            ],
          },
          {
            name: 'orchestration/',
            type: 'dir',
            desc: 'Airflow DAG management. SLA monitoring, self-healing retry, and alerting.',
            children: [
              { name: 'dag_factory.py', type: 'file', desc: 'Dynamic DAG generator. Reads pipeline specs and instantiates Airflow DAGs with dependency resolution.' },
              { name: 'sla_monitor.py', type: 'file', desc: 'SLA breach detector. Triggers exponential-backoff retry, then Slack alert + auto-rollback on repeated failure.' },
            ],
          },
          {
            name: 'warehouse/',
            type: 'dir',
            desc: 'Snowflake write layer and dbt transformation models.',
            children: [
              { name: 'dbt/', type: 'dir', desc: '1,200+ dbt models. Organized by domain: raw → staged → marts. Incremental models for tables >10M rows.' },
              { name: 'loader.py', type: 'file', desc: 'Snowflake bulk loader using COPY INTO. Handles schema evolution via ADD COLUMN for compatible changes.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'chronos',
    label: 'Chronos Mesh',
    color: '#60A5FA',
    description: 'CRDT-based collaborative editor — 10K+ concurrent users',
    tree: [
      {
        name: 'chronos-mesh/',
        type: 'dir',
        desc: 'Real-time collaborative editing engine. Rust core compiled to WASM runs in the browser on a dedicated Web Worker.',
        children: [
          {
            name: 'crdt-core/',
            type: 'dir',
            desc: 'Rust CRDT engine. Custom RGA (Replicated Growable Array) variant for rich-text and tree-structured content.',
            children: [
              { name: 'rga.rs', type: 'file', desc: 'Core RGA implementation. Every character/block is a node with a unique Lamport timestamp. Insertions are totally ordered.' },
              { name: 'gc.rs', type: 'file', desc: 'Garbage collector for tombstoned ops. Coordinates GC epochs across peers to safely compact the op log every 10K ops.' },
              { name: 'op_log.rs', type: 'file', desc: 'Immutable operation log. Append-only structure that enables full document reconstruction at any historical timestamp.' },
              { name: 'wasm_bindings.rs', type: 'file', desc: 'wasm-bindgen interface. Exposes apply_op(), merge(), and snapshot() to JavaScript. Compiled bundle: 82KB.' },
            ],
          },
          {
            name: 'sync-relay/',
            type: 'dir',
            desc: 'WebSocket relay server. Broadcasts delta-encoded op batches to peers. Handles connection state and presence.',
            children: [
              { name: 'relay.ts', type: 'file', desc: 'WebSocket server handling 10K concurrent connections per node. Rooms map to documents; ops fan out to all room members.' },
              { name: 'presence.ts', type: 'file', desc: 'Cursor presence system. Broadcasts cursor positions with 50ms debounce to avoid flooding.' },
              { name: 'persistence.ts', type: 'file', desc: 'Postgres persistence layer. Stores op logs with compaction metadata. Enables document load from any snapshot + delta.' },
            ],
          },
          {
            name: 'client/',
            type: 'dir',
            desc: 'Browser client. React UI with Web Worker isolation for CRDT operations.',
            children: [
              { name: 'worker/', type: 'dir', desc: 'Web Worker host for CRDT WASM module. Keeps all op processing off the main UI thread.' },
              { name: 'editor.tsx', type: 'file', desc: 'ProseMirror-based editor. Bridges ProseMirror transactions to CRDT ops via a thin adapter layer.' },
              { name: 'offline.ts', type: 'file', desc: 'Offline support. Buffers ops in IndexedDB during disconnection. Replays on reconnect with idempotent merge.' },
            ],
          },
          {
            name: 'infra/',
            type: 'dir',
            desc: 'Relay node infrastructure and deployment configs.',
            children: [
              { name: 'nginx.conf', type: 'file', desc: 'Nginx WebSocket proxy config. Sticky sessions route clients to the same relay node for their document session.' },
              { name: 'k8s/', type: 'dir', desc: 'K8s StatefulSet for relay nodes (8 replicas). PodAntiAffinity ensures geographic distribution.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sentinel',
    label: 'Sentinel Shield',
    color: '#FF6B35',
    description: 'Zero-trust security infrastructure — SOC2 + ISO27001',
    tree: [
      {
        name: 'sentinel-shield/',
        type: 'dir',
        desc: 'Zero-trust security platform. Every component operates on the assumption that the network is compromised.',
        children: [
          {
            name: 'identity/',
            type: 'dir',
            desc: 'SPIFFE/SPIRE identity layer. Issues X.509 SVIDs to every workload at startup. Rotated every 1 hour.',
            children: [
              { name: 'spire-server/', type: 'dir', desc: 'SPIRE server config. Manages registration entries and issues SVIDs via the Workload API.' },
              { name: 'spire-agent/', type: 'dir', desc: 'SPIRE agent daemonset. Runs on every node. Attests workloads and delivers SVIDs via a Unix domain socket.' },
              { name: 'envoy-config/', type: 'dir', desc: 'Envoy sidecar configs. Enforces mTLS on all service-to-service communication using SPIFFE SVIDs.' },
            ],
          },
          {
            name: 'observability/',
            type: 'dir',
            desc: 'eBPF-based runtime monitoring. 47 probes capture syscalls, network flows, and file access at <1μs overhead.',
            children: [
              { name: 'probes/', type: 'dir', desc: '47 eBPF probe definitions. Categorized by type: network, syscall, filesystem. Each probe emits structured events.' },
              { name: 'aggregator.go', type: 'file', desc: 'Telemetry aggregator. Merges eBPF event streams, deduplicates, and forwards to OPA for policy evaluation.' },
              { name: 'sampling.go', type: 'file', desc: 'Tail-based sampler. Logs 100% of anomalous events, 0.1% of normal. 98% data reduction, zero compliance gaps.' },
            ],
          },
          {
            name: 'policy-engine/',
            type: 'dir',
            desc: 'OPA-based policy evaluation. 320+ Rego rules enforce compliance and trigger automated responses.',
            children: [
              { name: 'policies/', type: 'dir', desc: '320+ Rego policy files organized by compliance domain: SOC2, ISO27001, internal security standards.' },
              { name: 'evaluator.go', type: 'file', desc: 'OPA evaluator wrapper. Evaluates incoming telemetry against policies in <5ms. Triggers quarantine actions on violation.' },
              { name: 'quarantine.go', type: 'file', desc: 'Automated quarantine engine. Isolates violating workloads via network policy update within 50ms of detection.' },
            ],
          },
          {
            name: 'compliance/',
            type: 'dir',
            desc: 'Automated evidence collection for SOC2 and ISO27001 audits.',
            children: [
              { name: 'evidence_collector.go', type: 'file', desc: 'Continuous evidence snapshot engine. Captures policy evaluation results, access logs, and change events to S3.' },
              { name: 'report_generator.go', type: 'file', desc: 'Audit report generator. Assembles SOC2 + ISO27001 evidence packages in 2 days vs 6 weeks manually.' },
            ],
          },
        ],
      },
    ],
  },
];

function TreeNode({ node, depth = 0, onSelect, selectedPath, path = '' }) {
  const [open, setOpen] = useState(depth < 2);
  const currentPath = `${path}/${node.name}`;
  const isDir = node.type === 'dir';
  const isSelected = selectedPath === currentPath;

  return (
    <div>
      <button
        onClick={() => {
          if (isDir) setOpen(o => !o);
          onSelect({ ...node, path: currentPath });
        }}
        className={`w-full flex items-center gap-1.5 py-1 px-2 text-left rounded-sm group transition-colors ${isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50 text-foreground/80 hover:text-foreground'}`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {isDir ? (
          open ? <FolderOpen className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" /> : <Folder className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
        ) : (
          <FileCode2 className="w-3.5 h-3.5 flex-shrink-0 text-sky-400" />
        )}
        <span className="font-mono text-[11px] truncate">{node.name}</span>
        {isDir && (
          <ChevronRight className={`w-3 h-3 ml-auto flex-shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-90' : ''}`} />
        )}
      </button>
      {isDir && open && node.children && (
        <div>
          {node.children.map(child => (
            <TreeNode key={child.name} node={child} depth={depth + 1} onSelect={onSelect} selectedPath={selectedPath} path={currentPath} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreCodebase() {
  const [activeRepo, setActiveRepo] = useState(CODEBASES[0]);
  const [selected, setSelected] = useState(null);

  const handleSelect = (node) => setSelected(node);

  return (
    <section id="explore" className="relative py-24 md:py-36 border-t border-border/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">Explore the Codebase</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4">
          NAVIGATE<br /><span className="text-muted-foreground">THE ARCHITECTURE</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-10">
          Browse the folder structure of each system. Click any module or file to understand what it does and why it exists.
        </motion.p>

        {/* Repo tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {CODEBASES.map(repo => (
            <button
              key={repo.id}
              onClick={() => { setActiveRepo(repo); setSelected(null); }}
              className="font-mono text-[10px] px-3 py-1.5 border tracking-widest uppercase transition-all duration-200"
              style={activeRepo.id === repo.id
                ? { borderColor: repo.color, color: repo.color, backgroundColor: repo.color + '12' }
                : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
            >
              {repo.label}
            </button>
          ))}
        </div>

        {/* IDE layout */}
        <motion.div key={activeRepo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="border border-border/40 bg-card/20 overflow-hidden">

          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border/30 bg-background/60">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{activeRepo.tree[0].name}</span>
            <span className="font-mono text-[9px] px-2 py-0.5 border ml-auto" style={{ borderColor: activeRepo.color + '40', color: activeRepo.color, backgroundColor: activeRepo.color + '10' }}>
              {activeRepo.description}
            </span>
          </div>

          <div className="flex flex-col md:flex-row min-h-[420px]">
            {/* File tree */}
            <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-border/30 p-2 overflow-y-auto max-h-[340px] md:max-h-none">
              <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase px-2 py-2 mb-1">EXPLORER</div>
              {activeRepo.tree.map(node => (
                <TreeNode key={node.name} node={node} depth={0} onSelect={handleSelect} selectedPath={selected?.path} />
              ))}
            </div>

            {/* Detail panel */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div key={selected.path} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <div className="flex items-center gap-2 mb-4">
                      {selected.type === 'dir'
                        ? <FolderOpen className="w-5 h-5 text-amber-400" />
                        : <FileCode2 className="w-5 h-5 text-sky-400" />}
                      <span className="font-mono text-sm font-bold text-foreground">{selected.name}</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 border border-border/40 text-muted-foreground ml-1">
                        {selected.type === 'dir' ? 'directory' : 'file'}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase mb-2">Path</div>
                    <div className="font-mono text-[10px] text-primary mb-5 break-all">{selected.path?.replace(/^\//, '')}</div>
                    <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase mb-2">Purpose</div>
                    <p className="font-mono text-sm text-foreground/80 leading-[1.8]">{selected.desc}</p>
                    {selected.type === 'dir' && selected.children && (
                      <div className="mt-5">
                        <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase mb-2">Contains</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selected.children.map(c => (
                            <span key={c.name} className="font-mono text-[9px] px-2 py-1 border border-border/40 text-muted-foreground flex items-center gap-1">
                              {c.type === 'dir' ? <Folder className="w-2.5 h-2.5 text-amber-400" /> : <FileCode2 className="w-2.5 h-2.5 text-sky-400" />}
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <div className="w-12 h-12 border border-border/40 flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">Click any folder or file to explore</p>
                    <div className="flex items-center justify-center gap-2 mt-3 font-mono text-[10px] text-muted-foreground/50">
                      <ArrowRight className="w-3 h-3" />
                      <span>Select a module from the tree</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}