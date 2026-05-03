import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Study — AI Front Desk for a Dental Practice",
  description:
    "How ilos.ai deployed an AI front desk system for a regional dental practice — replacing front desk overflow, capturing after-hours calls, and increasing booking conversion.",
};

const results = [
  { value: "$35K", label: "Implementation investment" },
  { value: "60 days", label: "From kickoff to go-live" },
  { value: "90%+", label: "Calls handled by AI" },
  { value: "24/7", label: "Coverage with no added staff" },
  { value: "$55–70K", label: "Estimated annual savings" },
  { value: "100%", label: "After-hours capture rate" },
];

const challenges = [
  "Missed calls during peak in-office hours — new patient inquiries going to voicemail",
  "No after-hours coverage — evening and weekend calls completely uncaptured",
  "Manual recall process — front desk responsible for outbound outreach with no system",
  "Inconsistent follow-up — new patient inquiries that reached the team were not always pursued",
  "Front desk team stretched thin across phones, check-ins, scheduling, and insurance",
];

const built = [
  {
    title: "Voice AI for Inbound Calls",
    description:
      "A voice AI agent handles all inbound calls — answering, qualifying, booking appointments, and collecting new patient information. Complex calls are escalated to a live team member with full context.",
  },
  {
    title: "After-Hours Coverage",
    description:
      "The system runs continuously. Evening and weekend calls are handled identically to business-hours calls — with bookings made directly into the scheduling system and handoff summaries sent to the team.",
  },
  {
    title: "Missed Call Recovery",
    description:
      "Every missed call triggers an immediate SMS follow-up with an appointment booking link. The system tracks responses and escalates if no reply is received within a defined window.",
  },
  {
    title: "Recall Automation",
    description:
      "Patients due for recall appointments receive automated outreach via SMS and voice, reducing the manual workload on the front desk team and improving recall show rates.",
  },
  {
    title: "CRM Integration",
    description:
      "The AI system connects directly to the practice management software, reading and writing patient data in real time — no manual entry, no duplicate records.",
  },
];

export default function CaseStudyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Case Study — Dental Practice
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              AI Front Desk Deployment
            </h1>
            <p className="mt-6 text-xl text-neutral-400 leading-relaxed">
              A regional dental practice was losing new patient calls to
              voicemail and after-hours gaps. We designed and deployed a
              complete AI Front Desk system in 60 days — transforming how
              their operation handles patient communication.
            </p>
          </div>
        </div>
      </section>

      {/* Results grid */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-neutral-800 rounded-xl overflow-hidden">
            {results.map((result) => (
              <div key={result.label} className="bg-neutral-950 p-6 text-center">
                <div className="text-3xl font-bold text-white">{result.value}</div>
                <div className="text-xs text-neutral-500 mt-2 leading-tight">
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                The Challenge
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                A high-volume practice leaving revenue on the table
              </h2>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                The practice had strong clinical operations but a fragile front
                desk infrastructure. With a small team managing phones, check-in,
                scheduling, and insurance simultaneously, the practice was
                routinely missing calls — particularly during peak hours and after
                the office closed.
              </p>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                New patient inquiries were especially at risk. A potential patient
                who reached voicemail during a busy afternoon would often book
                elsewhere before the team had a chance to return the call. The
                practice had no visibility into how many calls were being missed
                or what revenue impact that represented.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-6">
                Key Problems
              </p>
              <ul className="flex flex-col gap-4">
                {challenges.map((challenge) => (
                  <li
                    key={challenge}
                    className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 shrink-0 text-neutral-600"
                    >
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 6l4 4M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              The Solution
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              A complete AI Front Desk — built for this practice
            </h2>
            <p className="mt-4 text-neutral-400 leading-relaxed">
              We audited the practice&apos;s communication workflow over two
              weeks, mapping every call type, scheduling pattern, and team
              handoff. From that audit, we designed a system tailored to their
              specific operation — not a generic tool, but infrastructure built
              around how this practice actually works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {built.map((item) => (
              <div
                key={item.title}
                className="bg-neutral-950 border border-neutral-800 rounded-xl p-8"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-900 flex items-center justify-center mb-4">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-400"
                  >
                    <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                The Outcome
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                A front desk that never clocks out
              </h2>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                Within 30 days of go-live, the practice had full visibility into
                call volume and handling rates for the first time. The AI system
                was answering over 90% of calls without requiring a live transfer,
                and the after-hours capture rate went from near zero to 100%.
              </p>
              <p className="mt-4 text-neutral-400 leading-relaxed">
                The front desk team — unchanged in headcount — now focuses
                exclusively on in-office patient experience. The phones don&apos;t
                create a bottleneck at their desk anymore. The practice estimates
                $55,000–$70,000 in annual labor savings, with additional upside
                from new patient conversions that previously went to voicemail.
              </p>

              <blockquote className="mt-8 pl-6 border-l-2 border-blue-500">
                <p className="text-neutral-300 italic leading-relaxed">
                  &ldquo;We had been losing patients to voicemail for years and
                  didn&apos;t realize the scale of it. The AI front desk changed
                  the math for us entirely.&rdquo;
                </p>
                <cite className="mt-3 block text-sm text-neutral-500 not-italic">
                  — Practice Owner (name withheld)
                </cite>
              </blockquote>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-8">
                Engagement Summary
              </p>
              {[
                { label: "Client", value: "Regional dental practice" },
                { label: "Timeline", value: "60-day deployment" },
                { label: "Investment", value: "$35,000" },
                { label: "Ongoing", value: "Monitoring + optimization retainer" },
                { label: "Annual savings (est.)", value: "$55,000–$70,000" },
                { label: "ROI timeline", value: "Under 8 months" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center py-3 border-b border-neutral-800 last:border-0"
                >
                  <span className="text-sm text-neutral-500">{row.label}</span>
                  <span className="text-sm font-semibold text-white">
                    {row.value}
                  </span>
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
            Want results like this for your business?
          </h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
            Book a strategy call and we&apos;ll audit your operation — identifying
            exactly what AI can replace, automate, and improve.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  );
}
