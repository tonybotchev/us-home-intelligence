/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: VA Loans
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Shield } from "lucide-react";

const faqItems = [
  {
    q: "Who qualifies for a VA loan in Texas?",
    a: "VA loans are available to active duty service members, veterans with honorable discharge, National Guard and Reserve members with qualifying service, and surviving spouses of veterans who died in service or from a service-connected disability.",
  },
  {
    q: "Is there a VA loan limit in Texas in 2026?",
    a: "Veterans with full VA entitlement have no loan limit — you can borrow as much as a lender will approve with no down payment. Veterans with reduced entitlement (due to an existing VA loan) may have limits based on the county conforming loan limit.",
  },
  {
    q: "What is the VA funding fee in 2026?",
    a: "The VA funding fee for first-time use with 0% down is 2.15% of the loan amount. For subsequent use it's 3.3%. Veterans with a service-connected disability rating of 10% or more are exempt from the funding fee entirely.",
  },
  {
    q: "Can I use a VA loan for new construction in North DFW?",
    a: "Yes — VA loans can be used for new construction in Celina, Prosper, Frisco, and other North DFW communities. The process involves VA appraisals during construction. Tony Botchev has experience navigating VA new construction loans with major DFW builders.",
  },
  {
    q: "How long does VA loan approval take?",
    a: "With complete documentation, VA pre-approval typically takes 24–48 hours. Full VA loan closing takes 30–45 days on average, slightly longer than conventional due to the VA appraisal requirement.",
  },
];

export default function VAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: "VA Home Loan — DFW Homes & Loans",
      description: "VA mortgage loans for veterans and active duty in North DFW. 0% down, no PMI. Tony Botchev, NMLS #114198.",
      url: "https://www.dfwhome.loans/loans/va",
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
    title: "VA Loans in North DFW | $0 Down for Veterans & Service",
    description: "We proudly offer VA loans in North DFW. DFW Homes & Loans helps veterans and active military members buy homes with no down payment and great interest rates.",
    canonical: "https://www.dfwhome.loans/loans/va",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Shield size={12} /> VA LOAN PROGRAM
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              VA LOANS IN<br />
              <span className="text-[#C4521A]">NORTH DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              You served. Now let your VA benefit work for you. VA loans offer 0% down, no private
              mortgage insurance, and competitive rates — the most powerful home loan benefit
              available to veterans and active duty service members.
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
            <h2 className="font-bebas text-2xl text-white mb-4">VA LOAN AT A GLANCE</h2>
            <div className="space-y-3">
              {[
                ["Down Payment", "0% — no down payment required"],
                ["Private Mortgage Insurance", "None — ever"],
                ["Loan Limit", "No limit with full entitlement"],
                ["Minimum Credit Score", "580+ (lender overlay)"],
                ["Funding Fee (first use)", "2.15% (waived for 10%+ disability)"],
                ["Max DTI", "Up to 60% with residual income"],
                ["New Construction", "Yes — all major DFW builders"],
                ["Streamline Refinance", "VA IRRRL available"],
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

      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-4">VA LOAN BENEFITS</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Zero Down Payment", desc: "Buy a home in Celina or Prosper with no money down. Keep your savings for moving costs, furniture, or reserves." },
            { title: "No PMI Ever", desc: "Conventional loans require PMI until you reach 20% equity. VA loans never require private mortgage insurance — saving $100–$300/month." },
            { title: "Competitive Rates", desc: "VA loans typically carry rates 0.25–0.5% lower than conventional loans due to the government guarantee." },
            { title: "Flexible Credit", desc: "VA guidelines are more forgiving of past credit issues than conventional programs. Bankruptcy and foreclosure waiting periods are shorter." },
            { title: "Assumable Loan", desc: "VA loans can be assumed by a future buyer — a significant selling advantage when rates are higher." },
            { title: "No Prepayment Penalty", desc: "Pay off your VA loan early with no penalties. Refinance whenever it makes financial sense." },
          ].map((b) => (
            <div key={b.title} className="border border-gray-200 p-5">
              <h3 className="font-bebas text-xl text-[#1B2B1A] mb-2">{b.title}</h3>
              <p className="text-sm text-[#4A5568]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">VA LOAN FAQ</h2>
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
          <h2 className="font-bebas text-4xl text-white mb-3">USE YOUR VA BENEFIT TODAY</h2>
          <p className="text-white/70 mb-6">No hard credit pull to start. Pre-approval in 24 hours. Tony Botchev honors your service.</p>
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
