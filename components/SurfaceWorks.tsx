"use client";

import { useState } from "react";
import { projects } from "../content/projects";
import ProjectCard from "./ProjectCard";

export default function SurfaceWorks() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const surfaceProjects = projects.filter((p) => p.district === "surface");

  return (
    <section id="surface-works" className="py-24">
      <div className="mb-8">
        <h2 className="text-[16px] font-medium text-[var(--color-keld-text)]">
          THE SURFACE WORKS
        </h2>
        <p className="text-[11px] text-[var(--color-keld-muted)] uppercase tracking-[0.12em] mt-1">
          Public Interface Division · {surfaceProjects.length} systems on record
        </p>
        <hr className="border-t border-[var(--color-keld-border)] mt-4" />
      </div>

      <div className="flex flex-col gap-6">
        {surfaceProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOpen={openCardId === project.id}
            onToggle={() =>
              setOpenCardId(openCardId === project.id ? null : project.id)
            }
          />
        ))}
      </div>
    </section>
  );
}
