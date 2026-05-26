import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, Users, Star, GitFork, ExternalLink, MapPin, Building2 } from "lucide-react";

const GITHUB_USER = "torvalds"; // Replace with your GitHub username

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
}

const LANG_COLORS: Record<string, string> = {
  Go: "bg-cyan-400",
  TypeScript: "bg-blue-500",
  Rust: "bg-orange-500",
  Python: "bg-yellow-400",
  JavaScript: "bg-yellow-300",
  "C++": "bg-pink-500",
  Ruby: "bg-red-500",
  C: "bg-gray-500",
};

function AnimatedCounter({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-mono font-bold text-2xl text-primary"
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

function ContributionGrid() {
  const weeks = Array.from({ length: 52 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => {
      const rand = Math.random();
      if (rand < 0.3) return 0;
      if (rand < 0.5) return 1;
      if (rand < 0.75) return 2;
      if (rand < 0.9) return 3;
      return 4;
    })
  );

  const intensityMap: Record<number, string> = {
    0: "bg-muted/30",
    1: "bg-emerald-900/60",
    2: "bg-emerald-700/70",
    3: "bg-emerald-500/80",
    4: "bg-emerald-400",
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-0.5" style={{ minWidth: "max-content" }}>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((level, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (wi * 7 + di) * 0.001 }}
                className={`w-2.5 h-2.5 rounded-sm ${intensityMap[level]}`}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GitHubStats() {
  const { data: user, isLoading: userLoading } = useQuery<GitHubUser>({
    queryKey: ["github-user", GITHUB_USER],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
      if (!res.ok) throw new Error("GitHub API error");
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", GITHUB_USER],
    queryFn: async () => {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=stars&per_page=6`
      );
      if (!res.ok) throw new Error("GitHub API error");
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section id="github" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Open Source</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold flex items-center justify-center gap-3">
            <Github className="w-8 h-8" />
            GitHub Activity
          </h2>
        </motion.div>

        {userLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : user ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm flex flex-col items-center text-center gap-4"
            >
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-20 h-20 rounded-full border-2 border-primary/40"
                data-testid="img-github-avatar"
              />
              <div>
                <h3 className="font-bold text-lg text-foreground">{user.name ?? user.login}</h3>
                <p className="text-xs font-mono text-primary">@{user.login}</p>
                {user.bio && (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{user.bio}</p>
                )}
              </div>
              {user.company && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Building2 className="w-3 h-3" />
                  {user.company}
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {user.location}
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 w-full pt-3 border-t border-border/40">
                {[
                  { label: "Repos", value: user.public_repos },
                  { label: "Followers", value: user.followers },
                  { label: "Following", value: user.following },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <AnimatedCounter value={s.value} />
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github-profile"
                className="flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                View Profile <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

            {/* Right: contribution graph + top repos */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contribution grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm"
              >
                <h4 className="text-sm font-medium text-foreground mb-4">Contribution Activity (2024)</h4>
                <ContributionGrid />
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map(l => (
                    <div key={l} className={`w-2.5 h-2.5 rounded-sm ${l === 0 ? "bg-muted/30" : l === 1 ? "bg-emerald-900/60" : l === 2 ? "bg-emerald-700/70" : l === 3 ? "bg-emerald-500/80" : "bg-emerald-400"}`} />
                  ))}
                  <span>More</span>
                </div>
              </motion.div>

              {/* Top repos */}
              {!reposLoading && repos && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  {repos.slice(0, 4).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-repo-${repo.name}`}
                      className="p-4 rounded-xl bg-card/60 border border-border/50 hover:border-primary/30 transition-all hover:bg-primary/5 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate pr-2">
                          {repo.name}
                        </h5>
                        <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>
                      {repo.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${LANG_COLORS[repo.language] ?? "bg-muted-foreground"}`} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground text-sm">
            Could not load GitHub data. The API may be rate-limited.
          </div>
        )}
      </div>
    </section>
  );
}
