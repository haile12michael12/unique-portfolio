export default function CloneMyBrain() {
  return (
    <section className="py-20 border-t">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-syne text-3xl md:text-5xl font-extrabold mb-4">CLONE MY BRAIN</h2>
          <p className="font-mono text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
            Access the complete mental model of my engineering decisions, patterns, and philosophy.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest rounded-full hover:bg-primary/90 transition-colors">
            Access Knowledge Base
          </button>
        </div>
      </div>
    </section>
  );
}
