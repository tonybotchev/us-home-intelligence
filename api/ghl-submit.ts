import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── GHL Config ────────────────────────────────────────────────────────────────
const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const GHL_LOCATION = "Jatw8uCMjEcPeIHP2M2z";   // DHL sub-account ← FIXED (was NFM location)
const PIPELINE_ID = "Tj4FMwFtV99kuioRHd9c";   // DHL Marketing Pipeline
const STAGE_NEW_LEAD = "cc217326-139c-4694-8441-1f143075b209";  // DHL New Lead
const STAGE_QUALIFIED = "71c30360-2130-47ea-b047-98422c59ca5b"; // DHL Qualified (hot leads)
const ASSIGNED_TO = "o4PGzAuwLr76ctgW4uut";   // Tony Botchev in DHL sub-account

// ─── Custom Field IDs ──────────────────────────────────────────────────────────
const CF = {
  loanPurpose:       "N1SdIoSQp1QY3GpQb8YF",   // TEXT
  loanType:          "4j2o73jUu00rIrR95mwh",     // TEXT
  creditScoreRange:  "B5VYu7zxYa69UScFPdRP",     // SINGLE_OPTIONS
  creditScore:       "HUk7yVEdXSMD7V5Y5EKP",     // TEXT
  purchasePrice:     "FNN5byLMGjwY0oSouIaN",     // TEXT
  estPurchasePrice:  "I6XAmJf9wzQHtemGiQQ5",     // MONETARY
  annualIncome:      "9lVvOGHAGmIHueJwdqBT",     // TEXT
  monthlyDebts:      "Zb8ps6F4TjmpTOarM9jw",     // TEXT
  downPayment:       "aY6ZHiAxJck1nyywbkVZ",     // MONETARY
  timeline:          "MJgL2zuaeJeHXfYDRBMo",     // TEXT
  purchaseTimeline:  "xKs581iRSjxW9FpFRH7K",     // SINGLE_OPTIONS
  propertyType:      "PleATadF1mdSY6tEWhAm",     // SINGLE_OPTIONS
  hasRealtor:        "AWMO6QL5hJuWFA1YYJie",     // TEXT
  firstTimeBuyer:    "pbfDtJWzoUK2ctxFdI1V",     // TEXT
  leadScore:         "4ch4JForczgQs6fAvSaM",     // TEXT
  leadTemperature:   "29sOCVVX7J9gHzMSwexh",     // TEXT
  leadSource:        "GPqqpLvQBv2cxr0SM31k",     // TEXT
  yourMessage:       "GZpKcFRoIiVA398CD2G4",     // LARGE_TEXT
  smsConsent:        "07qG13d3oMG2TLGnfL5V",     // CHECKBOX (array)
  notes:             "Z08mxQrtz0qx4BymQ9Bq",     // LARGE_TEXT
} as const;

// ─── CORS ──────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://dfwhome.loans",
  "https://www.dfwhome.loans",
];

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin as string | undefined;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ─── Validation ────────────────────────────────────────────────────────────────
function validateRequired(body: Record<string, unknown>): string | null {
  const required = ["firstName", "lastName", "phone", "email"] as const;
  for (const field of required) {
    const val = body[field];
    if (typeof val !== "string" || val.trim().length === 0) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

// ─── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GHL_API_TOKEN;
  if (!token) {
    console.error("GHL_API_TOKEN environment variable is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid request body" });
  }

  // Validate required fields
  const validationError = validateRequired(body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
  };

  try {
    // ── Step 1: Create contact ──────────────────────────────────────────────
    const contactPayload: Record<string, unknown> = {
      locationId: GHL_LOCATION,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      source: body.source || "dfwhome.loans website",
    };

    if (body.tags) contactPayload.tags = body.tags;
    if (body.customFields) contactPayload.customFields = body.customFields;

    // Use upsert to avoid duplicate contact errors
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error("GHL contact creation failed:", contactRes.status, errText);
      return res.status(502).json({ error: "Contact creation failed" });
    }

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    // ── Step 2: Create opportunity ──────────────────────────────────────────
    let opportunityData = null;
    if (contactId) {
      const oppPayload: Record<string, unknown> = {
        pipelineId: PIPELINE_ID,
        locationId: GHL_LOCATION,
        contactId,
        status: "open",
        pipelineStageId: (() => {
          // Map old NFM stage IDs to DHL stage IDs
          const stageMap: Record<string, string> = {
            "de32f2b3-e94c-4956-8ef0-6a46f62ada3d": STAGE_NEW_LEAD,
            "cae260c7-ccc6-47cc-a6e5-8bcc9f7a7cc9": STAGE_QUALIFIED,
          };
          const incoming = body.pipelineStageId as string | undefined;
          return (incoming && stageMap[incoming]) || STAGE_NEW_LEAD;
        })(),
        assignedTo: ASSIGNED_TO,
        source: body.source || "dfwhome.loans website",
      };

      // Opportunity name: "{First} {Last} - {Loan Type} {Loan Purpose}"
      if (body.opportunityName) {
        oppPayload.name = body.opportunityName;
      } else {
        oppPayload.name = `${body.firstName} ${body.lastName} - Inquiry`;
      }

      if (body.monetaryValue !== undefined) {
        oppPayload.monetaryValue = body.monetaryValue;
      }

      const oppRes = await fetch(`${GHL_BASE}/opportunities/`, {
        method: "POST",
        headers,
        body: JSON.stringify(oppPayload),
      });

      if (oppRes.ok) {
        opportunityData = await oppRes.json();
      } else {
        const errText = await oppRes.text();
        console.error("GHL opportunity creation failed:", oppRes.status, errText);
        // Don't fail the whole request — contact was created successfully
      }
    }

    return res.status(200).json({
      success: true,
      contactId,
      opportunityId: opportunityData?.opportunity?.id ?? null,
    });
  } catch (err) {
    console.error("GHL submission error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
