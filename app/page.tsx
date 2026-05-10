"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

const AnimatedHeroName = ({ hasEntered }: { hasEntered: boolean }) => {
  const [scanPos, setScanPos] = useState(-1);

  useEffect(() => {
    if (!hasEntered) return;
    
    // Initial delay before starting the scan
    const startTimer = setTimeout(() => {
      setScanPos(0);
    }, 800); // 800ms gives time for the portfolio to settle

    return () => clearTimeout(startTimer);
  }, [hasEntered]);

  useEffect(() => {
    if (scanPos >= 0 && scanPos <= 13) {
      const timer = setTimeout(() => {
        setScanPos(p => p + 1);
      }, 80); // 80ms per character
      return () => clearTimeout(timer);
    }
  }, [scanPos]);

  return (
    <h1 className="hero-name">
      {scanPos >= 0 && scanPos <= 5 ? (
        <>{ "DAKSH".slice(0, scanPos) }<span className="text-[var(--accent)]">_</span>{ "DAKSH".slice(scanPos) }</>
      ) : (
        "DAKSH"
      )}
      <br/>
      {scanPos >= 6 && scanPos <= 13 ? (
        <>{ "SHASTRI".slice(0, scanPos - 6) }<span className="text-[var(--accent)]">_</span>{ "SHASTRI".slice(scanPos - 6) }</>
      ) : (
        "SHASTRI"
      )}
      <span className="blink">|</span>
    </h1>
  );
};

export default function Portfolio() {
  const router = useRouter();
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Hide overflow during the entire intro and transition phase
    document.body.style.overflow = 'hidden';

    // Automatically transition to portfolio after animation completes
    const timer1 = setTimeout(() => {
      setHasEntered(true);
    }, 4800);

    // Restore overflow after the portfolio entrance animation completes
    const timer2 = setTimeout(() => {
      document.body.style.overflow = '';
    }, 4800 + 1600); // 4.8s intro + 1.6s portfolio transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    
    let io: IntersectionObserver;
    let secIO: IntersectionObserver;
    let initTimer: NodeJS.Timeout;

    const initObservers = () => {
      const fadeElements = document.querySelectorAll('.fade-in');
      if (fadeElements.length === 0) {
        initTimer = setTimeout(initObservers, 50);
        return;
      }

      const sections = ['#hero','#about','#experience','#projects','#stack','#education','#certs','#contact'];
      const dots = document.querySelectorAll('.dot');
      const mapBtn = document.getElementById('map-btn');

      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if(e.isIntersecting){
            e.target.classList.add('visible');
          }
        });
      }, {threshold: 0.1});
      
      fadeElements.forEach(el => io.observe(el));

      secIO = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if(e.isIntersecting){
            const idx = sections.indexOf('#' + e.target.id);
            if(idx >= 0) {
              dots.forEach((d, i) => d.classList.toggle('active', i === idx))
            }
          }
        });
      }, {threshold: 0.3});
      
      sections.forEach(s => {
        const el = document.querySelector(s);
        if (el) secIO.observe(el);
      });

      const handleScroll = () => {
        if (mapBtn) {
          mapBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.8);
        }
      };

      window.addEventListener('scroll', handleScroll, {passive: true});
      (window as any)._keldScrollHandler = handleScroll;
    };

    initObservers();

    return () => {
      clearTimeout(initTimer);
      if ((window as any)._keldScrollHandler) {
        window.removeEventListener('scroll', (window as any)._keldScrollHandler);
        delete (window as any)._keldScrollHandler;
      }
      if (io) io.disconnect();
      if (secIO) secIO.disconnect();
    };
  }, [hasEntered]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <AnimatePresence mode="wait">
      {!hasEntered ? (
        <motion.div
          key="intro"
          className="flex flex-col items-center justify-center min-h-screen relative w-full bg-[#0c0c0c] font-mono text-[var(--keld-text)] overflow-hidden"
          exit={{ opacity: 0, scale: 1.5, filter: "blur(20px) brightness(2)" }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          <div className="crt-overlay" />
          <div className="crt-scanlines" />
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-100">
            <Silk speed={0.8} scale={0.8} color="#1c231a" noiseIntensity={0.2} rotation={4.8} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center relative z-10"
          >
            <h1 className="text-[48px] md:text-[64px] font-medium tracking-[0.3em] mb-6 text-[#c8c2b4]">KELD</h1>
            <p className="text-[13px] md:text-[15px] tracking-[0.15em] text-[#6b6965] mb-16 uppercase max-w-lg mx-auto leading-[2]">
              A planned city built entirely by one engineer. <br />
              Every district is a system. <br />
              Every system is load-bearing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="relative z-10 w-full max-w-[240px] mt-4 mx-auto"
          >
            <div className="flex justify-between text-[#6b6965] text-[10px] tracking-widest mb-3 uppercase">
              <span>Establishing uplink</span>
              <span className="blink">_</span>
            </div>
            <div className="h-[2px] w-full bg-[#1a1a1a] relative overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, delay: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-[#C8A84B] shadow-[0_0_10px_#C8A84B]"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full relative"
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
            * { margin:0; padding:0; box-sizing:border-box; }
            :root {
              --bg:#080c0a;
              --bg2:#0e1410;
              --bg3:#131a15;
              --accent:#4eff91;
              --accent2:#00c45a;
              --muted:#3a4a3f;
              --text:#e8f0ea;
              --text2:#8a9e8f;
              --text3:#4a5e50;
              --border:#1e2e22;
              --border2:#2a3e2f;
              --mono:'JetBrains Mono',monospace;
              --sans:'Space Grotesk',sans-serif;
            }
            html { scroll-behavior:smooth; }
            body { background:var(--bg); color:var(--text); font-family:var(--sans); overflow-x:hidden; min-height:100vh; }

            /* GRID OVERLAY */
            body::before {
              content:''; position:fixed; inset:0;
              background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);
              background-size:60px 60px;
              opacity:0.35; pointer-events:none; z-index:0;
            }

            section { position:relative; z-index:1; }

            /* ── HERO ── */
            #hero {
              min-height:100vh; display:flex; flex-direction:column; justify-content:center;
              padding:4rem 3rem; border-bottom:1px solid var(--border2);
            }
            .hero-tag { font-family:var(--mono); font-size:11px; color:var(--accent); letter-spacing:3px; text-transform:uppercase; margin-bottom:2rem; display:flex; align-items:center; gap:8px; }
            .hero-tag::before { content:''; width:24px; height:1px; background:var(--accent); }
            .hero-name { font-family:var(--mono); font-size:clamp(3rem,8vw,6rem); font-weight:700; line-height:0.95; color:var(--text); letter-spacing:-2px; margin-bottom:1.5rem; }
            .hero-name span { color:var(--accent); }
            .hero-sub { font-size:1rem; color:var(--text2); max-width:480px; line-height:1.7; margin-bottom:2.5rem; font-weight:300; }
            .hero-chips { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:3rem; }
            .chip { font-family:var(--mono); font-size:10px; letter-spacing:1px; padding:5px 12px; border:1px solid var(--border2); color:var(--text2); text-transform:uppercase; }
            .hero-scroll { display:flex; align-items:center; gap:12px; font-family:var(--mono); font-size:11px; color:var(--text3); cursor:pointer; text-transform:uppercase; letter-spacing:2px; transition:color 0.2s; }
            .hero-scroll:hover { color:var(--accent); }
            .scroll-line { width:40px; height:1px; background:var(--text3); transition:background 0.2s; }
            .hero-scroll:hover .scroll-line { background:var(--accent); }
            .blink { animation:blink 1s step-end infinite; }
            @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

            /* STATUS ROW */
            .status-row { display:flex; gap:2rem; margin-bottom:3rem; flex-wrap:wrap; }
            .stat { display:flex; flex-direction:column; gap:4px; }
            .stat-label { font-family:var(--mono); font-size:9px; color:var(--text3); text-transform:uppercase; letter-spacing:2px; }
            .stat-val { font-family:var(--mono); font-size:13px; color:var(--text); }
            .stat-val.green { color:var(--accent); }

            /* ── SECTION HEADER ── */
            .sec-header { display:flex; align-items:center; gap:16px; margin-bottom:3rem; }
            .sec-code { font-family:var(--mono); font-size:10px; color:var(--accent); letter-spacing:3px; text-transform:uppercase; }
            .sec-title { font-family:var(--mono); font-size:1.5rem; font-weight:700; color:var(--text); }
            .sec-line { flex:1; height:1px; background:var(--border2); }

            /* ── ABOUT ── */
            #about { padding:5rem 3rem; border-bottom:1px solid var(--border2); }
            .about-content { max-width: 800px; }
            .about-text { font-size:1rem; line-height:1.8; color:var(--text2); font-weight:300; }
            .about-text p { margin-bottom:1rem; }
            .about-text strong { color:var(--text); font-weight:500; }

            /* ── EXPERIENCE ── */
            #experience { padding:5rem 3rem; border-bottom:1px solid var(--border2); }
            .exp-card { border:1px solid var(--border2); padding:2rem; position:relative; margin-bottom:1px; transition:border-color 0.2s; }
            .exp-card:hover { border-color:var(--accent2); }
            .exp-card::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--accent); opacity:0; }
            .exp-card:hover::before { opacity:1; }
            .exp-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; gap:1rem; flex-wrap:wrap; }
            .exp-title { font-size:1rem; font-weight:500; color:var(--text); }
            .exp-date { font-family:var(--mono); font-size:10px; color:var(--accent); letter-spacing:1px; white-space:nowrap; }
            .exp-company { font-family:var(--mono); font-size:11px; color:var(--text2); letter-spacing:1px; margin-bottom:0.5rem; }
            .exp-desc { font-size:0.875rem; color:var(--text2); line-height:1.6; }

            /* ── PROJECTS ── */
            #projects { padding:5rem 3rem; border-bottom:1px solid var(--border2); }
            .proj-grid { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--border2); }
            .proj-card { background:var(--bg); padding:2rem; position:relative; overflow:hidden; transition:background 0.2s; cursor:pointer; }
            .proj-card:hover { background:var(--bg3); }
            .proj-num { font-family:var(--mono); font-size:10px; color:var(--text3); letter-spacing:2px; margin-bottom:1rem; }
            .proj-name { font-size:1.1rem; font-weight:500; color:var(--text); margin-bottom:0.75rem; line-height:1.3; }
            .proj-desc { font-size:0.8rem; color:var(--text2); line-height:1.6; margin-bottom:1.5rem; font-weight:300; }
            .proj-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:1rem; }
            .proj-tag { font-family:var(--mono); font-size:9px; padding:3px 8px; border:1px solid var(--border2); color:var(--text3); text-transform:uppercase; letter-spacing:1px; }
            .proj-link { font-family:var(--mono); font-size:10px; color:var(--accent); text-decoration:none; letter-spacing:1px; text-transform:uppercase; display:flex; align-items:center; gap:6px; }
            .proj-link:hover { color:var(--text); }
            .proj-date { font-family:var(--mono); font-size:9px; color:var(--text3); margin-bottom:0.5rem; letter-spacing:1px; }
            .proj-corner { position:absolute; top:1rem; right:1rem; width:6px; height:6px; border-top:1px solid var(--accent); border-right:1px solid var(--accent); opacity:0; transition:opacity 0.2s; }
            .proj-card:hover .proj-corner { opacity:1; }

            /* ── STACK ── */
            #stack { padding:5rem 3rem; border-bottom:1px solid var(--border2); }
            .stack-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1px; background:var(--border2); }
            .stack-block { background:var(--bg); padding:1.75rem; }
            .stack-cat { font-family:var(--mono); font-size:9px; color:var(--text3); text-transform:uppercase; letter-spacing:3px; margin-bottom:1rem; }
            .stack-items { display:flex; flex-direction:column; gap:6px; }
            .stack-item { font-family:var(--mono); font-size:12px; color:var(--text2); display:flex; align-items:center; gap:8px; }
            .stack-item::before { content:''; width:4px; height:4px; background:var(--accent); flex-shrink:0; }

            /* ── EDUCATION ── */
            #education { padding:5rem 3rem; border-bottom:1px solid var(--border2); }
            .edu-list { display:flex; flex-direction:column; gap:1px; }
            .edu-row { display:flex; align-items:flex-start; gap:2rem; padding:1.5rem 0; border-bottom:1px solid var(--border); }
            .edu-year { font-family:var(--mono); font-size:11px; color:var(--text3); min-width:80px; padding-top:2px; }
            .edu-content { flex:1; }
            .edu-title { font-size:0.95rem; font-weight:500; color:var(--text); margin-bottom:4px; }
            .edu-sub { font-family:var(--mono); font-size:11px; color:var(--text2); }
            .edu-extra { font-family:var(--mono); font-size:10px; color:var(--accent); margin-top:4px; }

            /* ── CERTIFICATIONS ── */
            #certs { padding:5rem 3rem; border-bottom:1px solid var(--border2); }
            .certs-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; }
            .cert-item { border-left:1px solid var(--border2); padding-left:1.5rem; margin-bottom:1.5rem; }
            .cert-title { font-size:0.9rem; color:var(--text); font-weight:500; margin-bottom:4px; }
            .cert-sub { font-family:var(--mono); font-size:10px; color:var(--text2); margin-bottom:4px; letter-spacing:1px; }
            .cert-date { font-family:var(--mono); font-size:10px; color:var(--text3); }
            .bullets-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
            .bullets-list li { font-family:var(--mono); font-size:12px; color:var(--text2); display:flex; align-items:flex-start; gap:10px; line-height:1.5; }
            .bullets-list li::before { content:'>'; color:var(--accent); flex-shrink:0; margin-top:1px; }
            .col-title { font-family:var(--mono); font-size:10px; color:var(--text3); text-transform:uppercase; letter-spacing:3px; margin-bottom:1.5rem; }

            /* ── CONTACT ── */
            #contact { padding:5rem 3rem; min-height:50vh; }
            .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; }
            .contact-tagline { font-size:2rem; font-weight:500; line-height:1.2; color:var(--text); margin-bottom:1rem; font-family:var(--mono); }
            .contact-tagline span { color:var(--accent); }
            .contact-sub { font-size:0.9rem; color:var(--text2); line-height:1.7; margin-bottom:2rem; }
            .contact-links { display:flex; flex-direction:column; gap:0; }
            .contact-link { display:flex; align-items:center; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border); text-decoration:none; transition:color 0.2s; group:true; }
            .contact-link:first-of-type { border-top:1px solid var(--border); }
            .contact-link-label { font-family:var(--mono); font-size:12px; color:var(--text2); text-transform:uppercase; letter-spacing:1px; transition:color 0.2s; }
            .contact-link-url { font-family:var(--mono); font-size:11px; color:var(--text3); transition:color 0.2s; }
            .contact-link:hover .contact-link-label { color:var(--accent); }
            .contact-link:hover .contact-link-url { color:var(--text2); }
            .contact-arr { color:var(--text3); font-size:16px; transition:transform 0.2s,color 0.2s; }
            .contact-link:hover .contact-arr { transform:translate(3px,-3px); color:var(--accent); }

            /* ── FLOAT MAP BUTTON ── */
            #map-btn {
              position:fixed; bottom:2rem; right:2rem; z-index:100;
              background:var(--bg2); border:1px solid var(--accent);
              color:var(--accent); font-family:var(--mono); font-size:11px; letter-spacing:2px; text-transform:uppercase;
              padding:12px 20px; cursor:pointer; display:flex; align-items:center; gap:8px;
              opacity:0; transform:translateY(20px); transition:all 0.3s; pointer-events:none;
            }
            #map-btn.visible { opacity:1; transform:translateY(0); pointer-events:auto; }
            #map-btn:hover { background:var(--accent); color:var(--bg); }
            #map-btn::before { content:'⬡'; font-size:14px; }

            /* ── NAV DOTS ── */
            #nav-dots { position:fixed; right:1.5rem; top:50%; transform:translateY(-50%); z-index:50; display:flex; flex-direction:column; gap:10px; }
            .dot { width:6px; height:6px; border-radius:50%; background:var(--text3); cursor:pointer; transition:all 0.3s; }
            .dot.active { background:var(--accent); transform:scale(1.5); }

            /* FADE IN */
            .fade-in { opacity:0; transform:translateY(20px); transition:opacity 0.6s ease,transform 0.6s ease; }
            .fade-in.visible { opacity:1; transform:translateY(0); }

            @media(max-width:600px){
              #hero,#about,#experience,#projects,#stack,#education,#certs,#contact { padding:3rem 1.5rem; }
              .proj-grid,.certs-grid,.contact-grid { grid-template-columns:1fr; }
              .hero-name { font-size:2.5rem; }
              #nav-dots { display:none; }
            }
          `}} />
          
          <nav id="nav-dots">
            <div className="dot active" onClick={() => scrollTo('#hero')} title="Home"></div>
            <div className="dot" onClick={() => scrollTo('#about')} title="About"></div>
            <div className="dot" onClick={() => scrollTo('#experience')} title="Experience"></div>
            <div className="dot" onClick={() => scrollTo('#projects')} title="Projects"></div>
            <div className="dot" onClick={() => scrollTo('#stack')} title="Stack"></div>
            <div className="dot" onClick={() => scrollTo('#education')} title="Education"></div>
            <div className="dot" onClick={() => scrollTo('#certs')} title="Certs"></div>
            <div className="dot" onClick={() => scrollTo('#contact')} title="Contact"></div>
          </nav>

          <button id="map-btn" onClick={() => router.push('/map')}>View City Map</button>

          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8, rotateX: 45, y: 100 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="w-full relative"
          >
            {/* HERO */}
      <section id="hero">
        <div className="hero-tag">Portfolio · v2025</div>
        <AnimatedHeroName hasEntered={hasEntered} />
        <p className="hero-sub">Full-stack engineer and competitive programmer building load-bearing systems. Based in Delhi.</p>
        <div className="status-row">
          <div className="stat"><span className="stat-label">Status</span><span className="stat-val green">● Active</span></div>
          <div className="stat"><span className="stat-label">Role</span><span className="stat-val">Frontend Dev Intern</span></div>
          <div className="stat"><span className="stat-label">Rank</span><span className="stat-val">CF Pupil</span></div>
          <div className="stat"><span className="stat-label">Location</span><span className="stat-val">Delhi, India</span></div>
        </div>
        <div className="hero-chips">
          <div className="chip">React</div>
          <div className="chip">Node.js</div>
          <div className="chip">C++</div>
          <div className="chip">Python</div>
          <div className="chip">Full-Stack</div>
          <div className="chip">AI</div>
        </div>
        <div className="hero-scroll" onClick={() => scrollTo('#about')}>
          <div className="scroll-line"></div>
          Scroll to explore
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="sec-header fade-in">
          <span className="sec-code">01 · CORE</span>
          <h2 className="sec-title">The Operator</h2>
          <div className="sec-line"></div>
        </div>
        <div className="about-content fade-in">
          <div className="about-text">
            <p>Information Technology undergraduate at <strong>Bhagwan Parshuram Institute of Technology</strong> and an active competitive programmer based in Delhi.</p>
            <p>Currently working as a <strong>Front-End Development Intern</strong> at Shree Ji Facility Services, bridging the gap between algorithmic problem-solving and full-stack application architecture.</p>
            <p>Seeking to apply a diverse skill set spanning <strong>React, Node.js, and C++</strong> to solve complex technical challenges, contribute to impactful projects, and continually level up as a software engineer.</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec-header fade-in">
          <span className="sec-code">02 · SURFACE</span>
          <h2 className="sec-title">Operational History</h2>
          <div className="sec-line"></div>
        </div>
        <div className="fade-in">
          <div className="exp-card">
            <div className="exp-top">
              <span className="exp-title">Front End Development Intern</span>
              <span className="exp-date">May 2026 – Present</span>
            </div>
            <div className="exp-company">SHREE JI FACILITY SERVICES · Delhi</div>
            <div className="exp-desc">Building and maintaining frontend systems. Bridging algorithmic problem-solving with real-world full-stack application architecture in a professional environment.</div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="sec-header fade-in">
          <span className="sec-code">03 · PROVING</span>
          <h2 className="sec-title">Classified Research</h2>
          <div className="sec-line"></div>
        </div>
        <div className="proj-grid fade-in">
          <div className="proj-card" onClick={() => window.open('https://respectro.vercel.app/', '_blank')}>
            <div className="proj-corner"></div>
            <div className="proj-num">PRJ-001</div>
            <div className="proj-date">Aug 2025 – Feb 2026</div>
            <div className="proj-name">ReSpectro · Movie Streaming Platform</div>
            <div className="proj-desc">A responsive movie and TV series discovery app built in React and Vite. Integrated with TMDB API for real-time data, Clerk for user authentication, and Appwrite as backend for personalization tracking.</div>
            <div className="proj-tags">
              <span className="proj-tag">React</span><span className="proj-tag">Vite</span><span className="proj-tag">Appwrite</span><span className="proj-tag">TMDB API</span>
            </div>
            <a className="proj-link" href="https://respectro.vercel.app/" target="_blank" rel="noopener noreferrer">→ Live Demo</a>
          </div>
          <div className="proj-card" onClick={() => window.open('https://bot-clone.netlify.app/', '_blank')}>
            <div className="proj-corner"></div>
            <div className="proj-num">PRJ-002</div>
            <div className="proj-date">Feb 2025 – Present</div>
            <div className="proj-name">Gemini Clone · AI Agent</div>
            <div className="proj-desc">A frontend clone of Google Gemini's UI with clean design and full responsiveness. Actually usable — powered by Gemini's API. Built in React with minimal but polished CSS.</div>
            <div className="proj-tags">
              <span className="proj-tag">React</span><span className="proj-tag">Gemini API</span><span className="proj-tag">CSS</span>
            </div>
            <a className="proj-link" href="https://bot-clone.netlify.app/" target="_blank" rel="noopener noreferrer">→ Live Demo</a>
          </div>
          <div className="proj-card">
            <div className="proj-corner"></div>
            <div className="proj-num">PRJ-003</div>
            <div className="proj-date">Jan 2024 – Feb 2024</div>
            <div className="proj-name">Library Management System</div>
            <div className="proj-desc">A fully scalable library management system in Python. Manages inventory and sales records for a store with an inbuilt command-line UI. Integrated with MySQL for persistent data storage.</div>
            <div className="proj-tags">
              <span className="proj-tag">Python</span><span className="proj-tag">MySQL</span><span className="proj-tag">CLI</span>
            </div>
          </div>
          <div className="proj-card" style={{background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '3px', marginBottom: '8px'}}>STATUS</div>
              <div style={{fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--accent)'}}>More incoming_</div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack">
        <div className="sec-header fade-in">
          <span className="sec-code">04 · LOAD</span>
          <h2 className="sec-title">Core Competencies</h2>
          <div className="sec-line"></div>
        </div>
        <div className="stack-grid fade-in">
          <div className="stack-block">
            <div className="stack-cat">Languages</div>
            <div className="stack-items">
              <span className="stack-item">C++</span>
              <span className="stack-item">C</span>
              <span className="stack-item">C#</span>
              <span className="stack-item">Python</span>
              <span className="stack-item">JavaScript</span>
            </div>
          </div>
          <div className="stack-block">
            <div className="stack-cat">Frontend</div>
            <div className="stack-items">
              <span className="stack-item">HTML &amp; CSS</span>
              <span className="stack-item">Tailwind CSS</span>
              <span className="stack-item">React</span>
              <span className="stack-item">Vite</span>
            </div>
          </div>
          <div className="stack-block">
            <div className="stack-cat">Backend</div>
            <div className="stack-items">
              <span className="stack-item">Node.js</span>
              <span className="stack-item">Django</span>
              <span className="stack-item">Flask</span>
            </div>
          </div>
          <div className="stack-block">
            <div className="stack-cat">Database</div>
            <div className="stack-items">
              <span className="stack-item">MySQL</span>
              <span className="stack-item">PL/SQL</span>
              <span className="stack-item">Appwrite</span>
            </div>
          </div>
          <div className="stack-block">
            <div className="stack-cat">Tools &amp; DevOps</div>
            <div className="stack-items">
              <span className="stack-item">GitHub</span>
              <span className="stack-item">Vercel</span>
              <span className="stack-item">Netlify</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="sec-header fade-in">
          <span className="sec-code">05 · ARCHIVES</span>
          <h2 className="sec-title">Academic History</h2>
          <div className="sec-line"></div>
        </div>
        <div className="edu-list fade-in">
          <div className="edu-row">
            <span className="edu-year">2024–28</span>
            <div className="edu-content">
              <div className="edu-title">B.Tech, Information Technology</div>
              <div className="edu-sub">Bhagwan Parshuram Institute of Technology</div>
            </div>
          </div>
          <div className="edu-row">
            <span className="edu-year">2024</span>
            <div className="edu-content">
              <div className="edu-title">Senior Secondary (XII) · Science</div>
              <div className="edu-sub">St. Joseph's Academy (CBSE)</div>
              <div className="edu-extra">81.60%</div>
            </div>
          </div>
          <div className="edu-row">
            <span className="edu-year">2022</span>
            <div className="edu-content">
              <div className="edu-title">Secondary (X)</div>
              <div className="edu-sub">St. Joseph's Academy (CBSE)</div>
              <div className="edu-extra">91.20%</div>
            </div>
          </div>
          <div className="edu-row">
            <span className="edu-year">Ongoing</span>
            <div className="edu-content">
              <div className="edu-title">Public Relations Associate</div>
              <div className="edu-sub">College Society</div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs">
        <div className="sec-header fade-in">
          <span className="sec-code">06 · TRANSMISSION</span>
          <h2 className="sec-title">Issued Credentials</h2>
          <div className="sec-line"></div>
        </div>
        <div className="certs-grid fade-in">
          <div>
            <div className="col-title">Certificates</div>
            <div className="cert-item">
              <div className="cert-title">Complete IP Addressing &amp; Subnetting</div>
              <div className="cert-sub">GeeksforGeeks · Online</div>
              <div className="cert-date">Jun 2025</div>
            </div>
          </div>
          <div>
            <div className="col-title">Competitive Achievements</div>
            <ul className="bullets-list">
              <li>Ranked 222 in LeetCode Weekly Contest 451</li>
              <li>Global Rank 295 in CodeChef Starters 190</li>
              <li>Ranked Pupil on Codeforces</li>
              <li>Participated in SIH'24 · Qualified to Mentor Round</li>
              <li>Placed 13th in Cyber Security CTF at MAIT</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="sec-header fade-in">
          <span className="sec-code">07 · CLASSIFIED</span>
          <h2 className="sec-title">Open Uplink</h2>
          <div className="sec-line"></div>
        </div>
        <div className="contact-grid fade-in">
          <div>
            <div className="contact-tagline">Let's build<br/><span>something.</span></div>
            <p className="contact-sub">Open to internships, projects, and full-time roles. Based in Delhi — available remotely.</p>
          </div>
          <div className="contact-links">
            <a className="contact-link" href="mailto:dakshshastri0627@gmail.com">
              <div>
                <div className="contact-link-label">Email</div>
                <div className="contact-link-url">dakshshastri0627@gmail.com</div>
              </div>
              <span className="contact-arr">↗</span>
            </a>
            <a className="contact-link" href="https://github.com/Daksh0027" target="_blank" rel="noopener noreferrer">
              <div>
                <div className="contact-link-label">GitHub</div>
                <div className="contact-link-url">Daksh0027</div>
              </div>
              <span className="contact-arr">↗</span>
            </a>
            <a className="contact-link" href="https://leetcode.com/u/Daksh0027" target="_blank" rel="noopener noreferrer">
              <div>
                <div className="contact-link-label">LeetCode</div>
                <div className="contact-link-url">Daksh0027</div>
              </div>
              <span className="contact-arr">↗</span>
            </a>
            <a className="contact-link" href="https://www.codechef.com/users/gam_pearl_90" target="_blank" rel="noopener noreferrer">
              <div>
                <div className="contact-link-label">CodeChef</div>
                <div className="contact-link-url">gam_pearl_90</div>
              </div>
              <span className="contact-arr">↗</span>
            </a>
          </div>
        </div>
        <div style={{marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
          <span style={{fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '2px'}}>KELD · CITY OF CONSTRUCTED SYSTEMS</span>
          <span style={{fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', letterSpacing: '2px'}}>DAKSH SHASTRI · 2025</span>
        </div>
      </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
