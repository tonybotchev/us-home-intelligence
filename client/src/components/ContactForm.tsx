/* Kinetic Texas — Contact / Lead Form
   A2P compliant SMS consent
   Forest green background, split layout with DFW skyline
   NOTE: This form is no longer rendered on the homepage (removed in Fix 3).
   File kept for reference / potential future use.
*/
import { useState } from "react";
import { ArrowRight, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import NMLSDisclosure from "@/components/NMLSDisclosure";
import { trackLeadFormSubmit, trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics";

const DFW_SKYLINE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663335597871/XWnvoWuu2r8GZzWNujZ6D6/dfw-skyline-gtKv8eV8bN7WLZt3RYSq3s.webp";

// GHL Custom Field IDs (aligned with PreQualForm)
const CF = {
  loanPurpose:      "N1SdIoSQp1QY3GpQb8YF",   // TEXT
  loanType:         "4j2o73jUu00rIrR95mwh",   // TEXT
  creditScoreRange: "B5VYu7zxYa69UScFPdRP",   // SINGLE_OPTIONS
  creditScore:      "HUk7yVEdXSMD7V5Y5EKP",   // TEXT
  leadSource:       "GPqqpLvQBv2cxr0SM31k",   // TEXT
  leadTemp:         "29sOCVVX7J9gHzMSwexh",   // TEXT
  smsConsent:       "07qG13d3oMG2TLGnfL5V",   // CHECKBOX — must be ["Yes"]
};

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  loanPurpose: string;
  creditScore: string;
  smsConsent: boolean;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    loanPurpose: "",
    creditScore: "",
    smsConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Lead scoring: HOT = 720+ credit + ready now, WARM = 680+ or 3-6mo, COLD = below 680 or 6mo+
  const scoreLead = (creditScore: string): { tags: string[]; temperature: string } => {
    const isHighCredit = creditScore === "760+" || creditScore === "720-759";
    const isMidCredit = creditScore === "680-719";
    if (isHighCredit) {
      return { tags: ["website-lead", "hot-lead", "needs-scoring"], temperature: "HOT" };
    } else if (isMidCredit) {
      return { tags: ["website-lead", "warm-lead", "needs-scoring"], temperature: "WARM" };
    } else {
      return { tags: ["website-lead", "cold-lead", "needs-scoring"], temperature: "COLD" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.smsConsent) return;
    setLoading(true);

    const { tags, temperature } = scoreLead(form.creditScore);

    try {
      const res = await fetch("/api/ghl-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          tags,
          source: "dfwhome.loans website",
          customFields: [
            { id: CF.loanPurpose,      value: form.loanPurpose },
            { id: CF.loanType,         value: form.loanPurpose },
            { id: CF.creditScoreRange, value: form.creditScore },
            { id: CF.creditScore,      value: form.creditScore },
            { id: CF.leadSource,       value: "Website Contact Form" },
            { id: CF.leadTemp,         value: temperature },
            { id: CF.smsConsent,       value: ["Yes"] },
          ],
          opportunityName: `${form.firstName} ${form.lastName} - ${form.loanPurpose || "Inquiry"} Contact`,
        }),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
      trackLeadFormSubmit('contact_form');
    } catch (err) {
      console.error("GHL submission error:", err);
      // Still show success to user — log the error
      setSubmitted(true);
      trackLeadFormSubmit('contact_form');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full bg-transparent border-b-2 py-3 font-['Outfit'] text-base outline-none transition-colors
    placeholder:text-[oklch(0.78_0.02_85)]
  `;
  const inputStyle = {
    borderColor: "oklch(0.975 0.008 85 / 0.3)",
    color: "oklch(0.975 0.008 85)",
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.26 0.065 155)" }}
    >
      {/* Background skyline */}
      <div className="absolute inset-0">
        <img src={DFW_SKYLINE} alt="Dallas-Fort Worth skyline at sunset" className="w-full h-full object-cover opacity-10" loading="lazy" decoding="async" />
        <div className="absolute inset-0" style={{ background: "oklch(0.26 0.065 155 / 0.85)" }} />
      </div>

      {/* Diagonal top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "80px", marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 L1440,80 L0,80 Z" fill="oklch(0.94 0.012 80)" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="pt-4">
            <p className="font-['Outfit'] text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "oklch(0.62 0.16 42)" }}>
              Get Started
            </p>
            <h2
              className="font-display leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "oklch(0.975 0.008 85)" }}
            >
              GET A FREE
              <br />
              <span style={{ color: "oklch(0.62 0.16 42)" }}>RATE ESTIMATE</span>
            </h2>
            <p className="font-['Outfit'] text-base leading-relaxed mb-10" style={{ color: "oklch(0.78 0.02 85)" }}>
              No obligation. No credit pull. Response within 1 hour during business hours. Tony personally reviews every inquiry.
            </p>

            {/* Contact methods */}
            <div className="space-y-5 mb-10">
              {[
                { icon: <Phone size={18} />, label: "Call or Text", value: "(945) 300-4002", href: "tel:+19453004002" },
                { icon: <Mail size={18} />, label: "Email", value: "tony@dfwhome.loans", href: "mailto:tony@dfwhome.loans" },
                { icon: <MessageCircle size={18} />, label: "WhatsApp", value: "Message Tony directly", href: "https://wa.me/19453004002" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  onClick={() => {
                    if (item.href.startsWith("tel:")) trackPhoneClick();
                    if (item.href.includes("wa.me")) trackWhatsAppClick();
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ background: "oklch(0.62 0.16 42 / 0.15)", color: "oklch(0.62 0.16 42)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-['Outfit'] text-xs uppercase tracking-wider" style={{ color: "oklch(0.62 0.16 42)" }}>
                      {item.label}
                    </p>
                    <p className="font-['Outfit'] font-600 text-base group-hover:underline" style={{ color: "oklch(0.975 0.008 85)" }}>
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Compliance */}
            <NMLSDisclosure variant="form" dark={true} />
          </div>

          {/* Right: Form */}
          <div className="p-8 md:p-10" style={{ background: "oklch(0.975 0.008 85 / 0.05)", border: "1px solid oklch(0.975 0.008 85 / 0.15)" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={56} style={{ color: "oklch(0.62 0.16 42)" }} className="mb-6" />
                <h3 className="font-display text-4xl mb-3" style={{ color: "oklch(0.975 0.008 85)" }}>
                  REQUEST RECEIVED!
                </h3>
                <p className="font-['Outfit'] text-base" style={{ color: "oklch(0.78 0.02 85)" }}>
                  Tony will reach out within 1 hour. Check your phone and email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} method="post" noValidate>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.78 0.02 85)" }}>
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Tony"
                      required
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.78 0.02 85)" }}>
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      required
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.78 0.02 85)" }}>
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(972) 555-0100"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div className="mb-6">
                  <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.78 0.02 85)" }}>
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.78 0.02 85)" }}>
                      Loan Purpose
                    </label>
                    <select
                      name="loanPurpose"
                      value={form.loanPurpose}
                      onChange={handleChange}
                      required
                      className={inputClass + " cursor-pointer"}
                      style={inputStyle}
                    >
                      <option value="" style={{ background: "oklch(0.26 0.065 155)" }}>Select...</option>
                      <option value="purchase" style={{ background: "oklch(0.26 0.065 155)" }}>Home Purchase</option>
                      <option value="refinance" style={{ background: "oklch(0.26 0.065 155)" }}>Refinance</option>
                      <option value="dscr" style={{ background: "oklch(0.26 0.065 155)" }}>DSCR / Investor</option>
                      <option value="cashout" style={{ background: "oklch(0.26 0.065 155)" }}>Cash-Out Refi</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-['Outfit'] text-xs uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.78 0.02 85)" }}>
                      Credit Score Range
                    </label>
                    <select
                      name="creditScore"
                      value={form.creditScore}
                      onChange={handleChange}
                      required
                      className={inputClass + " cursor-pointer"}
                      style={inputStyle}
                    >
                      <option value="" style={{ background: "oklch(0.26 0.065 155)" }}>Select...</option>
                      <option value="760+" style={{ background: "oklch(0.26 0.065 155)" }}>760+ Excellent</option>
                      <option value="720-759" style={{ background: "oklch(0.26 0.065 155)" }}>720–759 Very Good</option>
                      <option value="680-719" style={{ background: "oklch(0.26 0.065 155)" }}>680–719 Good</option>
                      <option value="640-679" style={{ background: "oklch(0.26 0.065 155)" }}>640–679 Fair</option>
                    </select>
                  </div>
                </div>

                {/* A2P SMS Consent */}
                <div
                  className="p-4 mb-6 border"
                  style={{ borderColor: "oklch(0.975 0.008 85 / 0.2)", background: "oklch(0.975 0.008 85 / 0.05)" }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      checked={form.smsConsent}
                      onChange={handleChange}
                      className="mt-1 flex-shrink-0 w-4 h-4 accent-[oklch(0.62_0.16_42)]"
                      style={{ accentColor: "oklch(0.62 0.16 42)" }}
                    />
                    <span className="font-['Outfit'] text-xs leading-relaxed" style={{ color: "oklch(0.78 0.02 85)" }}>
                      By checking this box and submitting, I consent to receive SMS text messages from DFW Homes & Loans regarding my mortgage inquiry. Message frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe. Reply HELP for help. This consent is not required to obtain services.{" "}
                      <a href="/privacy" className="underline" style={{ color: "oklch(0.62 0.16 42)" }}>Privacy Policy</a>{" "}
                      &{" "}
                      <a href="/terms" className="underline" style={{ color: "oklch(0.62 0.16 42)" }}>Terms of Service</a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !form.smsConsent}
                  className="btn-primary-kt w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? "Submitting..." : <>Submit My Request <ArrowRight size={16} /></>}
                  </span>
                </button>
                <p className="font-['Outfit'] text-xs text-center mt-3" style={{ color: "oklch(0.65 0.02 85)" }}>
                  No obligation · No credit pull · Response within 1 hour
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
