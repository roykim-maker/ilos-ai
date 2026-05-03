import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { questionLabels, answerLabels, questionStep } from "@/lib/diagnostic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.name) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const {
    name,
    email,
    score,
    tier,
    industry,
    systems = [],
    answers = {},
    estimatedSavings,
    automationPotential,
  } = body;

  const tierLabel =
    tier === "high" ? "High Intent" : tier === "medium" ? "Good Potential" : "Early Stage";
  const systemList = Array.isArray(systems) ? systems.join(", ") : systems ?? "—";

  // ── 1. Persist to Supabase (non-blocking — never fails the request) ──────
  let leadId: string | null = null;
  try {
    const supabase = getSupabase();

    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        industry:                  answers.industry          ?? industry ?? null,
        business_size:             answers.businessSize      ?? null,
        goal:                      answers.goal              ?? null,
        budget:                    answers.budget            ?? null,
        timeline:                  answers.timeline          ?? null,
        decision_maker:            answers.isDecisionMaker   ?? null,
        score:                     score                     ?? null,
        tier:                      tier                      ?? null,
        estimated_savings_low:     estimatedSavings?.min     ?? null,
        estimated_savings_high:    estimatedSavings?.max     ?? null,
        automation_potential:      automationPotential       ?? null,
        recommended_primary_system:   systems[0]            ?? null,
        recommended_secondary_system: systems[1]            ?? null,
        recommended_tertiary_system:  systems[2]            ?? null,
        source:      "diagnostic",
        raw_payload: body,
      })
      .select("id")
      .single();

    if (leadError) throw leadError;
    leadId = leadData.id;

    // Insert one row per diagnostic answer
    const responseRows = Object.entries(answers as Record<string, string>)
      .filter(([, v]) => v)
      .map(([key, value]) => ({
        lead_id:        leadId,
        question_key:   key,
        question_label: questionLabels[key] ?? key,
        answer_value:   String(value),
        answer_label:   answerLabels[key]?.[value] ?? value,
        answer_type:    "single_choice",
        step:           questionStep[key] ?? 0,
        raw_answer:     { key, value, label: answerLabels[key]?.[value] ?? value },
      }));

    // Log the email_gate_completed event — run both inserts in parallel
    await Promise.all([
      responseRows.length
        ? supabase.from("diagnostic_responses").insert(responseRows)
        : Promise.resolve(),
      supabase.from("lead_events").insert({
        lead_id:       leadId,
        event_type:    "email_gate_completed",
        event_payload: { score, tier, industry, timestamp: new Date().toISOString() },
      }),
    ]);
  } catch (err) {
    console.error("[capture-lead] Supabase error:", err);
    // Continue — Resend notification still fires even if storage fails
  }

  // ── 2. Resend notification ───────────────────────────────────────────────
  const savingsLine =
    body.estimatedSavings
      ? `$${Math.round(body.estimatedSavings.min / 1000)}K – $${Math.round(body.estimatedSavings.max / 1000)}K/yr`
      : "—";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
      <h2 style="margin-bottom:8px;font-size:20px;">New Diagnostic Lead</h2>
      <p style="color:#6b7280;margin-bottom:24px;font-size:14px;">
        Unlocked results via email gate.${leadId ? ` Lead ID: <code>${leadId}</code>` : ""}
      </p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;width:160px;font-size:14px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Industry</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${answerLabels.industry?.[industry] ?? industry ?? "—"}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Score</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:600;">${score ?? "—"}/100 — ${tierLabel}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Est. Savings</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${savingsLine}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Budget</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${answerLabels.budget?.[answers.budget] ?? answers.budget ?? "—"}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Timeline</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${answerLabels.timeline?.[answers.timeline] ?? answers.timeline ?? "—"}</td></tr>
        <tr><td style="padding:10px 0;color:#6b7280;font-size:14px;">Recommended</td><td style="padding:10px 0;font-size:14px;">${systemList}</td></tr>
      </table>
    </div>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:    "ilos.ai <hello@contact.ilos.ai>",
      to:      "roy@ilos.ai",
      replyTo: email,
      subject: `New lead: ${name} — ${score ?? "??"}/${100} ${tierLabel} (${answerLabels.industry?.[industry] ?? industry ?? "unknown"})`,
      html,
    });
  } catch (err) {
    console.error("[capture-lead] Resend error:", err);
  }

  return NextResponse.json({ success: true, leadId });
}
