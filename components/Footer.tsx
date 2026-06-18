import Link from "next/link";
import NFGSisterSitesFooter from "@/components/NFGSisterSitesFooter";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="text-[#6b7280] text-xs leading-relaxed">
            <p>NoFluff Marketing LLC &nbsp;&middot;&nbsp; 3333 Preston Rd Ste 300 #1570 &nbsp;&middot;&nbsp; Frisco, TX 75034 &nbsp;&middot;&nbsp; 940-394-5656</p>
            <p className="mt-1">DFW Homes and Loans LLC &nbsp;&middot;&nbsp; Tony Botchev, NMLS #114198 &nbsp;&middot;&nbsp; Sponsored by Loan Factory, NMLS #320841</p>
          </div>
          <div className="flex items-center gap-2 text-[#6b7280] text-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#c9a227]">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
        {/* NFG Sister Sites cross-links */}
        <NFGSisterSitesFooter siteKey="ushi" />

        <div className="flex flex-wrap gap-4 text-xs text-[#6b7280] border-t border-[#2a2a3a] pt-6">
          <Link href="/privacy" className="hover:text-[#00c2ff] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#00c2ff] transition-colors">Terms of Service</Link>
          <a href="https://www.hud.gov/program_offices/fair_housing_equal_opp" target="_blank" rel="noopener noreferrer" className="hover:text-[#00c2ff] transition-colors">Fair Housing</a>
          <a href="https://nofluffmarketing.io" className="hover:text-[#00c2ff] transition-colors">NoFluff Marketing LLC</a>
        </div>
        <p className="text-[#4a4a5a] text-xs mt-4">
          &copy; {new Date().getFullYear()} NoFluff Marketing LLC. All rights reserved. Produced exclusively by NoFluff Marketing LLC.
          US Home Intelligence reports are for informational purposes only and do not constitute financial, legal, or investment advice.
          Fair Housing compliant. NMLS #114198.
        </p>
      </div>
    </footer>
  );
}
