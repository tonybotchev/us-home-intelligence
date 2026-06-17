/**
 * DESIGN: Kinetic Texas — Deep Pre-Qualification Wizard
 * 8 steps designed to filter tire kickers and surface serious buyers only.
 * Every field maps to GHL custom fields for location 4mO3eTmt4MzqY4CfnMGW
 *
 * Steps:
 *  1. Loan Goal (type + property intent)
 *  2. Property Details (type, price, down payment, location)
 *  3. Financial Profile (credit, income, employment)
 *  4. Debts & Assets (monthly debts, savings, assets)
 *  5. Co-Borrower (yes/no, combined income)
 *  6. Timeline & Situation (urgency, realtor, first-time buyer, previous foreclosure/bankruptcy)
 *  7. Loan History (current mortgage, other properties owned)
 *  8. Contact Info + SMS Consent
 *
 * Lead Scoring:
 *  HOT  (80+): Ready to close, strong credit, solid income, realtor engaged
 *  WARM (45-79): Motivated but needs prep
 *  COLD (<45): Exploring, not ready
 */
import { useState } from "react";
import {
  ArrowRight, ArrowLeft, CheckCircle2,
  Home, DollarSign, CreditCard, Briefcase,
  Users, Calendar, FileText, User
} from "lucide-react";
import NMLSDisclosure from "./NMLSDisclosure";
import { trackLeadFormSubmit } from "@/lib/analytics";

// ─── GHL Config (IDs only — token is server-side) ─────────────────────────────
const GHL_LOCATION   = "4mO3eTmt4MzqY4CfnMGW";
const PIPELINE_ID    = "LDVnhpPD75zLj8I1Rfzs";
const STAGE_NEW_LEAD = "de32f2b3-e94c-4956-8ef0-6a46f62ada3d";
const STAGE_PREQUAL  = "cae260c7-ccc6-47cc-a6e5-8bcc9f7a7cc9";

const CF = {
  loanPurpose:      "N1SdIoSQp1QY3GpQb8YF",   // TEXT — separate from loanType
  loanType:         "4j2o73jUu00rIrR95mwh",   // TEXT
  propertyType:     "PleATadF1mdSY6tEWhAm",   // SINGLE_OPTIONS
  purchasePriceTxt: "FNN5byLMGjwY0oSouIaN",   // TEXT — human-readable price
  purchasePrice:    "I6XAmJf9wzQHtemGiQQ5",   // MONETARY — numeric
  downPayment:      "aY6ZHiAxJck1nyywbkVZ",   // MONETARY
  creditScoreRange: "B5VYu7zxYa69UScFPdRP",   // SINGLE_OPTIONS
  creditScore:      "HUk7yVEdXSMD7V5Y5EKP",   // TEXT
  annualIncome:     "9lVvOGHAGmIHueJwdqBT",   // TEXT
  monthlyDebts:     "Zb8ps6F4TjmpTOarM9jw",   // TEXT
  firstTimeBuyer:   "pbfDtJWzoUK2ctxFdI1V",   // TEXT
  hasRealtor:       "AWMO6QL5hJuWFA1YYJie",   // TEXT
  timeline:         "MJgL2zuaeJeHXfYDRBMo",   // TEXT
  purchaseTimeline: "xKs581iRSjxW9FpFRH7K",   // SINGLE_OPTIONS
  leadSource:       "GPqqpLvQBv2cxr0SM31k",   // TEXT
  leadScore:        "4ch4JForczgQs6fAvSaM",   // TEXT
  leadTemp:         "29sOCVVX7J9gHzMSwexh",   // TEXT
  yourMessage:      "GZpKcFRoIiVA398CD2G4",   // LARGE_TEXT
  smsConsent:       "07qG13d3oMG2TLGnfL5V",   // CHECKBOX — must be ["Yes"]
  notes:            "Z08mxQrtz0qx4BymQ9Bq",   // LARGE_TEXT
};

// ─── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Goal",      icon: Home },
  { id: 2, label: "Property",  icon: DollarSign },
  { id: 3, label: "Finances",  icon: CreditCard },
  { id: 4, label: "Debts",     icon: Briefcase },
  { id: 5, label: "Co-Borrower", icon: Users },
  { id: 6, label: "Timeline",  icon: Calendar },
  { id: 7, label: "History",   icon: FileText },
  { id: 8, label: "Contact",   icon: User },
];

// ─── Shared Styles ─────────────────────────────────────────────────────────────
const S = {
  input: {
    background: "oklch(0.18 0.04 155)",
    border: "1px solid oklch(0.975 0.008 85 / 0.15)",
    color: "oklch(0.975 0.008 85)",
    borderRadius: 0,
    padding: "0.875rem 1rem",
    width: "100%",
    fontFamily: "Outfit, sans-serif",
    fontSize: "0.9rem",
    outline: "none",
  } as React.CSSProperties,
  label: {
    fontFamily: "Outfit, sans-serif",
    fontSize: "0.68rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    color: "oklch(0.78 0.02 85)",
    display: "block",
    marginBottom: "0.5rem",
  },
  select: {
    background: "oklch(0.18 0.04 155)",
    border: "1px solid oklch(0.975 0.008 85 / 0.15)",
    color: "oklch(0.975 0.008 85)",
    borderRadius: 0,
    padding: "0.875rem 1rem",
    width: "100%",
    fontFamily: "Outfit, sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    cursor: "pointer",
  } as React.CSSProperties,
};

// ─── Option Card ───────────────────────────────────────────────────────────────
function Opt({ value, label, sub, selected, onClick }: {
  value: string; label: string; sub?: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="text-left w-full transition-all duration-200"
      style={{
        background: selected ? "oklch(0.62 0.16 42 / 0.12)" : "oklch(0.18 0.04 155)",
        border: `2px solid ${selected ? "oklch(0.62 0.16 42)" : "oklch(0.975 0.008 85 / 0.12)"}`,
        padding: "0.875rem 1.1rem",
        cursor: "pointer",
        borderRadius: 0,
      }}>
      <div style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "0.875rem",
        color: selected ? "oklch(0.75 0.16 42)" : "oklch(0.975 0.008 85)" }}>{label}</div>
      {sub && <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.72rem",
        color: "oklch(0.6 0.02 85)", marginTop: "0.2rem" }}>{sub}</div>}
    </button>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

// ─── Lead Scoring ──────────────────────────────────────────────────────────────
function scoreLeads(d: Record<string, string>) {
  let score = 0;
  const tags = ["website-lead", "prequal-form"];

  if (d.timeline === "0-30 days")      score += 40;
  else if (d.timeline === "31-60 days") score += 30;
  else if (d.timeline === "61-90 days") score += 20;
  else if (d.timeline === "3-6 months") score += 10;

  if (d.creditScore === "760+")         score += 30;
  else if (d.creditScore === "720-759") score += 25;
  else if (d.creditScore === "680-719") score += 18;
  else if (d.creditScore === "640-679") score += 10;
  else if (d.creditScore === "580-639") score += 4;

  if (d.hasRealtor === "Yes")           score += 10;
  if (d.firstTimeBuyer === "No")        score += 5;
  if (d.coBorrower === "Yes")           score += 5;
  if (d.bankruptcy === "No" && d.foreclosure === "No") score += 10;

  const dp = parseFloat(d.downPayment?.replace(/[^0-9.]/g, "") || "0");
  if (dp >= 40000)      score += 15;
  else if (dp >= 20000) score += 10;
  else if (dp >= 10000) score += 5;

  const inc = parseFloat(d.annualIncome?.replace(/[^0-9.]/g, "") || "0");
  if (inc >= 120000)     score += 10;
  else if (inc >= 80000) score += 7;
  else if (inc >= 50000) score += 4;

  let temp = "COLD";
  if (score >= 80)      { temp = "HOT";  tags.push("hot-lead"); }
  else if (score >= 45) { temp = "WARM"; tags.push("warm-lead"); }
  else                  { tags.push("cold-lead"); }

  return { score, temp, tags };
}

// ─── Initial Form State ────────────────────────────────────────────────────────
const INIT = {
  // Step 1
  loanType: "", propertyIntent: "",
  // Step 2
  propertyType: "", propertyCity: "", purchasePrice: "", downPayment: "", downPaymentSource: "",
  // Step 3
  creditScore: "", employmentType: "", annualIncome: "", yearsEmployed: "",
  // Step 4
  monthlyDebts: "", savings: "", otherAssets: "",
  // Step 5
  coBorrower: "", coBorrowerIncome: "",
  // Step 6
  timeline: "", hasRealtor: "", realtorName: "", firstTimeBuyer: "", urgencyReason: "",
  // Step 7
  currentlyRenting: "", propertiesOwned: "", bankruptcy: "", foreclosure: "", bankruptcyYears: "",
  // Step 8
  firstName: "", lastName: "", phone: "", email: "", preferredContact: "", bestTime: "",
  smsConsent: false,
};

type FormData = typeof INIT;

export default function PreQualForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<FormData>(INIT);

  const set = (key: keyof FormData, val: string | boolean) =>
    setData(prev => ({ ...prev, [key]: val }));

  // ── Per-step validation ──────────────────────────────────────────────────────
  const canAdvance = () => {
    if (step === 1) return !!data.loanType && !!data.propertyIntent;
    if (step === 2) return !!data.propertyType && !!data.purchasePrice && !!data.downPayment;
    if (step === 3) return !!data.creditScore && !!data.employmentType && !!data.annualIncome;
    if (step === 4) return !!data.monthlyDebts;
    if (step === 5) return !!data.coBorrower;
    if (step === 6) return !!data.timeline && !!data.hasRealtor && !!data.firstTimeBuyer;
    if (step === 7) return !!data.bankruptcy && !!data.foreclosure && !!data.currentlyRenting;
    if (step === 8) return !!data.firstName && !!data.lastName && !!data.phone && !!data.email && data.smsConsent;
    return false;
  };

  // ── Submit via server-side proxy ─────────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const flat = { ...data, smsConsent: String(data.smsConsent) } as Record<string, string>;
      const { score, temp, tags } = scoreLeads(flat);

      const notes = [
        `=== PRE-QUAL FORM SUBMISSION ===`,
        `Loan Type: ${data.loanType} | Intent: ${data.propertyIntent}`,
        `Property: ${data.propertyType} in ${data.propertyCity || "DFW"} | Price: ${data.purchasePrice} | Down: ${data.downPayment} (${data.downPaymentSource})`,
        `Credit: ${data.creditScore} | Employment: ${data.employmentType} | Income: ${data.annualIncome}/yr | ${data.yearsEmployed} yrs employed`,
        `Monthly Debts: ${data.monthlyDebts} | Savings: ${data.savings} | Other Assets: ${data.otherAssets || "None"}`,
        `Co-Borrower: ${data.coBorrower}${data.coBorrowerIncome ? ` | Co-Borrower Income: ${data.coBorrowerIncome}` : ""}`,
        `Timeline: ${data.timeline} | Urgency: ${data.urgencyReason || "N/A"} | Realtor: ${data.hasRealtor}${data.realtorName ? ` (${data.realtorName})` : ""}`,
        `First-Time Buyer: ${data.firstTimeBuyer} | Currently Renting: ${data.currentlyRenting} | Properties Owned: ${data.propertiesOwned || "0"}`,
        `Bankruptcy: ${data.bankruptcy}${data.bankruptcyYears ? ` (${data.bankruptcyYears} yrs ago)` : ""} | Foreclosure: ${data.foreclosure}`,
        `Preferred Contact: ${data.preferredContact || "Any"} | Best Time: ${data.bestTime || "Any"}`,
        `LEAD SCORE: ${score} | TEMPERATURE: ${temp}`,
      ].join("\n");

      const stageId = score >= 80 ? STAGE_PREQUAL : STAGE_NEW_LEAD;

      const res = await fetch("/api/ghl-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          tags,
          source: "dfwhome.loans website",
          customFields: [
            { id: CF.loanPurpose,      value: data.propertyIntent },
            { id: CF.loanType,         value: data.loanType },
            { id: CF.propertyType,     value: data.propertyType },
            { id: CF.purchasePriceTxt, value: data.purchasePrice },
            { id: CF.purchasePrice,    value: data.purchasePrice },
            { id: CF.downPayment,      value: data.downPayment },
            { id: CF.creditScoreRange, value: data.creditScore },
            { id: CF.creditScore,      value: data.creditScore },
            { id: CF.annualIncome,     value: data.annualIncome },
            { id: CF.monthlyDebts,     value: data.monthlyDebts },
            { id: CF.firstTimeBuyer,   value: data.firstTimeBuyer },
            { id: CF.hasRealtor,       value: data.hasRealtor },
            { id: CF.timeline,         value: data.timeline },
            { id: CF.purchaseTimeline, value: data.timeline },
            { id: CF.leadSource,       value: "Website Pre-Qual Form" },
            { id: CF.leadScore,        value: String(score) },
            { id: CF.leadTemp,         value: temp },
            { id: CF.smsConsent,       value: ["Yes"] },
            { id: CF.notes,            value: notes },
          ],
          // Opportunity details — assigned to Tony
          opportunityName: `${data.firstName} ${data.lastName} - ${data.loanType} ${data.propertyIntent}`,
          pipelineStageId: stageId,
          monetaryValue: parseFloat(data.purchasePrice?.replace(/[^0-9.]/g, "") || "0"),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Submission failed");
      }

      trackLeadFormSubmit('pre_qualification');

      // Redirect to thank-you page
      window.location.href = `/thank-you?name=${encodeURIComponent(data.firstName)}`;
    } catch {
      setError("Something went wrong. Please call us at (945) 300-4002.");
    } finally {
      setLoading(false);
    }
  };

  // ── Main Render ──────────────────────────────────────────────────────────────
  return (
    <section id="prequal" className="py-24 md:py-32" style={{ background: "oklch(0.15 0.04 155)" }}>
      {/* Also keep id="contact" so existing links still scroll here */}
      <div id="contact" style={{ position: "absolute", marginTop: "-120px" }} />
      <div className="container max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "oklch(0.62 0.16 42)" }}>
            Free · No Credit Pull · No Obligation
          </p>
          <h2 className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "oklch(0.975 0.008 85)" }}>
            GET PRE-QUALIFIED<br />
            <span style={{ color: "oklch(0.62 0.16 42)" }}>THE RIGHT WAY</span>
          </h2>
          <p className="font-['Outfit'] text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.78 0.02 85)" }}>
            Answer a few questions so Tony can review your full picture and come to the call
            with real numbers — not guesses.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isDone ? "oklch(0.62 0.16 42)" : isActive ? "oklch(0.26 0.065 155)" : "oklch(0.18 0.04 155)",
                      border: `2px solid ${isDone || isActive ? "oklch(0.62 0.16 42)" : "oklch(0.975 0.008 85 / 0.2)"}`,
                    }}>
                    {isDone
                      ? <CheckCircle2 size={14} style={{ color: "oklch(0.975 0.008 85)" }} />
                      : <Icon size={14} style={{ color: isActive ? "oklch(0.62 0.16 42)" : "oklch(0.5 0.02 85)" }} />}
                  </div>
                  <span className="font-['Outfit'] text-[10px] mt-1 hidden sm:block"
                    style={{ color: isActive ? "oklch(0.62 0.16 42)" : "oklch(0.5 0.02 85)" }}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-5 sm:w-10 h-px mb-4 flex-shrink-0"
                    style={{ background: step > s.id ? "oklch(0.62 0.16 42)" : "oklch(0.975 0.008 85 / 0.12)" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div style={{ background: "oklch(0.18 0.04 155)", border: "1px solid oklch(0.975 0.008 85 / 0.1)", padding: "2.5rem" }}>

          {/* ── STEP 1: Loan Goal ─────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                WHAT'S YOUR GOAL?
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                This helps Tony match you to the right loan program immediately.
              </p>
              <div className="mb-6">
                <label style={S.label}>What do you want to do?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { v: "Home Purchase", l: "Buy a Home", s: "Primary residence or second home" },
                    { v: "Refinance", l: "Refinance", s: "Lower rate or change loan terms" },
                    { v: "DSCR / Investor", l: "Investment Property", s: "DSCR, rental, or fix & flip" },
                    { v: "Cash-Out Refi", l: "Cash-Out Refinance", s: "Access equity in your home" },
                    { v: "New Construction", l: "New Construction", s: "Build or buy a new build" },
                    { v: "Land Purchase", l: "Land Purchase", s: "Buy land to build on later" },
                  ].map(o => (
                    <Opt key={o.v} value={o.v} label={o.l} sub={o.s}
                      selected={data.loanType === o.v} onClick={() => set("loanType", o.v)} />
                  ))}
                </div>
              </div>
              <div>
                <label style={S.label}>How will you use this property?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { v: "Primary Residence", l: "Primary Home", s: "I'll live here full-time" },
                    { v: "Second Home", l: "Second Home", s: "Vacation or part-time use" },
                    { v: "Investment / Rental", l: "Investment / Rental", s: "Rent it out for income" },
                  ].map(o => (
                    <Opt key={o.v} value={o.v} label={o.l} sub={o.s}
                      selected={data.propertyIntent === o.v} onClick={() => set("propertyIntent", o.v)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Property Details ──────────────────────────────────── */}
          {step === 2 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                PROPERTY DETAILS
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                Tell us about the property so Tony can find the best program and rate.
              </p>
              <div className="mb-5">
                <label style={S.label}>Property Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Single Family", "Townhouse", "Condo", "Multi-Family (2-4 units)", "New Construction", "Mobile / Manufactured"].map(pt => (
                    <Opt key={pt} value={pt} label={pt}
                      selected={data.propertyType === pt} onClick={() => set("propertyType", pt)} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label={data.loanType === "Refinance" || data.loanType === "Cash-Out Refi" ? "Estimated Home Value" : "Purchase Price"}>
                  <input type="text" placeholder="$450,000" value={data.purchasePrice}
                    onChange={e => set("purchasePrice", e.target.value)} style={S.input} />
                </Field>
                <Field label={data.loanType === "Refinance" || data.loanType === "Cash-Out Refi" ? "Current Loan Balance" : "Down Payment Amount"}>
                  <input type="text" placeholder="$45,000" value={data.downPayment}
                    onChange={e => set("downPayment", e.target.value)} style={S.input} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="City / Area (DFW)">
                  <input type="text" placeholder="Celina, Frisco, McKinney..." value={data.propertyCity}
                    onChange={e => set("propertyCity", e.target.value)} style={S.input} />
                </Field>
                <Field label="Down Payment Source">
                  <select value={data.downPaymentSource}
                    onChange={e => set("downPaymentSource", e.target.value)} style={S.select}>
                    <option value="">Select...</option>
                    <option>Personal Savings</option>
                    <option>Gift from Family</option>
                    <option>401k / Retirement</option>
                    <option>Sale of Current Home</option>
                    <option>Down Payment Assistance</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 3: Financial Profile ─────────────────────────────────── */}
          {step === 3 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                YOUR FINANCIAL PROFILE
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                No credit pull — this is strictly to find the right program for you.
              </p>
              <div className="mb-5">
                <label style={S.label}>Estimated Credit Score</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { v: "760+",     l: "760+",     s: "Excellent" },
                    { v: "720-759",  l: "720–759",  s: "Very Good" },
                    { v: "680-719",  l: "680–719",  s: "Good" },
                    { v: "640-679",  l: "640–679",  s: "Fair" },
                    { v: "580-639",  l: "580–639",  s: "Needs Work" },
                    { v: "Below 580",l: "Below 580",s: "Let's explore options" },
                  ].map(o => (
                    <Opt key={o.v} value={o.v} label={o.l} sub={o.s}
                      selected={data.creditScore === o.v} onClick={() => set("creditScore", o.v)} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="Employment Type">
                  <select value={data.employmentType}
                    onChange={e => set("employmentType", e.target.value)} style={S.select}>
                    <option value="">Select...</option>
                    <option>W-2 Employee (Full-Time)</option>
                    <option>W-2 Employee (Part-Time)</option>
                    <option>Self-Employed / 1099</option>
                    <option>Business Owner</option>
                    <option>Retired</option>
                    <option>Military / VA</option>
                    <option>Commission-Based</option>
                    <option>Seasonal / Contract</option>
                  </select>
                </Field>
                <Field label="Years at Current Job">
                  <select value={data.yearsEmployed}
                    onChange={e => set("yearsEmployed", e.target.value)} style={S.select}>
                    <option value="">Select...</option>
                    <option>Less than 1 year</option>
                    <option>1–2 years</option>
                    <option>2–5 years</option>
                    <option>5–10 years</option>
                    <option>10+ years</option>
                  </select>
                </Field>
              </div>
              <Field label="Annual Gross Household Income (before taxes)">
                <select value={data.annualIncome}
                  onChange={e => set("annualIncome", e.target.value)} style={S.select}>
                  <option value="">Select range...</option>
                  <option>Under $40,000</option>
                  <option>$40,000 – $60,000</option>
                  <option>$60,000 – $80,000</option>
                  <option>$80,000 – $100,000</option>
                  <option>$100,000 – $125,000</option>
                  <option>$125,000 – $150,000</option>
                  <option>$150,000 – $200,000</option>
                  <option>$200,000+</option>
                </select>
              </Field>
            </div>
          )}

          {/* ── STEP 4: Debts & Assets ────────────────────────────────────── */}
          {step === 4 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                DEBTS & ASSETS
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                This determines your debt-to-income ratio — one of the most important qualification factors.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="Total Monthly Debt Payments">
                  <select value={data.monthlyDebts}
                    onChange={e => set("monthlyDebts", e.target.value)} style={S.select}>
                    <option value="">Select range...</option>
                    <option>$0 — No debts</option>
                    <option>$1 – $250</option>
                    <option>$250 – $500</option>
                    <option>$500 – $750</option>
                    <option>$750 – $1,000</option>
                    <option>$1,000 – $1,500</option>
                    <option>$1,500 – $2,000</option>
                    <option>$2,000+</option>
                  </select>
                </Field>
                <Field label="Total Liquid Savings / Checking">
                  <select value={data.savings}
                    onChange={e => set("savings", e.target.value)} style={S.select}>
                    <option value="">Select range...</option>
                    <option>Under $5,000</option>
                    <option>$5,000 – $10,000</option>
                    <option>$10,000 – $25,000</option>
                    <option>$25,000 – $50,000</option>
                    <option>$50,000 – $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </Field>
              </div>
              <Field label="Other Assets (401k, investments, other real estate) — Optional">
                <input type="text" placeholder="e.g. $80k in 401k, rental property in Dallas"
                  value={data.otherAssets} onChange={e => set("otherAssets", e.target.value)} style={S.input} />
              </Field>
              <p className="font-['Outfit'] text-xs mt-4" style={{ color: "oklch(0.55 0.02 85)" }}>
                Include: car payments, student loans, credit card minimums, child support, other mortgages.
                Do NOT include utilities, insurance, or subscriptions.
              </p>
            </div>
          )}

          {/* ── STEP 5: Co-Borrower ───────────────────────────────────────── */}
          {step === 5 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                CO-BORROWER
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                Adding a co-borrower can significantly increase your purchasing power.
              </p>
              <div className="mb-6">
                <label style={S.label}>Will you have a co-borrower on this loan?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { v: "Yes", l: "Yes", s: "Spouse, partner, or family member" },
                    { v: "No", l: "No", s: "Applying solo" },
                    { v: "Not Sure", l: "Not Sure", s: "Let's discuss options" },
                  ].map(o => (
                    <Opt key={o.v} value={o.v} label={o.l} sub={o.s}
                      selected={data.coBorrower === o.v} onClick={() => set("coBorrower", o.v)} />
                  ))}
                </div>
              </div>
              {data.coBorrower === "Yes" && (
                <Field label="Co-Borrower Annual Income">
                  <select value={data.coBorrowerIncome}
                    onChange={e => set("coBorrowerIncome", e.target.value)} style={S.select}>
                    <option value="">Select range...</option>
                    <option>Under $30,000</option>
                    <option>$30,000 – $50,000</option>
                    <option>$50,000 – $75,000</option>
                    <option>$75,000 – $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </Field>
              )}
            </div>
          )}

          {/* ── STEP 6: Timeline & Situation ─────────────────────────────── */}
          {step === 6 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                TIMELINE & SITUATION
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                Helps Tony prioritize your file and prepare the right strategy.
              </p>
              <div className="mb-5">
                <label style={S.label}>When do you want to close?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["0-30 days", "31-60 days", "61-90 days", "3-6 months", "6-12 months", "Just exploring"].map(t => (
                    <Opt key={t} value={t} label={t}
                      selected={data.timeline === t} onClick={() => set("timeline", t)} />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label style={S.label}>Working with a Realtor?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Yes — already have one", "No — need a referral", "Not yet — just looking"].map(v => (
                      <Opt key={v} value={v} label={v}
                        selected={data.hasRealtor === v} onClick={() => set("hasRealtor", v)} />
                    ))}
                  </div>
                </div>
                <div>
                  <label style={S.label}>First-Time Homebuyer?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { v: "Yes", l: "Yes", s: "Never owned a home" },
                      { v: "No", l: "No", s: "Owned before" },
                      { v: "Not in 3+ years", l: "Not in 3+ years", s: "May qualify as first-time" },
                    ].map(o => (
                      <Opt key={o.v} value={o.v} label={o.l} sub={o.s}
                        selected={data.firstTimeBuyer === o.v} onClick={() => set("firstTimeBuyer", o.v)} />
                    ))}
                  </div>
                </div>
              </div>
              {data.hasRealtor === "Yes — already have one" && (
                <Field label="Realtor's Name (optional — helps Tony coordinate)">
                  <input type="text" placeholder="Jane Smith at Keller Williams"
                    value={data.realtorName} onChange={e => set("realtorName", e.target.value)} style={S.input} />
                </Field>
              )}
            </div>
          )}

          {/* ── STEP 7: Loan History ──────────────────────────────────────── */}
          {step === 7 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                LOAN HISTORY
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                Honest answers here let Tony find the right program — there are options for every situation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label style={S.label}>Currently renting or own?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["Renting", "Own — selling to buy", "Own — keeping current home", "Living with family / friends"].map(v => (
                      <Opt key={v} value={v} label={v}
                        selected={data.currentlyRenting === v} onClick={() => set("currentlyRenting", v)} />
                    ))}
                  </div>
                </div>
                <div>
                  <label style={S.label}>Other properties owned?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {["None", "1 property", "2 properties", "3+ properties"].map(v => (
                      <Opt key={v} value={v} label={v}
                        selected={data.propertiesOwned === v} onClick={() => set("propertiesOwned", v)} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label style={S.label}>Bankruptcy in the past 7 years?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["No", "Yes"].map(v => (
                      <Opt key={v} value={v} label={v}
                        selected={data.bankruptcy === v} onClick={() => set("bankruptcy", v)} />
                    ))}
                  </div>
                  {data.bankruptcy === "Yes" && (
                    <div className="mt-3">
                      <label style={S.label}>How many years ago?</label>
                      <select value={data.bankruptcyYears}
                        onChange={e => set("bankruptcyYears", e.target.value)} style={S.select}>
                        <option value="">Select...</option>
                        <option>Less than 2 years ago</option>
                        <option>2–4 years ago</option>
                        <option>4–7 years ago</option>
                        <option>More than 7 years ago</option>
                      </select>
                    </div>
                  )}
                </div>
                <div>
                  <label style={S.label}>Foreclosure in the past 7 years?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["No", "Yes"].map(v => (
                      <Opt key={v} value={v} label={v}
                        selected={data.foreclosure === v} onClick={() => set("foreclosure", v)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 8: Contact Info ──────────────────────────────────────── */}
          {step === 8 && (
            <div>
              <h3 className="font-display mb-1" style={{ fontSize: "1.75rem", color: "oklch(0.975 0.008 85)" }}>
                ALMOST DONE
              </h3>
              <p className="font-['Outfit'] text-sm mb-7" style={{ color: "oklch(0.6 0.02 85)" }}>
                Tony reviews every submission personally. You'll hear from him within 1 hour.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="First Name">
                  <input type="text" placeholder="Tony" value={data.firstName}
                    onChange={e => set("firstName", e.target.value)} style={S.input} required />
                </Field>
                <Field label="Last Name">
                  <input type="text" placeholder="Smith" value={data.lastName}
                    onChange={e => set("lastName", e.target.value)} style={S.input} required />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <Field label="Phone Number">
                  <input type="tel" placeholder="(972) 555-0100" value={data.phone}
                    onChange={e => set("phone", e.target.value)} style={S.input} required />
                </Field>
                <Field label="Email Address">
                  <input type="email" placeholder="you@email.com" value={data.email}
                    onChange={e => set("email", e.target.value)} style={S.input} required />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <Field label="Preferred Contact Method">
                  <select value={data.preferredContact}
                    onChange={e => set("preferredContact", e.target.value)} style={S.select}>
                    <option value="">No preference</option>
                    <option>Phone Call</option>
                    <option>Text / SMS</option>
                    <option>Email</option>
                  </select>
                </Field>
                <Field label="Best Time to Reach You">
                  <select value={data.bestTime}
                    onChange={e => set("bestTime", e.target.value)} style={S.select}>
                    <option value="">Anytime</option>
                    <option>Morning (8am–12pm)</option>
                    <option>Afternoon (12pm–5pm)</option>
                    <option>Evening (5pm–8pm)</option>
                    <option>Weekends only</option>
                  </select>
                </Field>
              </div>

              {/* A2P SMS Consent */}
              <div className="p-4 mb-5"
                style={{ background: "oklch(0.14 0.03 155)", border: "1px solid oklch(0.975 0.008 85 / 0.1)" }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={data.smsConsent}
                    onChange={e => set("smsConsent", e.target.checked)}
                    className="mt-1 flex-shrink-0 w-4 h-4"
                    style={{ accentColor: "oklch(0.62 0.16 42)" }} />
                  <span className="font-['Outfit'] text-xs leading-relaxed" style={{ color: "oklch(0.65 0.02 85)" }}>
                    By checking this box, I consent to receive SMS text messages and calls from DFW Homes & Loans
                    (Tony Botchev, NMLS #114198 | Loan Factory, Inc. NMLS #320841) regarding my mortgage inquiry.
                    Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe.
                    Reply HELP for help. Consent is not required to obtain services.{" "}
                    <a href="/privacy" className="underline" style={{ color: "oklch(0.62 0.16 42)" }}>Privacy Policy</a>{" "}
                    &amp;{" "}
                    <a href="/terms" className="underline" style={{ color: "oklch(0.62 0.16 42)" }}>Terms</a>
                  </span>
                </label>
              </div>

              {error && (
                <p className="font-['Outfit'] text-sm mb-4" style={{ color: "oklch(0.65 0.22 25)" }}>
                  {error}
                </p>
              )}
            </div>
          )}

          {/* ── Navigation ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 font-['Outfit'] text-sm transition-colors"
                style={{ color: "oklch(0.65 0.02 85)", background: "none", border: "none", cursor: "pointer" }}>
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 8 ? (
              <button type="button" onClick={() => canAdvance() && setStep(s => s + 1)}
                disabled={!canAdvance()}
                className="btn-primary-kt flex items-center gap-2 px-8 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={() => canAdvance() && handleSubmit()}
                disabled={!canAdvance() || loading}
                className="btn-primary-kt flex items-center gap-2 px-8 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? "Submitting..." : <>Get My Options <ArrowRight size={16} /></>}
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-1 w-full" style={{ background: "oklch(0.975 0.008 85 / 0.08)" }}>
            <div className="h-1 transition-all duration-500"
              style={{ width: `${(step / 8) * 100}%`, background: "oklch(0.62 0.16 42)" }} />
          </div>
          <p className="font-['Outfit'] text-xs text-right mt-1" style={{ color: "oklch(0.55 0.02 85)" }}>
            Step {step} of 8
          </p>
        </div>

        <NMLSDisclosure variant="form" />
      </div>
    </section>
  );
}
