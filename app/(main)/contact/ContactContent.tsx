"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

const tierMessages: Record<string, string> = {
  high:   "You have high automation potential — we'll focus on immediate ROI opportunities.",
  medium: "Your responses show solid automation potential — we'll map your best starting points.",
  low:    "We'll review your responses and outline a practical path forward.",
};

const trustPoints = [
  { label: "No commitment", detail: "cancel any time" },
  { label: "No sales pressure", detail: "we'll tell you if we're not the right fit" },
  { label: "Leave with a plan", detail: "concrete next steps, regardless" },
];

export function ContactContent() {
  const params = useSearchParams();
  const score = params.get("score");
  const tier = params.get("tier") as "high" | "medium" | "low" | null;
  const hasDiagnostic = score && tier;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            Strategy Call
          </span>

          <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            See What AI Could Replace in Your Business
          </h1>

          <p className="mt-5 text-xl text-neutral-400 leading-relaxed max-w-xl mx-auto">
            In 30 minutes, we&apos;ll map what AI can automate, estimate your cost savings, and outline a clear system for your business.
          </p>

          {/* Trust bullets */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            {trustPoints.map((p) => (
              <div key={p.label} className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 shrink-0">
                  <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M4.5 7.5l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-neutral-300 font-medium">{p.label}</span>
                <span className="text-sm text-neutral-600 hidden sm:inline">— {p.detail}</span>
              </div>
            ))}
          </div>

          {/* Score personalisation badge */}
          {hasDiagnostic && (
            <div className="mt-8 inline-flex items-center gap-3 bg-blue-950/50 border border-blue-800/50 rounded-xl px-5 py-3">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-0.5">
                  Diagnostic Score: {score}/100
                </p>
                <p className="text-sm text-blue-200">
                  {tierMessages[tier] ?? tierMessages.medium}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Primary: Calendly ─────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-neutral-900">
        <div className="max-w-3xl mx-auto">

          {/* Calendly header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Book Your 30-Minute Strategy Call
            </h2>
            <p className="mt-2 text-neutral-400 text-sm leading-relaxed">
              We&apos;ll review your business, identify automation opportunities, and give you a clear implementation roadmap.
            </p>
          </div>

          {/* Diagnostic bridge note */}
          {hasDiagnostic ? (
            <div className="mb-5 flex items-start gap-2.5 bg-neutral-950/60 border border-neutral-800 rounded-lg px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-neutral-400">
                We&apos;ll pull up your diagnostic results at the start of the call and use them as our roadmap.
              </p>
            </div>
          ) : (
            <div className="mb-5 flex items-start gap-2.5 bg-neutral-950/60 border border-neutral-800 rounded-lg px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-neutral-400">
                If you&apos;ve already completed the{" "}
                <a href="/diagnostic" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                  AI diagnostic
                </a>
                , we&apos;ll review your score and map next steps during the call.
              </p>
            </div>
          )}

          {/* Calendly embed */}
          <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-950">
            <iframe
              src="https://calendly.com/roy-ilos/30min"
              width="100%"
              height="720"
              frameBorder="0"
              title="Book a strategy call with ilos.ai"
            />
          </div>

          {/* Supporting detail */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              "30 minutes",
              "Video or phone",
              "Free — no obligation",
            ].map((s) => (
              <span key={s} className="text-xs text-neutral-600 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-neutral-700 inline-block" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Secondary: Form fallback ──────────────────────────────────── */}
      <section className="py-16 px-6 bg-neutral-950">
        <div className="max-w-xl mx-auto">
          <div className="border-t border-neutral-800 pt-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-1">
              Prefer to write instead?
            </p>
            <h3 className="text-lg font-semibold text-neutral-400 mb-6">
              Not ready to book — send us your details instead
            </h3>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
