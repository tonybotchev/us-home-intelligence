import type { MetadataRoute } from "next"

/**
 * Robots.txt for US Home Intelligence
 * Allows all crawlers, disallows API routes, points to sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/r/"],
      },
    ],
    sitemap: "https://intel.nofluffmarketing.io/sitemap.xml",
  }
}
