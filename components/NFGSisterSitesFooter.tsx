"use client";
/* NFGSisterSitesFooter — Sister Sites cross-links section
   Spec: 3-col desktop, single-col mobile.
   Current site shown as active/highlighted (not grayed out).
   NMLS disclosure ONLY on DHL link when shown on NFM + USHI footers.
   siteKey: "dhl" | "ushi" | "nfm"
*/

type SiteKey = "dhl" | "ushi" | "nfm";

interface Props {
  siteKey: SiteKey;
}

const SISTER_SITES = [
  {
    key: "dhl",
    label: "DFW Home & Loans",
    domain: "dfwhome.loans",
    href: "https://dfwhome.loans",
    desc: "Pre-qualify with Tony, NMLS #114198",
    descNoNmls: "Mortgage origination for North Texas home buyers",
  },
  {
    key: "nfm",
    label: "NoFluff Marketing",
    domain: "nofluffmarketing.io",
    href: "https://nofluffmarketing.io",
    desc: "AI phone, websites, CRM, SEO, ads — built to close",
  },
  {
    key: "ushi",
    label: "US Home Intelligence",
    domain: "intel.nofluffmarketing.io",
    href: "https://intel.nofluffmarketing.io",
    desc: "Investment-grade neighborhood intel for any US address",
  },
] as const;

export default function NFGSisterSitesFooter({ siteKey }: Props) {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 0",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          color: "#9ca3af",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        NoFluff Group — Sister Sites
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
        className="nfg-sister-grid"
      >
        {SISTER_SITES.map((site) => {
          const isCurrent = site.key === siteKey;
          const showNmls = site.key === "dhl" && siteKey !== "dhl";
          const descriptor = showNmls ? site.desc : (site.key === "dhl" ? site.descNoNmls : site.desc);

          return (
            <div
              key={site.key}
              style={{
                padding: "12px 14px",
                borderRadius: "8px",
                background: isCurrent ? "rgba(255,107,53,0.08)" : "transparent",
                border: isCurrent ? "1px solid rgba(255,107,53,0.2)" : "1px solid transparent",
              }}
            >
              {isCurrent ? (
                <span
                  style={{
                    color: "#FF6B35",
                    fontSize: "13px",
                    fontWeight: 700,
                    display: "block",
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  }}
                >
                  {site.label}
                </span>
              ) : (
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${site.label}`}
                  style={{
                    color: "#f0f0f5",
                    fontSize: "13px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "block",
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#FF6B35";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#f0f0f5";
                  }}
                >
                  {site.label}
                </a>
              )}
              <p
                style={{
                  color: isCurrent ? "#FF6B35" : "#9ca3af",
                  fontSize: "11px",
                  fontWeight: 500,
                  marginTop: "2px",
                  marginBottom: "4px",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  opacity: isCurrent ? 0.7 : 0.8,
                }}
              >
                {site.domain}
              </p>
              <p
                style={{
                  color: isCurrent ? "#9ca3af" : "#6b7280",
                  fontSize: "12px",
                  marginTop: "0",
                  fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                  lineHeight: "1.4",
                }}
              >
                {descriptor}
              </p>
            </div>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .nfg-sister-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
