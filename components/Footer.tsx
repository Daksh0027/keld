import { about } from "../content/about";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-[var(--color-keld-border)] py-8 mt-24">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)]">
          KELD · City of Constructed Systems · Built by {about.name} · {currentYear}
        </p>
      </div>
    </footer>
  );
}
