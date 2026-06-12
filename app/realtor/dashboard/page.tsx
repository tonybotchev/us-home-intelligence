"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Copy, CheckCircle, BarChart3, Users, Gift } from "lucide-react";

// ─── Partner model locked 2026-06-12 ─────────────────────────────────────────
// Supersedes old comp-credit model.
// Free signup → 1 free welcome report (thank-you gift) → per-order choice:
//   Option A: Cobranded (realtor brand + DHL) → 20% off: $77.60 zip / $117.60 address
//   Option B: Normal (DHL-only, no realtor brand) → full price: $97 zip / $147 address
// NO subscriptions. NO Pro tier. NO Team tier. NO upgrade prompts.
// Active-buyer attestation required at each order.
// ─────────────────────────────────────────────────────────────────────────────

interface DashboardData {
  name: string;
  email: string;
  brokerage: string;
  slug: string;
  freeReportUsed: boolean; // true after the first free report has been sent
  activityFeed: Array<{ date: string; type: string; description: string }>;
  stats: {
    paidReports: number;
    realtorOrderedReports: number;
    mortgageLeads: number;
    totalBuyerValue: number;
  };
  accentColor: string;
}

export default function RealtorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [orderForm, setOrderForm] = useState({
    reportType: "zip",
    cobranded: true, // Option A (cobranded, 20% off) is default; false = Option B (full price, DHL-only)
    address: "",
    buyerName: "",
    buyerEmail: "",
    attestation: false,
  });
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");

  const [introForm, setIntroForm] = useState({ buyerName: "", buyerEmail: "", buyerPhone: "", context: "" });
  const [introSubmitting, setIntroSubmitting] = useState(false);
  const [introSuccess, setIntroSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/realtor-dashboard")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function copyLink() {
    if (!data) return;
    navigator.clipboard.writeText(`https://intel.nofluffmarketing.io/r/${data.slug}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!orderForm.attestation) { setOrderError("Please confirm this is for an active buyer prospect."); return; }
    setOrderSubmitting(true); setOrderError("");
    try {
      const res = await fetch("/api/realtor-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...orderForm, realtorSlug: data?.slug }),
      });
      const result = await res.json();
      if (result.ok) setOrderSuccess(true);
      else setOrderError(result.error || "Something went wrong. Please try again.");
    } catch { setOrderError("Network error. Please try again."); }
    finally { setOrderSubmitting(false); }
  }

  async function submitIntro(e: React.FormEvent) {
    e.preventDefault();
    setIntroSubmitting(true);
    try {
      await fetch("/api/intro-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...introForm, realtorSlug: data?.slug }),
      });
      setIntroSuccess(true);
    } catch { } finally { setIntroSubmitting(false); }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-[#6b7280]">Loading your dashboard...</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-[#f0f0f5] mb-3">Access Your Dashboard</h1>
          <p className="text-[#9ca3af] mb-6">
            Your dashboard is accessed via the magic link sent to your email when you signed up. Check your inbox for your dashboard link.
          </p>
          <a href="/realtor" className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] font-semibold px-8 py-4 rounded-xl">
            Sign Up as Partner
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );

  const shareLink = `https://intel.nofluffmarketing.io/r/${data.slug}`;
  const freeReportRemaining = data.freeReportUsed ? 0 : 1;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 px-6 py-12">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#f0f0f5]">Partner Dashboard</h1>
              <p className="text-[#6b7280]">{data.name} · {data.brokerage}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]">
              USHI Partner
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Buyer Reports (via link)", value: data.stats.paidReports, icon: <BarChart3 size={18} className="text-[#00c2ff]" /> },
              { label: "Reports You Ordered", value: data.stats.realtorOrderedReports, icon: <Gift size={18} className="text-[#c9a227]" /> },
              { label: "Mortgage Leads Intro'd", value: data.stats.mortgageLeads, icon: <Users size={18} className="text-[#22c55e]" /> },
              { label: "Est. Buyer Value", value: `$${data.stats.totalBuyerValue.toLocaleString()}`, icon: <BarChart3 size={18} className="text-[#1a56db]" /> },
            ].map(s => (
              <div key={s.label} className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-[#6b7280] text-xs">{s.label}</span></div>
                <div className="text-2xl font-bold text-[#f0f0f5]">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* Share link */}
            <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
              <h3 className="text-[#f0f0f5] font-semibold mb-4">Your Share Link</h3>
              <div className="flex items-center gap-2 bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 mb-3">
                <span className="text-[#00c2ff] text-sm font-mono flex-1 truncate">{shareLink}</span>
                <button onClick={copyLink} className="text-[#6b7280] hover:text-[#f0f0f5] transition-colors shrink-0">
                  {copied ? <CheckCircle size={16} className="text-[#22c55e]" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-[#6b7280] text-xs">
                Share this link with buyers. Reports ordered through it are cobranded with your name and brokerage — and include DFW Homes &amp; Loans as the preferred mortgage partner.
              </p>
            </div>

            {/* Order a report at partner pricing */}
            <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
              <h3 className="text-[#f0f0f5] font-semibold mb-1">Order a Report for a Buyer</h3>

              {/* Free report counter */}
              <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg text-xs font-medium ${freeReportRemaining > 0 ? "bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]" : "bg-[#2a2a3a] text-[#6b7280]"}`}>
                <Gift size={13} />
                {freeReportRemaining > 0
                  ? "Welcome report available — your first report is on us, our thank-you for joining."
                  : "Welcome report used. Choose cobranded (20% off) or normal (full price) on each order."}
              </div>

              {/* Partner pricing — no tier, no subscription */}
              <div className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 px-4 py-2.5 border-b border-[#2a2a3a] items-center">
                  <div>
                    <p className="text-[#f0f0f5] text-xs font-medium">Zip-Level Report</p>
                    <p className="text-[#6b7280] text-xs">Neighborhood overview</p>
                  </div>
                  <p className="text-[#22c55e] text-base font-bold text-right">
                    {freeReportRemaining > 0 ? <span className="text-[#22c55e]">FREE</span> : <><span className="text-[#22c55e]">$77.60</span><span className="text-[#6b7280] text-xs ml-1">cobranded</span></>}
                  </p>
                </div>
                <div className="grid grid-cols-2 px-4 py-2.5 items-center">
                  <div>
                    <p className="text-[#f0f0f5] text-xs font-medium">Address-Specific Report</p>
                    <p className="text-[#6b7280] text-xs">Full property deep-dive</p>
                  </div>
                  <p className="text-[#22c55e] text-base font-bold text-right">
                    {freeReportRemaining > 0 ? <span className="text-[#22c55e]">FREE</span> : <><span className="text-[#22c55e]">$117.60</span><span className="text-[#6b7280] text-xs ml-1">cobranded</span></>}
                  </p>
                </div>
              </div>

              {orderSuccess ? (
                <div className="flex items-center gap-2 text-[#22c55e] text-sm">
                  <CheckCircle size={16} /><span>Order submitted. Report will be delivered within 1 hour.</span>
                </div>
              ) : (
                <form onSubmit={submitOrder} className="space-y-3">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Report Type</label>
                    <select
                      value={orderForm.reportType}
                      onChange={e => setOrderForm(f => ({ ...f, reportType: e.target.value }))}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                    >
                      <option value="zip">Zip-Level — {freeReportRemaining > 0 ? "FREE" : (orderForm.cobranded ? "$77.60" : "$97.00")}</option>
                      <option value="address">Address-Specific — {freeReportRemaining > 0 ? "FREE" : (orderForm.cobranded ? "$117.60" : "$147.00")}</option>
                    </select>
                  </div>
                  {!data.freeReportUsed ? null : (
                    <div>
                      <label className="block text-[#9ca3af] text-xs mb-1">Report Style</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setOrderForm(f => ({ ...f, cobranded: true }))}
                          className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition ${
                            orderForm.cobranded
                              ? "bg-[#22c55e]/10 border-[#22c55e]/50 text-[#22c55e]"
                              : "bg-[#0a0a0f] border-[#2a2a3a] text-[#6b7280] hover:border-[#22c55e]/30"
                          }`}
                        >
                          A — Cobranded (20% off)<br />
                          <span className="font-normal opacity-75">Your brand + DHL</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderForm(f => ({ ...f, cobranded: false }))}
                          className={`px-3 py-2.5 rounded-lg text-xs font-semibold border transition ${
                            !orderForm.cobranded
                              ? "bg-[#1a56db]/10 border-[#1a56db]/50 text-[#1a56db]"
                              : "bg-[#0a0a0f] border-[#2a2a3a] text-[#6b7280] hover:border-[#1a56db]/30"
                          }`}
                        >
                          B — Normal (full price)<br />
                          <span className="font-normal opacity-75">DHL-only, no realtor brand</span>
                        </button>
                      </div>
                      <p className="text-[#6b7280] text-xs mt-1">
                        {orderForm.cobranded
                          ? "Your name + DFW Homes & Loans on cover, every page, and mortgage partner section."
                          : "DHL-only template. Your name does not appear. Use for anonymous/behind-the-scenes referrals."}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">
                      {orderForm.reportType === "zip" ? "ZIP Code" : "Property Address"} *
                    </label>
                    <input
                      required
                      value={orderForm.address}
                      onChange={e => setOrderForm(f => ({ ...f, address: e.target.value }))}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder={orderForm.reportType === "zip" ? "75034" : "123 Main St, Frisco TX 75034"}
                    />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Buyer Name *</label>
                    <input
                      required
                      value={orderForm.buyerName}
                      onChange={e => setOrderForm(f => ({ ...f, buyerName: e.target.value }))}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="Buyer full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Buyer Email *</label>
                    <input
                      required
                      type="email"
                      value={orderForm.buyerEmail}
                      onChange={e => setOrderForm(f => ({ ...f, buyerEmail: e.target.value }))}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-3 py-2.5 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                      placeholder="buyer@email.com"
                    />
                  </div>
                  {/* Active-buyer attestation — required at every order */}
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderForm.attestation}
                      onChange={e => setOrderForm(f => ({ ...f, attestation: e.target.checked }))}
                      className="mt-0.5 shrink-0"
                    />
                    <span className="text-[#6b7280] text-xs">
                      I confirm this report is for an active buyer prospect I am currently working with.
                    </span>
                  </label>
                  {orderError && <p className="text-red-400 text-xs">{orderError}</p>}
                  <button
                    type="submit"
                    disabled={orderSubmitting}
                    className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity disabled:opacity-60"
                    style={{ background: "#22c55e" }}
                  >
                    {orderSubmitting ? "Submitting…" : "Order Report"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Activity feed */}
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6 mb-8">
            <h3 className="text-[#f0f0f5] font-semibold mb-4">Activity Feed</h3>
            {data.activityFeed.length === 0 ? (
              <p className="text-[#6b7280] text-sm">No activity yet. Share your link to get started.</p>
            ) : (
              <div className="space-y-3">
                {data.activityFeed.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#1a56db] mt-1.5 shrink-0" />
                    <div>
                      <span className="text-[#f0f0f5]">{a.description}</span>
                      <span className="text-[#4a4a5a] ml-2 text-xs">{a.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Intro a mortgage lead */}
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
            <h3 className="text-[#f0f0f5] font-semibold mb-2">Intro a Mortgage Lead to Tony Botchev</h3>
            <p className="text-[#6b7280] text-xs mb-4">
              Always available. RESPA-clean: no fees flow between us. Buyer decides who to use for their mortgage.
            </p>
            {introSuccess ? (
              <div className="flex items-center gap-3 text-[#22c55e]">
                <CheckCircle size={20} /><span className="text-sm">Lead intro sent to Tony&apos;s team. You&apos;ll receive a confirmation email shortly.</span>
              </div>
            ) : (
              <form onSubmit={submitIntro} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#9ca3af] text-xs mb-1">Buyer Name *</label>
                  <input required value={introForm.buyerName} onChange={e => setIntroForm(f => ({ ...f, buyerName: e.target.value }))}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                    placeholder="Buyer full name" />
                </div>
                <div>
                  <label className="block text-[#9ca3af] text-xs mb-1">Buyer Email *</label>
                  <input required type="email" value={introForm.buyerEmail} onChange={e => setIntroForm(f => ({ ...f, buyerEmail: e.target.value }))}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                    placeholder="buyer@email.com" />
                </div>
                <div>
                  <label className="block text-[#9ca3af] text-xs mb-1">Buyer Phone</label>
                  <input type="tel" value={introForm.buyerPhone} onChange={e => setIntroForm(f => ({ ...f, buyerPhone: e.target.value }))}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                    placeholder="(214) 555-0100" />
                </div>
                <div>
                  <label className="block text-[#9ca3af] text-xs mb-1">Context (optional)</label>
                  <input value={introForm.context} onChange={e => setIntroForm(f => ({ ...f, context: e.target.value }))}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]"
                    placeholder="Pre-approval needed, purchase price ~$450k" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={introSubmitting}
                    className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity disabled:opacity-60"
                    style={{ background: "#1a56db" }}>
                    {introSubmitting ? "Sending…" : "Send Intro to Tony"}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
