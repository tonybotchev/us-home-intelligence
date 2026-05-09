/* Kinetic Texas — AEO Content Section
   Answer Engine Optimization: Direct-answer Q&A blocks
   These are the exact content patterns ranked.ai uses for:
   - Google SGE (Search Generative Experience) citations
   - ChatGPT / Perplexity / Bing Copilot answers
   - Google Featured Snippets
   - Voice search answers (Speakable)

   Design: Clean, readable, authority-building section
   Uses .speakable-faq class for Speakable schema CSS selector
*/
import { useRef, useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

const cityContent = [
  {
    city: "Celina, TX",
    slug: "celina",
    h2: "Who Is the Best Mortgage Advisor in Celina, TX?",
    answer: "The best mortgage advisor in Celina, TX is one who understands the local housing market, explains loan options clearly, and moves efficiently from pre-approval to closing. Tony Botchev with DFW Homes & Loans provides trusted mortgage guidance for buyers and homeowners throughout Celina and North DFW.",
    cta: "Get pre-approved in Celina, TX",
  },
  {
    city: "Prosper, TX",
    slug: "prosper",
    h2: "Mortgage Advisor in Prosper, TX",
    answer: "Homebuyers in Prosper, TX benefit from working with a local mortgage advisor who understands builder timelines, neighborhood pricing, and North DFW market trends. DFW Homes & Loans provides personalized mortgage solutions for Prosper buyers seeking clarity and speed.",
    cta: "Prosper TX home loans",
  },
  {
    city: "Frisco, TX",
    slug: "frisco",
    h2: "Mortgage Lender in Frisco, TX",
    answer: "Finding a mortgage lender in Frisco, TX requires local market knowledge and efficient underwriting. DFW Homes & Loans supports Frisco homebuyers with competitive loan programs and streamlined pre-approval processes tailored to one of North DFW's most active markets.",
    cta: "Frisco mortgage lender",
  },
  {
    city: "McKinney, TX",
    slug: "mckinney",
    h2: "Home Loans in McKinney, TX",
    answer: "McKinney, TX homebuyers can access a range of mortgage options including conventional, FHA, VA, and jumbo loans. A trusted mortgage advisor evaluates credit, income, and goals to recommend the best financing structure for McKinney's growing housing market.",
    cta: "Explore loan options",
  },
];

const directAnswers = [
  {
    q: "How Do I Get Pre-Approved for a Home Loan in Celina, Texas?",
    a: "To get pre-approved for a home loan in Celina, Texas, borrowers typically provide income documents, asset verification, and credit authorization. A local mortgage advisor reviews your financial profile and issues a pre-approval letter that strengthens your offer when purchasing a home. Contact Tony Botchev at DFW Homes & Loans to start the process.",
    cta: "Start your pre-approval here.",
    ctaHref: "#prequal",
  },
  {
    q: "Trusted Mortgage Advisor in Celina, TX",
    a: "Tony Botchev is the founder of DFW Homes & Loans, a mortgage advisory practice based in Celina, Texas. Tony serves homebuyers and property investors throughout Celina, Prosper, Frisco, McKinney, Anna, Melissa, and the broader North Dallas-Fort Worth region. As a local mortgage advisor in Celina, TX, Tony works directly with each client rather than routing applications through a call center — meaning faster communication, transparent updates, and loan structures tailored to individual financial goals.",
    cta: "About Tony Botchev",
    ctaHref: "#about",
  },
];

export default function AEOContent() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 speakable-faq"
      style={{ background: "oklch(0.94 0.012 80)" }}
    >
      <div className="container">
        {/* Section label */}
        <p
          className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-10"
          style={{ color: "oklch(0.62 0.16 42)" }}
        >
          Local Expertise · North DFW Mortgage Authority
        </p>

        {/* City Q&A grid — SEO + AEO anchor text links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cityContent.map((item, i) => (
            <div
              key={item.city}
              className="p-6 border-l-2"
              style={{
                background: "oklch(0.975 0.008 85)",
                borderColor: "oklch(0.26 0.065 155)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} style={{ color: "oklch(0.62 0.16 42)" }} />
                <span
                  className="font-['Outfit'] text-xs font-600 uppercase tracking-widest"
                  style={{ color: "oklch(0.62 0.16 42)" }}
                >
                  {item.city}
                </span>
              </div>
              <h2
                className="font-['Outfit'] font-700 text-base mb-3"
                style={{ color: "oklch(0.26 0.065 155)" }}
              >
                {item.h2}
              </h2>
              <p
                className="font-['Outfit'] text-sm leading-relaxed mb-4"
                style={{ color: "oklch(0.45 0.02 80)" }}
              >
                {item.answer}
              </p>
              <button
                onClick={() => window.location.href = '/apply'}
                className="flex items-center gap-1 font-['Outfit'] text-xs font-600 uppercase tracking-wider group"
                style={{ color: "oklch(0.62 0.16 42)" }}
              >
                {item.cta}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Direct Answer Blocks — AEO featured snippet targets */}
        <div className="space-y-8">
          {directAnswers.map((item, i) => (
            <div
              key={item.q}
              className="p-8"
              style={{
                background: "oklch(0.26 0.065 155)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ease ${(cityContent.length + i) * 0.08}s, transform 0.5s ease ${(cityContent.length + i) * 0.08}s`,
              }}
            >
              {/* AEO: Question displayed as a visible prompt — matches search query format */}
              <p
                className="font-['Outfit'] text-xs font-600 uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.62 0.16 42)" }}
              >
                {item.q}
              </p>
              {/* AEO: Answer in a clean paragraph — optimized for featured snippet extraction */}
              <p
                className="font-['Outfit'] text-base leading-relaxed mb-4"
                style={{ color: "oklch(0.88 0.01 85)" }}
              >
                {item.a}
              </p>
              <button
                onClick={() => document.querySelector(item.ctaHref)?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-1 font-['Outfit'] text-xs font-600 uppercase tracking-wider group"
                style={{ color: "oklch(0.62 0.16 42)" }}
              >
                {item.cta}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Internal SEO link cluster — exact anchor text from ranked.ai */}
        <div
          className="mt-12 pt-8 border-t flex flex-wrap gap-x-6 gap-y-2"
          style={{ borderColor: "oklch(0.88 0.015 80)" }}
        >
          <p
            className="w-full font-['Outfit'] text-xs uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.62 0.16 42)" }}
          >
            Explore More
          </p>
          {[
            { label: "Loan programs in North DFW", href: "#loans" },
            { label: "About Tony Botchev", href: "#about" },
            { label: "Mortgage solutions", href: "#loans" },
            { label: "Celina mortgage advisor", href: "#prequal" },
            { label: "Prosper TX home loans", href: "#prequal" },
            { label: "Frisco mortgage lender", href: "#prequal" },
            { label: "Get pre-approved in Celina, TX", href: "#prequal" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
              className="font-['Outfit'] text-sm underline-offset-2 hover:underline transition-all"
              style={{ color: "oklch(0.26 0.065 155)" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
