import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call or send us a message. We'll audit your operation and show you exactly what AI can replace, automate, and improve.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Contact
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight text-neutral-950 leading-tight">
              Let&apos;s talk about your operation.
            </h1>
            <p className="mt-6 text-xl text-neutral-600 leading-relaxed">
              Start with a 30-minute strategy call. We&apos;ll map out what AI
              can replace, automate, and improve in your business — with specific
              numbers attached.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Calendly */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 mb-8">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Calendly + info */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950 mb-8">
                Or book directly on the calendar
              </h2>
              <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white">
                <iframe
                  src="https://calendly.com/ilos-ai/demo"
                  width="100%"
                  height="680"
                  frameBorder="0"
                  title="Book a strategy call"
                />
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 shrink-0">
                    <path d="M15 3H3a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M1 7h16" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 1v3M13 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  30-minute strategy session
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 shrink-0">
                    <path d="M9 1a8 8 0 100 16A8 8 0 009 1z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Free — no commitment required
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 shrink-0">
                    <path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Leave with a clear picture of what AI can do for your business
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 shrink-0">
                    <path d="M9 1a8 8 0 100 16A8 8 0 009 1z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 9h6M9 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <a href="mailto:roy@ilos.ai" className="hover:text-neutral-950 transition-colors">
                    roy@ilos.ai
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
