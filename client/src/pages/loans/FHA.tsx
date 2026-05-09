/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: FHA Loans — Primary service SEO page
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
    q: "What credit score do I need for an FHA loan in Texas?",
    a: "FHA loans require a minimum 580 credit score for 3.5% down payment. With a score between 500–579, you may still qualify with a 10% down payment. Most lenders, including through Loan Factory, Inc., require at least 580.",
  },
  {
    q: "What is the FHA loan limit in Collin County TX for 2026?",
    a: "The 2026 FHA loan limit for Collin County (which includes Celina, Prosper, and McKinney) is $524,225 for a single-family home.",
  },
  {
    q: "How much is FHA mortgage insurance in 2026?",
    a: "FHA charges an upfront MIP of 1.75% of the loan amount (typically rolled into the loan) plus an annual MIP of 0.55% for most 30-year loans with less than 10% down. On a $400,000 loan, that's about $183/month added to your payment.",
  },
  {
    q: "Can I use an FHA loan to buy a new construction home in North DFW?",
    a: "Yes — FHA loans can be used for new construction in Celina, Prosper, Frisco, and other North DFW communities. Most major builders accept FHA financing. Tony Botchev has experience with FHA new construction loans across all major North DFW builders.",
  },
  {
    q: "Does FHA mortgage insurance ever go away?",
    a: "For loans with less than 10% down, FHA mortgage insurance remains for the life of the loan. The only way to remove it is to refinance into a conventional loan once you have 20% equity. For loans with 10%+ down, MIP is removed after 11 years.",
  },
  {
    q: "What is the FHA debt-to-income ratio limit?",
    a: "FHA allows a maximum DTI of 43% as a standard guideline, but with compensating factors (strong credit, reserves, etc.), lenders can approve up to 57% DTI. This flexibility makes FHA accessible to buyers with student loans, car payments, or other debts.",
  },
];

export default function FHAPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["FinancialProduct", "Service"],
      "@id": "https://www.dfwhome.loans/loans/fha#product",
      name: "FHA Home Loan — DFW Homes & Loans",
      description:
        "FHA mortgage loans for home buyers in North DFW. 3.5% down, 580+ credit score. Tony Botchev, NMLS #114198, sponsored by Loan Factory, Inc. NMLS #320841.",
      url: "https://www.dfwhome.loans/loans/fha",
      areaServed: "North Dallas-Fort Worth, Texas",
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
    title: "FHA Loans in North DFW | Low Down Payment Mortgages",
    description:
      "Buy a home with a small down payment. DFW Homes & Loans provides FHA loans in North DFW to help buyers with flexible credit scores get the keys to their home.",
    canonical: "https://www.dfwhome.loans/loans/fha",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              FHA LOAN PROGRAM
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              FHA LOANS IN<br />
              <span className="text-[#C4521A]">NORTH DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              FHA loans are the most accessible path to homeownership for buyers with credit scores
              below 700 or limited down payment savings. 3.5% down. 580+ credit score. Available
              for new construction and resale in Celina, Prosper, Frisco, McKinney, and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/apply"
                className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center"
              >
                Get Pre-Qualified Free →
              </Link>
              <a
                href="tel:+19452945020"
                className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone size={16} /> (945) 294-5020
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-bebas text-2xl text-white mb-4">FHA LOAN AT A GLANCE</h2>
            <div className="space-y-3">
              {[
                ["Minimum Down Payment", "3.5%"],
                ["Minimum Credit Score", "580"],
                ["Max Loan (Collin County)", "$524,225"],
                ["Max DTI", "Up to 57% with compensating factors"],
                ["Upfront MIP", "1.75% of loan amount"],
                ["Annual MIP", "~0.55% / year"],
                ["Property Types", "SFR, condos, 2–4 units"],
                ["New Construction", "Yes — all major DFW builders"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-white/60">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FHA vs Conventional */}
      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-4">
          IS FHA RIGHT FOR YOU?
        </h2>
        <p className="text-[#6B7280] mb-8 max-w-2xl">
          FHA isn't the right choice for every buyer — but for the right buyer, it's the most
          accessible path to homeownership. Here's when FHA wins.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 border border-green-200 p-6">
            <h3 className="font-bebas text-2xl text-green-800 mb-4">FHA IS A GOOD FIT IF:</h3>
            <ul className="space-y-3">
              {[
                "Your credit score is 580–699",
                "You have less than 5% for a down payment",
                "Your debt-to-income ratio is above 43%",
                "You're a first-time buyer with limited credit history",
                "You want the lowest possible down payment",
                "You're buying a home that needs minor repairs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-green-800">
                  <CheckCircle size={16} className="shrink-0 mt-0.5 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 p-6">
            <h3 className="font-bebas text-2xl text-orange-800 mb-4">CONSIDER CONVENTIONAL IF:</h3>
            <ul className="space-y-3">
              {[
                "Your credit score is 700+",
                "You can put down 5% or more",
                "You want mortgage insurance to eventually go away",
                "You're buying above the $524,225 FHA limit",
                "You want to avoid the 1.75% upfront MIP",
                "You're buying a condo in a non-FHA-approved complex",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-orange-800">
                  <span className="shrink-0 mt-0.5 text-orange-500">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-[#1B2B1A]/5 border border-[#1B2B1A]/10 text-sm text-[#4A5568]">
          Not sure which is right for you? Tony Botchev will run both scenarios with real numbers
          in your free pre-approval consultation — no obligation, no hard credit pull.{" "}
          <Link href="/apply" className="text-[#C4521A] font-semibold">
            Schedule a call →
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-8">
            HOW TO GET AN FHA LOAN IN NORTH DFW
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Free Consultation", desc: "Discuss your goals, timeline, and financial picture. No hard credit pull. Takes 15 minutes." },
              { step: "02", title: "Submit Documents", desc: "Pay stubs, W-2s, bank statements, and ID. Tony's team guides you through exactly what's needed." },
              { step: "03", title: "Pre-Approval Letter", desc: "Receive your FHA pre-approval within 24 hours. Use it to make competitive offers on Celina homes." },
              { step: "04", title: "Close & Move In", desc: "Tony manages the process from contract to closing. Most FHA loans close in 21–30 days." },
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
            { name: "Conventional Loans", href: "/loans/conventional" },
            { name: "VA Loans", href: "/loans/va" },
            { name: "First-Time Buyer", href: "/loans/first-time-buyer" },
            { name: "DSCR Loans", href: "/loans/dscr" },
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
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">FHA LOAN FAQ</h2>
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
            READY TO GET PRE-APPROVED FOR AN FHA LOAN?
          </h2>
          <p className="text-white/70 mb-6">
            No hard credit pull to start. Pre-approval in as little as 24 hours.
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
