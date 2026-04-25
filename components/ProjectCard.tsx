"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../content/projects";

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
};

export default function ProjectCard({ project, isOpen, onToggle }: ProjectCardProps) {
  const isArchived = project.status === "ARCHIVED";

  return (
    <div className={`bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)] ${isArchived ? "opacity-60" : ""}`}>
      {/* Top Metadata Row */}
      <div className="flex items-center justify-between border-b border-[var(--color-keld-border)] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)]">
        <div className="flex gap-4">
          <span>File ref: {project.id}</span>
          <span>District: {project.district === "load" ? "Load" : project.district === "surface" ? "Surface" : "Proving"}</span>
        </div>
        <span>Status: {project.status}</span>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-[15px] font-medium text-[var(--color-keld-text)]">{project.name}</h3>
          <span className="text-[12px] text-[var(--color-keld-muted)]">{project.year}</span>
        </div>
        
        <p className="text-[13px] text-[var(--color-keld-muted)] mb-6">{project.description}</p>
        
        <div className="text-[12px] text-[var(--color-keld-muted)]">
          Stack: {project.stack.join(" · ")}
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-wrap border-t border-[var(--color-keld-border)]">
        <button
          onClick={onToggle}
          className="px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] hover:text-[var(--color-keld-text)] hover:bg-[var(--color-keld-border)] transition-colors border-r border-[var(--color-keld-border)] flex-grow sm:flex-grow-0 text-left"
        >
          {isOpen ? "[COLLAPSE REPORT ↓]" : "[READ ENGINEERING REPORT →]"}
        </button>
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] hover:text-[var(--color-keld-text)] hover:bg-[var(--color-keld-border)] transition-colors border-r border-[var(--color-keld-border)] flex-grow sm:flex-grow-0"
          >
            [VIEW SOURCE ↗]
          </a>
        )}
        {project.previewUrl && (
          <a
            href={project.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] hover:text-[var(--color-keld-text)] hover:bg-[var(--color-keld-border)] transition-colors flex-grow sm:flex-grow-0"
          >
            [VIEW LIVE ↗]
          </a>
        )}
      </div>

      {/* Expanded Engineering Report Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[var(--color-keld-border)] bg-[var(--color-keld-bg)]"
          >
            <div className="p-4 border-b border-[var(--color-keld-border)] bg-[var(--color-keld-surface)]">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-text)]">
                ENGINEERING REPORT · {project.id}
              </span>
            </div>
            
            <div className="p-4 space-y-6">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-1 mb-3">
                  Problem statement
                </h4>
                <p className="text-[13px] text-[var(--color-keld-muted)] leading-[1.6]">
                  {project.report.problem}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-1 mb-3">
                  Approach
                </h4>
                <p className="text-[13px] text-[var(--color-keld-muted)] leading-[1.6]">
                  {project.report.approach}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-1 mb-3">
                  Key decisions
                </h4>
                <ul className="text-[13px] text-[var(--color-keld-muted)] leading-[1.6] space-y-1">
                  {project.report.decisions.map((decision, idx) => (
                    <li key={idx}>· {decision}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-1 mb-3">
                  What I&apos;d change
                </h4>
                <p className="text-[13px] text-[var(--color-keld-muted)] leading-[1.6]">
                  {project.report.retrospective}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-1 mb-3">
                  Outcome
                </h4>
                <p className="text-[13px] text-[var(--color-keld-muted)] leading-[1.6]">
                  {project.report.outcome}
                </p>
              </div>

              {project.report.failureType && (
                <div>
                  <h4 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-1 mb-3">
                    Failure type
                  </h4>
                  <p className="text-[13px] text-[var(--color-keld-muted)] leading-[1.6]">
                    {project.report.failureType}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
