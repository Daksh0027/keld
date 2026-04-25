"use client";

import { useState } from "react";
import { about } from "../content/about";

export default function TransmissionOffice() {
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // NEXT_PUBLIC_FORM_ENDPOINT is intended for Formspree or Resend URL
    // e.g. process.env.NEXT_PUBLIC_FORM_ENDPOINT
    const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (formEndpoint) {
      fetch(formEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).catch(console.error);
    } else {
      console.log("Transmission data (Dev Mode):", data);
    }

    setRefNumber(Math.floor(1000 + Math.random() * 9000).toString());
    setSubmitted(true);
  };

  return (
    <section id="transmission-office" className="py-24">
      <div className="mb-8">
        <h2 className="text-[16px] font-medium text-[var(--color-keld-text)]">
          THE TRANSMISSION OFFICE
        </h2>
        <p className="text-[11px] text-[var(--color-keld-muted)] uppercase tracking-[0.12em] mt-1">
          Official Communications · Response within 48h
        </p>
        <hr className="border-t border-[var(--color-keld-border)] mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
        {/* Left — Transmission form */}
        <div className="order-2 lg:order-1">
          {submitted ? (
            <div className="border border-[var(--color-keld-border)] bg-[var(--color-keld-surface)] p-6 space-y-4">
              <h3 className="text-[13px] text-[var(--color-keld-text)] font-medium">
                TRANSMISSION RECEIVED
              </h3>
              <p className="text-[13px] text-[var(--color-keld-muted)]">
                Ref: KLD-TX-{refNumber}
                <br />
                Expected response: within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="designation" className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] mb-1.5">
                  DESIGNATION
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  required
                  placeholder="Your name"
                  className="w-full bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)] rounded-none px-3 py-3 text-[13px] text-[var(--color-keld-text)] font-mono focus:border-[var(--color-keld-accent)] transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="channel" className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] mb-1.5">
                  TRANSMISSION CHANNEL
                </label>
                <input
                  type="email"
                  id="channel"
                  name="channel"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)] rounded-none px-3 py-3 text-[13px] text-[var(--color-keld-text)] font-mono focus:border-[var(--color-keld-accent)] transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="purpose" className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] mb-1.5">
                  PURPOSE
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  required
                  className="w-full bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)] rounded-none px-3 py-3 text-[13px] text-[var(--color-keld-text)] font-mono focus:border-[var(--color-keld-accent)] transition-colors appearance-none"
                >
                  <option value="Collaboration">Collaboration</option>
                  <option value="Employment">Employment</option>
                  <option value="Contract work">Contract work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)] mb-1.5">
                  MESSAGE CONTENT
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="State your purpose, timeline, and constraints."
                  className="w-full bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)] rounded-none px-3 py-3 text-[13px] text-[var(--color-keld-text)] font-mono focus:border-[var(--color-keld-accent)] transition-colors resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)] rounded-none py-3 text-[13px] uppercase tracking-[0.12em] text-[var(--color-keld-text)] hover:border-[var(--color-keld-accent)] hover:text-[var(--color-keld-accent)] transition-colors"
              >
                [TRANSMIT MESSAGE →]
              </button>
            </form>
          )}
        </div>

        {/* Right — Communication protocol card */}
        <div className="order-1 lg:order-2">
          <div className="bg-[var(--color-keld-surface)] border border-[var(--color-keld-border)]">
            <div className="border-b border-[var(--color-keld-border)] p-4">
              <h3 className="text-[13px] text-[var(--color-keld-text)] font-medium">
                COMMUNICATION PROTOCOL
              </h3>
            </div>
            <div className="p-4 flex flex-col gap-3 border-b border-[var(--color-keld-border)]">
              <div className="flex">
                <span className="w-36 text-[13px] text-[var(--color-keld-muted)]">Preferred channel</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">Email</span>
              </div>
              <div className="flex">
                <span className="w-36 text-[13px] text-[var(--color-keld-muted)]">Response time</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">48h</span>
              </div>
              <div className="flex">
                <span className="w-36 text-[13px] text-[var(--color-keld-muted)]">Timezone</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">{about.timezone}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-[13px] text-[var(--color-keld-muted)]">Availability</span>
                <span className="text-[13px] text-[var(--color-keld-text)]">Open</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <span className="text-[13px] text-[var(--color-keld-muted)]">Direct channels</span>
              <div className="flex flex-col mt-2 gap-2">
                <div className="flex items-center">
                  <span className="w-24 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)]">EMAIL</span>
                  <a href={`mailto:${about.email}`} className="text-[13px] text-[var(--color-keld-text)] hover:underline transition-all">
                    [{about.email}] →
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)]">GITHUB</span>
                  <a href={about.github} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--color-keld-text)] hover:underline transition-all">
                    [{about.github.replace("https://", "")}] →
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-[11px] uppercase tracking-[0.12em] text-[var(--color-keld-muted)]">LINKEDIN</span>
                  <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--color-keld-text)] hover:underline transition-all">
                    [{about.linkedin.replace("https://", "")}] →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
