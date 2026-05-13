/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: Jumbo Loans
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";

const faqItems = [
  {
    q: "What is a jumbo loan in Texas?",
    a: "A jumbo loan is any mortgage that exceeds the conforming loan limit. In Collin County, the 2026 conforming limit is $766,550. Any loan above this amount requires jumbo financing with different underwriting standards.",
  },
  {
    q: "What credit score do I need for a jumbo loan?",
    a: "Most jumbo lenders require a minimum 700 credit score, with 720+ preferred for the best rates. Some programs allow 680 with a larger down payment and strong reserves.",
  },
  {
    q: "How much down payment is required for a jumbo loan in North DFW?",
    a: "Jumbo loans typically require 10–20% down. Some programs allow 10% down up to $1.5M with strong credit and reserves. Loans above $2M generally require 20–30% down.",
  },
  {
    q: "Are jumbo loan rates higher than conventional rates?",
    a: "Historically jumbo rates were higher, but in recent years jumbo rates have often been comparable to or even lower than conforming rates for well-qualified borrowers. Tony Botchev shops multiple jumbo lenders to find the best rate for your profile.",
  },
];

export default function JumboPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: "Jumbo Home Loans — DFW Homes & Loans",
      description: "Jumbo mortgage loans up to $3M+ in North DFW. Tony Botchev, NMLS #114198.",
      url: "https://www.dfwhome.loans/loans/jumbo",
      provider: { "@type": "FinancialService", "@id": "https://www.dfwhome.loans/#business", name: "DFW Homes & Loans", telephone: "+19452945020", areaServed: "North Dallas-Fort Worth, Texas" }, broker: { "@type": "Person", "@id": "https://www.dfwhome.loans/#tony", name: "Tony Botchev", identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  useSEO({
    title: "Jumbo Loans in North DFW | Financing for Luxury Homes",
    description: "Need a larger loan for a luxury property? DFW Homes & Loans offers jumbo loans in North DFW with competitive rates for high-value homes and larger mortgages.",
    canonical: "https://www.dfwhome.loans/loans/jumbo",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              JUMBO LOAN PROGRAM
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              JUMBO LOANS IN<br />
              <span className="text-[#C4521A]">NORTH DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Financing luxury homes above $766,550 in Celina, Prosper, Frisco, and McKinney.
              Loan amounts up to $3M+. Competitive rates. No compromises on the home you want.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center">
                Get Pre-Qualified Free →
              </Link>
              <a href="tel:+19452945020" className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
                <Phone size={16} /> (945) 294-5020
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-bebas text-2xl text-white mb-4">JUMBO LOAN AT A GLANCE</h2>
            <div className="space-y-3">
              {[
                ["Loan Minimum", "$766,551 (above conforming limit)"],
                ["Loan Maximum", "Up to $3M+"],
                ["Down Payment", "10–20%"],
                ["Minimum Credit Score", "700+"],
                ["Reserves Required", "12–24 months PITI"],
                ["Max DTI", "43–45%"],
                ["Property Types", "Primary, second home, investment"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-white/60">{label}</span>
                  <span className="text-white font-medium text-right max-w-[55%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">JUMBO LOAN FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
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

      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">FINANCE YOUR LUXURY HOME</h2>
          <p className="text-white/70 mb-6">No hard credit pull to start. Pre-approval in 24 hours.</p>
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
