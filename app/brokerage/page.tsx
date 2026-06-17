import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, UserCheck, Gift, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "For Brokerages | US Home Intelligence",
  description:
    "Brokerages route through individual realtor signups — each agent gets 1 free welcome cobranded report plus 20% off cobranded reports on every order after that.",
  alternates: {
    canonical: "https://intel.nofluffmarketing.io/brokerage",
  },
};

const HOW_IT_WORKS = [
  {
    icon: UserCheck,
    step: "1",
    title: "Each agent signs up individually — free, no credit card",
    body: "Every licensed agent at your brokerage creates their own Realtor Partner account in under two minutes. No brokerage-level contract or seat fee required.",
  },
  {
    icon: Gift,
    step: "2",
    title: "First report: a free cobranded welcome gift",
    body: "On signup, each agent receives one complimentary cobranded US Home Intelligence report — branded with their name and your brokerage — to share with a buyer prospect as a thank-you gift.",
  },
  {
    icon: Building2,
    step: "3",
    title: "Every report after: 20% off cobranded pricing",
    body: "After the welcome report, agents order on demand. Cobranded reports (agent brand + DHL) are 20% off public price: $77.60 zip-level or $117.60 address-specific. No subscription, no minimum volume.",
  },
  {
    icon: ArrowRight,
    step: "4",
    title: "Each agent gets a unique referral link",
    body: "Every partner receives a personal share URL (intel.nofluffmarketing.io/r/their-name) to embed in listing presentations, buyer packets, and social posts.",
  },
];

export default function BrokeragePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-full px-4 py-1.5 mb-6">
            <Building2 size={14} className="text-[#1a56db]" />
            <span className="text-[#1a56db] text-xs font-medium tracking-wide uppercase">For Brokerages</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6 leading-tight">
            Brokerages route through{" "}
            <span className="text-[#00c2ff]">individual agent signups</span>
          </h1>
          <p className="text-[#9ca3af] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Each agent at your brokerage gets their own free Realtor Partner account — including
            one free welcome cobranded report and 20% off every cobranded order after that.
            No brokerage contract. No seat fees. No minimums.
          </p>
          <Link
            href="/realtor"
            className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1040b0] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
          >
            Sign Up as a Realtor Partner
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0d0d14]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-10 text-center">
            How It Works for Your Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, body }) => (
              <div
                key={step}
                className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a56db]/20 flex items-center justify-center">
                  <Icon size={20} className="text-[#1a56db]" />
                </div>
                <div>
                  <h3 className="text-[#f0f0f5] font-semibold mb-2 leading-snug">{title}</h3>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing summary ───────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-8 text-center">
            Partner Pricing at a Glance
          </h2>
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-[#1a1a2a] px-6 py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wide">
              <span>Report Type</span>
              <span className="text-center">Public Price</span>
              <span className="text-right">Partner Price (20% off)</span>
            </div>
            {[
              { type: "Zip-Level", public: "$97", partner: "$77.60" },
              { type: "Address-Specific", public: "$147", partner: "$117.60" },
            ].map(({ type, public: pub, partner }) => (
              <div key={type} className="grid grid-cols-3 px-6 py-4 border-t border-[#2a2a3a] items-center">
                <span className="text-[#f0f0f5] text-sm font-medium">{type}</span>
                <span className="text-center text-[#9ca3af] text-sm">{pub}</span>
                <span className="text-right text-[#00c2ff] font-bold text-sm">{partner}</span>
              </div>
            ))}
            <div className="px-6 py-4 border-t border-[#2a2a3a] bg-[#0d0d14]">
              <div className="flex items-start gap-2">
                <CheckCircle size={16} className="text-[#00c2ff] mt-0.5 flex-shrink-0" />
                <p className="text-[#9ca3af] text-xs leading-relaxed">
                  First report for each new partner is <strong className="text-[#f0f0f5]">complimentary</strong> — a cobranded
                  welcome gift. Cobranded pricing applies to all subsequent orders. Normal (DHL-only)
                  reports are always available at full public price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0d0d14]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-4">
            Ready to equip your agents?
          </h2>
          <p className="text-[#9ca3af] mb-8 leading-relaxed">
            Share this page with your team or forward the signup link. Each agent registers
            in under two minutes — no brokerage approval needed.
          </p>
          <Link
            href="/realtor"
            className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1040b0] text-white font-semibold px-8 py-4 rounded-xl transition-colors"
          >
            Agent Signup — Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Frisco footer ─────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
