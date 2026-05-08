"use client";

import { useState, useEffect } from "react";
import BlueprintMap2D from "@/components/BlueprintMap2D";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Automatically transition to map after animation completes
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 4800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--keld-text)] font-mono overflow-hidden relative">
      <div className="crt-overlay" />
      <div className="crt-scanlines" />
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="intro"
            className="flex flex-col items-center justify-center min-h-screen relative w-full"
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px) brightness(2)" }}
            transition={{ duration: 0.8, ease: "easeIn" }}
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
            key="map"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8, rotateX: 45, y: 100 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <BlueprintMap2D />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
