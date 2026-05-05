"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import {
  step1Questions,
  getStep2Questions,
  computeScore,
  type DiagnosticAnswers,
} from "@/lib/diagnostic";

type Phase = "intro" | "step1" | "step2" | "computing";

const STEP1_LABEL = "Quick Qualifier";
const STEP2_LABEL = "Deep Dive";

const computingLines = [
  "Evaluating your operational profile…",
  "Calculating automation potential…",
  "Mapping recommended AI systems…",
  "Estimating ROI and cost savings…",
  "Preparing your custom plan…",
];

export default function DiagnosticPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [selected, setSelected] = useState<string>("");
  const [animKey, setAnimKey] = useState(0);
  const [computingStep, setComputingStep] = useState(0);

  const step2Questions = answers.industry ? getStep2Questions(answers.industry) : [];
  const totalQ = step1Questions.length + step2Questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = phase === "computing" ? 100 : Math.round((answeredCount / totalQ) * 90);

  const currentQuestions = phase === "step1" ? step1Questions : step2Questions;
  const currentQ = currentQuestions[qIndex] as (typeof step1Questions)[number] | ReturnType<typeof getStep2Questions>[number];

  // Pre-populate selected if we already have an answer for this question
  useEffect(() => {
    if (currentQ) {
      setSelected(answers[currentQ.id as keyof DiagnosticAnswers] ?? "");
    }
  }, [phase, qIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  // Computing animation
  useEffect(() => {
    if (phase !== "computing") return;
    const interval = setInterval(() => {
      setComputingStep((s) => {
        if (s >= computingLines.length - 1) { clearInterval(interval); return s; }
        return s + 1;
      });
    }, 450);
    return () => clearInterval(interval);
  }, [phase]);

  function advance(newAnswers: Partial<DiagnosticAnswers>) {
    setAnimKey((k) => k + 1);
    if (phase === "step1") {
      if (qIndex < step1Questions.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        setQIndex(0);
        setPhase("step2");
      }
    } else {
      const s2 = getStep2Questions(newAnswers.industry!);
      if (qIndex < s2.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        setPhase("computing");
        sessionStorage.setItem("diagnostic_answers", JSON.stringify(newAnswers));
        setTimeout(() => {
          const result = computeScore(newAnswers);
          const params = new URLSearchParams({
            score: String(result.score),
            tier: result.tier,
            industry: newAnswers.industry ?? "",
            goal: newAnswers.goal ?? "",
            size: newAnswers.businessSize ?? "",
          });
          router.push(`/results?${params.toString()}`);
        }, 2600);
      }
    }
  }

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!selected || !currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected("");
    advance(newAnswers);
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col">
        <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center flex-1 justify-center animate-fade-slide-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
            AI OS Diagnostic
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Find out exactly what AI can do for your business
          </h1>
          <p className="mt-5 text-lg text-neutral-400 leading-relaxed max-w-lg">
            9 questions. 3 minutes. You&apos;ll get a custom AI Opportunity
            Score, estimated savings, and a recommended system — free.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" onClick={() => { setPhase("step1"); setAnimKey((k) => k + 1); }}>
              Start My Diagnostic
            </Button>
            <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
              Back to ilos.ai
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 w-full max-w-md">
            {[
              { value: "3 min", label: "to complete" },
              { value: "Free", label: "no commitment" },
              { value: "Custom", label: "AI OS plan" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── COMPUTING ──────────────────────────────────────────────────────────────
  if (phase === "computing") {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <div className="text-center max-w-sm w-full animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400 animate-spin" style={{ animationDuration: "2s" }}>
              <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2" strokeDasharray="40 30" />
            </svg>
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 block mb-3">
            Analyzing your responses
          </span>
          <h2 className="text-2xl font-bold text-white mb-10">
            Building your AI OS plan…
          </h2>
          <div className="flex flex-col gap-3 text-left">
            {computingLines.map((line, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  i <= computingStep ? "text-neutral-300 opacity-100" : "text-neutral-700 opacity-40"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                  i <= computingStep ? "bg-blue-500" : "bg-neutral-700"
                }`} />
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── QUESTIONS ──────────────────────────────────────────────────────────────
  const phaseLabel = phase === "step1" ? STEP1_LABEL : STEP2_LABEL;
  const phaseStep = phase === "step1" ? 1 : 2;
  const qNum = phase === "step1"
    ? qIndex + 1
    : step1Questions.length + qIndex + 1;

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-neutral-950/95 backdrop-blur border-b border-neutral-800 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Step {phaseStep} of 3 · {phaseLabel}
            </span>
            <span className="text-xs text-neutral-600">
              {qNum} / {totalQ}
            </span>
          </div>
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div key={`${phase}-${qIndex}-${animKey}`} className="w-full max-w-2xl animate-fade-slide-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-snug">
            {currentQ.question}
          </h2>

          <div
            className={`grid gap-3 ${
              currentQ.columns === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`text-left rounded-xl border px-5 py-4 text-sm font-medium transition-all cursor-pointer ${
                  selected === opt.value
                    ? "bg-blue-950/60 border-blue-500 text-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {selected === opt.value && (
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2 align-middle" />
                )}
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/diagnostic"
              onClick={() => { setPhase("intro"); setQIndex(0); setAnswers({}); setSelected(""); }}
              className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              Start over
            </Link>
            <Button onClick={handleNext} disabled={!selected}>
              {phase === "step2" && qIndex === step2Questions.length - 1
                ? "See My Results →"
                : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
