import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";
const data: CityPageData = {
  city: "Denton", state: "TX", county: "Denton", slug: "denton",
  tagline: "A historic college town with a creative culture, affordable housing, and strong long-term growth.",
  intro: "Denton TX is the county seat of Denton County and home to the University of North Texas and Texas Woman's University. Known for its vibrant arts scene, historic downtown square, and affordable housing relative to the rest of DFW, Denton attracts first-time buyers, investors, and families looking for community character without the premium price tag.",
  highlights: [
    { label: "County", value: "Denton" },
    { label: "Median Home Price", value: "~$330,000" },
    { label: "School District", value: "Denton ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "I-35E, I-35W, US-380" },
    { label: "Notable", value: "UNT, TWU, historic downtown square" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "Standard purchase loans for Denton homes.", href: "/loans/conventional" },
    { name: "FHA Loans", desc: "3.5% down for Denton buyers with 580+ credit.", href: "/loans/fha" },
    { name: "VA Loans", desc: "0% down for veterans buying in Denton.", href: "/loans/va" },
    { name: "First-Time Buyer", desc: "Down payment assistance for first-time Denton buyers.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investor loans for Denton rental properties near UNT/TWU.", href: "/loans/dscr" },
    { name: "Refinance", desc: "Lower your rate or access equity in your Denton home.", href: "/loans/refinance" },
  ],
  faqs: [
    { q: "What is the average home price in Denton TX?", a: "As of 2026, the median home price in Denton TX is approximately $330,000, making it one of the more affordable options in the DFW metroplex. Prices range from $220,000 for older homes to $600,000+ for newer builds on the city's outskirts." },
    { q: "Is Denton TX a good place to invest in rental property?", a: "Denton has a strong rental market driven by UNT and TWU's combined enrollment of over 50,000 students. DSCR loans allow investors to qualify based on rental income rather than personal income, making Denton an attractive investment market." },
    { q: "What first-time buyer programs are available in Denton TX?", a: "Denton buyers may qualify for TSAHC and TDHCA programs offering 3–5% down payment assistance. Denton County income limits apply. Tony Botchev can identify which programs you qualify for." },
    { q: "How far is Denton from Dallas and Fort Worth?", a: "Denton is approximately 35 miles north of Dallas and 35 miles north of Fort Worth, sitting at the junction of I-35E and I-35W. Commute times vary but average 45–60 minutes to downtown Dallas or Fort Worth." },
  ],
  nearbyLinks: [
    { city: "Lewisville", href: "/cities/lewisville" },
    { city: "Little Elm", href: "/cities/little-elm" },
    { city: "Aubrey", href: "/cities/aubrey" },
    { city: "Celina", href: "/cities/celina" },
  ],
};
const schema = [{
  "@context": "https://schema.org", "@type": "FinancialService",
  name: "DFW Homes & Loans — Denton TX",
  description: "Home loans in Denton TX. Tony Botchev NMLS #114198.",
  url: "https://www.dfwhome.loans/cities/denton",
  areaServed: { "@type": "City", name: "Denton", containedInPlace: { "@type": "State", name: "Texas" } },
  telephone: "+19452945020",
}];
export default function DentonPage() {
  useSEO({
    title: "Home Loans in Denton | Your Local Mortgage Resource",
    description: "Move to this historic college town with ease. DFW Homes & Loans offers a variety of mortgage plans for anyone looking to buy a house in the Denton community.",
    canonical: "https://www.dfwhome.loans/cities/denton",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
