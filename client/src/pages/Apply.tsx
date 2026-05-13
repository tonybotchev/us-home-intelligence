/**
 * DESIGN SYSTEM: Kinetic Texas
 * Page: /apply/ — GHL Pre-Qualification Form
 * W1: /apply/ page rebuild
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import NMLSDisclosure from "@/components/NMLSDisclosure";
import { useSEO } from "@/hooks/useSEO";
import { Shield, Clock, CheckCircle, Phone } from "lucide-react";

const applySchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.dfwhome.loans/apply/#webpage",
    name: "Get Pre-Qualified for Your DFW Mortgage in 3 Minutes",
    url: "https://www.dfwhome.loans/apply/",
    description:
      "Start your DFW mortgage pre-qualification online. Tony Botchev, NMLS #114198, sponsored by Loan Factory Inc NMLS #320841. No hard credit pull to start.",
    isPartOf: { "@id": "https://www.dfwhome.loans/#website" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dfwhome.loans/" },
        { "@type": "ListItem", position: 2, name: "Apply", item: "https://www.dfwhome.loans/apply/" },
      ],
    },
  },
];

export default function ApplyPage() {
  useSEO({
    title: "Get Pre-Qualified for Your DFW Mortgage in 3 Minutes | Tony Botchev NMLS #114198",
    description:
      "Start your North DFW mortgage pre-qualification in minutes. No hard credit pull to begin. Tony Botchev, NMLS #114198, sponsored by Loan Factory Inc NMLS #320841.",
    canonical: "https://www.dfwhome.loans/apply/",
    schema: applySchema,
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* ── Page Hero ── */}
      <section
        className="pt-28 pb-12 md:pt-32 md:pb-16"
        style={{ background: "oklch(0.15 0.04 155)" }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest font-['Outfit']"
            style={{ color: "oklch(0.62 0.16 42)", borderColor: "oklch(0.62 0.16 42 / 0.5)" }}>
            <Shield size={12} /> Texas Licensed Mortgage Advisor
          </div>

          <h1
            className="font-bebas text-5xl md:text-7xl leading-none mb-4"
            style={{ color: "oklch(0.975 0.008 85)" }}
          >
            Get Pre-Qualified for Your<br />
            <span style={{ color: "oklch(0.62 0.16 42)" }}>DFW Mortgage</span> in 3 Minutes
          </h1>

          <p
            className="font-['Outfit'] text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: "oklch(0.88 0.01 85)" }}
          >
            Answer a few quick questions and Tony Botchev will personally review your
            situation — no hard credit pull to start, no obligation, no spam.
          </p>

          {/* Trust micro-badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <Clock size={14} />, text: "Under 1hr Response" },
              { icon: <CheckCircle size={14} />, text: "No Hard Credit Pull to Start" },
              { icon: <Shield size={14} />, text: "NMLS #114198 Licensed" },
            ].map((b) => (
              <div
                key={b.text}
                className="flex items-center gap-2 font-['Outfit'] text-xs font-500 uppercase tracking-widest"
                style={{ color: "oklch(0.88 0.01 85)" }}
              >
                <span style={{ color: "oklch(0.62 0.16 42)" }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">

          {/* GHL Embed Placeholder */}
          {/* ─────────────────────────────────────────────────────────────────────
              TONY: Replace the block below with your GHL iframe / embed snippet.
              Example:
                <div dangerouslySetInnerHTML={{ __html: `<!-- GHL EMBED CODE HERE -->` }} />
              Or paste the <iframe> / <script> tag directly.
              ───────────────────────────────────────────────────────────────────── */}
          <div
            id="ghl-prequal-form"
            className="w-full rounded-sm overflow-hidden shadow-xl border border-[#1B2B1A]/10 bg-white"
            style={{ minHeight: 680 }}
          >
            {/* ── PLACEHOLDER — remove once GHL embed is pasted in ── */}
            <div className="flex flex-col items-center justify-center h-full py-20 px-8 text-center gap-4">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full"
                style={{ background: "oklch(0.62 0.16 42 / 0.1)" }}
              >
                <CheckCircle size={32} style={{ color: "oklch(0.62 0.16 42)" }} />
              </div>
              <p className="font-bebas text-3xl text-[#1B2B1A]">GHL FORM COMING SOON</p>
              <p className="font-['Outfit'] text-sm text-[#6B7280] max-w-sm">
                Tony is finalizing the pre-qualification form in the new GHL Agency.
                Once the embed code is ready, it will appear here automatically.
              </p>
              <p className="font-['Outfit'] text-xs text-[#9CA3AF]">
                In the meantime, call NOVA below or book a consultation.
              </p>
            </div>
            {/* ── END PLACEHOLDER ── */}
          </div>

          {/* TCPA Consent */}
          <div className="mt-5 p-4 bg-[#1B2B1A]/5 border border-[#1B2B1A]/10 rounded-sm text-xs text-[#6B7280] leading-relaxed font-['Outfit']">
            <strong className="text-[#374151]">TCPA Consent & Privacy Notice:</strong> By submitting
            this form, you consent to receive calls, texts, and emails from DFW Homes &amp; Loans and
            Tony Botchev (NMLS #114198) regarding your mortgage inquiry. Message and data rates may
            apply. Reply STOP to opt out of text messages at any time. Consent is not a condition of
            purchase. Your information is never sold to third parties.{" "}
            <a href="/privacy" className="text-[#C4521A] hover:underline">
              Privacy Policy
            </a>
            .
          </div>

          {/* Alternative CTA — NOVA */}
          <div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-sm border"
            style={{ background: "oklch(0.975 0.008 85)", borderColor: "oklch(0.62 0.16 42 / 0.3)" }}
          >
            <div className="text-center sm:text-left">
              <p className="font-bebas text-xl text-[#1B2B1A]">Prefer to Talk First?</p>
              <p className="font-['Outfit'] text-sm text-[#4A5568]">
                Call NOVA, our AI mortgage assistant, available 24/7.
              </p>
            </div>
            <a
              href="tel:+19452945020"
              className="flex items-center gap-2 bg-[#1B2B1A] text-white px-6 py-3 font-semibold font-['Outfit'] text-sm hover:bg-[#2d4a2c] transition-colors whitespace-nowrap shrink-0"
            >
              <Phone size={16} />
              Call NOVA Now (945-294-5020)
            </a>
          </div>

          {/* Trust badges row */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 py-6 border-t border-b border-[#1B2B1A]/10">
            {/* NMLS Consumer Access */}
            <a
              href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className="px-3 py-1.5 border text-xs font-bold font-['Outfit'] uppercase tracking-wider transition-colors group-hover:border-[#C4521A] group-hover:text-[#C4521A]"
                style={{ borderColor: "#1B2B1A", color: "#1B2B1A" }}
              >
                NMLS #114198
              </div>
              <span className="text-[10px] text-[#9CA3AF] font-['Outfit']">Verify License →</span>
            </a>

            {/* Equal Housing Lender */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center border border-[#1B2B1A]/30 rounded-sm">
                {/* Equal Housing SVG icon */}
                <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Equal Housing Lender">
                  <path d="M20 4L4 16h4v20h24V16h4L20 4z" fill="#1B2B1A"/>
                  <rect x="14" y="22" width="5" height="14" fill="#FAF7F2"/>
                  <rect x="21" y="22" width="5" height="14" fill="#FAF7F2"/>
                  <rect x="12" y="18" width="16" height="3" fill="#FAF7F2"/>
                </svg>
              </div>
              <span className="text-[10px] text-[#9CA3AF] font-['Outfit'] text-center">Equal Housing<br />Lender</span>
            </div>

            {/* Loan Factory */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="px-3 py-1.5 border text-xs font-bold font-['Outfit'] uppercase tracking-wider"
                style={{ borderColor: "#1B2B1A", color: "#1B2B1A" }}
              >
                Loan Factory
              </div>
              <span className="text-[10px] text-[#9CA3AF] font-['Outfit']">NMLS #320841</span>
            </div>
          </div>

          {/* NMLS full disclosure */}
          <div className="mt-6">
            <NMLSDisclosure variant="form" />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
