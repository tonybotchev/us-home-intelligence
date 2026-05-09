/**
 * DESIGN SYSTEM: Kinetic Texas
 * Shared city page template — used by all /cities/* pages
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, MapPin } from "lucide-react";

export interface CityPageData {
  city: string;
  state: string;
  county: string;
  slug: string;
  tagline: string;
  intro: string;
  highlights: { label: string; value: string }[];
  loanTypes: { name: string; desc: string; href: string }[];
  faqs: { q: string; a: string }[];
  nearbyLinks: { city: string; href: string }[];
}

export default function CityPageTemplate({ data }: { data: CityPageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <MapPin size={12} /> {data.county.toUpperCase()} COUNTY, TX
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              HOME LOANS IN<br />
              <span className="text-[#C4521A]">{data.city.toUpperCase()}, TX</span>
            </h1>
            <p className="text-white/70 text-lg mb-2 font-semibold">{data.tagline}</p>
            <p className="text-white/60 mb-6">{data.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center">
                Get Pre-Qualified Free →
              </Link>
              <a href="tel:+19453708656" className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
                <Phone size={16} /> (945) 370-8656
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-bebas text-2xl text-white mb-4">{data.city.toUpperCase()} AT A GLANCE</h2>
            <div className="space-y-3">
              {data.highlights.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-white/60">{label}</span>
                  <span className="text-white font-medium text-right max-w-[55%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-2">LOAN OPTIONS IN {data.city.toUpperCase()}</h2>
        <p className="text-[#4A5568] mb-8">Tony Botchev offers every loan type available to {data.city} buyers and homeowners.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {data.loanTypes.map((lt) => (
            <Link key={lt.name} href={lt.href} className="border border-gray-200 p-5 hover:border-[#C4521A] hover:shadow-sm transition-all group">
              <h3 className="font-bebas text-xl text-[#1B2B1A] group-hover:text-[#C4521A] transition-colors mb-2">{lt.name}</h3>
              <p className="text-sm text-[#4A5568]">{lt.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">HOME LOAN FAQ — {data.city.toUpperCase()}</h2>
          <div className="space-y-3">
            {data.faqs.map((item, i) => (
              <div key={i} className="border border-gray-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-[#1B2B1A] hover:bg-gray-50 transition-colors">
                  <span>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="shrink-0 text-[#C4521A]" /> : <ChevronDown size={18} className="shrink-0 text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-[#4A5568] text-sm leading-relaxed border-t border-gray-100">
                    <p className="pt-3">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {data.nearbyLinks.length > 0 && (
        <section className="py-12 max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-2xl text-[#1B2B1A] mb-4">ALSO SERVING NEARBY COMMUNITIES</h2>
          <div className="flex flex-wrap gap-3">
            {data.nearbyLinks.map((n) => (
              <Link key={n.city} href={n.href} className="border border-gray-300 px-4 py-2 text-sm text-[#1B2B1A] hover:border-[#C4521A] hover:text-[#C4521A] transition-colors">
                {n.city}, TX
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">READY TO BUY IN {data.city.toUpperCase()}?</h2>
          <p className="text-white/70 mb-6">No hard credit pull to start. Pre-approval in 24 hours. Tony Botchev knows {data.city}.</p>
          <Link href="/apply" className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors">
            Get Pre-Qualified Free →
          </Link>
          <p className="text-white/40 text-xs mt-4">Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender</p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
