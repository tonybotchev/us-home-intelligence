import type { Metadata } from "next"

const SITE_URL = "https://intel.nofluffmarketing.io"

export const metadata: Metadata = {
  title: "Realtor Partner Program | Cobranded Reports | US Home Intelligence",
  description: "Join the US Home Intelligence Realtor Partner Program. Get cobranded neighborhood reports at 20% off, a free welcome report, and no subscription required. Per-order pricing only.",
  alternates: { canonical: `${SITE_URL}/realtor` },
  openGraph: {
    type: "website",
    siteName: "US Home Intelligence",
    locale: "en_US",
    url: `${SITE_URL}/realtor`,
    title: "Realtor Partner Program — Cobranded Reports",
    description: "Cobranded neighborhood reports at 20% off. Free welcome report. No subscription. Per-order pricing.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "US Home Intelligence Realtor Partner Program" }],
  },
  twitter: {
    site: "@nofluffmkt",
    creator: "@nofluffmkt",
    card: "summary_large_image",
    title: "Realtor Partner Program — Cobranded Reports",
    description: "Cobranded neighborhood reports at 20% off. Free welcome report. No subscription.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
}
