"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="keld" className="min-h-screen flex items-center pt-12 md:pt-0">
      <div className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[28px] font-medium text-[var(--color-keld-text)] mb-4"
        >
          KELD
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block bg-[var(--color-keld-stamp)] text-[var(--color-keld-stamptext)] text-[11px] uppercase tracking-[0.12em] px-[10px] py-[4px]">
            Urban designation KLD-001
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-[14px] text-[var(--color-keld-muted)] leading-[1.75] mb-12"
        >
          <p>City of Constructed Systems</p>
          <br />
          <p>A planned city built entirely by one engineer.</p>
          <p>Every district is a system. Every system is load-bearing.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#archives"
            className="inline-block border border-[var(--color-keld-border)] text-[var(--color-keld-text)] px-6 py-3 text-[13px] uppercase tracking-[0.12em] hover:border-[var(--color-keld-accent)] hover:text-[var(--color-keld-accent)] transition-colors text-center"
          >
            [ENTER KELD]
          </a>
          <a
            href="#load-district"
            className="inline-block border border-[var(--color-keld-border)] text-[var(--color-keld-text)] px-6 py-3 text-[13px] uppercase tracking-[0.12em] hover:border-[var(--color-keld-accent)] hover:text-[var(--color-keld-accent)] transition-colors text-center"
          >
            [VIEW ENGINEERING REPORTS]
          </a>
        </motion.div>
      </div>
    </section>
  );
}
