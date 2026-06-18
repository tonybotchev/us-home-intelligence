/* NFGSisterSitesFooter — Sister Sites cross-links section
   Spec: 3-col desktop, single-col mobile. Current site dimmed, no hover.
   NMLS disclosure ONLY on "Home Loans" link when shown on NFM + USHI footers.
   siteKey: "dhl" | "ushi" | "nfm"
*/

type SiteKey = "dhl" | "ushi" | "nfm";

interface Props {
  siteKey: SiteKey;
}

const SISTER_SITES = [
  {
    key: "dhl",
    label: "Home Loans",
    href: "https://dfwhome.loans",
    desc: "Pre-qualify with Tony, NMLS #114198",
    descNoNmls: "Mortgage origination for North Texas home buyers",
  },
  {
    key: "nfm",
    label: "Business Stack",
    href: "https://nofluffmarketing.io",
    desc: "Fix what's breaking your business",
  },
  {
    key: "ushi",
    label: "Neighborhood Reports",
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
          marginBottom: "12px",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        }}
      >
        Sister Sites
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
        className="nfg-sister-grid"
      >
        {SISTER_SITES.map((site) => {
          const isCurrent = site.key === siteKey;
          /* NMLS in descriptor: only on "Home Loans" link, only when NOT on DHL */
          const showNmls = site.key === "dhl" && siteKey !== "dhl";
          const descriptor = showNmls ? site.desc : (site.key === "dhl" ? site.descNoNmls : site.desc);

          return (
            <div key={site.key}>
              {isCurrent ? (
                <span
                  style={{
                    color: "#4a4a5a",
                    fontSize: "13px",
                    fontWeight: 600,
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
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "block",
                    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
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
                  color: isCurrent ? "#3a3a4a" : "#6b7280",
                  fontSize: "12px",
                  marginTop: "2px",
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
