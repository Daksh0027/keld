"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DATA = {
  archives: {
    name: 'The Archives', code: 'KLD-D01 · Bureau of Records',
    desc: 'Personnel file. Founding documents. Timeline of infrastructure decisions. The city does not hide its origins.',
    tags: ['About', 'Background', 'Timeline', 'Skills registry'],
    specs: { area: '12,000 SQM', clearance: 'Lvl 2', power: 'Offline' },
    connections: ['D02', 'CORE']
  },
  load: {
    name: 'The Load District', code: 'KLD-D02 · Dept. of Works',
    desc: 'Where weight is carried. Backend systems, APIs, data pipelines — each filed as an operational report with uptime figures and post-mortems.',
    tags: ['Backend', 'APIs', 'Databases', 'Infrastructure'],
    specs: { area: '45,000 SQM', clearance: 'Lvl 4', power: 'Optimal' },
    connections: ['D01', 'D03', 'CORE']
  },
  surface: {
    name: 'The Surface Works', code: 'KLD-D03 · Public Interface Div.',
    desc: 'What the public sees. Interfaces built to be used, not admired — though both tend to happen. Every component has a spec and a reason.',
    tags: ['Frontend', 'UI/UX', 'React', 'Full-stack'],
    specs: { area: '28,000 SQM', clearance: 'Lvl 1', power: 'Nominal' },
    connections: ['D02']
  },
  proving: {
    name: 'The Proving Ground', code: 'KLD-D04 · Classified Research',
    desc: 'Sealed test zone. Projects that did not ship, or shipped strange. Lessons catalogued by failure type. Clearance required.',
    tags: ['Experiments', 'Open source', 'Side projects', 'Archived'],
    specs: { area: '15,000 SQM', clearance: 'Lvl 5', power: 'Fluctuating' },
    connections: ['CORE']
  },
  core: {
    name: 'Central Core', code: 'KLD-CORE · The Architect\'s Hub',
    desc: 'Where all systems converge. The singular point of architectural decision-making. One engineer. All roads lead here.',
    tags: ['Command centre', 'All systems', 'Active'],
    specs: { area: '100,000 SQM', clearance: 'Lvl 0 (Admin)', power: 'Maximum' },
    connections: ['D01', 'D02', 'D04', 'D05']
  },
  transmission: {
    name: 'The Transmission Office', code: 'KLD-D05 · Official Comms',
    desc: 'All transmissions enter and exit here. State your purpose, your timeline, your constraints. Response within 48 hours. No small talk required.',
    tags: ['Contact', 'Email', 'Availability', 'Hire'],
    specs: { area: '8,000 SQM', clearance: 'Lvl 1', power: 'Standby' },
    connections: ['CORE']
  }
};

export default function BlueprintMap2D() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 1354, y: 159 }); // Default from HTML
  const [showSpec, setShowSpec] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
  };

  const handleSelect = (id: string) => {
    setActiveDistrict(id);
  };

  const activeData = activeDistrict ? DATA[activeDistrict as keyof typeof DATA] : null;

  return (
    <div className="blueprint-wrap">
      <h2 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Keld interactive city map — click districts to explore
      </h2>
      <p className="blueprint-city-label">Keld · Urban plan KLD-MAP-001 · Click district to inspect</p>

      <div className="blueprint-map-area" id="map" onMouseMove={handleMouseMove} ref={mapRef}>
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="scanline-glitch">
            <feTurbulence type="fractalNoise" baseFrequency="0.1 0.02" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        <div className="blueprint-grid-bg"></div>
        <div className="blueprint-scanline"></div>
        <div className="blueprint-scanline-glitch"></div>

        <div className="blueprint-road-h" style={{ top: '140px', left: 0, right: 0 }}></div>
        <div className="blueprint-road-h" style={{ top: '280px', left: 0, right: 0 }}></div>
        <div className="blueprint-road-v" style={{ left: '200px', top: 0, bottom: 0 }}></div>
        <div className="blueprint-road-v" style={{ left: '420px', top: 0, bottom: 0 }}></div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 0.2, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className={`blueprint-district ${activeDistrict === 'archives' ? 'active' : ''}`} style={{ left: '12px', top: '12px', width: '176px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('archives')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Archives<br /><span>KLD-D01</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 0.6, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className={`blueprint-district ${activeDistrict === 'load' ? 'active' : ''}`} style={{ left: '212px', top: '12px', width: '196px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('load')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Load District<br /><span>KLD-D02</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 1.1, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className={`blueprint-district ${activeDistrict === 'surface' ? 'active' : ''}`} style={{ left: '432px', top: '12px', width: '196px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('surface')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Surface Works<br /><span>KLD-D03</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 1.5, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className={`blueprint-district ${activeDistrict === 'proving' ? 'active' : ''}`} style={{ left: '12px', top: '152px', width: '176px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('proving')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Proving Ground<br /><span>KLD-D04</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 2.2, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className={`blueprint-district ${activeDistrict === 'core' ? 'active' : ''}`} style={{ left: '212px', top: '152px', width: '416px', height: '116px', background: 'rgba(255,255,255,0.005)' }} onClick={() => handleSelect('core')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>Central Core<br /><span>KLD-CORE</span></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="blueprint-pulse-ring" style={{ top: '-2px', left: '-2px' }}></div>
            <div className="blueprint-pulse-dot blink"></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 2.8, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className={`blueprint-district ${activeDistrict === 'transmission' ? 'active' : ''}`} style={{ left: '12px', top: '292px', width: '176px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('transmission')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Transmission Office<br /><span>KLD-D05</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 3.2, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className="blueprint-district" style={{ left: '212px', top: '292px', width: '196px', height: '116px', borderStyle: 'dashed', pointerEvents: 'none' }}>
          <div className="blueprint-d-label" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3, textAlign: 'center', width: '100%' }}>[SECTOR PENDING]</div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0, 0.8, 0.2, 1, 0.4, 1] }} transition={{ delay: 3.5, duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }} className="blueprint-district" style={{ left: '432px', top: '292px', width: '196px', height: '116px', borderStyle: 'dashed', pointerEvents: 'none' }}>
          <div className="blueprint-d-label" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3, textAlign: 'center', width: '100%' }}>[CLASSIFIED]</div>
        </motion.div>

        <div className="blueprint-cursor-pos" style={{ position: 'absolute', bottom: '8px', right: '10px' }}>
          X:{String(cursorPos.x).padStart(3, '0')} Y:{String(cursorPos.y).padStart(3, '0')}
        </div>

        <AnimatePresence>
          {activeData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] bg-[#111] border border-[#C8A254] p-6 shadow-2xl z-50"
            >
              <button
                onClick={() => setActiveDistrict(null)}
                className="absolute top-4 right-4 text-[#6b6965] hover:text-[#c8c2b4]"
              >
                ✕
              </button>
              <div className="mb-4 pb-3 border-b border-dashed border-[#2a2a2a]">
                <p className="text-[#c8c2b4] text-[14px] tracking-[0.1em] uppercase mb-1">{activeData.name}</p>
                <p className="text-[#6b6965] text-[10px] tracking-[0.1em] uppercase">{activeData.code}</p>
              </div>

              <div className="flex gap-6">
                <div className="flex-[2]">
                  <p className="text-[#888] text-[12px] leading-[1.6] mb-4">{activeData.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {activeData.tags.map(t => <span key={t} className="text-[9px] px-2 py-1 border border-[#2a2a2a] text-[#6b6965] uppercase tracking-[0.1em]">{t}</span>)}
                  </div>
                </div>
                <div className="flex-1 border-l border-[#2a2a2a] pl-4 flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] tracking-[0.1em]"><span className="text-[#6b6965]">AREA:</span> <span className="text-[#c8c2b4] text-right">{activeData.specs.area}</span></div>
                  <div className="flex justify-between text-[10px] tracking-[0.1em]"><span className="text-[#6b6965]">PWR:</span> <span className="text-[#c8c2b4] text-right">{activeData.specs.power}</span></div>
                  <div className="flex justify-between text-[10px] tracking-[0.1em]"><span className="text-[#6b6965]">CLR:</span> <span className="text-[#c8c2b4] text-right">{activeData.specs.clearance}</span></div>
                  <div className="flex justify-between text-[10px] tracking-[0.1em]"><span className="text-[#6b6965]">LINK:</span> <span className="text-[#c8c2b4] text-right">{activeData.connections.join(', ')}</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="blueprint-map-footer mt-6">
        <p className="blueprint-status-bar">KELD URBAN PLANNING AUTHORITY · REV 3.1 · <span className="blueprint-status-active">LIVE<span className="blink">█</span></span></p>
        <button className="blueprint-spec-button" onClick={() => setShowSpec(true)}>
          Full spec ↗
        </button>
      </div>

      {showSpec && (
        <div className="blueprint-modal-overlay" onClick={() => setShowSpec(false)}>
          <div className="blueprint-modal-content" onClick={e => e.stopPropagation()}>
            <div className="blueprint-modal-header">
              <h3>KELD_CITY_SPEC_REV_3.1</h3>
              <button onClick={() => setShowSpec(false)}>✕</button>
            </div>
            <div className="blueprint-modal-body">
              <p>CONFIDENTIAL DOCUMENT</p>
              <p className="mt-4 mb-2 text-[#c8c2b4]">ENGINEERING SUMMARY:</p>
              <ul>
                <li>TOTAL DISTRICTS: 6 ACTIVE, 2 PENDING</li>
                <li>POWER GRID: 94% OPTIMAL</li>
                <li>CORE TEMPERATURE: 32°C</li>
                <li>LAST INCIDENT: 0 DAYS AGO</li>
              </ul>
              <p className="mt-6">The city is an ongoing process. Anomalies are to be reported to the Architect.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
