/* Kinetic Texas — Process Section
   Numbered steps with connecting lines
   Alternating layout, animated on scroll
*/
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "15-minute call to understand your goals, timeline, and financial picture. Zero pressure, zero cost. Tony picks up — no call center.",
    icon: "📞",
  },
  {
    num: "02",
    title: "Pre-Approval",
    desc: "Verify income, credit, and assets. Get a pre-approval letter sellers respect — usually within 24 hours of submitting documents.",
    icon: "📋",
  },
  {
    num: "03",
    title: "Shop With Confidence",
    desc: "Your agent submits your offer backed by a pre-approval from a local lender. A real competitive edge in North DFW's fast market.",
    icon: "🏡",
  },
  {
    num: "04",
    title: "Processing & Underwriting",
    desc: "Tony manages the file, appraisal, and underwriting. You stay informed at every step — no silence, no surprises.",
    icon: "⚙️",
  },
  {
    num: "05",
    title: "Clear to Close",
    desc: "Docs signed, keys in hand. Tony walks you through everything before closing day so nothing catches you off guard.",
    icon: "🔑",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${isEven ? "" : "md:flex-row-reverse"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateX(${isEven ? "-30px" : "30px"})`,
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Number */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className="font-display text-8xl md:text-9xl leading-none select-none"
          style={{ color: "oklch(0.62 0.16 42 / 0.15)", WebkitTextStroke: "2px oklch(0.62 0.16 42 / 0.3)" }}
        >
          {step.num}
        </div>
      </div>

      {/* Connector line (desktop) */}
      <div
        className="hidden md:block flex-1 h-px"
        style={{ background: "linear-gradient(to right, oklch(0.62 0.16 42 / 0.4), transparent)" }}
      />

      {/* Card */}
      <div
        className="flex-shrink-0 w-full md:w-80 p-7 border-l-4 group hover:shadow-xl transition-shadow duration-300"
        style={{
          background: "oklch(0.975 0.008 85)",
          borderLeftColor: "oklch(0.62 0.16 42)",
        }}
      >
        <div className="text-3xl mb-3">{step.icon}</div>
        <h3
          className="font-display text-2xl mb-3"
          style={{ color: "oklch(0.26 0.065 155)" }}
        >
          {step.title}
        </h3>
        <p
          className="font-['Outfit'] text-sm leading-relaxed"
          style={{ color: "oklch(0.45 0.02 80)" }}
        >
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
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
    <section id="process" className="py-24 md:py-32" style={{ background: "oklch(0.94 0.012 80)" }}>
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <p
            className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4"
            style={{
              color: "oklch(0.62 0.16 42)",
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            The Process
          </p>
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
            FROM PRE-APPROVAL
            <br />
            <span style={{ color: "oklch(0.62 0.16 42)" }}>TO CLOSING KEYS</span>
          </h2>
          <div
            className="mt-6 h-px max-w-xs"
            style={{
              background: "linear-gradient(to right, oklch(0.26 0.065 155), transparent)",
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.3s",
            }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => window.location.href = '/apply'}
            className="btn-primary-kt text-base px-10 py-4"
          >
            <span className="flex items-center gap-2">
              Start Step 1 — Free Consultation <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
