/**
 * /api/realtor-upsell-check
 *
 * Daily scheduled endpoint: queries realtor partners and fires WF5 (OCK Realtor Tier Upsell)
 * to GHL for any realtor who meets the upsell criteria:
 *   - paid_reports_through_link_lifetime >= 3, OR
 *   - contact_age >= 30 days
 *
 * TODO: Wire up a Hermes cron to POST to this endpoint once per day.
 *       Example Hermes schedule: POST https://intel.nofluffmarketing.io/api/realtor-upsell-check
 *       with Authorization: Bearer <CRON_SECRET> header, cron: "0 0 9 * * *" (9 AM daily).
 *
 * Vercel Cron alternative (vercel.json — requires Vercel Pro):
 *   {
 *     "crons": [{ "path": "/api/realtor-upsell-check", "schedule": "0 9 * * *" }]
 *   }
 *
 * NOTE: This endpoint currently stubs the realtor data source. In production, replace
 * the getRealtorPartners() function with a real DB/GHL contact query once the data
 * persistence layer (GHL contacts or external DB) is wired in.
 */

import { NextRequest, NextResponse } from "next/server";
import { fireWF5OckRealtorUpsell } from "@/lib/ghl-webhooks";

const UPSELL_LIFETIME_REPORTS_THRESHOLD = 3;
const UPSELL_CONTACT_AGE_DAYS = 30;

interface RealtorPartner {
  email: string;
  first_name: string;
  brokerage: string;
  paid_reports_through_link_lifetime: number;
  created_at: string; // ISO 8601
}

/**
 * TODO: Replace this stub with a real GHL contact query or DB lookup.
 * Query GHL contacts with tag "realtor-partner-free" and return their
 * custom field values for paid_reports_lifetime and created_at.
 *
 * GHL Contacts API: GET /contacts/?locationId=tRk2nBMoIkO6EhFzr7jp&tags=realtor-partner-free
 */
async function getRealtorPartners(): Promise<RealtorPartner[]> {
  // Stub — returns empty array until DB/GHL contact query is implemented
  return [];
}

function contactAgeDays(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
}

export async function POST(req: NextRequest) {
  // Validate cron secret to prevent unauthorized triggers
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let fired = 0;
  let checked = 0;

  try {
    const realtors = await getRealtorPartners();
    checked = realtors.length;

    for (const realtor of realtors) {
      const ageDays = contactAgeDays(realtor.created_at);
      const meetsLifetimeThreshold =
        realtor.paid_reports_through_link_lifetime >= UPSELL_LIFETIME_REPORTS_THRESHOLD;
      const meetsAgeThreshold = ageDays >= UPSELL_CONTACT_AGE_DAYS;

      if (meetsLifetimeThreshold || meetsAgeThreshold) {
        // WF5: POST to GHL NFM OCK Realtor Tier Upsell workflow (fire-and-forget)
        fireWF5OckRealtorUpsell({
          realtor_email: realtor.email,
          realtor_first_name: realtor.first_name,
          brokerage: realtor.brokerage,
          lifetime_paid_reports: realtor.paid_reports_through_link_lifetime,
        });

        fired++;
        console.log(
          `[realtor-upsell-check] WF5 fired for ${realtor.email} ` +
          `(lifetime_reports=${realtor.paid_reports_through_link_lifetime}, age_days=${ageDays})`
        );
      }
    }
  } catch (err) {
    console.error("[realtor-upsell-check] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error during upsell check" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, checked, wf5_fired: fired });
}

// Also support GET for Vercel Cron (which sends GET requests)
export async function GET(req: NextRequest) {
  return POST(req);
}
