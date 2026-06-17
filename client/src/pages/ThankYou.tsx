/* Kinetic Texas — Thank You / Confirmation Page
   Shown after successful PreQualForm submission.
   Matches site design: Bebas Neue headings, Outfit body, forest green/burnt orange/cream.
*/
import { Link } from "wouter";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NMLSDisclosure from "@/components/NMLSDisclosure";

export default function ThankYou() {
  // Read first name from URL query param
  const params = new URLSearchParams(window.location.search);
  const firstName = params.get("name") || "";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.15 0.04 155)" }}>
      <Navbar />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 pt-36 pb-24">
        <div className="max-w-2xl w-full text-center">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-24 h-24 flex items-center justify-center"
              style={{ background: "oklch(0.62 0.16 42 / 0.12)", border: "2px solid oklch(0.62 0.16 42)" }}
            >
              <CheckCircle2 size={48} style={{ color: "oklch(0.62 0.16 42)" }} />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "oklch(0.975 0.008 85)" }}
          >
            THANK YOU{firstName ? ` ${firstName.toUpperCase()}` : ""}!
          </h1>

          {/* Confirmation */}
          <p
            className="font-['Outfit'] text-lg md:text-xl mb-2 leading-relaxed"
            style={{ color: "oklch(0.78 0.02 85)" }}
          >
            Your pre-qualification request has been received.
          </p>
          <p
            className="font-['Outfit'] text-base mb-10 leading-relaxed"
            style={{ color: "oklch(0.62 0.16 42)" }}
          >
            Tony will personally review your information and reach out within 1 hour.
          </p>

          {/* What to expect */}
          <div
            className="p-8 mb-10 text-left"
            style={{
              background: "oklch(0.18 0.04 155)",
              border: "1px solid oklch(0.975 0.008 85 / 0.1)",
            }}
          >
            <h2
              className="font-display text-2xl mb-6"
              style={{ color: "oklch(0.975 0.008 85)" }}
            >
              WHAT HAPPENS NEXT
            </h2>
            <div className="space-y-5">
              {[
                {
                  step: "01",
                  title: "Tony Reviews Your File",
                  desc: "He'll look at your full financial picture and identify the best loan programs for your situation.",
                },
                {
                  step: "02",
                  title: "Personal Call or Text",
                  desc: "Expect a call or text within 1 hour during business hours with real numbers — not guesses.",
                },
                {
                  step: "03",
                  title: "Custom Rate Options",
                  desc: "You'll receive personalized rate and payment options tailored to your goals.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-display text-lg"
                    style={{
                      background: "oklch(0.62 0.16 42 / 0.12)",
                      color: "oklch(0.62 0.16 42)",
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3
                      className="font-['Outfit'] font-700 text-sm uppercase tracking-wider mb-1"
                      style={{ color: "oklch(0.975 0.008 85)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-['Outfit'] text-sm leading-relaxed"
                      style={{ color: "oklch(0.65 0.02 85)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Tony directly */}
          <div className="mb-10">
            <p
              className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "oklch(0.62 0.16 42)" }}
            >
              Can't wait? Call Tony directly
            </p>
            <a
              href="tel:+19453004002"
              className="inline-flex items-center gap-3 px-8 py-4 transition-colors"
              style={{
                background: "oklch(0.62 0.16 42)",
                color: "oklch(0.975 0.008 85)",
              }}
            >
              <Phone size={20} />
              <span className="font-display text-2xl tracking-wider">(945) 300-4002</span>
            </a>
          </div>

          {/* Back to homepage */}
          <Link href="/">
            <span
              className="inline-flex items-center gap-2 font-['Outfit'] text-sm uppercase tracking-widest transition-colors cursor-pointer"
              style={{ color: "oklch(0.65 0.02 85)" }}
            >
              <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
              Back to Homepage
            </span>
          </Link>

          {/* NMLS Disclosure */}
          <div className="mt-12">
            <NMLSDisclosure variant="form" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
