/* Kinetic Texas — Book a Call Section
   GoHighLevel (GHL) booking widget — exact iframe from live site
   Widget ID: vo0t9ClABZid1IGZZASH
   AEO: Booking schema + HowTo step 1 = "Free Consultation"
*/
import { useRef, useEffect, useState } from "react";
import { Calendar, Clock, MessageCircle } from "lucide-react";
import NMLSDisclosure from "@/components/NMLSDisclosure";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

export default function BookingWidget() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="book-call"
      ref={ref}
      className="py-24 md:py-32"
      style={{ background: "oklch(0.26 0.065 155)" }}
    >
      <div className="container">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p
            className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "oklch(0.62 0.16 42)" }}
          >
            Book a Free 15-Minute Call
          </p>
          <h2
            className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "oklch(0.975 0.008 85)" }}
          >
            TALK TO TONY —
            <br />
            <span style={{ color: "oklch(0.62 0.16 42)" }}>NO PRESSURE, JUST ANSWERS</span>
          </h2>
          <p
            className="font-['Outfit'] text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.78 0.02 85)" }}
          >
            Pick a time that works. Most pre-approvals ready within 24 hours.
          </p>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap justify-center gap-8 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {[
            { icon: <Calendar size={16} />, text: "Free 15-Min Consultation" },
            { icon: <Clock size={16} />, text: "Response Within 1 Hour" },
            { icon: <MessageCircle size={16} />, text: "No Obligation, No Pressure" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 font-['Outfit'] text-sm uppercase tracking-wider"
              style={{ color: "oklch(0.78 0.02 85)" }}
            >
              <span style={{ color: "oklch(0.62 0.16 42)" }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* GHL Booking Widget — exact iframe from live dfwhome.loans */}
        <div
          className="max-w-4xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <div
            className="overflow-hidden"
            style={{
              background: "oklch(0.975 0.008 85 / 0.04)",
              border: "1px solid oklch(0.975 0.008 85 / 0.15)",
            }}
          >
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/vo0t9ClABZid1IGZZASH"
              style={{
                width: "100%",
                border: "none",
                overflow: "hidden",
                minHeight: "700px",
              }}
              scrolling="no"
              id="vo0t9ClABZid1IGZZASH_booking"
              title="Schedule a Free Consultation with Tony Botchev"
            />
          </div>
          <p
            className="font-['Outfit'] text-xs text-center mt-4"
            style={{ color: "oklch(0.55 0.02 85)" }}
          >
            Can't find a time? Call{" "}
            <a href="tel:+19453004002" style={{ color: "oklch(0.62 0.16 42)" }} className="underline" onClick={() => trackPhoneClick()}>
              (945) 300-4002
            </a>{" "}
            or{" "}
            <a
              href="https://wa.me/19453004002"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.62 0.16 42)" }}
              className="underline"
              onClick={() => trackWhatsAppClick()}
            >
              WhatsApp Tony
            </a>{" "}
            anytime.
          </p>
          <div className="mt-2">
            <NMLSDisclosure variant="form" dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
