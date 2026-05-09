/**
 * DESIGN SYSTEM: Kinetic Texas
 * Mortgage Calculator — /calculator
 * M13: Interactive payment calculator with DFW-specific context
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/hooks/useSEO";
import { Phone } from "lucide-react";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DFW Mortgage Calculator — Tony Botchev NMLS #114198",
    description: "Free mortgage payment calculator for North DFW homebuyers. Estimate your monthly payment including principal, interest, taxes, and insurance.",
    url: "https://www.dfwhome.loans/calculator",
    applicationCategory: "FinanceApplication",
    author: {
      "@type": "Person",
      "@id": "https://www.dfwhome.loans/#tony",
      name: "Tony Botchev",
      identifier: { "@type": "PropertyValue", name: "NMLS", value: "114198" },
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
];

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

const LOAN_PRESETS = [
  { label: "Anna / Melissa", price: 350000, down: 10 },
  { label: "McKinney / Allen", price: 450000, down: 10 },
  { label: "Frisco / Plano", price: 550000, down: 15 },
  { label: "Prosper / Celina", price: 480000, down: 10 },
  { label: "Jumbo (Frisco)", price: 850000, down: 20 },
];

export default function CalculatorPage() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPct, setDownPct] = useState(10);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(2.1);
  const [insuranceMonthly, setInsuranceMonthly] = useState(150);
  const [includePMI, setIncludePMI] = useState(true);

  useSEO({
    title: "DFW Mortgage Calculator — Estimate Your Monthly Payment | Tony Botchev NMLS #114198",
    description: "Free mortgage calculator for North DFW homebuyers. Estimate your monthly payment including P&I, property taxes, and insurance. Tony Botchev NMLS #114198.",
    canonical: "https://www.dfwhome.loans/calculator",
    schema: schema as Record<string, unknown>[],
  });

  const calc = useMemo(() => {
    const downAmount = homePrice * (downPct / 100);
    const loanAmount = homePrice - downAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let pi = 0;
    if (monthlyRate > 0) {
      pi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      pi = loanAmount / numPayments;
    }

    const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
    const pmi = (downPct < 20 && includePMI) ? (loanAmount * 0.0085) / 12 : 0;
    const total = pi + monthlyTax + insuranceMonthly + pmi;

    return {
      loanAmount,
      downAmount,
      pi,
      monthlyTax,
      pmi,
      total,
      ltv: (loanAmount / homePrice) * 100,
    };
  }, [homePrice, downPct, interestRate, loanTerm, propertyTaxRate, insuranceMonthly, includePMI]);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1B2B1A] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C4521A]/20 text-[#C4521A] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            FREE TOOL
          </div>
          <h1 className="font-bebas text-5xl md:text-6xl text-white leading-none mb-3">
            DFW MORTGAGE<br />
            <span className="text-[#C4521A]">PAYMENT CALCULATOR</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Estimate your monthly payment for any North DFW home. Includes principal, interest, property taxes, homeowners insurance, and PMI.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 max-w-5xl mx-auto px-4 md:px-6">

        {/* Quick Presets */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#4A5568] mb-3">QUICK PRESETS — NORTH DFW CITIES</p>
          <div className="flex flex-wrap gap-2">
            {LOAN_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => { setHomePrice(p.price); setDownPct(p.down); }}
                className="text-sm border border-gray-300 px-4 py-2 hover:border-[#C4521A] hover:text-[#C4521A] transition-colors"
              >
                {p.label} — {formatCurrency(p.price)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white border border-gray-200 p-6 space-y-5">
            <h2 className="font-bebas text-2xl text-[#1B2B1A] mb-4">LOAN DETAILS</h2>

            <div>
              <label className="block text-sm font-semibold text-[#1B2B1A] mb-1">
                Home Price: <span className="text-[#C4521A]">{formatCurrency(homePrice)}</span>
              </label>
              <input
                type="range" min={100000} max={2000000} step={5000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full accent-[#C4521A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$100K</span><span>$2M</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1B2B1A] mb-1">
                Down Payment: <span className="text-[#C4521A]">{downPct}% ({formatCurrency(calc.downAmount)})</span>
              </label>
              <input
                type="range" min={3} max={50} step={1}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="w-full accent-[#C4521A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3% (FHA)</span><span>50%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1B2B1A] mb-1">
                Interest Rate: <span className="text-[#C4521A]">{interestRate.toFixed(2)}%</span>
              </label>
              <input
                type="range" min={3} max={12} step={0.125}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#C4521A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>3%</span><span>12%</span>
              </div>
              <p className="text-xs text-amber-600 mt-1">* Illustrative only. Contact Tony for your actual rate.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1B2B1A] mb-1">Loan Term</label>
              <div className="flex gap-2">
                {[30, 20, 15, 10].map((t) => (
                  <button
                    key={t}
                    onClick={() => setLoanTerm(t)}
                    className={`flex-1 py-2 text-sm font-semibold border transition-colors ${loanTerm === t ? "bg-[#1B2B1A] text-white border-[#1B2B1A]" : "border-gray-300 hover:border-[#C4521A]"}`}
                  >
                    {t} yr
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1B2B1A] mb-1">
                Property Tax Rate: <span className="text-[#C4521A]">{propertyTaxRate.toFixed(2)}%/yr</span>
              </label>
              <input
                type="range" min={1.5} max={3.5} step={0.05}
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                className="w-full accent-[#C4521A]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.5% (Collin)</span><span>3.5%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1B2B1A] mb-1">
                Homeowners Insurance: <span className="text-[#C4521A]">{formatCurrency(insuranceMonthly)}/mo</span>
              </label>
              <input
                type="range" min={75} max={400} step={5}
                value={insuranceMonthly}
                onChange={(e) => setInsuranceMonthly(Number(e.target.value))}
                className="w-full accent-[#C4521A]"
              />
            </div>

            {downPct < 20 && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="pmi" checked={includePMI}
                  onChange={(e) => setIncludePMI(e.target.checked)}
                  className="accent-[#C4521A] w-4 h-4"
                />
                <label htmlFor="pmi" className="text-sm text-[#4A5568]">
                  Include PMI (down payment &lt; 20%)
                </label>
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            {/* Total Payment */}
            <div className="bg-[#1B2B1A] p-6 mb-4">
              <p className="text-white/60 text-sm mb-1">ESTIMATED MONTHLY PAYMENT</p>
              <p className="font-bebas text-6xl text-white">{formatCurrency(calc.total)}</p>
              <p className="text-white/40 text-xs mt-2">Estimate only. Actual payment may vary.</p>
            </div>

            {/* Breakdown */}
            <div className="bg-white border border-gray-200 p-6 mb-4">
              <h3 className="font-bebas text-xl text-[#1B2B1A] mb-4">PAYMENT BREAKDOWN</h3>
              <div className="space-y-3">
                {[
                  { label: "Principal & Interest", value: calc.pi, color: "#1B2B1A" },
                  { label: "Property Tax", value: calc.monthlyTax, color: "#C4521A" },
                  { label: "Homeowners Insurance", value: insuranceMonthly, color: "#4A5568" },
                  ...(calc.pmi > 0 ? [{ label: "PMI", value: calc.pmi, color: "#9CA3AF" }] : []),
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                      <span className="text-[#4A5568]">{label}</span>
                    </div>
                    <span className="font-semibold text-[#1B2B1A]">{formatCurrency(value)}/mo</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-white border border-gray-200 p-6 mb-4">
              <h3 className="font-bebas text-xl text-[#1B2B1A] mb-4">LOAN SUMMARY</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Loan Amount", value: formatCurrency(calc.loanAmount) },
                  { label: "Down Payment", value: `${formatCurrency(calc.downAmount)} (${downPct}%)` },
                  { label: "Loan-to-Value (LTV)", value: `${calc.ltv.toFixed(1)}%` },
                  { label: "Total Interest (est.)", value: formatCurrency((calc.pi * loanTerm * 12) - calc.loanAmount) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-[#4A5568]">{label}</span>
                    <span className="font-semibold text-[#1B2B1A]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#C4521A] p-5 text-white">
              <p className="font-semibold mb-1">Ready to make this real?</p>
              <p className="text-sm text-white/80 mb-3">Get your actual rate and pre-approval from Tony Botchev — no hard credit pull to start.</p>
              <Link href="/apply" className="block text-center bg-white text-[#C4521A] font-semibold py-3 hover:bg-white/90 transition-colors mb-2">
                Get Pre-Qualified Free →
              </Link>
              <a href="tel:+19452945020" className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                <Phone size={14} /> Call NOVA: (945) 294-5020
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 text-xs text-gray-500 leading-relaxed">
          <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. Results are not a commitment to lend, a loan approval, or a guarantee of any specific interest rate. Actual payments will vary based on your credit profile, loan program, lender fees, and current market rates. Property tax rates are estimates based on North DFW averages and may differ by city and county. Contact Tony Botchev (NMLS #114198) for accurate pre-qualification. Loan Factory, Inc. NMLS #320841. Equal Housing Lender.
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
