import Link from "next/link";
import NFGSisterSitesFooter from "@/components/NFGSisterSitesFooter";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #2a2a3a", background: "#0a0a0f", marginTop: "auto" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
          <p style={{ color: "#6b7280", fontSize: "12px", lineHeight: 1.6 }}>
            NoFluff Marketing LLC &nbsp;&middot;&nbsp; 3333 Preston Rd Ste 300 #1570 &nbsp;&middot;&nbsp; Frisco, TX 75034 &nbsp;&middot;&nbsp; 940-394-5656
          </p>
          <p style={{ color: "#6b7280", fontSize: "12px", lineHeight: 1.6 }}>
            DFW Homes and Loans LLC &nbsp;&middot;&nbsp; Tony Botchev, NMLS #114198 &nbsp;&middot;&nbsp; Sponsored by Loan Factory, NMLS #320841
          </p>
        </div>

        <NFGSisterSitesFooter siteKey="ushi" />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", borderTop: "1px solid #2a2a3a", paddingTop: "20px", marginTop: "4px" }}>
          <Link href="/privacy" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>Terms of Service</Link>
          <a href="https://www.hud.gov/program_offices/fair_housing_equal_opp" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>Fair Housing</a>
          <a href="https://nofluffmarketing.io" style={{ color: "#6b7280", fontSize: "12px", textDecoration: "none" }}>NoFluff Marketing LLC</a>
        </div>

        <p style={{ color: "#4a4a5a", fontSize: "12px", marginTop: "16px" }}>
          &copy; {new Date().getFullYear()} NoFluff Marketing LLC. All rights reserved.
          US Home Intelligence reports are for informational purposes only and do not constitute financial, legal, or investment advice.
          Fair Housing compliant. NMLS #114198.
        </p>
      </div>
    </footer>
  );
}
