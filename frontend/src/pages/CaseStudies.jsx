import { Link } from 'react-router-dom';

export default function ArchCaseStudies() {
  return (
    <section className="py-20 border-t">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-syne text-3xl font-bold">Architectural Patterns</h2>
          <Link to="/" className="font-mono text-xs text-primary hover:underline uppercase tracking-widest">Back to Overview</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border rounded-xl bg-card">
            <h3 className="font-syne text-2xl font-bold mb-4">Event-Driven Microservices</h3>
            <p className="text-muted-foreground mb-6">A deep dive into building resilient, scalable systems using Kafka and Go.</p>
          </div>
          <div className="p-8 border rounded-xl bg-card">
            <h3 className="font-syne text-2xl font-bold mb-4">Zero-Trust Infrastructure</h3>
            <p className="text-muted-foreground mb-6">Implementing identity-based security at the kernel level with eBPF.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
