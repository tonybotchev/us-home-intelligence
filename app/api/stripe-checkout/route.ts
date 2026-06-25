import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", { apiVersion: "2026-05-27.dahlia" });
}

// ─── Stripe Price IDs ─────────────────────────────────────────────────────────
// CONSUMER-DIRECT prices — full price always, no discounts
// Set STRIPE_PRICE_ZIP and STRIPE_PRICE_ADDRESS in Vercel env vars
// ─────────────────────────────────────────────────────────────────────────────
const PRICE_IDS: Record<string, string> = {
  "zip-level":        process.env.STRIPE_PRICE_ZIP     || "price_zip_placeholder",
  "address-specific": process.env.STRIPE_PRICE_ADDRESS || "price_address_placeholder",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone,
      address, city, state, zip,
      priceBand, useCase, hasLender, concerns,
      tier, price,
    } = body;

    if (!email || !city || !zip || !tier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const priceId = PRICE_IDS[tier];
    if (!priceId || priceId.includes("placeholder")) {
      return NextResponse.json({ error: "Invalid tier or price not configured" }, { status: 400 });
    }

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
        tier, price: String(price),
        source: "intel.nofluffmarketing.io",
      },
      success_url: `${baseUrl}/buy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/buy`,
      payment_intent_data: {
        description: `USHI ${tier} report — ${address || zip}, ${city}, ${state}`,
        metadata: {
          buyer: `${firstName} ${lastName}`,
          property: `${address || ""} ${city} ${state} ${zip}`.trim(),
          tier,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}
