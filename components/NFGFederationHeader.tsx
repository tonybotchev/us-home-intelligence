"use client";
/* NFGFederationHeader — NoFluff Group cross-site navigation strip
   Spec: #1A1A1A bg, #FF6B35 active accent, 40px desktop / 44px mobile
   Not sticky on scroll. WCAG AA contrast. Keyboard accessible.
   siteKey: "dhl" | "ushi" | "nfm"
*/
import { useEffect, useRef } from "react";

const SITES = [
  {
    key: "dhl",
    label: "Home Loans",
    href: "https://dfwhome.loans",
    ariaLabel: "Go to DFW Homes & Loans — Home Loans",
  },
  {
    key: "nfm",
    label: "Business Stack",
    href: "https://nofluffmarketing.io",
    ariaLabel: "Go to NoFluff Marketing — Business Stack",
  },
  {
    key: "ushi",
    label: "Neighborhood Reports",
    href: "https://intel.nofluffmarketing.io",
    ariaLabel: "Go to US Home Intelligence — Neighborhood Reports",
  },
] as const;

type SiteKey = "dhl" | "ushi" | "nfm";

interface Props {
  siteKey: SiteKey;
}

export default function NFGFederationHeader({ siteKey }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.dataset.atEnd = String(atEnd);
    };
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      role="navigation"
      aria-label="NoFluff Group sites"
      style={{
        background: "#1A1A1A",
        height: "40px",
        minHeight: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        flexShrink: 0,
      }}
      className="nfg-fed-header"
    >
      {/* Left: Brand anchor */}
      <a
        href="#top"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        aria-label="NoFluff Group — back to top"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#FFFFFF",
          textDecoration: "none",
          flexShrink: 0,
          outline: "none",
        }}
        className="nfg-brand-anchor"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <polygon points="12,2 22,8.5 18.5,20 5.5,20 2,8.5" fill="#FF6B35" />
        </svg>
        <span style={{ color: "#FFFFFF", fontWeight: 600, whiteSpace: "nowrap" }}>
          NoFluff Group
        </span>
      </a>

      {/* Right: Cross-site tabs */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "8px",
          maskImage: "linear-gradient(to right, black calc(100% - 20px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black calc(100% - 20px), transparent 100%)",
        }}
        className="nfg-tabs-row"
      >
        {SITES.map((site) => {
          const isActive = site.key === siteKey;
          return (
            <a
              key={site.key}
              href={isActive ? undefined : site.href}
              aria-label={site.ariaLabel}
              aria-current={isActive ? "page" : undefined}
              tabIndex={0}
              style={{
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "4px 10px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                cursor: isActive ? "default" : "pointer",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                position: "relative",
                outline: "none",
                borderBottom: isActive ? "2px solid #FF6B35" : "2px solid transparent",
                paddingBottom: isActive ? "2px" : "4px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.outline = "2px solid #FFFFFF";
                (e.currentTarget as HTMLElement).style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.outline = "none";
              }}
            >
              {site.label}
            </a>
          );
        })}
      </div>

      <style>{`
        .nfg-tabs-row::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          .nfg-fed-header { height: 44px !important; min-height: 44px !important; }
          .nfg-tabs-row a { font-size: 12px !important; padding: 4px 8px !important; }
        }
        .nfg-brand-anchor:focus-visible {
          outline: 2px solid #FFFFFF !important;
          outline-offset: 2px !important;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
