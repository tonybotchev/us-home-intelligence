import type { MetadataRoute } from "next"

/**
 * Robots.txt for US Home Intelligence
 * USHI is a NATIONAL, CONSUMER-ONLY product.
 * Realtor partner program is deprecated — block from indexing.
 * Updated: 2026-06-18 (consumer-only scope lock)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/realtor", "/r/"],
      },
    ],
    sitemap: "https://intel.nofluffmarketing.io/sitemap.xml",
  }
}
