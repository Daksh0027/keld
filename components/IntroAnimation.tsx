"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function IntroAnimation({ onSkip }: { onSkip?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [coordText, setCoordText] = useState("");
  const [statusText, setStatusText] = useState("");
  const [statusBright, setStatusBright] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showCoord, setShowCoord] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const stage = stageRef.current;
    if (!stage) return;

    let W = stage.offsetWidth;
    let H = stage.offsetHeight;
    canvas.width = W; 
    canvas.height = H;
    const CX = W / 2, CY = H / 2;

    const districts = [
      { label: 'CORE', x: CX, y: CY, r: 5, primary: true },
      { label: 'PROJECTS', x: CX - 190, y: CY - 90 },
      { label: 'STACK', x: CX + 175, y: CY - 115 },
      { label: 'EXPERIENCE', x: CX + 155, y: CY + 90 },
      { label: 'ARCHIVES', x: CX - 155, y: CY + 115 },
      { label: 'CERTS', x: CX + 25, y: CY + 165 },
      { label: 'CONTACT', x: CX - 25, y: CY - 170 },
    ];
    const connections = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]];

    let lines: any[] = [];
    let startTime: number | null = null;
    let animId: number;
    let isFinished = false;

    const PHASE_GRID = 3600;
    const PHASE_CITY = 2700;
    const PHASE_DONE = PHASE_GRID + PHASE_CITY;

    function ease(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function buildLines() {
      lines = [];
      const sp = 48;
      for (let x = 0; x <= W; x += sp) lines.push({ type: 'v', x, p: 0, delay: 200 + Math.random() * 1400, spd: 0.5 + Math.random() * 0.8 });
      for (let y = 0; y <= H; y += sp) lines.push({ type: 'h', y, p: 0, delay: 200 + Math.random() * 1400, spd: 0.5 + Math.random() * 0.8 });
    }

    function drawGrid(elapsed: number) {
      if(!ctx) return;
      ctx.clearRect(0, 0, W, H);
      lines.forEach(l => {
        const t = Math.max(0, Math.min(1, (elapsed - l.delay) / (2200 * l.spd)));
        l.p = ease(t);
        if (l.p <= 0) return;
        const alpha = 0.08 + l.p * 0.18;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(78,255,145,${alpha})`;
        ctx.lineWidth = 0.5;
        if (l.type === 'v') { ctx.moveTo(l.x, 0); ctx.lineTo(l.x, H * l.p); }
        else { ctx.moveTo(0, l.y); ctx.lineTo(W * l.p, l.y); }
        ctx.stroke();
      });
    }

    function drawConnections(pct: number) {
      if(!ctx) return;
      connections.forEach(([a, b], i) => {
        const t = Math.max(0, Math.min(1, (pct - i * 0.1) / 0.55));
        if (t <= 0) return;
        const d0 = districts[a], d1 = districts[b];
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(78,255,145,${0.1 + t * 0.25})`;
        ctx.lineWidth = 0.7;
        ctx.setLineDash([3, 7]);
        ctx.moveTo(d0.x, d0.y);
        ctx.lineTo(lerp(d0.x, d1.x, t), lerp(d0.y, d1.y, t));
        ctx.stroke();
        ctx.restore();
      });
    }

    function drawDistricts(pct: number) {
      if(!ctx) return;
      districts.forEach((d, i) => {
        const t = Math.max(0, Math.min(1, (pct - i * 0.09) / 0.45));
        if (t <= 0) return;
        const a = ease(t);
        const r = d.primary ? 6 : 4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r * t, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(78,255,145,${a * (d.primary ? 1 : 0.65)})`;
        ctx.fill();
        if (d.primary) {
          for (let ring = 1; ring <= 2; ring++) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, r * 2.2 * ring * t, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(78,255,145,${a * 0.12 / ring})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        ctx.font = `${Math.round(8 * a)}px 'JetBrains Mono',monospace`;
        ctx.fillStyle = `rgba(78,255,145,${a * 0.5})`;
        ctx.textAlign = 'center';
        const offY = d.y < CY ? -14 : 16;
        ctx.fillText(d.label, d.x, d.y + (d.primary ? -20 : offY) * t);
      });
    }

    function drawScan(elapsed: number) {
      if(!ctx) return;
      const y = ((elapsed * 0.15) % H);
      ctx.fillStyle = 'rgba(78,255,145,0.018)';
      ctx.fillRect(0, y, W, 3);
    }

    function drawCross(pct: number) {
      if(!ctx) return;
      if (pct < 0.08) return;
      const t = Math.min(1, (pct - 0.08) / 0.35);
      const sz = lerp(0, 32, ease(t));
      ctx.strokeStyle = `rgba(78,255,145,${t * 0.45})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(CX - sz, CY); ctx.lineTo(CX + sz, CY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(CX, CY - sz); ctx.lineTo(CX, CY + sz); ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX, CY, sz * 0.45, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(78,255,145,${t * 0.15})`;
      ctx.stroke();
    }

    function drawCornerMarks(pct: number) {
      if(!ctx) return;
      if (pct < 0.3) return;
      const t = Math.min(1, (pct - 0.3) / 0.5);
      const marks = [[40, 40], [W - 40, 40], [40, H - 40], [W - 40, H - 40]];
      const len = 16;
      ctx.strokeStyle = `rgba(78,255,145,${t * 0.3})`;
      ctx.lineWidth = 0.8;
      marks.forEach(([x, y]) => {
        const sx = x < W / 2 ? 1 : -1, sy = y < H / 2 ? 1 : -1;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + sx * len * t, y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + sy * len * t); ctx.stroke();
      });
    }

    function updateCoord(elapsed: number) {
      if (elapsed > PHASE_GRID) {
        const drift = Math.sin(elapsed * 0.001) * 0.0004;
        setCoordText(`28.6${(139 + drift).toFixed(4)}°N  77.2${(89 + drift * 0.7).toFixed(4)}°E`);
        setShowCoord(true);
      }
    }

    function setStatus(txt: string, bright: boolean) {
      setStatusText(txt);
      setStatusBright(bright);
    }

    function finish() {
      if (isFinished) return;
      isFinished = true;
      setFinished(true);
      cancelAnimationFrame(animId);
      drawGrid(9999);
      drawConnections(1);
      drawDistricts(1);
      drawCross(1);
      drawCornerMarks(1);
      setShowTitle(true);
      setStatus('System online · All districts active', true);
      setCoordText('28.6139°N  77.2089°E');
      setShowCoord(true);
    }

    const statusSteps = [
      { t: 600, msg: 'Initializing grid system_', bright: false },
      { t: PHASE_GRID + 300, msg: 'Mapping districts_', bright: false },
      { t: PHASE_GRID + 1350, msg: 'Locking coordinates_', bright: false },
      { t: PHASE_DONE - 300, msg: 'System online · All districts active', bright: true },
    ];
    let statusIdx = 0;

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      if (isFinished) return;

      const cityPct = Math.max(0, Math.min(1, (elapsed - PHASE_GRID) / PHASE_CITY));

      drawGrid(elapsed);
      drawScan(elapsed);
      if (cityPct > 0) {
        drawConnections(cityPct);
        drawDistricts(cityPct);
        drawCross(cityPct);
        drawCornerMarks(cityPct);
      }
      updateCoord(elapsed);

      while (statusIdx < statusSteps.length && elapsed >= statusSteps[statusIdx].t) {
        setStatus(statusSteps[statusIdx].msg, statusSteps[statusIdx].bright);
        statusIdx++;
      }

      // Check if we just showed title to trigger React state (but we'll just check elapsed to avoid re-renders)
      // Actually we'll use a timer for showTitle to be simpler
      if (elapsed > PHASE_DONE + 600) { finish(); return; }

      animId = requestAnimationFrame(animate);
    }

    buildLines();
    const timeout = setTimeout(() => {
      animId = requestAnimationFrame(animate);
    }, 120);
    
    const titleTimeout = setTimeout(() => {
      setShowTitle(true);
    }, PHASE_GRID + 600 + 120);

    return () => {
      clearTimeout(timeout);
      clearTimeout(titleTimeout);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={stageRef} className="w-full h-full min-h-screen relative overflow-hidden bg-[#050a06]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-full h-[78px] -translate-x-1/2 -translate-y-[44px]">
          <div className={`absolute right-1/2 pr-6 top-0 font-mono text-[78px] font-bold text-white tracking-[-4px] leading-none transition-all duration-1000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'}`}>ARCH</div>
          <div className={`absolute left-1/2 pl-6 top-0 font-mono text-[78px] font-bold text-[#4eff91] tracking-[-4px] leading-none transition-all duration-1000 delay-200 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'}`}>ZERO</div>
        </div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 mt-[45px] font-mono text-[10px] text-[#2a5c35] tracking-[5px] uppercase transition-opacity duration-800 delay-500 whitespace-nowrap ${showTitle ? 'opacity-100' : 'opacity-0'}`}>Precision · Systems · Architecture</div>
      </div>
      <div className={`absolute top-6 right-8 font-mono text-[9px] text-[#1e3824] tracking-[2px] transition-opacity duration-600 ${showCoord ? 'opacity-100' : 'opacity-0'}`}>
        {coordText}
      </div>
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[3px] uppercase transition-opacity duration-400 whitespace-nowrap ${statusText ? 'opacity-100' : 'opacity-0'} ${statusBright ? 'text-[#4eff91]' : 'text-[#1e3824]'}`}>
        {statusText}
      </div>
      {!finished && onSkip && (
        <div onClick={onSkip} className="absolute bottom-6 right-8 font-mono text-[10px] text-[#1e3824] tracking-[2px] cursor-pointer uppercase pointer-events-auto transition-colors hover:text-[#4eff91] z-50">
          Skip →
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none bg-gradient-to-t from-[#050a06]/80 to-transparent backdrop-blur-[1px] z-[40]" />
    </div>
  );
}
