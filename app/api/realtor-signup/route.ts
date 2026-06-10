import { NextRequest, NextResponse } from "next/server";

const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/realtor-partner";

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function verifyTREC(licenseNumber: string): Promise<"verified" | "pending"> {
  try {
    // TREC public license lookup — async verification
    const res = await fetch(
      `https://www.trec.texas.gov/apps/license-holder-search/index.php?action=search&license_number=${encodeURIComponent(licenseNumber)}`,
      { signal: AbortSignal.timeout(5000) }
    );
    const text = await res.text();
    // If the page contains "Active" status indicator, mark verified
    if (text.includes("Active") && text.includes(licenseNumber)) return "verified";
    return "pending";
  } catch {
    return "pending";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone, brokerage, title,
      licenseNumber, licenseType, tagline, accentColor, slugPreference,
    } = body;

    if (!firstName || !lastName || !email || !licenseNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate slug
    const rawSlug = slugPreference?.trim()
      ? slugify(slugPreference)
      : slugify(`${firstName}-${lastName}`);
    const slug = rawSlug || slugify(`${firstName}-${lastName}-${Date.now()}`);

    // Verify TREC license (non-blocking — defaults to pending on timeout)
    const verificationStatus = licenseType === "TREC" || licenseType === "Both"
      ? await verifyTREC(licenseNumber)
      : "pending";

    const tags = [
      "realtor-partner-free",
      verificationStatus === "verified" ? "realtor-verified" : "realtor-pending-verification",
    ];

    // POST to GHL NFM webhook
    fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName, lastName, email, phone, brokerage, title,
        licenseNumber, licenseType, tagline, accentColor, slug,
        verificationStatus, tags,
        shareLink: `https://intel.nofluffmarketing.io/r/${slug}`,
        source: "intel.nofluffmarketing.io/realtor",
      }),
    }).catch(() => {});

    return NextResponse.json({
      ok: true,
      slug,
      shareLink: `https://intel.nofluffmarketing.io/r/${slug}`,
      verificationStatus,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
