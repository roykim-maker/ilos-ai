import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.leadId || !body?.eventType) {
    return NextResponse.json({ error: "Missing leadId or eventType." }, { status: 400 });
  }

  const { leadId, eventType, eventPayload = {} } = body;

  try {
    const supabase = getSupabase();
    await supabase.from("lead_events").insert({
      lead_id:       leadId,
      event_type:    eventType,
      event_payload: { ...eventPayload, timestamp: new Date().toISOString() },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[lead-event] Supabase error:", err);
    return NextResponse.json({ success: false });
  }
}
