/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: DSCR Loans for Investors
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
    q: "What is a DSCR loan?",
    a: "A DSCR (Debt Service Coverage Ratio) loan qualifies the borrower based on the rental income of the property rather than personal income or tax returns. If the property's rent covers the mortgage payment, you can qualify — regardless of your W-2 income or self-employment status.",
  },
  {
    q: "What DSCR ratio do I need to qualify?",
    a: "Most lenders require a minimum DSCR of 1.0 (rent = mortgage payment) to 1.25 (rent is 25% more than the payment). Some programs allow DSCR below 1.0 with a larger down payment. Tony Botchev works with multiple DSCR lenders to find the best fit.",
  },
  {
    q: "How much down payment is required for a DSCR loan in Texas?",
    a: "DSCR loans typically require 20–25% down for single-family investment properties. Multi-unit properties may require 25–30% down. Some programs allow 15% down with a higher rate.",
  },
  {
    q: "Can I use a DSCR loan for short-term rentals (Airbnb) in North DFW?",
    a: "Yes — many DSCR lenders accept short-term rental income using AirDNA market data or a 12-month rental history. North DFW markets like Celina, Frisco, and McKinney have strong short-term rental demand near the PGA Frisco and Toyota Stadium.",
  },
  {
    q: "Is there a limit on how many DSCR loans I can have?",
    a: "Unlike conventional investment loans (which cap at 10 financed properties), DSCR loans have no such limit. Experienced investors can build large portfolios using DSCR financing.",
  },
];

export default function DSCRPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: "DSCR Investment Loans — DFW Homes & Loans",
      description: "DSCR loans for real estate investors in North DFW. No tax returns required. Tony Botchev, NMLS #114198.",
      url: "https://www.dfwhome.loans/loans/dscr",
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
    title: "DSCR Loans in North DFW | Real Estate Investor Loans",
    description: "Grow your rental portfolio with DSCR loans in North DFW. DFW Homes & Loans makes it easy for investors to qualify based on income rather than personal pay.",
    canonical: "https://www.dfwhome.loans/loans/dscr",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              INVESTOR LOAN PROGRAM
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              DSCR LOANS IN<br />
              <span className="text-[#C4521A]">NORTH DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              No W-2s. No tax returns. No income verification. DSCR loans qualify based on the
              rental income of the property — the ideal financing tool for real estate investors
              building portfolios in North DFW's high-growth markets.
            </p>
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
            <h2 className="font-bebas text-2xl text-white mb-4">DSCR LOAN AT A GLANCE</h2>
            <div className="space-y-3">
              {[
                ["Income Verification", "None — property income only"],
                ["Minimum DSCR", "1.0 (some programs lower)"],
                ["Down Payment", "20–25%"],
                ["Minimum Credit Score", "640+"],
                ["Property Types", "SFR, 2–4 units, STR, condos"],
                ["Max Loan Amount", "Up to $3M+"],
                ["Portfolio Limit", "Unlimited"],
                ["Closing Timeline", "21–30 days"],
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
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">DSCR LOAN FAQ</h2>
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
          <h2 className="font-bebas text-4xl text-white mb-3">START YOUR INVESTMENT PORTFOLIO</h2>
          <p className="text-white/70 mb-6">No tax returns needed. Pre-approval in 24 hours.</p>
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
