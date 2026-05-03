export type Industry = "dental" | "legal" | "medical" | "home-services" | "agency" | "other";
export type BusinessSize = "solo" | "small" | "mid" | "large";
export type Challenge =
  | "missing-calls"
  | "manual-scheduling"
  | "slow-followup"
  | "staff-overwhelm"
  | "inconsistent-comms";
export type Goal =
  | "replace-staff"
  | "automate-workflows"
  | "improve-conversion"
  | "better-communication";
export type Budget = "under-5k" | "5k-15k" | "15k-35k" | "35k-plus" | "not-sure";

export interface DiagnosticAnswers {
  industry: string;
  businessSize: string;
  challenge: string;
  goal: string;
  budget: string;
  volume: string;
  currentSystem: string;
  isDecisionMaker: string;
  timeline: string;
}

export interface DiagnosticResult {
  score: number;
  tier: "high" | "medium" | "low";
  estimatedSavings: { min: number; max: number };
  recommendedSystems: string[];
  implementationTimeline: string;
  automationPotential: number;
}

export function computeScore(answers: Partial<DiagnosticAnswers>): DiagnosticResult {
  let score = 0;

  // Budget — 0–25 pts
  score += ({ "under-5k": 5, "5k-15k": 12, "15k-35k": 20, "35k-plus": 25, "not-sure": 8 } as Record<string, number>)[answers.budget ?? ""] ?? 0;

  // Business size — 0–20 pts
  score += ({ solo: 8, small: 15, mid: 20, large: 16 } as Record<string, number>)[answers.businessSize ?? ""] ?? 0;

  // Volume — 0–20 pts
  score += ({ low: 5, medium: 12, high: 18, "very-high": 20 } as Record<string, number>)[answers.volume ?? ""] ?? 10;

  // Decision maker — 0–20 pts
  score += ({ yes: 20, shared: 12, no: 5 } as Record<string, number>)[answers.isDecisionMaker ?? ""] ?? 10;

  // Timeline — 0–15 pts
  score += ({ immediately: 15, "1-3-months": 12, "3-6-months": 7, exploring: 3 } as Record<string, number>)[answers.timeline ?? ""] ?? 5;

  score = Math.min(100, Math.max(0, score));
  const tier = score >= 70 ? "high" : score >= 40 ? "medium" : "low";

  return {
    score,
    tier,
    estimatedSavings: getSavings(answers.industry as Industry, answers.businessSize as BusinessSize),
    recommendedSystems: getRecommendedSystems(answers.goal as Goal, answers.challenge as Challenge),
    implementationTimeline: score >= 70 ? "45–60 days" : score >= 40 ? "60–90 days" : "90–120 days",
    automationPotential: Math.min(95, Math.round(score * 0.82 + 12)),
  };
}

function getSavings(industry: Industry, size: BusinessSize): { min: number; max: number } {
  const table: Record<Industry, Record<BusinessSize, [number, number]>> = {
    dental:         { solo: [30000, 50000], small: [45000, 75000],  mid: [70000, 120000], large: [100000, 180000] },
    legal:          { solo: [40000, 60000], small: [55000, 90000],  mid: [90000, 150000], large: [130000, 200000] },
    medical:        { solo: [35000, 55000], small: [50000, 80000],  mid: [80000, 130000], large: [120000, 200000] },
    "home-services":{ solo: [20000, 40000], small: [35000, 60000],  mid: [60000, 100000], large: [90000, 150000]  },
    agency:         { solo: [25000, 45000], small: [40000, 70000],  mid: [65000, 110000], large: [100000, 160000] },
    other:          { solo: [25000, 45000], small: [40000, 70000],  mid: [60000, 100000], large: [90000, 150000]  },
  };
  const range = table[industry]?.[size] ?? [30000, 60000];
  return { min: range[0], max: range[1] };
}

function getRecommendedSystems(goal: Goal, _challenge: Challenge): string[] {
  const map: Record<Goal, string[]> = {
    "replace-staff":        ["AI Front Desk", "Communication Layer", "Workflow Automation"],
    "automate-workflows":   ["Workflow Automation", "AI Operating System", "Communication Layer"],
    "improve-conversion":   ["Communication Layer", "AI Front Desk", "Workflow Automation"],
    "better-communication": ["Communication Layer", "AI Front Desk", "AI Operating System"],
  };
  return map[goal] ?? ["AI Front Desk", "Workflow Automation", "Communication Layer"];
}

// Step 1 questions — same for everyone
export const step1Questions = [
  {
    id: "industry",
    question: "What best describes your business?",
    columns: 3,
    options: [
      { value: "dental",        label: "Dental Practice" },
      { value: "legal",         label: "Law Firm" },
      { value: "medical",       label: "Medical Clinic" },
      { value: "home-services", label: "Home Services" },
      { value: "agency",        label: "Agency / Consulting" },
      { value: "other",         label: "Other Service Business" },
    ],
  },
  {
    id: "businessSize",
    question: "How large is your team?",
    columns: 2,
    options: [
      { value: "solo",  label: "Solo / 1–2 people" },
      { value: "small", label: "Small team (3–10)" },
      { value: "mid",   label: "Mid-size (11–50)" },
      { value: "large", label: "Larger (50+)" },
    ],
  },
  {
    id: "challenge",
    question: "What's your biggest operational challenge right now?",
    columns: 2,
    options: [
      { value: "missing-calls",     label: "Missing calls and leads" },
      { value: "manual-scheduling", label: "Manual, repetitive scheduling" },
      { value: "slow-followup",     label: "Slow or inconsistent follow-up" },
      { value: "staff-overwhelm",   label: "Staff overwhelmed by admin" },
      { value: "inconsistent-comms",label: "Fragmented customer communication" },
    ],
  },
  {
    id: "goal",
    question: "What's your primary goal with AI?",
    columns: 2,
    options: [
      { value: "replace-staff",        label: "Reduce front desk labor cost" },
      { value: "automate-workflows",   label: "Automate internal workflows" },
      { value: "improve-conversion",   label: "Improve lead conversion" },
      { value: "better-communication", label: "Upgrade customer communication" },
    ],
  },
  {
    id: "budget",
    question: "What's your budget for this implementation?",
    columns: 2,
    options: [
      { value: "under-5k",  label: "Under $5,000" },
      { value: "5k-15k",    label: "$5,000 – $15,000" },
      { value: "15k-35k",   label: "$15,000 – $35,000" },
      { value: "35k-plus",  label: "$35,000+" },
      { value: "not-sure",  label: "Not sure yet" },
    ],
  },
] as const;

// Step 2 questions — dynamic based on industry
export function getStep2Questions(industry: string) {
  const isDentalMedical = industry === "dental" || industry === "medical";
  const isLegal = industry === "legal";

  const volumeQuestion = isDentalMedical
    ? {
        id: "volume",
        question: "How many patient calls does your practice receive per day?",
        columns: 2,
        options: [
          { value: "low",       label: "Fewer than 10" },
          { value: "medium",    label: "10–30" },
          { value: "high",      label: "30–60" },
          { value: "very-high", label: "More than 60" },
        ],
      }
    : isLegal
    ? {
        id: "volume",
        question: "How many new client inquiries does your firm receive per week?",
        columns: 2,
        options: [
          { value: "low",       label: "Fewer than 5" },
          { value: "medium",    label: "5–15" },
          { value: "high",      label: "15–30" },
          { value: "very-high", label: "More than 30" },
        ],
      }
    : {
        id: "volume",
        question: "How many inbound leads do you receive per month?",
        columns: 2,
        options: [
          { value: "low",       label: "Fewer than 20" },
          { value: "medium",    label: "20–50" },
          { value: "high",      label: "50–100" },
          { value: "very-high", label: "More than 100" },
        ],
      };

  const systemQuestion = isDentalMedical
    ? {
        id: "currentSystem",
        question: "How would you rate your current call handling?",
        columns: 2,
        options: [
          { value: "strong",   label: "We never miss calls — fully staffed" },
          { value: "good",     label: "Occasionally miss during busy periods" },
          { value: "poor",     label: "Frequently miss calls" },
          { value: "none",     label: "No system — calls go to voicemail" },
        ],
      }
    : isLegal
    ? {
        id: "currentSystem",
        question: "How would you describe your current intake process?",
        columns: 2,
        options: [
          { value: "none",     label: "Fully manual — phone and notes" },
          { value: "poor",     label: "Basic tools — spreadsheets" },
          { value: "good",     label: "Partial CRM or automation" },
          { value: "strong",   label: "Mostly automated already" },
        ],
      }
    : {
        id: "currentSystem",
        question: "How quickly do you typically respond to new leads?",
        columns: 2,
        options: [
          { value: "strong",   label: "Within minutes" },
          { value: "good",     label: "Within an hour" },
          { value: "poor",     label: "Within a few hours" },
          { value: "none",     label: "Same day or longer" },
        ],
      };

  return [
    volumeQuestion,
    systemQuestion,
    {
      id: "isDecisionMaker",
      question: "Are you the decision-maker for this investment?",
      columns: 2,
      options: [
        { value: "yes",    label: "Yes, I make the call" },
        { value: "shared", label: "It's a shared decision" },
        { value: "no",     label: "No — I'd need to involve others" },
      ],
    },
    {
      id: "timeline",
      question: "When are you looking to implement?",
      columns: 2,
      options: [
        { value: "immediately",  label: "Immediately — within 30 days" },
        { value: "1-3-months",   label: "Next 1–3 months" },
        { value: "3-6-months",   label: "In 3–6 months" },
        { value: "exploring",    label: "Just exploring for now" },
      ],
    },
  ];
}

export function formatCurrency(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
}

export const tierConfig = {
  high:   { label: "High Intent",    color: "text-blue-400",    border: "border-blue-500/40",    bg: "bg-blue-950/30" },
  medium: { label: "Good Potential", color: "text-neutral-300", border: "border-neutral-500/40", bg: "bg-neutral-800/30" },
  low:    { label: "Early Stage",    color: "text-neutral-500", border: "border-neutral-700/40", bg: "bg-neutral-900/30" },
} as const;

// ─── Label maps for storage / display ─────────────────────────────────────────

export const questionLabels: Record<string, string> = {
  industry:        "Business Industry",
  businessSize:    "Team Size",
  challenge:       "Biggest Operational Challenge",
  goal:            "Primary AI Goal",
  budget:          "Implementation Budget",
  volume:          "Call / Lead Volume",
  currentSystem:   "Current System Quality",
  isDecisionMaker: "Decision Maker Status",
  timeline:        "Implementation Timeline",
};

export const answerLabels: Record<string, Record<string, string>> = {
  industry: {
    dental:          "Dental Practice",
    legal:           "Law Firm",
    medical:         "Medical Clinic",
    "home-services": "Home Services",
    agency:          "Agency / Consulting",
    other:           "Other Service Business",
  },
  businessSize: {
    solo:  "Solo / 1–2 people",
    small: "Small team (3–10)",
    mid:   "Mid-size (11–50)",
    large: "Larger (50+)",
  },
  challenge: {
    "missing-calls":      "Missing calls and leads",
    "manual-scheduling":  "Manual, repetitive scheduling",
    "slow-followup":      "Slow or inconsistent follow-up",
    "staff-overwhelm":    "Staff overwhelmed by admin",
    "inconsistent-comms": "Fragmented customer communication",
  },
  goal: {
    "replace-staff":        "Reduce front desk labor cost",
    "automate-workflows":   "Automate internal workflows",
    "improve-conversion":   "Improve lead conversion",
    "better-communication": "Upgrade customer communication",
  },
  budget: {
    "under-5k": "Under $5,000",
    "5k-15k":   "$5,000 – $15,000",
    "15k-35k":  "$15,000 – $35,000",
    "35k-plus": "$35,000+",
    "not-sure": "Not sure yet",
  },
  volume: {
    low:        "Low volume",
    medium:     "Medium volume",
    high:       "High volume",
    "very-high":"Very high volume",
  },
  currentSystem: {
    strong: "Strong — rarely miss anything",
    good:   "Good — occasional gaps",
    poor:   "Poor — frequent gaps",
    none:   "No real system",
  },
  isDecisionMaker: {
    yes:    "Yes, I make the call",
    shared: "Shared decision",
    no:     "No — need to involve others",
  },
  timeline: {
    immediately:  "Immediately (within 30 days)",
    "1-3-months": "Next 1–3 months",
    "3-6-months": "In 3–6 months",
    exploring:    "Just exploring",
  },
};

export const questionStep: Record<string, number> = {
  industry: 1, businessSize: 1, challenge: 1, goal: 1, budget: 1,
  volume: 2, currentSystem: 2, isDecisionMaker: 2, timeline: 2,
};
