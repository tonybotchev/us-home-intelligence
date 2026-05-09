/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: Anna TX — Local SEO page
 */
import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Anna",
  state: "TX",
  county: "Collin County",
  slug: "anna-tx",
  tagline: "Discover affordable new construction and a rapidly growing community in Anna, TX, perfect for families and first-time homebuyers.",
  intro:
    "Anna, TX, located in Collin County, is one of North DFW's fastest-growing cities, offering an attractive blend of small-town charm and modern amenities. It's particularly appealing to homebuyers seeking new construction opportunities and a vibrant community atmosphere. With its strategic location and ongoing development, Anna provides an excellent environment for both living and investment.",
  highlights: [
    { label: "County", value: "Collin County" },
    { label: "Median Home Price 2026", value: "$340,000" },
    { label: "School District", value: "Anna ISD" },
    { label: "Conforming Loan Limit", value: 
'$766,550'
 },
    { label: "Highway Access", value: "US-75/SH-5" },
    { label: "Notable landmark/feature", value: "Fastest-growing city in Collin County, new construction communities" },
  ],
  loanTypes: [
    {
      name: "Conventional",
      desc: "Secure competitive rates for well-qualified buyers looking for homes in Anna, TX.",
      href: "/loans/conventional",
    },
    {
      name: "FHA",
      desc: "Explore low down payment options designed to help more families achieve homeownership in Anna.",
      href: "/loans/fha",
    },
    {
      name: "VA",
      desc: "Take advantage of exclusive benefits and zero down payment options for eligible veterans in Anna.",
      href: "/loans/va",
    },
    {
      name: "Jumbo",
      desc: "Access financing for higher-priced homes in Anna's expanding real estate market.",
      href: "/loans/jumbo",
    },
    {
      name: "First-Time Buyer",
      desc: "Utilize programs specifically crafted to assist first-time homebuyers in Anna, TX.",
      href: "/loans/first-time-buyer",
    },
    {
      name: "Refinance",
      desc: "Discover opportunities to lower your monthly payments or access home equity in Anna.",
      href: "/loans/refinance",
    },
  ],
  faqs: [
    {
      q: "What is the average home price in Anna, TX?",
      a: "The median home price in Anna, TX is approximately $340,000 as of 2026, reflecting its affordability and strong appeal for new construction.",
    },
    {
      q: "How are the schools in Anna, TX?",
      a: "Anna ISD serves the community of Anna, TX, providing a focused educational environment for its rapidly growing student population with a commitment to student success.",
    },
    {
      q: "Is the housing market competitive in Anna, TX?",
      a: "Anna, TX is experiencing rapid growth and high demand for new homes, making its housing market moderately competitive, especially for well-priced new construction properties.",
    },
    {
      q: "Are there first-time home buyer programs available in Collin County, TX?",
      a: "Yes, first-time home buyer programs are available in Collin County, TX, which can assist eligible buyers in Anna with down payments and closing costs. These programs aim to make homeownership more accessible.",
    },
  ],
  nearbyLinks: [
    { city: "McKinney", href: "/cities/mckinney" },
    { city: "Melissa", href: "/cities/melissa" },
    { city: "Celina", href: "/cities/celina" },
    { city: "Gunter", href: "/cities/gunter" },
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
      addressLocality: "Anna",
      addressRegion: "TX",
      addressCountry: "US",
    },
    telephone: "+19452945020",
    description: "Mortgage content and home loan services in Anna, TX, provided by Tony Botchev, NMLS #114198.",
    url: "https://www.dfwhome.loans/cities/anna-tx",
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

export default function AnnaPage() {
  useSEO(
    "Anna TX Homes & Loans - Tony Botchev NMLS #114198",
    "Explore home loan options and new construction in Anna, TX. Get pre-approved for your dream home with Tony Botchev, NMLS #114198.",
    "https://www.dfwhome.loans/cities/anna-tx",
    schema
  );
  return <CityPageTemplate data={data} />;
}