import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed | US Home Intelligence",
  description: "Your US Home Intelligence report order is confirmed. Delivery in under an hour.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex flex-col items-center justify-center px-6 pb-16">
        <div className="max-w-lg w-full bg-[#12121a] border border-[#22c55e]/30 rounded-2xl p-10 text-center">
          <CheckCircle size={64} className="text-[#22c55e] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-[#f0f0f5] mb-3">Report Order Confirmed</h1>
          <p className="text-[#9ca3af] mb-6">
            Your US Home Intelligence report is being produced now. You will receive it at your email address within the hour.
          </p>
          <div className="bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl p-5 mb-6 text-left space-y-2">
            <p className="text-[#6b7280] text-xs font-semibold uppercase tracking-wider">What happens next</p>
            <div className="flex items-start gap-2 text-sm text-[#9ca3af]">
              <span className="text-[#22c55e] font-bold shrink-0">1.</span>
              Your report is being produced by NoFluff Marketing LLC&apos;s intelligence platform.
            </div>
            <div className="flex items-start gap-2 text-sm text-[#9ca3af]">
              <span className="text-[#22c55e] font-bold shrink-0">2.</span>
              Delivery to your email in under 1 hour (typically 20–45 minutes).
            </div>
            <div className="flex items-start gap-2 text-sm text-[#9ca3af]">
              <span className="text-[#22c55e] font-bold shrink-0">3.</span>
              Check your spam folder if you don&apos;t see it. Contact 940-394-5656 with any issues.
            </div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#1c1c28] hover:bg-[#2a2a3a] border border-[#2a2a3a] text-[#f0f0f5] font-semibold px-8 py-3 rounded-xl transition-colors text-sm">
            Back to Home
          </Link>
          <p className="text-[#4a4a5a] text-xs mt-6">Produced exclusively by NoFluff Marketing LLC · Frisco, TX</p>
        </div>

        {/* DHL Cross-Sell Card — Fix D */}
        <div className="max-w-lg w-full mt-6 bg-[#0f1a2e] border border-[#1a56db]/30 rounded-2xl p-8 text-left">
          <h2 className="text-xl font-bold text-[#f0f0f5] mb-2">Need financing for this neighborhood?</h2>
          <p className="text-[#9ca3af] text-sm leading-relaxed mb-6">Get pre-qualified in 5 minutes. We will run the numbers with you.</p>
          <a
            href="https://dfwhome.loans/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1a56db] hover:bg-[#1e40af] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Start your prequal &rarr;
          </a>
          <p className="text-[#4a4a5a] text-xs mt-5 leading-relaxed">
            NoFluff Marketing LLC · Fair Housing compliant.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
