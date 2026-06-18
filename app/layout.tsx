import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://intel.nofluffmarketing.io"),
  title: {
    default: "US Home Intelligence | Investment-Grade Neighborhood Reports",
    template: "%s | US Home Intelligence",
  },
  description:
    "Investment-grade neighborhood intelligence. Any US address. Delivered in under an hour. Produced exclusively by NoFluff Marketing LLC.",
  alternates: {
    canonical: "https://intel.nofluffmarketing.io",
  },
  openGraph: {
    title: "US Home Intelligence | Investment-Grade Neighborhood Reports",
    description:
      "Investment-grade neighborhood intelligence. Any US address. Delivered in under an hour.",
    url: "https://intel.nofluffmarketing.io",
    siteName: "US Home Intelligence",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://intel.nofluffmarketing.io/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "US Home Intelligence — Investment-Grade Neighborhood Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nofluffmkt",
    creator: "@nofluffmkt",
    title: "US Home Intelligence | Investment-Grade Neighborhood Reports",
    description:
      "Investment-grade neighborhood intelligence. Any US address. Delivered in under an hour.",
    images: ["https://intel.nofluffmarketing.io/og-image.jpg"],
  },
  // No geo meta — USHI is a national product, Texas targeting suppresses national surface
};

import { organizationSchema, websiteSchema, productSchema, faqSchema, howToSchema } from "@/lib/schema";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data — Phase 1.5 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
        {children}
        <script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a2b31c595a221ced514bd8f"
          data-source="WEB_USER"
          data-active="true"
          async
        />
      </body>
    </html>
  );
}
