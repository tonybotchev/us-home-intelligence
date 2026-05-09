/* Kinetic Texas — About Tony Section
   Tony's real photo, asymmetric split layout
   Forest green background with diagonal cuts
   Rotating NMLS badge
*/
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

const TONY_PHOTO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663335597871/XWnvoWuu2r8GZzWNujZ6D6/tony-botchev_1acd5f43.jpg";

const credentials = [
  "Texas Licensed MLO",
  "Equal Housing Lender",
  "18+ Years Experience",
  "500+ Families Helped",
  "Celina & North DFW",
  "Loan Factory Sponsored",
];

const areas = ["Celina", "Prosper", "Frisco", "McKinney", "Anna", "Melissa", "Aubrey"];

export default function AboutTony() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden speakable-about"
      style={{ background: "oklch(0.26 0.065 155)" }}
    >
      {/* Diagonal top cut */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "80px", marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 L1440,80 L0,80 Z" fill="oklch(0.975 0.008 85)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(-40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Decorative frame */}
            <div
              className="absolute -top-4 -left-4 w-full h-full border-2"
              style={{ borderColor: "oklch(0.62 0.16 42 / 0.4)" }}
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img
                src={TONY_PHOTO}
                alt="Tony Botchev — Mortgage Advisor in Celina TX, sponsored by Loan Factory, Inc."
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{
                  background: "linear-gradient(to top, oklch(0.26 0.065 155), transparent)",
                }}
              />
            </div>

            {/* Rotating badge */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-28 md:h-28">
              <svg viewBox="0 0 120 120" className="w-full h-full badge-rotate">
                <defs>
                  <path id="circle" d="M 60,60 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>
                <circle cx="60" cy="60" r="55" fill="oklch(0.62 0.16 42)" />
                <text
                  className="font-['Outfit']"
                  style={{ fontSize: "9px", fill: "oklch(0.975 0.008 85)", fontWeight: 700, letterSpacing: "2px" }}
                >
                  <textPath href="#circle">
                    TEXAS LICENSED · EQUAL HOUSING LENDER · LOAN FACTORY ·
                  </textPath>
                </text>
                <circle cx="60" cy="60" r="8" fill="oklch(0.975 0.008 85)" />
              </svg>
            </div>

            {/* Experience tag */}
            <div
              className="absolute top-6 -right-4 px-4 py-3"
              style={{ background: "oklch(0.62 0.16 42)" }}
            >
              <div className="font-display text-3xl" style={{ color: "oklch(0.975 0.008 85)" }}>18+</div>
              <div className="font-['Outfit'] text-xs uppercase tracking-widest" style={{ color: "oklch(0.975 0.008 85 / 0.85)" }}>
                Years
              </div>
            </div>
          </div>

          {/* Text side */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <p
              className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              About Tony
            </p>
            <h2
              className="font-display leading-none mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "oklch(0.975 0.008 85)",
              }}
            >
              YOUR LOCAL
              <br />
              <span style={{ color: "oklch(0.62 0.16 42)" }}>NORTH DFW</span>
              <br />
              MORTGAGE EXPERT
            </h2>

            <p
              className="font-['Outfit'] text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.78 0.02 85)" }}
            >
              Since 2006, Tony Botchev has been the trusted mortgage advisor for families across Celina, Prosper, Frisco, and North DFW. With over 500 families helped and 18+ years of deep market knowledge, Tony brings clarity, speed, and zero pressure to every transaction.
            </p>
            <p
              className="font-['Outfit'] text-base leading-relaxed mb-8"
              style={{ color: "oklch(0.78 0.02 85)" }}
            >
              Unlike big-bank loan officers juggling hundreds of files, Tony personally reviews every application — meaning faster responses, smarter solutions, and a lender who actually knows your name.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="font-['Outfit'] text-xs font-600 uppercase tracking-wider px-3 py-1.5 border"
                  style={{
                    color: "oklch(0.975 0.008 85)",
                    borderColor: "oklch(0.975 0.008 85 / 0.3)",
                    background: "oklch(0.975 0.008 85 / 0.05)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Areas served */}
            <div className="mb-8">
              <p
                className="font-['Outfit'] text-xs uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.62 0.16 42)" }}
              >
                Areas Served
              </p>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => (
                  <span
                    key={area}
                    className="font-['Outfit'] text-sm"
                    style={{ color: "oklch(0.78 0.02 85)" }}
                  >
                    {area} TX
                    {area !== areas[areas.length - 1] && (
                      <span style={{ color: "oklch(0.62 0.16 42)", marginLeft: "0.5rem" }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.location.href = '/apply'}
                className="btn-primary-kt text-sm px-8 py-3"
              >
                <span className="flex items-center gap-2">
                  Work With Tony <ArrowRight size={14} />
                </span>
              </button>
              <a
                href="https://wa.me/19453708656"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-kt text-sm px-8 py-3"
                onClick={() => trackWhatsAppClick()}
              >
                💬 WhatsApp Tony
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal bottom cut */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "80px", marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,80 L1440,0 L1440,80 Z" fill="oklch(0.975 0.008 85)" />
        </svg>
      </div>
    </section>
  );
}
