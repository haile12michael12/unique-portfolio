import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, GitCommit, GitPullRequest, ExternalLink, Activity } from 'lucide-react';

const PINNED_REPOS = [
  {
    name: 'nexus-engine',
    description: 'Distributed real-time transaction processing — 2M+ events/sec, sub-5ms P99.',
    stars: 1247,
    forks: 183,
    language: 'Go',
    languageColor: '#00ADD8',
    topics: ['distributed-systems', 'kafka', 'grpc', 'kubernetes'],
    url: 'https://github.com/haile12michael12',
  },
  {
    name: 'atlas-pipeline',
    description: 'ML-powered ETL orchestration framework with automatic schema drift detection.',
    stars: 893,
    forks: 121,
    language: 'Python',
    languageColor: '#3572A5',
    topics: ['apache-spark', 'airflow', 'dbt', 'snowflake'],
    url: 'https://github.com/haile12michael12',
  },
  {
    name: 'chronos-mesh',
    description: 'CRDT-based real-time collaborative editor — Rust core compiled to WASM.',
    stars: 642,
    forks: 78,
    language: 'Rust',
    languageColor: '#dea584',
    topics: ['crdt', 'webassembly', 'real-time', 'collaboration'],
    url: 'https://github.com/haile12michael12',
  },
  {
    name: 'sentinel-shield',
    description: 'Zero-trust security mesh with eBPF runtime monitoring and OPA policy engine.',
    stars: 519,
    forks: 64,
    language: 'Rust',
    languageColor: '#dea584',
    topics: ['ebpf', 'zero-trust', 'security', 'spiffe'],
    url: 'https://github.com/haile12michael12',
  },
  {
    name: 'amharic-dev-tools',
    description: 'Open-source developer tools with Amharic language support for Ethiopian engineers.',
    stars: 312,
    forks: 47,
    language: 'TypeScript',
    languageColor: '#3178C6',
    topics: ['amharic', 'i18n', 'developer-tools', 'ethiopia'],
    url: 'https://github.com/haile12michael12',
  },
  {
    name: 'low-bandwidth-ui',
    description: 'UI component library optimized for low-bandwidth environments (<50KB bundles).',
    stars: 228,
    forks: 39,
    language: 'JavaScript',
    languageColor: '#F7DF1E',
    topics: ['performance', 'offline-first', 'progressive-web-app'],
    url: 'https://github.com/haile12michael12',
  },
];

const CONTRIB_STATS = [
  { label: 'Public Repos',     value: '47',    icon: GitFork },
  { label: 'Total Stars',      value: '3.8K',  icon: Star },
  { label: 'Contributions',    value: '2,341', icon: GitCommit },
  { label: 'Pull Requests',    value: '614',   icon: GitPullRequest },
];

// Fake contribution heatmap weeks
const WEEKS = Array.from({ length: 52 }, (_, wi) =>
  Array.from({ length: 7 }, (_, di) => {
    const v = Math.random();
    return v < 0.35 ? 0 : v < 0.55 ? 1 : v < 0.75 ? 2 : v < 0.9 ? 3 : 4;
  })
);

const HEAT_COLORS = ['#1a1a1b', '#2d1b69', '#5b21b6', '#7c3aed', '#9D50FF'];

export default function GitHubDeep() {
  return (
    <section id="github" className="relative py-24 md:py-40 border-t border-border/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            GitHub — Deep Integration
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
        >
          OPEN SOURCE
          <br />
          <span className="text-muted-foreground">FINGERPRINT</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-12"
        >
          Every commit is a decision. Every repo is a statement. Here's my open-source footprint.
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 mb-12">
          {CONTRIB_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-background p-6 flex flex-col gap-2"
              >
                <Icon className="w-4 h-4 text-primary opacity-60" />
                <div className="font-mono text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border border-border/40 bg-card/20 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-4 h-4 text-primary" />
            <span className="font-mono text-[11px] text-muted-foreground tracking-[0.15em] uppercase">
              Contribution Activity — Last 12 Months
            </span>
          </div>
          <div className="flex gap-[3px] overflow-x-auto pb-2">
            {WEEKS.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ backgroundColor: HEAT_COLORS[level] }}
                    title={`${level > 0 ? `${level * 2} contributions` : 'No contributions'}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="font-mono text-[9px] text-muted-foreground">Less</span>
            {HEAT_COLORS.map((c, i) => (
              <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ backgroundColor: c }} />
            ))}
            <span className="font-mono text-[9px] text-muted-foreground">More</span>
          </div>
        </motion.div>

        {/* Pinned repos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PINNED_REPOS.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="block border border-border/50 hover:border-primary/40 bg-card/20 p-5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-primary opacity-60" />
                  <span className="font-mono text-xs font-bold text-foreground tracking-tight">
                    {repo.name}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="font-mono text-[11px] text-muted-foreground leading-[1.7] mb-4">
                {repo.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.map(t => (
                  <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 border border-border/50 text-muted-foreground tracking-wider">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                  <span className="font-mono text-[10px] text-muted-foreground">{repo.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground">{repo.stars.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground">{repo.forks}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/haile12michael12"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs px-8 py-3 border border-border/60 hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors duration-300 tracking-widest uppercase flex items-center gap-2"
          >
            <GitFork className="w-3.5 h-3.5" />
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}