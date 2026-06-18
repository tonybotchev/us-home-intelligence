import type { Metadata } from "next"

const SITE_URL = "https://intel.nofluffmarketing.io"

export const metadata: Metadata = {
  title: "US Home Intelligence | Neighborhood Reports for Any US Zip Code",
  description:
    "Investment-grade neighborhood intelligence for any US zip code or address. 11 chapters, 40+ data sources, delivered in under one hour. Zip-Tier $97 · Address-Tier $147.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    siteName: "US Home Intelligence",
    locale: "en_US",
    url: SITE_URL,
    title: "US Home Intelligence | Neighborhood Reports for Any US Zip Code",
    description:
      "Investment-grade neighborhood intelligence for any US zip code or address. 11 chapters, 40+ data sources, delivered in under one hour.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "US Home Intelligence — Neighborhood Reports for Any US Zip Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "US Home Intelligence | Neighborhood Reports for Any US Zip Code",
    description:
      "Investment-grade neighborhood intelligence for any US zip code or address. 11 chapters, 40+ data sources, delivered in under one hour.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
}
