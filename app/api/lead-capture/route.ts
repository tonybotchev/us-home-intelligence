import { NextRequest, NextResponse } from "next/server";

/**
 * /api/lead-capture
 *
 * Receives form data from /buy or /realtor BEFORE Stripe redirect.
 * POSTs to GHL NFM inbound webhook (env: GHL_NFM_INBOUND_WEBHOOK_URL).
 * If the env var is missing, logs a warning and returns success — never blocks the user.
 *
 * GHL NFM Location ID: tRk2nBMoIkO6EhFzr7jp
 */

const GHL_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "NoFluff-USHI/1.0",
};

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const webhookUrl = process.env.GHL_NFM_INBOUND_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn(
        "[lead-capture] GHL_NFM_INBOUND_WEBHOOK_URL is not set — skipping GHL POST. " +
        "Add this env var in Vercel to enable lead capture. Proceeding to Stripe."
      );
      return NextResponse.json({ ok: true, skipped: true, reason: "GHL_NFM_INBOUND_WEBHOOK_URL not configured" });
    }

    // Enrich payload with location ID
    const enrichedPayload = {
      ...payload,
      location_id: process.env.GHL_NFM_LOCATION_ID || "tRk2nBMoIkO6EhFzr7jp",
    };

    // Fire to GHL inbound webhook
    const ghlRes = await fetch(webhookUrl, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify(enrichedPayload),
    });

    if (!ghlRes.ok) {
      const text = await ghlRes.text().catch(() => "");
      console.error(`[lead-capture] GHL webhook returned ${ghlRes.status}: ${text}`);
      // Still return success to the frontend — don't block the user
      return NextResponse.json({ ok: true, ghl_status: ghlRes.status, ghl_error: text });
    }

    console.log(`[lead-capture] GHL webhook fired OK — tag: ${payload.tag || "unknown"}, source: ${payload.source || "unknown"}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead-capture] Unexpected error:", err);
    // Return success to the frontend — never block the user
    return NextResponse.json({ ok: true, error: "internal_error" });
  }
}
