import { NextRequest, NextResponse } from "next/server";
import { fireWF1RealtorSignup } from "@/lib/ghl-webhooks";
import { upsertRealtor, getRealtorByEmail } from "@/lib/realtor-store";
import type { RealtorRecord } from "@/lib/realtor-store";

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function verifyTREC(licenseNumber: string): Promise<"verified" | "pending"> {
  // Reject obviously bogus numbers (all zeros, too short, etc.)
  if (!licenseNumber || /^0+$/.test(licenseNumber.trim()) || licenseNumber.trim().length < 4) {
    return "pending";
  }
  try {
    // TREC public license lookup — async verification
    const res = await fetch(
      `https://www.trec.texas.gov/apps/license-holder-search/index.php?action=search&license_number=${encodeURIComponent(licenseNumber.trim())}`,
      { signal: AbortSignal.timeout(5000) }
    );
    const text = await res.text();
    // Require the exact license number AND 'Active' to appear within 300 chars of each other
    // (i.e., in the same table row). Prevents false positives from generic page text.
    const licIdx = text.indexOf(licenseNumber.trim());
    if (licIdx === -1) return "pending";
    const window = text.slice(Math.max(0, licIdx - 300), licIdx + 300);
    if (window.includes("Active")) return "verified";
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

    // CRIT-8: Verify TREC license (non-blocking — defaults to pending on timeout)
    // Bogus numbers (e.g. 0000000) return "pending" → verified=false
    // verified=false gates the free welcome report behind manual approval
    const verificationStatus = licenseType === "TREC" || licenseType === "Both"
      ? await verifyTREC(licenseNumber)
      : "pending";
    const verified = verificationStatus === "verified";

    // CRIT-7: Persist to realtor store so /r/[slug] resolves immediately
    const existing = getRealtorByEmail(email);
    const record: RealtorRecord = {
      slug,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || "",
      brokerage: brokerage || "",
      title: title || "",
      tagline: tagline || "",
      accentColor: accentColor || "#1a56db",
      headshot: null,
      licenseNumber,
      licenseType: licenseType || "",
      verified,
      verificationStatus,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      freeReportUsed: existing?.freeReportUsed ?? false,
    };
    upsertRealtor(record);

    // WF1: POST to GHL NFM Realtor Partner Signup workflow (fire-and-forget)
    fireWF1RealtorSignup({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || "",
      brokerage: brokerage || "",
      license_id: licenseNumber,
      license_type: licenseType || "",
      custom_slug: slug,
    });

    return NextResponse.json({
      ok: true,
      slug,
      shareLink: `https://intel.nofluffmarketing.io/r/${slug}`,
      /** CRIT-8: surface verified flag so UI can show approval-pending notice */
      verified,
      verificationStatus,
      // Surface extra fields for dashboard / confirmation page
      title: title || "",
      tagline: tagline || "",
      accentColor: accentColor || "#1a56db",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
