import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://intel.nofluffmarketing.io";

export const metadata: Metadata = {
  title: "Terms of Service | US Home Intelligence — NoFluff Marketing LLC",
  description: "Terms of Service for US Home Intelligence, produced by NoFluff Marketing LLC, Frisco TX. Governs purchase and use of neighborhood intelligence reports, including delivery, refunds, and acceptable use.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "US Home Intelligence",
    locale: "en_US",
    url: `${SITE_URL}/terms`,
    title: "Terms of Service | US Home Intelligence",
    description: "Terms of Service for US Home Intelligence, produced by NoFluff Marketing LLC, Frisco TX.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "US Home Intelligence Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nofluffmkt",
    title: "Terms of Service | US Home Intelligence",
    description: "Terms of Service for US Home Intelligence, produced by NoFluff Marketing LLC, Frisco TX.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-[#9ca3af] leading-relaxed space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-[#f0f0f5] mb-2">Terms of Service</h1>
              <p className="text-[#6b7280] text-sm">Last updated: June 12, 2026 · US Home Intelligence Platform · NoFluff Marketing LLC</p>
            </div>
            <p>These Terms govern use of intel.nofluffmarketing.io, operated by NoFluff Marketing LLC, 3333 Preston Rd Ste 300 #1570, Frisco, TX 75034. Tony Botchev, NMLS #114198, sponsored by Loan Factory, NMLS #320841.</p>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">USHI Reports — Not Financial Advice</h2>
              <p>USHI reports are for informational purposes only and do not constitute financial, investment, or legal advice. All mortgage products are subject to credit approval. NMLS #114198.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Report Delivery and Refunds</h2>
              <p>Reports are delivered digitally within approximately one hour. All sales are final once a report has been delivered. If a report cannot be produced for a requested address, a full refund will be issued.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Realtor Partner Program</h2>
              <p>Partners must hold a valid real estate license. The Realtor Partner Program pricing (v3) is locked as of June 12, 2026 and supersedes any prior comp-credit or 50%-off model. Signup is free — no subscription, no monthly fee, no tiers. Each agent signs up individually. Upon signup, each partner receives one free cobranded welcome report as a thank-you for joining. Every subsequent report is ordered per-report with a choice at each order: (A) Cobranded report at 20% off the public price — $77.60 for a zip-level report (public price $97) or $117.60 for an address-specific report (public price $147); or (B) Standard DHL-only report at full public price — $97 zip-level or $147 address-specific, with no realtor branding. Partners must attest at each order that the report is for an active buyer prospect they are currently representing. Cobranded reports include DFW Homes &amp; Loans (Tony Botchev, NMLS #114198, sponsored by Loan Factory, NMLS #320841) as the preferred mortgage partner. RESPA-clean: no fees flow between NoFluff Marketing LLC and realtor partners for mortgage referrals. Buyers always decide who to use for their mortgage.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Report Cobrand and DHL Placement</h2>
              <p>All reports ordered through a realtor partner share link or partner dashboard use the Realtor-Sponsored cobranded layout: the realtor appears in the lead position and DFW Homes &amp; Loans appears as co-publisher. Reports ordered directly through the public /buy channel or any paid advertising channel use the DHL-Only layout with DFW Homes &amp; Loans as the sole publisher. Both layouts include a &quot;Your Mortgage Partner&quot; section featuring Tony Botchev, NMLS #114198.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Fair Housing</h2>
              <p>NoFluff Marketing LLC complies with the Fair Housing Act. Equal Housing Opportunity. We do not discriminate in the provision of services based on any protected class.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Governing Law</h2>
              <p>These Terms are governed by the laws of the State of Texas. Disputes shall be resolved in Collin County, Texas.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Contact</h2>
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-4">
                <p className="text-[#f0f0f5]">NoFluff Marketing LLC · 3333 Preston Rd Ste 300 #1570 · Frisco, TX 75034</p>
                <p>940-394-5656 · tony@nofluffmarketing.io</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
