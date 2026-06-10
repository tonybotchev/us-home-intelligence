"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Building2 } from "lucide-react";

export default function BrokeragePage() {
  const [form, setForm] = useState({brokerageName:"",stateLicense:"",officeAddress:"",opsEmail:"",agentCount:"",brokerOwner:""});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const set = (k:string) => (e:React.ChangeEvent<HTMLInputElement>) => setForm(f=>({...f,[k]:e.target.value}));

  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault(); setSubmitting(true);
    try {
      await fetch("/api/brokerage-signup", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      setSubmitted(true);
    } catch {} finally { setSubmitting(false); }
  }

  if (submitted) return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-[#12121a] border border-[#22c55e]/30 rounded-2xl p-10 text-center">
          <CheckCircle size={56} className="text-[#22c55e] mx-auto mb-6"/>
          <h2 className="text-2xl font-bold text-[#f0f0f5] mb-3">Brokerage Application Received</h2>
          <p className="text-[#9ca3af]">We will review your application and reach out within 1 business day to set up your brokerage partner account and shared comp pool.</p>
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
            <div className="mb-4"><span className="text-xs font-semibold text-[#c9a227] uppercase tracking-wider bg-[#c9a227]/10 px-3 py-1 rounded-full">Brokerage Tier</span></div>
            <h1 className="text-3xl font-bold text-[#f0f0f5] mt-4 mb-2">Brokerage Partner Program</h1>
            <p className="text-[#9ca3af] mb-4">Deploy USHI across your entire agent roster. Brokerage accounts get a shared comp pool (agents × 3 initial credits after first deal), a broker dashboard, and dual-cobrand reports showing both brokerage logo and individual agent cobrand.</p>
            <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-5 mb-8">
              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-[#c9a227] mt-0.5 shrink-0"/>
                <div>
                  <p className="text-[#f0f0f5] font-semibold text-sm mb-1">How brokerage comp pools work</p>
                  <p className="text-[#6b7280] text-xs">Your brokerage gets a shared pool of comp credits (number of agents × 3) after your first deal. Broker invites agents via dashboard. Each agent fills their personal cobrand profile. Reports cobrand with BOTH brokerage logo and agent personal cobrand.</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-6">
                <h3 className="text-[#f0f0f5] font-semibold mb-4">Brokerage Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Brokerage Name *</label>
                    <input required value={form.brokerageName} onChange={set("brokerageName")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Keller Williams Frisco" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">State License # *</label>
                    <input required value={form.stateLicense} onChange={set("stateLicense")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="TX TREC Broker #" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Estimated Agent Count *</label>
                    <input required type="number" min="1" value={form.agentCount} onChange={set("agentCount")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="25" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Broker-Owner Name *</label>
                    <input required value={form.brokerOwner} onChange={set("brokerOwner")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-[#9ca3af] text-xs mb-1">Ops Contact Email *</label>
                    <input required type="email" value={form.opsEmail} onChange={set("opsEmail")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="ops@brokerage.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#9ca3af] text-xs mb-1">Office Address *</label>
                    <input required value={form.officeAddress} onChange={set("officeAddress")} className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-lg px-4 py-3 text-[#f0f0f5] text-sm focus:outline-none focus:border-[#1a56db]" placeholder="1234 Main St, Frisco, TX 75034" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-[#c9a227] hover:bg-[#a07d1a] text-black font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? "Submitting..." : <><span>Submit Brokerage Application</span><ArrowRight size={18}/></>}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
