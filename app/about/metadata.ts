import type { Metadata } from "next"

const SITE_URL = "https://intel.nofluffmarketing.io"

export const metadata: Metadata = {
  title: "How US Home Intelligence Reports Work | 11 Chapters, 40+ Sources",
  description:
    "Every USHI report covers 11 chapters of neighborhood intelligence: market activity, schools, safety, walkability, economic indicators, development, climate risks, and more. 40+ public data sources. Delivered in under one hour for any US zip code or address.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "website",
    siteName: "US Home Intelligence",
    locale: "en_US",
    url: `${SITE_URL}/about`,
    title: "How US Home Intelligence Reports Work | 11 Chapters, 40+ Sources",
    description:
      "11 chapters of neighborhood intelligence from 40+ public data sources. Any US zip code or address. Delivered in under one hour.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "How US Home Intelligence Reports Work",
      },
    ],
  },
  twitter: {
    site: "@nofluffmkt",
    creator: "@nofluffmkt",
    card: "summary_large_image",
    title: "How US Home Intelligence Reports Work | 11 Chapters, 40+ Sources",
    description:
      "11 chapters of neighborhood intelligence from 40+ public data sources. Any US zip code or address. Delivered in under one hour.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
}
