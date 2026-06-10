"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Upload } from "lucide-react";

type FormState = {
  firstName: string; lastName: string; email: string; phone: string;
  brokerage: string; title: string; licenseNumber: string; licenseType: string;
  tagline: string; accentColor: string; slugPreference: string;
};

export default function RealtorSignup() {
  const [form, setForm] = useState<FormState>({
    firstName:"", lastName:"", email:"", phone:"",
    brokerage:"", title:"Realtor", licenseNumber:"", licenseType:"TREC",
    tagline:"", accentColor:"#1a56db", slugPreference:"",
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
          <p className="text-[#9ca3af] mb-6">Your partner account is active. Check your email for your welcome kit and sample report.</p>
          <div className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl p-4 mb-6">
            <p className="text-[#6b7280] text-xs mb-2">Your share link:</p>
            <p className="text-[#00c2ff] font-mono text-sm break-all">{shareLink}</p>
          </div>
          <div className="bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-xl p-4 text-left text-sm text-[#9ca3af]">
            <p className="font-semibold text-[#f0f0f5] mb-2">How comp credits work:</p>
            <p>Your share link works today — buyers who come through it pay $147 direct. You unlock 3 cobranded comp reports for your future active buyer prospects after your first deal lands (a paid buyer report OR a mortgage lead intro to Tony Botchev NMLS #114198). After that, +1 comp credit per subsequent paid deal. Soft cap at 10 credits held.</p>
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
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider bg-[#22c55e]/10 px-3 py-1 rounded-full">Free Partner Signup</span>
            </div>
            <h1 className="text-3xl font-bold text-[#f0f0f5] mt-4 mb-2">Become a USHI Realtor Partner</h1>
            <p className="text-[#9ca3af] mb-8">Free to join. No credit card. Get your personal share link and start delivering investment-grade reports to your buyers — cobranded with your name and brokerage.</p>

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

              {error && <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{error}</div>}

              <button type="submit" disabled={submitting} className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? "Creating your partner account..." : <><span>Create Free Partner Account</span><ArrowRight size={18}/></>}
              </button>
              <p className="text-[#4a4a5a] text-xs text-center">No credit card required. By signing up you agree to our Terms of Service and Privacy Policy.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
