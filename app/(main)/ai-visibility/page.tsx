import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "AI Visibility — Is Your Business Showing Up?",
  description:
    "ChatGPT, Perplexity, and Gemini are where businesses get found now. Most SMBs are invisible to AI search — and don't know it. Find out where you stand.",
};

const aiSearchStats = [
  { value: "40%+", label: "of informational searches now go to AI tools first" },
  { value: "3×",   label: "faster growth of AI search vs. traditional search" },
  { value: "0",    label: "businesses that appear in AI results without intentional presence" },
];

const visibilityFactors = [
  {
    title: "Consistent data signals",
    description:
      "AI models pull from structured data sources, review platforms, and consistent NAP (name, address, phone) signals across the web. Inconsistency means invisibility.",
  },
  {
    title: "Authoritative content layer",
    description:
      "AI tools surface businesses that have clear, structured content explaining what they do, who they serve, and why they're credible. Generic content doesn't surface.",
  },
  {
    title: "Operational signals",
    description:
      "Response time, booking availability, review velocity — AI search increasingly factors in operational quality signals. A business with an AI OS scores higher.",
  },
];

const connectionPoints = [
  {
    os: "AI Front Desk",
    visibility: "Faster response → higher review velocity → better AI ranking signals",
  },
  {
    os: "Communication Layer",
    visibility: "Consistent messaging across channels → stronger entity recognition in AI models",
  },
  {
    os: "Workflow Automation",
    visibility: "Operational efficiency data feeds back into review and referral generation",
  },
];

export default function AIVisibilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#2563eb12_0%,_transparent_65%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 block mb-5">
              AI Visibility
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              AI is the new Google.
              <br />
              Is your business showing up?
            </h1>
            <p className="mt-6 text-xl text-neutral-400 leading-relaxed max-w-2xl">
              ChatGPT, Perplexity, and Gemini are becoming the first stop for
              business discovery. Most SMBs are completely invisible to AI
              search — and don&apos;t know it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/diagnostic" size="lg">Diagnose Your Business</Button>
              <Button href="https://influencelayer.com" variant="secondary" size="lg" external>
                Explore InfluenceLayer ↗
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-800 rounded-xl overflow-hidden">
            {aiSearchStats.map((s) => (
              <div key={s.label} className="bg-neutral-950 p-8 text-center">
                <div className="text-4xl font-bold text-white mb-2">{s.value}</div>
                <p className="text-sm text-neutral-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is AI visibility */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              The Problem
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
              What is AI visibility — and why does it matter?
            </h2>
            <p className="mt-4 text-neutral-400 leading-relaxed text-lg">
              When someone asks ChatGPT &ldquo;best dental office in my area&rdquo; or
              Perplexity &ldquo;recommend a law firm for a contract dispute,&rdquo; AI models
              generate answers based on signals they&apos;ve learned — not real-time
              search results. Most businesses have no presence in those answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibilityFactors.map((f) => (
              <div key={f.title} className="bg-neutral-900 border border-neutral-800 rounded-xl p-7">
                <h3 className="font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The connection */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              The Connection
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
              Your AI OS improves your AI visibility
            </h2>
            <p className="mt-4 text-neutral-400 leading-relaxed text-lg">
              This isn&apos;t a coincidence. The operational signals that AI models
              use to evaluate businesses — response time, consistency, review
              velocity — are exactly what an AI OS improves.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {connectionPoints.map((c) => (
              <div
                key={c.os}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-neutral-950 border border-neutral-800 rounded-xl p-6"
              >
                <div className="shrink-0 bg-blue-950/50 border border-blue-900/50 rounded-lg px-4 py-2">
                  <span className="text-sm font-semibold text-blue-300">{c.os}</span>
                </div>
                <div className="hidden sm:block text-neutral-700">→</div>
                <p className="text-sm text-neutral-400">{c.visibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* InfluenceLayer mention */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                InfluenceLayer
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
                Track and improve your AI visibility score
              </h2>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                InfluenceLayer is a dedicated AI visibility analytics platform.
                It tracks how often your business appears in AI-generated answers,
                which competitors are winning in your category, and what you can
                do to improve your position.
              </p>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Think of it as SEO — but for the AI era.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="https://influencelayer.com" variant="secondary" size="md" external>
                  Visit InfluenceLayer ↗
                </Button>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-6">
                What InfluenceLayer tracks
              </p>
              {[
                "AI search mention frequency by category and location",
                "Competitor visibility comparison",
                "Which AI models surface your business (and which don't)",
                "Content and signal gaps dragging your ranking down",
                "Week-over-week visibility trend",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 py-3 border-b border-neutral-800 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <p className="text-sm text-neutral-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Start with your AI operating system.
          </h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
            Visibility follows operations. Build the AI infrastructure first —
            then track how it changes where you show up.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button href="/diagnostic" size="lg">Get Your AI OS Plan</Button>
            <Button href="https://influencelayer.com" variant="secondary" size="lg" external>
              InfluenceLayer ↗
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
