import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck, Activity, ServerCog, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const createMetrics = () => ({
  cpu: `${Math.floor(Math.random() * 18 + 18)}%`,
  latency: `${Math.floor(Math.random() * 28 + 12)}ms`,
  throughput: `${(Math.random() * 2 + 4.5).toFixed(1)}k req/s`,
  uptime: `99.${Math.floor(Math.random() * 80 + 18)}%`,
  errorBudget: `${(Math.random() * 0.12 + 0.01).toFixed(2)}%`,
});

export default function Status() {
  const [metrics, setMetrics] = useState(createMetrics());

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start mb-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-accent/30 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Advanced status
            </div>
            <h1 className="mt-6 font-syne text-4xl md:text-5xl font-extrabold tracking-tight">
              Platform health & live operations dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-7">
              Monitor infrastructure stability across edge regions, service latency, and production readiness.
              This status page is built as an advanced feature to help you navigate system metrics and evaluate operational posture.
            </p>
          </div>

          <Card className="border-border/70 bg-surface">
            <CardHeader>
              <CardTitle>Operational signal</CardTitle>
              <CardDescription>
                A quick snapshot of current network health and incident budget trends.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>Edge mesh health</span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">Stable</span>
                </div>
                <div className="mt-3 text-3xl font-semibold">99.98%</div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Region availability</div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <Activity className="w-4 h-4 text-primary" />
                  Live request throughput
                </div>
                <div className="mt-3 text-3xl font-semibold">{metrics.throughput}</div>
              </div>
            </CardContent>
            <CardFooter className="justify-between gap-3">
              <Button variant="outline" size="sm" onClick={() => setMetrics(createMetrics())}>
                <RefreshCw className="w-4 h-4" />
                Refresh metrics
              </Button>
              <Link to="/" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">
                Back to overview
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <ServerCog className="w-4 h-4 text-primary" />
                Infrastructure load
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-semibold">{metrics.cpu}</div>
              <p className="text-sm text-muted-foreground">Total CPU utilization across edge clusters.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Zap className="w-4 h-4 text-primary" />
                Latency profile
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-semibold">{metrics.latency}</div>
              <p className="text-sm text-muted-foreground">95th percentile service response time.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Error budget
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-semibold">{metrics.errorBudget}</div>
              <p className="text-sm text-muted-foreground">Remaining error budget for critical services.</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle>Uptime confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-border/50 bg-background/80 p-5">
                <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Live status stream
                </div>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Data replication</span>
                    <span>99.9%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Edge sync</span>
                    <span>100%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Service restarts</span>
                    <span>1 / 24h</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
