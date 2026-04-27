"use client";

import { useState, useEffect } from "react";
import BlueprintMap2D from "@/components/BlueprintMap2D";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the button after 2.5 seconds of intro animation
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--keld-text)] font-mono overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="intro"
            className="flex flex-col items-center justify-center min-h-screen relative w-full"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Background Animation layer */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-100">
              <Silk
                speed={0.8}
                scale={0.8}
                color="#1c231a"
                noiseIntensity={0.2}
                rotation={4.8}
              />
              <div
                className="absolute inset-0 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
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
              animate={{ opacity: showButton ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <button
                onClick={() => setHasEntered(true)}
                className={`border border-[#2a2a2a] px-10 py-5 text-[12px] md:text-[14px] uppercase tracking-[0.25em] text-[#888] hover:text-[#c8c2b4] hover:border-[#c8c2b4] transition-all duration-300 ${showButton ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                Enter Keld
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <BlueprintMap2D />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
