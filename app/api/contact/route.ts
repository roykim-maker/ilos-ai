import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.company || !body.business) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const { name, email, company, phone, business, challenge } = body;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171717;">
      <h2 style="margin-bottom: 24px; font-size: 20px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 160px; vertical-align: top; font-size: 14px;">Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; vertical-align: top; font-size: 14px;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; vertical-align: top; font-size: 14px;">Company</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${company}</td>
        </tr>
        ${
          phone
            ? `<tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; vertical-align: top; font-size: 14px;">Phone</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${phone}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; vertical-align: top; font-size: 14px;">Business</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${business}</td>
        </tr>
        ${
          challenge
            ? `<tr>
          <td style="padding: 10px 0; color: #6b7280; vertical-align: top; font-size: 14px;">Challenge</td>
          <td style="padding: 10px 0; font-size: 14px;">${challenge}</td>
        </tr>`
            : ""
        }
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "ilos.ai <hello@contact.ilos.ai>",
      to: "roy@ilos.ai",
      replyTo: email,
      subject: `New inquiry from ${name} — ${company}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
