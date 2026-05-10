"use client";

import BlueprintMap2D from "@/components/BlueprintMap2D";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[var(--keld-text)] font-mono overflow-hidden relative">
      <div className="crt-overlay" />
      <div className="crt-scanlines" />
      <motion.div
        key="map"
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.8, rotateX: 45, y: 100 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
        className="w-full h-full flex flex-col items-center justify-center relative min-h-screen"
      >
        <div className="absolute top-8 left-8 z-[100]">
          <Link 
            href="/"
            className="text-[10px] tracking-[0.3em] text-[#6b6965] hover:text-[#C8A84B] transition-colors uppercase flex items-center gap-2 border border-[#1a1a1a] px-4 py-2 bg-black/50 backdrop-blur-sm"
          >
            <span className="text-sm leading-none -mt-[2px]">◂</span> RETURN HOME
          </Link>
        </div>
        <BlueprintMap2D />
      </motion.div>
    </main>
  );
}
