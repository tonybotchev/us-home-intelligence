import type { Metadata } from "next"

const SITE_URL = "https://intel.nofluffmarketing.io"

export const metadata: Metadata = {
  title: "Order a Neighborhood Intelligence Report | US Home Intelligence",
  description: "Order your investment-grade neighborhood intelligence report. Zip-level ($97) or address-specific ($147). Delivered in under an hour. Covers AVM, schools, crime, climate, and comparable sales.",
  alternates: { canonical: `${SITE_URL}/buy` },
  openGraph: {
    type: "website",
    siteName: "US Home Intelligence",
    locale: "en_US",
    url: `${SITE_URL}/buy`,
    title: "Order a Neighborhood Intelligence Report",
    description: "Zip-level ($97) or address-specific ($147). Delivered in under an hour.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Order US Home Intelligence Report" }],
  },
  twitter: {
    site: "@nofluffmkt",
    creator: "@nofluffmkt",
    card: "summary_large_image",
    title: "Order a Neighborhood Intelligence Report",
    description: "Zip-level ($97) or address-specific ($147). Delivered in under an hour.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
}
