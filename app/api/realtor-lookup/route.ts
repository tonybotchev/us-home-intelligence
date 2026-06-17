import { NextRequest, NextResponse } from "next/server";
import { getRealtorBySlug } from "@/lib/realtor-store";

/**
 * GET /api/realtor-lookup?slug=<slug>
 *
 * CRIT-7 fix: reads from realtor-store (in-process Map + /tmp/realtors.json).
 * Previously a stub that always returned 404, causing /r/[slug] to show
 * "Partner Link Not Found" for every newly signed-up realtor.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "slug is required" }, { status: 400 });

  const realtor = getRealtorBySlug(slug);
  if (!realtor) return NextResponse.json(null, { status: 404 });

  return NextResponse.json({
    name: realtor.name,
    brokerage: realtor.brokerage,
    headshot: realtor.headshot,
    accentColor: realtor.accentColor,
    tagline: realtor.tagline,
    title: realtor.title,
    verified: realtor.verified,
  });
}
