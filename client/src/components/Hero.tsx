/* Kinetic Texas — Hero Section
   Full-bleed aerial Texas neighborhood background
   Oversized stacked Bebas Neue headline with word-by-word reveal
   Diagonal bottom cut into next section
*/
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663335597871/XWnvoWuu2r8GZzWNujZ6D6/hero-bg-kY8xHYiRAvj6YQMU4weL7q.webp";

const words = ["YOUR", "HOME", "LOAN,", "DONE", "RIGHT."];

export default function Hero() {
  const [visibleWords, setVisibleWords] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleWords(i);
      if (i >= words.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    window.location.href = '/apply';
  };

  const scrollToBooking = () => {
    document.querySelector("#book-call")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { value: "18+", label: "Years in Lending" },
    { value: "500+", label: "Families Helped" },
    { value: "24h", label: "Pre-Approval" },
    { value: "6", label: "Loan Programs" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden speakable-hero">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="North DFW luxury neighborhood aerial view"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.18 0.055 155 / 0.92) 0%, oklch(0.18 0.055 155 / 0.75) 55%, oklch(0.18 0.055 155 / 0.4) 100%)",
          }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-['Outfit'] font-600 uppercase tracking-widest border"
            style={{
              color: "oklch(0.62 0.16 42)",
              borderColor: "oklch(0.62 0.16 42 / 0.5)",
              background: "oklch(0.62 0.16 42 / 0.08)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "oklch(0.62 0.16 42)" }}
            />
            Serving Celina · Prosper · Frisco · North DFW
          </div>

          {/* Headline */}
          <h1 className="font-display leading-none mb-2">
            <div className="overflow-hidden">
              {words.slice(0, 3).map((word, i) => (
                <span
                  key={word}
                  className="word-reveal inline-block mr-4"
                  style={{
                    fontSize: "clamp(4rem, 10vw, 9rem)",
                    color: "oklch(0.975 0.008 85)",
                    animationDelay: `${i * 0.12}s`,
                    opacity: visibleWords > i ? 1 : 0,
                    transform: visibleWords > i ? "none" : "translateY(40px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="overflow-hidden mt-1">
              {words.slice(3).map((word, i) => (
                <span
                  key={word}
                  className="inline-block mr-4"
                  style={{
                    fontSize: "clamp(4rem, 10vw, 9rem)",
                    color: i === 0 ? "oklch(0.975 0.008 85)" : "oklch(0.62 0.16 42)",
                    opacity: visibleWords > i + 3 ? 1 : 0,
                    transform: visibleWords > i + 3 ? "none" : "translateY(40px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    transitionDelay: `${(i + 3) * 0.12}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </h1>

          {/* Subheadline */}
          <p
            className="font-['Outfit'] text-lg md:text-xl max-w-xl mt-6 mb-10 leading-relaxed"
            style={{
              color: "oklch(0.88 0.01 85)",
              opacity: visibleWords >= words.length ? 1 : 0,
              transform: visibleWords >= words.length ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s",
            }}
          >
            Tony Botchev has helped North DFW families navigate mortgages since 2006. Conventional, FHA, VA, Jumbo, and DSCR — personalized for your goals.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-14"
            style={{
              opacity: visibleWords >= words.length ? 1 : 0,
              transform: visibleWords >= words.length ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.9s, transform 0.6s ease 0.9s",
            }}
          >
            <a href="/apply" className="btn-primary-kt text-base px-8 py-4">
              <span className="flex items-center gap-2">
                Get Pre-Qualified Free <ArrowRight size={16} />
              </span>
            </a>
            <a
              href="tel:+19453708656"
              className="btn-outline-kt text-base px-8 py-4"
              onClick={() => trackPhoneClick()}
            >
              ☎ (945) 370-8656
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap gap-6"
            style={{
              opacity: visibleWords >= words.length ? 1 : 0,
              transition: "opacity 0.6s ease 1.1s",
            }}
          >
            {[
              { icon: <Shield size={14} />, text: "Texas Licensed Mortgage Advisor" },
              { icon: <Zap size={14} />, text: "NMLS #114198" },
              { icon: <Clock size={14} />, text: "24h Pre-Approval" },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 font-['Outfit'] text-xs font-500 uppercase tracking-widest"
                style={{ color: "oklch(0.88 0.01 85)" }}
              >
                <span style={{ color: "oklch(0.62 0.16 42)" }}>{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="relative z-10"
        style={{ background: "oklch(0.62 0.16 42)" }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-6 md:py-8 border-r last:border-r-0 border-white/20"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "none" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                <span
                  className="font-display text-4xl md:text-5xl"
                  style={{ color: "oklch(0.975 0.008 85)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-['Outfit'] text-xs uppercase tracking-widest mt-1"
                  style={{ color: "oklch(0.975 0.008 85 / 0.8)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Diagonal bottom cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 z-20"
        style={{ background: "oklch(0.975 0.008 85)" }}
      >
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          style={{ transform: "scaleY(-1)" }}
        >
          <path d="M0,0 L1440,64 L1440,64 L0,64 Z" fill="oklch(0.975 0.008 85)" />
        </svg>
      </div>
    </section>
  );
}
