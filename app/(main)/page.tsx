import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ilos.ai — AI Operating Systems for Modern Businesses",
  description:
    "We design and deploy AI systems that run your operations — so you don't have to. AI front desk, workflow automation, and communication infrastructure for service businesses.",
};

const features = [
  {
    title: "AI Front Desk",
    description:
      "Answer every call, book every appointment, and handle after-hours automatically. Your front desk, without the overhead.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5.5A1.5 1.5 0 013.5 4h13A1.5 1.5 0 0118 5.5v9A1.5 1.5 0 0116.5 16h-13A1.5 1.5 0 012 14.5v-9z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 12h2M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Workflow Automation",
    description:
      "Eliminate manual handoffs. Route tasks, sync your CRM, and trigger actions across your entire operation without lifting a finger.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L13 8H7L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="4" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 14H13.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 8V11.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Communication Layer",
    description:
      "Meet your clients on every channel — voice, SMS, web chat, and email — with automated responses that feel human.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 7h8M6 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Operating System",
    description:
      "The connective tissue between every system you run. One unified layer that sees everything, routes everything, and acts on it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const metrics = [
  { value: "$80K–$120K", label: "saved per year",    description: "Replace 1–2 full-time staff without sacrificing responsiveness." },
  { value: "100%",       label: "call answer rate",  description: "Every call answered, every time — no missed opportunities." },
  { value: "24/7",       label: "operation",         description: "Your business runs around the clock without adding a single employee." },
  { value: "40%+",       label: "more bookings",     description: "Convert more inquiries into revenue with instant, consistent follow-up." },
];

const steps = [
  { number: "01", title: "Audit",    description: "We map every workflow, touchpoint, and operational gap in your current business." },
  { number: "02", title: "Design",   description: "We architect an AI system tailored to your specific business, team, and goals." },
  { number: "03", title: "Deploy",   description: "We build and integrate everything. No IT team required on your end." },
  { number: "04", title: "Optimize", description: "We monitor performance and continuously improve the system over time." },
];

const industries = [
  { name: "Dental Practices",  description: "AI front desk, recall automation, and patient communication — from the first call to the follow-up.", href: "/industries#dental" },
  { name: "Law Firms",         description: "Intake automation, lead qualification, and client communication that responds before competitors.",    href: "/industries#legal" },
  { name: "Medical Clinics",   description: "Scheduling automation, patient messaging, and after-hours coverage without adding staff.",             href: "/industries#medical" },
  { name: "Service Businesses",description: "Lead qualification, dispatch coordination, and customer follow-up running on autopilot.",              href: "/industries#services" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center bg-neutral-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,_#2563eb18_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6">
              AI Operating Systems
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              AI Operating Systems for Modern Businesses
            </h1>
            <p className="mt-6 text-xl text-neutral-400 max-w-xl leading-relaxed">
              We design and deploy AI systems that run your operations — so you
              don&apos;t have to.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/diagnostic"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3.5 rounded-lg transition-colors"
              >
                Get Your AI System Plan
              </Link>
              <Link
                href="/contact"
                className="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-medium px-6 py-3.5 rounded-lg transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">What We Build</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">One system. Every touchpoint.</h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              ilos.ai builds the AI infrastructure that connects every part of your operation — from the first call to the final follow-up.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 hover:border-neutral-700 transition-colors">
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Real Business Impact</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">The math is straightforward.</h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              Deploying an AI operating system changes what&apos;s possible for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 rounded-xl overflow-hidden">
            {metrics.map((metric) => (
              <div key={metric.value} className="bg-neutral-900 p-8">
                <div className="text-4xl font-bold text-white">{metric.value}</div>
                <div className="text-sm font-medium text-blue-400 mt-1 mb-3">{metric.label}</div>
                <p className="text-sm text-neutral-400 leading-relaxed">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Case Study</span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">What this looks like in practice.</h2>
              <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
                A regional dental practice was losing new patient calls to voicemail and after-hours gaps. We designed
                and deployed a complete AI Front Desk — voice AI, SMS follow-up, and booking automation — in under 60 days.
              </p>
              <Link href="/case-study" className="mt-8 inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors">
                Read the full case study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "$35K", label: "Implementation" },
                { value: "60 days", label: "Time to deploy" },
                { value: "90%+", label: "Calls handled by AI" },
                { value: "$55–70K", label: "Annual savings" },
              ].map((stat) => (
                <div key={stat.label} className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Process</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">How we build your AI OS</h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              Every engagement follows the same four-phase process. No generic templates, no off-the-shelf software.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-5xl font-bold text-neutral-800 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic — Primary Action */}
      <section className="relative py-28 px-6 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,_rgba(109,40,217,0.12)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(59,130,246,0.06)_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-950/70 border border-violet-700/40 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
              Free · 3 min
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Find Out What AI Could Replace in Your Business — In 3 Minutes
          </h2>

          {/* Subtext */}
          <p className="mt-5 text-lg text-neutral-400 leading-relaxed">
            Answer 9 quick questions and get your AI Opportunity Score, estimated savings, and a custom system plan.
          </p>

          {/* Bullets */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
            {[
              "AI Opportunity Score (0–100)",
              "Estimated annual savings",
              "Top 3 systems to implement first",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-neutral-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-400 shrink-0">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4.5 7l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/diagnostic"
              className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-semibold px-10 py-4 rounded-xl transition-all text-lg shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_55px_rgba(139,92,246,0.45)] hover:-translate-y-px"
            >
              Start My Diagnostic →
            </Link>
            <p className="mt-4 text-xs text-neutral-600">No account required. Results in under 3 minutes.</p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Industries</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">Built for service businesses</h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              We specialize in verticals where every missed call and slow response is real lost revenue.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => (
              <Link key={industry.name} href={industry.href} className="group border border-neutral-800 rounded-xl p-8 hover:border-blue-800 hover:bg-blue-950/20 transition-all">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{industry.name}</h3>
                <p className="text-neutral-400 leading-relaxed">{industry.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Ready to build your AI operating system?
          </h2>
          <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
            Start with a 3-minute diagnostic. Get your score, estimated savings, and a custom AI OS plan — free.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg">
              Get Your Free AI OS Plan
            </Link>
            <Link href="/contact" className="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
