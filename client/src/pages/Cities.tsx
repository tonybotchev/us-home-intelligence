/* Cities Hub Page — /cities
   Lists all 15 city landing pages for SEO crawlability and user navigation
   AEO: ItemList schema helps AI engines understand geographic service coverage
*/
import { Link } from "wouter";
import { MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";

const cities = [
  {
    city: "Celina", county: "Collin", medianPrice: "$430,000", slug: "celina",
    tagline: "North DFW's fastest-growing city — new construction capital of Texas.",
  },
  {
    city: "Prosper", county: "Collin / Denton", medianPrice: "$590,000", slug: "prosper",
    tagline: "Master-planned luxury living with top-ranked schools.",
  },
  {
    city: "Frisco", county: "Collin / Denton", medianPrice: "$560,000", slug: "frisco",
    tagline: "Sports, entertainment, and one of Texas's most desirable zip codes.",
  },
  {
    city: "McKinney", county: "Collin", medianPrice: "$480,000", slug: "mckinney",
    tagline: "Historic downtown charm meets master-planned community living.",
  },
  {
    city: "Plano", county: "Collin", medianPrice: "$520,000", slug: "plano",
    tagline: "Corporate headquarters, top schools, and a proven housing market.",
  },
  {
    city: "Allen", county: "Collin", medianPrice: "$470,000", slug: "allen",
    tagline: "Family-friendly and perfectly positioned between Plano and McKinney.",
  },
  {
    city: "Anna", county: "Collin", medianPrice: "$360,000", slug: "anna",
    tagline: "Affordable Collin County living with room to grow.",
  },
  {
    city: "Melissa", county: "Collin", medianPrice: "$380,000", slug: "melissa",
    tagline: "Small-town feel with easy access to McKinney and Anna.",
  },
  {
    city: "Aubrey", county: "Denton", medianPrice: "$370,000", slug: "aubrey",
    tagline: "Denton County value with wide-open spaces and new communities.",
  },
  {
    city: "Gunter", county: "Grayson", medianPrice: "$340,000", slug: "gunter",
    tagline: "Quiet small-town living at the northern edge of DFW growth.",
  },
  {
    city: "Little Elm", county: "Denton", medianPrice: "$390,000", slug: "little-elm",
    tagline: "Lakefront lifestyle on Lewisville Lake with strong value.",
  },
  {
    city: "Wylie", county: "Collin", medianPrice: "$390,000", slug: "wylie",
    tagline: "Affordable Collin County living with small-town charm.",
  },
  {
    city: "Lewisville", county: "Denton", medianPrice: "$370,000", slug: "lewisville",
    tagline: "Central DFW location with Lake Lewisville access and great value.",
  },
  {
    city: "The Colony", county: "Denton", medianPrice: "$400,000", slug: "the-colony",
    tagline: "Lakefront living and Nebraska Furniture Mart — DFW's best-kept secret.",
  },
  {
    city: "Denton", county: "Denton", medianPrice: "$380,000", slug: "denton",
    tagline: "University town with a vibrant arts scene and affordable housing.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Cities Served by DFW Homes & Loans",
  "description": "Tony Botchev (NMLS #114198) provides home loans across 15 cities in North DFW including Celina, Prosper, Frisco, McKinney, Plano, Allen, and more.",
  "url": "https://www.dfwhome.loans/cities",
  "numberOfItems": cities.length,
  "itemListElement": cities.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": `Home Loans in ${c.city}, TX`,
    "url": `https://www.dfwhome.loans/cities/${c.slug}`,
    "description": c.tagline,
  })),
};

export default function CitiesPage() {
  useSEO({
    title: "Cities We Serve | North DFW Home Loans | Tony Botchev NMLS #114198",
    description: "Tony Botchev at DFW Homes & Loans serves 15 cities across North DFW — Celina, Prosper, Frisco, McKinney, Plano, Allen, Denton, Wylie, Lewisville, and more. Get pre-approved in 24 hours.",
    canonical: "https://www.dfwhome.loans/cities",
    schema: [schema] as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section
        className="pt-32 pb-16"
        style={{ background: "linear-gradient(135deg, oklch(0.22 0.065 155) 0%, oklch(0.18 0.055 155) 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={20} style={{ color: "oklch(0.62 0.16 42)" }} />
            <span className="font-['Outfit'] text-sm uppercase tracking-widest" style={{ color: "oklch(0.62 0.16 42)" }}>
              North DFW Coverage
            </span>
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-white leading-none mb-4">
            CITIES WE SERVE
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Tony Botchev (NMLS #114198) provides home loans across 15 cities in North DFW — Collin County, Denton County, and beyond. Pre-approval in 24 hours, no hard credit pull to start.
          </p>
          <Link href="/apply">
            <span className="inline-block bg-[#C4521A] text-white px-8 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors cursor-pointer">
              Get Pre-Qualified Free →
            </span>
          </Link>
        </div>
      </section>

      {/* City Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-2">ALL CITIES</h2>
        <p className="text-[#4A5568] mb-10">
          Click any city to see local market data, loan options, FAQs, and pre-qualification options specific to that area.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((c) => (
            <Link key={c.slug} href={`/cities/${c.slug}`}>
              <div className="border border-gray-200 p-6 hover:border-[#C4521A] hover:shadow-md transition-all group cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bebas text-2xl text-[#1B2B1A] group-hover:text-[#C4521A] transition-colors">
                      {c.city}, TX
                    </h3>
                    <span className="text-xs text-[#6B7280] font-medium">{c.county} County</span>
                  </div>
                  <ArrowRight size={18} className="text-gray-300 group-hover:text-[#C4521A] transition-colors mt-1 shrink-0" />
                </div>
                <p className="text-sm text-[#4A5568] mb-4 leading-relaxed">{c.tagline}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-[#6B7280]">Median Home Price</span>
                  <span className="text-sm font-semibold text-[#1B2B1A]">{c.medianPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Tony section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-4">WHY NORTH DFW BUYERS CHOOSE TONY</h2>
          <p className="text-[#4A5568] mb-10 max-w-2xl mx-auto">
            Tony Botchev has been helping North DFW families buy homes since 2006. He knows these markets, the builders, the neighborhoods, and the loan programs that work best in each city.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Local Market Knowledge", desc: "Tony lives and works in North DFW. He knows Celina new construction, Frisco resale, and Plano jumbo markets — not just loan products." },
              { title: "Pre-Approval in 24 Hours", desc: "No hard credit pull to start. Most buyers receive a full pre-approval letter within 24 hours of submitting complete documentation." },
              { title: "Every Loan Type", desc: "Conventional, FHA, VA, USDA, jumbo, DSCR, and first-time buyer programs. Tony finds the right loan for your situation, not the easiest one to close." },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 p-5 bg-white">
                <h3 className="font-bebas text-xl text-[#1B2B1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">READY TO BUY IN NORTH DFW?</h2>
          <p className="text-white/70 mb-6">
            No hard credit pull to start. Pre-approval in 24 hours. Tony Botchev knows North DFW.
          </p>
          <Link href="/apply">
            <span className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors cursor-pointer">
              Get Pre-Qualified Free →
            </span>
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
