/* Kinetic Texas — Footer
   Forest green, SEO links, compliance text
*/
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import NMLSDisclosure from "@/components/NMLSDisclosure";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

const loanLinks = [
  { label: "Conventional Loans", href: "/loans/conventional" },
  { label: "FHA Loans", href: "/loans/fha" },
  { label: "VA Loans", href: "/loans/va" },
  { label: "Jumbo Loans", href: "/loans/jumbo" },
  { label: "USDA Loans", href: "/loans/usda" },
  { label: "DSCR Investor", href: "/loans/dscr" },
  { label: "First-Time Buyer", href: "/loans/first-time-buyer" },
  { label: "Refinance", href: "/loans/refinance" },
];

const areaLinks = [
  { label: "Celina, TX", href: "/cities/celina" },
  { label: "Prosper, TX", href: "/cities/prosper" },
  { label: "Frisco, TX", href: "/cities/frisco" },
  { label: "McKinney, TX", href: "/cities/mckinney" },
  { label: "Plano, TX", href: "/cities/plano" },
  { label: "Allen, TX", href: "/cities/allen" },
  { label: "Anna, TX", href: "/cities/anna" },
  { label: "Melissa, TX", href: "/cities/melissa" },
  { label: "Aubrey, TX", href: "/cities/aubrey" },
  { label: "Gunter, TX", href: "/cities/gunter" },
  { label: "Little Elm, TX", href: "/cities/little-elm" },
  { label: "Wylie, TX", href: "/cities/wylie" },
  { label: "Lewisville, TX", href: "/cities/lewisville" },
  { label: "The Colony, TX", href: "/cities/the-colony" },
  { label: "Denton, TX", href: "/cities/denton" },
];

export default function Footer() {
  return (
    <footer style={{ background: "oklch(0.18 0.055 155)" }}>
      {/* Main footer */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="font-display text-3xl" style={{ color: "oklch(0.975 0.008 85)" }}>DFW HOMES</div>
              <div className="font-display text-2xl" style={{ color: "oklch(0.62 0.16 42)" }}>& LOANS</div>
            </div>
            <p className="font-['Outfit'] text-sm leading-relaxed mb-6" style={{ color: "oklch(0.65 0.02 85)" }}>
              Your trusted mortgage advisor for North DFW families since 2006. Serving Celina, Prosper, Frisco, McKinney, Plano, Allen, and all of North Texas.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: "Facebook", href: "#", icon: "f" },
                { label: "Instagram", href: "#", icon: "in" },
                { label: "TikTok", href: "#", icon: "tt" },
                { label: "LinkedIn", href: "#", icon: "li" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center font-['Outfit'] font-700 text-xs transition-colors"
                  style={{
                    background: "oklch(0.975 0.008 85 / 0.08)",
                    color: "oklch(0.78 0.02 85)",
                    border: "1px solid oklch(0.975 0.008 85 / 0.15)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.16 42)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.975 0.008 85)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.975 0.008 85 / 0.08)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.02 85)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Loan Programs */}
          <div>
            <h4 className="font-['Outfit'] font-700 text-xs uppercase tracking-widest mb-5" style={{ color: "oklch(0.62 0.16 42)" }}>
              Loan Programs
            </h4>
            <ul className="space-y-3">
              {loanLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span
                      className="font-['Outfit'] text-sm transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
                      style={{ color: "oklch(0.65 0.02 85)" }}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Served */}
          <div>
            <h4 className="font-['Outfit'] font-700 text-xs uppercase tracking-widest mb-5" style={{ color: "oklch(0.62 0.16 42)" }}>
              Areas Served
            </h4>
            <ul className="space-y-2">
              {areaLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span
                      className="font-['Outfit'] text-sm transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
                      style={{ color: "oklch(0.65 0.02 85)" }}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/cities">
                  <span
                    className="font-['Outfit'] text-xs uppercase tracking-widest transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
                    style={{ color: "oklch(0.62 0.16 42)" }}
                  >
                    View All Cities →
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Outfit'] font-700 text-xs uppercase tracking-widest mb-5" style={{ color: "oklch(0.62 0.16 42)" }}>
              Contact Tony
            </h4>
            <div className="space-y-4">
              <a href="tel:+19453708656" className="flex items-center gap-3 group" onClick={() => trackPhoneClick()}>
                <Phone size={15} style={{ color: "oklch(0.62 0.16 42)" }} />
                <span className="font-['Outfit'] text-sm group-hover:text-[oklch(0.62_0.16_42)] transition-colors" style={{ color: "oklch(0.65 0.02 85)" }}>
                  (945) 370-8656
                </span>
              </a>
              <a href="mailto:tony@dfwhome.loans" className="flex items-center gap-3 group">
                <Mail size={15} style={{ color: "oklch(0.62 0.16 42)" }} />
                <span className="font-['Outfit'] text-sm group-hover:text-[oklch(0.62_0.16_42)] transition-colors" style={{ color: "oklch(0.65 0.02 85)" }}>
                  tony@dfwhome.loans
                </span>
              </a>
              <a href="https://wa.me/19453708656" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" onClick={() => trackWhatsAppClick()}>
                <MessageCircle size={15} style={{ color: "oklch(0.62 0.16 42)" }} />
                <span className="font-['Outfit'] text-sm group-hover:text-[oklch(0.62_0.16_42)] transition-colors" style={{ color: "oklch(0.65 0.02 85)" }}>
                  WhatsApp Tony
                </span>
              </a>
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/apply">
                <span className="btn-primary-kt text-xs px-5 py-2.5 w-full inline-block text-center cursor-pointer">
                  Get Pre-Qualified Free →
                </span>
              </Link>
              <a
                href="tel:+19452945020"
                className="font-['Outfit'] text-xs text-center block transition-colors hover:text-[oklch(0.62_0.16_42)] cursor-pointer"
                style={{ color: "oklch(0.65 0.02 85)" }}
              >
                Or Call NOVA: 945-294-5020 →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full legal disclosure block */}
      <div className="container pb-8">
        <NMLSDisclosure variant="footer" dark={true} />
      </div>

      {/* Bottom bar — W3: Trust signals */}
      <div
        className="border-t py-6"
        style={{ borderColor: "oklch(0.975 0.008 85 / 0.08)" }}
      >
        <div className="container flex flex-col gap-4">
          {/* Trust badge row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
            {/* NMLS Consumer Access verified badge */}
            <a
              href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 border border-white/15 hover:border-[oklch(0.62_0.16_42)] transition-colors group"
              title="Verify NMLS License #114198"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="oklch(0.62 0.16 42)" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-['Outfit'] text-xs group-hover:text-[oklch(0.62_0.16_42)] transition-colors" style={{ color: "oklch(0.65 0.02 85)" }}>
                NMLS #114198 — Verified
              </span>
            </a>
            {/* Equal Housing Lender icon */}
            <div className="flex items-center gap-2" title="Equal Housing Lender">
              <svg viewBox="0 0 40 40" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Equal Housing Lender">
                <path d="M20 4L4 16h4v20h24V16h4L20 4z" fill="oklch(0.65 0.02 85)"/>
                <rect x="14" y="22" width="5" height="14" fill="oklch(0.15 0.04 155)"/>
                <rect x="21" y="22" width="5" height="14" fill="oklch(0.15 0.04 155)"/>
                <rect x="12" y="18" width="16" height="3" fill="oklch(0.15 0.04 155)"/>
              </svg>
              <span className="font-['Outfit'] text-xs" style={{ color: "oklch(0.65 0.02 85)" }}>Equal Housing Lender</span>
            </div>
            {/* Loan Factory badge */}
            <span className="font-['Outfit'] text-xs" style={{ color: "oklch(0.5 0.02 85)" }}>
              Sponsored by Loan Factory, Inc. NMLS #320841
            </span>
          </div>
          {/* Copyright + links row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-['Outfit'] text-xs text-center md:text-left" style={{ color: "oklch(0.5 0.02 85)" }}>
              © {new Date().getFullYear()} DFW Homes &amp; Loans — Tony Botchev, NMLS #114198 — Sponsored by Loan Factory Inc NMLS #320841 · Texas DSML Licensed · All loans subject to credit approval.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy">
                <span className="font-['Outfit'] text-xs hover:text-[oklch(0.62_0.16_42)] transition-colors cursor-pointer" style={{ color: "oklch(0.5 0.02 85)" }}>
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="font-['Outfit'] text-xs hover:text-[oklch(0.62_0.16_42)] transition-colors cursor-pointer" style={{ color: "oklch(0.5 0.02 85)" }}>
                  Terms of Service
                </span>
              </Link>
              <a
                href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/114198"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Outfit'] text-xs hover:text-[oklch(0.62_0.16_42)] transition-colors"
                style={{ color: "oklch(0.5 0.02 85)" }}
              >
                NMLS Consumer Access →
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
