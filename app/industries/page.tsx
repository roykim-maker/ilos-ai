import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI operating systems built for dental practices, law firms, medical clinics, and service businesses. We specialize in verticals where every missed call is real lost revenue.",
};

const industries = [
  {
    id: "dental",
    label: "Dental Practices",
    headline: "From the first call to the recall reminder, your AI OS handles it.",
    stat: "The average dental practice misses 30%+ of incoming calls during peak hours. Every missed call is a patient that books somewhere else.",
    description:
      "Dental practices run on scheduling. A full schedule means maximum revenue. A missed call, an unanswered after-hours inquiry, or a failed recall outreach is measurable lost production. We eliminate those gaps with an AI system that runs your front desk continuously — answering calls, booking appointments, managing recalls, and following up on missed inquiries without requiring your team to do any of it manually.",
    painPoints: [
      "Missed calls during busy in-office hours",
      "No coverage for after-hours or weekend inquiries",
      "Inconsistent recall outreach leading to production gaps",
      "Front desk team stretched across phones, check-ins, and scheduling",
      "New patient inquiries going unanswered and booking elsewhere",
    ],
    solutions: [
      "Voice AI answering and appointment booking",
      "After-hours coverage with intelligent escalation",
      "Automated recall outreach via SMS and voice",
      "New patient intake and insurance verification coordination",
      "Missed call recovery with same-day follow-up",
    ],
  },
  {
    id: "legal",
    label: "Law Firms",
    headline: "First-response wins the client. AI makes sure you're always first.",
    stat: "Legal clients are evaluating multiple firms simultaneously. The firm that responds first — and responds well — wins the engagement.",
    description:
      "Legal intake is a high-stakes process. A potential client with a time-sensitive matter who can't reach your intake team immediately will call the next firm on their list. We build AI systems that capture every inbound inquiry, qualify the lead, and move them through your intake process — whether it's 9am or 11pm — so you never lose a client to a missed call or a slow response.",
    painPoints: [
      "Intake process is manual, slow, and inconsistent",
      "After-hours inquiry volume is high and largely uncaptured",
      "Lead qualification consumes attorney and paralegal time",
      "Inconsistent follow-up with prospective clients",
      "No visibility into lead-to-client conversion by source",
    ],
    solutions: [
      "Automated intake form and qualification logic",
      "24/7 inquiry capture with immediate response",
      "Lead scoring and routing to the right practice area",
      "Automated follow-up sequences for prospective clients",
      "CRM integration with matter management systems",
    ],
  },
  {
    id: "medical",
    label: "Medical Clinics",
    headline: "Patients expect fast, clear communication. AI delivers it consistently.",
    stat: "Reduce administrative overhead while improving the patient experience at every touchpoint — without adding staff.",
    description:
      "Medical clinics face a unique operational challenge: high administrative burden, complex scheduling requirements, and patient communication expectations that have risen significantly. We build AI systems that handle the scheduling, reminder, and communication workflows that consume your admin team's time — freeing them to focus on in-office patient experience.",
    painPoints: [
      "Scheduling calls overwhelm administrative staff during peak hours",
      "After-hours patient inquiries go unanswered until the next business day",
      "Patient communication is fragmented across phone, portal, and text",
      "Appointment reminder process is manual or unreliable",
      "No-show rates create production gaps and lost revenue",
    ],
    solutions: [
      "AI scheduling and appointment management",
      "After-hours patient communication with escalation protocols",
      "Multi-channel patient messaging (SMS, voice, email)",
      "Automated appointment reminders with confirmation",
      "No-show and cancellation recovery automation",
    ],
  },
  {
    id: "services",
    label: "Service Businesses",
    headline: "From first inquiry to follow-up — your AI handles the entire cycle.",
    stat: "In home services and field-based businesses, speed-to-response is the difference between winning and losing a job.",
    description:
      "Service businesses — from home services to agencies — compete heavily on response speed and follow-up consistency. When a homeowner requests a quote, they're typically requesting from 3–5 providers simultaneously. The first to respond wins a disproportionate share of the work. We build AI systems that respond immediately, qualify the lead, and keep them warm through your sales process.",
    painPoints: [
      "Lead response time is too slow — calls and texts going unanswered for hours",
      "Follow-up after a quote is inconsistent or nonexistent",
      "Dispatch and job coordination is done manually via calls and texts",
      "No systematic process for generating reviews from completed jobs",
      "Seasonal demand spikes overwhelm the team's capacity to respond",
    ],
    solutions: [
      "Immediate lead response via SMS and voice AI",
      "Lead qualification and job-type routing",
      "Automated quote follow-up sequences",
      "Dispatch coordination and team communication automation",
      "Post-job review request and reputation management",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Industries
          </span>
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-neutral-950 max-w-3xl leading-tight">
            Built for service businesses where every touchpoint counts
          </h1>
          <p className="mt-6 text-xl text-neutral-600 max-w-2xl leading-relaxed">
            We focus on verticals where operational efficiency directly drives
            revenue — and where the cost of a missed call is real.
          </p>
        </div>
      </section>

      {/* Industries */}
      {industries.map((industry, index) => (
        <section
          key={industry.id}
          id={industry.id}
          className={`py-24 px-6 ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
        >
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {industry.label}
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 max-w-2xl">
              {industry.headline}
            </h2>

            <blockquote className="mt-8 pl-6 border-l-2 border-blue-600">
              <p className="text-lg text-neutral-600 italic leading-relaxed">
                {industry.stat}
              </p>
            </blockquote>

            <p className="mt-8 text-neutral-600 leading-relaxed max-w-2xl">
              {industry.description}
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">
                  Common Pain Points
                </p>
                <ul className="flex flex-col gap-3">
                  {industry.painPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-neutral-700 text-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-0.5 shrink-0 text-neutral-400"
                      >
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">
                  How We Solve It
                </p>
                <ul className="flex flex-col gap-3">
                  {industry.solutions.map((solution) => (
                    <li
                      key={solution}
                      className="flex items-start gap-3 text-neutral-700 text-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mt-0.5 shrink-0 text-blue-600"
                      >
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5.5 8l2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Don&apos;t see your industry?
          </h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
            If you run a service-based business where communication and
            scheduling are core to your operation, we can likely help. Let&apos;s
            talk.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Book a Strategy Call
          </Link>
        </div>
      </section>
    </>
  );
}
