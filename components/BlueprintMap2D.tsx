"use client";

import { useState, useRef, MouseEvent } from "react";

const DATA = {
  archives:{name:'The Archives',code:'KLD-D01 · Bureau of Records',desc:'Personnel file. Founding documents. Timeline of infrastructure decisions. The city does not hide its origins.',tags:['About','Background','Timeline','Skills registry']},
  load:{name:'The Load District',code:'KLD-D02 · Dept. of Works',desc:'Where weight is carried. Backend systems, APIs, data pipelines — each filed as an operational report with uptime figures and post-mortems.',tags:['Backend','APIs','Databases','Infrastructure']},
  surface:{name:'The Surface Works',code:'KLD-D03 · Public Interface Div.',desc:'What the public sees. Interfaces built to be used, not admired — though both tend to happen. Every component has a spec and a reason.',tags:['Frontend','UI/UX','React','Full-stack']},
  proving:{name:'The Proving Ground',code:'KLD-D04 · Classified Research',desc:'Sealed test zone. Projects that did not ship, or shipped strange. Lessons catalogued by failure type. Clearance required.',tags:['Experiments','Open source','Side projects','Archived']},
  core:{name:'Central Core',code:'KLD-CORE · The Architect\'s Hub',desc:'Where all systems converge. The singular point of architectural decision-making. One engineer. All roads lead here.',tags:['Command centre','All systems','Active']},
  transmission:{name:'The Transmission Office',code:'KLD-D05 · Official Comms',desc:'All transmissions enter and exit here. State your purpose, your timeline, your constraints. Response within 48 hours. No small talk required.',tags:['Contact','Email','Availability','Hire']}
};

export default function BlueprintMap2D() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 1354, y: 159 }); // Default from HTML
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

        <div className={`blueprint-district ${activeDistrict === 'archives' ? 'active' : ''}`} style={{ left: '12px', top: '12px', width: '176px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('archives')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Archives<br/><span style={{ color: '#2A2A2A', fontSize: '8px' }}>KLD-D01</span></div>
        </div>

        <div className={`blueprint-district ${activeDistrict === 'load' ? 'active' : ''}`} style={{ left: '212px', top: '12px', width: '196px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('load')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Load District<br/><span style={{ color: '#2A2A2A', fontSize: '8px' }}>KLD-D02</span></div>
        </div>

        <div className={`blueprint-district ${activeDistrict === 'surface' ? 'active' : ''}`} style={{ left: '432px', top: '12px', width: '196px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('surface')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Surface Works<br/><span style={{ color: '#2A2A2A', fontSize: '8px' }}>KLD-D03</span></div>
        </div>

        <div className={`blueprint-district ${activeDistrict === 'proving' ? 'active' : ''}`} style={{ left: '12px', top: '152px', width: '176px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('proving')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Proving Ground<br/><span style={{ color: '#2A2A2A', fontSize: '8px' }}>KLD-D04</span></div>
        </div>

        <div className={`blueprint-district ${activeDistrict === 'core' ? 'active' : ''}`} style={{ left: '212px', top: '152px', width: '416px', height: '116px', background: 'rgba(255,255,255,0.005)' }} onClick={() => handleSelect('core')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>Central Core · The Architect's Hub<br/><span style={{ color: '#2A2A2A', fontSize: '8px' }}>KLD-CORE</span></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            <div className="blueprint-pulse-ring" style={{ top: '-2px', left: '-2px' }}></div>
            <div className="blueprint-pulse-dot blink"></div>
          </div>
        </div>

        <div className={`blueprint-district ${activeDistrict === 'transmission' ? 'active' : ''}`} style={{ left: '12px', top: '292px', width: '616px', height: '116px', background: 'rgba(255,255,255,0.01)' }} onClick={() => handleSelect('transmission')}>
          <div className="blueprint-d-dot" style={{ top: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ top: '6px', right: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', left: '6px' }}></div>
          <div className="blueprint-d-dot" style={{ bottom: '6px', right: '6px' }}></div>
          <div className="blueprint-d-label" style={{ top: '18px', left: '14px' }}>The Transmission Office<br/><span style={{ color: '#2A2A2A', fontSize: '8px' }}>KLD-D05 · ALL CHANNELS OPEN</span></div>
        </div>

        <div className="blueprint-cursor-pos" style={{ position: 'absolute', bottom: '8px', right: '10px' }}>
          X:{String(cursorPos.x).padStart(3, '0')} Y:{String(cursorPos.y).padStart(3, '0')}
        </div>
      </div>

      <div className="blueprint-info-panel">
        <p className="blueprint-info-name">{activeData ? activeData.name : 'Select a district'}</p>
        <p className="blueprint-info-code">{activeData ? activeData.code : 'Hover the map · Click to inspect'}</p>
        <p className="blueprint-info-desc">{activeData ? activeData.desc : 'Keld is a planned city. Every district is a system. Every system is load-bearing. Nothing here is decorative.'}</p>
        <div className="blueprint-info-tags">
          {activeData && activeData.tags.map(t => <span key={t} className="blueprint-info-tag">{t}</span>)}
        </div>
      </div>

      <div className="blueprint-map-footer">
        <p className="blueprint-status-bar">KELD URBAN PLANNING AUTHORITY · REV 3.1 · <span className="blueprint-status-active blink">LIVE</span></p>
        <button className="blueprint-spec-button">
          Full spec ↗
        </button>
      </div>
    </div>
  );
}
