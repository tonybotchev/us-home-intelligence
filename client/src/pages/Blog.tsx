/**
 * DESIGN SYSTEM: Kinetic Texas — Bold geometric Swiss typography meets Texas energy
 * Palette: Warm cream (#FAF7F2), Deep forest green, Burnt orange accent (#C4521A)
 * Typography: Bebas Neue (display) + Outfit (body)
 * Layout: Asymmetric, editorial, diagonal accents
 */

import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts, categoryColors } from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";

export default function Blog() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  useSEO({
    title: "Mortgage Blog | DFW Homes & Loans — North DFW Tips & Guides",
    description: "Expert mortgage tips, DFW market updates, and homebuyer guides from Tony Botchev at DFW Homes & Loans. Serving Celina, Prosper, Frisco, McKinney and North Texas.",
    canonical: "https://www.dfwhome.loans/blog",
  });

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.975 0.008 85)" }}>
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "DFW Homes & Loans — Mortgage Insights",
            description:
              "Expert mortgage advice for North DFW homebuyers and investors. Market updates, loan education, and local real estate insights from Tony Botchev.",
            url: "https://www.dfwhome.loans/blog",
            publisher: {
              "@type": "Organization",
              name: "DFW Homes & Loans",
              url: "https://www.dfwhome.loans",
            },
            blogPost: blogPosts.map((p) => p.schema),
          }),
        }}
      />

      <Navbar />

      {/* Page Header */}
      <section
        className="pt-32 pb-16 px-6"
        style={{ background: "oklch(0.18 0.02 85)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-1 w-12"
              style={{ background: "oklch(0.62 0.16 42)" }}
            />
            <span
              className="font-['Outfit'] text-sm font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              Mortgage Insights
            </span>
          </div>
          <h1
            className="font-display text-6xl md:text-8xl leading-none mb-4"
            style={{ color: "oklch(0.975 0.008 85)" }}
          >
            THE BLOG
          </h1>
          <p
            className="font-['Outfit'] text-lg max-w-xl"
            style={{ color: "oklch(0.65 0.02 85)" }}
          >
            Real talk on DFW mortgages, market conditions, and how to get the
            best loan for your situation. No fluff.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid md:grid-cols-2 gap-0 overflow-hidden"
            style={{ borderRadius: "4px" }}
          >
            <div className="relative h-72 md:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <span
                className="absolute top-4 left-4 font-['Outfit'] text-xs font-bold tracking-widest uppercase px-3 py-1"
                style={{
                  background: "oklch(0.62 0.16 42)",
                  color: "white",
                  borderRadius: "2px",
                }}
              >
                Featured
              </span>
            </div>
            <div
              className="p-10 flex flex-col justify-between"
              style={{ background: "oklch(0.18 0.02 85)" }}
            >
              <div>
                <span
                  className={`inline-block font-['Outfit'] text-xs font-bold tracking-widest uppercase px-3 py-1 mb-4 ${
                    categoryColors[featured.category]
                  }`}
                  style={{ borderRadius: "2px" }}
                >
                  {featured.category}
                </span>
                <h2
                  className="font-display text-3xl md:text-4xl leading-tight mb-4"
                  style={{ color: "oklch(0.975 0.008 85)" }}
                >
                  {featured.title}
                </h2>
                <p
                  className="font-['Outfit'] text-sm leading-relaxed mb-6"
                  style={{ color: "oklch(0.65 0.02 85)" }}
                >
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-4 font-['Outfit'] text-xs"
                  style={{ color: "oklch(0.55 0.02 85)" }}
                >
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>
                <Link href={`/blog/${featured.slug}`}>
                  <button
                    className="flex items-center gap-2 font-['Outfit'] text-sm font-semibold tracking-wide transition-all hover:gap-3"
                    style={{ color: "oklch(0.62 0.16 42)" }}
                  >
                    Read Article <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden flex flex-col"
                style={{
                  background: "white",
                  borderRadius: "4px",
                  border: "1px solid oklch(0.92 0.004 286.32)",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`font-['Outfit'] text-xs font-bold tracking-widest uppercase px-2 py-0.5 ${
                        categoryColors[post.category]
                      }`}
                      style={{ borderRadius: "2px" }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h3
                    className="font-display text-xl leading-tight mb-3 flex-1"
                    style={{ color: "oklch(0.18 0.02 85)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="font-['Outfit'] text-sm leading-relaxed mb-4"
                    style={{ color: "oklch(0.45 0.015 85)" }}
                  >
                    {post.excerpt.slice(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div
                      className="flex items-center gap-3 font-['Outfit'] text-xs"
                      style={{ color: "oklch(0.55 0.02 85)" }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <button
                        className="flex items-center gap-1 font-['Outfit'] text-xs font-semibold transition-all hover:gap-2"
                        style={{ color: "oklch(0.62 0.16 42)" }}
                      >
                        Read <ArrowRight size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-16 p-10 text-center"
            style={{
              background: "oklch(0.18 0.02 85)",
              borderRadius: "4px",
            }}
          >
            <h3
              className="font-display text-4xl mb-3"
              style={{ color: "oklch(0.975 0.008 85)" }}
            >
              READY TO GET PRE-QUALIFIED?
            </h3>
            <p
              className="font-['Outfit'] text-sm mb-6"
              style={{ color: "oklch(0.65 0.02 85)" }}
            >
              Stop reading about mortgages and start getting one. Takes 5 minutes.
            </p>
            <Link href="/apply">
              <button
                className="font-['Outfit'] font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all hover:opacity-90"
                style={{
                  background: "oklch(0.62 0.16 42)",
                  color: "white",
                  borderRadius: "2px",
                }}
              >
                Get Pre-Qualified Free →
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
