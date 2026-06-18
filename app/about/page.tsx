"use client";
import Link from "next/link";
import { useState } from "react";
import { aboutBreadcrumb } from "@/lib/schema";

const DATA_CATEGORIES = [
  {
    icon: "🏘️",
    title: "Market Activity",
    desc: "Recent sales, median price per sq ft, days on market, price trend over 12 months, absorption rate. You see what the market is actually doing — not what a listing agent says it is doing.",
  },
  {
    icon: "🏫",
    title: "Schools & Education",
    desc: "District ratings, individual school performance scores, student-to-teacher ratios, and proximity. Sourced from state education databases — not self-reported.",
  },
  {
    icon: "🔒",
    title: "Safety Index",
    desc: "Crime rate per 1,000 residents broken down by category (property, violent, other). Indexed against national and county averages so you know what the numbers actually mean.",
  },
  {
    icon: "🚶",
    title: "Walkability & Lifestyle",
    desc: "Walk Score, Transit Score, Bike Score. Proximity to grocery, dining, parks, healthcare, and entertainment. What it actually feels like to live there day to day.",
  },
  {
    icon: "📊",
    title: "Economic Indicators",
    desc: "Median household income, unemployment rate, owner vs. renter ratio, vacancy rate, population growth trend. The financial health of the neighborhood — not just the house.",
  },
  {
    icon: "🏗️",
    title: "Development & Permits",
    desc: "Recent building permits, zoning changes, commercial development activity. Know what is being built around you before you close.",
  },
];

const FAQ = [
  {
    q: "Is this the same data Zillow or Redfin shows?",
    a: "No. Zillow and Redfin are listing platforms — they show you houses for sale. USHI shows you the neighborhood itself: crime trends, school performance, economic health, development activity, and market dynamics. These are two completely different things. A house can look great on Zillow while sitting in a neighborhood with declining school scores and rising vacancy. USHI shows you what the listing does not.",
  },
  {
    q: "Where does the data come from?",
    a: "Public records, county assessor databases, MLS transaction data, US Census Bureau, state education departments, FBI Uniform Crime Reports, EPA environmental databases, and commercial walkability indices. We aggregate, normalize, and format it into a readable report — no data is invented or estimated.",
  },
  {
    q: "How current is the data?",
    a: "Market activity data is updated monthly. School ratings and crime indices are updated annually following official release cycles. Economic indicators are updated quarterly. Every report shows the data vintage date so you know exactly how fresh each data point is.",
  },
  {
    q: "What is the difference between a Zip Report and an Address Report?",
    a: "The Zip Report ($97) covers the entire ZIP code — useful for comparing neighborhoods or evaluating a general area. The Address Report ($147) is hyperlocal — it pulls data for the specific address and the immediate surrounding radius, giving you the most precise picture of exactly where you are buying.",
  },
  {
    q: "Who is this for?",
    a: "Anyone making a significant decision tied to a specific location. Homebuyers who want to know what they are actually buying into. Investors evaluating a market. Families relocating who need to compare school districts. Business owners choosing a commercial location. If the address matters, the intelligence matters.",
  },
  {
    q: "Is this financial or legal advice?",
    a: "No. USHI reports are informational tools — they give you data to make a better-informed decision. They are not appraisals, investment recommendations, or legal opinions. We recommend using a USHI report alongside your own due diligence, a qualified real estate professional, and any other advisors relevant to your situation.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ background: "#0a0a0f", color: "#f0f0f5", minHeight: "100vh", paddingTop: "112px", paddingBottom: "80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumb()) }} />

      {/* Hero */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "inline-block", background: "rgba(0,201,167,0.1)", border: "1px solid rgba(0,201,167,0.3)", borderRadius: "20px", padding: "6px 16px", marginBottom: "24px" }}>
          <span style={{ color: "#00c9a7", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>About US Home Intelligence</span>
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
          The data behind the decision.
        </h1>
        <p style={{ fontSize: "18px", color: "#9ca3af", lineHeight: 1.7, maxWidth: "680px" }}>
          Buying a home is one of the largest financial decisions most people will ever make. The listing shows you the house. We show you the neighborhood — the schools, the safety, the economic health, the market trajectory, and what is being built around you. That is US Home Intelligence.
        </p>
      </section>

      {/* What we are not */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ background: "rgba(26,86,219,0.08)", border: "1px solid rgba(26,86,219,0.25)", borderRadius: "12px", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>We are not a listing platform.</h2>
          <p style={{ color: "#9ca3af", lineHeight: 1.7, fontSize: "15px" }}>
            Zillow, Redfin, and Realtor.com show you houses for sale. That is their job. Our job is different. We pull together the data that does not appear on any listing — crime trends, school performance, economic indicators, permit activity, walkability — and deliver it in one report, for any US address or ZIP code, in minutes. The listing tells you the price. We tell you what you are actually buying into.
          </p>
        </div>
      </section>

      {/* Data categories */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "12px" }}>Six data categories. One complete picture.</h2>
        <p style={{ color: "#9ca3af", textAlign: "center", marginBottom: "48px", fontSize: "15px" }}>Every report covers all six — no add-ons, no upsells, no data hidden behind a higher tier.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {DATA_CATEGORIES.map((cat) => (
            <div key={cat.title} style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: "12px", padding: "24px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{cat.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#ffffff" }}>{cat.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: 1.6 }}>{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data sources */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}>Where the data comes from</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {[
            "County Assessor & Public Records",
            "MLS Transaction Data",
            "US Census Bureau (ACS)",
            "State Education Departments",
            "FBI Uniform Crime Reports",
            "EPA Environmental Databases",
            "Walk Score / Transit Score",
            "Municipal Permit Filings",
            "Bureau of Labor Statistics",
            "FEMA Flood Zone Maps",
          ].map((src) => (
            <div key={src} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#12121a", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "12px 16px" }}>
              <span style={{ color: "#00c9a7", fontSize: "14px" }}>✓</span>
              <span style={{ color: "#d1d5db", fontSize: "13px" }}>{src}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#6b7280", fontSize: "12px", marginTop: "16px", lineHeight: 1.6 }}>
          Data is aggregated from official public sources, normalized for comparability, and formatted for readability. Every report includes data vintage dates. No data is invented, estimated, or sourced from unverified third parties.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Common questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: "10px", overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", padding: "20px 24px", background: "none", border: "none", color: "#ffffff", fontSize: "15px", fontWeight: 600, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}
              >
                {item.q}
                <span style={{ color: "#00c9a7", fontSize: "20px", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px", color: "#9ca3af", fontSize: "14px", lineHeight: 1.7 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ background: "linear-gradient(135deg, #12121a 0%, #1a1a2e 100%)", border: "1px solid #2a2a3a", borderRadius: "16px", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>Ready to see what you are actually buying into?</h2>
          <p style={{ color: "#9ca3af", marginBottom: "32px", fontSize: "15px" }}>
            Zip Report — $97 &nbsp;&middot;&nbsp; Address Report — $147 &nbsp;&middot;&nbsp; Delivered in minutes.
          </p>
          <Link href="/buy" style={{ display: "inline-block", background: "#1a56db", color: "#ffffff", fontWeight: 700, fontSize: "16px", padding: "14px 36px", borderRadius: "8px", textDecoration: "none", transition: "background 0.2s" }}>
            Order a Report
          </Link>
          <p style={{ color: "#4a4a5a", fontSize: "12px", marginTop: "20px" }}>
            Reports are for informational purposes only and do not constitute financial, legal, or investment advice. Fair Housing compliant.
          </p>
        </div>
      </section>

    </main>
  );
}
