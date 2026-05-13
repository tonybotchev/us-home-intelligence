import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";
const data: CityPageData = {
  city: "Lewisville", state: "TX", county: "Denton", slug: "lewisville",
  tagline: "Central DFW location, Lake Lewisville access, and a diverse housing market near the heart of the metroplex.",
  intro: "Lewisville TX is a centrally located city in Denton County offering quick access to both Dallas and Fort Worth via I-35E. Known for Lake Lewisville, a diverse dining and retail scene, and affordable housing compared to neighboring Frisco and Flower Mound, Lewisville is a practical choice for buyers who want to stay connected to the entire DFW metroplex.",
  highlights: [
    { label: "County", value: "Denton" },
    { label: "Median Home Price", value: "~$350,000" },
    { label: "School District", value: "Lewisville ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "I-35E, SH-121, SH-121 Business" },
    { label: "Notable", value: "Lake Lewisville, Lewisville Lake Park" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "Standard purchase loans for Lewisville homes.", href: "/loans/conventional" },
    { name: "FHA Loans", desc: "3.5% down for Lewisville buyers with 580+ credit.", href: "/loans/fha" },
    { name: "VA Loans", desc: "0% down for veterans buying in Lewisville.", href: "/loans/va" },
    { name: "First-Time Buyer", desc: "Down payment assistance for first-time Lewisville buyers.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investment loans for Lewisville rental properties.", href: "/loans/dscr" },
    { name: "Refinance", desc: "Lower your rate or access equity in your Lewisville home.", href: "/loans/refinance" },
  ],
  faqs: [
    { q: "What is the average home price in Lewisville TX?", a: "As of 2026, the median home price in Lewisville TX is approximately $350,000, making it one of the more affordable options in Denton County. Prices range from $250,000 for older homes to $600,000+ for newer builds near the lake." },
    { q: "Is Lewisville TX a good place to buy a home?", a: "Lewisville offers strong value for buyers who want central DFW access without Frisco or Plano price tags. Its location on I-35E puts buyers within 30 minutes of both Dallas and Fort Worth." },
    { q: "What school district serves Lewisville TX?", a: "Most of Lewisville is served by Lewisville ISD, one of the largest school districts in Texas with over 50,000 students and multiple specialized programs including STEM and fine arts academies." },
    { q: "Are there waterfront homes available in Lewisville TX?", a: "Yes — Lake Lewisville has several neighborhoods with water access and lake views. These properties typically require conventional or jumbo financing depending on price point. Tony Botchev can help identify the right program." },
  ],
  nearbyLinks: [
    { city: "Frisco", href: "/cities/frisco" },
    { city: "Little Elm", href: "/cities/little-elm" },
    { city: "Prosper", href: "/cities/prosper" },
    { city: "Celina", href: "/cities/celina" },
  ],
};
const schema = [{
  "@context": "https://schema.org", "@type": "FinancialService",
  name: "DFW Homes & Loans — Lewisville TX",
  description: "Home loans in Lewisville TX. Tony Botchev NMLS #114198.",
  url: "https://www.dfwhome.loans/cities/lewisville",
  areaServed: { "@type": "City", name: "Lewisville", containedInPlace: { "@type": "State", name: "Texas" } },
  telephone: "+19452945020",
}];
export default function LewisvillePage() {
  useSEO({
    title: "Home Loans in Lewisville | Easy Mortgage Pre-Approval",
    description: "Ready to buy in Lewisville, TX? DFW Homes & Loans offers mortgage programs to help you secure a home near the heart of the Dallas-Fort Worth metroplex.",
    canonical: "https://www.dfwhome.loans/cities/lewisville",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
