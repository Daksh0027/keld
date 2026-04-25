"use client";

import { useState } from "react";
import { projects } from "../content/projects";
import ProjectCard from "./ProjectCard";

export default function ProvingGround() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const provingProjects = projects.filter((p) => p.district === "proving-ground");

  return (
    <section id="proving-ground" className="py-24">
      <div className="mb-8">
        <h2 className="text-[16px] font-medium text-[var(--color-keld-text)]">
          THE PROVING GROUND
        </h2>
        <p className="text-[11px] text-[var(--color-keld-muted)] uppercase tracking-[0.12em] mt-1">
          Classified Research Division · {provingProjects.length} records
        </p>
        <hr className="border-t border-[var(--color-keld-border)] mt-4 mb-3" />
        <p className="text-[11px] text-[var(--color-keld-muted)] italic">
          NOTICE: Contents of this district are experimental. 
          Stability not guaranteed. Lessons catalogued by failure type.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {provingProjects.map((project) => (
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
