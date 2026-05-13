/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: Celina TX — Primary local SEO target
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, ArrowRight } from "lucide-react";

const faqItems = [
  {
    q: "What mortgage programs are available for Celina TX home buyers?",
    a: "Celina buyers can access conventional loans (3% down), FHA loans (3.5% down), VA loans (0% down for veterans), USDA loans (0% down for qualifying areas), jumbo loans for higher-priced homes, and DSCR loans for investors. Tony Botchev works with all major loan programs through Loan Factory, Inc.",
  },
  {
    q: "What is the average home price in Celina TX in 2026?",
    a: "Median home prices in Celina range from $380,000 to $480,000 depending on the community and builder. New construction communities like Light Farms, Mustang Lakes, and Creeks of Legacy offer a range of price points.",
  },
  {
    q: "How long does it take to get pre-approved for a mortgage in Celina?",
    a: "With Tony Botchev, most buyers receive a pre-approval decision within 24 hours of submitting complete documentation. The initial consultation involves no hard credit pull.",
  },
  {
    q: "Are there first-time buyer programs for Celina TX?",
    a: "Yes — the Texas State Affordable Housing Corporation (TSAHC) and My First Texas Home program offer down payment assistance of 3–5% for qualifying first-time buyers in Collin County. Income and purchase price limits apply.",
  },
  {
    q: "What is the Collin County conforming loan limit in 2026?",
    a: "The 2026 conforming loan limit for Collin County is $766,550. Loans above this amount require jumbo financing, which Tony Botchev also offers.",
  },
  {
    q: "Can I use a VA loan to buy a new construction home in Celina?",
    a: "Yes — VA loans can be used for new construction in Celina. The process involves additional steps including VA appraisals during construction. Tony Botchev has experience navigating VA new construction loans with major Celina builders.",
  },
];

export default function CelinaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "@id": "https://www.dfwhome.loans/cities/celina#service",
      name: "DFW Homes & Loans — Celina TX Mortgage Lender",
      description:
        "Tony Botchev, NMLS #114198, provides mortgage loans for home buyers in Celina, TX. Conventional, FHA, VA, USDA, jumbo, and DSCR loans available.",
      url: "https://www.dfwhome.loans/cities/celina",
      telephone: "+19453708656",
      areaServed: { "@type": "City", name: "Celina", containedIn: { "@type": "State", name: "Texas" } },
      address: { "@type": "PostalAddress", addressLocality: "Celina", addressRegion: "TX", addressCountry: "US" },
      provider: { "@type": "Person", name: "Tony Botchev", identifier: "NMLS #114198" },
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
    title: "Mortgage Lender in Celina, TX | Local Home Financing",
    description:
      "Find the perfect house in a growing community. As a mortgage lender in Celina, DFW Homes & Loans provides the local support you need to close on your new home.",
    canonical: "https://www.dfwhome.loans/cities/celina",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-[#1B2B1A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=60"
            alt="Homes and real estate in Celina, Texas"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              📍 Celina, TX · Collin County
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              MORTGAGE LENDER<br />
              <span className="text-[#C4521A]">IN CELINA, TX</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Tony Botchev has helped hundreds of North DFW families finance homes in Celina's
              fastest-growing communities — Light Farms, Mustang Lakes, Creeks of Legacy, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/apply"
                className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center"
              >
                Get Pre-Qualified Free →
              </Link>
              <a
                href="tel:+19453708656"
                className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone size={16} /> (945) 370-8656
              </a>
            </div>
            <p className="text-white/40 text-xs mt-3">
              No hard credit pull to start · Response within 1 hour
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded">
            <h2 className="font-bebas text-2xl text-white mb-4">CELINA LOAN PROGRAMS</h2>
            <ul className="space-y-3">
              {[
                ["Conventional", "3% down · 620+ credit score"],
                ["FHA", "3.5% down · 580+ credit score"],
                ["VA", "0% down · Veterans & active duty"],
                ["USDA", "0% down · Qualifying rural areas"],
                ["Jumbo", "Up to $3M · Luxury homes"],
                ["DSCR", "Investor loans · No tax returns"],
                ["First-Time Buyer", "Down payment assistance available"],
              ].map(([name, desc]) => (
                <li key={name} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C4521A] mt-2 shrink-0" />
                  <div>
                    <span className="text-white font-semibold">{name}</span>
                    <span className="text-white/50 text-sm ml-2">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#C4521A] py-6">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ["20+", "Years in North DFW"],
            ["24 hrs", "Pre-approval turnaround"],
            ["NMLS #114198", "Licensed in Texas"],
            ["$0", "Cost to start"],
          ].map(([val, label]) => (
            <div key={label}>
              <div className="font-bebas text-3xl text-white">{val}</div>
              <div className="text-white/70 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Celina */}
      <section className="py-16 max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-4">
              WHY CELINA IS NORTH DFW'S FASTEST-GROWING CITY
            </h2>
            <p className="text-[#4A5568] mb-4">
              Celina, TX has transformed from a small agricultural community into one of the most
              sought-after suburbs in the Dallas-Fort Worth metroplex. Located in Collin County
              along US-380, Celina offers new construction communities, top-rated Celina ISD
              schools, and significantly more space per dollar than Frisco or Plano.
            </p>
            <p className="text-[#4A5568] mb-4">
              Major master-planned communities including Light Farms, Mustang Lakes, Creeks of
              Legacy, and Bluewood have brought thousands of families to Celina since 2018. Home
              prices range from the mid-$300s for entry-level new construction to $700,000+ for
              luxury builds on larger lots.
            </p>
            <p className="text-[#4A5568]">
              Tony Botchev has worked with buyers in virtually every Celina community and
              understands the nuances of builder contracts, new construction timelines, and the
              specific loan programs that work best for each development.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bebas text-2xl text-[#1B2B1A]">CELINA COMMUNITIES WE SERVE</h3>
            {[
              "Light Farms",
              "Mustang Lakes",
              "Creeks of Legacy",
              "Bluewood",
              "Cambridge Crossing",
              "Wellspring",
              "Lilyana",
              "Downtown Celina",
              "Custom / Rural Lots",
            ].map((community) => (
              <div key={community} className="flex items-center gap-3 py-2 border-b border-gray-100">
                <span className="text-[#C4521A]">✦</span>
                <span className="text-[#374151] font-medium">{community}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-2">
            LOAN OPTIONS FOR CELINA HOME BUYERS
          </h2>
          <p className="text-[#6B7280] mb-10">
            Every buyer's situation is different. Here's how the most common loan programs compare
            for Celina purchases.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Conventional",
                down: "3–20%",
                credit: "620+",
                best: "Buyers with good credit who want to avoid FHA mortgage insurance",
                link: "/loans/conventional",
              },
              {
                name: "FHA",
                down: "3.5%",
                credit: "580+",
                best: "First-time buyers with lower credit scores or limited down payment",
                link: "/loans/fha",
              },
              {
                name: "VA",
                down: "0%",
                credit: "580+",
                best: "Veterans, active duty, and surviving spouses — zero down, no PMI",
                link: "/loans/va",
              },
              {
                name: "USDA",
                down: "0%",
                credit: "640+",
                best: "Buyers in qualifying rural areas of Collin and Denton counties",
                link: "/loans/conventional",
              },
              {
                name: "Jumbo",
                down: "10–20%",
                credit: "700+",
                best: "Homes above $766,550 — luxury new construction in Celina",
                link: "/loans/jumbo",
              },
              {
                name: "First-Time Buyer",
                down: "3–3.5%",
                credit: "620+",
                best: "Down payment assistance programs for qualifying Collin County buyers",
                link: "/loans/first-time-buyer",
              },
            ].map((loan) => (
              <div key={loan.name} className="border border-gray-200 p-5 hover:border-[#C4521A] transition-colors">
                <h3 className="font-bebas text-xl text-[#1B2B1A] mb-2">{loan.name}</h3>
                <div className="text-sm text-[#6B7280] mb-1">Down: <span className="text-[#374151] font-medium">{loan.down}</span></div>
                <div className="text-sm text-[#6B7280] mb-3">Credit: <span className="text-[#374151] font-medium">{loan.credit}</span></div>
                <p className="text-sm text-[#4A5568] mb-4">{loan.best}</p>
                <Link href={loan.link} className="text-[#C4521A] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">
          CELINA TX MORTGAGE FAQ
        </h2>
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
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">
            READY TO BUY IN CELINA?
          </h2>
          <p className="text-white/70 mb-6">
            Get pre-approved in as little as 24 hours. No hard credit pull to start.
            Tony Botchev knows Celina — and he'll get you to the closing table.
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
