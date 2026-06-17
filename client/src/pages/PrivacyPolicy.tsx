/**
 * DESIGN SYSTEM: Kinetic Texas
 * Privacy Policy — NMLS compliant, A2P compliant
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function PrivacyPolicy() {
  useSEO({
    title: "Privacy Policy | How We Protect Your Personal Info",
    description:
      "Read the privacy policy for DFW Homes & Loans. We are committed to keeping your personal data safe & being clear about how we use and protect your information.",
    canonical: "https://www.dfwhome.loans/privacy-policy",
    noIndex: false,
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-28 pb-16">
        <h1 className="font-bebas text-5xl text-[#1B2B1A] mb-2">PRIVACY POLICY</h1>
        <p className="text-sm text-[#6B7280] mb-8">Last updated: March 29, 2026</p>

        <div className="prose prose-lg max-w-none prose-headings:font-bebas prose-headings:text-[#1B2B1A] prose-headings:tracking-wide prose-h2:text-2xl prose-p:text-[#374151] prose-a:text-[#C4521A]">

          <h2>1. Who We Are</h2>
          <p>
            DFW Homes &amp; Loans is operated by Tony Botchev, NMLS #114198, a licensed mortgage
            loan originator sponsored by Loan Factory, Inc., NMLS #320841, an Equal Housing Lender.
            This Privacy Policy describes how we collect, use, and protect information you provide
            through this website (<strong>dfwhome.loans</strong>).
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>Name, phone number, and email address submitted through our contact or pre-qualification forms</li>
            <li>Loan purpose, credit score range, and other financial information you voluntarily provide</li>
            <li>Device and browser information collected automatically through analytics tools</li>
            <li>UTM parameters and referral source data to understand how you found our website</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Respond to your mortgage inquiry and provide pre-qualification assistance</li>
            <li>Contact you by phone, email, or SMS regarding your loan request</li>
            <li>Comply with federal and state mortgage lending regulations</li>
            <li>Improve our website and marketing communications</li>
          </ul>

          <h2>4. SMS / Text Message Communications</h2>
          <p>
            By submitting a form on this website and checking the SMS consent box, you consent to
            receive SMS text messages from DFW Homes &amp; Loans regarding your mortgage inquiry.
            Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong>{" "}
            to unsubscribe at any time. Reply <strong>HELP</strong> for assistance. Consent to
            receive SMS messages is not required to obtain mortgage services.
          </p>

          <h2>5. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with Loan
            Factory, Inc. (NMLS #320841) and other service providers as necessary to process your
            loan application and comply with applicable law. We may also disclose information as
            required by federal or state regulators.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal
            information from unauthorized access, disclosure, or loss. However, no internet
            transmission is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>7. Cookies and Analytics</h2>
          <p>
            This website uses analytics tools to collect anonymized usage data (pages visited,
            session duration, referral source). We do not use third-party advertising cookies. You
            may disable cookies in your browser settings without affecting your ability to use this
            website.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of personal information we hold
            about you by contacting us at the information below. California residents may have
            additional rights under the CCPA.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            Tony Botchev · NMLS #114198<br />
            Sponsored by Loan Factory, Inc. · NMLS #320841<br />
            Phone: <a href="tel:+19453004002">(945) 300-4002</a><br />
            Email: <a href="mailto:tony@dfwhome.loans">tony@dfwhome.loans</a><br />
            Serving Celina, Prosper, Frisco, McKinney, and North DFW, Texas
          </p>

          <p className="text-sm text-[#6B7280]">
            This privacy policy is subject to change. Material changes will be posted on this page
            with an updated effective date.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
