"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Building2 } from "lucide-react";

// ─── Brokerage page — locked 2026-06-12 ──────────────────────────────────────
// NO Team Partner tier. NO $247/mo. NO "up to 10 agents" product.
// Brokerages with 5+ agents are directed to email for a custom conversation.
// ─────────────────────────────────────────────────────────────────────────────

export default function BrokeragePage() {
  const [form, setForm] = useState({
    brokerageName: "", stateLicense: "", officeAddress: "",
    opsEmail: "", agentCount: "", brokerOwner: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    try {
      await fetch("/api/brokerage-inquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch { } finally { setSubmitting(false); }
  }

  if (submitted) return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-[#12121a] border border-[#22c55e]/30 rounded-2xl p-10 text-center">
          <CheckCircle size={56} className="text-[#22c55e] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Inquiry Received</h2>
          <p className="text-[#9ca3af]">
            We&apos;ll review your details and reach out within 1 business day to discuss volume pricing options for your team.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider bg-[#c9a227]/10 px-3 py-1 rounded-full">
                Brokerage &amp; Volume Inquiries
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#f0f0f5] mt-4 mb-2">Brokerage Partner Program</h1>
            <p className="text-[#9ca3af] mb-6">
              Individual agents sign up free at <a href="/realtor" className="text-[#22c55e] underline">/realtor</a> and order cobranded reports at 50% off the public price — no subscription needed.
            </p>
            <p className="text-[#9ca3af] mb-8">
              If you&apos;re a brokerage or have 5 or more agents interested in volume pricing, reach out and we&apos;ll discuss options. Use the form below or email{" "}
              <a href="mailto:info@nofluffmarketing.io" className="text-[#22c55e] underline">info@nofluffmarketing.io</a> directly.
            </p>

            {/* What every agent gets */}
            <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-[#c9a227] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#f0f0f5] font-semibold text-sm mb-2">What every agent in your brokerage gets</p>
                  <ul className="space-y-1.5">
                    {[
                      "Free signup — personal cobrand share link (/r/their-name)",
                      "1 free demo report to share with a buyer prospect",
                      "Every report cobranded: agent name, photo & brokerage on cover",
                      "DFW Homes & Loans as preferred mortgage partner on every report (RESPA-clean)",
                      "Partner pricing: $48.50 zip-level / $73.50 address-specific — per order, no subscription",
                    ].map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                        <CheckCircle size={12} className="text-[#c9a227] mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-4">Volume Inquiry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Brokerage Name *</label>
                    <input required value={form.brokerageName} onChange={set("brokerageName")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Keller Williams Frisco" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">State License # *</label>
                    <input required value={form.stateLicense} onChange={set("stateLicense")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="TX TREC Broker #" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Number of Agents *</label>
                    <input required type="number" min="5" value={form.agentCount} onChange={set("agentCount")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="5 or more" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Broker-Owner Name *</label>
                    <input required value={form.brokerOwner} onChange={set("brokerOwner")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Contact Email *</label>
                    <input required type="email" value={form.opsEmail} onChange={set("opsEmail")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="broker@brokerage.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Office Address</label>
                    <input value={form.officeAddress} onChange={set("officeAddress")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="1234 Main St, Frisco, TX 75034" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Notes (optional)</label>
                    <textarea value={form.notes} onChange={set("notes")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db] resize-none"
                      rows={3}
                      placeholder="Tell us about your team size, use case, or any questions." />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-[#c9a227] hover:bg-[#a07d1a] text-black font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? "Submitting..." : <><span>Send Volume Inquiry</span><ArrowRight size={18} /></>}
              </button>
              <p className="text-[#4a4a5a] text-xs text-center">
                RESPA-clean: no referral fees between NoFluff Marketing LLC and realtor partners for mortgage referrals.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
