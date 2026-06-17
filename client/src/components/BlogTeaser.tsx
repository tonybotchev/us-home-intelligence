/* Kinetic Texas — Blog Teaser
   Homepage section: 3 latest posts + "View All" CTA
*/
import { Link } from "wouter";
import { blogPosts } from "@/lib/blogData";

export default function BlogTeaser() {
  // Show first 3 posts (most recent by array order)
  const featured = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.13 0.045 155)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p
              className="font-['Outfit'] text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              DFW Mortgage Blog
            </p>
            <h2
              className="font-display text-3xl md:text-4xl leading-tight"
              style={{ color: "oklch(0.975 0.008 85)" }}
            >
              North Texas Home Buying Guides
            </h2>
            <p
              className="font-['Outfit'] text-sm mt-3 max-w-xl"
              style={{ color: "oklch(0.65 0.02 85)" }}
            >
              Straight-talk mortgage education for DFW buyers — no jargon, no rate quotes, just the information you need to make a confident move.
            </p>
          </div>
          <Link href="/blog">
            <span
              className="font-['Outfit'] font-600 text-sm uppercase tracking-widest whitespace-nowrap transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
              style={{ color: "oklch(0.975 0.008 85)" }}
            >
              View All Posts →
            </span>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div
                className="group flex flex-col h-full rounded-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
                style={{
                  background: "oklch(0.18 0.055 155)",
                  border: "1px solid oklch(0.975 0.008 85 / 0.08)",
                }}
              >
                {/* Image */}
                {post.image && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="font-['Outfit'] text-xs uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{
                        background: "oklch(0.62 0.16 42 / 0.15)",
                        color: "oklch(0.62 0.16 42)",
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="font-['Outfit'] text-xs"
                      style={{ color: "oklch(0.5 0.02 85)" }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-['Outfit'] font-700 text-base leading-snug mb-3 group-hover:text-[oklch(0.62_0.16_42)] transition-colors"
                    style={{ color: "oklch(0.975 0.008 85)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="font-['Outfit'] text-sm leading-relaxed flex-1 line-clamp-3"
                    style={{ color: "oklch(0.65 0.02 85)" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid oklch(0.975 0.008 85 / 0.08)" }}>
                    <span
                      className="font-['Outfit'] text-xs uppercase tracking-widest group-hover:text-[oklch(0.62_0.16_42)] transition-colors"
                      style={{ color: "oklch(0.5 0.02 85)" }}
                    >
                      Read Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
