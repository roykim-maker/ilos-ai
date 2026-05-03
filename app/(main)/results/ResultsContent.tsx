"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { computeScore, formatCurrency, tierConfig, type DiagnosticAnswers } from "@/lib/diagnostic";

const systemDetails: Record<string, { why: string; impact: string }> = {
  "AI Front Desk": {
    why: "Captures missed calls, books appointments 24/7, and handles front desk workload automatically",
    impact: "Replaces 1–2 FTEs · Increases booking rate 30–50%",
  },
  "Workflow Automation": {
    why: "Eliminates manual data entry, task routing, and cross-system handoffs your team does by hand",
    impact: "Saves 15–25 hrs/week in admin overhead",
  },
  "Communication Layer": {
    why: "Responds to every lead on every channel within seconds — not hours — automatically",
    impact: "Improves lead conversion 20–40%",
  },
  "AI Operating System": {
    why: "Connects every system into a unified AI layer that routes, acts, and escalates intelligently",
    impact: "Full operational automation across the business",
  },
};

export function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = parseInt(searchParams.get("score") ?? "0", 10);
  const tier = (searchParams.get("tier") ?? "low") as "high" | "medium" | "low";
  const industry = searchParams.get("industry") ?? "";
  const goal = searchParams.get("goal") ?? "";
  const size = searchParams.get("size") ?? "";

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [displayScore, setDisplayScore] = useState(0);
  const hasAnimated = useRef(false);

  const [result] = useState(() => {
    const savedAnswers = typeof window !== "undefined"
      ? sessionStorage.getItem("diagnostic_answers")
      : null;
    const answers: Partial<DiagnosticAnswers> = savedAnswers
      ? JSON.parse(savedAnswers)
      : { industry, goal, businessSize: size };
    return computeScore(answers);
  });

  useEffect(() => {
    const unlocked = sessionStorage.getItem("diagnostic_unlocked");
    const savedName = sessionStorage.getItem("diagnostic_name");
    if (unlocked === "true" && savedName) {
      setIsUnlocked(true);
      setName(savedName);
    }
  }, []);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const target = result.score;
    const duration = 1400;
    const steps = 45;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setDisplayScore(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [result.score]);

  if (!score && !tier) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-neutral-400 mb-6">No diagnostic results found.</p>
          <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Take the Diagnostic
          </Link>
        </div>
      </div>
    );
  }

  const cfg = tierConfig[tier];

  const tierInterpretation =
    score >= 80
      ? "High automation potential — immediate ROI opportunity"
      : score >= 60
      ? "Strong opportunity — systems upgrade recommended"
      : "Foundational gaps — phased approach needed";

  const narrativeLine =
    tier === "high"
      ? "You're leaving significant operational efficiency and revenue on the table due to manual processes and missed opportunities."
      : tier === "medium"
      ? "Your responses indicate meaningful operational gaps that AI systems can close — with measurable impact on cost and throughput."
      : "Your responses suggest foundational inefficiencies. A phased AI implementation could significantly improve your operational baseline.";

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const savedAnswers = sessionStorage.getItem("diagnostic_answers");
      const answers = savedAnswers ? JSON.parse(savedAnswers) : {};

      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          score:               result.score,
          tier,
          industry,
          systems:             result.recommendedSystems,
          answers,
          estimatedSavings:    result.estimatedSavings,
          automationPotential: result.automationPotential,
        }),
      });
      if (!res.ok) throw new Error("Failed");

      const json = await res.json().catch(() => ({}));
      if (json.leadId) sessionStorage.setItem("diagnostic_lead_id", json.leadId);

      sessionStorage.setItem("diagnostic_unlocked", "true");
      sessionStorage.setItem("diagnostic_name", name);
      sessionStorage.setItem("diagnostic_email", email);
      setIsUnlocked(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleBookCall() {
    const leadId = sessionStorage.getItem("diagnostic_lead_id") ?? "";
    const params = new URLSearchParams({
      score:   String(result.score),
      tier,
      industry,
      name,
      email:   sessionStorage.getItem("diagnostic_email") ?? "",
      systems: result.recommendedSystems[0] ?? "",
      ...(leadId ? { leadId } : {}),
    });
    router.push(`/book?${params.toString()}`);
  }

  const industryLabel: Record<string, string> = {
    dental: "dental practice", legal: "law firm", medical: "medical clinic",
    "home-services": "service business", agency: "agency", other: "business",
  };
  const bizLabel = industryLabel[industry] ?? "business";

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Sticky header */}
      <div className="border-b border-neutral-800 bg-neutral-950/95 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors">← ilos.ai</Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Your Diagnostic Results</span>
          <Link href="/diagnostic" className="text-sm text-neutral-500 hover:text-white transition-colors">Retake</Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Narrative — above score */}
        <div className="text-center mb-10 animate-fade-slide-up">
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {narrativeLine}
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Your AI Opportunity Score
          </p>
        </div>

        {/* Score hero */}
        <div className="text-center mb-16 animate-fade-slide-up">
          <div className="relative inline-block">
            <div className="text-[120px] sm:text-[160px] font-bold leading-none text-white animate-count-up tabular-nums">
              {displayScore}
            </div>
            <div className="absolute top-4 -right-10 text-3xl font-bold text-neutral-600">/100</div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mt-4 ${cfg.bg} ${cfg.border}`}>
            <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
          </div>

          <p className={`mt-2 text-sm font-medium ${cfg.color} opacity-80`}>
            {tierInterpretation}
          </p>
        </div>

        {/* Gated content */}
        <div className="relative">
          {!isUnlocked && (
            <div className="select-none pointer-events-none blur-sm opacity-40 mb-[-2px]">
              <FullResults result={result} tier={tier} bizLabel={bizLabel} />
            </div>
          )}

          {isUnlocked && (
            <div className="animate-fade-slide-up">
              <FullResults result={result} tier={tier} bizLabel={bizLabel} />
            </div>
          )}

          {/* Email gate */}
          {!isUnlocked && (
            <div className="relative -mt-64 z-10 animate-fade-slide-up">
              <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-1">
                  Get Your Full AI System Plan
                </h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  We&apos;ll send your full breakdown, savings estimate, and system roadmap.
                </p>
                <form onSubmit={handleUnlock} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-semibold py-3.5 rounded-lg transition-colors text-sm cursor-pointer disabled:cursor-not-allowed"
                  >
                    {submitting ? "Processing…" : "Get My Free Plan →"}
                  </button>
                  <p className="text-xs text-neutral-600 text-center">
                    Free. No spam. Used only to send your plan.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Post-unlock CTA */}
        {isUnlocked && (
          <div className="mt-16 animate-fade-slide-up">
            {tier === "high" && (
              <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 sm:p-10">
                <div className="max-w-xl mx-auto text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Next Step</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    You&apos;re likely leaving significant money on the table.
                  </h3>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    Your score of {result.score}/100 puts you in the top tier for AI implementation ROI.
                    A 30-minute call is all it takes to scope your system and set a timeline.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleBookCall}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
                    >
                      Build My AI System →
                    </button>
                    <Link
                      href="/case-study"
                      className="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-medium px-8 py-4 rounded-xl transition-colors text-base"
                    >
                      See How This Gets Implemented →
                    </Link>
                  </div>
                  <p className="text-xs text-neutral-600 mt-5">Free 30-minute strategy call. No obligation.</p>
                </div>
              </div>
            )}

            {tier === "medium" && (
              <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 sm:p-10">
                <div className="max-w-xl mx-auto text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Next Step</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    You&apos;re likely leaving significant money on the table.
                  </h3>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    Your responses indicate real automation potential. The right AI system could close
                    the gap quickly — and the ROI typically follows within the first year.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleBookCall}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
                    >
                      Build My AI System →
                    </button>
                    <Link
                      href="/case-study"
                      className="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-medium px-8 py-4 rounded-xl transition-colors text-base"
                    >
                      See How This Gets Implemented →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {tier === "low" && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 sm:p-10">
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    There&apos;s a clear path forward.
                  </h3>
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    AI readiness is a process. Start by understanding how AI sees your business today —
                    then build toward implementation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/ai-visibility" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      Check Your AI Visibility
                    </Link>
                    <Link href="/solutions" className="border border-neutral-700 hover:border-neutral-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      Explore Solutions
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FullResults({
  result,
  tier,
  bizLabel,
}: {
  result: ReturnType<typeof computeScore>;
  tier: string;
  bizLabel: string;
}) {
  return (
    <div className="space-y-8">
      {/* Savings — hero metric */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          Estimated Annual Savings
        </p>
        <p className="text-5xl sm:text-6xl font-bold text-white">
          {formatCurrency(result.estimatedSavings.min)}
          <span className="text-neutral-500 mx-2">–</span>
          {formatCurrency(result.estimatedSavings.max)}
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          Based on businesses similar to yours
        </p>
      </div>

      {/* Supporting metrics */}
      <div className="grid grid-cols-3 gap-px bg-neutral-800 rounded-2xl overflow-hidden">
        {[
          { label: "Automation Potential", value: `${result.automationPotential}%`, sub: "of ops automatable" },
          { label: "Implementation",       value: result.implementationTimeline,    sub: "estimated timeline" },
          { label: "Engagement Readiness", value: tier === "high" ? "High" : tier === "medium" ? "Medium" : "Low", sub: "based on your score" },
        ].map((m) => (
          <div key={m.label} className="bg-neutral-900 p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">{m.label}</p>
            <p className="text-2xl font-bold text-white">{m.value}</p>
            <p className="text-xs text-neutral-600 mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Recommended systems */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">
          Recommended AI Systems
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {result.recommendedSystems.map((sys, i) => {
            const detail = systemDetails[sys];
            return (
              <div key={sys} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wide">
                    {i === 0 ? "Primary" : i === 1 ? "Secondary" : "Tertiary"}
                  </span>
                  {i === 0 && (
                    <span className="text-xs bg-blue-950/60 border border-blue-900/50 text-blue-400 px-2 py-0.5 rounded-full">
                      Start here
                    </span>
                  )}
                </div>
                <p className="font-semibold text-white text-sm">{sys}</p>
                {detail && (
                  <>
                    <p className="text-xs text-neutral-400 leading-relaxed">{detail.why}</p>
                    <div className="flex items-start gap-1.5 pt-1 border-t border-neutral-800">
                      <span className="text-xs text-neutral-600 shrink-0">Impact:</span>
                      <span className="text-xs text-neutral-300">{detail.impact}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* What this means */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          What this means for your {bizLabel}
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed">
          Based on your inputs, your {bizLabel} is operating below its automation potential. Deploying{" "}
          <span className="text-white font-medium">{result.recommendedSystems[0]}</span> alone could
          replace 1–2 full-time roles in operational overhead and significantly improve responsiveness —
          generating an estimated{" "}
          <span className="text-white font-semibold">
            {formatCurrency(result.estimatedSavings.min)}–{formatCurrency(result.estimatedSavings.max)}/yr
          </span>{" "}
          in cost savings based on businesses of your size and type.
        </p>
      </div>
    </div>
  );
}
