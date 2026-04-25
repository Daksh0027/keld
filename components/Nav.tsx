"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { id: "archives", label: "THE ARCHIVES" },
  { id: "load-district", label: "THE LOAD DISTRICT" },
  { id: "surface-works", label: "THE SURFACE WORKS" },
  { id: "proving-ground", label: "THE PROVING GROUND" },
  { id: "transmission-office", label: "THE TRANSMISSION OFFICE" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-keld-bg)] border-b border-[var(--color-keld-border)]">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-12 py-3 md:py-0">
        <div className="flex items-center justify-between">
          <a href="#keld" className="text-[13px] uppercase tracking-wider text-[var(--color-keld-muted)] hover:text-[var(--color-keld-text)] transition-colors">
            KELD
          </a>
          <button
            className="md:hidden text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] hover:text-[var(--color-keld-text)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            [MENU]
          </button>
        </div>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row mt-4 md:mt-0 gap-3 md:gap-4`}
        >
          {navLinks.map((link, index) => (
            <div key={link.id} className="flex items-center gap-4">
              {index > 0 && <span className="hidden md:inline text-[var(--color-keld-muted)]">·</span>}
              <a
                href={`#${link.id}`}
                className={`text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  activeSection === link.id
                    ? "text-[var(--color-keld-text)]"
                    : "text-[var(--color-keld-muted)] hover:text-[var(--color-keld-text)]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
