import { Link } from 'react-router-dom';

export default function CaseStudySection() {
  return (
    <section id="casestudy" className="py-20 border-t">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-syne text-3xl font-bold">Deep Dives</h2>
          <Link to="/case-studies" className="font-mono text-xs text-primary hover:underline uppercase tracking-widest">View All Systems</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg bg-card/50">
            <h3 className="font-mono text-lg font-bold mb-2">Technical Deep Dives</h3>
            <p className="text-sm text-muted-foreground">In-depth analysis of system architectures and implementation details.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
