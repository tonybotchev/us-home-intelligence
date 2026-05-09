/* Kinetic Texas — Pre-Approval Info Section
   SEO content preserved, Texas home image background
*/
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const TEXAS_HOME = "https://d2xsxph8kpxj0f.cloudfront.net/310519663335597871/XWnvoWuu2r8GZzWNujZ6D6/texas-homes-PUEfKaCsyCPP7jL4d8wYjd.webp";

const points = [
  {
    title: "Why Pre-Approval Matters in Celina, TX",
    body: "A mortgage pre-approval confirms your borrowing capacity, helps you understand your price range, and signals to sellers that you are a qualified buyer. In a competitive market with new construction and limited inventory, a pre-approval letter from a local mortgage lender in Celina can make your offer stand out.",
  },
  {
    title: "What Documents Are Needed",
    body: "The pre-approval process begins with a consultation to review your financial goals, employment history, and credit profile. You will provide documentation such as pay stubs, W-2s, tax returns, and bank statements. A local lender familiar with Celina neighborhoods, builder timelines, and contract structures can guide you through exactly what is needed.",
  },
  {
    title: "How Long Pre-Approval Takes",
    body: "A local lender can often complete your mortgage pre-approval in Celina, TX within one to three business days. Unlike online lenders who may not understand North DFW pricing trends, a Celina-based advisor provides guidance tailored to this specific market. Working locally means faster communication and fewer delays.",
  },
  {
    title: "For First-Time Homebuyers in Celina, TX",
    body: "For a first-time home buyer in Celina, TX, the pre-approval process also serves as an educational opportunity. You will learn about loan programs including conventional, FHA, and VA options — each with different down payment requirements and qualification standards. Tony Botchev walks every buyer through these choices with clear explanations.",
  },
];

export default function PreApproval() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "oklch(0.975 0.008 85)" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image side */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src={TEXAS_HOME}
                alt="Modern farmhouse home in Celina Texas"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* Overlay tag */}
              <div
                className="absolute bottom-6 left-6 px-5 py-4"
                style={{ background: "oklch(0.26 0.065 155)" }}
              >
                <div className="font-display text-2xl" style={{ color: "oklch(0.975 0.008 85)" }}>
                  PRE-APPROVED
                </div>
                <div className="font-['Outfit'] text-xs uppercase tracking-widest" style={{ color: "oklch(0.62 0.16 42)" }}>
                  In As Little As 24 Hours
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 -z-10"
              style={{ background: "oklch(0.62 0.16 42 / 0.15)" }}
            />
          </div>

          {/* Content side */}
          <div
            ref={ref}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <p className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "oklch(0.62 0.16 42)" }}>
              Pre-Approval Process
            </p>
            <h2
              className="font-display leading-none mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "oklch(0.26 0.065 155)" }}
            >
              GET PRE-APPROVED
              <br />
              IN CELINA, TX —
              <br />
              <span style={{ color: "oklch(0.62 0.16 42)" }}>WHAT TO EXPECT</span>
            </h2>

            <div className="space-y-8">
              {points.map((pt, i) => (
                <div
                  key={pt.title}
                  className="border-l-2 pl-5"
                  style={{
                    borderColor: i === 0 ? "oklch(0.62 0.16 42)" : "oklch(0.88 0.015 80)",
                  }}
                >
                  <h3 className="font-['Outfit'] font-700 text-base mb-2" style={{ color: "oklch(0.26 0.065 155)" }}>
                    {pt.title}
                  </h3>
                  <p className="font-['Outfit'] text-sm leading-relaxed" style={{ color: "oklch(0.45 0.02 80)" }}>
                    {pt.body}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.href = '/apply'}
              className="btn-primary-kt text-sm px-8 py-3 mt-8"
            >
              <span className="flex items-center gap-2">
                Start Your Pre-Approval <ArrowRight size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
