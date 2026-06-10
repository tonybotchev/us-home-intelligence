import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/realtor-intro-lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buyerName, buyerEmail, buyerPhone, context, realtorSlug } = body;

    if (!buyerName || !buyerEmail) {
      return NextResponse.json({ error: "Buyer name and email required" }, { status: 400 });
    }

    fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerName, buyerEmail, buyerPhone, context, realtorSlug,
        tags: ["realtor-intro-lead", "mortgage-lead", "respa-clean"],
        source: "intel.nofluffmarketing.io/realtor/dashboard",
        nmls: "114198",
        sponsoredBy: "Loan Factory NMLS 320841",
      }),
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
