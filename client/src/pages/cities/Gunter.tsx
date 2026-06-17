import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Gunter", state: "TX", county: "Grayson", slug: "gunter",
  tagline: "Rural character, Grayson County value, and the North DFW growth wave arriving.",
  intro: "Gunter TX is a small Grayson County community just north of Celina, offering rural acreage properties, affordable new construction, and Gunter ISD schools. As North DFW growth pushes north, Gunter is attracting buyers seeking more land for less money.",
  highlights: [
    { label: "County", value: "Grayson" },
    { label: "Median Home Price", value: "~$380,000" },
    { label: "School District", value: "Gunter ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-75, SH-289 (Preston Road)" },
    { label: "Property Types", value: "SFR, acreage, new construction" },
  ],
  loanTypes: [
    { name: "Conventional", desc: "Standard purchase loans for Gunter homes.", href: "/loans/conventional" },
    { name: "FHA Loans", desc: "3.5% down for Gunter buyers with 580+ credit.", href: "/loans/fha" },
    { name: "VA Loans", desc: "0% down for veterans buying in Gunter.", href: "/loans/va" },
    { name: "First-Time Buyer", desc: "Down payment assistance for Gunter buyers.", href: "/loans/first-time-buyer" },
    { name: "DSCR Investor", desc: "Investment loans for Gunter rental properties.", href: "/loans/dscr" },
    { name: "Refinance", desc: "Refinance your Gunter home to a lower rate.", href: "/loans/refinance" },
  ],
  faqs: [
    { q: "What is the average home price in Gunter TX?", a: "As of 2026, the median home price in Gunter TX is approximately $380,000. Acreage properties and rural homes can range from $300,000 to $700,000+ depending on lot size and improvements." },
    { q: "Can I get a mortgage for an acreage property in Gunter TX?", a: "Yes — conventional and FHA loans are available for most Gunter properties. For larger acreage (10+ acres), some lenders have restrictions. Tony Botchev works with lenders experienced in rural North Texas properties." },
    { q: "Is Gunter TX growing?", a: "Gunter is experiencing growth as buyers are priced out of Celina and Anna. New residential developments are emerging along SH-289 and US-75, bringing more amenities and infrastructure to the area." },
  ],
  nearbyLinks: [
    { city: "Celina", href: "/cities/celina" },
    { city: "Anna", href: "/cities/anna" },
    { city: "Melissa", href: "/cities/melissa" },
    { city: "Aubrey", href: "/cities/aubrey" },
  ],
};

const schema = [{
  "@context": "https://schema.org", "@type": "FinancialService",
  name: "DFW Homes & Loans — Gunter TX",
  description: "Home loans in Gunter TX. Tony Botchev NMLS #114198.",
  url: "https://www.dfwhome.loans/cities/gunter",
  areaServed: { "@type": "City", name: "Gunter", containedInPlace: { "@type": "State", name: "Texas" } },
  telephone: "+19453004002",
}];

export default function GunterPage() {
  useSEO({
    title: "Home Loans in Gunter | Simple North Texas Financing",
    description: "Thinking of moving to Gunter? DFW Homes & Loans helps you find the right mortgage for this quiet, growing community so you can buy your next home with confidence.",
    canonical: "https://www.dfwhome.loans/cities/gunter",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
