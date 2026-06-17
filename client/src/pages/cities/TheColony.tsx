import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";
const data: CityPageData = {
  city: "The Colony", state: "TX", county: "Denton", slug: "the-colony",
  tagline: "Lakeside living, entertainment district, and an established community between Frisco and Lewisville.",
  intro: "The Colony TX is a well-established Denton County city on the south shore of Lake Lewisville. Home to Grandscape — one of the largest mixed-use entertainment and retail developments in the country — The Colony offers a unique blend of suburban living, waterfront access, and world-class amenities at more accessible price points than neighboring Frisco.",
  highlights: [
    { label: "County", value: "Denton" },
    { label: "Median Home Price", value: "~$380,000" },
    { label: "School District", value: "Lewisville ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "SH-121, Dallas North Tollway" },
    { label: "Notable", value: "Grandscape, Lake Lewisville, Nebraska Furniture Mart" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "Standard purchase loans for The Colony homes.", href: "/loans/conventional" },
    { name: "FHA Loans", desc: "3.5% down for The Colony buyers with 580+ credit.", href: "/loans/fha" },
    { name: "VA Loans", desc: "0% down for veterans buying in The Colony.", href: "/loans/va" },
    { name: "First-Time Buyer", desc: "Down payment assistance for first-time buyers in The Colony.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investment loans for The Colony rental properties.", href: "/loans/dscr" },
    { name: "Refinance", desc: "Lower your rate or access equity in your Colony home.", href: "/loans/refinance" },
  ],
  faqs: [
    { q: "What is the average home price in The Colony TX?", a: "As of 2026, the median home price in The Colony TX is approximately $380,000. The city offers a range of options from $280,000 townhomes to $600,000+ lakefront properties." },
    { q: "What is Grandscape in The Colony?", a: "Grandscape is a 433-acre mixed-use development in The Colony featuring retail, dining, entertainment, and hospitality. It includes Nebraska Furniture Mart, Scheels, and dozens of restaurants, making The Colony a regional destination." },
    { q: "Is The Colony TX a good investment?", a: "The Colony has strong fundamentals — lake access, Grandscape driving foot traffic, and proximity to the Dallas North Tollway corridor. It offers better value per square foot than Frisco while sharing the same regional infrastructure." },
    { q: "What school district serves The Colony TX?", a: "The Colony is served by Lewisville ISD, one of the largest school districts in Texas with strong academic and extracurricular programs." },
  ],
  nearbyLinks: [
    { city: "Frisco", href: "/cities/frisco" },
    { city: "Little Elm", href: "/cities/little-elm" },
    { city: "Lewisville", href: "/cities/lewisville" },
    { city: "Prosper", href: "/cities/prosper" },
  ],
};
const schema = [{
  "@context": "https://schema.org", "@type": "FinancialService",
  name: "DFW Homes & Loans — The Colony TX",
  description: "Home loans in The Colony TX. Tony Botchev NMLS #114198.",
  url: "https://www.dfwhome.loans/cities/the-colony",
  areaServed: { "@type": "City", name: "The Colony", containedInPlace: { "@type": "State", name: "Texas" } },
  telephone: "+19453004002",
}];
export default function TheColonyPage() {
  useSEO({
    title: "Home Loans in The Colony | Fast & Simple Home Buying",
    description: "Get the keys to your new home in The Colony. DFW Homes & Loans provides local mortgage advice and clear loan options for this popular North Texas destination.",
    canonical: "https://www.dfwhome.loans/cities/the-colony",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
