import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";
const data: CityPageData = {
  city: "Wylie", state: "TX", county: "Collin", slug: "wylie",
  tagline: "Lakeside living, strong schools, and affordable Collin County pricing east of McKinney.",
  intro: "Wylie TX sits on the eastern edge of Collin County near Lake Lavon, offering a quieter alternative to higher-priced cities like Frisco and Plano. With Wylie ISD schools, growing retail, and easy access to US-78 and SH-190, Wylie attracts buyers seeking more home for their money without sacrificing quality of life.",
  highlights: [
    { label: "County", value: "Collin / Rockwall" },
    { label: "Median Home Price", value: "~$380,000" },
    { label: "School District", value: "Wylie ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-78, SH-190, SH-78" },
    { label: "Notable", value: "Lake Lavon access, growing retail corridor" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "Standard purchase loans for Wylie homes.", href: "/loans/conventional" },
    { name: "FHA Loans", desc: "3.5% down for Wylie buyers with 580+ credit.", href: "/loans/fha" },
    { name: "VA Loans", desc: "0% down for veterans buying in Wylie.", href: "/loans/va" },
    { name: "First-Time Buyer", desc: "Down payment assistance for first-time Wylie buyers.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investment loans for Wylie rental properties.", href: "/loans/dscr" },
    { name: "Refinance", desc: "Refinance your Wylie home to a lower rate.", href: "/loans/refinance" },
  ],
  faqs: [
    { q: "What is the average home price in Wylie TX?", a: "As of 2026, the median home price in Wylie TX is approximately $380,000. Wylie offers more affordable options than Frisco or Plano while remaining in Collin County with access to top schools." },
    { q: "Is Wylie TX a good place to buy a home?", a: "Wylie consistently ranks among the best places to live in North Texas. Its combination of affordability, Wylie ISD schools, lake access, and proximity to major employment centers makes it a strong long-term investment." },
    { q: "What loan programs are available for Wylie TX buyers?", a: "Wylie buyers can access conventional, FHA, VA, USDA (for qualifying rural areas), and first-time buyer programs. Tony Botchev can identify which program fits your situation best." },
    { q: "How far is Wylie from major DFW employers?", a: "Wylie is approximately 30 minutes from Plano's corporate corridor, 25 minutes from McKinney, and 45 minutes from downtown Dallas via SH-190 and US-78." },
  ],
  nearbyLinks: [
    { city: "McKinney", href: "/cities/mckinney" },
    { city: "Allen", href: "/cities/allen" },
    { city: "Plano", href: "/cities/plano" },
    { city: "Celina", href: "/cities/celina" },
  ],
};
const schema = [{
  "@context": "https://schema.org", "@type": "FinancialService",
  name: "DFW Homes & Loans — Wylie TX",
  description: "Home loans in Wylie TX. Tony Botchev NMLS #114198.",
  url: "https://www.dfwhome.loans/cities/wylie",
  areaServed: { "@type": "City", name: "Wylie", containedInPlace: { "@type": "State", name: "Texas" } },
  telephone: "+19453004002",
}];
export default function WyliePage() {
  useSEO({
    title: "Home Loans in Wylie | Reliable Financing for Your Move",
    description: "Find great mortgage rates in Wylie. DFW Homes & Loans makes the buying process easy to understand so you can join one of the best places to live in North Texas.",
    canonical: "https://www.dfwhome.loans/cities/wylie",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
