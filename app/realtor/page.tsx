"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

// ─── Realtor Partner Pricing Model ───────────────────────────────────────────
// Locked: 2026-06-12 by Tony Botchev · Supersedes the old comp-credit model
//
// EXACT MODEL v3 (no deviations):
//   1. Free signup — no credit card, no subscription, no tier selector
//   2. 1 free cobranded welcome report (first order only — thank-you gift, not a demo)
//   3. Every report after that: realtor CHOOSES per order:
//        Option A — Cobranded (realtor brand + DHL): 20% off public price
//          Zip-level:        $77.60  (public $97)
//          Address-specific: $117.60 (public $147)
//        Option B — Normal (DHL-only, no realtor brand): full public price
//          Zip-level:        $97.00
//          Address-specific: $147.00
//   4. Active-buyer-prospect attestation required at each order
//   5. Cobranded reports: realtor brand (lead) + DHL co-publisher
//   6. NO subscriptions. NO Pro tier. NO Team tier. NO monthly fees. Ever.
//   7. NO team/volume/brokerage language anywhere on this page.
// ─────────────────────────────────────────────────────────────────────────────

type FormState = {
  firstName: string; lastName: string; email: string; phone: string;
  brokerage: string; title: string; licenseNumber: string; licenseType: string;
  tagline: string; accentColor: string; slugPreference: string;
};

export default function RealtorSignup() {
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", phone: "",
    brokerage: "", title: "Realtor", licenseNumber: "", licenseType: "TREC",
    tagline: "", accentColor: "#1a56db", slugPreference: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/realtor-signup", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) { setShareLink(data.shareLink); setSubmitted(true); }
      else setError(data.error || "Something went wrong. Please try again.");
    } catch { setError("Network error. Please try again."); }
    finally { setSubmitting(false); }
  }

  if (submitted) return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-[#12121a] border border-[#22c55e]/30 rounded-2xl p-10 text-center">
          <CheckCircle size={56} className="text-[#22c55e] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Welcome to the USHI Partner Network</h2>
          <p className="text-[#9ca3af] mb-6">
            Your partner account is active. Check your email for your welcome kit — including your first free cobranded report to share with a buyer prospect.
          </p>
          <div className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl p-4 mb-6">
            <p className="text-[#6b7280] text-xs mb-2">Your share link:</p>
            <p className="text-[#00c2ff] font-mono text-sm break-all">{shareLink}</p>
          </div>
          <div className="bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-xl p-4 text-left text-sm text-[#9ca3af]">
            <p className="font-semibold text-[#f0f0f5] mb-2">How it works from here:</p>
            <ul className="space-y-1 text-xs">
              <li>•               Your first report is on us — our thank-you for joining the USHI Realtor Network.</li>
              <li>•               Every report after that: choose cobranded (20% off — $77.60 zip / $117.60 address) or full-price normal report — your call on every order.</li>
              <li>•               Cobranded reports carry your name, photo, and brokerage — plus DFW Homes &amp; Loans as the preferred mortgage partner.</li>
              <li>•               RESPA-clean: no referral fees. Your buyer always decides who to use for their mortgage.
              <li>• Prefer no cobrand? Order a full-price normal report ($97/$147) — DHL-only template, your name stays off it.</li></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24">

        {/* Hero / Value Prop */}
        <section className="py-16 px-6 border-b border-[#2a2a3a]">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider bg-[#22c55e]/10 px-3 py-1 rounded-full">
              Realtor Partner Program
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0f0f5] mt-4 mb-4">
              Your brand. Our intelligence. One link.
            </h1>
            <p className="text-[#9ca3af] text-lg max-w-2xl mx-auto mb-8">
              Free to join. One free welcome report on us. 20% off every cobranded report after that.<br />
              Your brand + DFW Homes &amp; Loans on every cobranded order — or go full-price normal, your choice each time.
            </p>

            {/* 4-point value prop — no tier comparison, no pricing cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left mb-8">
              {[
                { label: "Free to join", sub: "No credit card. No subscription. Ever." },
                { label: "1 free welcome report", sub: "Our thank-you for joining — share it with your first buyer prospect." },
                { label: "$77.60 / $117.60 cobranded", sub: "20% off public price. Pay only when you order. No subscription." },
                { label: "Your brand on every report", sub: "Your name, photo & brokerage — plus DHL as mortgage partner." },
              ].map(item => (
                <div key={item.label} className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle size={16} className="text-[#22c55e] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#f0f0f5] text-sm font-semibold">{item.label}</p>
                    <p className="text-[#6b7280] text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner pricing table — simple, no tier cards */}
            <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl overflow-hidden max-w-lg mx-auto mb-6">
              <div className="grid grid-cols-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider px-5 py-2.5 border-b border-[#2a2a3a]">
                <span>Report Type</span>
                <span className="text-center">Public Price</span>
                <span className="text-right text-[#22c55e]">Your Price</span>
              </div>
              <div className="grid grid-cols-3 px-5 py-3 border-b border-[#2a2a3a] items-center">
                <div>
                  <p className="text-[#f0f0f5] text-sm font-medium">Zip-Level</p>
                  <p className="text-[#6b7280] text-xs">Neighborhood overview</p>
                </div>
                <p className="text-[#6b7280] text-sm text-center line-through">$97</p>
                <p className="text-[#22c55e] text-lg font-bold text-right">$77.60</p>
              </div>
              <div className="grid grid-cols-3 px-5 py-3 items-center">
                <div>
                  <p className="text-[#f0f0f5] text-sm font-medium">Address-Specific</p>
                  <p className="text-[#6b7280] text-xs">Full property deep-dive</p>
                </div>
                <p className="text-[#6b7280] text-sm text-center line-through">$147</p>
                <p className="text-[#22c55e] text-lg font-bold text-right">$117.60</p>
              </div>
            </div>
            <p className="text-[#6b7280] text-xs">
              Locked pricing as of June 12, 2026. Per order — no subscription, no monthly fee.
              Cobranded orders only. Full-price option ($97/$147) available per order if you prefer no cobrand.
            </p>
          </div>
        </section>

        {/* DHL cobrand notice */}
        <section className="py-10 px-6 border-b border-[#2a2a3a]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#1a56db]/20 border border-[#1a56db]/30 flex items-center justify-center shrink-0">
                <span className="text-[#1a56db] text-xs font-bold">DHL</span>
              </div>
              <div>
                <p className="text-[#f0f0f5] font-semibold text-sm mb-1">
                  DFW Homes &amp; Loans appears as preferred mortgage partner on every cobranded report
                </p>
                <p className="text-[#6b7280] text-xs">
                  Every report includes a dedicated &ldquo;Your Mortgage Partner&rdquo; page featuring Tony Botchev, NMLS #114198, and DFW Homes &amp; Loans (Loan Factory NMLS #320841). RESPA-clean — no fees flow between us. Your buyer always decides who to use for their mortgage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signup form */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#f0f0f5]">Create Your Partner Account</h2>
              <p className="text-[#6b7280] text-sm mt-1">
                Free to join. No credit card required. Your first report is our welcome gift to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Required fields */}
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-4">Required Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">First Name *</label>
                    <input required value={form.firstName} onChange={set("firstName")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Last Name *</label>
                    <input required value={form.lastName} onChange={set("lastName")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Smith" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="jane@brokerage.com" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Phone *</label>
                    <input required type="tel" value={form.phone} onChange={set("phone")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="(214) 555-0100" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Brokerage Name *</label>
                    <input required value={form.brokerage} onChange={set("brokerage")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Keller Williams Frisco" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Title *</label>
                    <select required value={form.title} onChange={set("title")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]">
                      <option>Realtor</option>
                      <option>Broker</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">License # (TREC or NMLS) *</label>
                    <input required value={form.licenseNumber} onChange={set("licenseNumber")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="TX TREC or NMLS number" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">License Type *</label>
                    <select required value={form.licenseType} onChange={set("licenseType")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]">
                      <option value="TREC">TREC</option>
                      <option value="NMLS">NMLS</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cobrand settings */}
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-1">
                  Cobrand Settings{" "}
                  <span className="text-[#6b7280] font-normal text-xs">(optional — can be updated later in your dashboard)</span>
                </h3>
                <p className="text-[#6b7280] text-xs mb-4">Customize how your name appears on cobranded reports.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Personal Tagline <span className="text-[#6b7280]">(max 80 chars)</span></label>
                    <input maxLength={80} value={form.tagline} onChange={set("tagline")}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Your DFW neighborhood expert" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Brand Accent Color</label>
                    <input type="color" value={form.accentColor} onChange={set("accentColor")}
                      className="w-full h-12 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-2 py-1 cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Custom Slug <span className="text-[#6b7280]">(URL-safe)</span></label>
                    <div className="flex items-center">
                      <span className="bg-[#0a0a0f] border border-r-0 border-[#2a2a3a] rounded-l-lg px-3 py-3 text-[#6b7280] text-xs whitespace-nowrap">/r/</span>
                      <input value={form.slugPreference} onChange={set("slugPreference")}
                        className="flex-1 bg-[#0a0a0f] border border-[#2a2a3a] rounded-r-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                        placeholder="your-slug" />
                    </div>
                  </div>
                </div>
                <p className="text-[#6b7280] text-xs mt-4">Upload headshot and brokerage logo (optional — can be added later in your dashboard)</p>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="border border-dashed border-[#2a2a3a] rounded-lg p-4 text-center">
                    <p className="text-[#6b7280] text-xs">Headshot (180×180)</p>
                  </div>
                  <div className="border border-dashed border-[#2a2a3a] rounded-lg p-4 text-center">
                    <p className="text-[#6b7280] text-xs">Brokerage Logo</p>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: "#22c55e" }}
              >
                {submitting ? "Creating your account…" : (
                  <><span>Create Partner Account — Free</span><ArrowRight size={18} /></>
                )}
              </button>

              <p className="text-[#6b7280] text-xs text-center">
                By signing up you agree to our{" "}
                <a href="/terms" className="underline">Terms of Service</a> and{" "}
                <a href="/privacy" className="underline">Privacy Policy</a>.{" "}
                RESPA-clean: no referral fees between NoFluff Marketing LLC and realtor partners.
              </p>


            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
