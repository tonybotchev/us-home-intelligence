import type { MetadataRoute } from "next"

/**
 * Robots.txt for US Home Intelligence
 * Allows all crawlers. Disallows only internal API routes.
 * Public report share pages (/r/[slug]) are allowed for indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://intel.nofluffmarketing.io/sitemap.xml",
  }
}
