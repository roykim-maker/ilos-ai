import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultsContent } from "./ResultsContent";

export const metadata: Metadata = {
  title: "Your AI Opportunity Score",
  description: "See your custom AI OS plan — estimated savings, recommended systems, and implementation roadmap.",
  robots: { index: false, follow: false },
};

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-neutral-600 text-sm">Loading your results…</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
