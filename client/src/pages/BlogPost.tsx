/**
 * DESIGN SYSTEM: Kinetic Texas — Bold geometric Swiss typography meets Texas energy
 * Palette: Warm cream (#FAF7F2), Deep forest green, Burnt orange accent (#C4521A)
 * Typography: Bebas Neue (display) + Outfit (body)
 */
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts, categoryColors } from "@/lib/blogData";
import { ArrowLeft, Calendar, Clock, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Build enhanced Article schema (W4)
  const articleSchema = post
    ? {
        ...post.schema,
        "@type": "BlogPosting",
        author: {
          "@type": "Person",
          "@id": "https://www.dfwhome.loans/#tony",
          name: "Tony Botchev",
          identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" },
          sameAs: "https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198",
        },
        publisher: {
          "@type": "Organization",
          "@id": "https://www.dfwhome.loans/#business",
          name: "DFW Homes & Loans",
          logo: { "@type": "ImageObject", url: "https://www.dfwhome.loans/logo.png" },
        },
        image: post.image,
        datePublished: post.schema.datePublished,
        dateModified: post.schema.dateModified || post.schema.datePublished,
        headline: post.title,
        mainEntityOfPage: `https://www.dfwhome.loans/blog/${post.slug}`,
      }
    : undefined;

  // Build FAQ schema
  const faqSchema = post?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : undefined;

  const combinedSchema = post
    ? faqSchema
      ? [articleSchema, faqSchema]
      : [articleSchema]
    : undefined;

  useSEO({
    title: post?.seoTitle || "Blog | DFW Homes & Loans",
    description: post?.seoDescription || post?.excerpt || "",
    canonical: post ? `https://www.dfwhome.loans/blog/${post.slug}` : undefined,
    ogImage: post?.image,
    ogType: "article",
    schema: combinedSchema as Record<string, unknown>[],
    noIndex: !post,
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="font-bebas text-6xl text-[#1B2B1A] mb-4">POST NOT FOUND</h1>
          <p className="text-[#4A5568] mb-8">
            This article may have moved or been updated. Browse all articles below.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors"
          >
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B1A]/80 via-[#1B2B1A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                  categoryColors[post.category] || "bg-gray-100 text-gray-800"
                }`}
              >
                {post.category}
              </span>
              <h1 className="font-bebas text-3xl md:text-5xl text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <div className="bg-[#1B2B1A] text-white/80 text-sm">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-4">
          <Link href="/blog" className="flex items-center gap-1 hover:text-[#C4521A] transition-colors">
            <ArrowLeft size={14} /> All Articles
          </Link>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={14} /> {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        {/* Excerpt lead */}
        <p className="text-lg text-[#4A5568] font-medium leading-relaxed mb-8 border-l-4 border-[#C4521A] pl-4">
          {post.excerpt}
        </p>

        {/* Full content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bebas prose-headings:tracking-wide prose-headings:text-[#1B2B1A]
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-[#374151] prose-p:leading-relaxed
            prose-a:text-[#C4521A] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#1B2B1A]
            prose-ul:text-[#374151] prose-li:my-1
            prose-table:text-sm prose-th:bg-[#1B2B1A] prose-th:text-white prose-th:p-2
            prose-td:p-2 prose-td:border prose-td:border-gray-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Inline mid-article CTA — W2 */}
        <div className="my-10 p-6 bg-[#1B2B1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bebas text-xl text-white">Ready to See What You Qualify For?</p>
            <p className="font-['Outfit'] text-sm text-white/70">No hard credit pull. Under 3 minutes.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="/apply" className="bg-[#C4521A] text-white px-6 py-2.5 font-semibold font-['Outfit'] text-sm hover:bg-[#A8431A] transition-colors text-center whitespace-nowrap">
              Get Pre-Qualified Free →
            </a>
            <a href="tel:+19452945020" className="border border-white/30 text-white px-6 py-2.5 font-semibold font-['Outfit'] text-sm hover:bg-white/10 transition-colors text-center whitespace-nowrap">
              Call NOVA: 945-294-5020
            </a>
          </div>
        </div>

        {/* Compliance footer */}
        <div className="mt-12 p-4 bg-[#1B2B1A]/5 border border-[#1B2B1A]/10 text-xs text-[#6B7280] leading-relaxed">
          <strong>Disclosure:</strong> Tony Botchev, NMLS #114198, is a licensed mortgage loan
          originator sponsored by Loan Factory, Inc. NMLS #320841. This article is for
          informational purposes only and does not constitute a commitment to lend. Loan programs,
          rates, and terms are subject to change without notice. Equal Housing Lender.
        </div>
      </article>

      {/* FAQ Section */}
      {post.faq && post.faq.length > 0 && (
        <section className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="font-bebas text-3xl text-[#1B2B1A] mb-6">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="space-y-3">
              {post.faq.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-[#1B2B1A] hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.q}</span>
                    {openFaq === i ? <ChevronUp size={18} className="shrink-0 text-[#C4521A]" /> : <ChevronDown size={18} className="shrink-0 text-gray-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-[#4A5568] text-sm leading-relaxed border-t border-gray-100">
                      <p className="pt-3">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#1B2B1A] py-12">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-3xl md:text-4xl text-white mb-3">
            READY TO TAKE THE NEXT STEP?
          </h2>
          <p className="text-white/70 mb-6">
            Get pre-approved in as little as 24 hours. No hard credit pull to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/apply"
              className="bg-[#C4521A] text-white px-8 py-3 font-semibold hover:bg-[#A8431A] transition-colors"
            >
              Get Pre-Qualified Free →
            </Link>
            <a
              href="tel:+19452945020"
              className="border border-white/30 text-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              Call NOVA: 945-294-5020
            </a>
          </div>
          <p className="text-white/40 text-xs mt-4">
            Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender
          </p>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-[#FAF7F2]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <h2 className="font-bebas text-3xl text-[#1B2B1A] mb-6">MORE ARTICLES</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                  <div className="overflow-hidden mb-3">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[related.category] || "bg-gray-100 text-gray-700"}`}>
                    {related.category}
                  </span>
                  <h3 className="font-semibold text-[#1B2B1A] mt-2 text-sm leading-snug group-hover:text-[#C4521A] transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">{related.date} · {related.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FloatingCTA />
    </div>
  );
}
