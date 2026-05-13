/* Kinetic Texas — Loan Programs
   Flip cards revealing details on hover
   Forest green section with diagonal cuts
*/
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";

const loans = [
  {
    icon: "🏡",
    title: "Conventional",
    tag: "3–20% Down",
    tagColor: "oklch(0.62 0.16 42)",
    summary: "Flexible down payment options, competitive rates, and no upfront mortgage insurance premium for qualified buyers.",
    details: [
      "As low as 3% down payment",
      "No upfront MIP",
      "Competitive interest rates",
      "Ideal for strong credit profiles",
      "Conforming & high-balance options",
    ],
    cta: "Explore Conventional",
  },
  {
    icon: "🏛️",
    title: "FHA Loans",
    tag: "3.5% Down",
    tagColor: "oklch(0.52 0.14 200)",
    summary: "Government-backed loans designed for buyers with lower down payments or credit scores working toward stronger profiles.",
    details: [
      "3.5% down with 580+ credit score",
      "Flexible qualification standards",
      "Great for first-time buyers",
      "Seller can contribute to closing costs",
      "Fixed & adjustable rate options",
    ],
    cta: "Explore FHA",
  },
  {
    icon: "⭐",
    title: "VA Loans",
    tag: "0% Down",
    tagColor: "oklch(0.55 0.12 155)",
    summary: "Exclusive benefit for active-duty military, veterans, and eligible surviving spouses. No PMI, no down payment required.",
    details: [
      "Zero down payment required",
      "No private mortgage insurance",
      "Competitive VA interest rates",
      "Flexible credit requirements",
      "Available for purchase & refinance",
    ],
    cta: "Explore VA",
  },
  {
    icon: "🏙️",
    title: "Jumbo Loans",
    tag: "Luxury Market",
    tagColor: "oklch(0.48 0.12 290)",
    summary: "Financing above conventional loan limits for high-value properties in Frisco, Prosper, and North Dallas.",
    details: [
      "Loan amounts above $766,550",
      "Competitive jumbo rates",
      "Frisco, Prosper & North Dallas",
      "Various term options",
      "Primary & second home eligible",
    ],
    cta: "Explore Jumbo",
  },
  {
    icon: "📈",
    title: "DSCR Investor",
    tag: "No W-2 Required",
    tagColor: "oklch(0.62 0.16 42)",
    summary: "Qualify based on the property's rental income, not your personal tax returns. Ideal for landlords and portfolio builders.",
    details: [
      "Qualify on rental income only",
      "No personal tax returns needed",
      "Short-term & long-term rentals",
      "Portfolio expansion friendly",
      "LLC ownership eligible",
    ],
    cta: "Explore DSCR",
  },
  {
    icon: "🔄",
    title: "Refinance",
    tag: "Lower Your Rate",
    tagColor: "oklch(0.52 0.17 38)",
    summary: "Rate-and-term or cash-out refinancing to reduce your payment, shorten your term, or tap into your equity.",
    details: [
      "Rate-and-term refinance",
      "Cash-out up to 80% LTV",
      "Shorten your loan term",
      "Consolidate debt",
      "Access built-up equity",
    ],
    cta: "Explore Refi",
  },
];

function LoanCard({ loan, index }: { loan: typeof loans[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    window.location.href = '/apply';
  };

  return (
    <div
      ref={ref}
      className="card-flip-container h-64"
      onClick={() => isMobile && setFlipped((f) => !f)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      <div className={`card-flip-inner${isMobile && flipped ? " flipped" : ""}`}>
        {/* Front */}
        <div
          className="card-flip-front rounded-none p-7 flex flex-col justify-between border"
          style={{
            background: "oklch(0.975 0.008 85)",
            borderColor: "oklch(0.88 0.015 80)",
          }}
        >
          <div>
            <div className="text-4xl mb-4">{loan.icon}</div>
            <h3
              className="font-display text-3xl mb-2"
              style={{ color: "oklch(0.26 0.065 155)" }}
            >
              {loan.title}
            </h3>
            <p
              className="font-['Outfit'] text-sm leading-relaxed"
              style={{ color: "oklch(0.45 0.02 80)" }}
            >
              {loan.summary}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span
              className="font-['Outfit'] text-xs font-700 uppercase tracking-widest px-3 py-1"
              style={{
                background: `${loan.tagColor}18`,
                color: loan.tagColor,
                border: `1px solid ${loan.tagColor}40`,
              }}
            >
              {loan.tag}
            </span>
            <span
              className="font-['Outfit'] text-xs uppercase tracking-widest"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              {isMobile ? "Tap for details →" : "Hover for details →"}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="card-flip-back rounded-none p-7 flex flex-col justify-between"
          style={{ background: "oklch(0.26 0.065 155)" }}
        >
          <div>
            <h3
              className="font-display text-3xl mb-4"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              {loan.title}
            </h3>
            <ul className="space-y-2">
              {loan.details.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 font-['Outfit'] text-sm"
                  style={{ color: "oklch(0.88 0.01 85)" }}
                >
                  <span style={{ color: "oklch(0.62 0.16 42)" }}>✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 font-['Outfit'] font-700 text-sm uppercase tracking-widest mt-4 group"
            style={{ color: "oklch(0.62 0.16 42)" }}
          >
            {loan.cta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoanPrograms() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="loans" className="py-24 md:py-32" style={{ background: "oklch(0.975 0.008 85)" }}>
      <div className="container">
        {/* Section header */}
        <div ref={titleRef} className="mb-16">
          <p
            className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4"
            style={{
              color: "oklch(0.62 0.16 42)",
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            Loan Programs
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-display leading-none"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: "oklch(0.26 0.065 155)",
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? "none" : "translateY(30px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              MORTGAGE SOLUTIONS
              <br />
              <span style={{ color: "oklch(0.62 0.16 42)" }}>FOR EVERY BUYER</span>
            </h2>
            <p
              className="font-['Outfit'] text-base max-w-sm"
              style={{
                color: "oklch(0.45 0.02 80)",
                opacity: titleVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}
            >
              From first-time buyers in Celina to seasoned investors building portfolios across Collin County — I match the right program to your goals.
            </p>
          </div>
          {/* Divider line */}
          <div
            className="mt-8 h-px"
            style={{
              background: "linear-gradient(to right, oklch(0.26 0.065 155), oklch(0.62 0.16 42), transparent)",
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.4s",
            }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "oklch(0.88 0.015 80)" }}>
          {loans.map((loan, i) => (
            <LoanCard key={loan.title} loan={loan} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => window.location.href = '/apply'}
            className="btn-primary-kt text-base px-10 py-4"
          >
            <span className="flex items-center gap-2">
              Start My Pre-Approval <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
