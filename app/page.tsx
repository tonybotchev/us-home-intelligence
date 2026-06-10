import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Clock, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 30% 50%, rgba(26,86,219,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(0,194,255,0.08) 0%, transparent 60%)"}} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00c2ff] animate-pulse" />
            <span className="text-[#00c2ff] text-xs font-medium tracking-wider uppercase">US Home Intelligence Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-[#f0f0f5]">Investment-grade</span><br />
            <span style={{background:"linear-gradient(135deg,#00c2ff 0%,#1a56db 50%,#c9a227 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>neighborhood intelligence.</span><br />
            <span className="text-[#f0f0f5]">Any US address.</span>
          </h1>
          <p className="text-[#9ca3af] text-xl max-w-2xl mx-auto mb-4">Delivered in under an hour.</p>
          <p className="text-[#6b7280] text-base max-w-3xl mx-auto mb-10">9,000-word deep-dive reports covering schools, crime trends, flood risk, market velocity, demographic composition, and a forward investment thesis — for any residential address in the United States.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/realtor" className="inline-flex items-center gap-2 bg-[#1c1c28] hover:bg-[#2a2a3a] border border-[#2a2a3a] text-[#f0f0f5] font-semibold px-8 py-4 rounded-xl transition-all">
              I&apos;m a Realtor — Sign Up Free <ArrowRight size={18} />
            </Link>
            <Link href="/buy" className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1040b0] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg">
              I&apos;m a Buyer — Order a Report <ArrowRight size={18} />
            </Link>
          </div>
          <p className="text-[#4a4a5a] text-xs mt-6">Produced exclusively by NoFluff Marketing LLC · Frisco, TX · NMLS #114198</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#12121a] border-y border-[#2a2a3a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#f0f0f5] mb-3">What&apos;s Inside Every USHI Report</h2>
            <p className="text-[#6b7280]">11 chapters. 9,000+ words. Every data layer that matters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {icon:"📚",title:"School District Analysis",desc:"Performance ratings, district boundaries, enrollment trends"},
              {icon:"🔒",title:"Crime Trend Analysis",desc:"5-year trend data, incident categories, neighborhood safety context"},
              {icon:"🌊",title:"Flood & Environmental Risk",desc:"FEMA flood zones, wildfire risk, environmental hazard overlays"},
              {icon:"📈",title:"Market Velocity & Pricing",desc:"Days on market, price trajectory, absorption rate, comp analysis"},
              {icon:"👥",title:"Demographic Composition",desc:"Fair Housing compliant demographic context and community profile"},
              {icon:"🚶",title:"Walkability & Amenities",desc:"Transit access, grocery, healthcare, restaurant proximity scores"},
              {icon:"🏘️",title:"HOA Landscape",desc:"HOA presence, estimated fees, restriction overview"},
              {icon:"💡",title:"Investment Thesis",desc:"Forward-looking analysis: hold, buy, or caution indicators"},
              {icon:"🏠",title:"Property-Level Data",desc:"AVM estimate, parcel data, zoning (address-specific tier only)"},
              {icon:"📋",title:"Comparable Sales",desc:"Recent sold comps, price per sq ft, market position"},
              {icon:"⚖️",title:"Fair Housing Disclosure",desc:"Compliant language on all demographic and schools chapters"},
            ].map((item) => (
              <div key={item.title} className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl p-4 flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-[#f0f0f5] font-semibold text-sm">{item.title}</div>
                  <div className="text-[#6b7280] text-xs mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#f0f0f5] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[#6b7280] mb-12">No subscription. No hidden fees. Pay per report.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glow bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#f0f0f5] mb-2">$97</div>
              <div className="text-[#00c2ff] font-semibold mb-4">Zip-Level Report</div>
              <ul className="space-y-2 text-sm text-[#9ca3af] text-left mb-8">
                {["Zip code market overview","School district summary","Crime trend overview","Market velocity data","Demographic context","Investment outlook"].map(f=>(
                  <li key={f} className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]"/>{f}</li>
                ))}
              </ul>
              <Link href="/buy" className="block w-full text-center bg-[#1c1c28] hover:bg-[#2a2a3a] border border-[#2a2a3a] text-[#f0f0f5] font-semibold py-3 rounded-xl transition-colors">Order Zip Report</Link>
            </div>
            <div className="card-glow bg-[#12121a] border-2 border-[#1a56db] rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a56db] text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</div>
              <div className="text-4xl font-bold text-[#f0f0f5] mb-2">$147</div>
              <div className="text-[#00c2ff] font-semibold mb-4">Address-Specific Report</div>
              <ul className="space-y-2 text-sm text-[#9ca3af] text-left mb-8">
                {["Everything in Zip-Level","Parcel-level property data","AVM estimate","Property-specific risk overlays","Comparable sales analysis","Full 11-chapter deep-dive"].map(f=>(
                  <li key={f} className="flex items-center gap-2"><CheckCircle size={14} className="text-[#22c55e]"/>{f}</li>
                ))}
              </ul>
              <Link href="/buy" className="block w-full text-center bg-[#1a56db] hover:bg-[#1040b0] text-white font-semibold py-3 rounded-xl transition-colors">Order Address Report</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#12121a] border-y border-[#2a2a3a]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider bg-[#22c55e]/10 px-3 py-1 rounded-full">For Realtors</span>
              <h2 className="text-3xl font-bold text-[#f0f0f5] mt-4 mb-4">Your brand. Our intelligence.</h2>
              <p className="text-[#9ca3af] leading-relaxed mb-6">Become a USHI partner and get a personal share link. Every buyer who orders through your link gets a report co-branded with your name, headshot, and brokerage. Free to join. No credit card required.</p>
              <div className="space-y-3 mb-8">
                {["Free partner signup — no credit card","Personal share link: intel.nofluffmarketing.io/r/your-name","Cobranded reports with your headshot and brokerage","Earn comp credits for active buyer prospects","RESPA-clean — no referral fees, buyer chooses their lender"].map(f=>(
                  <div key={f} className="flex items-start gap-2 text-sm text-[#9ca3af]"><CheckCircle size={14} className="text-[#22c55e] mt-0.5 shrink-0"/>{f}</div>
                ))}
              </div>
              <Link href="/realtor" className="inline-flex items-center gap-2 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 border border-[#22c55e]/30 text-[#22c55e] font-semibold px-8 py-4 rounded-xl transition-colors">
                Sign Up Free <ArrowRight size={18} />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                {icon:<Clock size={20} className="text-[#00c2ff]"/>,title:"Under 1 Hour",desc:"Reports delivered fast — your buyer doesn't wait days."},
                {icon:<Shield size={20} className="text-[#22c55e]"/>,title:"RESPA Clean",desc:"No fees between you and us for mortgage referrals. Buyer decides."},
                {icon:<BarChart3 size={20} className="text-[#c9a227]"/>,title:"Investment Grade",desc:"The same data depth institutional buyers use — for every client."},
              ].map(item=>(
                <div key={item.title} className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#12121a] border border-[#2a2a3a] flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-[#f0f0f5] font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-[#6b7280] text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
