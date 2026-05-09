/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: Aubrey TX — Local SEO page
 */
import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Aubrey",
  state: "TX",
  county: "Denton County",
  slug: "aubrey-tx",
  tagline: "Discover Aubrey, TX, a rapidly growing community offering new construction homes and attractive USDA-eligible financing options for aspiring homeowners.",
  intro: "Aubrey, Texas, is a vibrant and expanding community in Denton County, perfect for those seeking modern living with a small-town feel. Known for its new construction developments and eligibility for USDA loans, it presents an excellent opportunity for homebuyers looking for value and growth. Explore emerging neighborhoods and enjoy the peaceful suburban lifestyle Aubrey offers.",
  highlights: [
    { label: "County", value: "Denton County" },
    { label: "Median Home Price 2026", value: "~$370,000" },
    { label: "School District", value: "Aubrey ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-380/FM-428" },
    { label: "Notable landmark/feature", value: "USDA-eligible areas & new construction" },
  ],
  loanTypes: [
    {
      name: "Conventional",
      desc: "Ideal for borrowers with good credit, offering competitive rates for homes in Aubrey, including new construction.",
      href: "/loans/conventional",
    },
    {
      name: "FHA",
      desc: "Government-insured loans with lower down payments, a great option for many Aubrey homebuyers.",
      href: "/loans/fha",
    },
    {
      name: "VA",
      desc: "Exclusive benefits for eligible veterans and service members, making homeownership in Aubrey more accessible.",
      href: "/loans/va",
    },
    {
      name: "Jumbo",
      desc: "For higher-priced homes in Aubrey that exceed conforming loan limits, offering flexible financing.",
      href: "/loans/jumbo",
    },
    {
      name: "First-Time Buyer",
      desc: "Special programs and assistance tailored to help first-time homebuyers in Aubrey achieve their dream.",
      href: "/loans/first-time-buyer",
    },
    {
      name: "Refinance",
      desc: "Optimize your current mortgage in Aubrey with options to lower payments or tap into home equity.",
      href: "/loans/refinance",
    },
  ],
  faqs: [
    {
      q: "What is the average home price in Aubrey, TX?",
      a: "The median home price in Aubrey, TX, is approximately $370,000 as of 2026, making it an attractive market for homebuyers seeking value in the DFW area.",
    },
    {
      q: "How are the schools in Aubrey, TX?",
      a: "Aubrey is served by the Aubrey Independent School District (ISD), known for its commitment to student success and community involvement, offering quality education for residents.",
    },
    {
      q: "Is the housing market competitive in Aubrey, TX?",
      a: "Aubrey's housing market is experiencing rapid growth, driven by new construction and its appeal as a family-friendly community. While competitive, opportunities for new homes are abundant.",
    },
    {
      q: "Are there first-time home buyer programs available in Denton County?",
      a: "Yes, Denton County offers various first-time home buyer programs and down payment assistance options. Contact a local lender to explore eligibility and available resources for purchasing a home in Aubrey.",
    },
  ],
  nearbyLinks: [
    { city: "Celina", href: "/cities/celina" },
    { city: "Little Elm", href: "/cities/little-elm" },
    { city: "Denton", href: "/cities/denton" },
    { city: "Gunter", href: "/cities/gunter" },
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://www.dfwhome.loans/#business",
    name: "DFW Homes & Loans",
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // Placeholder, fill if known
      addressLocality: "Aubrey",
      addressRegion: "TX",
      postalCode: "", // Placeholder, fill if known
      addressCountry: "US",
    },
    telephone: "+19452945020",
    url: "https://www.dfwhome.loans",
    description: "Mortgage content writer for DFW Homes & Loans (Tony Botchev, NMLS #114198, sponsored by Loan Factory Inc NMLS #320841).",
  },
  {
    "@context": "https://schema.org",
    broker: {
    "@type": "Person",
    "@id": "https://www.dfwhome.loans/#tony",
    name: "Tony Botchev",
    identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" },
  },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  },
];

export default function AubreyTxPage() {
  useSEO(
    {
      title: "Aubrey TX Home Loans & Mortgage Rates - DFW Homes & Loans",
      description: data.tagline,
      canonical: `https://www.dfwhome.loans/cities/${data.slug}`,
    },
    schema
  );
  return <CityPageTemplate data={data} />;
}
