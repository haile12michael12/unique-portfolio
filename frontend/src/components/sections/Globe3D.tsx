import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";

// Key locations: SF (home), NYC, London, Berlin, Tokyo, Bangalore, Sydney
const MARKERS = [
  { location: [37.7749, -122.4194] as [number, number], size: 0.08 }, // San Francisco ★
  { location: [40.7128, -74.006] as [number, number], size: 0.05 },   // New York
  { location: [51.5074, -0.1278] as [number, number], size: 0.05 },   // London
  { location: [52.52, 13.405] as [number, number], size: 0.04 },      // Berlin
  { location: [35.6762, 139.6503] as [number, number], size: 0.04 },  // Tokyo
  { location: [12.9716, 77.5946] as [number, number], size: 0.04 },   // Bangalore
  { location: [37.3382, -121.8863] as [number, number], size: 0.04 }, // San Jose
];

export function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(4.8); // start facing SF
  const pointerDown = useRef(false);
  const lastX = useRef(0);
  const [size, setSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const s = Math.min(container.clientWidth, 520);
        setSize(s);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: size * 2,
      height: size * 2,
      phi: phiRef.current,
      theta: 0.2,
      dark: 1,
      diffuse: 1.8,
      mapSamples: 20000,
      mapBrightness: 8,
      baseColor: [0.05, 0.05, 0.12],
      markerColor: [0.06, 0.72, 0.84],
      glowColor: [0.06, 0.72, 0.84],
      scale: 1.05,
      offset: [0, 0],
      markers: MARKERS,
    });

    // Animation loop using globe.update()
    let raf: number;
    const animate = () => {
      if (!pointerDown.current) {
        phiRef.current += 0.003;
      }
      globe.update({ phi: phiRef.current, theta: 0.2 });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Drag to rotate
    const onPointerDown = (e: PointerEvent) => {
      pointerDown.current = true;
      lastX.current = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown.current) return;
      const delta = (e.clientX - lastX.current) / 200;
      phiRef.current += delta;
      lastX.current = e.clientX;
    };
    const onPointerUp = () => { pointerDown.current = false; };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [size]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Glow ring behind globe */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          boxShadow: "0 0 80px 20px rgba(6,182,212,0.06)",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, cursor: "grab" }}
        className="rounded-full"
        data-testid="canvas-globe"
      />
      {/* SF label */}
      <div className="absolute bottom-[28%] left-[18%] flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <span className="text-xs font-mono text-primary/80">San Francisco</span>
      </div>
      <p className="absolute bottom-2 text-xs text-muted-foreground/40 font-mono">drag to rotate</p>
    </motion.div>
  );
}
