/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: McKinney TX — Local SEO page
 */
import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "McKinney",
  state: "TX",
  county: "Collin County",
  slug: "mckinney-tx",
  tagline: "Discover your dream home in McKinney, where historic charm meets modern amenities and a thriving community awaits.",
  intro:
    "McKinney, located in Collin County, offers homebuyers a unique blend of historic elegance and contemporary living. With its top-rated schools, vibrant downtown, and family-friendly atmosphere, it's an ideal place to settle down. Explore diverse housing options from charming historic homes to master-planned communities like Craig Ranch and Adriatica Village.",
  highlights: [
    { label: "County", value: "Collin County" },
    { label: "Median Home Price 2026", value: "~$470,000" },
    { label: "School District", value: "McKinney ISD" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-75/SH-121" },
    { label: "Notable landmark/feature", value: "Historic Downtown McKinney, Craig Ranch, Adriatica Village" },
  ],
  loanTypes: [
    {
      name: "Conventional Loans",
      desc: "Flexible financing for well-qualified buyers in McKinney, often with competitive rates and terms for primary residences or investment properties.",
      href: "/apply",
    },
    {
      name: "FHA Loans",
      desc: "Ideal for first-time homebuyers in McKinney with lower down payment requirements and more lenient credit guidelines, making homeownership accessible.",
      href: "/apply",
    },
    {
      name: "VA Loans",
      desc: "Exclusive benefits for eligible veterans and active-duty service members in McKinney, featuring no down payment and no private mortgage insurance.",
      href: "/apply",
    },
    {
      name: "Jumbo Loans",
      desc: "For those looking at higher-priced homes in McKinney's luxury market, exceeding conforming loan limits, offering financing for substantial properties.",
      href: "/apply",
    },
    {
      name: "First-Time Buyer Programs",
      desc: "Explore various state and local programs available in Collin County that can assist McKinney first-time buyers with down payments and closing costs.",
      href: "/apply",
    },
    {
      name: "Refinance Options",
      desc: "Optimize your current mortgage in McKinney to potentially lower your interest rate, reduce monthly payments, or access home equity for other financial goals.",
      href: "/apply",
    },
  ],
  faqs: [
    {
      q: "What is the average home price in McKinney, TX?",
      a: "The median home price in McKinney, TX, is approximately $470,000 as of 2026. This can vary based on neighborhood, home size, and specific features.",
    },
    {
      q: "How are the school districts in McKinney, TX?",
      a: "McKinney is served by McKinney ISD, which is recognized for its strong academic programs and diverse extracurricular activities, making it a desirable district for families.",
    },
    {
      q: "Is the housing market competitive in McKinney, TX?",
      a: "McKinney's housing market is considered competitive due to its growth, amenities, and quality of life. Properties often receive multiple offers, especially in popular areas.",
    },
    {
      q: "Are there first-time home buyer programs available in Collin County for McKinney residents?",
      a: "Yes, first-time home buyer programs are often available through state and local initiatives in Collin County, which can provide assistance with down payments and closing costs for eligible McKinney residents. Contact us to learn more about current options.",
    },
  ],
  nearbyLinks: [
    { city: "Allen", href: "/cities/allen" },
    { city: "Frisco", href: "/cities/frisco" },
    { city: "Celina", href: "/cities/celina" },
    { city: "Prosper", href: "/cities/prosper" },
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://www.dfwhome.loans/#business",
    name: "DFW Homes & Loans - McKinney",
    description:
      "Mortgage services in McKinney, TX. Tony Botchev, NMLS #114198, sponsored by Loan Factory Inc NMLS #320841.",
    telephone: "+19453004002",
    address: {
      "@type": "PostalAddress",
      addressLocality: "McKinney",
      addressRegion: "TX",
      addressCountry: "US",
    },
    url: "https://www.dfwhome.loans/cities/mckinney-tx",
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

export default function McKinneyPage() {
  useSEO({
    title: `McKinney TX Home Loans & Mortgages - DFW Homes & Loans`,
    description: data.tagline,
    canonical: `https://www.dfwhome.loans/cities/${data.slug}`,
    schema: JSON.stringify(schema),
  });
  return <CityPageTemplate data={data} />;
}
