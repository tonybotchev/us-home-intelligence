"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Copy, CheckCircle, ArrowRight, Gift, Users, BarChart3 } from "lucide-react";

interface DashboardData {
  name: string; email: string; brokerage: string; slug: string;
  compCredits: number; compHistory: Array<{date:string;buyer:string;address:string}>;
  activityFeed: Array<{date:string;type:string;description:string}>;
  stats: {paidReports:number;compReports:number;mortgageLeads:number;totalBuyerValue:number};
  accentColor: string;
}

export default function RealtorDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [introForm, setIntroForm] = useState({buyerName:"",buyerEmail:"",buyerPhone:"",context:""});
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

  async function submitIntro(e: React.FormEvent) {
    e.preventDefault();
    setIntroSubmitting(true);
    try {
      await fetch("/api/intro-lead", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({...introForm, realtorSlug: data?.slug}),
      });
      setIntroSuccess(true);
    } catch {} finally { setIntroSubmitting(false); }
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
          <p className="text-[#9ca3af] mb-6">Your dashboard is accessed via the magic link sent to your email when you signed up. Check your inbox for your dashboard link.</p>
          <a href="/realtor" className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] font-semibold px-8 py-4 rounded-xl">Sign Up as Partner</a>
        </div>
      </main>
      <Footer />
    </div>
  );

  const shareLink = `https://intel.nofluffmarketing.io/r/${data.slug}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#f0f0f5]">Partner Dashboard</h1>
            <p className="text-[#6b7280]">{data.name} · {data.brokerage}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {label:"Paid Reports",value:data.stats.paidReports,icon:<BarChart3 size={18} className="text-[#00c2ff]"/>},
              {label:"Comp Reports Used",value:data.stats.compReports,icon:<Gift size={18} className="text-[#c9a227]"/>},
              {label:"Mortgage Leads Intro'd",value:data.stats.mortgageLeads,icon:<Users size={18} className="text-[#22c55e]"/>},
              {label:"Est. Buyer Value",value:`$${data.stats.totalBuyerValue.toLocaleString()}`,icon:<BarChart3 size={18} className="text-[#1a56db]"/>},
            ].map(s=>(
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
                  {copied ? <CheckCircle size={16} className="text-[#22c55e]"/> : <Copy size={16}/>}
                </button>
              </div>
              <p className="text-[#6b7280] text-xs">Share this link with buyers. Reports ordered through it are cobranded with your info.</p>
            </div>

            {/* Comp credits */}
            <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
              <h3 className="text-[#f0f0f5] font-semibold mb-2">Comp Credits</h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-[#c9a227]">{data.compCredits}</span>
                <span className="text-[#6b7280] text-sm">available</span>
              </div>
              <p className="text-[#6b7280] text-xs mb-4">Earn credits: 3 credits after your first paid deal, +1 per subsequent deal. Soft cap: 10.</p>
              {data.compHistory.length > 0 && (
                <div className="space-y-2">
                  {data.compHistory.slice(0,3).map((h,i)=>(
                    <div key={i} className="flex items-center justify-between text-xs text-[#6b7280]">
                      <span>{h.buyer} — {h.address}</span>
                      <span>{h.date}</span>
                    </div>
                  ))}
                </div>
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
                {data.activityFeed.map((a,i)=>(
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
            <p className="text-[#6b7280] text-xs mb-4">Always available — no comp credits required. Earns you +1 comp credit. RESPA-clean: no fees flow between us. Buyer decides who to use.</p>
            {introSuccess ? (
              <div className="flex items-center gap-3 text-[#22c55e]">
                <CheckCircle size={20}/><span className="text-sm">Lead intro sent. +1 comp credit added to your account.</span>
              </div>
            ) : (
              <form onSubmit={submitIntro} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Buyer Name *</label>
                    <input required value={introForm.buyerName} onChange={e=>setIntroForm(f=>({...f,buyerName:e.target.value}))} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Alex Johnson" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Buyer Email *</label>
                    <input required type="email" value={introForm.buyerEmail} onChange={e=>setIntroForm(f=>({...f,buyerEmail:e.target.value}))} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="alex@email.com" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Buyer Phone <span className="text-[#4a4a5a]">(optional)</span></label>
                    <input type="tel" value={introForm.buyerPhone} onChange={e=>setIntroForm(f=>({...f,buyerPhone:e.target.value}))} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="(214) 555-0100" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Property / Scenario Context</label>
                    <input value={introForm.context} onChange={e=>setIntroForm(f=>({...f,context:e.target.value}))} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Looking at $450K in Frisco, needs pre-approval" />
                  </div>
                </div>
                <button type="submit" disabled={introSubmitting} className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1040b0] text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 text-sm">
                  {introSubmitting ? "Sending..." : <><span>Send Lead Intro</span><ArrowRight size={16}/></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
