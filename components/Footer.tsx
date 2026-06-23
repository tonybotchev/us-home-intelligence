import Link from "next/link";
import NFGSisterSitesFooter from "@/components/NFGSisterSitesFooter";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #2a2a3a", background: "#0a0a0f", marginTop: "auto" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        {/* DCT Newsletter — The DFW Closing Table */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", border: "1px solid #2a2a3a", borderRadius: "16px", padding: "24px", marginBottom: "28px" }}>
          <div style={{ flex: "1 1 280px", minWidth: "240px" }}>
            <p style={{ color: "#f0f0f5", fontSize: "16px", fontWeight: 700, margin: "0 0 4px" }}>
              Subscribe to The DFW Closing Table
            </p>
            <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.6, margin: 0, maxWidth: "32rem" }}>
              The weekly read for the 130,000 pros at every seat in the DFW closing ecosystem. Mortgage, market, and neighborhood intel — every Monday, 7am CT.
            </p>
          </div>
          <div style={{ flex: "1 1 320px", minWidth: "240px", maxWidth: "380px" }}>
            <iframe
              src="https://embeds.beehiiv.com/20245a04-651e-43ae-8f55-b7b559e7a148?slim=true"
              title="Subscribe to The DFW Closing Table"
              data-test-id="beehiiv-embed"
              width="100%"
              height={52}
              frameBorder="0"
              scrolling="no"
              style={{ margin: 0, borderRadius: "4px", backgroundColor: "transparent" }}
            />
          </div>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#6b7280", fontSize: "12px", lineHeight: 1.6 }}>
            NoFluff Marketing LLC &nbsp;&middot;&nbsp; 3333 Preston Rd Ste 300 #1570, Frisco TX 75034 &nbsp;&middot;&nbsp; 940-394-5656
          </p>
        </div>

        <NFGSisterSitesFooter siteKey="ushi" />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", borderTop: "1px solid #2a2a3a", paddingTop: "20px", marginTop: "4px" }}>
          <Link href="/privacy" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>Terms of Service</Link>
          <a href="https://www.hud.gov/program_offices/fair_housing_equal_opp" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>Fair Housing</a>
          <a href="https://nofluffmarketing.io" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>NoFluff Marketing LLC</a>
        </div>

        <p style={{ color: "#4a4a5a", fontSize: "12px", marginTop: "16px", lineHeight: 1.6 }}>
          &copy; {new Date().getFullYear()} NoFluff Marketing LLC. All rights reserved. US Home Intelligence reports are for informational purposes only and do not constitute financial, legal, or investment advice. Fair Housing compliant.
        </p>
      </div>
    </footer>
  );
}
