import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.name) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { name, email, score, tier, industry, systems } = body;

  const tierLabel = tier === "high" ? "High Intent" : tier === "medium" ? "Good Potential" : "Early Stage";
  const systemList = Array.isArray(systems) ? systems.join(", ") : systems ?? "—";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#171717;">
      <h2 style="margin-bottom:8px;font-size:20px;">New Diagnostic Lead</h2>
      <p style="color:#6b7280;margin-bottom:24px;font-size:14px;">Completed the AI OS diagnostic and unlocked their results.</p>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;width:160px;font-size:14px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Industry</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">${industry ?? "—"}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:14px;">Score</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:600;">${score ?? "—"}/100 — ${tierLabel}</td></tr>
        <tr><td style="padding:10px 0;color:#6b7280;font-size:14px;">Recommended</td><td style="padding:10px 0;font-size:14px;">${systemList}</td></tr>
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "ilos.ai <hello@contact.ilos.ai>",
      to: "roy@ilos.ai",
      replyTo: email,
      subject: `New diagnostic lead: ${name} — Score ${score ?? "??"}/100 (${tierLabel})`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process. Please try again." },
      { status: 500 }
    );
  }
}
