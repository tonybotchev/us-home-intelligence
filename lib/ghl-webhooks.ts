/**
 * GHL NFM Workflow Webhook URLs
 * Sub-account location ID: tRk2nBMoIkO6EhFzr7jp
 *
 * All POSTs:
 *   - Content-Type: application/json
 *   - User-Agent: NoFluff-USHI/1.0  (required by Cloudflare on GHL endpoints)
 *   - try/catch with console.error logging on failure
 *   - fire-and-forget (non-blocking — never delays the user-facing response)
 */

const GHL_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "NoFluff-USHI/1.0",
};

// WF1 — Realtor Partner Signup
const WF1_REALTOR_PARTNER_SIGNUP =
  "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/3950d4c8-7f53-4fed-9705-f7be8d3a8c71";

// WF2 — Buyer Report Purchase
const WF2_BUYER_REPORT_PURCHASE =
  "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/f1e3889c-81c3-4ec4-bf70-8cdc917d480a";

// WF3 — Report Delivery (Manus task complete)
const WF3_REPORT_DELIVERY =
  "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/4a74d09f-a03f-4d60-85bb-ad0c37672cd2";

// WF4 — DHL Warm Lead Touch (triggered when buyer has no lender yet)
const WF4_DHL_WARM_LEAD =
  "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/8ebc51b6-207c-478e-8ed2-8a183a7a4a11";

// WF5 — OCK Realtor Tier Upsell (triggered by daily cron / Hermes scheduler)
const WF5_OCK_REALTOR_UPSELL =
  "https://services.leadconnectorhq.com/hooks/tRk2nBMoIkO6EhFzr7jp/webhook-trigger/068dc872-2b99-411a-aacc-85087c496fa4";

// ---------------------------------------------------------------------------
// Typed payload interfaces
// ---------------------------------------------------------------------------

export interface WF1Payload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  brokerage: string;
  license_id: string;
  license_type: string;
  custom_slug: string;
}

export interface WF2Payload {
  stripe_session_id: string;
  buyer_first_name: string;
  buyer_last_name: string;
  buyer_email: string;
  buyer_phone: string;
  property_address_full: string;
  property_city: string;
  property_state: string;
  property_zip: string;
  purchase_price_band: string;
  use_case: string;
  has_lender_already: boolean;
  referring_realtor_slug: string;
  amount_paid_usd: number;
  tier: string;
}

export interface WF3Payload {
  task_id: string;
  status: string;
  pdf_url: string;
  buyer_email: string;
  property_address_full: string;
  referring_realtor_slug: string;
}

export interface WF4Payload {
  buyer_email: string;
  buyer_first_name: string;
  property_address_full: string;
}

export interface WF5Payload {
  realtor_email: string;
  realtor_first_name: string;
  brokerage: string;
  lifetime_paid_reports: number;
}

// ---------------------------------------------------------------------------
// Fire-and-forget POST helper
// ---------------------------------------------------------------------------

function fireWebhook(url: string, payload: Record<string, unknown>, label: string): void {
  fetch(url, {
    method: "POST",
    headers: GHL_HEADERS,
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error(`[GHL webhook] ${label} POST failed:`, err);
  });
}

// ---------------------------------------------------------------------------
// Public fire functions — all non-blocking
// ---------------------------------------------------------------------------

/** WF1: Realtor Partner Signup — call after TREC validation + slug generation */
export function fireWF1RealtorSignup(payload: WF1Payload): void {
  fireWebhook(WF1_REALTOR_PARTNER_SIGNUP, payload as unknown as Record<string, unknown>, "WF1 Realtor Partner Signup");
}

/** WF2: Buyer Report Purchase — call after Stripe checkout.session.completed + Manus dispatch */
export function fireWF2BuyerReportPurchase(payload: WF2Payload): void {
  fireWebhook(WF2_BUYER_REPORT_PURCHASE, payload as unknown as Record<string, unknown>, "WF2 Buyer Report Purchase");
}

/** WF3: Report Delivery — call when a Manus report task completes */
export function fireWF3ReportDelivery(payload: WF3Payload): void {
  fireWebhook(WF3_REPORT_DELIVERY, payload as unknown as Record<string, unknown>, "WF3 Report Delivery");
}

/** WF4: DHL Warm Lead Touch — call when buyer has no lender (has_lender_already === false) */
export function fireWF4DhlWarmLead(payload: WF4Payload): void {
  fireWebhook(WF4_DHL_WARM_LEAD, payload as unknown as Record<string, unknown>, "WF4 DHL Warm Lead Touch");
}

/** WF5: OCK Realtor Tier Upsell — call from daily cron / Hermes scheduler */
export function fireWF5OckRealtorUpsell(payload: WF5Payload): void {
  fireWebhook(WF5_OCK_REALTOR_UPSELL, payload as unknown as Record<string, unknown>, "WF5 OCK Realtor Tier Upsell");
}
