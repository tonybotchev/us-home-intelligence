import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Prosper", state: "TX", county: "Collin", slug: "prosper",
  tagline: "North DFW's fastest-growing luxury suburb — and Tony Botchev knows it.",
  intro: "Prosper TX is one of the fastest-growing cities in the country, with master-planned communities, top-rated schools, and median home prices above $600,000. Tony Botchev has helped dozens of Prosper families close on time.",
  highlights: [
    { label: "County", value: "Collin & Denton" },
    { label: "Median Home Price", value: "~$620,000" },
    { label: "School District", value: "Prosper ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Popular Communities", value: "Windsong Ranch, Star Trail, Whitley Place" },
    { label: "New Construction", value: "Yes — multiple active builders" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "3–20% down. Best for 700+ credit buyers in Prosper.", href: "/loans/conventional" },
    { name: "Jumbo", desc: "Loans above $766,550 for Prosper luxury homes.", href: "/loans/jumbo" },
    { name: "VA Loans", desc: "0% down for veterans buying in Prosper.", href: "/loans/va" },
    { name: "FHA Loans", desc: "3.5% down for Prosper buyers with 580+ credit.", href: "/loans/fha" },
    { name: "First-Time Buyer", desc: "Down payment assistance programs for Prosper buyers.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investment property loans in Prosper — no tax returns.", href: "/loans/dscr" },
  ],
  faqs: [
    { q: "What is the average home price in Prosper TX?", a: "As of 2026, the median home price in Prosper TX is approximately $620,000. New construction in master-planned communities like Windsong Ranch ranges from $550,000 to $1.2M+." },
    { q: "Do I need a jumbo loan to buy in Prosper?", a: "Not necessarily. Many Prosper homes fall below the $766,550 conforming limit and qualify for conventional financing. Homes above that threshold require jumbo financing, which Tony Botchev specializes in." },
    { q: "What builders are active in Prosper TX?", a: "Active builders in Prosper include Highland Homes, Drees Custom Homes, Perry Homes, Toll Brothers, and Shaddock Homes. Tony Botchev works with all major DFW builders and can help you navigate builder incentives." },
    { q: "How long does it take to close a home loan in Prosper?", a: "Standard purchase loans close in 21–30 days with complete documentation. New construction loans may require a longer timeline depending on the builder's completion schedule." },
  ],
  nearbyLinks: [
    { city: "Celina", href: "/cities/celina" },
    { city: "Frisco", href: "/cities/frisco" },
    { city: "McKinney", href: "/cities/mckinney" },
    { city: "Anna", href: "/cities/anna" },
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "DFW Homes & Loans — Prosper TX",
    description: "Home loans in Prosper TX. Conventional, jumbo, VA, FHA. Tony Botchev NMLS #114198.",
    url: "https://www.dfwhome.loans/cities/prosper",
    areaServed: { "@type": "City", name: "Prosper", containedInPlace: { "@type": "State", name: "Texas" } },
    telephone: "+19453004002",
    "@id": "https://www.dfwhome.loans/cities/prosper",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function ProsperPage() {
  useSEO({
    title: "Home Loans in Prosper, TX | Simple Mortgage Solutions",
    description: "Discover home loans in Prosper, TX. DFW Homes & Loans offers personalized service to help you move into one of the most sought-after areas in North Texas.",
    canonical: "https://www.dfwhome.loans/cities/prosper",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
