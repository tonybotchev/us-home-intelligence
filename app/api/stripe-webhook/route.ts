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

async function dispatchManusReportTask(metadata: Stripe.Metadata) {
  const apiKey = process.env.MANUS_API_KEY;
  if (!apiKey) {
    console.warn("MANUS_API_KEY not set — skipping Manus dispatch");
    return null;
  }

  const {
    firstName, lastName, email, address, city, state, zip,
    priceBand, useCase, concerns, referralSlug, tier,
  } = metadata;

  const prompt = `Produce a US Home Intelligence (USHI) v5 report for the following property.

BUYER: ${firstName} ${lastName} <${email}>
PROPERTY: ${address ? `${address}, ` : ""}${city}, ${state} ${zip}
TIER: ${tier} (${tier === "address-specific" ? "$147 address-specific" : "$97 zip-level"})
PRICE BAND: ${priceBand}
USE CASE: ${useCase}
SPECIFIC CONCERNS: ${concerns || "None provided"}
REFERRAL SLUG: ${referralSlug || "direct"}

REPORT REQUIREMENTS:
- 9,000+ words, 11 chapters
- Chapters: Executive Summary, School District Analysis, Crime Trend Analysis, Flood & Environmental Risk, Market Velocity & Pricing, Demographic Composition (Fair Housing compliant language required), Walkability & Amenities, HOA Landscape, Comparable Sales, Investment Thesis, Fair Housing Disclosure
- Fair Housing compliant language on all demographic and schools chapters
- "Produced exclusively by NoFluff Marketing LLC" on cover and footer
- NO references to "Manus" anywhere in the report
- Output as structured PDF-ready markdown

Deliver the completed report to: ${email}
${referralSlug ? `CC the referring realtor partner (slug: ${referralSlug})` : ""}`;

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata || {};

    const amountPaidUsd = session.amount_total ? session.amount_total / 100 : 0;
    const hasLenderAlready = meta.hasLender === "true" || meta.hasLender === "yes";
    const propertyAddressFull = [meta.address, meta.city, meta.state, meta.zip]
      .filter(Boolean)
      .join(", ");

    // WF2: POST to GHL NFM Buyer Report Purchase workflow (fire-and-forget)
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
      referring_realtor_slug: meta.referralSlug || "",
      amount_paid_usd: amountPaidUsd,
      tier: meta.tier || "",
    });

    // WF4: If buyer has no lender, POST to DHL Warm Lead Touch workflow (fire-and-forget)
    if (!hasLenderAlready) {
      fireWF4DhlWarmLead({
        buyer_email: meta.email || "",
        buyer_first_name: meta.firstName || "",
        property_address_full: propertyAddressFull,
      });
    }

    // Dispatch Manus API task for report production
    const manusTask = await dispatchManusReportTask(meta);
    if (manusTask?.task_id) {
      console.log(`Manus task dispatched: ${manusTask.task_id} for buyer ${meta.email}`);
    }
  }

  return NextResponse.json({ received: true });
}

// Note: raw body parsing is handled by Next.js App Router automatically for webhook routes
