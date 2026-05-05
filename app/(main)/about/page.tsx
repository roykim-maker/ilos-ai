import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "ilos.ai builds AI operating systems for service businesses. Learn about our approach, our focus, and why we build what we build.",
};

const differentiators = [
  {
    title: "We build, not just consult.",
    description:
      "We implement everything we recommend. You get a working system, not a strategy deck. Our engagements end with infrastructure deployed and running in your business.",
  },
  {
    title: "We specialize in service businesses.",
    description:
      "We know the workflow patterns, the operational pain points, and the specific AI tools that work in your vertical. We don't try to serve every business — we go deep in the ones we know.",
  },
  {
    title: "We measure outcomes, not outputs.",
    description:
      "Our engagements are scoped around real business results — cost savings, booking conversion rates, response times. If the numbers don't move, something is wrong.",
  },
  {
    title: "We optimize continuously.",
    description:
      "After deployment, we monitor and improve. AI systems get better with time and data. We treat the go-live date as the beginning, not the end.",
  },
];

const values = [
  {
    title: "Narrow focus",
    description:
      "We don't build every AI product imaginable. We build AI operating systems for service businesses. That's it.",
  },
  {
    title: "Operational truth",
    description:
      "We start every engagement with an audit — mapping what actually happens in your business, not what people assume happens.",
  },
  {
    title: "Systems thinking",
    description:
      "Individual tools don't transform businesses. Integrated systems do. We build infrastructure, not features.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 bg-neutral-950 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              About
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              We build AI systems that run businesses.
            </h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-6 block">
                Our Mission
              </span>
              <div className="space-y-5 text-neutral-400 leading-relaxed">
                <p>
                  ilos.ai was founded on a simple premise: most businesses are
                  still running operations the way they did 20 years ago — with
                  people doing work that software can now do better.
                </p>
                <p>
                  The phone rings. Someone answers it, looks up an appointment
                  slot, types the information into a system, and goes back to
                  what they were doing before the phone rang. This happens
                  hundreds of times per week in a typical service business. And
                  most of it doesn&apos;t require a human.
                </p>
                <p>
                  We build the AI infrastructure that handles the routine — the
                  calls, the scheduling, the follow-up, the data entry, the
                  communication — so your team can spend their time on the work
                  that actually requires a person.
                </p>
                <p>
                  We call this the AI OS: the nervous system of your business.
                  The layer that connects your tools, runs your workflows, and
                  never takes a day off.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-600 block mb-6">
                Our Values
              </span>
              {values.map((value) => (
                <div
                  key={value.title}
                  className="border border-neutral-800 bg-neutral-950 rounded-xl p-6"
                >
                  <h3 className="font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Our Approach
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              What makes us different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-24 px-6 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              The Name
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">
              ilos.ai
            </h2>
            <p className="mt-6 text-neutral-400 leading-relaxed">
              ilos stands for{" "}
              <span className="text-white font-medium">
                InfluenceLayer Operating System
              </span>
              . We built InfluenceLayer as an AI systems company focused on
              building operational infrastructure for businesses. ilos.ai is the
              product layer — the AI OS we deploy for every client we work with.
            </p>
            <p className="mt-4 text-neutral-400 leading-relaxed">
              The name reflects what we believe: that AI isn&apos;t a feature
              you add to your business. It&apos;s an operating layer that changes
              how the entire business runs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Want to work with us?
          </h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
            Every engagement starts with a conversation. Book a strategy call
            and let&apos;s figure out what your AI OS looks like.
          </p>
          <Button href="/contact" size="lg" className="mt-10">
            Book a Strategy Call
          </Button>
        </div>
      </section>
    </>
  );
}
