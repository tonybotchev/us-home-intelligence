import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center px-6">
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
          <div className="bg-[#1a56db]/10 border border-[#1a56db]/30 rounded-xl p-4 mb-6 text-xs text-[#9ca3af] text-left">
            <p className="font-semibold text-[#f0f0f5] mb-1">Need a lender?</p>
            <p>Tony Botchev, NMLS #114198, sponsored by Loan Factory, NMLS #320841, is available to discuss your financing options. No obligation — you decide who to work with. Call 940-394-5656.</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#1c1c28] hover:bg-[#2a2a3a] border border-[#2a2a3a] text-[#f0f0f5] font-semibold px-8 py-3 rounded-xl transition-colors text-sm">
            Back to Home
          </Link>
          <p className="text-[#4a4a5a] text-xs mt-6">Produced exclusively by NoFluff Marketing LLC · Frisco, TX · NMLS #114198</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
