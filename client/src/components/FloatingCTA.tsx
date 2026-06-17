/* Kinetic Texas — Floating CTA Bar
   W2: Sticky mobile NOVA tel button + desktop floating icons
   - Mobile: full-width sticky bar at bottom with NOVA call + /apply link
   - Desktop: floating icon buttons (WhatsApp + phone)
*/
import { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Mobile sticky bar — visible on all pages on mobile ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(100%)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div className="flex">
          {/* NOVA Call — left half */}
          <a
            href="tel:+19453004002"
            className="flex-1 flex items-center justify-center gap-2 py-4 font-semibold font-['Outfit'] text-sm transition-colors"
            style={{ background: "oklch(0.15 0.04 155)", color: "oklch(0.975 0.008 85)" }}
            onClick={() => trackPhoneClick()}
            aria-label="Call NOVA"
          >
            <Phone size={16} />
            Call NOVA Now
          </a>
          {/* Get Pre-Qualified — right half */}
          <a
            href="/apply"
            className="flex-1 flex items-center justify-center gap-2 py-4 font-semibold font-['Outfit'] text-sm transition-colors"
            style={{ background: "oklch(0.62 0.16 42)", color: "oklch(0.975 0.008 85)" }}
            aria-label="Get Pre-Qualified"
          >
            Get Pre-Qualified
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ── Desktop floating icons — appear after scroll ── */}
      <div
        className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-3 transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <a
          href="https://wa.me/19453004002"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ background: "#25D366" }}
          aria-label="WhatsApp Tony"
          onClick={() => trackWhatsAppClick()}
        >
          <MessageCircle size={22} color="white" />
        </a>
        <a
          href="tel:+19453004002"
          className="w-12 h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          style={{ background: "oklch(0.62 0.16 42)" }}
          aria-label="Call NOVA"
          onClick={() => trackPhoneClick()}
        >
          <Phone size={20} color="oklch(0.975 0.008 85)" />
        </a>
      </div>
    </>
  );
}
