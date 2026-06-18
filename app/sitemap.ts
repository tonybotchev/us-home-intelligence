import type { MetadataRoute } from "next"

/**
 * Sitemap for US Home Intelligence
 * All URLs use HTTPS, no trailing slash — matching canonical tags.
 * Updated: 2026-06-18
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://intel.nofluffmarketing.io"
  const lastMod = new Date("2026-06-18")

  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/buy`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/realtor`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/realtor/dashboard`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
