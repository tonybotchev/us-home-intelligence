import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | US Home Intelligence — NoFluff Marketing LLC",
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
              <p className="text-[#6b7280] text-sm">Last updated: June 10, 2026 · US Home Intelligence Platform · NoFluff Marketing LLC</p>
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
              <p>Partners must hold a valid real estate license. Comp credits are non-transferable, have no cash value, and expire 12 months after issuance. Soft cap: 10 credits held. RESPA-clean: no fees flow between NoFluff Marketing LLC and realtor partners for mortgage referrals.</p>
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
