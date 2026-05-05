import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "AI front desk systems, workflow automation, communication infrastructure, and full AI operating systems built for service businesses.",
};

const solutions = [
  {
    id: "front-desk",
    label: "Solution 01",
    title: "AI Front Desk System",
    tagline: "Never miss a call again. Never lose a booking to voicemail.",
    description:
      "Your front desk is the first impression of your business. We replace the manual, inconsistent, overflow-prone experience with an AI system that answers every call, books every appointment, and follows up on every missed inquiry — around the clock.",
    features: [
      "Voice AI call answering and routing",
      "Appointment booking and rescheduling automation",
      "SMS and web chat integration",
      "Missed call recovery with automatic follow-up",
      "After-hours coverage with intelligent escalation",
      "Bi-directional CRM and calendar sync",
    ],
    outcome:
      "Practices using our AI Front Desk see immediate improvements in call-to-booking conversion and a significant reduction in front desk labor cost.",
  },
  {
    id: "workflow",
    label: "Solution 02",
    title: "AI Workflow Automation",
    tagline: "Eliminate the manual work your team shouldn't be doing.",
    description:
      "Every time an employee routes a task by hand, copies data between systems, or sends a status update manually, that's a workflow you're paying a person to run. We identify those workflows and replace them with AI-driven automation that's faster, consistent, and never calls in sick.",
    features: [
      "Internal task routing and assignment",
      "CRM and practice management integrations",
      "Intake form automation and data capture",
      "Lead triage and qualification logic",
      "Cross-system data sync and deduplication",
      "Automated reporting and operational dashboards",
    ],
    outcome:
      "When your workflows run themselves, your team can focus on work that actually requires a human — and your business runs faster.",
  },
  {
    id: "communication",
    label: "Solution 03",
    title: "AI Communication Layer",
    tagline: "Be everywhere your clients are. Automatically.",
    description:
      "Clients expect immediate, consistent communication. They don't care if it's 2pm on a Tuesday or 10pm on a Friday. We build a communication layer that meets your clients on every channel — voice, SMS, web chat, email — and responds in seconds, not hours.",
    features: [
      "Multi-channel messaging (SMS, email, web chat, WhatsApp, voice)",
      "Automated follow-up sequences for leads and clients",
      "Lead qualification and scoring flows",
      "Appointment confirmation and reminder automation",
      "Review request and reputation management",
      "Re-engagement campaigns for lapsed clients",
    ],
    outcome:
      "Consistent, timely communication across every channel — without adding staff or monitoring inboxes manually.",
  },
  {
    id: "ai-os",
    label: "Solution 04",
    title: "AI Operating System",
    tagline: "The full picture — a unified AI layer running your entire business.",
    description:
      "The AI OS is what you get when all the individual systems work together. It's the nervous system of your business: routing information, triggering actions, surfacing insights, and escalating what needs human attention — while running everything else on autopilot.",
    features: [
      "Unified workflow orchestration across all systems",
      "Cross-system intelligence and decision routing",
      "Real-time operational monitoring and alerts",
      "Intelligent escalation to the right team member",
      "Executive performance dashboards",
      "Continuous optimization based on outcome data",
    ],
    outcome:
      "This is not software you buy off a shelf. It's infrastructure we build, integrate, and run for your specific business.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            Solutions
          </span>
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            AI solutions built for your entire operation
          </h1>
          <p className="mt-6 text-xl text-neutral-400 max-w-2xl leading-relaxed">
            ilos.ai designs integrated AI systems — not one-off tools — that
            work together across every part of your business.
          </p>
        </div>
      </section>

      {/* Solutions */}
      {solutions.map((solution, index) => (
        <section
          key={solution.id}
          id={solution.id}
          className={`py-24 px-6 ${index % 2 === 0 ? "bg-neutral-950" : "bg-neutral-900"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                  {solution.label}
                </span>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
                  {solution.title}
                </h2>
                <p className="mt-2 text-lg font-medium text-neutral-500 italic">
                  {solution.tagline}
                </p>
                <p className="mt-6 text-neutral-400 leading-relaxed">
                  {solution.description}
                </p>
                <div className="mt-8 p-6 bg-blue-950/50 border border-blue-900/50 rounded-xl">
                  <p className="text-sm font-semibold text-blue-300 mb-1">Outcome</p>
                  <p className="text-blue-200/80 text-sm leading-relaxed">
                    {solution.outcome}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-6">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-4">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-neutral-300"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-0.5 shrink-0 text-blue-500"
                      >
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5.5 9l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Not sure which solution fits?
          </h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
            We start every engagement with an operational audit. Book a strategy
            call and we&apos;ll map out exactly what your business needs.
          </p>
          <Button href="/contact" size="lg" className="mt-10">Book a Free Strategy Call</Button>
        </div>
      </section>
    </>
  );
}
