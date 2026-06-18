"use client";
import { useState } from "react";
import { buyBreadcrumb } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, MapPin, Home } from "lucide-react";

const PRICE_BANDS = ["Under $300K","$300K–$500K","$500K–$1M","$1M–$2M","Over $2M"];
const USE_CASES = ["Primary Residence","Investment","Vacation","Luxury"];

export default function BuyPage() {
  return <BuyForm referralSlug={null} realtorName={null} realtorBrokerage={null} realtorHeadshot={null} accentColor={null} />;
}

export function BuyForm({referralSlug, realtorName, realtorBrokerage, realtorHeadshot, accentColor}: {
  referralSlug: string|null; realtorName: string|null; realtorBrokerage: string|null; realtorHeadshot: string|null; accentColor: string|null;
}) {
  // Explicit tier selection — default to zip-level (lower friction)
  const [selectedTier, setSelectedTier] = useState<"zip-level" | "address-specific">("zip-level");

  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"",
    address:"", city:"", state:"", zip:"",
    priceBand:"", useCase:"", hasLender:"", concerns:""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(f => ({...f, [k]: e.target.value}));

  const price = selectedTier === "address-specific" ? 147 : 97;
  const tier = selectedTier;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      // Step 1: Fire lead-capture webhook to GHL BEFORE Stripe redirect
      // Non-blocking — if it fails, we still proceed to checkout
      try {
        await fetch("/api/lead-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            city: form.city,
            state: form.state,
            zip: form.zip,
            street_address: selectedTier === "address-specific" ? form.address : "",
            tier,
            price: String(price),
            purchase_price_band: form.priceBand,
            use_case: form.useCase,
            has_lender: form.hasLender === "Yes" ? "yes" : "no",
            concerns: form.concerns,
            tag: "USHI-Buyer-Started",
            source: "intel.nofluffmarketing.io/buy",
            submitted_at: new Date().toISOString(),
          }),
        });
      } catch {
        // Lead capture failure is non-blocking — log and continue
        console.warn("[lead-capture] GHL webhook failed — proceeding to Stripe");
      }

      // Step 2: Create Stripe Checkout session
      const res = await fetch("/api/stripe-checkout", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({...form, referralSlug, tier, price}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error || "Could not create checkout session.");
    } catch { setError("Network error. Please try again."); }
    finally { setSubmitting(false); }
  }

  const accent = accentColor || "#1a56db";

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buyBreadcrumb()) }} />
        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto">
            {realtorName && (
              <div className="bg-[#12121a] border rounded-2xl p-6 mb-8 flex items-center gap-4" style={{borderColor: accent + "40"}}>
                {realtorHeadshot && <img src={realtorHeadshot} alt={realtorName} className="w-14 h-14 rounded-full object-cover" />}
                <div>
                  <p className="text-[#6b7280] text-xs mb-1">Prepared in partnership with</p>
                  <p className="text-[#f0f0f5] font-semibold">{realtorName}</p>
                  {realtorBrokerage && <p className="text-[#9ca3af] text-sm">{realtorBrokerage}</p>}
                </div>
              </div>
            )}

            <div className="mb-4">
              <span className="text-xs font-semibold text-[#00c2ff] uppercase tracking-wider bg-[#00c2ff]/10 px-3 py-1 rounded-full">Order Your Report</span>
            </div>
            <h1 className="text-3xl font-bold text-[#f0f0f5] mt-4 mb-2">Investment-Grade Neighborhood Intelligence</h1>
            <p className="text-[#9ca3af] mb-8">Complete the questionnaire below. Your report will be delivered to your email in under an hour.</p>

            {/* ─── TIER SELECTION CARDS ─────────────────────────────────────────── */}
            <div className="mb-8">
              <p className="text-[#9ca3af] text-sm font-medium mb-3">Step 1 — Choose your report type:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* ZIP-LEVEL CARD */}
                <button
                  type="button"
                  onClick={() => setSelectedTier("zip-level")}
                  className={`text-left rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                    selectedTier === "zip-level"
                      ? "border-[#1a56db] bg-[#1a56db]/10"
                      : "border-[#2a2a3a] bg-[#12121a] hover:border-[#3a3a5a]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className={selectedTier === "zip-level" ? "text-[#1a56db]" : "text-[#6b7280]"} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${selectedTier === "zip-level" ? "text-[#1a56db]" : "text-[#6b7280]"}`}>
                        Zip-Level Report
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedTier === "zip-level" ? "border-[#1a56db]" : "border-[#4a4a5a]"
                    }`}>
                      {selectedTier === "zip-level" && <div className="w-2 h-2 rounded-full bg-[#1a56db]" />}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#f0f0f5] mb-3">$97</div>
                  <ul className="space-y-1.5">
                    {[
                      "Zip code market overview",
                      "Schools & school ratings",
                      "Crime + risk analysis",
                      "Market trends & velocity",
                      "Lifestyle & amenity data",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                        <CheckCircle size={12} className="text-[#22c55e] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedTier === "zip-level"
                      ? "bg-[#1a56db] text-white"
                      : "bg-[#2a2a3a] text-[#9ca3af]"
                  }`}>
                    {selectedTier === "zip-level" ? "✓ Selected" : "Choose Zip Report"}
                  </div>
                </button>

                {/* ADDRESS-SPECIFIC CARD */}
                <button
                  type="button"
                  onClick={() => setSelectedTier("address-specific")}
                  className={`text-left rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                    selectedTier === "address-specific"
                      ? "border-[#00c2ff] bg-[#00c2ff]/10"
                      : "border-[#2a2a3a] bg-[#12121a] hover:border-[#3a3a5a]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Home size={18} className={selectedTier === "address-specific" ? "text-[#00c2ff]" : "text-[#6b7280]"} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${selectedTier === "address-specific" ? "text-[#00c2ff]" : "text-[#6b7280]"}`}>
                        Address-Specific Report
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedTier === "address-specific" ? "border-[#00c2ff]" : "border-[#4a4a5a]"
                    }`}>
                      {selectedTier === "address-specific" && <div className="w-2 h-2 rounded-full bg-[#00c2ff]" />}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-[#f0f0f5] mb-1">$147</div>
                  <p className="text-[#6b7280] text-xs mb-3">Everything in Zip + your exact property</p>
                  <ul className="space-y-1.5">
                    {[
                      "Comparable sales within 0.5mi",
                      "Parcel tax history",
                      "School attendance zone",
                      "HOA / PID / MUD disclosure",
                      "FEMA flood zone mapping",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                        <CheckCircle size={12} className="text-[#00c2ff] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                    selectedTier === "address-specific"
                      ? "bg-[#00c2ff] text-[#0a0a0f]"
                      : "bg-[#2a2a3a] text-[#9ca3af]"
                  }`}>
                    {selectedTier === "address-specific" ? "✓ Selected" : "Choose Address Report"}
                  </div>
                </button>

              </div>
            </div>
            {/* ─── END TIER SELECTION CARDS ─────────────────────────────────────── */}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-4">Your Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">First Name *</label>
                    <input required value={form.firstName} onChange={set("firstName")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Alex" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Last Name *</label>
                    <input required value={form.lastName} onChange={set("lastName")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Johnson" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="alex@email.com" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={set("phone")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="(214) 555-0100" />
                    <p className="text-[#4a4a5a] text-xs mt-1">This phone is used for report delivery and follow-up about your report only — not for marketing SMS.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-2">Property Information</h3>
                <p className="text-[#6b7280] text-xs mb-4">
                  {selectedTier === "address-specific"
                    ? "Enter the full street address for your address-specific report."
                    : "Enter city and ZIP for your zip-level report. Street address is optional."}
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">
                      Street Address{" "}
                      {selectedTier === "address-specific"
                        ? <span className="text-red-400">*</span>
                        : <span className="text-[#4a4a5a]">(optional — for address-specific $147)</span>}
                    </label>
                    <input
                      value={form.address}
                      onChange={set("address")}
                      required={selectedTier === "address-specific"}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder={selectedTier === "address-specific" ? "1234 Main St (required)" : "1234 Main St"}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[#9ca3af] text-xs mb-1">City *</label>
                      <input required value={form.city} onChange={set("city")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Frisco" />
                    </div>
                    <div>
                      <label className="block text-[#9ca3af] text-xs mb-1">State *</label>
                      <input required value={form.state} onChange={set("state")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="TX" maxLength={2} />
                    </div>
                    <div>
                      <label className="block text-[#9ca3af] text-xs mb-1">ZIP *</label>
                      <input required value={form.zip} onChange={set("zip")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="75034" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-4">Purchase Context</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Purchase Price Band *</label>
                    <select required value={form.priceBand} onChange={set("priceBand")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]">
                      <option value="">Select range</option>
                      {PRICE_BANDS.map(b=><option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Use Case *</label>
                    <select required value={form.useCase} onChange={set("useCase")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]">
                      <option value="">Select use case</option>
                      {USE_CASES.map(u=><option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Do you have a lender? *</label>
                    <div className="flex gap-4">
                      {["Yes","No"].map(v=>(
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="hasLender" value={v} checked={form.hasLender===v} onChange={set("hasLender")} className="accent-[#1a56db]" required />
                          <span className="text-[#9ca3af] text-sm">{v}</span>
                        </label>
                      ))}
                    </div>
                    {form.hasLender === "No" && (
                      <div className="mt-3 bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-lg p-3 text-xs text-[#9ca3af]">
                        If you need a lender, you are welcome to mention us. If you need a recommendation for a local lender, we can connect you with one of our trusted partners.
                      </div>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Specific concerns or questions <span className="text-[#4a4a5a]">(optional)</span></label>
                    <textarea value={form.concerns} onChange={set("concerns")} rows={3} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db] resize-none" placeholder="Anything specific you want the report to address..." />
                  </div>
                </div>
              </div>

              {/* Price summary card — reflects explicit tier selection */}
              <div className={`bg-[#12121a] rounded-2xl p-6 border-2 ${
                selectedTier === "address-specific" ? "border-[#00c2ff]/40" : "border-[#1a56db]/40"
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#f0f0f5] font-semibold">
                      {selectedTier === "address-specific" ? "Address-Specific Report" : "Zip-Level Report"}
                    </div>
                    <div className="text-[#6b7280] text-sm">
                      {selectedTier === "address-specific"
                        ? "Full 11-chapter deep-dive with property-specific data, parcel-level AVM, comparable sales, FEMA flood zone, school attendance zone"
                        : "Zip code market overview"}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${selectedTier === "address-specific" ? "text-[#00c2ff]" : "text-[#f0f0f5]"}`}>
                    ${price}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#6b7280]">
                  <CheckCircle size={12} className="text-[#22c55e]" />
                  Delivered to your email in under an hour · Produced exclusively by NoFluff Marketing LLC
                </div>
              </div>

              {error && <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{error}</div>}

              <button type="submit" disabled={submitting} className={`w-full text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                selectedTier === "address-specific"
                  ? "bg-[#00a8d8] hover:bg-[#0090bb]"
                  : "bg-[#1a56db] hover:bg-[#1040b0]"
              }`}>
                {submitting ? "Redirecting to checkout..." : <><span>Continue to Checkout — ${price}</span><ArrowRight size={18}/></>}
              </button>
              <p className="text-[#4a4a5a] text-xs text-center">Secure checkout. By ordering you agree to our Terms of Service and Privacy Policy.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
