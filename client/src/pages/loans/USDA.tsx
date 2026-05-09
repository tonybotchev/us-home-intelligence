/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: USDA Loans — Zero down for rural/suburban eligible areas
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, CheckCircle } from "lucide-react";

const faqItems = [
  {
    q: "What areas in North DFW qualify for USDA loans?",
    a: "USDA eligibility is based on property location and population density. In North DFW, parts of Gunter, Aubrey, Anna, Melissa, and other outer-ring communities may qualify. Eligibility changes periodically — Tony Botchev can run a property address check to confirm USDA eligibility before you make an offer.",
  },
  {
    q: "What is the income limit for a USDA loan in Texas?",
    a: "USDA income limits vary by county and household size. For most North DFW counties in 2026, the limit for a 1–4 person household is approximately $110,650, and $146,050 for a 5–8 person household. Limits are adjusted annually and vary by specific county.",
  },
  {
    q: "Do USDA loans have mortgage insurance?",
    a: "Yes — USDA loans have two fees: an upfront guarantee fee of 1% of the loan amount (typically rolled into the loan) and an annual fee of 0.35% of the outstanding loan balance. This is significantly lower than FHA mortgage insurance, making USDA one of the most affordable zero-down options available.",
  },
  {
    q: "Can I use a USDA loan to buy a new construction home?",
    a: "Yes — USDA loans can be used for new construction in eligible areas. The process involves additional steps including USDA appraisal requirements. Tony Botchev has experience navigating USDA new construction loans in North DFW.",
  },
  {
    q: "What credit score do I need for a USDA loan?",
    a: "Most USDA lenders require a minimum 640 credit score for streamlined processing. Scores below 640 may still qualify but require manual underwriting with additional documentation. Tony Botchev can review your credit profile and identify the best path forward.",
  },
  {
    q: "How is USDA different from FHA?",
    a: "Both are government-backed loans with low down payment requirements, but USDA offers 0% down (vs. FHA's 3.5%) and lower mortgage insurance costs. The key difference is that USDA has geographic and income restrictions — not all properties or buyers qualify. FHA has no geographic restrictions.",
  },
];

export default function USDAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "@id": "https://www.dfwhome.loans/loans/usda#product",
      name: "USDA Home Loan — DFW Homes & Loans",
      description:
        "USDA mortgage loans for home buyers in eligible North DFW areas. Zero down payment for qualifying buyers. Tony Botchev, NMLS #114198, sponsored by Loan Factory, Inc. NMLS #320841.",
      url: "https://www.dfwhome.loans/loans/usda",
      provider: {
        "@type": "FinancialService",
        "@id": "https://www.dfwhome.loans/#business",
        name: "DFW Homes & Loans",
        telephone: "+19452945020",
        areaServed: "North Dallas-Fort Worth, Texas",
      },
      broker: {
        "@type": "Person",
        "@id": "https://www.dfwhome.loans/#tony",
        name: "Tony Botchev",
        identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" },
      },
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
    title: "USDA Loans in North DFW | No Money Down Rural Loans",
    description:
      "Buy a home in a rural area with zero money down. DFW Homes & Loans offers USDA loans in North DFW for eligible buyers looking for peace & quiet in the country.",
    canonical: "https://www.dfwhome.loans/loans/usda",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1B2B1A] pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="inline-block bg-[#C4521A]/20 text-[#C4521A] text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
            USDA Loans
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-white mb-4 leading-none">
            ZERO DOWN.<br />RURAL ELIGIBLE.<br />NORTH DFW.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8">
            USDA loans offer 100% financing for buyers purchasing in eligible rural and suburban areas.
            No down payment, lower mortgage insurance than FHA, and competitive rates.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/apply" className="bg-[#C4521A] text-white px-8 py-4 font-semibold hover:bg-[#A8431A] transition-colors">
              Check Your Eligibility →
            </Link>
            <a href="tel:+19453708656" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone size={18} /> (945) 370-8656
            </a>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-8">WHY USDA?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Zero Down Payment", desc: "100% financing for eligible properties — no down payment required. One of the only true zero-down loan programs available to non-military buyers." },
            { title: "Low Mortgage Insurance", desc: "USDA annual fee is 0.35% — significantly lower than FHA's 0.55%. On a $350,000 loan, that's roughly $100/month vs. $160/month." },
            { title: "Competitive Rates", desc: "USDA loans are government-backed, which typically results in rates comparable to conventional loans and better than many non-conforming options." },
          ].map((b) => (
            <div key={b.title} className="border border-gray-200 p-6">
              <CheckCircle size={24} className="text-[#C4521A] mb-3" />
              <h3 className="font-bebas text-xl text-[#1B2B1A] mb-2">{b.title}</h3>
              <p className="text-sm text-[#6B7280]">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-8">USDA ELIGIBILITY REQUIREMENTS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bebas text-2xl text-[#1B2B1A] mb-4">PROPERTY REQUIREMENTS</h3>
              <ul className="space-y-3">
                {[
                  "Located in a USDA-eligible rural or suburban area",
                  "Primary residence only (no investment properties)",
                  "Must meet USDA property condition standards",
                  "Modular and manufactured homes may qualify",
                  "New construction eligible in approved areas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4A5568]">
                    <CheckCircle size={16} className="text-[#C4521A] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bebas text-2xl text-[#1B2B1A] mb-4">BORROWER REQUIREMENTS</h3>
              <ul className="space-y-3">
                {[
                  "US citizen or qualified alien",
                  "Household income at or below 115% of area median income",
                  "640+ credit score for streamlined processing",
                  "Stable employment history (2+ years preferred)",
                  "Debt-to-income ratio generally below 41%",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4A5568]">
                    <CheckCircle size={16} className="text-[#C4521A] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-[#1B2B1A]/5 border border-[#1B2B1A]/10 text-sm text-[#4A5568]">
            USDA eligibility is property-specific. Tony Botchev can check any address in seconds.{" "}
            <Link href="/apply" className="text-[#C4521A] font-semibold">
              Get a free eligibility check →
            </Link>
          </div>
        </div>
      </section>

      {/* North DFW Eligible Areas */}
      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">NORTH DFW AREAS THAT MAY QUALIFY</h2>
        <p className="text-[#4A5568] mb-6 text-sm">
          USDA eligibility is determined by property address, not city name. These communities have historically had USDA-eligible properties — but eligibility must be confirmed per address.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { city: "Gunter", href: "/cities/gunter" },
            { city: "Aubrey", href: "/cities/aubrey" },
            { city: "Anna", href: "/cities/anna" },
            { city: "Melissa", href: "/cities/melissa" },
            { city: "Little Elm", href: "/cities/little-elm" },
            { city: "Celina", href: "/cities/celina" },
            { city: "Denton", href: "/cities/denton" },
            { city: "Wylie", href: "/cities/wylie" },
          ].map((c) => (
            <Link
              key={c.city}
              href={c.href}
              className="border border-gray-200 p-4 text-center font-semibold text-[#1B2B1A] hover:border-[#C4521A] hover:text-[#C4521A] transition-colors text-sm"
            >
              {c.city}
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-8">HOW TO GET A USDA LOAN IN NORTH DFW</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Eligibility Check", desc: "Tony checks your income, the property address, and your credit profile. Takes minutes, no hard pull." },
              { step: "02", title: "Submit Documents", desc: "Pay stubs, W-2s, bank statements, and ID. USDA requires full income documentation for all household members." },
              { step: "03", title: "Pre-Approval Letter", desc: "Receive your USDA pre-approval within 24–48 hours. USDA loans take slightly longer due to the additional eligibility review." },
              { step: "04", title: "Close & Move In", desc: "USDA loans typically close in 30–45 days. Tony manages the process from contract to closing." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="font-bebas text-5xl text-[#C4521A]/20 mb-2">{s.step}</div>
                <h3 className="font-bebas text-xl text-[#1B2B1A] mb-2">{s.title}</h3>
                <p className="text-sm text-[#6B7280]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-3xl text-[#1B2B1A] mb-6">EXPLORE MORE LOAN OPTIONS</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "FHA Loans", href: "/loans/fha" },
            { name: "VA Loans", href: "/loans/va" },
            { name: "First-Time Buyer", href: "/loans/first-time-buyer" },
            { name: "Conventional Loans", href: "/loans/conventional" },
          ].map((loan) => (
            <Link
              key={loan.name}
              href={loan.href}
              className="border border-gray-200 p-4 text-center font-semibold text-[#1B2B1A] hover:border-[#C4521A] hover:text-[#C4521A] transition-colors text-sm"
            >
              {loan.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">USDA LOAN FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-[#1B2B1A] hover:bg-gray-50 transition-colors"
                >
                  <span>{item.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="shrink-0 text-[#C4521A]" />
                  ) : (
                    <ChevronDown size={18} className="shrink-0 text-gray-400" />
                  )}
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

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">
            READY TO CHECK YOUR USDA ELIGIBILITY?
          </h2>
          <p className="text-white/70 mb-6">
            No hard credit pull to start. Find out in minutes if your property qualifies.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors"
          >
            Get Pre-Qualified Free →
          </Link>
          <p className="text-white/40 text-xs mt-4">
            Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender
          </p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
