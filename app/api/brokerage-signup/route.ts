import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/brokerage-signup";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brokerageName, stateLicense, officeAddress, opsEmail, agentCount, brokerOwner } = body;

    if (!brokerageName || !opsEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brokerageName, stateLicense, officeAddress, opsEmail, agentCount, brokerOwner,
        tags: ["brokerage-signup", "brokerage-tier"],
        source: "intel.nofluffmarketing.io/brokerage",
      }),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
