"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function RealtorLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Navbar />
      <main className="flex-1 pt-24 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-2xl p-8">
            {sent ? (
              /* ── Success state ─────────────────────────────────────── */
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="text-[#00c2ff]" size={48} />
                </div>
                <h1 className="text-2xl font-bold text-[#f0f0f5] mb-3">
                  Check your inbox
                </h1>
                <p className="text-[#9ca3af] mb-6 leading-relaxed">
                  We sent a secure login link to{" "}
                  <span className="text-[#f0f0f5] font-medium">{email}</span>.
                  Click the link to access your Realtor Partner dashboard.
                </p>
                <p className="text-[#6b7280] text-sm">
                  Link expires in 1 hour. Check your spam folder if it doesn&apos;t arrive.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail(""); }}
                  className="mt-6 text-[#1a56db] hover:text-[#4a86fb] text-sm transition-colors"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              /* ── Form state ────────────────────────────────────────── */
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a56db]/20 mb-4">
                    <Mail className="text-[#1a56db]" size={24} />
                  </div>
                  <h1 className="text-2xl font-bold text-[#f0f0f5] mb-2">
                    Realtor Partner Login
                  </h1>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    Enter your email and we&apos;ll send a secure magic link to your
                    Realtor Partner dashboard — no password needed.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#9ca3af] mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@brokerage.com"
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-[#f0f0f5] placeholder-[#4b5563] focus:outline-none focus:border-[#1a56db] transition-colors text-sm"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a56db] hover:bg-[#1040b0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Login Link
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-[#6b7280] text-xs">
                  Not a partner yet?{" "}
                  <a href="/realtor" className="text-[#1a56db] hover:text-[#4a86fb] transition-colors">
                    Join free — no credit card required
                  </a>
                </p>
              </>
            )}
          </div>

          {/* Footer note */}
          <p className="mt-4 text-center text-[#4b5563] text-xs">
            US Home Intelligence · Realtor Partner Portal ·{" "}
            <a href="/privacy" className="hover:text-[#6b7280] transition-colors">Privacy Policy</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
