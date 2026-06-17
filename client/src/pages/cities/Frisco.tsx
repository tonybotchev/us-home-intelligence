/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: Frisco TX — Local SEO page
 */
import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Frisco",
  state: "TX",
  county: "Collin/Denton",
  slug: "frisco-tx",
  tagline: "Discover your dream home in Frisco, TX, a vibrant city offering exceptional amenities, top-rated schools, and a thriving community perfect for families and professionals alike.",
  intro: "Frisco, Texas, is a highly sought-after destination for homebuyers, known for its rapid growth, excellent quality of life, and diverse housing options. With master-planned communities like Starwood and Phillips Creek Ranch, residents enjoy a blend of suburban tranquility and urban convenience. The city's appeal is further enhanced by its award-winning school district and abundant recreational opportunities.",
  highlights: [
    { label: "County", value: "Collin/Denton" },
    { label: "Median Home Price 2026", value: "~$550,000" },
    { label: "School District", value: "Frisco ISD (top-rated)" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-380/Dallas North Tollway" },
    { label: "Notable landmark/feature", value: "PGA HQ, The Star (Cowboys HQ), Stonebriar Centre" },
  ],
  loanTypes: [
    {
      name: "Conventional",
      desc: "Ideal for borrowers with good credit, offering competitive rates for homes in Frisco, including those in popular neighborhoods like Newman Village.",
      href: "/loans/conventional",
    },
    {
      name: "FHA",
      desc: "A great option for first-time homebuyers in Frisco, providing lower down payment requirements and flexible credit guidelines.",
      href: "/loans/fha",
    },
    {
      name: "VA",
      desc: "Exclusive benefits for eligible veterans and service members looking to purchase a home in Frisco with no down payment.",
      href: "/loans/va",
    },
    {
      name: "Jumbo",
      desc: "For higher-priced homes in Frisco, such as luxury properties in Starwood, offering financing beyond conforming loan limits.",
      href: "/loans/jumbo",
    },
    {
      name: "First-Time Buyer",
      desc: "Special programs and assistance available to help new homebuyers in Collin and Denton counties achieve homeownership in Frisco.",
      href: "/loans/first-time-buyer",
    },
    {
      name: "Refinance",
      desc: "Opportunities for Frisco homeowners to lower their interest rates, change loan terms, or access home equity.",
      href: "/loans/refinance",
    },
  ],
  faqs: [
    {
      q: "What is the average home price in Frisco, TX?",
      a: "The median home price in Frisco, TX, is approximately $550,000 as of 2026, reflecting its desirable housing market and strong demand.",
    },
    {
      q: "How are the school districts in Frisco, TX?",
      a: "Frisco is served by the highly-rated Frisco Independent School District (FISD), known for its academic excellence and numerous extracurricular opportunities, making it a top choice for families.",
    },
    {
      q: "Is the housing market competitive in Frisco, TX?",
      a: "Yes, the housing market in Frisco, TX, is generally competitive due to its rapid growth, high quality of life, and excellent amenities. Properties often receive multiple offers, especially in sought-after areas.",
    },
    {
      q: "Are there first-time home buyer programs available in Collin or Denton County for Frisco residents?",
      a: "Yes, first-time home buyer programs are often available through various state and local initiatives in both Collin and Denton counties, which can provide down payment assistance or favorable loan terms for eligible Frisco residents. It's recommended to consult with a mortgage professional for current options.",
    },
  ],
  nearbyLinks: [
    { city: "Celina", href: "/cities/celina" },
    { city: "Prosper", href: "/cities/prosper" },
    { city: "McKinney", href: "/cities/mckinney" },
    { city: "Allen", href: "/cities/allen" },
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://www.dfwhome.loans/#business",
    name: "DFW Homes & Loans",
    description: "Home loans in Frisco, TX. Tony Botchev NMLS #114198, sponsored by Loan Factory Inc NMLS #320841.",
    telephone: "+19453004002",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Frisco",
      addressRegion: "TX",
    },
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

export default function FriscoPage() {
  useSEO({
    title: `Frisco TX Home Loans & Mortgages - DFW Homes & Loans`,
    description: data.tagline,
    canonical: `https://www.dfwhome.loans/cities/${data.slug}`,
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
