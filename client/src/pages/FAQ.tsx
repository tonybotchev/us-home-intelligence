/**
 * DESIGN SYSTEM: Kinetic Texas
 * Central FAQ Hub — /faq
 * M12: AEO-optimized FAQ hub with structured FAQPage schema
 */
import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";

const faqCategories = [
  {
    category: "Getting Pre-Approved",
    icon: "📋",
    faqs: [
      {
        q: "How long does mortgage pre-approval take with Tony Botchev?",
        a: "Most buyers receive a pre-approval decision within 24 hours of submitting complete documentation. The initial consultation involves no hard credit pull — Tony reviews your situation first and only pulls credit when you're ready to move forward.",
      },
      {
        q: "What documents do I need to get pre-approved for a mortgage in DFW?",
        a: "You'll need: last 2 years of W-2s or tax returns (self-employed), last 2 months of pay stubs, last 2 months of bank statements, government-issued ID, and Social Security number. Self-employed borrowers also need 2 years of business tax returns and a current P&L statement.",
      },
      {
        q: "Does getting pre-approved hurt my credit score?",
        a: "The initial consultation with Tony does not require a hard credit pull. A hard inquiry only occurs when you formally apply. Multiple mortgage inquiries within a 14–45 day window are typically treated as a single inquiry by FICO scoring models, minimizing the impact.",
      },
      {
        q: "What credit score do I need to buy a home in North DFW?",
        a: "Minimum credit scores vary by loan type: FHA loans require 580+ (3.5% down) or 500–579 (10% down); conventional loans typically require 620+; VA loans have no official minimum but most lenders require 580–620; jumbo loans generally require 700+. Tony can review your specific situation and identify the best path forward.",
      },
    ],
  },
  {
    category: "Loan Types",
    icon: "🏦",
    faqs: [
      {
        q: "What is the difference between FHA and conventional loans in Texas?",
        a: "FHA loans are government-backed and allow lower credit scores (580+) and smaller down payments (3.5%), but require mortgage insurance for the life of the loan in most cases. Conventional loans require stronger credit (620+) but allow you to cancel PMI once you reach 20% equity. For most North DFW buyers with 620+ credit and 5%+ down, conventional is often the better long-term choice.",
      },
      {
        q: "Who qualifies for a VA loan in DFW?",
        a: "VA loans are available to active-duty service members, veterans, and eligible surviving spouses. There is no down payment requirement and no private mortgage insurance. Tony Botchev specializes in VA loans for DFW veterans and can verify your eligibility through the VA's Certificate of Eligibility (COE) process.",
      },
      {
        q: "What is a DSCR loan and who is it for?",
        a: "A DSCR (Debt Service Coverage Ratio) loan is designed for real estate investors. Instead of qualifying based on personal income, the loan is approved based on the property's rental income relative to its mortgage payment. A DSCR of 1.0 means the rent covers the mortgage; most lenders require 1.0–1.25. No W-2s or tax returns are required.",
      },
      {
        q: "Are USDA loans available in North DFW?",
        a: "Yes — several North DFW communities have USDA-eligible areas, particularly in Denton County (parts of Aubrey, Gunter, and surrounding areas). USDA loans offer 0% down payment for qualifying buyers in eligible rural and suburban areas. Income limits apply based on household size and county.",
      },
      {
        q: "What is a jumbo loan and when do I need one in DFW?",
        a: "A jumbo loan is any mortgage that exceeds the conforming loan limit, which is $766,550 for most North DFW counties in 2026. Jumbo loans are common in Frisco, Prosper, and Plano where luxury home prices frequently exceed this threshold. They typically require 700+ credit score and 10–20% down payment.",
      },
    ],
  },
  {
    category: "Down Payment & Costs",
    icon: "💰",
    faqs: [
      {
        q: "What down payment assistance programs are available in Texas in 2026?",
        a: "Texas offers several programs: TSAHC (Texas State Affordable Housing Corporation) provides 3–5% down payment assistance as a grant or deferred loan; My First Texas Home offers 30-year fixed loans with down payment assistance; Homes for Texas Heroes targets teachers, first responders, and veterans. Income and purchase price limits apply by county. Tony can determine which programs you qualify for.",
      },
      {
        q: "How much are closing costs on a home in North DFW?",
        a: "Closing costs in North DFW typically range from 2–4% of the loan amount. On a $400,000 home, expect $8,000–$16,000 in closing costs. These include lender fees, title insurance, appraisal, prepaid interest, and escrow setup. Some costs can be rolled into the loan or covered by seller concessions negotiated in the purchase contract.",
      },
      {
        q: "Can I buy a home in DFW with no money down?",
        a: "Yes — VA loans offer 0% down for eligible veterans and service members. USDA loans offer 0% down for qualifying buyers in eligible areas of Denton County and surrounding regions. Down payment assistance programs can also reduce your out-of-pocket costs to near zero for qualifying buyers.",
      },
    ],
  },
  {
    category: "North DFW Market",
    icon: "🏡",
    faqs: [
      {
        q: "What is the average home price in Celina TX in 2026?",
        a: "Median home prices in Celina range from $380,000 to $480,000 depending on the community and builder. New construction communities like Light Farms, Mustang Lakes, and Creeks of Legacy offer a range of price points. The market remains active due to strong demand from DFW relocations and the Celina ISD reputation.",
      },
      {
        q: "Is the North DFW housing market still competitive in 2026?",
        a: "North DFW remains one of the most active housing markets in the country. Celina, Prosper, Frisco, and McKinney continue to see strong demand driven by corporate relocations, population growth, and top-rated school districts. Pre-approval is essential before making an offer — Tony can typically deliver a pre-approval letter within 24 hours.",
      },
      {
        q: "What are the best cities in North DFW for first-time buyers in 2026?",
        a: "Anna, Melissa, and Aubrey offer the most affordable entry points in North DFW, with median prices in the $340,000–$370,000 range. These cities offer new construction, strong school districts, and proximity to major employers in McKinney and Frisco. Down payment assistance programs are available in all three Collin and Denton County communities.",
      },
    ],
  },
  {
    category: "Working with Tony",
    icon: "🤝",
    faqs: [
      {
        q: "Is Tony Botchev a bank or a mortgage broker?",
        a: "Tony Botchev is a licensed Mortgage Loan Originator (NMLS #114198) operating as a mortgage broker through Loan Factory, Inc. (NMLS #320841). As a broker, Tony has access to rates and programs from dozens of wholesale lenders — not just one bank's product sheet. This typically results in more competitive pricing than going directly to a retail bank.",
      },
      {
        q: "What areas does Tony Botchev serve in North DFW?",
        a: "Tony serves all of North DFW, with primary focus on Collin and Denton counties: Celina, Prosper, Frisco, McKinney, Allen, Plano, Anna, Melissa, Aubrey, Gunter, Little Elm, Denton, Wylie, Lewisville, and The Colony. He is licensed in Texas and can assist buyers across the state.",
      },
      {
        q: "How do I contact Tony Botchev for a mortgage consultation?",
        a: "You can reach Tony through NOVA, his dedicated loan line, at (945) 294-5020. You can also start your pre-qualification online at dfwhome.loans/apply — the process takes about 3 minutes and does not require a hard credit pull to get started. Tony personally reviews every application.",
      },
    ],
  },
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.dfwhome.loans/faq",
    name: "DFW Mortgage FAQ — Tony Botchev NMLS #114198",
    description: "Answers to the most common questions about home loans, pre-approval, down payment assistance, and the North DFW housing market.",
    url: "https://www.dfwhome.loans/faq",
    author: {
      "@type": "Person",
      "@id": "https://www.dfwhome.loans/#tony",
      name: "Tony Botchev",
    },
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useSEO({
    title: "DFW Mortgage FAQ — Tony Botchev NMLS #114198 | Home Loan Questions Answered",
    description: "Answers to the most common North DFW mortgage questions: pre-approval, loan types, down payment assistance, and the 2026 housing market. Tony Botchev NMLS #114198.",
    canonical: "https://www.dfwhome.loans/faq",
    schema: schema as Record<string, unknown>[],
  });

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1B2B1A] pt-24 pb-14">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            NORTH DFW MORTGAGE FAQ
          </div>
          <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
            YOUR MORTGAGE QUESTIONS,<br />
            <span className="text-[#C4521A]">ANSWERED DIRECTLY.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
            Tony Botchev (NMLS #114198) answers the most common questions from North DFW homebuyers and investors.
            No fluff. No vague answers. Just straight talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/apply" className="bg-[#C4521A] text-white px-8 py-3 font-semibold hover:bg-[#A8431A] transition-colors">
              Get Pre-Qualified Free →
            </Link>
            <a href="tel:+19452945020" className="flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors">
              <Phone size={16} /> Call NOVA (945) 294-5020
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 max-w-4xl mx-auto px-4 md:px-6">
        {/* Jump Links */}
        <div className="flex flex-wrap gap-2 mb-10">
          {faqCategories.map((cat) => (
            <a
              key={cat.category}
              href={`#${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm border border-gray-300 px-4 py-2 hover:border-[#C4521A] hover:text-[#C4521A] transition-colors"
            >
              {cat.icon} {cat.category}
            </a>
          ))}
        </div>

        {faqCategories.map((cat) => (
          <div
            key={cat.category}
            id={cat.category.toLowerCase().replace(/\s+/g, '-')}
            className="mb-12"
          >
            <h2 className="font-bebas text-3xl text-[#1B2B1A] mb-6 flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              {cat.category}
            </h2>
            <div className="space-y-3">
              {cat.faqs.map((faq, i) => {
                const key = `${cat.category}-${i}`;
                const isOpen = openItems[key];
                return (
                  <div key={key} className="border border-gray-200 bg-white overflow-hidden">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#1B2B1A] hover:bg-gray-50 transition-colors"
                    >
                      <span className="pr-4">{faq.q}</span>
                      {isOpen
                        ? <ChevronUp size={18} className="shrink-0 text-[#C4521A]" />
                        : <ChevronDown size={18} className="shrink-0 text-gray-400" />
                      }
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-[#4A5568] leading-relaxed border-t border-gray-100">
                        <p className="pt-4">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">STILL HAVE QUESTIONS?</h2>
          <p className="text-white/70 mb-6">Tony answers every inquiry personally. No call centers. No automated responses.</p>
          <Link href="/apply" className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors">
            Start Your Pre-Qualification →
          </Link>
          <p className="text-white/40 text-xs mt-4">Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender</p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
