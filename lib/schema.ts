// ── USHI JSON-LD Structured Data ─────────────────────────────────────────────
// Spec: USHI AEO/SEO punch list 2026-06-18
// USHI is a NATIONAL product — no Texas geo targeting on the USHI brand/product.
// Frisco address appears ONLY on the parent NoFluff Marketing Organization block.

export const SITE_URL = "https://intel.nofluffmarketing.io";

// ── Organization ─────────────────────────────────────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "US Home Intelligence",
  url: SITE_URL,
  logo: `${SITE_URL}/ushi-logo-horizontal.png`,
  description:
    "Investment-grade neighborhood intelligence reports for any US zip code or address. 11 chapters, 40+ data sources, delivered in under one hour. Produced exclusively by NoFluff Marketing LLC.",
  areaServed: "US",
  availableLanguage: "English",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-940-394-5656",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "NoFluff Marketing LLC",
    url: "https://nofluffmarketing.io",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3333 Preston Rd Ste 300 #1570",
      addressLocality: "Frisco",
      addressRegion: "TX",
      postalCode: "75034",
      addressCountry: "US",
    },
  },
};

// ── Product — two Offer entries per spec ─────────────────────────────────────
export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product`,
  name: "US Home Intelligence Report",
  description:
    "Comprehensive 11-chapter neighborhood intelligence report covering market activity, schools, safety, walkability, economic indicators, development, climate risks, and comparable sales. Sourced from 40+ public and commercial data providers. Delivered as a PDF to your email in under one hour.",
  brand: {
    "@type": "Brand",
    name: "US Home Intelligence",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Zip-Tier Report",
      price: "97.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/buy`,
      description:
        "ZIP-code-aggregate neighborhood intelligence for any US zip code. 11 chapters covering market activity, school performance, safety index, walkability, economic indicators, development permits, and climate risks. Approximately 9,000 words, 40+ citations. Delivered to your email in under one hour.",
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 1,
        unitCode: "HUR",
      },
    },
    {
      "@type": "Offer",
      name: "Address-Tier Report",
      price: "147.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/buy`,
      description:
        "Address-specific intelligence layered on top of the full zip-tier base report. Includes comparable sales within 0.5 miles, parcel tax history, FEMA flood zone designation, HOA/PID/MUD overlay, and school attendance zone boundary for the specific address. Delivered to your email in under one hour.",
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 1,
        unitCode: "HUR",
      },
    },
  ],
};

// ── FAQPage — mirrors the visible FAQ accordion on /about ────────────────────
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/about#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this the same data Zillow or Redfin shows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Zillow and Redfin are listing platforms — they show you houses for sale. USHI shows you the neighborhood itself: crime trends, school performance, economic health, development activity, and market dynamics. These are two completely different things. A house can look great on Zillow while sitting in a neighborhood with declining school scores and rising vacancy. USHI shows you what the listing does not.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the data come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Public records, county assessor databases, MLS transaction data, US Census Bureau, state education departments, FBI Uniform Crime Reports, EPA environmental databases, and commercial walkability indices. We aggregate, normalize, and format it into a readable report — no data is invented or estimated.",
      },
    },
    {
      "@type": "Question",
      name: "How current is the data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Market activity data is updated monthly. School ratings and crime indices are updated annually following official release cycles. Economic indicators are updated quarterly. Every report shows the data vintage date so you know exactly how fresh each data point is.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a Zip Report and an Address Report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Zip Report ($97) covers the entire ZIP code — useful for comparing neighborhoods or evaluating a general area. The Address Report ($147) is hyperlocal — it pulls data for the specific address and the immediate surrounding radius, giving you the most precise picture of exactly where you are buying.",
      },
    },
    {
      "@type": "Question",
      name: "Who is this for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone making a significant decision tied to a specific location. Homebuyers who want to know what they are actually buying into. Investors evaluating a market. Families relocating who need to compare school districts. Business owners choosing a commercial location. If the address matters, the intelligence matters.",
      },
    },
    {
      "@type": "Question",
      name: "Is this financial or legal advice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. USHI reports are informational tools — they give you data to make a better-informed decision. They are not appraisals, investment recommendations, or legal opinions. We recommend using a USHI report alongside your own due diligence, a qualified real estate professional, and any other advisors relevant to your situation.",
      },
    },
  ],
};

// ── WebSite + SearchAction ────────────────────────────────────────────────────
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "US Home Intelligence",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/buy?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ── BreadcrumbList helpers — used per-page, not in global layout ──────────────
export function buyBreadcrumb() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/buy#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Order a Report",
        item: `${SITE_URL}/buy`,
      },
    ],
  };
}

export function aboutBreadcrumb() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/about#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How It Works",
        item: `${SITE_URL}/about`,
      },
    ],
  };
}

// ── HowTo — Order a USHI Report ──────────────────────────────────────────────
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}/#howto-order-report`,
  name: "How to Order a US Home Intelligence Report",
  description:
    "Order an investment-grade neighborhood intelligence report for any US address or zip code in four simple steps. Reports are delivered via email in under one hour.",
  totalTime: "PT1H",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    minValue: "97",
    maxValue: "147",
  },
  supply: [],
  tool: [],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter Target Address or ZIP Code",
      text: "On the order page, type the full US property address or ZIP code you want analyzed into the address search field.",
      url: `${SITE_URL}/buy`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Zip-Tier or Address-Tier Report",
      text: "Select your report tier: Zip-Tier Report at $97 for neighborhood-wide intelligence covering any US zip code, or Address-Tier Report at $147 for full parcel-level data including comparable sales within 0.5 miles, FEMA flood zone, parcel tax history, and school attendance zone.",
      url: `${SITE_URL}/buy`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Complete Secure Checkout",
      text: "Enter your payment details in our secure, PCI-compliant checkout. All major credit cards accepted. Your order is processed immediately upon payment confirmation.",
      url: `${SITE_URL}/buy`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Receive PDF Within 1 Hour via Email",
      text: "Your completed 11-chapter US Home Intelligence Report PDF is generated and delivered to your email address within one hour of purchase. Check your spam folder if it does not arrive.",
      url: `${SITE_URL}/buy`,
    },
  ],
};
