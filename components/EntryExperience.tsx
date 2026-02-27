import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryExperienceProps {
  onComplete: () => void;
}

/* ─── Neural Network Canvas ───────────────────────────────────────────── */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  born: number;       // timestamp when node was spawned
  pulse: number;      // phase offset for the glowing ring
}

interface Connection {
  from: number;
  to: number;
  progress: number;   // 0-1 draw progress
  speed: number;
  opacity: number;
  signal: number;     // 0-1 position of travelling light dot
  signalActive: boolean;
}

const MAX_NODES = 65;
const CONNECTION_DIST = 180;
const SPAWN_INTERVAL = 90;    // ms between new nodes
const SIGNAL_SPEED = 0.012;

function useNeuralCanvas(canvasRef: React.RefObject<HTMLCanvasElement>, active: boolean) {
  const stateRef = useRef<{
    nodes: Node[];
    connections: Connection[];
    lastSpawn: number;
    animId: number;
  }>({ nodes: [], connections: [], lastSpawn: 0, animId: 0 });

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const s = stateRef.current;
    s.nodes = [];
    s.connections = [];

    const spawnNode = (now: number) => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const node: Node = {
        x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2.5,
        opacity: 0,
        born: now,
        pulse: Math.random() * Math.PI * 2,
      };
      const fromIdx = s.nodes.length;
      s.nodes.push(node);

      // Connect to nearest existing nodes
      s.nodes.forEach((other, i) => {
        if (i === fromIdx) return;
        const dx = other.x - x;
        const dy = other.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          s.connections.push({
            from: fromIdx,
            to: i,
            progress: 0,
            speed: 0.004 + Math.random() * 0.006,
            opacity: 0.15 + Math.random() * 0.25,
            signal: 0,
            signalActive: Math.random() > 0.4,
          });
        }
      });
    };

    const draw = (now: number) => {
      s.animId = requestAnimationFrame(draw);

      // Spawn new nodes over time
      if (s.nodes.length < MAX_NODES && now - s.lastSpawn > SPAWN_INTERVAL) {
        spawnNode(now);
        s.lastSpawn = now;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move + fade-in nodes
      s.nodes.forEach(n => {
        const age = now - n.born;
        n.opacity = Math.min(1, age / 800);
        n.x += n.vx;
        n.y += n.vy;
        // Soft boundary bounce
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw connections
      s.connections.forEach(c => {
        if (c.progress < 1) c.progress = Math.min(1, c.progress + c.speed);
        const nA = s.nodes[c.from];
        const nB = s.nodes[c.to];
        if (!nA || !nB) return;

        const baseOpacity = c.opacity * Math.min(nA.opacity, nB.opacity);
        if (baseOpacity < 0.01) return;

        // Partial line draw
        const tx = nA.x + (nB.x - nA.x) * c.progress;
        const ty = nA.y + (nB.y - nA.y) * c.progress;

        // Gradient line: lavender → violet
        const grad = ctx.createLinearGradient(nA.x, nA.y, tx, ty);
        grad.addColorStop(0, `rgba(139,92,246,${baseOpacity})`);
        grad.addColorStop(1, `rgba(167,139,250,${baseOpacity * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(nA.x, nA.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Travelling signal dot
        if (c.signalActive && c.progress === 1) {
          c.signal = (c.signal + SIGNAL_SPEED) % 1;
          const sx = nA.x + (nB.x - nA.x) * c.signal;
          const sy = nA.y + (nB.y - nA.y) * c.signal;
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
          glow.addColorStop(0, `rgba(196,181,253,0.9)`);
          glow.addColorStop(0.4, `rgba(139,92,246,0.5)`);
          glow.addColorStop(1, `rgba(139,92,246,0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      // Draw nodes
      s.nodes.forEach(n => {
        if (n.opacity < 0.01) return;

        // Outer pulse ring
        const ringR = n.radius + 5 + Math.sin(now * 0.002 + n.pulse) * 3;
        const ringOpacity = (0.3 + Math.sin(now * 0.002 + n.pulse) * 0.2) * n.opacity;
        ctx.beginPath();
        ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167,139,250,${ringOpacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Core glow
        const coreGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 2.5);
        coreGrad.addColorStop(0, `rgba(224,215,255,${n.opacity})`);
        coreGrad.addColorStop(0.5, `rgba(139,92,246,${n.opacity * 0.7})`);
        coreGrad.addColorStop(1, `rgba(139,92,246,0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // Solid dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224,215,255,${n.opacity * 0.95})`;
        ctx.fill();
      });
    };

    s.animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener('resize', resize);
    };
  }, [active, canvasRef]);
}

/* ─── Typing Text ─────────────────────────────────────────────────────── */

const TypingText: React.FC<{ text: string; speed?: number; className?: string; onDone?: () => void }> = ({
  text, speed = 45, className = '', onDone,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
        onDoneRef.current?.();
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]); // onDone intentionally omitted — accessed via ref

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[1.1em] bg-lavender/80 ml-[1px] align-middle animate-pulse" />}
    </span>
  );
};

/* ─── Main Component ──────────────────────────────────────────────────── */

type Stage =
  | 'pulse'          // 0-1.2 s  — black + faint pulse
  | 'initializing'   // 1.2 s    — "Initializing..." types
  | 'growing'        // types done — extra network growth
  | 'ready'          // — "You are now inside..."
  | 'exiting';       // — fade out

const EntryExperience: React.FC<EntryExperienceProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<Stage>('pulse');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [initTypingDone, setInitTypingDone] = useState(false);
  const [readyTypingDone, setReadyTypingDone] = useState(false);
  const readyToExitRef = useRef(false);

  useNeuralCanvas(canvasRef, stage !== 'exiting');

  // Preload profile image silently
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/profile.webp';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // fallback: don't block
  }, []);

  // Sequence timers
  useEffect(() => {
    const t1 = setTimeout(() => setStage('initializing'), 600);
    return () => clearTimeout(t1);
  }, []);

  // After init typing done, pause so user can read it, then grow → ready
  useEffect(() => {
    if (!initTypingDone) return;
    const t = setTimeout(() => setStage('growing'), 600);
    return () => clearTimeout(t);
  }, [initTypingDone]);

  useEffect(() => {
    if (stage !== 'growing') return;
    const t = setTimeout(() => setStage('ready'), 1000);
    return () => clearTimeout(t);
  }, [stage]);

  // Exit: wait for both "ready" typing done AND image loaded
  const maybeExit = useCallback(() => {
    if (readyToExitRef.current) return;
    if (readyTypingDone && imageLoaded) {
      readyToExitRef.current = true;
      setTimeout(() => setStage('exiting'), 2000);
      setTimeout(() => onComplete(), 3000);
    }
  }, [readyTypingDone, imageLoaded, onComplete]);

  useEffect(() => { maybeExit(); }, [readyTypingDone, imageLoaded, maybeExit]);

  return (
    <AnimatePresence>
      {stage !== 'exiting' ? (
        <motion.div
          key="entry"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Neural canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Central glow orb */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 0.45, 0.25] }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(139,92,246,0.35) 0%, rgba(109,40,217,0.15) 45%, transparent 70%)',
              filter: 'blur(18px)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-xl w-full">

            {/* Pulse dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              <span className="absolute w-10 h-10 rounded-full bg-lavender/30 animate-ping" />
              <span className="absolute w-6 h-6 rounded-full bg-lavender/50 animate-ping [animation-delay:0.3s]" />
              <span className="w-4 h-4 rounded-full bg-lavender shadow-lg shadow-lavender/60" />
            </motion.div>

            {/* Unified terminal card — lines accumulate as stages progress */}
            <AnimatePresence>
              {(stage === 'initializing' || stage === 'growing' || stage === 'ready') && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden"
                >
                  {/* Terminal title bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.03]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    <span className="ml-3 font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.5)' }}>
                      portfolio.init
                    </span>
                  </div>

                  {/* Terminal body */}
                  <div className="px-5 py-4 flex flex-col gap-3">
                    {/* Line 1 — always visible once stage starts */}
                    <div className="font-mono text-sm md:text-base leading-relaxed" style={{ color: 'rgba(216,180,254,0.95)' }}>
                      <TypingText
                        text="> Verifying visitor identity…"
                        speed={25}
                        onDone={() => setInitTypingDone(true)}
                      />
                    </div>

                    {/* Line 2 — appears after verification */}
                    {(stage === 'growing' || stage === 'ready') && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className="font-mono text-sm md:text-base leading-relaxed"
                        style={{ color: 'rgba(134,239,172,0.9)' }}
                      >
                        ✓ Verified. Access granted.
                      </motion.div>
                    )}

                    {/* Divider */}
                    {(stage === 'growing' || stage === 'ready') && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="h-px origin-left"
                        style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.5), transparent)' }}
                      />
                    )}

                    {/* Line 3 — welcome */}
                    {stage === 'ready' && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className="font-semibold text-lg md:text-xl lg:text-2xl leading-snug"
                        style={{
                          color: 'rgba(255,255,255,1)',
                          textShadow: '0 0 32px rgba(139,92,246,0.8)',
                        }}
                      >
                        <TypingText
                          text="Welcome to Muneeb Ashraf's Portfolio."
                          speed={22}
                          onDone={() => setReadyTypingDone(true)}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading dots — visible while verifying */}
            {(stage === 'initializing' || stage === 'growing') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-1.5"
              >
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.span
                    key={i}
                    className="w-1 h-1 rounded-full bg-lavender/50"
                    animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.6, 1.6, 0.6] }}
                    transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.13 }}
                  />
                ))}
              </motion.div>
            )}

            {/* Entering progress bar */}
            {readyTypingDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col items-start gap-1.5"
              >
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(167,139,250,0.55)' }}>
                  Entering
                </span>
                <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(139,92,246,0.15)' }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.9), rgba(196,181,253,1))' }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EntryExperience;
