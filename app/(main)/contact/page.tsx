import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "In 30 minutes, we'll map what AI can automate in your business, estimate your cost savings, and outline a clear implementation plan.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <ContactContent />
    </Suspense>
  );
}
