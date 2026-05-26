import { Link } from 'react-router-dom';

export default function BlogSection() {
  return (
    <section className="py-20 border-t">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-syne text-3xl font-bold">Latest Insights</h2>
          <Link to="/" className="font-mono text-xs text-primary hover:underline uppercase tracking-widest">Back to Overview</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/9] bg-muted rounded-lg mb-4 group-hover:bg-muted/80 transition-colors" />
              <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">Systems Engineering</div>
              <h3 className="font-syne text-xl font-bold group-hover:text-primary transition-colors">The Cost of Distributed Consensus in 2024</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
