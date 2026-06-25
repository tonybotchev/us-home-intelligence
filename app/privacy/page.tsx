import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = "https://intel.nofluffmarketing.io";

export const metadata: Metadata = {
  title: "Privacy Policy | US Home Intelligence — NoFluff Marketing LLC",
  description: "Privacy Policy for US Home Intelligence, produced by NoFluff Marketing LLC, Frisco TX. Covers data collection, use, and your rights as a consumer under CCPA and applicable law.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "US Home Intelligence",
    locale: "en_US",
    url: `${SITE_URL}/privacy`,
    title: "Privacy Policy | US Home Intelligence",
    description: "Privacy Policy for US Home Intelligence, produced by NoFluff Marketing LLC, Frisco TX.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "US Home Intelligence Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | US Home Intelligence",
    description: "Privacy Policy for US Home Intelligence, produced by NoFluff Marketing LLC, Frisco TX.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
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
            <p>This Privacy Policy governs the US Home Intelligence platform at intel.nofluffmarketing.io, operated by NoFluff Marketing LLC, 3333 Preston Rd Ste 300 #1570, Frisco, TX 75034. Phone: 940-394-5656. </p>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Information We Collect</h2>
              <p>Buyer questionnaire data (name, email, phone, property address, purchase context), payment data processed via industry-standard PCI-compliant payment processing (we do not store card numbers), and standard web analytics (IP, browser, pages visited).</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">How We Use Your Information</h2>
              <p>To produce and deliver USHI reports; to process payments via our secure payment processor; to send transactional emails about your order; and to comply with applicable law.</p>
              <p className="mt-3"><strong className="text-[#f0f0f5]">Phone numbers</strong> collected on this platform are used exclusively for report delivery and follow-up about your specific report order. They are not used for marketing SMS campaigns on this platform.</p>
              <p className="mt-3">Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">Third-Party Processors</h2>
              <p>Our secure payment processor (payments), our proprietary CRM and automation platform, our report generation engine, and our hosting infrastructure. Report content and buyer data used for production are subject to our data retention policies and are not retained beyond delivery.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#f0f0f5] mb-3">SMS and A2P Messaging</h2>
              <p>By providing your phone number, you consent to receive transactional SMS messages from NoFluff Marketing LLC regarding your account, order status, US Home Intelligence report delivery, and service updates. You may also receive occasional marketing messages about new services and offers.</p>
              <p className="mt-3">For privacy concerns regarding SMS communications, contact us at <a href="mailto:info@nofluffmarketing.io" className="text-[#00c2ff] hover:underline">info@nofluffmarketing.io</a>.</p>
              <p className="mt-3"><strong className="text-[#f0f0f5]">Message frequency varies</strong> based on report status and account activity. <strong className="text-[#f0f0f5]">Message and data rates may apply.</strong> <strong className="text-[#f0f0f5]">Reply STOP to cancel</strong> at any time. <strong className="text-[#f0f0f5]">Reply HELP for help.</strong> No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
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
