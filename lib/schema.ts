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
