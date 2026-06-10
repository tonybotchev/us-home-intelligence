import { NextRequest, NextResponse } from "next/server";

// Magic-link auth for realtor dashboard
// In production: generate a signed JWT token, store in KV/DB, send via email
// Here we generate a token and send via GHL email workflow

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Generate a time-limited token (in production: use jose/jsonwebtoken + KV store)
    const token = Buffer.from(JSON.stringify({ email, exp: Date.now() + 3600000 })).toString("base64url");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://intel.nofluffmarketing.io";
    const magicLink = `${baseUrl}/realtor/dashboard?token=${token}`;

    // Trigger GHL email workflow with magic link
    fetch("https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, magicLink, source: "intel.nofluffmarketing.io/magic-link" }),
    }).catch(() => {});

    return NextResponse.json({ ok: true, message: "Magic link sent to your email" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
