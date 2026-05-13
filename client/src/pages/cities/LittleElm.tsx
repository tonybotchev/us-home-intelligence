import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Little Elm", state: "TX", county: "Denton", slug: "little-elm",
  tagline: "Lakefront living on Lewisville Lake — one of North DFW's most desirable communities.",
  intro: "Little Elm TX offers waterfront access on Lewisville Lake, excellent Little Elm ISD schools, and a rapidly growing community with new construction and established neighborhoods. It's one of the most sought-after communities in Denton County.",
  highlights: [
    { label: "County", value: "Denton" },
    { label: "Median Home Price", value: "~$420,000" },
    { label: "School District", value: "Little Elm ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Notable Feature", value: "Lewisville Lake waterfront access" },
    { label: "Highway Access", value: "Dallas North Tollway, US-380" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "Most common loan type for Little Elm buyers.", href: "/loans/conventional" },
    { name: "FHA Loans", desc: "3.5% down for Little Elm buyers with 580+ credit.", href: "/loans/fha" },
    { name: "VA Loans", desc: "0% down for veterans buying in Little Elm.", href: "/loans/va" },
    { name: "Jumbo", desc: "Loans above $766,550 for Little Elm luxury homes.", href: "/loans/jumbo" },
    { name: "First-Time Buyer", desc: "Down payment assistance for Little Elm buyers.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investment loans for Little Elm rental properties.", href: "/loans/dscr" },
  ],
  faqs: [
    { q: "What is the average home price in Little Elm TX?", a: "As of 2026, the median home price in Little Elm TX is approximately $420,000. Waterfront and lake-view properties command a premium, ranging from $500,000 to $1.5M+." },
    { q: "Are there waterfront homes available in Little Elm TX?", a: "Yes — Little Elm has waterfront and lake-view properties on Lewisville Lake. These properties often require jumbo financing and may have additional insurance requirements. Tony Botchev is experienced with lakefront property financing." },
    { q: "What school district serves Little Elm TX?", a: "Most of Little Elm is served by Little Elm ISD, which is one of the fastest-growing school districts in Texas. Parts of Little Elm near Frisco may be served by Frisco ISD." },
  ],
  nearbyLinks: [
    { city: "Frisco", href: "/cities/frisco" },
    { city: "Prosper", href: "/cities/prosper" },
    { city: "Aubrey", href: "/cities/aubrey" },
    { city: "Celina", href: "/cities/celina" },
  ],
};

const schema = [{
  "@context": "https://schema.org", "@type": "FinancialService",
  name: "DFW Homes & Loans — Little Elm TX",
  description: "Home loans in Little Elm TX. Tony Botchev NMLS #114198.",
  url: "https://www.dfwhome.loans/cities/little-elm",
  areaServed: { "@type": "City", name: "Little Elm", containedInPlace: { "@type": "State", name: "Texas" } },
  telephone: "+19452945020",
}];

export default function LittleElmPage() {
  useSEO({
    title: "Home Loans in Little Elm | Local Mortgage Solutions",
    description: "Explore your options for a house by the lake. DFW Homes & Loans provides easy home financing in Little Elm to help you settle into this vibrant lakeside town.",
    canonical: "https://www.dfwhome.loans/cities/little-elm",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
