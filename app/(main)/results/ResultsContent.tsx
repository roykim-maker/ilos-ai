"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { computeScore, formatCurrency, tierConfig, type DiagnosticAnswers } from "@/lib/diagnostic";

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

  // Reconstruct full result from sessionStorage answers
  const [result, setResult] = useState(() => {
    const savedAnswers = typeof window !== "undefined"
      ? sessionStorage.getItem("diagnostic_answers")
      : null;
    const answers: Partial<DiagnosticAnswers> = savedAnswers
      ? JSON.parse(savedAnswers)
      : { industry, goal, businessSize: size };
    return computeScore(answers);
  });

  // Check if already unlocked from a previous session
  useEffect(() => {
    const unlocked = sessionStorage.getItem("diagnostic_unlocked");
    const savedName = sessionStorage.getItem("diagnostic_name");
    if (unlocked === "true" && savedName) {
      setIsUnlocked(true);
      setName(savedName);
    }
  }, []);

  // Animate score counter
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const target = result.score;
    const duration = 1200;
    const steps = 40;
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

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          score: result.score,
          tier,
          industry,
          systems: result.recommendedSystems,
        }),
      });
      if (!res.ok) throw new Error("Failed");
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
    const params = new URLSearchParams({
      score: String(result.score),
      tier,
      industry,
      name,
      email: sessionStorage.getItem("diagnostic_email") ?? "",
      systems: result.recommendedSystems[0] ?? "",
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
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950/95 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors">
            ← ilos.ai
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Your Diagnostic Results
          </span>
          <Link href="/diagnostic" className="text-sm text-neutral-500 hover:text-white transition-colors">
            Retake
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Score hero */}
        <div className="text-center mb-16 animate-fade-slide-up">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6">
            AI Opportunity Score
          </p>

          <div className="relative inline-block">
            <div className="text-[120px] sm:text-[160px] font-bold leading-none text-white animate-count-up tabular-nums">
              {displayScore}
            </div>
            <div className="absolute top-4 -right-10 text-3xl font-bold text-neutral-600">
              /100
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mt-4 ${cfg.bg} ${cfg.border}`}>
            <span className={`text-sm font-semibold ${cfg.color}`}>{cfg.label}</span>
          </div>

          <p className="mt-5 text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
            {tier === "high"
              ? `Your ${bizLabel} shows strong signals for AI OS implementation — you're ready to move.`
              : tier === "medium"
              ? `Your ${bizLabel} has solid automation opportunities. Let's map the right entry point.`
              : `You're in the early stages of AI readiness — there's a clear path forward.`}
          </p>
        </div>

        {/* Gated content */}
        <div className="relative">
          {/* Blurred preview */}
          {!isUnlocked && (
            <div className="select-none pointer-events-none blur-sm opacity-40 mb-[-2px]">
              <FullResults result={result} tier={tier} />
            </div>
          )}

          {/* Revealed results */}
          {isUnlocked && (
            <div className="animate-fade-slide-up">
              <FullResults result={result} tier={tier} />
            </div>
          )}

          {/* Email gate overlay */}
          {!isUnlocked && (
            <div className="relative -mt-64 z-10 animate-fade-slide-up">
              <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-1">
                  Unlock your full AI OS plan
                </h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  See your estimated savings, recommended systems, and implementation roadmap.
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
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-medium py-3 rounded-lg transition-colors text-sm cursor-pointer disabled:cursor-not-allowed"
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
            <div className={`rounded-2xl border p-8 sm:p-10 text-center ${cfg.bg} ${cfg.border}`}>
              {tier === "high" && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    You&apos;re ready to build your AI OS.
                  </h3>
                  <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                    Book a 30-minute strategy call. We&apos;ll review your results together and scope your implementation.
                  </p>
                  <button
                    onClick={handleBookCall}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors text-base"
                  >
                    Book Your Strategy Call →
                  </button>
                  <p className="text-xs text-neutral-600 mt-4">Free 30-minute call. No obligation.</p>
                </>
              )}
              {tier === "medium" && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    There&apos;s real opportunity here.
                  </h3>
                  <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                    See how businesses like yours implement AI systems — then decide if you&apos;re ready to move.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/case-study" className="border border-neutral-700 hover:border-neutral-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      Read Case Study
                    </Link>
                    <button
                      onClick={handleBookCall}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                      Book a Call Anyway →
                    </button>
                  </div>
                </>
              )}
              {tier === "low" && (
                <>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Start with AI visibility.
                  </h3>
                  <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                    Before deploying an AI OS, understand how AI search sees your business today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/ai-visibility" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      Check Your AI Visibility
                    </Link>
                    <Link href="/solutions" className="border border-neutral-700 hover:border-neutral-500 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      Explore Solutions
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FullResults({ result, tier }: { result: ReturnType<typeof computeScore>; tier: string }) {
  return (
    <div className="space-y-8">
      {/* 4 metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 rounded-2xl overflow-hidden">
        {[
          {
            label: "Est. Annual Savings",
            value: `${formatCurrency(result.estimatedSavings.min)} – ${formatCurrency(result.estimatedSavings.max)}`,
            sub: "per year",
          },
          {
            label: "Automation Potential",
            value: `${result.automationPotential}%`,
            sub: "of ops automatable",
          },
          {
            label: "Implementation",
            value: result.implementationTimeline,
            sub: "estimated timeline",
          },
          {
            label: "Priority Level",
            value: tier === "high" ? "High" : tier === "medium" ? "Medium" : "Low",
            sub: "engagement readiness",
          },
        ].map((m) => (
          <div key={m.label} className="bg-neutral-900 p-6">
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
          {result.recommendedSystems.map((sys, i) => (
            <div key={sys} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-500">{i === 0 ? "Primary" : i === 1 ? "Secondary" : "Tertiary"}</span>
              </div>
              <p className="font-semibold text-white text-sm">{sys}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {i === 0 ? "Highest immediate impact" : i === 1 ? "Enables next-level automation" : "Long-term operating layer"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What this means */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          What this means for your business
        </p>
        <p className="text-neutral-300 text-sm leading-relaxed">
          Based on your diagnostic, deploying{" "}
          <span className="text-white font-medium">{result.recommendedSystems[0]}</span> as
          your first AI system could replace an estimated 1–2 full-time roles in operational
          overhead. Your savings estimate of{" "}
          <span className="text-white font-medium">
            {formatCurrency(result.estimatedSavings.min)}–{formatCurrency(result.estimatedSavings.max)}/yr
          </span>{" "}
          is based on industry benchmarks for businesses of your size and type.
        </p>
      </div>
    </div>
  );
}
