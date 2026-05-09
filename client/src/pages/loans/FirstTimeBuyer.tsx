/**
 * DESIGN SYSTEM: Kinetic Texas
 * Service Page: First-Time Buyer Programs
 */
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";

const faqItems = [
  {
    q: "What first-time buyer programs are available in Texas in 2026?",
    a: "Texas offers several programs: My First Texas Home (MFTH) provides 30-year fixed loans with down payment assistance of 3–5%. Texas State Affordable Housing Corporation (TSAHC) offers similar assistance. Both have income and purchase price limits that vary by county.",
  },
  {
    q: "Do I have to be a first-time buyer to use these programs?",
    a: "Not necessarily. My First Texas Home defines 'first-time buyer' as someone who hasn't owned a home in the past 3 years. If you owned a home but sold it more than 3 years ago, you may still qualify.",
  },
  {
    q: "What are the income limits for first-time buyer programs in Collin County?",
    a: "Income limits vary by program and household size. For Collin County in 2026, TSAHC limits are generally around $97,000–$115,000 for a household of 1–2 people. Tony Botchev will check your eligibility in the initial consultation.",
  },
  {
    q: "Can I combine down payment assistance with an FHA loan?",
    a: "Yes — most Texas down payment assistance programs are compatible with FHA, conventional, and VA loans. The assistance typically comes as a second lien (often forgivable after 3 years) or a grant.",
  },
  {
    q: "What credit score do I need for first-time buyer programs in Texas?",
    a: "Most Texas first-time buyer programs require a minimum 620 credit score. Some programs have higher minimums. Tony Botchev will identify the best program for your specific credit profile.",
  },
];

export default function FirstTimeBuyerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: "First-Time Home Buyer Programs — DFW Homes & Loans",
      description: "First-time buyer programs with down payment assistance in North DFW. Tony Botchev, NMLS #114198.",
      url: "https://www.dfwhome.loans/loans/first-time-buyer",
      provider: { "@type": "FinancialService", "@id": "https://www.dfwhome.loans/#business", name: "DFW Homes & Loans", telephone: "+19452945020", areaServed: "North Dallas-Fort Worth, Texas" }, broker: { "@type": "Person", "@id": "https://www.dfwhome.loans/#tony", name: "Tony Botchev", identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  useSEO({
    title: "First Time Buyer Programs | Start Your Home Journey",
    description: "Buying your first house? Explore first time buyer programs at DFW Homes & Loans. We guide you through every step to make your first purchase affordable.",
    canonical: "https://www.dfwhome.loans/loans/first-time-buyer",
    schema: schema as Record<string, unknown>[],
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <section className="bg-[#1B2B1A] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              FIRST-TIME BUYER PROGRAMS
            </div>
            <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-4">
              FIRST-TIME BUYER<br />
              <span className="text-[#C4521A]">PROGRAMS IN DFW</span>
            </h1>
            <p className="text-white/70 text-lg mb-6">
              Down payment assistance, low-rate programs, and forgivable second liens designed
              specifically for first-time buyers in North DFW. Tony Botchev will find the program
              that gets you into your first home with the least money out of pocket.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/apply" className="bg-[#C4521A] text-white px-6 py-3 font-semibold hover:bg-[#A8431A] transition-colors text-center">
                Check My Eligibility →
              </Link>
              <a href="tel:+19453708656" className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
                <Phone size={16} /> (945) 370-8656
              </a>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-bebas text-2xl text-white mb-4">AVAILABLE PROGRAMS</h2>
            <div className="space-y-4">
              {[
                { name: "My First Texas Home", desc: "30-year fixed + 3–5% DPA. State-backed. Income limits apply." },
                { name: "TSAHC Home Sweet Texas", desc: "Grants or second liens. No repayment if you stay 3 years." },
                { name: "Freddie Mac Home Possible", desc: "3% down conventional. Lower PMI for qualifying buyers." },
                { name: "Fannie Mae HomeReady", desc: "3% down. Allows non-borrower income. Reduced PMI." },
                { name: "FHA with DPA", desc: "3.5% down FHA + assistance layered on top." },
              ].map((p) => (
                <div key={p.name} className="border-b border-white/10 pb-3">
                  <div className="text-white font-semibold text-sm">{p.name}</div>
                  <div className="text-white/50 text-xs mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-bebas text-4xl text-[#1B2B1A] mb-6">FIRST-TIME BUYER FAQ</h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-gray-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left font-semibold text-[#1B2B1A] hover:bg-gray-50 transition-colors">
                  <span>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="shrink-0 text-[#C4521A]" /> : <ChevronDown size={18} className="shrink-0 text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-[#4A5568] text-sm leading-relaxed border-t border-gray-100">
                    <p className="pt-3">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B2B1A] py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-bebas text-4xl text-white mb-3">CHECK YOUR ELIGIBILITY TODAY</h2>
          <p className="text-white/70 mb-6">No hard credit pull to start. Find out which programs you qualify for in 24 hours.</p>
          <Link href="/apply" className="inline-block bg-[#C4521A] text-white px-10 py-4 font-semibold text-lg hover:bg-[#A8431A] transition-colors">
            Check My Eligibility →
          </Link>
          <p className="text-white/40 text-xs mt-4">Tony Botchev · NMLS #114198 · Loan Factory, Inc. NMLS #320841 · Equal Housing Lender</p>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
