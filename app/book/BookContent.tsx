"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { tierConfig } from "@/lib/diagnostic";

const industryLabel: Record<string, string> = {
  dental: "dental practice",
  legal: "law firm",
  medical: "medical clinic",
  "home-services": "service business",
  agency: "agency",
  other: "business",
};

const systemContext: Record<string, string> = {
  "AI Front Desk": "an AI front desk that handles every call, booking, and after-hours inquiry",
  "Workflow Automation": "workflow automation that eliminates your most expensive manual processes",
  "Communication Layer": "a communication layer that responds to every lead on every channel, instantly",
  "AI Operating System": "a unified AI OS that connects and runs every part of your operation",
};

export function BookContent() {
  const params = useSearchParams();
  const score = parseInt(params.get("score") ?? "0", 10);
  const tier = (params.get("tier") ?? "high") as "high" | "medium" | "low";
  const industry = params.get("industry") ?? "";
  const name = params.get("name") ?? "";
  const email = params.get("email") ?? "";
  const primarySystem = params.get("systems") ?? "AI Front Desk";

  const cfg = tierConfig[tier];
  const biz = industryLabel[industry] ?? "business";
  const systemDesc = systemContext[primarySystem] ?? "an AI OS tailored to your operation";

  // Prefill Calendly via URL params
  const calendlyBase = "https://calendly.com/ilos-ai/demo";
  const calendlyParams = new URLSearchParams();
  if (name) calendlyParams.set("name", name);
  if (email) calendlyParams.set("email", email);
  const calendlyUrl = `${calendlyBase}${calendlyParams.toString() ? `?${calendlyParams.toString()}` : ""}`;

  const callPoints = [
    "Walk through your diagnostic results together",
    `Map the top 2–3 workflows ${primarySystem} can replace in your ${biz}`,
    "Get a rough implementation scope and investment range",
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Minimal header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/results"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            ← Back to results
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: context */}
          <div className="animate-fade-slide-up">
            {/* Score badge */}
            {score > 0 && (
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 ${cfg.bg} ${cfg.border}`}>
                <span className="text-xs font-mono font-bold text-white">{score}/100</span>
                <span className={`text-xs font-semibold ${cfg.color}`}>— {cfg.label}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {tier === "high"
                ? `Your ${biz} is ready for an AI OS.`
                : tier === "medium"
                ? `Your ${biz} has strong automation potential.`
                : `Let's map your AI opportunity.`}
            </h1>

            <p className="mt-4 text-neutral-400 leading-relaxed">
              Based on your diagnostic, we recommend starting with{" "}
              <span className="text-white font-medium">{systemDesc}</span>.
            </p>

            {/* What to expect */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
                What we&apos;ll cover in 30 minutes
              </p>
              <ul className="flex flex-col gap-3">
                {callPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0 text-blue-500">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5.5 8l2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex flex-col gap-3">
              {[
                "Free — no cost, no obligation",
                "30 minutes, video or phone",
                "Leave with a clear plan regardless",
              ].map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-neutral-500">
                  <div className="w-1 h-1 rounded-full bg-neutral-700" />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Calendly */}
          <div className="animate-fade-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="660"
                frameBorder="0"
                title="Book your strategy call"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-neutral-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-xs text-neutral-700">© {new Date().getFullYear()} ilos.ai</p>
          <a href="mailto:roy@ilos.ai" className="text-xs text-neutral-700 hover:text-neutral-400 transition-colors">
            roy@ilos.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
