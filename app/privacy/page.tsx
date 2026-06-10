import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | US Home Intelligence — NoFluff Marketing LLC",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-[#9ca3af] leading-relaxed space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-[#f0f0f5] mb-2">Privacy Policy</h1>
              <p className="text-[#6b7280] text-sm">Last updated: June 10, 2026 · US Home Intelligence Platform · NoFluff Marketing LLC</p>
            </div>
            <p>This Privacy Policy governs the US Home Intelligence platform at intel.nofluffmarketing.io, operated by NoFluff Marketing LLC, 3333 Preston Rd Ste 300 #1570, Frisco, TX 75034. Phone: 940-394-5656. Tony Botchev, NMLS #114198, sponsored by Loan Factory, NMLS #320841.</p>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Information We Collect</h2>
              <p>Buyer questionnaire data (name, email, phone, property address, purchase context), payment data processed by Stripe (we do not store card numbers), realtor partner profile data (name, brokerage, license number, headshot, logo), and standard web analytics (IP, browser, pages visited).</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">How We Use Your Information</h2>
              <p>To produce and deliver USHI reports; to process payments via Stripe; to verify real estate licenses (TREC/NMLS); to generate cobrand partner share links; to send transactional emails about your order; and to comply with applicable law.</p>
              <p className="mt-3"><strong className="text-[#f0f0f5]">Phone numbers</strong> collected on this platform are used exclusively for report delivery and follow-up about your specific report order. They are not used for marketing SMS campaigns on this platform.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Third-Party Processors</h2>
              <p>Stripe (payments), GoHighLevel (CRM/automation), Manus AI (report generation), Vercel (hosting). Report content and buyer data passed to Manus for production are deleted per Manus data retention policies.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">CCPA (California Residents)</h2>
              <p>You have the right to know, delete, and opt out of sale of personal information. We do not sell personal information. Contact privacy@nofluffmarketing.io to exercise your rights.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">GDPR (EEA Residents)</h2>
              <p>You have the right to access, rectify, erase, restrict, and port your personal data. Contact privacy@nofluffmarketing.io.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Fair Housing</h2>
              <p>NoFluff Marketing LLC complies with the Fair Housing Act. All USHI reports use Fair Housing compliant language on demographic and schools chapters. Equal Housing Opportunity.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Contact</h2>
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-4">
                <p className="text-[#f0f0f5]">NoFluff Marketing LLC · 3333 Preston Rd Ste 300 #1570 · Frisco, TX 75034</p>
                <p>940-394-5656 · privacy@nofluffmarketing.io</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
