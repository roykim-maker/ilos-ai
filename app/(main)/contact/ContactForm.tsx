"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  const inputClass =
    "bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow";

  if (state === "success") {
    return (
      <div className="bg-blue-950/50 border border-blue-900/50 rounded-xl p-10 text-center">
        <div className="w-12 h-12 bg-blue-950 border border-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-400"
          >
            <path
              d="M4 11l5 5 9-9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Message received
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          We&apos;ll get back to you within one business day. Or feel free to
          book directly on the calendar to the right.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-neutral-300">
            Name <span className="text-blue-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-neutral-300">
            Email <span className="text-blue-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm font-medium text-neutral-300">
          Company / Practice Name <span className="text-blue-500">*</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Your business name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-neutral-300">
          Phone{" "}
          <span className="text-neutral-600 font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="business" className="text-sm font-medium text-neutral-300">
          What does your business do? <span className="text-blue-500">*</span>
        </label>
        <textarea
          id="business"
          name="business"
          required
          rows={3}
          placeholder="Brief description of your business and what you offer..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="challenge" className="text-sm font-medium text-neutral-300">
          What&apos;s your biggest operational challenge?{" "}
          <span className="text-neutral-600 font-normal">(optional)</span>
        </label>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          placeholder="Missed calls, manual scheduling, slow follow-up, front desk overwhelm..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400 bg-red-950/50 border border-red-900/50 rounded-lg px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:text-blue-600 text-white font-medium px-6 py-3.5 rounded-lg transition-colors text-sm cursor-pointer disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
