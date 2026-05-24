export default function BuildInPublic() {
  return (
    <section className="py-20 border-t bg-primary/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-syne text-3xl font-bold mb-2">Building in Public</h2>
            <p className="text-muted-foreground font-mono text-sm">Real-time logs of current development cycles and system builds.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center p-4 bg-card border rounded-lg min-w-[120px]">
              <div className="font-mono text-2xl font-bold">14</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">Active Streams</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-card border rounded-lg min-w-[120px]">
              <div className="font-mono text-2xl font-bold">128</div>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">Commits Today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
