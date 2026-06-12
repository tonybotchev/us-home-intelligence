"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Upload, DollarSign, Users, BarChart3, Gift } from "lucide-react";

// ─── Realtor Partner Pricing Model ───────────────────────────────────────────
// Locked: 2026-06-12 by Tony Botchev · Supersedes the old comp-credit model
// ─────────────────────────────────────────────────────────────────────────────

const PARTNER_TIERS = [
  {
    id: "free",
    name: "Free Partner",
    price: "$0",
    period: "forever",
    color: "#22c55e",
    highlight: false,
    description: "Get your personal share link and start cobranding reports today.",
    features: [
      "Personal share link: intel.nofluffmarketing.io/r/your-name",
      "Cobranded reports — your name, photo & brokerage on every report",
      "DFW Homes & Loans dual-brand on all reports (RESPA-clean)",
      "Buyer activity feed in your partner dashboard",
      "Unlimited referral links",
    ],
    cta: "Join Free",
  },
  {
    id: "pro",
    name: "Pro Partner",
    price: "$97",
    period: "/mo",
    color: "#1a56db",
    highlight: true,
    description: "Unlimited comp reports for your active buyer pipeline — no per-report cost.",
    features: [
      "Everything in Free",
      "Unlimited comp reports for your active buyers",
      "Priority report turnaround (under 30 min)",
      "Custom accent color & tagline on every report",
      "Monthly pipeline performance report",
      "Dedicated success manager (Tony's team)",
    ],
    cta: "Start Pro — $97/mo",
  },
  {
    id: "team",
    name: "Team Partner",
    price: "$247",
    period: "/mo",
    color: "#c9a227",
    highlight: false,
    description: "Deploy USHI across your entire team or brokerage with a shared pool.",
    features: [
      "Everything in Pro (up to 10 agents)",
      "Shared team report pool",
      "Broker-level dashboard with agent sub-profiles",
      "Dual cobrand: brokerage logo + agent personal cobrand",
      "Quarterly competitive market briefing",
      "White-glove onboarding",
    ],
    cta: "Start Team — $247/mo",
  },
];

type FormState = {
  firstName: string; lastName: string; email: string; phone: string;
  brokerage: string; title: string; licenseNumber: string; licenseType: string;
  tagline: string; accentColor: string; slugPreference: string;
  selectedTier: string;
};

export default function RealtorSignup() {
  const [form, setForm] = useState<FormState>({
    firstName:"", lastName:"", email:"", phone:"",
    brokerage:"", title:"Realtor", licenseNumber:"", licenseType:"TREC",
    tagline:"", accentColor:"#1a56db", slugPreference:"",
    selectedTier: "free",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setForm(f => ({...f, [k]: e.target.value}));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await fetch("/api/realtor-signup", {
        method:"POST", headers:{"Content-Type":"application/json"},
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
          <p className="text-[#9ca3af] mb-6">Your partner account is active. Check your email for your welcome kit and a sample cobranded report.</p>
          <div className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl p-4 mb-6">
            <p className="text-[#6b7280] text-xs mb-2">Your share link:</p>
            <p className="text-[#00c2ff] font-mono text-sm break-all">{shareLink}</p>
          </div>
          <div className="bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-xl p-4 text-left text-sm text-[#9ca3af]">
            <p className="font-semibold text-[#f0f0f5] mb-2">How your partner account works:</p>
            <p>Share your link with buyers. Every report ordered through it is cobranded with your name, photo, and brokerage — and includes DFW Homes &amp; Loans as the preferred mortgage partner. RESPA-clean: no fees flow between us for mortgage referrals. Buyer always decides who to use.</p>
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

        {/* Hero */}
        <section className="py-16 px-6 border-b border-[#2a2a3a]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider bg-[#22c55e]/10 px-3 py-1 rounded-full">Realtor Partner Program</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0f0f5] mt-4 mb-4">Your brand. Our intelligence. One link.</h1>
            <p className="text-[#9ca3af] max-w-2xl mx-auto mb-8">Join the USHI Realtor Partner Network — free to start. Deliver investment-grade neighborhood reports to your buyers, cobranded with your name and brokerage. Upgrade to Pro or Team for unlimited comp reports and priority turnaround.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                {icon:<DollarSign size={18} className="text-[#22c55e]"/>, label:"Free to join"},
                {icon:<Users size={18} className="text-[#1a56db]"/>, label:"Your brand on every report"},
                {icon:<BarChart3 size={18} className="text-[#c9a227]"/>, label:"Investment-grade data"},
                {icon:<Gift size={18} className="text-[#00c2ff]"/>, label:"Pro: unlimited comp reports"},
              ].map(item => (
                <div key={item.label} className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                  {item.icon}
                  <span className="text-[#9ca3af] text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="py-16 px-6 border-b border-[#2a2a3a]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#f0f0f5] mb-2">Choose Your Partner Tier</h2>
              <p className="text-[#6b7280] text-sm">Locked pricing as of June 12, 2026. Start free — upgrade anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {PARTNER_TIERS.map(tier => (
                <div
                  key={tier.id}
                  onClick={() => setForm(f => ({...f, selectedTier: tier.id}))}
                  className={`relative rounded-2xl p-6 cursor-pointer transition-all flex flex-col ${
                    form.selectedTier === tier.id
                      ? "border-2 bg-[#12121a]"
                      : "border border-[#2a2a3a] bg-[#12121a] hover:border-[#3a3a4a]"
                  }`}
                  style={form.selectedTier === tier.id ? { borderColor: tier.color } : {}}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: tier.color }}>Most Popular</span>
                    </div>
                  )}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-[#f0f0f5]">{tier.name}</h3>
                    <p className="text-[#6b7280] text-xs mt-1">{tier.description}</p>
                  </div>
                  <div className="mb-5">
                    <span className="text-3xl font-bold" style={{ color: tier.color }}>{tier.price}</span>
                    <span className="text-[#6b7280] text-sm">{tier.period}</span>
                  </div>
                  <ul className="space-y-2 flex-1 mb-5">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                        <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: tier.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-colors ${
                      form.selectedTier === tier.id ? "text-white" : "text-[#9ca3af] border border-[#2a2a3a]"
                    }`}
                    style={form.selectedTier === tier.id ? { background: tier.color } : {}}
                  >
                    {form.selectedTier === tier.id ? "Selected" : tier.cta}
                  </div>
                </div>
              ))}
            </div>

            {/* DHL cobrand notice */}
            <div className="bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#1a56db]/20 border border-[#1a56db]/30 flex items-center justify-center shrink-0">
                <span className="text-[#1a56db] text-xs font-bold">DHL</span>
              </div>
              <div>
                <p className="text-[#f0f0f5] font-semibold text-sm mb-1">DFW Homes &amp; Loans appears as preferred mortgage partner on all reports</p>
                <p className="text-[#6b7280] text-xs">Every cobranded report includes a dedicated "Your Mortgage Partner" page featuring Tony Botchev, NMLS #114198, and DFW Homes &amp; Loans. RESPA-clean — no fees flow between us. Your buyer always decides who to use for their mortgage.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signup form */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#f0f0f5]">Create Your Partner Account</h2>
              <p className="text-[#6b7280] text-sm mt-1">No credit card required for Free tier. Pro and Team billing starts after account activation.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-4">Required Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">First Name *</label>
                    <input required value={form.firstName} onChange={set("firstName")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Last Name *</label>
                    <input required value={form.lastName} onChange={set("lastName")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Smith" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="jane@brokerage.com" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Phone *</label>
                    <input required type="tel" value={form.phone} onChange={set("phone")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="(214) 555-0100" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Brokerage Name *</label>
                    <input required value={form.brokerage} onChange={set("brokerage")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Keller Williams Frisco" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Title *</label>
                    <select required value={form.title} onChange={set("title")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]">
                      <option>Realtor</option><option>Broker</option><option>Team Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">License # (TREC or NMLS) *</label>
                    <input required value={form.licenseNumber} onChange={set("licenseNumber")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="TX TREC or NMLS number" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">License Type *</label>
                    <select required value={form.licenseType} onChange={set("licenseType")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]">
                      <option value="TREC">TREC</option><option value="NMLS">NMLS</option><option value="Both">Both</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-1">Cobrand Settings <span className="text-[#6b7280] font-normal text-xs">(optional)</span></h3>
                <p className="text-[#6b7280] text-xs mb-4">Customize how your name appears on cobranded reports.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Personal Tagline <span className="text-[#4a4a5a]">(max 80 chars)</span></label>
                    <input maxLength={80} value={form.tagline} onChange={set("tagline")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Your trusted Frisco real estate advisor" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Brand Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={form.accentColor} onChange={set("accentColor")} className="w-12 h-10 rounded cursor-pointer bg-transparent border-0" />
                      <input value={form.accentColor} onChange={set("accentColor")} className="flex-1 bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="#1a56db" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Custom Slug <span className="text-[#4a4a5a]">(URL-safe)</span></label>
                    <input value={form.slugPreference} onChange={set("slugPreference")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="jane-smith (default)" />
                    <p className="text-[#4a4a5a] text-xs mt-1">intel.nofluffmarketing.io/r/your-slug</p>
                  </div>
                </div>
                <div className="mt-4 border-t border-[#2a2a3a] pt-4">
                  <p className="text-[#6b7280] text-xs mb-3">Upload headshot and brokerage logo (optional — can be added later in your dashboard)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col items-center justify-center border border-dashed border-[#2a2a3a] rounded-xl p-4 cursor-pointer hover:border-[#1a56db]/50 transition-colors">
                      <Upload size={20} className="text-[#6b7280] mb-2" />
                      <span className="text-[#6b7280] text-xs">Headshot (180x180)</span>
                      <input type="file" accept="image/jpeg,image/png" className="hidden" />
                    </label>
                    <label className="flex flex-col items-center justify-center border border-dashed border-[#2a2a3a] rounded-xl p-4 cursor-pointer hover:border-[#1a56db]/50 transition-colors">
                      <Upload size={20} className="text-[#6b7280] mb-2" />
                      <span className="text-[#6b7280] text-xs">Brokerage Logo</span>
                      <input type="file" accept="image/jpeg,image/png" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Selected tier summary */}
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#f0f0f5] font-semibold text-sm">
                      {PARTNER_TIERS.find(t => t.id === form.selectedTier)?.name}
                    </p>
                    <p className="text-[#6b7280] text-xs mt-0.5">
                      {PARTNER_TIERS.find(t => t.id === form.selectedTier)?.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-[#f0f0f5]">
                      {PARTNER_TIERS.find(t => t.id === form.selectedTier)?.price}
                    </span>
                    <span className="text-[#6b7280] text-xs">
                      {PARTNER_TIERS.find(t => t.id === form.selectedTier)?.period}
                    </span>
                  </div>
                </div>
              </div>

              {error && <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{error}</div>}

              <button type="submit" disabled={submitting} className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? "Creating your partner account..." : <><span>Create Partner Account</span><ArrowRight size={18}/></>}
              </button>
              <p className="text-[#4a4a5a] text-xs text-center">By signing up you agree to our Terms of Service and Privacy Policy. RESPA-clean: no referral fees between NoFluff Marketing LLC and realtor partners.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
