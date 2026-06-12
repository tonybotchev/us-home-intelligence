import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", { apiVersion: "2026-05-27.dahlia" });
}

// ─── Stripe Price IDs ─────────────────────────────────────────────────────────
// PUBLIC / DIRECT BUYER prices (unchanged — $97 zip / $147 address)
// Set STRIPE_PRICE_ZIP and STRIPE_PRICE_ADDRESS in Vercel env vars
//
// REALTOR-PARTNER COBRANDED prices (20% off — $77.60 zip / $117.60 address)
// Locked: 2026-06-12 v3 · Supersedes old comp-credit and 50%-off models
// Set STRIPE_PRICE_REALTOR_ZIP and STRIPE_PRICE_REALTOR_ADDRESS in Vercel env vars
// price_1ThbwhK8pV2xVrXzmrsvJ9tc = $77.60 zip
// price_1ThbyiK8pV2xVrXzCbkd78RI = $117.60 address
// ─────────────────────────────────────────────────────────────────────────────
const PRICE_IDS: Record<string, string> = {
  // Public / direct buyer (DHL-only template)
  "zip-level":         process.env.STRIPE_PRICE_ZIP             || "price_zip_placeholder",
  "address-specific":  process.env.STRIPE_PRICE_ADDRESS         || "price_address_placeholder",
  // Realtor-partner cobranded (20% off — Option A)
  "realtor-zip":       process.env.STRIPE_PRICE_REALTOR_ZIP     || "price_1ThbwhK8pV2xVrXzmrsvJ9tc",
  "realtor-address":   process.env.STRIPE_PRICE_REALTOR_ADDRESS || "price_1ThbyiK8pV2xVrXzCbkd78RI",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone,
      address, city, state, zip,
      priceBand, useCase, hasLender, concerns,
      referralSlug, tier, price,
      // Realtor cobrand metadata (populated when ordering via /r/[slug] or dashboard)
      realtorName, realtorBrokerage, realtorLicense, realtorPhone, realtorEmail,
    } = body;

    if (!email || !city || !zip || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const priceId = PRICE_IDS[tier];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://intel.nofluffmarketing.io";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: {
        firstName, lastName, email, phone: phone || "",
        address: address || "", city, state: state || "", zip,
        priceBand: priceBand || "", useCase: useCase || "",
        hasLender: hasLender || "", concerns: concerns || "",
        referralSlug: referralSlug || "",
        tier, price: String(price),
        source: "intel.nofluffmarketing.io",
        // cobranded flag: 'true' = realtor brand + DHL (20% off), 'false' = DHL-only (full price)
        cobranded: body.cobranded === false ? "false" : (referralSlug ? "true" : "false"),
        // Realtor cobrand fields — passed through to report generator
        realtorName: realtorName || "",
        realtorBrokerage: realtorBrokerage || "",
        realtorLicense: realtorLicense || "",
        realtorPhone: realtorPhone || "",
        realtorEmail: realtorEmail || "",
      },
      success_url: `${baseUrl}/buy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: referralSlug ? `${baseUrl}/r/${referralSlug}` : `${baseUrl}/buy`,
      payment_intent_data: {
        description: `USHI ${tier} report — ${address || zip}, ${city}, ${state}`,
        metadata: {
          buyer: `${firstName} ${lastName}`,
          property: `${address || ""} ${city} ${state} ${zip}`.trim(),
          referralSlug: referralSlug || "direct",
          layout: (body.cobranded !== false && referralSlug && referralSlug !== "direct") ? "cobranded" : "dhl-only",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}
