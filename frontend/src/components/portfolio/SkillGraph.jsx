import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// ─── Data ──────────────────────────────────────────────────────────────────
const SKILL_NODES = [
  // Core languages
  { id: 'go',         label: 'Go',          category: 'lang',    color: '#00ADD8', x:  0.0, y:  0.0, z:  0.0 },
  { id: 'rust',       label: 'Rust',         category: 'lang',    color: '#F74C00', x:  2.2, y:  0.8, z:  0.5 },
  { id: 'python',     label: 'Python',       category: 'lang',    color: '#3572A5', x: -2.0, y:  1.0, z: -0.3 },
  { id: 'typescript', label: 'TypeScript',   category: 'lang',    color: '#3178C6', x:  0.8, y: -2.0, z:  0.6 },
  // Infrastructure
  { id: 'k8s',        label: 'K8s',          category: 'infra',   color: '#326CE5', x: -0.5, y:  2.5, z:  0.2 },
  { id: 'terraform',  label: 'Terraform',    category: 'infra',   color: '#7B42BC', x: -2.5, y: -0.5, z:  0.4 },
  { id: 'aws',        label: 'AWS',          category: 'infra',   color: '#FF9900', x:  2.8, y: -1.0, z: -0.5 },
  { id: 'gcp',        label: 'GCP',          category: 'infra',   color: '#4285F4', x: -1.5, y: -2.2, z: -0.2 },
  // Data
  { id: 'kafka',      label: 'Kafka',        category: 'data',    color: '#9D50FF', x:  1.5, y:  2.0, z: -0.8 },
  { id: 'redis',      label: 'Redis',        category: 'data',    color: '#DC382D', x: -0.2, y: -2.8, z:  0.1 },
  { id: 'postgres',   label: 'PostgreSQL',   category: 'data',    color: '#336791', x:  3.0, y:  0.2, z:  0.9 },
  { id: 'snowflake',  label: 'Snowflake',    category: 'data',    color: '#29B5E8', x: -3.0, y:  0.5, z: -0.6 },
  // Concepts
  { id: 'crdt',       label: 'CRDT',         category: 'concept', color: '#00FFA3', x:  0.5, y:  3.0, z:  0.3 },
  { id: 'ebpf',       label: 'eBPF',         category: 'concept', color: '#00FFA3', x: -1.8, y:  2.0, z:  0.8 },
  { id: 'grpc',       label: 'gRPC',         category: 'concept', color: '#00FFA3', x:  2.0, y: -2.5, z: -0.3 },
  { id: 'wasm',       label: 'WASM',         category: 'concept', color: '#9D50FF', x: -0.8, y: -1.5, z:  1.0 },
];

const EDGES = [
  ['go',   'kafka'],   ['go',  'k8s'],    ['go',  'grpc'],   ['go',   'redis'],
  ['go',   'postgres'],
  ['rust', 'wasm'],    ['rust', 'ebpf'],  ['rust', 'crdt'],  ['rust', 'grpc'],
  ['python','kafka'],  ['python','snowflake'], ['python','gcp'], ['python','postgres'],
  ['typescript','wasm'],['typescript','grpc'], ['typescript','redis'],
  ['k8s', 'terraform'],['k8s', 'aws'],    ['k8s', 'gcp'],
  ['kafka','redis'],   ['kafka','snowflake'], ['kafka','postgres'],
  ['aws', 'terraform'],['aws', 'postgres'],
  ['gcp', 'terraform'],['gcp', 'snowflake'],
  ['ebpf','k8s'],      ['crdt','redis'],
];

const SKILL_PROJECTS = {
  go:         ['Nexus Engine', 'Atlas Pipeline'],
  rust:       ['Chronos Mesh', 'Sentinel Shield'],
  python:     ['Atlas Pipeline'],
  typescript: ['Chronos Mesh'],
  k8s:        ['Nexus Engine', 'Sentinel Shield', 'Atlas Pipeline'],
  terraform:  ['Sentinel Shield', 'Atlas Pipeline'],
  aws:        ['Nexus Engine', 'Sentinel Shield'],
  gcp:        ['Atlas Pipeline'],
  kafka:      ['Nexus Engine', 'Atlas Pipeline'],
  redis:      ['Nexus Engine', 'Chronos Mesh'],
  postgres:   ['Nexus Engine', 'Atlas Pipeline'],
  snowflake:  ['Atlas Pipeline'],
  crdt:       ['Chronos Mesh'],
  ebpf:       ['Sentinel Shield'],
  grpc:       ['Nexus Engine', 'Chronos Mesh'],
  wasm:       ['Chronos Mesh'],
};

const CATEGORY_LABELS = {
  lang:    'Language',
  infra:   'Infrastructure',
  data:    'Data',
  concept: 'Concept',
};

// ─── Component ─────────────────────────────────────────────────────────────
export default function SkillGraph() {
  const mountRef   = useRef(null);
  const sceneRef   = useRef({});
  const rafRef     = useRef(null);
  const mouseRef   = useRef({ x: 0, y: 0 });
  const [hovered, setHovered]   = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Init Three.js scene ────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const W = el.clientWidth;
    const H = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene / Camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, mobile ? 9 : 7);

    // Scale factor for node positions
    const SCALE = mobile ? 0.75 : 1;

    // ── Ambient star field ────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 40;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x606060, size: 0.02, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Build node meshes ──────────────────────────────────────────────────
    const nodeObjects = {};  // id → { mesh, glowMesh, data, baseColor }
    const nodePositions = {};// id → THREE.Vector3

    SKILL_NODES.forEach(node => {
      const pos = new THREE.Vector3(node.x * SCALE, node.y * SCALE, node.z * SCALE);
      nodePositions[node.id] = pos;

      const color = new THREE.Color(node.color);

      // Core sphere
      const geo  = new THREE.SphereGeometry(0.13, 24, 24);
      const mat  = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      mesh.userData = { nodeId: node.id };
      scene.add(mesh);

      // Glow halo
      const glowGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.copy(pos);
      scene.add(glowMesh);

      nodeObjects[node.id] = { mesh, glowMesh, data: node, baseColor: color };
    });

    // ── Build edge lines ───────────────────────────────────────────────────
    const edgeMeshes = [];
    EDGES.forEach(([a, b]) => {
      const pA = nodePositions[a];
      const pB = nodePositions[b];
      if (!pA || !pB) return;

      const points = [pA, pB];
      const geo    = new THREE.BufferGeometry().setFromPoints(points);
      const mat    = new THREE.LineBasicMaterial({
        color: 0x9D50FF,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      edgeMeshes.push({ line, mat, nodeA: a, nodeB: b });
    });

    // ── Lighting ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0x9D50FF, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0x00FFA3, 0.5);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    // ── Raycaster for hover ────────────────────────────────────────────────
    const raycaster  = new THREE.Raycaster();
    const pointer    = new THREE.Vector2();
    let hoveredId    = null;

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
      mouseRef.current = { x: pointer.x, y: pointer.y };
    };

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = el.getBoundingClientRect();
      pointer.x =  ((e.touches[0].clientX - rect.left)  / rect.width)  * 2 - 1;
      pointer.y = -((e.touches[0].clientY - rect.top)   / rect.height) * 2 + 1;
      mouseRef.current = { x: pointer.x, y: pointer.y };
    };

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('touchmove',   onTouchMove, { passive: true });

    // ── Animate ────────────────────────────────────────────────────────────
    let t = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      t += 0.005;

      // Gentle auto-rotation
      scene.rotation.y = t * 0.12 + mouseRef.current.x * 0.4;
      scene.rotation.x = mouseRef.current.y * 0.25;

      // Pulsate all nodes
      Object.values(nodeObjects).forEach(({ mesh, glowMesh, data, baseColor }) => {
        const pulse = 1 + Math.sin(t * 2 + data.x) * 0.06;
        mesh.scale.setScalar(pulse);
        glowMesh.scale.setScalar(pulse * 1.1);
      });

      // Raycasting for hover detection
      raycaster.setFromCamera(pointer, camera);
      const meshes = Object.values(nodeObjects).map(o => o.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      const newHoveredId = intersects.length > 0 ? intersects[0].object.userData.nodeId : null;

      if (newHoveredId !== hoveredId) {
        // Reset previous
        if (hoveredId && nodeObjects[hoveredId]) {
          const prev = nodeObjects[hoveredId];
          prev.mesh.material.emissiveIntensity = 0.6;
          prev.glowMesh.material.opacity       = 0.08;
          prev.mesh.scale.setScalar(1);
        }
        hoveredId = newHoveredId;
        setHovered(newHoveredId ? SKILL_NODES.find(n => n.id === newHoveredId) : null);
      }

      // Highlight hovered node
      if (hoveredId && nodeObjects[hoveredId]) {
        const cur = nodeObjects[hoveredId];
        cur.mesh.material.emissiveIntensity = 2.5;
        cur.glowMesh.material.opacity       = 0.3;
        cur.mesh.scale.setScalar(1.6 + Math.sin(t * 6) * 0.08);
      }

      // Highlight connected edges
      edgeMeshes.forEach(({ mat, nodeA, nodeB }) => {
        const connected = hoveredId && (nodeA === hoveredId || nodeB === hoveredId);
        mat.opacity = connected ? 0.7 : 0.12;
        mat.color.set(connected ? 0x00FFA3 : 0x9D50FF);
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ─────────────────────────────────────────────────────
    const onResize = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    // ── Store refs ─────────────────────────────────────────────────────────
    sceneRef.current = { renderer, scene, camera, nodeObjects, edgeMeshes };

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="skillgraph" className="relative py-24 md:py-40 border-t border-border/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-primary" />
          <span className="font-mono text-[11px] text-primary tracking-[0.15em] uppercase">
            Skill Graph — Interactive
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-foreground mb-4"
        >
          TECHNOLOGY
          <br />
          <span className="text-muted-foreground">CONSTELLATION</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-muted-foreground max-w-xl mb-10"
        >
          Each node is a technology. Energy lines map their relationships. 
          Hover any node to reveal the projects it powered.
        </motion.p>

        {/* Category legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
            const sample = SKILL_NODES.find(n => n.category === cat);
            return (
              <div key={cat} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: sample?.color }} />
                <span className="font-mono text-[10px] text-muted-foreground tracking-[0.12em] uppercase">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Canvas container + hover tooltip */}
      <div className="relative w-full" style={{ height: '520px' }}>
        <div ref={mountRef} className="w-full h-full cursor-crosshair" />

        {/* Hover info panel */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-6 left-6 md:top-8 md:left-[10%] pointer-events-none z-10"
            >
              <div className="border border-border/60 bg-background/90 backdrop-blur-md p-5 min-w-[220px] max-w-xs">
                {/* Node color accent line */}
                <div className="h-0.5 w-full mb-4" style={{ background: hovered.color }} />

                <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: hovered.color }}>
                  {CATEGORY_LABELS[hovered.category]}
                </div>
                <div className="font-syne text-2xl font-bold text-foreground tracking-tight mb-4">
                  {hovered.label}
                </div>

                <div className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-2">
                  Linked Projects
                </div>

                <div className="space-y-1.5">
                  {(SKILL_PROJECTS[hovered.id] || []).map(proj => (
                    <div key={proj} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: hovered.color }} />
                      <span className="font-mono text-xs text-foreground/80">{proj}</span>
                    </div>
                  ))}
                  {(!SKILL_PROJECTS[hovered.id] || !SKILL_PROJECTS[hovered.id].length) && (
                    <span className="font-mono text-xs text-muted-foreground">—</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle hint */}
        <AnimatePresence>
          {!hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <span className="font-mono text-[10px] text-muted-foreground/50 tracking-[0.15em] uppercase">
                Hover a node to explore
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}