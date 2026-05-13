/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: Plano TX — Local SEO page
 */
import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Plano",
  state: "TX",
  county: "Collin County",
  slug: "plano-tx",
  tagline: "Discover Plano, TX, where exceptional schools, thriving corporate campuses, and vibrant lifestyle amenities create an ideal environment for your next home.",
  intro:
    "Plano, Texas, offers a dynamic blend of suburban comfort and urban sophistication, making it a highly sought-after destination for homebuyers. Known for its nationally ranked Plano ISD, the city provides outstanding educational opportunities. Major employment hubs like Legacy West and Toyota HQ, alongside recreational spots like Granite Park, contribute to a robust economy and a high quality of life, attracting families and professionals alike.",
  highlights: [
    { label: "County", value: "Collin County" },
    { label: "Median Home Price 2026", value: "~$480,000" },
    { label: "School District", value: "Plano ISD (nationally ranked)" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-75, Dallas North Tollway, SH-121" },
    { label: "Notable landmark/feature", value: "Legacy West, Toyota HQ, Granite Park" },
  ],
  loanTypes: [
    {
      name: "Conventional",
      desc: "Ideal for Plano homebuyers with strong credit and a stable income, offering competitive rates for properties across its diverse neighborhoods.",
      href: "/loans/conventional",
    },
    {
      name: "FHA",
      desc: "A great option for first-time homebuyers in Plano, offering lower down payments and flexible credit requirements for eligible properties.",
      href: "/loans/fha",
    },
    {
      name: "VA",
      desc: "Exclusive benefits for Plano's eligible veterans and active-duty military, featuring no down payment and competitive interest rates.",
      href: "/loans/va",
    },
    {
      name: "Jumbo",
      desc: "For those looking at higher-value homes in Plano's luxury markets, offering financing solutions beyond conforming loan limits.",
      href: "/loans/jumbo",
    },
    {
      name: "First-Time Buyer",
      desc: "Special programs and assistance designed to help new homeowners in Plano navigate their first home purchase with confidence.",
      href: "/loans/first-time-buyer",
    },
    {
      name: "Refinance",
      desc: "Opportunities for current Plano homeowners to lower monthly payments, change loan terms, or access home equity.",
      href: "/loans/refinance",
    },
  ],
  faqs: [
    {
      q: "What is the average home price in Plano, TX?",
      a: "As of 2026, the median home price in Plano, TX, is approximately $480,000. This can vary based on neighborhood, property type, and market conditions.",
    },
    {
      q: "How are the school districts in Plano, TX?",
      a: "Plano is served by the Plano Independent School District (Plano ISD), which is nationally ranked and highly regarded for its academic excellence and diverse educational programs.",
    },
    {
      q: "Is the housing market competitive in Plano, TX?",
      a: "Plano's housing market is generally competitive due to its strong economy, excellent schools, and quality of life. Properties, especially in desirable areas, can attract multiple offers.",
    },
    {
      q: "Are there first-time home buyer programs available in Collin County, TX?",
      a: "Yes, first-time home buyer programs are often available through various state and local initiatives in Collin County, which may include down payment assistance or favorable loan terms. It's recommended to consult with a local mortgage professional for current options.",
    },
  ],
  nearbyLinks: [
    { city: "Allen", href: "/cities/allen" },
    { city: "Frisco", href: "/cities/frisco" },
    { city: "McKinney", href: "/cities/mckinney" },
    { city: "Richardson", href: "/cities/richardson-tx" },
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://www.dfwhome.loans/#business",
    name: "DFW Homes & Loans - Tony Botchev",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Plano",
      addressRegion: "TX",
      addressCountry: "US",
    },
    telephone: "+19452945020",
    description: "Mortgage services in Plano, TX, provided by Tony Botchev, NMLS #114198, sponsored by Loan Factory Inc NMLS #320841.",
    url: "https://www.dfwhome.loans/cities/plano-tx",
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

export default function PlanoPage() {
  useSEO({
    title: "Plano TX Homes & Loans - Mortgage Lender Tony Botchev",
    description: data.tagline,
    canonical: "https://www.dfwhome.loans/cities/plano-tx",
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
