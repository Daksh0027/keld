"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA, DistrictID } from "@/lib/data";

const useDecipher = (text: string, active: boolean, delay: number = 0, speed: number = 1) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "ABCDEFGHIKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    if (!active) {
      setDisplayText("");
      return;
    }

    let iteration = 0;
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " ") return " ";
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 * speed;
      }, 15);
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, active, delay, speed]);

  return displayText;
};

function DecipherText({ text, active, delay = 0, speed = 1, className = "" }: { text: string; active: boolean; delay?: number; speed?: number; className?: string }) {
  const deciphered = useDecipher(text, active, delay, speed);
  return <span className={className}>{deciphered}</span>;
}

export default function BlueprintMap2D() {
  const [viewState, setViewState] = useState<'map' | 'detail' | 'full-spec'>('map');
  const [activeDistrict, setActiveDistrict] = useState<DistrictID | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0.5, y: 0.5 });
  const [activeSection, setActiveSection] = useState<string>('core');
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!mapRef.current || viewState !== 'map') return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
  };

  const handleSelect = (id: DistrictID) => {
    // 1. Set active district immediately so the map can anchor to it
    setActiveDistrict(id);

    // 2. Wait a tiny tick for React to commit the new anchor point to the DOM
    // before triggering the unmount/exit animation. This solves the "always zooms to center" bug!
    setTimeout(() => {
      setViewState('detail');
    }, 50);
  };

  const handleBackToMap = () => {
    setViewState('map');
    // Keep the active district during transition for zoom origin
    setTimeout(() => {
      setActiveDistrict(null);
    }, 500);
  };

  const handleSpecScroll = (e: any) => {
    const container = e.currentTarget;
    const sections = Array.from(container.querySelectorAll('section[id^="section-"]')) as HTMLElement[];
    
    let currentSection = activeSection;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (rect.top - containerRect.top <= 300) {
        currentSection = section.id.replace('section-', '');
      }
    });

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  };

  const activeData = activeDistrict ? DATA[activeDistrict] : null;

  const DISTRICT_ORDER: DistrictID[] = ['core', 'proving', 'load', 'surface', 'archives', 'transmission', 'classified'];

  let prevDistrictId: DistrictID | null = null;
  let nextDistrictId: DistrictID | null = null;

  if (activeDistrict) {
    const currentIndex = DISTRICT_ORDER.indexOf(activeDistrict);
    prevDistrictId = DISTRICT_ORDER[(currentIndex - 1 + DISTRICT_ORDER.length) % DISTRICT_ORDER.length];
    nextDistrictId = DISTRICT_ORDER[(currentIndex + 1) % DISTRICT_ORDER.length];
  }

  const prevData = prevDistrictId ? DATA[prevDistrictId] : null;
  const nextData = nextDistrictId ? DATA[nextDistrictId] : null;

  return (
    <div
      className="blueprint-wrap"
      onClick={() => {
        if (viewState === 'detail') handleBackToMap();
      }}
    >
      <AnimatePresence mode="wait">
        {viewState === 'map' ? (
          <motion.div
            key="map-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              scale: 5,
              opacity: 0,
              filter: "blur(20px)",
            }}
            style={{
              originX: activeDistrict ? DATA[activeDistrict].pos.x / 640 : 0.5,
              originY: activeDistrict ? (DATA[activeDistrict].pos.y + 52) / 552 : 0.5,
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center w-[640px] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="sr-only">Keld interactive city map</h2>
            <div className="w-full flex justify-between items-end mb-4 border-b border-[#1a1a1a] pb-4">
              <p className="blueprint-city-label !mb-0">Keld · Urban plan KLD-MAP-001</p>
              <p className="text-[10px] tracking-[0.3em] text-[#444] uppercase">Select sector to enter</p>
            </div>

            <div
              className="blueprint-map-area"
              id="map"
              style={{ height: '450px' }}
              onMouseMove={handleMouseMove}
              ref={mapRef}
            >
              <div className="blueprint-grid-bg"></div>
              <div className="blueprint-scanline"></div>

              {/* Layout Roads - Segmented to avoid crossing the massive Core */}
              <div className="absolute top-[146px] left-0 right-0 h-px bg-[#111] z-0"></div>
              <div className="absolute top-[290px] left-0 right-0 h-px bg-[#111] z-0"></div>

              <div className="absolute left-[214px] top-0 h-[146px] w-px bg-[#111] z-0"></div>
              <div className="absolute left-[214px] top-[290px] bottom-0 w-px bg-[#111] z-0"></div>

              <div className="absolute left-[426px] top-0 h-[146px] w-px bg-[#111] z-0"></div>
              <div className="absolute left-[426px] top-[290px] bottom-0 w-px bg-[#111] z-0"></div>

              {(Object.keys(DATA) as DistrictID[]).map((id) => {
                const d = DATA[id];
                const isActive = activeDistrict === id;
                const isWide = id === 'surface';

                // 3-1-3 Layout: 188px widths, 24px gaps, 14px margins
                const gridStyles: Record<DistrictID, any> = {
                  core: { left: '14px', top: '14px', width: '188px', height: '120px' },
                  proving: { left: '226px', top: '14px', width: '188px', height: '120px' },
                  load: { left: '438px', top: '14px', width: '188px', height: '120px' },
                  surface: { left: '14px', top: '158px', width: '612px', height: '120px', background: 'rgba(10,10,10,0.8)' },
                  archives: { left: '14px', top: '302px', width: '188px', height: '120px' },
                  transmission: { left: '226px', top: '302px', width: '188px', height: '120px' },
                  classified: { left: '438px', top: '302px', width: '188px', height: '120px' }
                };

                // Calculate radial distance from center (320, 218) for a spatial load animation
                const distFromCenter = Math.sqrt(Math.pow(d.pos.x - 320, 2) + Math.pow(d.pos.y - 218, 2));
                const spatialDelay = 0.1 + (distFromCenter * 0.0015);

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: spatialDelay }}
                    className={`blueprint-district group cursor-crosshair z-10 ${isActive ? 'active' : ''}`}
                    style={gridStyles[id]}
                    onClick={() => handleSelect(id)}
                  >
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#2a2a2a] group-hover:border-[#C8A84B] transition-colors"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#2a2a2a] group-hover:border-[#C8A84B] transition-colors"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#2a2a2a] group-hover:border-[#C8A84B] transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#2a2a2a] group-hover:border-[#C8A84B] transition-colors"></div>

                    {isWide && (
                      <div className="absolute inset-0 bg-radial-glow opacity-[0.03] pointer-events-none"></div>
                    )}

                    <div className={`px-4 py-3 h-full flex flex-col justify-between relative z-10 overflow-hidden ${isWide ? 'items-center' : ''}`}>
                      <div className={isWide ? 'w-full flex flex-col items-center text-center' : 'w-full'}>
                        <div className={`flex items-start mb-1 ${isWide ? 'justify-center gap-3' : 'justify-between'}`}>
                          <span className="text-[12px] font-bold tracking-[0.1em] text-[#c8c2b4] group-hover:text-white transition-colors truncate">{d.name.toUpperCase()}</span>
                          {isWide && <div className="w-2 h-2 bg-[#C8A84B] shadow-[0_0_8px_#C8A84B] mt-[3px]"></div>}
                        </div>
                        <div className="text-[8px] text-[#c8c2b4] opacity-30 tracking-[0.05em] uppercase truncate">{d.code}</div>
                        <div className={`h-px bg-[#1a1a1a] mt-2 mb-3 ${isWide ? 'w-16 mx-auto' : 'w-full'}`}></div>
                      </div>

                      <div className={isWide ? 'w-full flex flex-col items-center space-y-1' : 'w-full space-y-1'}>
                        <div className={isWide ? 'flex gap-8' : 'space-y-1 w-full'}>
                          {Object.entries(d.specs).slice(3).map(([key, val]) => (
                            <div key={key} className={`flex text-[8px] tracking-widest leading-none ${isWide ? 'gap-2' : 'justify-between'}`}>
                              <span className="text-[#444]">{key.toUpperCase()}:</span>
                              <span className={val === 'OPTIMAL' || val === 'ACTIVE' || val === 'NOMINAL_ACTIVE' ? 'text-[#C8A84B]' : 'text-[#6b6965]'}>{val}</span>
                            </div>
                          ))}
                        </div>
                        <div className={`h-0 overflow-hidden group-hover:h-4 transition-all duration-300 mt-1 ${isWide ? 'text-center' : ''}`}>
                          <span className="text-[8px] text-[#C8A84B] tracking-[0.2em] font-bold block pt-1">▶ ENTER_DISTRICT</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* The 3rd District (Sector Pending) is now mapped dynamically via DATA */}

              <div className="absolute bottom-3 left-4 text-[9px] text-[#6b6965] tracking-[0.3em] font-bold z-20">
                LOC_X:{String(cursorPos.x).padStart(3, '0')} LOC_Y:{String(cursorPos.y).padStart(3, '0')}
              </div>
            </div>

            <div className="blueprint-map-footer mt-8 flex items-center justify-between w-full max-w-[640px]">
              <p className="blueprint-status-bar !m-0 !text-[11px] !p-0 border-none">
                SYSTEM_READY · <span className="text-[#C8A84B]">LIVE<span className="blink">█</span></span>
              </p>
              <button
                className="text-[10px] tracking-[0.4em] text-[#6b6965] hover:text-[#C8A84B] transition-all flex items-center gap-2 border border-[#1a1a1a] px-6 py-2 bg-black/50"
                onClick={() => setViewState('full-spec')}
              >
                FULL SPEC <span className="opacity-30">→</span>
              </button>
            </div>
          </motion.div>
        ) : viewState === 'detail' ? (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-6xl bg-[#050505] border border-[#2a2a2a] relative z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-bg" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <AnimatePresence mode="wait">
              {activeData && activeDistrict && (
                <motion.div
                  key={activeDistrict}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  {prevData && prevDistrictId && (
                    <button
                      onClick={() => handleSelect(prevDistrictId)}
                      className="absolute left-0 top-0 bottom-0 w-12 border-r border-[#1a1a1a] bg-[#050505]/50 hover:bg-[#C8A84B]/5 transition-all z-20 flex flex-col items-center justify-center gap-8 group"
                    >
                      <span className="text-[#6b6965] group-hover:text-[#C8A84B] transition-colors text-xs">◄</span>
                      <div
                        className="text-[10px] tracking-[0.3em] uppercase text-[#6b6965] group-hover:text-[#C8A84B] transition-colors whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {prevData.code} · {prevData.name}
                      </div>
                    </button>
                  )}

                  {nextData && nextDistrictId && (
                    <button
                      onClick={() => handleSelect(nextDistrictId)}
                      className="absolute right-0 top-0 bottom-0 w-12 border-l border-[#1a1a1a] bg-[#050505]/50 hover:bg-[#C8A84B]/5 transition-all z-20 flex flex-col items-center justify-center gap-8 group"
                    >
                      <div
                        className="text-[10px] tracking-[0.3em] uppercase text-[#6b6965] group-hover:text-[#C8A84B] transition-colors whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl' }}
                      >
                        {nextData.code} · {nextData.name}
                      </div>
                      <span className="text-[#6b6965] group-hover:text-[#C8A84B] transition-colors text-xs">►</span>
                    </button>
                  )}

                  <div className="px-24 py-10 relative z-10">
                    <header className="mb-12 border-b border-[#2a2a2a] pb-8 flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.3em] uppercase">
                          <button
                            onClick={handleBackToMap}
                            className="text-[#6b6965] hover:text-[#C8A84B] transition-colors flex items-center gap-2 border border-[#1a1a1a] px-3 py-1 bg-black"
                          >
                            <span className="text-lg leading-none -mt-[2px] opacity-50">◂</span> MAP
                          </button>
                          <span className="text-[#333]">/</span>
                          <span className="text-[#C8A84B]">
                            {activeDistrict}
                          </span>
                          <span className="text-[#333]">/</span>
                          <span className="text-[#c8c2b4]">
                            {activeData.code}
                          </span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase text-[#C8A84B] mb-2">
                          <DecipherText text={activeData.name} active={viewState === 'detail'} delay={150} speed={1.5} />
                        </h1>
                        <div className="flex items-center gap-4">
                          <span className="text-[#6b6965] tracking-[0.4em] uppercase text-xs">{activeData.code}</span>
                          <span className="h-px w-20 bg-[#1a1a1a]"></span>
                        </div>
                      </div>
                      <div className="text-right border-l border-[#2a2a2a] pl-8">
                        <p className="text-[10px] text-[#6b6965] mb-2 tracking-widest uppercase">REGISTRY_STATUS</p>
                        <p className="text-sm font-bold uppercase text-[#C8A84B] tracking-widest">
                          {activeData.specs.status}
                        </p>
                      </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                      <div className="lg:col-span-8">

                        {activeData.details && activeData.details.length > 0 && (
                          <section className="mb-16">
                            <h2 className="text-[10px] text-[#C8A84B] uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                              <span className="w-2 h-2 bg-[#C8A84B]"></span>
                              OPERATIONAL_RECORDS
                            </h2>
                            <div className="space-y-8">
                              {activeData.details.map((detail, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 + idx * 0.1 }}
                                  className="border-l border-[#2a2a2a] pl-6 relative"
                                >
                                  <div className="absolute left-[-4px] top-2 w-2 h-2 bg-[#1a1a1a] border border-[#2a2a2a]"></div>
                                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                    <h3 className="text-lg font-bold text-[#e8e6e0] tracking-wide">{detail.title}</h3>
                                    {detail.date && <span className="text-[10px] text-[#C8A84B] uppercase tracking-widest">{detail.date}</span>}
                                  </div>
                                  {detail.subtitle && <p className="text-sm text-[#888] mb-3 uppercase tracking-widest">{detail.subtitle}</p>}
                                  {detail.description && <p className="text-sm text-[#a8a59b] leading-relaxed">{detail.description}</p>}
                                  {detail.link && (
                                    <a href={detail.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[10px] text-[#C8A84B] uppercase tracking-widest border border-[#C8A84B]/30 px-4 py-2 hover:bg-[#C8A84B]/10 transition-colors">
                                      ACCESS_LINK ↗
                                    </a>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </section>
                        )}

                        {activeData.bullets && activeData.bullets.length > 0 && (
                          <section className="mb-16">
                            <h2 className="text-[10px] text-[#C8A84B] uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                              <span className="w-2 h-2 bg-[#C8A84B]"></span>
                              DATA_POINTS
                            </h2>
                            <ul className="space-y-4">
                              {activeData.bullets.map((bullet, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + idx * 0.1 }}
                                  className="flex items-start gap-4 text-[#a8a59b] leading-relaxed text-sm"
                                >
                                  <span className="text-[#C8A84B] mt-1">►</span>
                                  <span>{bullet}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </section>
                        )}

                        {activeData.links && activeData.links.length > 0 && (
                          <section className="mb-16">
                            <h2 className="text-[10px] text-[#C8A84B] uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                              <span className="w-2 h-2 bg-[#C8A84B]"></span>
                              EXTERNAL_CONNECTIONS
                            </h2>
                            <div className="flex flex-col gap-4">
                              {activeData.links.map((link, idx) => (
                                <motion.a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 + idx * 0.1 }}
                                  className="border border-[#2a2a2a] p-4 flex justify-between items-center group hover:border-[#C8A84B]/50 hover:bg-[#0a0a0a] transition-all"
                                >
                                  <span className="text-[#e8e6e0] font-mono tracking-widest text-sm group-hover:text-[#C8A84B] transition-colors">{link.label}</span>
                                  <span className="text-[#444] group-hover:text-[#C8A84B] transition-colors">↗</span>
                                </motion.a>
                              ))}
                            </div>
                          </section>
                        )}


                      </div>

                      <div className="lg:col-span-4 space-y-12">
                        <section className="p-8 border border-[#2a2a2a] bg-[#080808]/80 backdrop-blur-sm">
                          <h2 className="text-[10px] text-[#C8A84B] uppercase tracking-[0.4em] mb-8">ENGINEERING_SPECS</h2>
                          <div className="space-y-6">
                            {Object.entries(activeData.specs).slice(0, 3).map(([key, val]) => (
                              <div key={key} className="flex justify-between border-b border-[#1a1a1a] pb-3">
                                <span className="text-[11px] text-[#6b6965] tracking-widest">{key.toUpperCase()}</span>
                                <span className="text-[11px] font-bold uppercase text-[#c8c2b4]">{val}</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="p-8 border border-[#1a1a1a]">
                          <h2 className="text-[10px] text-[#6b6965] uppercase tracking-[0.4em] mb-8">NODE_CONNECTIONS</h2>
                          <div className="flex flex-wrap gap-3">
                            {activeData.connections.map(conn => (
                              <span key={conn} className="text-[10px] text-[#C8A84B] px-4 py-2 border border-[#C8A84B]/20 uppercase tracking-widest bg-[#C8A84B]/5">
                                {conn}
                              </span>
                            ))}
                          </div>
                        </section>
                      </div>
                    </div>

                    <footer className="mt-24 pt-8 border-t border-[#1a1a1a] text-[#333] text-[10px] tracking-[0.5em] uppercase flex justify-between">
                      <p>KELD URBAN PLANNING AUTHORITY · SECURE_DOCS</p>
                      <p>REF: {activeDistrict.toUpperCase()}_PROTO_001</p>
                    </footer>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : viewState === 'full-spec' ? (
          <motion.div
            key="full-spec-view"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto bg-[#050505] border border-[#2a2a2a] relative z-50 overflow-hidden h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-bg" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            <header className="sticky top-0 z-20 bg-[#050505]/90 backdrop-blur-md border-b border-[#2a2a2a] px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-[#C8A84B] tracking-[0.4em] font-bold text-lg uppercase">FULL_SPEC_MODE</h2>
                <p className="text-[10px] text-[#6b6965] tracking-widest uppercase mt-1">ALL SYSTEMS ACTIVE</p>
              </div>
              <button
                onClick={() => setViewState('map')}
                className="text-[#6b6965] hover:text-[#C8A84B] transition-colors flex items-center gap-2 border border-[#1a1a1a] px-4 py-2 bg-black"
              >
                <span className="text-lg leading-none -mt-[2px] opacity-50">◂</span> RETURN TO MAP
              </button>
            </header>

            <div className="flex-1 relative z-10 flex gap-12 max-w-6xl mx-auto w-full px-8 md:px-12 overflow-hidden">

              {/* Left Sidebar Table of Contents */}
              <div className="hidden lg:block w-48 shrink-0 py-12">
                <div className="space-y-4">
                  <p className="text-[#C8A84B] text-[10px] tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#C8A84B]"></span>
                    DIRECTORY_INDEX
                  </p>
                  {['core', 'surface', 'proving', 'archives', 'load', 'transmission', 'classified'].map(id => {
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={`nav-${id}`}
                        className="flex items-center gap-3 group cursor-pointer w-full text-left"
                        onClick={() => {
                          document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        <div className={`w-1 h-1 transition-all duration-300 ${isActive ? 'bg-[#C8A84B] shadow-[0_0_8px_#C8A84B]' : 'bg-[#2a2a2a] group-hover:bg-[#C8A84B]/50'}`}></div>
                        <span
                          className={`text-[10px] tracking-widest uppercase transition-all duration-300 ${isActive ? 'text-[#C8A84B] font-bold' : 'text-[#6b6965] group-hover:text-[#c8c2b4]'}`}
                          style={{ textShadow: isActive ? '0 0 8px rgba(200, 168, 75, 0.4)' : 'none' }}
                        >
                          {DATA[id as DistrictID].name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Content Area */}
              <div id="scroll-container" onScroll={handleSpecScroll} className="flex-1 overflow-y-auto scrollbar-hide space-y-32 pb-32 pt-12 pr-4 relative">
                {['core', 'surface', 'proving', 'archives', 'load', 'transmission', 'classified'].map((districtId) => {
                  const data = DATA[districtId as DistrictID];
                  return (
                    <motion.section
                      id={`section-${districtId}`}
                      key={districtId}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="relative border-t border-[#1a1a1a] pt-12"
                    >
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C8A84B]"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C8A84B]"></div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-4">
                          <span className="text-[#C8A84B] tracking-[0.4em] uppercase text-[10px] mb-2 block">{data.code}</span>
                          <h3 className="text-2xl font-black tracking-tighter uppercase text-[#e8e6e0]">{data.name}</h3>
                        </div>

                        <div className="md:col-span-8">
                          {data.desc && <p className="text-sm leading-[1.8] text-[#a8a59b] font-light mb-8">{data.desc}</p>}

                          {data.details && data.details.length > 0 && (
                            <div className="space-y-8 mb-8">
                              {data.details.map((detail, idx) => (
                                <div key={idx} className="border-l border-[#2a2a2a] pl-6 relative hover:border-[#C8A84B]/30 transition-colors">
                                  <div className="absolute left-[-4px] top-2 w-2 h-2 bg-[#1a1a1a] border border-[#2a2a2a]"></div>
                                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                    <h4 className="text-lg font-bold text-[#C8A84B] tracking-wide">{detail.title}</h4>
                                    {detail.date && <span className="text-[10px] text-[#6b6965] uppercase tracking-widest">{detail.date}</span>}
                                  </div>
                                  {detail.subtitle && <p className="text-sm text-[#888] mb-3 uppercase tracking-widest">{detail.subtitle}</p>}
                                  {detail.description && <p className="text-sm text-[#a8a59b] leading-relaxed">{detail.description}</p>}
                                  {detail.link && (
                                    <a href={detail.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[10px] text-[#C8A84B] uppercase tracking-widest border border-[#C8A84B]/30 px-4 py-2 hover:bg-[#C8A84B]/10 transition-colors">
                                      ACCESS_LINK ↗
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {data.bullets && data.bullets.length > 0 && (
                            <ul className="space-y-4 mb-8">
                              {data.bullets.map((bullet, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-[#a8a59b] leading-relaxed text-sm">
                                  <span className="text-[#C8A84B] mt-1 text-[10px]">►</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {data.links && data.links.length > 0 && (
                            <div className="flex flex-col gap-4">
                              {data.links.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="border border-[#2a2a2a] p-4 flex justify-between items-center hover:border-[#C8A84B]/50 hover:bg-[#0a0a0a] transition-all max-w-xl group"
                                >
                                  <span className="text-[#e8e6e0] font-mono tracking-widest text-sm group-hover:text-[#C8A84B] transition-colors">{link.label}</span>
                                  <span className="text-[#444] group-hover:text-[#C8A84B] transition-colors">↗</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
