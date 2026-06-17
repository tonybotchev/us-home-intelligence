export const SITE_URL = "https://intel.nofluffmarketing.io";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "US Home Intelligence",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: "Investment-grade neighborhood intelligence. Any US address. Delivered in under an hour. Produced exclusively by NoFluff Marketing LLC.",
  parentOrganization: {
    "@type": "Organization",
    name: "NoFluff Marketing LLC",
    url: "https://nofluffmarketing.io"
  }
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "US Home Intelligence Report",
  description: "Comprehensive 11-chapter neighborhood intelligence report covering AVM, schools, crime, climate risks, and comparable sales.",
  brand: {
    "@type": "Brand",
    name: "US Home Intelligence"
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "97.00",
    highPrice: "147.00",
    offerCount: "2",
    offers: [
      {
        "@type": "Offer",
        name: "Zip-Level Report",
        price: "97.00",
        priceCurrency: "USD"
      },
      {
        "@type": "Offer",
        name: "Address-Specific Report",
        price: "147.00",
        priceCurrency: "USD"
      }
    ]
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast is the US Home Intelligence report delivered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The report is typically delivered in under an hour."
      }
    },
    {
      "@type": "Question",
      name: "What is included in the address-specific report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The address-specific report includes a full 11-chapter deep-dive with property-specific data, parcel-level AVM, comparable sales, FEMA flood zone, and school attendance zone."
      }
    }
  ]
};

// ── HowTo — Order a USHI Report ──────────────────────────────────────────────
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://intel.nofluffmarketing.io/#howto-order-report",
  name: "How to Order a US Home Intelligence Report",
  description:
    "Order an investment-grade neighborhood intelligence report for any US address in four simple steps. Reports are delivered via email in under one hour.",
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
      name: "Enter Target Address",
      text: "On the order page, type the full US property address or ZIP code you want analyzed into the address search field.",
      url: "https://intel.nofluffmarketing.io/buy",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Zip or Address Tier",
      text: "Select your report tier: Zip-Level Report at $97 for neighborhood-wide intelligence, or Address-Specific Report at $147 for full parcel-level data including property AVM, FEMA flood zone, and school attendance zone.",
      url: "https://intel.nofluffmarketing.io/buy",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Complete Checkout via Stripe",
      text: "Enter your payment details in the secure Stripe checkout. All major credit cards accepted. Your order is processed immediately upon payment confirmation.",
      url: "https://intel.nofluffmarketing.io/buy",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Receive PDF Within 1 Hour via Email",
      text: "Your completed 11-chapter US Home Intelligence Report PDF is generated and delivered to your email address within one hour of purchase. Check your spam folder if it does not arrive.",
      url: "https://intel.nofluffmarketing.io/buy",
    },
  ],
};
