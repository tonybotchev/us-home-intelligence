/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: Refinance
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
    q: "When does it make sense to refinance my mortgage in Texas?",
    a: "Refinancing typically makes sense when you can reduce your rate by 0.5–1%+ and plan to stay in the home long enough to recoup closing costs (usually 18–36 months). It also makes sense to remove PMI, shorten your loan term, or access equity via cash-out.",
  },
  {
    q: "What is a cash-out refinance and how much can I take out?",
    a: "A cash-out refinance replaces your existing mortgage with a larger loan, giving you the difference in cash. In Texas, you can typically cash out up to 80% of your home's appraised value (Texas has specific cash-out rules under Texas Section 50(a)(6)).",
  },
  {
    q: "How long does a refinance take in Texas?",
    a: "A standard refinance takes 21–45 days. Texas cash-out refinances have additional requirements including a mandatory 12-day waiting period after application, which extends the timeline slightly.",
  },
  {
    q: "What are typical refinance closing costs in North DFW?",
    a: "Refinance closing costs in Texas typically run 2–3% of the loan amount. On a $400,000 loan, expect $8,000–$12,000 in costs. Tony Botchev will provide a detailed Loan Estimate so you can calculate your break-even point.",
  },
  {
    q: "Can I refinance if I have a VA loan?",
    a: "Yes — the VA IRRRL (Interest Rate Reduction Refinance Loan) is a streamline refinance for existing VA loans. It requires minimal documentation, no appraisal in most cases, and no out-of-pocket costs if you roll the funding fee into the loan.",
  },
];

export default function RefinancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: "Mortgage Refinance — DFW Homes & Loans",
      description: "Mortgage refinance in North DFW TX. Rate-and-term, cash-out, VA IRRRL. Tony Botchev, NMLS #114198.",
      url: "https://www.dfwhome.loans/loans/refinance",
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
    title: "Refinance in North DFW | Lower Your Monthly Payment",
    description: "Save money or get cash back with a refinance in North DFW. DFW Homes & Loans helps you find better rates & terms to fit your current financial goals perfectly.",
    canonical: "https://www.dfwhome.loans/loans/refinance",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              REFINANCE PROGRAM
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              REFINANCE IN<br />
              <span className="text-[#C4521A]">NORTH DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Lower your rate, remove PMI, shorten your term, or access your equity. Tony Botchev
              will run the numbers and tell you honestly whether refinancing makes sense for your
              situation — and by how much.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center">
                Get a Refinance Quote →
              </Link>
              <a href="tel:+19453004002" className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
                <Phone size={16} /> (945) 300-4002
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-bebas text-2xl text-white mb-4">REFINANCE OPTIONS</h2>
            <div className="space-y-4">
              {[
                { name: "Rate-and-Term Refinance", desc: "Lower your rate or change your loan term. Most common refinance type." },
                { name: "Cash-Out Refinance", desc: "Access up to 80% of your home's equity. Texas 50(a)(6) rules apply." },
                { name: "VA IRRRL Streamline", desc: "Existing VA loan? Reduce your rate with minimal paperwork." },
                { name: "FHA Streamline", desc: "Existing FHA loan? Streamline to a lower rate without a full appraisal." },
                { name: "Remove PMI", desc: "Refinance to eliminate PMI once you've reached 20% equity." },
              ].map((p) => (
                <div key={p.name} className="border-b border-white/10 pb-3">
                  <div className="text-white font-semibold text-sm">{p.name}</div>
                  <div className="text-white/50 text-xs mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">REFINANCE FAQ</h2>
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
          <h2 className="font-bebas text-4xl text-white mb-3">SEE IF REFINANCING MAKES SENSE</h2>
          <p className="text-white/70 mb-6">Tony will run the numbers honestly. No hard credit pull to start.</p>
          <Link href="/apply" className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors">
            Get a Refinance Quote →
          </Link>
          <p className="text-white/40 text-xs mt-4">Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender</p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
