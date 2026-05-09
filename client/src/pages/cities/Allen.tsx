/**
 * DESIGN SYSTEM: Kinetic Texas
 * City Page: Allen TX — Local SEO page
 */
import CityPageTemplate, { CityPageData } from "@/components/CityPageTemplate";
import { useSEO } from "@/hooks/useSEO";

const data: CityPageData = {
  city: "Allen",
  state: "TX",
  county: "Collin County",
  slug: "allen-tx",
  tagline:
    "Discover your dream home in Allen, TX, where top-ranked schools, vibrant shopping, and community events create an ideal environment for families and individuals.",
  intro:
    "Allen, Texas, in Collin County, offers a dynamic blend of suburban comfort and urban amenities, making it a highly sought-after destination for homebuyers. With its top-ranked Allen ISD, families benefit from exceptional educational opportunities. Explore diverse housing options, from charming established neighborhoods to modern developments, all while enjoying convenient access to major highways like US-75 and SH-121. Key attractions like Allen Premium Outlets, Allen Event Center, and Watters Creek provide endless entertainment and shopping.",
  highlights: [
    { label: "County", value: "Collin County" },
    { label: "Median Home Price 2026", value: "~$430,000" },
    { label: "School District", value: "Allen ISD (top-ranked)" },
    { label: "Conforming Loan Limit", value: "$766,550" },
    { label: "Highway Access", value: "US-75, SH-121" },
    { label: "Notable landmark/feature", value: "Allen Premium Outlets, Watters Creek" },
  ],
  loanTypes: [
    {
      name: "Conventional Loan",
      desc:
        "Ideal for borrowers with good credit and a stable income looking for competitive rates in Allen's diverse housing market.",
      href: "/apply",
    },
    {
      name: "FHA Loan",
      desc:
        "A great option for first-time homebuyers in Allen, offering lower down payment requirements and flexible credit guidelines.",
      href: "/apply",
    },
    {
      name: "VA Loan",
      desc:
        "Exclusive benefits for eligible veterans and active-duty service members in Allen, including no down payment and no mortgage insurance.",
      href: "/apply",
    },
    {
      name: "Jumbo Loan",
      desc:
        "For those looking at higher-priced homes in Allen, a jumbo loan can finance properties exceeding conforming loan limits.",
      href: "/apply",
    },
    {
      name: "First-Time Buyer Programs",
      desc:
        "Explore various assistance programs available in Collin County to help make homeownership in Allen more accessible.",
      href: "/apply",
    },
    {
      name: "Refinance Options",
      desc:
        "Current Allen homeowners can explore refinancing to potentially lower their interest rate, reduce monthly payments, or access home equity.",
      href: "/apply",
    },
  ],
  faqs: [
    {
      q: "What is the average home price in Allen, TX?",
      a:
        "As of 2026, the median home price in Allen, TX, is approximately $430,000. This can vary based on neighborhood, home size, and specific features.",
    },
    {
      q: "How good are the schools in Allen, TX?",
      a:
        "Allen ISD is consistently ranked among the top school districts in Texas, known for its academic excellence, diverse extracurricular activities, and strong community support.",
    },
    {
      q: "Is the housing market competitive in Allen, TX?",
      a:
        "Allen's housing market is generally competitive due to its desirable location, excellent schools, and amenities. Properties often receive multiple offers, especially well-maintained homes in prime locations.",
    },
    {
      q: "Are there first-time home buyer programs available in Collin County for Allen residents?",
      a:
        "Yes, several first-time home buyer programs are available through state and local initiatives in Collin County, which can assist Allen residents with down payments and closing costs. It's recommended to consult with a mortgage professional to explore eligible options.",
    },
  ],
  nearbyLinks: [
    { city: "Plano", href: "/cities/plano" },
    { city: "McKinney", href: "/cities/mckinney" },
    { city: "Frisco", href: "/cities/frisco" },
    { city: "Celina", href: "/cities/celina" },
  ],
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://www.dfwhome.loans/#business",
    name: "DFW Homes & Loans",
    description:
      "DFW Homes & Loans (Tony Botchev, NMLS #114198, sponsored by Loan Factory Inc NMLS #320841)",
    telephone: "+19452945020",
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // Address not provided, leaving blank
      addressLocality: "Allen",
      addressRegion: "TX",
      postalCode: "", // Postal code not provided, leaving blank
      addressCountry: "US",
    },
    url: "https://www.dfwhome.loans/cities/allen-tx",
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

export default function AllenTXPage() {
  useSEO({
    title: `Allen TX Home Loans & Mortgages - DFW Homes & Loans`,
    description: data.tagline,
    canonical: `https://www.dfwhome.loans/cities/${data.slug}`,
    schema: schema as Record<string, unknown>[],
  });
  return <CityPageTemplate data={data} />;
}
