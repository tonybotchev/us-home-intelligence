import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  fireWF2BuyerReportPurchase,
  fireWF4DhlWarmLead,
} from "@/lib/ghl-webhooks";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", { apiVersion: "2026-05-27.dahlia" });
}

const MANUS_API_BASE = "https://api.manus.ai";

// ─── DHL / Tony Botchev constants ────────────────────────────────────────────
const DHL_TONY_NAME    = "Tony Botchev";
const DHL_TONY_NMLS    = "NMLS #114198";
const DHL_COMPANY      = "DFW Homes & Loans";
const DHL_SPONSOR      = "Loan Factory, NMLS #320841";
const DHL_WEBSITE      = "dfwhome.loans";
const DHL_APPLY        = "dfwhome.loans/apply";
const DHL_PHONE        = "(945) 300-4002";
const DHL_BIO_DIRECT   =
  "Tony Botchev specializes in DFW mortgages — conventional, FHA, VA, jumbo, DSCR — " +
  "with 20+ years in the market and a sponsor-backed 24-hour pre-qualification turnaround. " +
  "Ready to get pre-qualified? Visit dfwhome.loans/apply or call (945) 300-4002.";

// ─── Report prompt builder ────────────────────────────────────────────────────
// Consumer-direct only. Full price always: $97 zip / $147 address.
// DHL-Only layout — Tony Botchev / DFW Homes & Loans sole publisher.
// ─────────────────────────────────────────────────────────────────────────────
async function dispatchManusReportTask(metadata: Stripe.Metadata) {
  const apiKey = process.env.MANUS_API_KEY;
  if (!apiKey) {
    console.warn("MANUS_API_KEY not set — skipping Manus dispatch");
    return null;
  }

  const {
    firstName, lastName, email, address, city, state, zip,
    priceBand, useCase, concerns, tier,
  } = metadata;

  const buyerFullName = `${firstName} ${lastName}`;
  const propertyLine = address ? `${address}, ${city}, ${state} ${zip}` : `${city}, ${state} ${zip}`;

  const prompt = `Produce a US Home Intelligence (USHI) v5 report — DHL-ONLY DIRECT BUYER LAYOUT.

BUYER: ${buyerFullName} <${email}>
PROPERTY: ${propertyLine}
TIER: ${tier} (${tier === "address-specific" ? "$147 address-specific" : "$97 zip-level"})
PRICE BAND: ${priceBand}
USE CASE: ${useCase}
SPECIFIC CONCERNS: ${concerns || "None provided"}
CHANNEL: direct consumer purchase

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPORT LAYOUT: DHL-ONLY (Tony Botchev / DFW Homes & Loans sole publisher)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COVER PAGE LAYOUT:
  ┌─────────────────────────────────────────────────────┐
  │  [TONY BOTCHEV PHOTO PLACEHOLDER]                   │
  │  ${DHL_TONY_NAME}                                   │
  │  ${DHL_COMPANY}                                     │
  │  ${DHL_TONY_NMLS}                                   │
  │  Sponsored by ${DHL_SPONSOR}                        │
  │  ${DHL_WEBSITE} · ${DHL_PHONE}                      │
  └─────────────────────────────────────────────────────┘
  Report title: US Home Intelligence Report
  Property: ${propertyLine}
  Prepared for: ${buyerFullName}
  Date: [CURRENT DATE]

RUNNING HEADER (every page, small but visible):
  Left: ${DHL_COMPANY}
  Right: intel.nofluffmarketing.io

RUNNING FOOTER (every page):
  Left: ${DHL_COMPANY} · ${DHL_TONY_NMLS}
  Center: Page [N] of [TOTAL]
  Right: Produced exclusively by NoFluff Marketing LLC

REPORT CONTENT REQUIREMENTS:
- 9,000+ words, 13 chapters
- Chapters in order:
  1. Executive Summary
  2. School District Analysis
  3. Crime Trend Analysis
  4. Flood & Environmental Risk
  5. Market Velocity & Pricing
  6. Demographic Composition (Fair Housing compliant language required)
  7. Walkability & Amenities
  8. HOA Landscape
  9. Comparable Sales
  10. Investment Thesis
  11. Fair Housing Disclosure
  12. YOUR MORTGAGE PARTNER (see below)
  13. References & Glossary

CHAPTER 12 — YOUR MORTGAGE PARTNER (insert after Chapter 11, before References):
  Section heading: "Your Mortgage Partner"
  Layout:
    [TONY BOTCHEV PHOTO PLACEHOLDER]
    ${DHL_TONY_NAME}
    ${DHL_TONY_NMLS} · Sponsored by ${DHL_SPONSOR}
    ${DHL_COMPANY} · ${DHL_WEBSITE} · ${DHL_PHONE}

  Bio paragraph (use this exact text):
  "${DHL_BIO_DIRECT}"

  CTA box (prominent, styled as a call-to-action):
    Heading: "Get Pre-Qualified in 24 Hours"
    Body: "Tony's team can have your pre-qualification letter ready in under 24 hours. No obligation — just clarity on what you can buy."
    Button text: "Apply at ${DHL_APPLY}"
    Phone: "Or call ${DHL_PHONE}"
    Disclosure: "${DHL_TONY_NMLS} · Sponsored by ${DHL_SPONSOR} · Subject to credit approval."

ADDITIONAL REQUIREMENTS:
- Fair Housing compliant language on all demographic and schools chapters
- NO references to "Manus" anywhere in the report
- Output as structured PDF-ready markdown

Deliver the completed report to: ${email}`;

  const res = await fetch(`${MANUS_API_BASE}/v2/task/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-manus-api-key": apiKey,
    },
    body: JSON.stringify({
      message: { role: "user", content: prompt },
      agent_profile: "standard",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Manus task creation failed:", err);
    return null;
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !sig) {
    return NextResponse.json({ error: "Missing webhook config" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // payment_intent.succeeded: update GHL contact tag USHI-Buyer-Started → USHI-Buyer-Paid
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const inboundWebhookUrl = process.env.GHL_NFM_INBOUND_WEBHOOK_URL;
    if (inboundWebhookUrl) {
      const piMeta = paymentIntent.metadata || {};
      const buyerEmail = piMeta.buyer_email || paymentIntent.receipt_email || "";
      fetch(inboundWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "User-Agent": "NoFluff-USHI/1.0" },
        body: JSON.stringify({
          email: buyerEmail,
          tag: "USHI-Buyer-Paid",
          remove_tag: "USHI-Buyer-Started",
          order_id: paymentIntent.id,
          amount_paid: paymentIntent.amount ? paymentIntent.amount / 100 : 0,
          report_tier: piMeta.tier || "zip-level",
          source: "stripe_webhook",
          location_id: process.env.GHL_NFM_LOCATION_ID || "tRk2nBMoIkO6EhFzr7jp",
        }),
      }).catch((err) => console.error("[stripe-webhook] GHL payment_intent.succeeded POST failed:", err));
      console.log(`[stripe-webhook] GHL USHI-Buyer-Paid tag fired for payment_intent ${paymentIntent.id}`);
    } else {
      console.warn("[stripe-webhook] GHL_NFM_INBOUND_WEBHOOK_URL not set — skipping USHI-Buyer-Paid tag update");
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata || {};

    const amountPaidUsd = session.amount_total ? session.amount_total / 100 : 0;
    const hasLenderAlready = meta.hasLender === "true" || meta.hasLender === "yes";
    const propertyAddressFull = [meta.address, meta.city, meta.state, meta.zip]
      .filter(Boolean)
      .join(", ");

    // WF2: POST to GHL NFM Buyer Report Purchase workflow
    fireWF2BuyerReportPurchase({
      stripe_session_id: session.id,
      buyer_first_name: meta.firstName || "",
      buyer_last_name: meta.lastName || "",
      buyer_email: meta.email || "",
      buyer_phone: meta.phone || "",
      property_address_full: propertyAddressFull,
      property_city: meta.city || "",
      property_state: meta.state || "",
      property_zip: meta.zip || "",
      purchase_price_band: meta.priceBand || "",
      use_case: meta.useCase || "",
      has_lender_already: hasLenderAlready,
      amount_paid_usd: amountPaidUsd,
      tier: meta.tier || "",
    });

    // WF4: If buyer has no lender, POST to DHL Warm Lead Touch workflow
    if (!hasLenderAlready) {
      fireWF4DhlWarmLead({
        buyer_email: meta.email || "",
        buyer_first_name: meta.firstName || "",
        property_address_full: propertyAddressFull,
      });
    }

    // Dispatch Manus API task to generate the report
    const manusTask = await dispatchManusReportTask(meta);
    if (manusTask?.task_id) {
      console.log(`Manus task dispatched: ${manusTask.task_id} for buyer ${meta.email}`);
    }
  }

  return NextResponse.json({ received: true });
}
