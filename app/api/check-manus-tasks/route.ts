/**
 * /api/check-manus-tasks
 *
 * Polls the Manus API for completed report tasks and fires WF3 (Report Delivery)
 * to GHL when a task reaches "completed" status.
 *
 * Designed to be called by a scheduler (Vercel Cron or Hermes cron).
 *
 * TODO: Wire up a Hermes cron to POST to this endpoint once per hour (or as needed).
 *       Example Hermes schedule: POST https://intel.nofluffmarketing.io/api/check-manus-tasks
 *       with Authorization: Bearer <CRON_SECRET> header.
 *
 * Vercel Cron alternative (vercel.json):
 *   {
 *     "crons": [{ "path": "/api/check-manus-tasks", "schedule": "0 * * * *" }]
 *   }
 *   Requires Vercel Pro plan. Set CRON_SECRET env var and validate below.
 */

import { NextRequest, NextResponse } from "next/server";
import { fireWF3ReportDelivery } from "@/lib/ghl-webhooks";

const MANUS_API_BASE = "https://api.manus.ai";

interface ManusTask {
  task_id: string;
  status: string;
  output?: {
    pdf_url?: string;
    [key: string]: unknown;
  };
  metadata?: {
    buyer_email?: string;
    property_address_full?: string;
    referring_realtor_slug?: string;
    [key: string]: unknown;
  };
}

async function fetchPendingTasks(apiKey: string): Promise<ManusTask[]> {
  const res = await fetch(`${MANUS_API_BASE}/v2/tasks?status=pending,running`, {
    headers: {
      "Content-Type": "application/json",
      "x-manus-api-key": apiKey,
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[check-manus-tasks] Failed to fetch tasks:", err);
    return [];
  }

  const data = await res.json();
  return Array.isArray(data?.tasks) ? data.tasks : [];
}

async function fetchTaskStatus(apiKey: string, taskId: string): Promise<ManusTask | null> {
  const res = await fetch(`${MANUS_API_BASE}/v2/task/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
      "x-manus-api-key": apiKey,
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    console.error(`[check-manus-tasks] Failed to fetch task ${taskId}:`, await res.text());
    return null;
  }

  return res.json();
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

  const apiKey = process.env.MANUS_API_KEY;
  if (!apiKey) {
    console.warn("[check-manus-tasks] MANUS_API_KEY not set — skipping poll");
    return NextResponse.json({ skipped: true, reason: "MANUS_API_KEY not configured" });
  }

  let fired = 0;
  let checked = 0;

  try {
    const pendingTasks = await fetchPendingTasks(apiKey);
    checked = pendingTasks.length;

    for (const task of pendingTasks) {
      const latest = await fetchTaskStatus(apiKey, task.task_id);
      if (!latest) continue;

      if (latest.status === "completed") {
        const pdfUrl = latest.output?.pdf_url || "";
        const buyerEmail = latest.metadata?.buyer_email || "";
        const propertyAddressFull = latest.metadata?.property_address_full || "";
        const referringRealtorSlug = latest.metadata?.referring_realtor_slug || "";

        // WF3: POST to GHL NFM Report Delivery workflow (fire-and-forget)
        fireWF3ReportDelivery({
          task_id: latest.task_id,
          status: latest.status,
          pdf_url: pdfUrl,
          buyer_email: buyerEmail,
          property_address_full: propertyAddressFull,
          referring_realtor_slug: referringRealtorSlug,
        });

        fired++;
        console.log(`[check-manus-tasks] WF3 fired for task ${latest.task_id} (${buyerEmail})`);
      }
    }
  } catch (err) {
    console.error("[check-manus-tasks] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error during task poll" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, checked, wf3_fired: fired });
}

// Also support GET for Vercel Cron (which sends GET requests)
export async function GET(req: NextRequest) {
  return POST(req);
}
