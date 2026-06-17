/**
 * lib/realtor-store.ts
 *
 * Lightweight realtor slug persistence for intel.nofluffmarketing.io.
 *
 * Architecture:
 *   - In-process global Map (fast reads within the same serverless instance)
 *   - Write-through to /tmp/realtors.json (survives warm restarts within same instance)
 *   - On cold start: hydrates Map from /tmp/realtors.json if it exists
 *
 * Durability note: /tmp is ephemeral per Vercel serverless instance. For
 * production scale, replace with Vercel Postgres / Neon / Upstash Redis.
 * The interface is identical — swap the read/write implementations only.
 *
 * CRIT-7 fix: signup writes here → lookup reads here → /r/[slug] resolves.
 * CRIT-8 fix: verified field gated on TREC check result.
 */

import fs from "fs";
import path from "path";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface RealtorRecord {
  slug: string;
  firstName: string;
  lastName: string;
  name: string;           // "First Last"
  email: string;
  phone: string;
  brokerage: string;
  title: string;
  tagline: string;
  accentColor: string;
  headshot: string | null;
  licenseNumber: string;
  licenseType: string;
  /** CRIT-8: false until TREC confirms Active status */
  verified: boolean;
  /** "verified" | "pending" — raw TREC check result */
  verificationStatus: "verified" | "pending";
  /** ISO timestamp of signup */
  createdAt: string;
  /** true after the first free welcome report has been sent */
  freeReportUsed: boolean;
}

// ─── Store path ───────────────────────────────────────────────────────────────
const STORE_PATH = path.join("/tmp", "realtors.json");

// ─── In-process cache ─────────────────────────────────────────────────────────
// Using a module-level Map so it persists across requests in the same instance.
// Declared as a property on globalThis to survive Next.js hot-reload in dev.
declare global {
  // eslint-disable-next-line no-var
  var __realtorStore: Map<string, RealtorRecord> | undefined;
}

function getStore(): Map<string, RealtorRecord> {
  if (!global.__realtorStore) {
    global.__realtorStore = new Map<string, RealtorRecord>();
    // Hydrate from /tmp on cold start
    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, "utf-8");
        const records: RealtorRecord[] = JSON.parse(raw);
        for (const r of records) {
          global.__realtorStore.set(r.slug, r);
        }
        console.log(`[realtor-store] Hydrated ${records.length} records from ${STORE_PATH}`);
      }
    } catch (err) {
      console.warn("[realtor-store] Could not hydrate from disk:", err);
    }
  }
  return global.__realtorStore;
}

function persist(): void {
  try {
    const records = Array.from(getStore().values());
    fs.writeFileSync(STORE_PATH, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.warn("[realtor-store] Could not persist to disk:", err);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Write a realtor record (create or update). */
export function upsertRealtor(record: RealtorRecord): void {
  getStore().set(record.slug, record);
  persist();
}

/** Look up a realtor by slug. Returns null if not found. */
export function getRealtorBySlug(slug: string): RealtorRecord | null {
  return getStore().get(slug) ?? null;
}

/** Look up a realtor by email. Returns null if not found. */
export function getRealtorByEmail(email: string): RealtorRecord | null {
  for (const r of getStore().values()) {
    if (r.email.toLowerCase() === email.toLowerCase()) return r;
  }
  return null;
}

/** Mark the free welcome report as used. */
export function markFreeReportUsed(slug: string): boolean {
  const r = getStore().get(slug);
  if (!r) return false;
  r.freeReportUsed = true;
  getStore().set(slug, r);
  persist();
  return true;
}

/** Update verified status (called after manual TREC approval). */
export function setVerified(slug: string, verified: boolean): boolean {
  const r = getStore().get(slug);
  if (!r) return false;
  r.verified = verified;
  r.verificationStatus = verified ? "verified" : "pending";
  getStore().set(slug, r);
  persist();
  return true;
}

/** Return all realtors (for admin/cron use). */
export function getAllRealtors(): RealtorRecord[] {
  return Array.from(getStore().values());
}
