/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: Conventional Loans
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
    q: "What credit score do I need for a conventional loan in Texas?",
    a: "Most conventional loans require a minimum 620 credit score. For the best rates and to avoid higher PMI costs, a score of 740+ is ideal. Fannie Mae and Freddie Mac programs allow as low as 620 with compensating factors.",
  },
  {
    q: "What is the conventional loan limit in Collin County TX for 2026?",
    a: "The 2026 conforming loan limit for Collin County is $766,550 for a single-family home. Loans above this amount require jumbo financing.",
  },
  {
    q: "When does PMI go away on a conventional loan?",
    a: "PMI on a conventional loan is automatically removed when your loan balance reaches 78% of the original purchase price (based on the amortization schedule). You can also request removal at 80% LTV with a new appraisal showing sufficient equity.",
  },
  {
    q: "Can I put 3% down on a conventional loan?",
    a: "Yes — Fannie Mae's HomeReady and Freddie Mac's Home Possible programs allow 3% down for qualifying buyers. Standard conventional loans allow 5% down. PMI is required for all loans with less than 20% down.",
  },
  {
    q: "Is conventional or FHA better for a North DFW home purchase?",
    a: "For buyers with 700+ credit and 5%+ down, conventional is almost always better — lower total cost once you factor in FHA's lifetime MIP. For buyers with 580–699 credit or less than 5% down, FHA may be the better path. Tony Botchev will run both scenarios for you.",
  },
];

export default function ConventionalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: "Conventional Home Loan — DFW Homes & Loans",
      description: "Conventional mortgage loans in North DFW. 3–20% down, 620+ credit. Tony Botchev, NMLS #114198.",
      url: "https://www.dfwhome.loans/loans/conventional",
      provider: { "@type": "FinancialService", "@id": "https://www.dfwhome.loans/#business", name: "DFW Homes & Loans", telephone: "+19453004002", areaServed: "North Dallas-Fort Worth, Texas" }, broker: { "@type": "Person", "@id": "https://www.dfwhome.loans/#tony", name: "Tony Botchev", identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" } },
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
    title: "Conventional Loans in DFW | Financing Options",
    description: "Learn about conventional loans in DFW. DFW Homes & Loans helps you understand the benefits of standard financing so you can move into your new house with ease.",
    canonical: "https://www.dfwhome.loans/loans/conventional",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              CONVENTIONAL LOAN PROGRAM
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              CONVENTIONAL<br />
              <span className="text-[#C4521A]">LOANS IN DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Conventional loans are the most flexible mortgage option for buyers with good credit.
              Lower long-term costs than FHA, PMI that goes away, and loan limits up to $766,550 in
              Collin County.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center">
                Get Pre-Qualified Free →
              </Link>
              <a href="tel:+19453004002" className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
                <Phone size={16} /> (945) 300-4002
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-bebas text-2xl text-white mb-4">CONVENTIONAL LOAN AT A GLANCE</h2>
            <div className="space-y-3">
              {[
                ["Minimum Down Payment", "3% (HomeReady/Home Possible)"],
                ["Minimum Credit Score", "620"],
                ["Loan Limit (Collin County)", "$766,550"],
                ["PMI Required", "Yes, if <20% down"],
                ["PMI Removal", "At 80% LTV — not permanent"],
                ["Max DTI", "45–50% with compensating factors"],
                ["Property Types", "SFR, condos, 2–4 units, investment"],
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
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">CONVENTIONAL LOAN FAQ</h2>
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
          <h2 className="font-bebas text-4xl text-white mb-3">GET PRE-APPROVED TODAY</h2>
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
