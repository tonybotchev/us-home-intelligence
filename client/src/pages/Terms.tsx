/**
 * DESIGN SYSTEM: Kinetic Texas
 * Terms of Service — NMLS compliant
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function Terms() {
  useSEO({
    title: "Terms of Service | Website Usage & Legal Guidelines",
    description:
      "View the terms of service for DFW Homes & Loans. This page explains the rules for using our website and what you can expect when working with our online tools.",
    canonical: "https://www.dfwhome.loans/terms",
    noIndex: false,
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-28 pb-16">
        <h1 className="font-bebas text-5xl text-[#1B2B1A] mb-2">TERMS OF SERVICE</h1>
        <p className="text-sm text-[#6B7280] mb-8">Last updated: March 29, 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:font-bebas prose-headings:text-[#1B2B1A] prose-headings:tracking-wide prose-h2:text-2xl prose-p:text-[#374151] prose-a:text-[#C4521A]">

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>dfwhome.loans</strong> (the "Site"), you agree to be
            bound by these Terms of Service. If you do not agree, please do not use the Site.
          </p>

          <h2>2. Not a Commitment to Lend</h2>
          <p>
            The information provided on this Site is for general informational purposes only and
            does not constitute a mortgage loan commitment, pre-approval, or guarantee of any loan
            terms. All loan applications are subject to underwriting review, credit approval, and
            applicable federal and state regulations. Rates and terms are subject to change without
            notice.
          </p>

          <h2>3. Informational Content Only</h2>
          <p>
            Articles, blog posts, calculators, and other content on this Site are provided for
            educational purposes only. They do not constitute legal, financial, or tax advice. You
            should consult with qualified professionals before making any financial decisions.
          </p>

          <h2>4. Licensing Disclosure</h2>
          <p>
            Tony Botchev, NMLS #114198, is a licensed mortgage loan originator in the State of
            Texas, sponsored by Loan Factory, Inc., NMLS #320841. Loan Factory, Inc. is a licensed
            mortgage company. Equal Housing Lender.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on this Site, including text, graphics, logos, and design elements, is the
            property of DFW Homes &amp; Loans or its content suppliers and is protected by
            applicable intellectual property laws. You may not reproduce, distribute, or create
            derivative works without written permission.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            This Site may contain links to third-party websites. We are not responsible for the
            content, privacy practices, or accuracy of any third-party site. Links do not
            constitute endorsement.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, DFW Homes &amp; Loans, Tony Botchev, and Loan
            Factory, Inc. shall not be liable for any indirect, incidental, special, or
            consequential damages arising from your use of this Site or reliance on any information
            provided herein.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, without regard to conflict
            of law principles. Any disputes shall be resolved in the courts of Collin County, Texas.
          </p>

          <h2>9. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Site after
            changes are posted constitutes acceptance of the revised Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            Tony Botchev · NMLS #114198<br />
            Sponsored by Loan Factory, Inc. · NMLS #320841<br />
            Phone: <a href="tel:+19453004002">(945) 300-4002</a><br />
            Email: <a href="mailto:tony@dfwhome.loans">tony@dfwhome.loans</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
