/**
 * /api/manus-callback
 *
 * Inbound callback endpoint for Manus task completion events.
 * When a USHI report task completes, Manus POSTs here and this handler
 * fires GHL WF3 (Report Delivery) with the task result.
 *
 * This is the push-based complement to /api/check-manus-tasks (which polls).
 * Wire the Manus task webhook URL to: https://intel.nofluffmarketing.io/api/manus-callback
 *
 * Security: set MANUS_CALLBACK_SECRET env var and pass it as
 *   x-manus-callback-secret: <secret>  in the Manus webhook configuration.
 *
 * Expected body:
 *   {
 *     task_id:                string  — Manus task ID
 *     status:                 string  — "completed" | "failed" | ...
 *     pdf_url:                string  — public URL of the generated PDF
 *     buyer_email:            string
 *     property_address_full:  string
 *     referring_realtor_slug: string  (optional)
 *   }
 */
import { NextRequest, NextResponse } from "next/server";
import { fireWF3ReportDelivery } from "@/lib/ghl-webhooks";

export async function POST(req: NextRequest) {
  try {
    // Optional: validate a shared secret to prevent spoofed callbacks
    const callbackSecret = process.env.MANUS_CALLBACK_SECRET;
    if (callbackSecret) {
      const authHeader = req.headers.get("x-manus-callback-secret") || "";
      if (authHeader !== callbackSecret) {
        console.warn("[manus-callback] Invalid callback secret — request rejected");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await req.json();
    const {
      task_id,
      status,
      pdf_url,
      buyer_email,
      property_address_full,
      referring_realtor_slug,
    } = body;

    if (!task_id || !buyer_email) {
      return NextResponse.json({ error: "Missing required fields: task_id, buyer_email" }, { status: 400 });
    }

    console.log(`[manus-callback] task_id=${task_id} status=${status} buyer=${buyer_email}`);

    // WF3: POST to GHL NFM Report Delivery workflow (fire-and-forget)
    fireWF3ReportDelivery({
      task_id,
      status: status || "completed",
      pdf_url: pdf_url || "",
      buyer_email,
      property_address_full: property_address_full || "",
      referring_realtor_slug: referring_realtor_slug || "",
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[manus-callback] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
