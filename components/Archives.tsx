import { about } from "../content/about";

export default function Archives() {
  return (
    <section id="archives" className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)]">
            <div className="border-b border-[var(--color-keld-border)] p-4">
              <h2 className="text-[13px] text-[var(--color-keld-text)] font-medium">
                BUREAU OF RECORDS
              </h2>
              <p className="text-[11px] text-[var(--color-keld-muted)] uppercase tracking-[0.12em] mt-1">
                Personnel File · KLD-P001
              </p>
            </div>
            <div className="p-4 flex flex-col gap-3 border-b border-[var(--color-keld-border)]">
              <div className="flex">
                <span className="w-24 text-[13px] text-[var(--color-keld-muted)]">Name</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">{about.name}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-[13px] text-[var(--color-keld-muted)]">Role</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">{about.role}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-[13px] text-[var(--color-keld-muted)]">Founded</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">{about.founded}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-[13px] text-[var(--color-keld-muted)]">Clearance</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">{about.clearance}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-[13px] text-[var(--color-keld-muted)]">Status</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">Available</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <span className="text-[13px] text-[var(--color-keld-muted)]">Registered systems</span>
              <div className="flex flex-wrap gap-2">
                {about.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-[var(--color-keld-border)] text-[11px] text-[var(--color-keld-text)] uppercase tracking-[0.12em] px-2 py-1"
                  >
                    ○ {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <h3 className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] border-b border-[var(--color-keld-border)] pb-2 mb-6">
            CITY LORE — FOUNDING DOCUMENT
          </h3>
          <div className="text-[14px] text-[var(--color-keld-muted)] leading-[1.75] mb-8 space-y-4">
            <p>
              Keld was not planned in a meeting. It was built one system at a time, each one solving a problem the previous one exposed. There are no decorative facades here. If a wall exists, it carries weight. If a road exists, it connects two things that need connecting.
            </p>
            <p>
              The architect of Keld does not build to impress. Impression is a side effect of precision. Every interface in this city was designed with one question in mind: does it do exactly what it promises, nothing more, nothing less?
            </p>
            <p>
              You are not a visitor. You are an inspector. Walk the districts. Read the engineering reports. The city will speak for itself.
            </p>
          </div>
          
          <hr className="border-t border-[var(--color-keld-border)] mb-6" />

          <div className="flex flex-col gap-4">
            {about.timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-[11px] text-[var(--color-keld-muted)] uppercase tracking-[0.12em] w-12 shrink-0 pt-1">
                  {item.year}
                </span>
                <div className="h-px bg-[var(--color-keld-border)] flex-grow mt-[10px] hidden sm:block mx-2" />
                <span className="text-[13px] text-[var(--color-keld-text)] leading-[1.6]">
                  {item.milestone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
