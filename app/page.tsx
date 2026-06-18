"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, FileText, Shield, Zap, ChevronRight, CheckCircle, TrendingUp, Home, BarChart3 } from "lucide-react";

export default function HomePage() {
  const [zipInput, setZipInput] = useState("");
  const [zipSubmitted, setZipSubmitted] = useState(false);

  function handleZipPreview(e: React.FormEvent) {
    e.preventDefault();
    if (zipInput.trim().length === 5) setZipSubmitted(true);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        paddingTop: "120px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,194,255,0.08) 0%, transparent 70%)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.2)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "28px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00c2ff", display: "inline-block" }} />
            <span style={{ color: "#00c2ff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>
              NEIGHBORHOOD INTELLIGENCE — ANY US ADDRESS
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1,
            color: "#f0f0f5", marginBottom: "20px", letterSpacing: "-0.02em",
          }}>
            Know the neighborhood{" "}
            <span style={{
              background: "linear-gradient(135deg, #00c2ff 0%, #1a56db 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              before you decide.
            </span>
          </h1>

          <p style={{ fontSize: "18px", color: "#9ca3af", lineHeight: 1.6, marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px" }}>
            Schools, crime trends, market velocity, investment outlook — delivered in a single report.
            No subscription. No account required. Pay once, own it forever.
          </p>

          {!zipSubmitted ? (
            <form onSubmit={handleZipPreview} style={{ marginBottom: "16px" }}>
              <div style={{
                display: "flex", maxWidth: "480px", margin: "0 auto",
                background: "#12121a", border: "1px solid #2a2a3a", borderRadius: "14px",
                overflow: "hidden", boxShadow: "0 0 40px rgba(0,194,255,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", paddingLeft: "16px" }}>
                  <MapPin size={18} color="#6b7280" />
                </div>
                <input
                  type="text" inputMode="numeric" pattern="[0-9]{5}" maxLength={5}
                  placeholder="Enter any US zip code"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ""))}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "#f0f0f5", fontSize: "16px", padding: "16px 12px",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                />
                <button type="submit" style={{
                  background: "#00c2ff", color: "#0a0a0f", fontWeight: 700, fontSize: "14px",
                  padding: "16px 24px", border: "none", cursor: "pointer", whiteSpace: "nowrap",
                }}>
                  Preview Report →
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              maxWidth: "480px", margin: "0 auto 16px",
              background: "linear-gradient(135deg, rgba(0,194,255,0.08) 0%, rgba(26,86,219,0.08) 100%)",
              border: "1px solid rgba(0,194,255,0.3)", borderRadius: "14px", padding: "20px 24px", textAlign: "left",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
                <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 600 }}>DATA AVAILABLE FOR {zipInput}</span>
              </div>
              <p style={{ color: "#f0f0f5", fontSize: "14px", marginBottom: "16px", lineHeight: 1.5 }}>
                Your full report includes school ratings, crime trends, market velocity, investment outlook, and demographic context for zip <strong>{zipInput}</strong>.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/buy" style={{
                  background: "#00c2ff", color: "#0a0a0f", fontWeight: 700, fontSize: "14px",
                  padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "inline-block",
                }}>
                  Get Full Report — $97
                </Link>
                <button onClick={() => { setZipSubmitted(false); setZipInput(""); }} style={{
                  background: "transparent", border: "1px solid #2a2a3a", color: "#9ca3af",
                  fontSize: "14px", padding: "10px 16px", borderRadius: "8px", cursor: "pointer",
                }}>
                  Try another zip
                </button>
              </div>
            </div>
          )}
          <p style={{ color: "#4a4a5a", fontSize: "12px" }}>
            No account required &nbsp;·&nbsp; Delivered in under 1 hour &nbsp;·&nbsp; Fair Housing compliant
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: "80px 24px", background: "#12121a", borderTop: "1px solid #2a2a3a", borderBottom: "1px solid #2a2a3a" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#00c2ff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>What you get</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#f0f0f5", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              The same data institutional buyers use.<br />
              <span style={{ color: "#9ca3af", fontWeight: 400 }}>For any address. For $97.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {[
              { icon: <Home size={18} color="#00c2ff" />, title: "School District Intelligence", desc: "Ratings, district boundaries, and enrollment trends — not just a score." },
              { icon: <Shield size={18} color="#22c55e" />, title: "Crime Trend Analysis", desc: "3-year trend lines, not just a snapshot. Know if it is improving or declining." },
              { icon: <TrendingUp size={18} color="#c9a227" />, title: "Market Velocity", desc: "Days on market, list-to-sale ratio, absorption rate. Is this market moving?" },
              { icon: <BarChart3 size={18} color="#00c2ff" />, title: "Investment Outlook", desc: "Hold, buy, or caution signal based on forward-looking indicators." },
              { icon: <FileText size={18} color="#c9a227" />, title: "Demographic Context", desc: "Population trends, income distribution, age cohorts. Fair Housing compliant." },
              { icon: <MapPin size={18} color="#22c55e" />, title: "Property-Level Data", desc: "Address tier only: AVM estimate, parcel data, comparable sales, zoning." },
            ].map((item) => (
              <div key={item.title} style={{
                background: "#0a0a0f", border: "1px solid #2a2a3a", borderRadius: "12px",
                padding: "20px", display: "flex", alignItems: "flex-start", gap: "14px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,255,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2a3a"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#12121a", border: "1px solid #2a2a3a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: "#f0f0f5", fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#00c2ff", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#f0f0f5", marginBottom: "12px", letterSpacing: "-0.02em" }}>Pay once. Own it forever.</h2>
          <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "48px" }}>No subscription. No account. No expiration. Your report is yours.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="ushi-pricing-grid">
            {/* Zip */}
            <div style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: "20px", padding: "36px 28px", textAlign: "left", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,194,255,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#2a2a3a"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "44px", fontWeight: 800, color: "#f0f0f5", lineHeight: 1 }}>$97</div>
              <div style={{ color: "#00c2ff", fontWeight: 600, fontSize: "15px", marginTop: "8px", marginBottom: "20px" }}>Zip-Level Report</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Zip code market overview","School district summary","Crime trend overview","Market velocity data","Demographic context","Investment outlook"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "14px" }}>
                    <CheckCircle size={14} color="#22c55e" style={{ flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/buy" style={{ display: "block", textAlign: "center", background: "#1c1c28", border: "1px solid #2a2a3a", color: "#f0f0f5", fontWeight: 600, fontSize: "14px", padding: "14px", borderRadius: "10px", textDecoration: "none" }}>
                Order Zip Report →
              </Link>
            </div>
            {/* Address */}
            <div style={{ background: "#12121a", border: "2px solid #1a56db", borderRadius: "20px", padding: "36px 28px", textAlign: "left", position: "relative", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#00c2ff"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1a56db"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: "#1a56db", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "100px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
              <div style={{ fontSize: "44px", fontWeight: 800, color: "#f0f0f5", lineHeight: 1 }}>$147</div>
              <div style={{ color: "#00c2ff", fontWeight: 600, fontSize: "15px", marginTop: "8px", marginBottom: "20px" }}>Address-Specific Report</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Everything in Zip-Level","Parcel-level property data","AVM estimate","Property-specific risk overlays","Comparable sales analysis","Full 11-chapter deep-dive"].map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "14px" }}>
                    <CheckCircle size={14} color="#22c55e" style={{ flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/buy" style={{ display: "block", textAlign: "center", background: "#1a56db", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "14px", borderRadius: "10px", textDecoration: "none" }}>
                Order Address Report →
              </Link>
            </div>
          </div>
          <style>{`.ushi-pricing-grid { @media (max-width: 600px) { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ padding: "60px 24px", background: "#12121a", borderTop: "1px solid #2a2a3a", borderBottom: "1px solid #2a2a3a" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {[
              { icon: <Zap size={20} color="#00c2ff" />, title: "Under 1 Hour", desc: "Reports delivered fast. Your decision does not wait days." },
              { icon: <Shield size={20} color="#22c55e" />, title: "Fair Housing Compliant", desc: "Every report includes compliant language on all demographic and schools chapters." },
              { icon: <BarChart3 size={20} color="#c9a227" />, title: "Investment Grade Data", desc: "The same depth institutional buyers use — for every buyer, every address." },
            ].map(item => (
              <div key={item.title} style={{ background: "#0a0a0f", border: "1px solid #2a2a3a", borderRadius: "12px", padding: "20px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#12121a", border: "1px solid #2a2a3a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ color: "#f0f0f5", fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#f0f0f5", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Ready to know what you are{" "}
            <span style={{ background: "linear-gradient(135deg, #00c2ff 0%, #1a56db 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              actually buying into?
            </span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "32px" }}>
            One report. One payment. Everything you need to make a confident decision.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/buy" style={{ background: "#1a56db", color: "#fff", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "12px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Order Your Report <ChevronRight size={18} />
            </Link>
            <Link href="/buy" style={{ background: "transparent", border: "1px solid #2a2a3a", color: "#9ca3af", fontWeight: 600, fontSize: "16px", padding: "16px 28px", borderRadius: "12px", textDecoration: "none" }}>
              See Sample Report
            </Link>
          </div>
          <p style={{ color: "#4a4a5a", fontSize: "12px", marginTop: "20px" }}>
            Real estate professional?{" "}
            <a href="mailto:info@nofluffmarketing.io" style={{ color: "#9ca3af", textDecoration: "underline" }}>
              Contact us to use reports with your clients.
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
