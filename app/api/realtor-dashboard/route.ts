import { NextRequest, NextResponse } from "next/server";

// In production: validate magic-link token from Authorization header or cookie
// Query GHL/DB for realtor profile, comp credits, activity feed

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ||
    new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  // Production: validate JWT token, fetch from DB
  // Stub: return null (unauthenticated) — replace with real auth + DB lookup
  return NextResponse.json(null, { status: 401 });
}
