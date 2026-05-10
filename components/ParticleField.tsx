"use client";

import React, { useRef, useEffect } from 'react';

interface ParticleFieldProps {
  activeSection?: string;
}

export default function ParticleField({ activeSection }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<'free' | 'forming' | 'formed' | 'dispersing'>('free');
  const modeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disperseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Store particles array in a ref so the section-change effect can access it
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const isMobile = window.innerWidth < 768;

    const N = isMobile ? 300 : 700;

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      size: number = 0;
      base: number = 0;
      alpha: number = 0;
      speed: number = 0;
      offset: number = 0;
      driftX: number = 0;
      driftY: number = 0;
      type: 'bright' | 'dim' = 'dim';
      hasTarget: boolean = false;
      targetX: number = 0;
      targetY: number = 0;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = 0;
        this.vy = 0;
        this.size = 0.6 + Math.random() * 1.6;
        this.base = 0.12 + Math.random() * 0.28;
        this.alpha = init ? Math.random() * this.base : 0;
        this.speed = 0.003 + Math.random() * 0.008;
        this.offset = Math.random() * Math.PI * 2;
        this.driftX = (Math.random() - 0.5) * 0.15;
        this.driftY = (Math.random() - 0.5) * 0.08;
        this.type = Math.random() < 0.2 ? 'bright' : 'dim';
        this.hasTarget = false;
      }

      update(t: number) {
        const mode = modeRef.current;

        if (this.hasTarget && (mode === 'forming' || mode === 'formed')) {
          // Lerp toward text target
          const txDiff = this.targetX - this.x;
          const tyDiff = this.targetY - this.y;
          this.vx += txDiff * 0.06;
          this.vy += tyDiff * 0.06;
          this.vx *= 0.72;
          this.vy *= 0.72;
        } else if (!isMobile) {
          // Free drift — desktop only
          this.vx *= 0.9;
          this.vy *= 0.9;
          const wave = Math.sin(t * this.speed + this.offset) * 1.2;
          this.x += this.driftX;
          this.y += this.driftY + wave * 0.1;
        } else {
          // Mobile: no drift, just dampen velocity
          this.vx *= 0.8;
          this.vy *= 0.8;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = W;
        if (this.x > W) this.x = 0;
        if (this.y < 0) this.y = H;
        if (this.y > H) this.y = 0;

        // Alpha
        const targetAlpha = (this.hasTarget && mode !== 'dispersing') ? 0.85 : this.base;
        this.alpha += (targetAlpha - this.alpha) * 0.06;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const finalAlpha = this.type === 'bright' ? this.alpha : this.alpha * 0.5;
        ctx.fillStyle = `rgba(78, 255, 145, ${finalAlpha})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < N; i++) particles.push(new Particle());
    particlesRef.current = particles;

    function drawTextConnections() {
      if (!ctx) return;
      const mode = modeRef.current;
      if (mode !== 'forming' && mode !== 'formed') return;
      const tp = particles.filter(p => p.hasTarget);
      for (let i = 0; i < tp.length; i++) {
        for (let j = i + 1; j < tp.length; j++) {
          const dx = tp[i].x - tp[j].x, dy = tp[i].y - tp[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 18) {
            ctx.beginPath();
            ctx.moveTo(tp[i].x, tp[i].y);
            ctx.lineTo(tp[j].x, tp[j].y);
            ctx.strokeStyle = `rgba(78, 255, 145, ${(1 - d / 18) * 0.45})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    let t = 0;
    let animId: number;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      particles.forEach(p => { p.update(t); p.draw(); });
      drawTextConnections();
      animId = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      if (modeTimerRef.current) clearTimeout(modeTimerRef.current);
      if (disperseTimerRef.current) clearTimeout(disperseTimerRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // React to activeSection changes
  useEffect(() => {
    if (!activeSection || window.innerWidth < 768) return;
    const particles = particlesRef.current;
    if (!particles.length) return;

    // Clear pending timers
    if (modeTimerRef.current) clearTimeout(modeTimerRef.current);
    if (disperseTimerRef.current) clearTimeout(disperseTimerRef.current);

    // Sample pixel positions from text using an offscreen canvas
    const W = window.innerWidth;
    const H = window.innerHeight;
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;
    const octx = offscreen.getContext('2d');
    if (!octx) return;

    const fontSize = Math.min(W / activeSection.length * 1.4, 160);
    octx.font = `700 ${fontSize}px 'JetBrains Mono', monospace`;
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillStyle = '#ffffff';
    octx.fillText(activeSection.toUpperCase(), W / 2, H / 2);

    const imageData = octx.getImageData(0, 0, W, H);
    const data = imageData.data;
    const targets: { x: number; y: number }[] = [];
    const step = 8;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        if (data[idx + 3] > 128) {
          targets.push({
            x: x + (Math.random() - 0.5) * step,
            y: y + (Math.random() - 0.5) * step,
          });
        }
      }
    }

    if (!targets.length) return;

    // Reset all particles
    particles.forEach(p => { (p as any).hasTarget = false; });

    // Assign shuffled subset of particles to text targets
    const shuffled = [...particles].sort(() => Math.random() - 0.5);
    const count = Math.min(targets.length, shuffled.length);
    for (let i = 0; i < count; i++) {
      (shuffled[i] as any).hasTarget = true;
      (shuffled[i] as any).targetX = targets[i].x;
      (shuffled[i] as any).targetY = targets[i].y;
    }

    modeRef.current = 'forming';

    // Hold formed state for 3s then disperse
    modeTimerRef.current = setTimeout(() => {
      modeRef.current = 'dispersing';
      disperseTimerRef.current = setTimeout(() => {
        particles.forEach(p => { (p as any).hasTarget = false; });
        modeRef.current = 'free';
      }, 1200);
    }, 3000);
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
